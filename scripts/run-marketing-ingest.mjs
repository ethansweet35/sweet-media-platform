#!/usr/bin/env node
/**
 * Run channel_metrics ingest for one brand (local dev / ops).
 *
 *   node scripts/run-marketing-ingest.mjs --slug rize-oc
 *   node scripts/run-marketing-ingest.mjs --slug rize-oc --days 35
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

function parseEnv(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    let v = t.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[t.slice(0, eq).trim()] = v;
  }
  return out;
}

function isoDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

const slugIdx = process.argv.indexOf("--slug");
const slug = slugIdx >= 0 ? process.argv[slugIdx + 1] : null;
const daysIdx = process.argv.indexOf("--days");
const lookback = daysIdx >= 0 ? Number(process.argv[daysIdx + 1]) : 35;

if (!slug) {
  console.error("Usage: node scripts/run-marketing-ingest.mjs --slug <slug> [--days 35]");
  process.exit(1);
}

const appEnv = parseEnv(join(REPO_ROOT, "apps", slug, ".env.local"));
const rootEnv = parseEnv(join(REPO_ROOT, ".env"));

process.env.NEXT_PUBLIC_SUPABASE_URL = appEnv.NEXT_PUBLIC_SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY = appEnv.SUPABASE_SERVICE_ROLE_KEY;
process.env.WINDSOR_API_KEY = rootEnv.WINDSOR_API_KEY ?? appEnv.WINDSOR_API_KEY;
process.env.CALLRAIL_API_KEY = rootEnv.CALLRAIL_API_KEY ?? appEnv.CALLRAIL_API_KEY;
process.env.CALLRAIL_ACCOUNT_ID = rootEnv.CALLRAIL_ACCOUNT_ID ?? appEnv.CALLRAIL_ACCOUNT_ID;
process.env.CTM_ACCESS_KEY = rootEnv.CTM_ACCESS_KEY ?? appEnv.CTM_ACCESS_KEY;
process.env.CTM_SECRET_KEY = rootEnv.CTM_SECRET_KEY ?? appEnv.CTM_SECRET_KEY;
process.env.CTM_ACCOUNT_ID = rootEnv.CTM_ACCOUNT_ID ?? appEnv.CTM_ACCOUNT_ID;

const { ingestChannelMetrics } = await import(
  join(REPO_ROOT, "packages/admin-core/src/lib/server/channelMetrics.ts")
);

const result = await ingestChannelMetrics(lookback);
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
