#!/usr/bin/env node
/**
 * Migrate external blog image URLs (non-WP hosts) into Supabase site-assets.
 *
 * Usage:
 *   node scripts/migrate-external-blog-images.mjs \
 *     --supabase-ref almncgkbmooyuptdgkhe \
 *     --supabase-key <service_role_key> \
 *     --source-host images.surferseo.art \
 *     --prefix images/surferseo-inline/ \
 *     [--concurrency 4] [--dry-run]
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}
function hasFlag(name) {
  return process.argv.includes(name);
}

function die(msg) {
  console.error(`\n❌ ${msg}`);
  process.exit(1);
}

const supabaseRef = getArg("--supabase-ref");
const serviceKey = getArg("--supabase-key") || loadServiceKeyFromAmhEnv();
const sourceHost = getArg("--source-host");
const bucket = getArg("--bucket", "site-assets");
const prefix = (getArg("--prefix", "images/external-inline/") || "").replace(/^\/+|\/+$/g, "") + "/";
const concurrency = parseInt(getArg("--concurrency", "4"), 10);
const dryRun = hasFlag("--dry-run");

if (!supabaseRef) die("--supabase-ref is required");
if (!serviceKey) die("--supabase-key is required (or SUPABASE_SERVICE_ROLE_KEY in AMH .env.local)");
if (!sourceHost) die("--source-host is required (e.g. images.surferseo.art)");

const supabaseUrl = `https://${supabaseRef}.supabase.co`;
const publicBase = `${supabaseUrl}/storage/v1/object/public/${bucket}/`;
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|svg|avif)(\?.*)?$/i;

function loadServiceKeyFromAmhEnv() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY;
  const envPath = join(REPO_ROOT, "apps/adolescent-mental-health/.env.local");
  if (!existsSync(envPath)) return null;
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith("SUPABASE_SERVICE_ROLE_KEY="));
  return line ? line.slice("SUPABASE_SERVICE_ROLE_KEY=".length).trim() : null;
}

function isTargetImageUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== sourceHost) return false;
    return IMAGE_EXT.test(u.pathname);
  } catch {
    return false;
  }
}

function urlToStoragePath(url) {
  const u = new URL(url);
  let p = u.pathname.replace(/^\/+/, "");
  p = p.split("/").map((seg) => seg.replace(/[^a-zA-Z0-9._-]+/g, "-")).join("/");
  return prefix + p;
}

function publicUrlFor(storagePath) {
  return publicBase + storagePath.split("/").map(encodeURIComponent).join("/");
}

function extractImageUrls(text) {
  const urls = new Set();
  if (!text) return urls;

  const mdImage = /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  let m;
  while ((m = mdImage.exec(text)) !== null) urls.add(m[1].trim());

  const mdLink = /\[[^\]]*\]\(([^)\s]+)\)/g;
  while ((m = mdLink.exec(text)) !== null) {
    const url = m[1].trim();
    if (IMAGE_EXT.test(url)) urls.add(url);
  }

  const htmlImg = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;
  while ((m = htmlImg.exec(text)) !== null) urls.add(m[1].trim());

  const raw = /https?:\/\/[^\s"'<>]+/g;
  while ((m = raw.exec(text)) !== null) {
    const url = m[0].replace(/[),.;]+$/, "");
    if (IMAGE_EXT.test(url)) urls.add(url);
  }

  return [...urls].filter(isTargetImageUrl);
}

function replaceUrlEverywhere(text, urlMap) {
  if (!text || urlMap.size === 0) return text;
  let out = text;
  for (const oldUrl of [...urlMap.keys()].sort((a, b) => b.length - a.length)) {
    const newUrl = urlMap.get(oldUrl);
    if (out.includes(oldUrl)) out = out.split(oldUrl).join(newUrl);
  }
  return out;
}

async function supabaseSelectAll(table, query) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}${query}`, {
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  });
  if (!res.ok) die(`Supabase select failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function supabasePatch(id, body) {
  const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) die(`Supabase patch failed: ${res.status} ${await res.text()}`);
}

async function storageObjectExists(storagePath) {
  const res = await fetch(publicUrlFor(storagePath), { method: "HEAD" });
  return res.ok;
}

async function uploadToStorage(storagePath, buffer, contentType) {
  const res = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${storagePath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: buffer,
  });
  if (!res.ok) die(`Storage upload failed: ${res.status} ${await res.text()}`);
  return publicUrlFor(storagePath);
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "SweetMediaExternalImageMigrator/1.0" },
    redirect: "follow",
  });
  if (!res.ok) die(`Download failed ${url}: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = (res.headers.get("content-type") || "application/octet-stream").split(";")[0].trim();
  return { buffer, contentType };
}

console.log(`\n📦 External blog image migration`);
console.log(`  Supabase ref : ${supabaseRef}`);
console.log(`  Source host  : ${sourceHost}`);
console.log(`  Prefix       : ${prefix}`);
if (dryRun) console.log(`  ** DRY RUN **`);

const posts = await supabaseSelectAll("blog_posts", "?select=id,slug,content&order=published_at.desc");
const refCount = new Map();

for (const post of posts) {
  for (const url of extractImageUrls(post.content || "")) {
    refCount.set(url, (refCount.get(url) || 0) + 1);
  }
}

console.log(`\n✓ Loaded ${posts.length} posts`);
console.log(`✓ Found ${refCount.size} unique ${sourceHost} image URLs`);

if (refCount.size === 0) {
  console.log("Nothing to migrate.");
  process.exit(0);
}

if (dryRun) {
  for (const [url, count] of [...refCount.entries()].slice(0, 10)) {
    console.log(`  ${url}`);
    console.log(`    → ${publicUrlFor(urlToStoragePath(url))} (${count} refs)`);
  }
  process.exit(0);
}

const allUrls = [...refCount.keys()];
const urlMap = new Map();
let cursor = 0;
let uploaded = 0;
let skipped = 0;

async function worker() {
  while (cursor < allUrls.length) {
    const oldUrl = allUrls[cursor++];
    const storagePath = urlToStoragePath(oldUrl);
    if (await storageObjectExists(storagePath)) {
      urlMap.set(oldUrl, publicUrlFor(storagePath));
      skipped++;
      continue;
    }
    const { buffer, contentType } = await downloadImage(oldUrl);
    const newUrl = await uploadToStorage(storagePath, buffer, contentType);
    urlMap.set(oldUrl, newUrl);
    uploaded++;
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

console.log(`\n✓ Uploaded ${uploaded}, skipped ${skipped} (already in storage)`);

let postsUpdated = 0;
for (const post of posts) {
  if (!post.content) continue;
  const newContent = replaceUrlEverywhere(post.content, urlMap);
  if (newContent !== post.content) {
    await supabasePatch(post.id, { content: newContent });
    postsUpdated++;
  }
}

console.log(`✓ Updated ${postsUpdated} posts in Supabase`);
console.log("\n✅ External image migration complete\n");
