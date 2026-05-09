#!/usr/bin/env node
/**
 * Sweet Media — Crawl a client's existing website, extract structured
 * brand data with Claude (via OpenRouter), and (optionally) upsert the
 * new `brand_settings` columns added in migration 20260509000001.
 *
 * Usage:
 *   node scripts/crawl-brand-data.mjs \
 *     --url https://www.northboundtreatment.com \
 *     --client northbound-treatment
 *
 *   # Skip the confirmation prompt and the DB write:
 *   node scripts/crawl-brand-data.mjs \
 *     --url https://cipherbilling.com \
 *     --client cipher-billing \
 *     --dry-run
 *
 * Requires:
 *   - OPENROUTER_API_KEY in repo-root `.env`
 *   - apps/<slug>/.env.local with NEXT_PUBLIC_SUPABASE_URL and
 *     SUPABASE_SERVICE_ROLE_KEY
 *   - scripts/clients.json (used to validate --client against the live
 *     slug list)
 *
 * Never written:
 *   - site_key, site_name, logo_url
 *   - any AI prompt / styling field
 *   Only the 18 columns introduced by migration
 *   `20260509000001_extend_brand_settings` are written. Anything Claude
 *   returns outside that whitelist is dropped.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const CLIENTS_JSON = join(__dirname, 'clients.json');
const APPS_DIR = join(REPO_ROOT, 'apps');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'anthropic/claude-sonnet-4.6';

// Crawl tuning
const MAX_PAGES = 30;
const MAX_DEPTH = 3;
const PER_PAGE_TEXT_CAP = 12_000;
const TOTAL_TEXT_CAP = 90_000;
const REQUEST_TIMEOUT_MS = 15_000;
const POLITE_DELAY_MS = 200;
const HIGH_VALUE_RE = /contact|about|insurance|coverage|verify|service|program|level|admission|location|locations|accredit|payment/i;
const SKIP_EXT_RE = /\.(?:pdf|jpe?g|png|gif|svg|webp|ico|mp4|mov|webm|mp3|wav|zip|css|js|xml|woff2?|ttf|otf)(?:\?|$)/i;

// Whitelist — exactly the 18 columns from migration 20260509000001.
// Anything Claude returns outside this set is dropped before write.
const WRITABLE_FIELDS = [
  'social_facebook',
  'social_instagram',
  'social_linkedin',
  'social_twitter',
  'accreditations',
  'insurance_accepted',
  'levels_of_care',
  'license_number',
  'license_authority',
  'founded_year',
  'street_address',
  'city',
  'state',
  'zip',
  'phone',
  'latitude',
  'longitude',
  'business_hours',
];

// Fields shown in the preview but never written.
const PREVIEW_ONLY_FIELDS = ['site_name', 'site_url'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`✅  ${msg}`); }
function step(msg) { console.log(`⏳  ${msg}`); }
function info(msg) { console.log(`   ${msg}`); }
function warn(msg) { console.log(`⚠️   ${msg}`); }
function err(msg)  { console.error(`❌  ${msg}`); }
function hr()      { console.log('─'.repeat(72)); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
function hasFlag(flag) { return process.argv.includes(flag); }

function loadEnvFile(absPath) {
  if (!existsSync(absPath)) return {};
  const out = {};
  for (const raw of readFileSync(absPath, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx < 0) continue;
    const k = line.slice(0, idx).trim();
    let v = line.slice(idx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function loadClients() {
  if (!existsSync(CLIENTS_JSON)) {
    err(`Missing ${CLIENTS_JSON}`);
    process.exit(1);
  }
  const parsed = JSON.parse(readFileSync(CLIENTS_JSON, 'utf8'));
  return parsed?.clients ?? [];
}

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a.trim()); }));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── HTML utilities (regex-based; no DOM dep) ────────────────────────────────

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'",
  '&apos;': "'", '&nbsp;': ' ', '&mdash;': '—', '&ndash;': '–',
  '&rsquo;': '’', '&lsquo;': '‘', '&rdquo;': '”', '&ldquo;': '“',
  '&hellip;': '…', '&copy;': '©', '&reg;': '®', '&trade;': '™',
};

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-zA-Z]+;/g, (m) => (m in ENTITIES ? ENTITIES[m] : m));
}

function stripHtml(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ');
  s = s.replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ');
  s = s.replace(/<(?:br|p|li|tr|td|th|h[1-6]|div|section|article|footer|header|nav)\b[^>]*>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  s = s.replace(/[ \t\f\v]+/g, ' ');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

function extractLinks(html, baseUrl) {
  const out = new Set();
  const re = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = (m[1] || m[2] || m[3] || '').trim();
    if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) continue;
    try {
      const u = new URL(raw, baseUrl);
      u.hash = '';
      out.add(u.toString());
    } catch {
      // skip malformed
    }
  }
  return [...out];
}

function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = '';
    let p = url.pathname.replace(/\/+$/, '');
    if (!p) p = '/';
    url.pathname = p;
    url.search = url.search; // keep query
    return url.toString();
  } catch {
    return u;
  }
}

function sameOrigin(a, b) {
  try { return new URL(a).origin === new URL(b).origin; } catch { return false; }
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'SweetMediaBrandCrawler/1.0 (+https://sweetmediaservices.com)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

// ─── Crawler ─────────────────────────────────────────────────────────────────

async function crawl(startUrl) {
  const start = normalizeUrl(startUrl);
  const visited = new Set();
  const pages = []; // [{ url, text }]
  // Queue items: { url, depth }
  const queue = [{ url: start, depth: 0 }];

  while (queue.length > 0 && pages.length < MAX_PAGES) {
    // Always pick the highest-value next URL among items at the lowest depth.
    queue.sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      const ah = HIGH_VALUE_RE.test(a.url) ? 0 : 1;
      const bh = HIGH_VALUE_RE.test(b.url) ? 0 : 1;
      return ah - bh;
    });
    const { url, depth } = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    if (SKIP_EXT_RE.test(url)) continue;
    if (!sameOrigin(url, start)) continue;

    let html;
    try {
      const res = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);
      const finalUrl = normalizeUrl(res.url || url);
      if (!sameOrigin(finalUrl, start)) continue;
      if (visited.has(finalUrl) && finalUrl !== url) continue;
      visited.add(finalUrl);
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || !/text\/html|application\/xhtml/i.test(ct)) continue;
      html = await res.text();
      info(`📄 [${depth}] ${finalUrl}`);
    } catch (e) {
      info(`⚠️  [${depth}] ${url} — ${e.message}`);
      continue;
    }

    const text = stripHtml(html).slice(0, PER_PAGE_TEXT_CAP);
    if (text) pages.push({ url, text });

    if (depth < MAX_DEPTH) {
      for (const link of extractLinks(html, url)) {
        const norm = normalizeUrl(link);
        if (!visited.has(norm) && sameOrigin(norm, start) && !SKIP_EXT_RE.test(norm)) {
          queue.push({ url: norm, depth: depth + 1 });
        }
      }
    }

    await sleep(POLITE_DELAY_MS);
  }

  return pages;
}

function buildCorpus(pages) {
  let total = 0;
  const parts = [];
  for (const { url, text } of pages) {
    const block = `\n\n===== PAGE: ${url} =====\n${text}\n`;
    if (total + block.length > TOTAL_TEXT_CAP) {
      const remaining = TOTAL_TEXT_CAP - total;
      if (remaining > 200) parts.push(block.slice(0, remaining));
      break;
    }
    parts.push(block);
    total += block.length;
  }
  return parts.join('');
}

// ─── Claude / OpenRouter ─────────────────────────────────────────────────────

function buildExtractionPrompt(corpus, sourceUrl) {
  return `You are a careful data extractor. The text below was scraped from the public website at ${sourceUrl}. It is a concatenation of pages with each page prefixed by "===== PAGE: <url> =====".

Extract structured brand data and return ONLY a single JSON object — no prose, no markdown fences. Use the exact keys and types shown. Use null when a value is genuinely not present in the source. Do NOT invent, infer, or look up anything that is not stated in the text.

Required JSON shape:
{
  "site_name": string | null,
  "site_url": string | null,
  "phone": string | null,                       // e.g. "949-776-7093" — pick the most prominent main contact number
  "street_address": string | null,
  "city": string | null,
  "state": string | null,                       // 2-letter code if US (e.g. "CA")
  "zip": string | null,
  "latitude": number | null,                    // only if found in a Google Maps embed URL or schema.org markup
  "longitude": number | null,                   // only if found in a Google Maps embed URL or schema.org markup
  "business_hours": [ { "day": string, "open": string, "close": string } ] | null,
                                                // day is full name "Monday".."Sunday"; times in 24h "HH:MM"; null if closed all-week info not given
  "social_facebook":  string | null,            // full URL
  "social_instagram": string | null,
  "social_linkedin":  string | null,
  "social_twitter":   string | null,            // X / Twitter URL
  "accreditations":     [string] | null,        // e.g. ["Joint Commission", "LegitScript Certified"]
  "insurance_accepted": [string] | null,        // e.g. ["Aetna", "Cigna", "Blue Cross Blue Shield"]
  "levels_of_care":     [string] | null,        // e.g. ["Detox", "Residential", "PHP", "IOP"]
  "license_number":   string | null,
  "license_authority": string | null,           // e.g. "California Department of Health Care Services (DHCS)"
  "founded_year":      number | null            // 4-digit integer year
}

Rules:
- Output a single JSON object. No code fences, no leading/trailing commentary.
- For arrays, use [] only if the page mentions zero items explicitly; if the topic is simply absent from the source, use null.
- Phone numbers: keep the format the site uses, but prefer the dashed display form.
- Social URLs: use the public profile URL the site links to. Do not synthesize one from a handle.
- Insurance & accreditations: only items the source actually lists. Do not include "and many more" filler.

Source text (truncated to fit):
"""
${corpus}
"""`;
}

async function callClaude(apiKey, prompt) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://sweetmediaservices.com',
      'X-Title': 'Sweet Media Brand Crawler',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 2000,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${t}`);
  }
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? '';
  return parseClaudeJson(raw);
}

function parseClaudeJson(raw) {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  try { return JSON.parse(s); } catch {}
  const m = s.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`Claude returned non-JSON content:\n${raw.slice(0, 500)}`);
  return JSON.parse(m[0]);
}

// ─── Preview & sanitization ──────────────────────────────────────────────────

function fmtVal(v) {
  if (v === null || v === undefined) return '—';
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    if (typeof v[0] === 'object' && v[0] !== null) return JSON.stringify(v);
    return v.join(', ');
  }
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

function printTable(extracted) {
  const rows = [];
  for (const k of PREVIEW_ONLY_FIELDS) rows.push([k, fmtVal(extracted[k]), 'preview only']);
  for (const k of WRITABLE_FIELDS)     rows.push([k, fmtVal(extracted[k]), 'will write']);

  const keyW = Math.max(...rows.map((r) => r[0].length));
  const tagW = Math.max(...rows.map((r) => r[2].length));
  hr();
  console.log('  Extracted brand data');
  hr();
  for (const [k, v, tag] of rows) {
    const head = `  ${k.padEnd(keyW)}  [${tag.padEnd(tagW)}]  `;
    const value = String(v);
    if (value.length + head.length <= 110) {
      console.log(head + value);
    } else {
      console.log(head);
      const indent = ' '.repeat(head.length);
      const wrap = 110 - indent.length;
      for (let i = 0; i < value.length; i += wrap) {
        console.log(indent + value.slice(i, i + wrap));
      }
    }
  }
  hr();
}

function buildPayload(extracted) {
  const payload = {};
  for (const k of WRITABLE_FIELDS) {
    if (!(k in extracted)) continue;
    const v = extracted[k];
    if (v === undefined) continue;
    // Coerce numerics so Postgres accepts them.
    if ((k === 'founded_year' || k === 'latitude' || k === 'longitude') && v !== null) {
      const n = Number(v);
      payload[k] = Number.isFinite(n) ? n : null;
      continue;
    }
    payload[k] = v;
  }
  return payload;
}

// ─── Supabase upsert ─────────────────────────────────────────────────────────

async function patchBrandSettings(supabaseUrl, serviceRoleKey, slug, payload) {
  const url = `${supabaseUrl.replace(/\/+$/, '')}/rest/v1/brand_settings?site_key=eq.${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${text}`);
  let rows = [];
  try { rows = JSON.parse(text); } catch {}
  return rows;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const url = getArg('--url');
  const slug = getArg('--client');
  const dryRun = hasFlag('--dry-run');

  console.log('');
  console.log('🚀  Sweet Media — Brand data crawler');
  if (dryRun) info('(dry-run mode — no DB writes, no confirmation prompt)');
  console.log('');

  const clients = loadClients();
  const slugs = clients.map((c) => c.slug);

  if (!slug) {
    err('Missing required --client flag.');
    info(`Available slugs: ${slugs.join(', ')}`);
    process.exit(1);
  }
  if (!slugs.includes(slug)) {
    err(`Unknown client "${slug}".`);
    info(`Available slugs: ${slugs.join(', ')}`);
    process.exit(1);
  }
  if (!url) {
    err('Missing required --url flag (e.g. --url https://www.example.com).');
    process.exit(1);
  }

  let normalized;
  try {
    normalized = url.match(/^https?:\/\//) ? url : `https://${url}`;
    new URL(normalized);
  } catch {
    err(`Invalid --url: ${url}`);
    process.exit(1);
  }

  const rootEnv = loadEnvFile(join(REPO_ROOT, '.env'));
  const openRouterKey = rootEnv.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!openRouterKey) {
    err('OPENROUTER_API_KEY missing — add it to repo-root .env or export it.');
    process.exit(1);
  }

  const appEnvPath = join(APPS_DIR, slug, '.env.local');
  const appEnv = loadEnvFile(appEnvPath);
  const supabaseUrl = appEnv.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = appEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (!dryRun) {
    if (!supabaseUrl || !serviceRoleKey) {
      err(`apps/${slug}/.env.local must contain NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.`);
      process.exit(1);
    }
  }

  step(`Crawling ${normalized}  (max ${MAX_PAGES} pages, depth ${MAX_DEPTH})`);
  const pages = await crawl(normalized);
  if (pages.length === 0) {
    err('Crawler collected zero pages — site may be unreachable or blocking the user agent.');
    process.exit(1);
  }
  log(`Crawled ${pages.length} page(s).`);

  const corpus = buildCorpus(pages);
  info(`Corpus length: ${corpus.length.toLocaleString()} chars`);

  step(`Asking ${OPENROUTER_MODEL} to extract structured brand data...`);
  let extracted;
  try {
    extracted = await callClaude(openRouterKey, buildExtractionPrompt(corpus, normalized));
  } catch (e) {
    err(`Extraction failed: ${e.message}`);
    process.exit(1);
  }

  printTable(extracted);

  const payload = buildPayload(extracted);
  const willWrite = Object.keys(payload).filter((k) => payload[k] !== null && payload[k] !== undefined);
  info(`Fields with non-null values that would be written: ${willWrite.length}/${WRITABLE_FIELDS.length}`);

  if (dryRun) {
    log('Dry run complete — no prompt, no write.');
    return;
  }
  if (willWrite.length === 0) {
    warn('Nothing to write (every writable field is null). Skipping prompt.');
    return;
  }

  const ans = (await prompt('\n👉  Write this to Supabase? (y/n) ')).toLowerCase();
  if (ans !== 'y' && ans !== 'yes') {
    log('Skipped. No changes made.');
    return;
  }

  step(`Upserting brand_settings for site_key="${slug}" on ${supabaseUrl}`);
  let rows;
  try {
    rows = await patchBrandSettings(supabaseUrl, serviceRoleKey, slug, payload);
  } catch (e) {
    err(`Supabase write failed: ${e.message}`);
    process.exit(1);
  }
  if (!rows || rows.length === 0) {
    err(`No brand_settings row matched site_key="${slug}". Nothing was updated.`);
    info('Verify the row exists, or seed one before re-running.');
    process.exit(1);
  }
  log(`Updated ${rows.length} brand_settings row(s) for "${slug}".`);
}

main().catch((e) => {
  err(`Unhandled error: ${e?.stack || e?.message || e}`);
  process.exit(1);
});
