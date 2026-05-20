#!/usr/bin/env node
/**
 * Exports worksheet Google Docs (from live Squarespace) as PDFs and uploads to Supabase.
 *
 * Usage:
 *   node scripts/migrate-worksheet-pdfs.mjs
 *   node scripts/migrate-worksheet-pdfs.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dryRun = process.argv.includes("--dry-run");

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const projectRef =
  process.env.SUPABASE_PROJECT_REF || supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

/** Source: live tfrfoundation.org/worksheets button links (Google Docs) */
const WORKSHEETS = [
  {
    id: "worksheet-1",
    number: 1,
    title: "Relapse Prevention Plan",
    googleDocId: "1a0iYQQ3k8jGP_BU_1k5qR1UCVVdPlVE7z3rirqvBK7w",
    storageName: "tfrf_worksheet_01_relapse-prevention-plan.pdf",
  },
  {
    id: "worksheet-2",
    number: 2,
    title: "Family Support Plan",
    googleDocId: "1r8uBYfUa4sTm4v84l-pTkXHH1zWpWF7WXUUybo4EW84",
    storageName: "tfrf_worksheet_02_family-support-plan.pdf",
  },
];

async function exportPdf(googleDocId) {
  const url = `https://docs.google.com/document/d/${googleDocId}/export?format=pdf`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 SweetMediaMigration/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Google export HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000 || buf.slice(0, 4).toString() !== "%PDF") {
    throw new Error("Response is not a valid PDF (doc may be private)");
  }
  return buf;
}

async function main() {
  if (!dryRun && (!supabaseUrl || !serviceRoleKey || !projectRef)) {
    console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = dryRun ? null : createClient(supabaseUrl, serviceRoleKey);
  const manifest = {};

  for (const ws of WORKSHEETS) {
    console.log(`\n⏳  ${ws.title}...`);
    const pdf = await exportPdf(ws.googleDocId);
    console.log(`    Downloaded ${(pdf.length / 1024).toFixed(1)} KB`);

    const storagePath = `documents/${ws.storageName}`;
    const publicUrl = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${storagePath}`;

    if (!dryRun) {
      const { error } = await supabase.storage.from(bucket).upload(storagePath, pdf, {
        contentType: "application/pdf",
        cacheControl: "31536000",
        upsert: true,
      });
      if (error) throw new Error(`${ws.title}: ${error.message}`);
    }

    manifest[ws.id] = { ...ws, downloadUrl: publicUrl, storagePath };
    console.log(`✅  ${dryRun ? "(dry-run) " : ""}${publicUrl}`);
  }

  const manifestPath = path.join(projectRoot, "uploaded-worksheets.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅  Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(`\n❌  ${err.message}`);
  process.exit(1);
});
