#!/usr/bin/env node
/**
 * Merge CallRail + Windsor settings into each brand's Supabase system_settings.
 *
 * Windsor CallRail connector uses account_name = tracking number with dashes (e.g. 548-983-303).
 * The ctrk_* id is stored as callrail_tracking_id for reference only.
 *
 * Usage (from repo root):
 *   node scripts/seed-marketing-callrail-settings.mjs --slug addiction-interventions
 *   node scripts/seed-marketing-callrail-settings.mjs --all-callrail-brands
 *   node scripts/seed-marketing-callrail-settings.mjs --slug sullivan-recovery --dry-run
 *
 * Requires apps/<slug>/.env.local with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

/**
 * Per-brand CallRail config.
 * - phone:   Windsor `account_name` for calls/tags (= CallRail account numeric_id)
 * - ctrk:    CallRail API key (also the swap.js tracking id); used for the forms API
 * - accId:   CallRail v3 account id (ACC…) for the forms endpoint
 * - companyId: numeric swap.js company id (reference only; not a form filter)
 * @type {Record<string, { phone: string, ctrk: string, accId: string, companyId?: string }>}
 */
export const CALLRAIL_BRAND_CONFIG = {
  "addiction-interventions": {
    phone: "548-983-303",
    ctrk: "ctrk_6640eee2678971ece57f351cc65cf6f67acb264f",
    accId: "ACC0199542459527b7b92678f400ef5c2b7",
    companyId: "798922664",
  },
  "adolescent-mental-health": {
    phone: "195-912-153",
    ctrk: "ctrk_617a7fc3a9b0b6e6ee10ce8e35251b0dce82f299",
    accId: "ACCea3227c5084a4574accf69abe18ca2f0",
  },
  "cipher-billing": {
    phone: "554-633-833",
    ctrk: "ctrk_255e100938f6bfe0a7adca03ef6c54f5cc19539b",
    accId: "ACC019e035d2f9f7f83a4785b40c33169f5",
    companyId: "748580956",
  },
  "inner-peak-colorado": {
    phone: "473-429-729",
    ctrk: "ctrk_8e62a7178a5ef88c4eadf93e5242a0ba4e0adfbd",
    accId: "ACC019dace6a3ec7c39a9cba53c8ab650b6",
  },
  "missouri-behavioral-health": {
    phone: "601-907-337",
    ctrk: "ctrk_a291898d4e08f9af7fd1cad7f72eb413f092faa7",
    accId: "ACCbd9569bd28ac4a93b67d10e3518aacc7",
    companyId: "638776964",
  },
  "rize-oc": {
    phone: "171-561-452",
    ctrk: "ctrk_f21381f6fb8b1ca56de71671e1d5a32575a58e3d",
    accId: "ACC1c7747ab2ee34683a9fe88537f39f101",
    companyId: "528779673",
  },
  "sullivan-recovery": {
    phone: "275-664-175",
    ctrk: "ctrk_5439e1726f38d556b25e1c04437fe6fdb62574d7",
    accId: "ACCfb331a6da6fe4816999c0cbb26ed3383",
    companyId: "669252576",
  },
};

function parseEnvFile(path) {
  const out = {};
  if (!existsSync(path)) return out;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function mergeJson(existing, patch) {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing) ? { ...existing } : {};
  return { ...base, ...patch };
}

async function upsertSetting(adminUrl, serviceKey, key, value) {
  const res = await fetch(`${adminUrl}/rest/v1/system_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`system_settings ${key}: ${res.status} ${text}`);
  }
}

async function readSetting(adminUrl, serviceKey, key) {
  const params = new URLSearchParams({ key: `eq.${key}`, select: "value" });
  const res = await fetch(`${adminUrl}/rest/v1/system_settings?${params}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });
  if (!res.ok) throw new Error(`read ${key}: ${res.status}`);
  const rows = await res.json();
  return rows[0]?.value ?? null;
}

async function seedSlug(slug, { dryRun }) {
  const cfg = CALLRAIL_BRAND_CONFIG[slug];
  if (!cfg) throw new Error(`No CallRail config for slug: ${slug}`);

  const envPath = join(REPO_ROOT, "apps", slug, ".env.local");
  const env = parseEnvFile(envPath);
  const adminUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!adminUrl || !serviceKey) {
    throw new Error(`Missing Supabase env in ${envPath}`);
  }

  const windsorExisting = await readSetting(adminUrl, serviceKey, "marketing_windsor_accounts");
  const trackingExisting = await readSetting(adminUrl, serviceKey, "marketing_call_tracking");

  const windsorNext = mergeJson(windsorExisting, { callrail: cfg.phone });
  const trackingPatch = {
    windsor_callrail_account: cfg.phone,
    callrail_tracking_id: cfg.ctrk,
    callrail_account_id: cfg.accId,
  };
  if (cfg.companyId) trackingPatch.callrail_company_id = cfg.companyId;
  const trackingNext = mergeJson(trackingExisting, trackingPatch);

  if (dryRun) {
    console.log(`[dry-run] ${slug}`);
    console.log("  marketing_windsor_accounts:", JSON.stringify(windsorNext, null, 2));
    console.log("  marketing_call_tracking:", JSON.stringify(trackingNext, null, 2));
    return;
  }

  await upsertSetting(adminUrl, serviceKey, "marketing_windsor_accounts", windsorNext);
  await upsertSetting(adminUrl, serviceKey, "marketing_call_tracking", trackingNext);
  console.log(`✓ ${slug} — Windsor callrail account_name=${cfg.phone}`);
}

function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const all = argv.includes("--all-callrail-brands");
  const slugIdx = argv.indexOf("--slug");
  const slug = slugIdx >= 0 ? argv[slugIdx + 1] : null;
  return { dryRun, all, slug };
}

const { dryRun, all, slug } = parseArgs(process.argv.slice(2));

if (!all && !slug) {
  console.error(
    "Usage: node scripts/seed-marketing-callrail-settings.mjs --slug <slug> | --all-callrail-brands [--dry-run]",
  );
  process.exit(1);
}

const slugs = all ? Object.keys(CALLRAIL_BRAND_CONFIG) : [slug];

for (const s of slugs) {
  try {
    await seedSlug(s, { dryRun });
  } catch (e) {
    console.error(`✗ ${s}:`, e.message);
    process.exitCode = 1;
  }
}
