#!/usr/bin/env node
/**
 * Downloads Squarespace CDN images referenced in src/ (and optionally crawled from the live site),
 * uploads to Supabase site-assets/images/, and replaces URLs in source files.
 *
 * Usage:
 *   node scripts/migrate-squarespace-images-to-supabase.mjs
 *   node scripts/migrate-squarespace-images-to-supabase.mjs --crawl
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const srcRoot = path.join(projectRoot, "src");
const crawl = process.argv.includes("--crawl");
const LIVE_ORIGIN = process.env.LIVE_SITE_URL || "https://tfrfoundation.org";

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = process.env.SUPABASE_BUCKET || "site-assets";
const projectRef =
  process.env.SUPABASE_PROJECT_REF || supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

if (!supabaseUrl || !serviceRoleKey || !projectRef) {
  console.error("Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local / .upload.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const publicBase = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/images/`;

const SQUARESPACE_RE =
  /https:\/\/(?:images\.squarespace-cdn\.com|static1\.squarespace\.com)[^"'`\s)]+/gi;

const CRAWL_PATHS = [
  "/",
  "/about",
  "/about-the-family-recovery-foundation",
  "/about/testimonials",
  "/partnerships",
  "/2025-survey-results",
  "/family-programming",
  "/3-pillars",
  "/prevention",
  "/education",
  "/financial-aid",
  "/resources",
  "/get-help",
  "/get-involved",
  "/gala",
  "/gala/nashville",
  "/events-1",
  "/donate",
  "/contact",
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|js|jsx|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function normalizeUrl(raw) {
  try {
    const u = new URL(raw.replace(/\\u0026/g, "&"));
    u.search = "";
    return u.toString();
  } catch {
    return raw.split("?")[0];
  }
}

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|svg|ico)(\?|$|&|")/i;

function isImageUrl(raw) {
  const cleaned = raw.replace(/&quot;.*$/, "").replace(/["',;)]+$/, "");
  try {
    const u = new URL(cleaned);
    return IMAGE_EXT.test(u.pathname) || IMAGE_EXT.test(cleaned);
  } catch {
    return IMAGE_EXT.test(cleaned);
  }
}

function collectFromText(text, set) {
  for (const match of text.matchAll(SQUARESPACE_RE)) {
    const raw = match[0];
    if (isImageUrl(raw)) set.add(normalizeUrl(raw));
  }
}

function collectFromSrc() {
  const urls = new Set();
  for (const file of walk(srcRoot)) {
    collectFromText(fs.readFileSync(file, "utf8"), urls);
  }
  return urls;
}

async function collectFromLiveSite() {
  const urls = new Set();
  for (const route of CRAWL_PATHS) {
    const url = `${LIVE_ORIGIN}${route}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "SweetMediaPlatform/1.0" },
        redirect: "follow",
      });
      if (!res.ok) {
        console.warn(`Crawl skip ${route}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      collectFromText(html, urls);
      console.log(`Crawled ${route}: found ${urls.size} unique Squarespace URLs so far`);
    } catch (err) {
      console.warn(`Crawl failed ${route}: ${err.message}`);
    }
  }
  return urls;
}

function filenameFor(url) {
  try {
    const u = new URL(url);
    const segments = u.pathname.split("/").filter(Boolean);
    const assetId = segments[segments.length - 2] || crypto.createHash("sha1").update(url).digest("hex").slice(0, 8);
    const rawName = decodeURIComponent(segments[segments.length - 1] || "image.jpg");
    const extMatch = rawName.match(/\.([a-zA-Z0-9]+)$/);
    let ext = (extMatch?.[1] || "jpg").toLowerCase();
    if (ext === "jpeg") ext = "jpg";
    const base = rawName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .replace(/_+/g, "_")
      .slice(0, 72);
    return `tfrf_sq_${assetId.slice(0, 8)}_${base || "image"}.${ext}`;
  } catch {
    const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 12);
    return `tfrf_sq_${hash}.jpg`;
  }
}

function downloadUrl(url) {
  const u = new URL(url);
  if (u.hostname.includes("squarespace")) {
    u.searchParams.set("format", "2500w");
  }
  return u.toString();
}

function contentTypeFor(ext) {
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  if (ext === "svg") return "image/svg+xml";
  return "image/jpeg";
}

async function download(url) {
  const res = await fetch(downloadUrl(url), {
    headers: { "User-Agent": "SweetMediaPlatform/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "";
  return { buf, contentType: ct.split(";")[0] || "image/jpeg" };
}

async function main() {
  const fromSrc = collectFromSrc();
  console.log(`Found ${fromSrc.size} Squarespace URLs in src/`);

  let urls = fromSrc;
  if (crawl) {
    const fromLive = await collectFromLiveSite();
    urls = new Set([...fromSrc, ...fromLive]);
    console.log(`After live crawl: ${urls.size} unique URLs`);
  }

  const urlList = [...urls].sort();
  const urlToPublic = new Map();
  const uploadedList = [];
  const manifest = [];

  for (const url of urlList) {
    const name = filenameFor(url);
    const storagePath = `images/${name}`;
    const ext = name.split(".").pop() || "jpg";

    try {
      const { buf, contentType } = await download(url);
      const { error } = await supabase.storage.from(bucket).upload(storagePath, buf, {
        contentType: contentType.includes("image") ? contentType : contentTypeFor(ext),
        cacheControl: "31536000",
        upsert: true,
      });
      if (error) throw error;
      const publicUrl = publicBase + name;
      urlToPublic.set(url, publicUrl);
      uploadedList.push(name);
      manifest.push({ source: url, file: name, publicUrl });
      console.log(`Uploaded: ${name}`);
    } catch (err) {
      console.error(`Failed ${name} (${url}): ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(projectRoot, "uploaded-squarespace-images.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  fs.appendFileSync(
    path.join(projectRoot, "uploaded-image-files.txt"),
    uploadedList.map((n) => `sq:${n}`).join("\n") + (uploadedList.length ? "\n" : ""),
  );

  let changedFiles = 0;
  for (const file of walk(srcRoot)) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const [from, to] of urlToPublic) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
      // Also replace percent-encoded variants (@ vs %40, spaces as +, etc.)
      const encoded = from.replace(/@/g, "%40");
      if (encoded !== from && text.includes(encoded)) {
        text = text.split(encoded).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, text);
      changedFiles += 1;
    }
  }

  console.log(`Replaced URLs in ${changedFiles} files`);
  console.log(`Public base: ${publicBase}`);
  console.log(`Manifest: uploaded-squarespace-images.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
