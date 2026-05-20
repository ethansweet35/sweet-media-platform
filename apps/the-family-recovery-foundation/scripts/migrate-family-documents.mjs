#!/usr/bin/env node
/**
 * Exports TFRF family module + worksheet Google Docs as PDFs and uploads to Supabase.
 *
 * Usage:
 *   node scripts/migrate-family-documents.mjs
 *   node scripts/migrate-family-documents.mjs --dry-run
 *   node scripts/migrate-family-documents.mjs --only modules
 *   node scripts/migrate-family-documents.mjs --only worksheets
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dryRun = process.argv.includes("--dry-run");
const onlyFlag = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1]
  || (process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null);

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const projectRef =
  process.env.SUPABASE_PROJECT_REF || supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

/** Google Doc IDs from live tfrfoundation.org/family-programming (buttonLink order) */
const MODULES = [
  { id: "module-1", title: "Definition of Addiction", googleDocId: "1nNucsjdpqGKiaygwWK12VikGgsjgJcnH51rpMHWnLtI", storageName: "tfrf_module_01_definition-of-addiction.pdf" },
  { id: "module-2", title: "Our Central Nervous System", googleDocId: "1hqUKgPGHzDDq-loLQiWm8v95wPJ0wDmUMTdO7_FnBrQ", storageName: "tfrf_module_02_central-nervous-system.pdf" },
  { id: "module-3", title: "Codependency I", googleDocId: "1PNIh_WM9YJNQYSRQUU_xtmjfAgmwVmIW3FxLgfej3O8", storageName: "tfrf_module_03_codependency-i.pdf" },
  { id: "module-4", title: "Codependency II", googleDocId: "1RvJW_5JL36rEOFZ-2lqueEq9dIW_2CSp1WQ0IMNiFEY", storageName: "tfrf_module_04_codependency-ii.pdf" },
  { id: "module-5", title: "Codependency III", googleDocId: "1pvCriPZ3gB-7HyHxEs2D7kT9JtIkrMOPOA1C-GA7xNo", storageName: "tfrf_module_05_codependency-iii.pdf" },
  { id: "module-6", title: "Communication Skills", googleDocId: "1JhAh3yI7PCDr4PmfYupCp0pHT-nakJFjnVqp9arO9V4", storageName: "tfrf_module_06_communication-skills.pdf" },
  { id: "module-7", title: "Boundaries", googleDocId: "1JU6zxv-VEcyYbSy0IpT-oDJG4veCVG23ivfxe4TbCVA", storageName: "tfrf_module_07_boundaries.pdf" },
  { id: "module-8", title: "Connective Boundaries", googleDocId: "1G4qFqQGXpivgD2LbxsLRPy56cdrn06Tg7ZmKtMOwle4", storageName: "tfrf_module_08_connective-boundaries.pdf" },
  { id: "module-9", title: "Gaslighting", googleDocId: "1qA8UbwS1zetRBwPUNqBFaTR7-7CUrGrHcANKHcB50z0", storageName: "tfrf_module_09_gaslighting.pdf" },
  { id: "module-10", title: "Coming Home", googleDocId: "1fGk9kiLJoS5QGoRA1gUJxyq0orOcaCzivxLv9YqGUbA", storageName: "tfrf_module_10-coming-home.pdf" },
  { id: "module-11", title: "The Wall", googleDocId: "1m-9zr85UwTHg03OB6PIDs59negvEIz5sDWcH8ZHrKx0", storageName: "tfrf_module_11_the-wall.pdf" },
  { id: "module-12", title: "Just For Today", googleDocId: "1vcKiJC1pZiLQrqSWEYSmTHkDjEq2Zlb7oP3vb4VJBwI", storageName: "tfrf_module_12_just-for-today.pdf" },
];

const WORKSHEETS = [
  { id: "worksheet-1", title: "Relapse Prevention Plan", googleDocId: "1a0iYQQ3k8jGP_BU_1k5qR1UCVVdPlVE7z3rirqvBK7w", storageName: "tfrf_worksheet_01_relapse-prevention-plan.pdf" },
  { id: "worksheet-2", title: "Family Support Plan", googleDocId: "1r8uBYfUa4sTm4v84l-pTkXHH1zWpWF7WXUUybo4EW84", storageName: "tfrf_worksheet_02_family-support-plan.pdf" },
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
  const groups = [];
  if (!onlyFlag || onlyFlag === "modules") groups.push(["modules", MODULES]);
  if (!onlyFlag || onlyFlag === "worksheets") groups.push(["worksheets", WORKSHEETS]);

  const manifest = { modules: {}, worksheets: {} };

  for (const [groupKey, items] of groups) {
    for (const item of items) {
      console.log(`\n⏳  [${groupKey}] ${item.title}...`);
      const pdf = await exportPdf(item.googleDocId);
      console.log(`    Downloaded ${(pdf.length / 1024).toFixed(1)} KB`);

      const storagePath = `documents/${item.storageName}`;
      const publicUrl = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${storagePath}`;

      if (!dryRun) {
        const { error } = await supabase.storage.from(bucket).upload(storagePath, pdf, {
          contentType: "application/pdf",
          cacheControl: "31536000",
          upsert: true,
        });
        if (error) throw new Error(`${item.title}: ${error.message}`);
      }

      manifest[groupKey][item.id] = { ...item, downloadUrl: publicUrl, storagePath };
      console.log(`✅  ${dryRun ? "(dry-run) " : ""}${publicUrl}`);
    }
  }

  const manifestPath = path.join(projectRoot, "uploaded-family-documents.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅  Manifest: ${manifestPath}`);
}

main().catch((err) => {
  console.error(`\n❌  ${err.message}`);
  process.exit(1);
});
