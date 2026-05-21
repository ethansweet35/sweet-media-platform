#!/usr/bin/env node
/**
 * Crawl a brand's public website and seed blog_knowledge_base entries via Claude.
 *
 * Usage:
 *   node scripts/crawl-knowledge-base.mjs \
 *     --url https://tfrfoundation.org \
 *     --client the-family-recovery-foundation \
 *     --yes
 *
 * Requires OPENROUTER_API_KEY in repo-root .env and apps/<slug>/.env.local
 * with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 */

import { readFileSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const APPS_DIR = join(REPO_ROOT, "apps");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "anthropic/claude-sonnet-4.6";

const MAX_PAGES = 45;
const MAX_DEPTH = 3;
const PER_PAGE_TEXT_CAP = 10_000;
const TOTAL_TEXT_CAP = 120_000;
const REQUEST_TIMEOUT_MS = 20_000;
const POLITE_DELAY_MS = 150;
const SKIP_EXT_RE = /\.(?:pdf|jpe?g|png|gif|svg|webp|ico|mp4|mov|webm|mp3|wav|zip|css|js|xml|woff2?|ttf|otf)(?:\?|$)/i;
const SKIP_PATH_RE = /^\/(?:admin|api|blog\/[^/]+|_next|design-preview)(?:\/|$)/i;

function log(msg) {
  console.log(`✅  ${msg}`);
}
function step(msg) {
  console.log(`⏳  ${msg}`);
}
function info(msg) {
  console.log(`   ${msg}`);
}
function warn(msg) {
  console.log(`⚠️   ${msg}`);
}
function err(msg) {
  console.error(`❌  ${msg}`);
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
function hasFlag(flag) {
  return process.argv.includes(flag);
}

function loadEnvFile(absPath) {
  if (!existsSync(absPath)) return {};
  const out = {};
  for (const raw of readFileSync(absPath, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
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

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question, (a) => {
      rl.close();
      resolve(a.trim());
    }),
  );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-zA-Z]+;/g, (m) => (m in ENTITIES ? ENTITIES[m] : m));
}

function stripHtml(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ");
  s = s.replace(/<svg\b[\s\S]*?<\/svg>/gi, " ");
  s = s.replace(/<(?:br|p|li|tr|td|th|h[1-6]|div|section|article|footer|header|nav)\b[^>]*>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeEntities(s);
  s = s.replace(/[ \t\f\v]+/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return null;
  return decodeEntities(m[1].replace(/<[^>]+>/g, "").trim());
}

function extractLinks(html, baseUrl) {
  const out = new Set();
  const re = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const raw = (m[1] || m[2] || m[3] || "").trim();
    if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) continue;
    try {
      const u = new URL(raw, baseUrl);
      u.hash = "";
      out.add(u.toString());
    } catch {
      // skip
    }
  }
  return [...out];
}

function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = "";
    let p = url.pathname.replace(/\/+$/, "");
    if (!p) p = "/";
    url.pathname = p;
    return url.toString();
  } catch {
    return u;
  }
}

function sameOrigin(a, b) {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

function shouldSkipUrl(url) {
  try {
    const path = new URL(url).pathname;
    if (SKIP_PATH_RE.test(path)) return true;
    if (SKIP_EXT_RE.test(url)) return true;
    return false;
  } catch {
    return true;
  }
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": "SweetMediaKnowledgeBaseCrawler/1.0 (+https://sweetmediaservices.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } finally {
    clearTimeout(t);
  }
}

async function parseSitemapUrls(sitemapUrl, origin, depth = 0) {
  if (depth > 3) return [];
  const res = await fetchWithTimeout(sitemapUrl, REQUEST_TIMEOUT_MS);
  if (!res.ok) return [];
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
  const childSitemaps = locs.filter((u) => u.endsWith(".xml") || u.includes("/sitemaps/"));
  const pageUrls = locs.filter((u) => sameOrigin(u, origin) && !childSitemaps.includes(u) && !shouldSkipUrl(u));

  let nested = [];
  for (const child of childSitemaps) {
    nested = nested.concat(await parseSitemapUrls(child, origin, depth + 1));
    await sleep(100);
  }
  return [...new Set([...pageUrls, ...nested])];
}

async function crawl(startUrl, seedUrls = []) {
  const start = normalizeUrl(startUrl);
  const visited = new Set();
  const pages = [];
  const queue = [{ url: start, depth: 0 }, ...seedUrls.map((u) => ({ url: normalizeUrl(u), depth: 0 }))];

  while (queue.length > 0 && pages.length < MAX_PAGES) {
    queue.sort((a, b) => a.depth - b.depth);
    const { url, depth } = queue.shift();
    if (visited.has(url) || shouldSkipUrl(url) || !sameOrigin(url, start)) continue;
    visited.add(url);

    let html;
    try {
      const res = await fetchWithTimeout(url, REQUEST_TIMEOUT_MS);
      const finalUrl = normalizeUrl(res.url || url);
      if (!sameOrigin(finalUrl, start)) continue;
      const ct = res.headers.get("content-type") || "";
      if (!res.ok || !/text\/html|application\/xhtml/i.test(ct)) continue;
      html = await res.text();
      info(`📄 [${depth}] ${finalUrl}`);
    } catch (e) {
      info(`⚠️  ${url} — ${e.message}`);
      continue;
    }

    const text = stripHtml(html).slice(0, PER_PAGE_TEXT_CAP);
    const title = extractTitle(html);
    if (text.length > 120) {
      pages.push({ url, title: title || url, text });
    }

    if (depth < MAX_DEPTH) {
      for (const link of extractLinks(html, url)) {
        const norm = normalizeUrl(link);
        if (!visited.has(norm) && sameOrigin(norm, start) && !shouldSkipUrl(norm)) {
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
  for (const page of pages) {
    const block = `\n\n===== PAGE: ${page.url}\nTITLE: ${page.title}\n=====\n${page.text}\n`;
    if (total + block.length > TOTAL_TEXT_CAP) {
      const remaining = TOTAL_TEXT_CAP - total;
      if (remaining > 200) parts.push(block.slice(0, remaining));
      break;
    }
    parts.push(block);
    total += block.length;
  }
  return parts.join("");
}

function buildKbPrompt(corpus, sourceUrl, brandName) {
  return `You are building a blog writer knowledge base for "${brandName}" (${sourceUrl}).

The text below was crawled from their public website. Create structured knowledge base entries that an AI blog writer can use for brand voice, approved facts, services, programs, impact stats, events, and tone.

Return ONLY a JSON array (no markdown fences, no commentary). Each item:
{
  "title": string,           // clear entry title, e.g. "Mission & Brand Voice"
  "category": string | null, // one of: Brand, Programs, Services, Events, Fundraising, Impact, Leadership, Partnerships, Resources, Contact
  "content": string,         // 150-600 words of factual, writer-ready prose in markdown-lite (paragraphs + bullet lists OK). Only facts from the source.
  "tags": string[]           // 3-8 lowercase topic tags
}

Rules:
- Produce 10-18 entries covering distinct topics. Do not duplicate content across entries.
- Include at least one "Brand" entry for mission, voice, and who they serve.
- Include entries for major programs/services, events/fundraising, impact metrics, leadership/about, get-help resources, and contact info if present.
- Do NOT invent statistics, credentials, partner names, or services not stated in the source.
- Write in third person about the organization. Preserve proper nouns exactly.
- Skip generic blog post content; focus on evergreen brand knowledge.
- content must be non-empty and useful for blog generation prompts.

Source crawl (${sourceUrl}):
"""
${corpus}
"""`;
}

async function callClaude(apiKey, prompt) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://sweetmediaservices.com",
      "X-Title": "Sweet Media KB Crawler",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 8000,
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 500)}`);
  }
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "";
  return parseJsonArray(raw);
}

function parseJsonArray(raw) {
  let s = raw.trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(s);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // continue
  }
  const m = s.match(/\[[\s\S]*\]/);
  if (!m) throw new Error(`Claude returned non-JSON array:\n${raw.slice(0, 500)}`);
  return JSON.parse(m[0]);
}

function sanitizeEntries(rows) {
  return rows
    .map((row) => ({
      title: String(row.title ?? "").trim(),
      category: row.category ? String(row.category).trim() : null,
      content: String(row.content ?? "").trim(),
      tags: Array.isArray(row.tags)
        ? row.tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean)
        : [],
      is_active: true,
    }))
    .filter((row) => row.title && row.content.length >= 80);
}

async function deleteAllKb(supabaseUrl, serviceRoleKey) {
  const url = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/blog_knowledge_base?id=not.is.null`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal",
    },
  });
  if (!res.ok) throw new Error(`Delete failed ${res.status}: ${await res.text()}`);
}

async function insertKbRows(supabaseUrl, serviceRoleKey, rows) {
  const url = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/blog_knowledge_base`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(rows),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Insert failed ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function main() {
  const urlArg = getArg("--url");
  const slug = getArg("--client");
  const dryRun = hasFlag("--dry-run");
  const autoYes = hasFlag("--yes");
  const replace = hasFlag("--replace");

  console.log("\n📚  Sweet Media — Knowledge base crawler\n");

  if (!slug) {
    err("Missing --client (e.g. --client the-family-recovery-foundation)");
    process.exit(1);
  }
  if (!urlArg) {
    err("Missing --url (e.g. --url https://tfrfoundation.org)");
    process.exit(1);
  }

  const appDir = join(APPS_DIR, slug);
  if (!existsSync(appDir)) {
    err(`apps/${slug} does not exist.`);
    process.exit(1);
  }

  let normalized;
  try {
    normalized = urlArg.match(/^https?:\/\//) ? urlArg : `https://${urlArg}`;
    new URL(normalized);
  } catch {
    err(`Invalid --url: ${urlArg}`);
    process.exit(1);
  }

  const rootEnv = loadEnvFile(join(REPO_ROOT, ".env"));
  const openRouterKey = rootEnv.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!openRouterKey) {
    err("OPENROUTER_API_KEY missing in repo-root .env");
    process.exit(1);
  }

  const appEnv = loadEnvFile(join(appDir, ".env.local"));
  const supabaseUrl = appEnv.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = appEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (!dryRun && (!supabaseUrl || !serviceRoleKey)) {
    err(`apps/${slug}/.env.local needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY`);
    process.exit(1);
  }

  const brandName =
    appEnv.CONTACT_BRAND_NAME ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  step(`Discovering URLs from sitemap at ${normalized}`);
  let seedUrls = [];
  try {
    seedUrls = await parseSitemapUrls(`${normalized.replace(/\/$/, "")}/sitemap.xml`, normalized);
    if (seedUrls.length) info(`Sitemap yielded ${seedUrls.length} URL(s)`);
  } catch (e) {
    warn(`Sitemap parse failed: ${e.message}`);
  }

  step(`Crawling ${normalized} (max ${MAX_PAGES} pages)`);
  const pages = await crawl(normalized, seedUrls.slice(0, MAX_PAGES));
  if (pages.length === 0) {
    err("Crawler collected zero pages.");
    process.exit(1);
  }
  log(`Crawled ${pages.length} page(s).`);

  const corpus = buildCorpus(pages);
  info(`Corpus: ${corpus.length.toLocaleString()} chars`);

  step(`Generating knowledge base entries with ${OPENROUTER_MODEL}`);
  let extracted;
  try {
    extracted = await callClaude(openRouterKey, buildKbPrompt(corpus, normalized, brandName));
  } catch (e) {
    err(`Extraction failed: ${e.message}`);
    process.exit(1);
  }

  const entries = sanitizeEntries(extracted);
  if (entries.length === 0) {
    err("No valid knowledge base entries produced.");
    process.exit(1);
  }

  console.log("\nEntries to write:");
  for (const entry of entries) {
    console.log(`  • ${entry.title}${entry.category ? ` [${entry.category}]` : ""} (${entry.content.length} chars)`);
  }

  const reportPath = join(appDir, `kb-crawl-report-${slug}.json`);
  writeFileSync(
    reportPath,
    JSON.stringify({ sourceUrl: normalized, crawledPages: pages.length, entries }, null, 2),
    "utf8",
  );
  info(`Report saved: ${reportPath}`);

  if (dryRun) {
    log("Dry run complete — no database writes.");
    return;
  }

  if (!autoYes) {
    const ans = (await prompt(`\n👉  Write ${entries.length} entries to blog_knowledge_base? (y/n) `)).toLowerCase();
    if (ans !== "y" && ans !== "yes") {
      log("Skipped.");
      return;
    }
  }

  if (replace) {
    step("Removing existing knowledge base rows");
    await deleteAllKb(supabaseUrl, serviceRoleKey);
  }

  step(`Inserting ${entries.length} rows into blog_knowledge_base`);
  const inserted = await insertKbRows(supabaseUrl, serviceRoleKey, entries);
  log(`Inserted ${inserted.length} knowledge base entries for ${slug}.`);
}

main().catch((e) => {
  err(e?.stack || e?.message || String(e));
  process.exit(1);
});
