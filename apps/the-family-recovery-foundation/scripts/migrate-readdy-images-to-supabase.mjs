#!/usr/bin/env node
/**
 * Downloads unique Readdy image URLs from src/, uploads to Supabase site-assets/images/,
 * writes uploaded-image-files.txt, and replaces URLs in source files.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const srcRoot = path.join(projectRoot, "src");
const envFile = path.join(projectRoot, process.env.UPLOAD_ENV_FILE || ".upload.env");

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: envFile });

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

const IMAGE_URL_RE =
  /https:\/\/(?:readdy\.ai\/api\/search-image[^"'`\s)]+|static\.readdy\.ai\/image\/[^"'`\s)]+)/g;
const SEQ_RE = /[?&]seq=([^&"'`\s)]+)/;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function collectUrls() {
  const urls = new Set();
  for (const file of walk(srcRoot)) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(IMAGE_URL_RE)) urls.add(match[0]);
  }
  return [...urls];
}

function filenameFor(url) {
  const seq = url.match(SEQ_RE)?.[1];
  if (seq) {
    const safe = decodeURIComponent(seq).replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 80);
    return `tfrf_${safe}.jpg`;
  }
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 12);
  return `tfrf_static_${hash}.jpg`;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "SweetMediaPlatform/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "image/jpeg";
  return { buf, contentType: ct.includes("png") ? "image/png" : "image/jpeg" };
}

async function main() {
  const urls = collectUrls();
  console.log(`Found ${urls.length} unique Readdy image URLs`);

  const uploadedList = [];
  const urlToPublic = new Map();

  for (const url of urls) {
    const name = filenameFor(url);
    const storagePath = `images/${name}`;

    try {
      const { buf, contentType } = await download(url);
      const { error } = await supabase.storage.from(bucket).upload(storagePath, buf, {
        contentType,
        cacheControl: "31536000",
        upsert: true,
      });
      if (error) throw error;
      urlToPublic.set(url, publicBase + name);
      uploadedList.push(name);
      console.log(`Uploaded: ${name}`);
    } catch (err) {
      console.error(`Failed ${name}: ${err.message}`);
    }
  }

  fs.writeFileSync(path.join(projectRoot, "uploaded-image-files.txt"), uploadedList.join("\n") + "\n");

  let changedFiles = 0;
  for (const file of walk(srcRoot)) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const [from, to] of urlToPublic) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
