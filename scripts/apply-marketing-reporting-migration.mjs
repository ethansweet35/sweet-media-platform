#!/usr/bin/env node
/**
 * Apply marketing reporting tables (channel_metrics + report_shares) to Supabase projects.
 *
 * Usage:
 *   node scripts/apply-marketing-reporting-migration.mjs --all
 *   node scripts/apply-marketing-reporting-migration.mjs --ref ynmldknprfusujudvutq
 *   node scripts/apply-marketing-reporting-migration.mjs --slug sweet-media
 *
 * Requires SUPABASE_ACCESS_TOKEN in repo-root .env (same as setup-new-client.mjs).
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const MGMT = "https://api.supabase.com";
const MIGRATION_SQL = readFileSync(
  join(REPO_ROOT, "apps/client-template/supabase/migrations/2026-06-01_marketing_reporting.sql"),
  "utf8",
);

function loadEnv() {
  const path = join(REPO_ROOT, ".env");
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
  return out;
}

function refFromSlug(slug) {
  const envPath = join(REPO_ROOT, "apps", slug, ".env.local");
  if (!existsSync(envPath)) return null;
  const m = readFileSync(envPath, "utf8").match(/NEXT_PUBLIC_SUPABASE_URL=https:\/\/([^.]+)\.supabase\.co/);
  return m?.[1] ?? null;
}

async function runSQL(token, ref, sql) {
  const res = await fetch(`${MGMT}/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${ref}: ${res.status} ${text}`);
  return text;
}

async function hasReportShares(token, ref) {
  try {
    await runSQL(
      token,
      ref,
      "select 1 from public.report_shares limit 1;",
    );
    return true;
  } catch (e) {
    if (String(e.message).includes("does not exist")) return false;
    throw e;
  }
}

const argv = process.argv.slice(2);
const all = argv.includes("--all");
const refFlag = argv.includes("--ref") ? argv[argv.indexOf("--ref") + 1] : null;
const slugFlag = argv.includes("--slug") ? argv[argv.indexOf("--slug") + 1] : null;
const force = argv.includes("--force");

const env = loadEnv();
const token = env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("Missing SUPABASE_ACCESS_TOKEN in repo-root .env");
  process.exit(1);
}

let refs = [];
if (refFlag) refs = [refFlag];
else if (slugFlag) {
  const ref = refFromSlug(slugFlag);
  if (!ref) {
    console.error(`Could not resolve Supabase ref for slug ${slugFlag}`);
    process.exit(1);
  }
  refs = [ref];
} else if (all) {
  refs = readdirSync(join(REPO_ROOT, "apps"))
    .map((slug) => refFromSlug(slug))
    .filter(Boolean);
  refs = [...new Set(refs)];
} else {
  console.error("Usage: --all | --ref <ref> | --slug <slug> [--force]");
  process.exit(1);
}

for (const ref of refs) {
  try {
    if (!force) {
      const exists = await hasReportShares(token, ref);
      if (exists) {
        console.log(`skip ${ref} (report_shares already exists)`);
        continue;
      }
    }
    await runSQL(token, ref, MIGRATION_SQL);
    console.log(`✓ ${ref}`);
  } catch (e) {
    console.error(`✗ ${ref}:`, e.message);
    process.exitCode = 1;
  }
}
