#!/usr/bin/env node
/**
 * Sync the shared Google Search Console OAuth token across all brands.
 *
 * All Sweet Media brands use ONE agency Google account (ethan@sweetmediaservices.com)
 * that has access to every brand's Search Console property. Rather than running the
 * OAuth connect flow 14× (and registering 14 callback URLs), we connect once and
 * propagate the same refresh token into every brand's `system_settings`. Both GSC
 * code paths — the centralized `resolveGscAccessToken` and the per-app
 * `/api/admin/search-console` route — read `google_search_console_refresh_token`
 * from `system_settings`, so this makes Search Console light up on every brand.
 *
 * The token is read directly from the source brand's Supabase (via its own service
 * role key) and written to each target the same way — it never needs to be pasted
 * in, and this script doubles as the rotation tool.
 *
 * Usage:
 *   node scripts/sync-gsc-token.mjs                 # source = sweet-media, sync all
 *   node scripts/sync-gsc-token.mjs --source northbound-treatment
 *   node scripts/sync-gsc-token.mjs --verify-only   # just list accessible properties
 *   node scripts/sync-gsc-token.mjs --dry-run
 *
 * Resolution order for the canonical token:
 *   1. GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN in repo-root .env (single source of truth)
 *   2. the --source brand's system_settings
 */

import { existsSync, readFileSync, readdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APPS_DIR = join(REPO_ROOT, "apps");

const REFRESH_KEY = "google_search_console_refresh_token";
const EMAIL_KEY = "google_search_console_connected_email";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  readFileSync(filePath, "utf8").split("\n").forEach((line) => {
    const withoutComment = line.replace(/\s+#.*$/, "");
    const trimmed = withoutComment.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq < 0) return;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (k) out[k] = v;
  });
  return out;
}

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
const hasFlag = (f) => process.argv.includes(f);

const log = (m) => console.log(`   ${m}`);
const ok = (m) => console.log(`✅  ${m}`);
const warn = (m) => console.log(`⚠️   ${m}`);

/** PostgREST read of a single system_settings value. Returns the parsed value or null. */
async function readSetting(url, serviceKey, key) {
  const res = await fetch(`${url}/rest/v1/system_settings?key=eq.${key}&select=value`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!res.ok) throw new Error(`read ${key} failed (${res.status})`);
  const rows = await res.json();
  return rows.length ? rows[0].value : null;
}

/** PostgREST upsert of system_settings rows keyed on `key`. */
async function upsertSettings(url, serviceKey, rows) {
  const res = await fetch(`${url}/rest/v1/system_settings?on_conflict=key`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`upsert failed (${res.status}): ${await res.text()}`);
}

/** Discover brands that have Supabase creds in their .env.local. */
function discoverBrands() {
  const brands = [];
  for (const slug of readdirSync(APPS_DIR)) {
    const envLocal = join(APPS_DIR, slug, ".env.local");
    const env = loadEnvFile(envLocal);
    const url = env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && serviceKey) brands.push({ slug, url, serviceKey });
  }
  return brands;
}

async function verifyAccess(rootEnv, refreshToken) {
  const clientId = rootEnv.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = rootEnv.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    warn("GOOGLE_OAUTH_CLIENT_ID/SECRET not in root .env — skipping property verification.");
    return null;
  }
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: "refresh_token" }),
  });
  if (!tokenRes.ok) {
    warn(`Token refresh FAILED (${tokenRes.status}) — the shared refresh token may be revoked/expired.`);
    return null;
  }
  const { access_token } = await tokenRes.json();
  const sitesRes = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!sitesRes.ok) {
    warn(`sites.list failed (${sitesRes.status}).`);
    return null;
  }
  const { siteEntry = [] } = await sitesRes.json();
  return siteEntry.map((s) => s.siteUrl).sort();
}

async function main() {
  const rootEnv = loadEnvFile(join(REPO_ROOT, ".env"));
  const sourceSlug = arg("--source") || "sweet-media";
  const dryRun = hasFlag("--dry-run");
  const verifyOnly = hasFlag("--verify-only");

  const brands = discoverBrands();
  ok(`Discovered ${brands.length} brand(s) with Supabase credentials.`);

  // ── Resolve canonical token + email ──────────────────────────────────────
  let refreshToken = rootEnv.GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN || process.env.GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN || null;
  let connectedEmail = rootEnv.GOOGLE_SEARCH_CONSOLE_CONNECTED_EMAIL || process.env.GOOGLE_SEARCH_CONSOLE_CONNECTED_EMAIL || null;
  let tokenOrigin = "root .env";

  if (!refreshToken) {
    const source = brands.find((b) => b.slug === sourceSlug);
    if (!source) throw new Error(`Source brand "${sourceSlug}" has no .env.local creds.`);
    refreshToken = await readSetting(source.url, source.serviceKey, REFRESH_KEY);
    connectedEmail = (await readSetting(source.url, source.serviceKey, EMAIL_KEY)) || connectedEmail;
    tokenOrigin = `${sourceSlug} system_settings`;
    if (!refreshToken) throw new Error(`Source brand "${sourceSlug}" has no GSC refresh token. Connect it once via /admin/search-console first.`);
  }

  ok(`Canonical token resolved from ${tokenOrigin}${connectedEmail ? ` (account: ${connectedEmail})` : ""}.`);

  // ── Verify the account can see brand properties ──────────────────────────
  const sites = await verifyAccess(rootEnv, refreshToken);
  if (sites) {
    ok(`Account has access to ${sites.length} Search Console propert(y/ies):`);
    sites.forEach((s) => log(`• ${s}`));
  }

  if (verifyOnly) return;

  // ── Persist canonical token to root .env (single source of truth) ────────
  if (!rootEnv.GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN && !dryRun) {
    appendFileSync(
      join(REPO_ROOT, ".env"),
      `\n# Shared Google Search Console OAuth token (one agency account for all brands)\nGOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN=${refreshToken}\nGOOGLE_SEARCH_CONSOLE_CONNECTED_EMAIL=${connectedEmail || ""}\n`,
    );
    ok("Wrote canonical token to repo-root .env (gitignored).");
  }

  // ── Propagate to every brand ─────────────────────────────────────────────
  const rows = [
    { key: REFRESH_KEY, value: refreshToken },
    { key: EMAIL_KEY, value: connectedEmail || "" },
  ];

  let synced = 0;
  for (const brand of brands) {
    if (dryRun) {
      log(`[dry-run] would sync ${brand.slug}`);
      continue;
    }
    try {
      await upsertSettings(brand.url, brand.serviceKey, rows);
      ok(`Synced ${brand.slug}`);
      synced++;
    } catch (e) {
      warn(`Failed ${brand.slug}: ${e.message}`);
    }
  }

  if (!dryRun) ok(`Done — Search Console token shared across ${synced}/${brands.length} brand(s).`);
}

main().catch((e) => {
  console.error(`\n❌  ${e.message}`);
  process.exit(1);
});
