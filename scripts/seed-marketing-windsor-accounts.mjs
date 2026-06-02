#!/usr/bin/env node
/**
 * Merge Windsor ads/GMB account names + PSI URLs into each brand's system_settings.
 * Account-name strings are the exact Windsor `account_name` values (discovered via
 * the Windsor connectors API). Brands not connected to a given source omit that key.
 *
 *   node scripts/seed-marketing-windsor-accounts.mjs --all [--dry-run]
 *   node scripts/seed-marketing-windsor-accounts.mjs --slug missouri-behavioral-health
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

/** @type {Record<string, { windsor: Record<string,string>, psi: string[] }>} */
const BRAND_WINDSOR = {
  "addiction-interventions": {
    windsor: { google_my_business: "Addiction Interventions" },
    psi: ["https://addictioninterventions.com/"],
  },
  "adolescent-mental-health": {
    windsor: {
      google_ads: "Adolescent Mental Health",
      facebook: "Adolescent Mental Health",
      google_my_business: "Adolescent Mental Health | Teen IOP",
    },
    psi: ["https://adolescentmentalhealth.com/"],
  },
  "cipher-billing": {
    windsor: {
      google_ads: "Cipher Billing",
      google_my_business: "Cipher Billing | Behavioral Health Billing Services",
    },
    psi: ["https://cipherbilling.com/"],
  },
  "inner-peak-colorado": {
    windsor: {},
    psi: ["https://innerpeakcolorado.com/"],
  },
  "missouri-behavioral-health": {
    windsor: {
      google_ads: "Missouri Behavioral Health",
      facebook: "Missouri Behavioral Health",
      google_my_business: "Missouri Behavioral Health",
    },
    psi: ["https://missouribehavioralhealth.com/"],
  },
  "rize-oc": {
    windsor: {
      google_ads: "Rize OC Mental Health",
      facebook: "Rize OC",
      bing: "Rize OC",
      google_my_business: "Rize OC Mental Health & Addiction Treatment",
    },
    psi: ["https://rizeoc.com/"],
  },
  "sullivan-recovery": {
    windsor: {
      google_ads: "Sullivan Recovery",
      google_my_business: "Sullivan Recovery | Drug & Alcohol Detox",
    },
    psi: ["https://sullivanrecovery.com/"],
  },
};

function parseEnv(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    let v = t.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[t.slice(0, eq).trim()] = v;
  }
  return out;
}

async function readSetting(url, key, k) {
  const res = await fetch(`${url}/rest/v1/system_settings?key=eq.${k}&select=value`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const rows = await res.json();
  return rows[0]?.value ?? null;
}

async function upsert(url, key, k, value) {
  const res = await fetch(`${url}/rest/v1/system_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ key: k, value, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`${k}: ${res.status} ${await res.text()}`);
}

async function seed(slug, { dryRun }) {
  const cfg = BRAND_WINDSOR[slug];
  if (!cfg) throw new Error(`no config for ${slug}`);
  const env = parseEnv(join(REPO_ROOT, "apps", slug, ".env.local"));
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error(`missing env for ${slug}`);

  const existing = (await readSetting(url, key, "marketing_windsor_accounts")) ?? {};
  const merged = { ...existing, ...cfg.windsor };

  if (dryRun) {
    console.log(`[dry-run] ${slug}`);
    console.log("  windsor:", JSON.stringify(merged));
    console.log("  psi:", JSON.stringify(cfg.psi));
    return;
  }
  await upsert(url, key, "marketing_windsor_accounts", merged);
  await upsert(url, key, "marketing_psi_urls", cfg.psi);
  console.log(`✓ ${slug} (${Object.keys(cfg.windsor).join(", ") || "callrail only"})`);
}

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const all = argv.includes("--all");
const slug = argv.includes("--slug") ? argv[argv.indexOf("--slug") + 1] : null;
const slugs = all ? Object.keys(BRAND_WINDSOR) : slug ? [slug] : [];
if (slugs.length === 0) {
  console.error("Usage: --all | --slug <slug> [--dry-run]");
  process.exit(1);
}
for (const s of slugs) {
  try {
    await seed(s, { dryRun });
  } catch (e) {
    console.error(`✗ ${s}:`, e.message);
    process.exitCode = 1;
  }
}
