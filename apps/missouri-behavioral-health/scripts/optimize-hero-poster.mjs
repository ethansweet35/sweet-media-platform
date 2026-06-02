#!/usr/bin/env node
/**
 * Generate optimized hero posters → public/images (LCP) + optional Supabase upload.
 *
 *   node apps/missouri-behavioral-health/scripts/optimize-hero-poster.mjs
 *
 * Requires sharp (devDependency). Supabase upload needs SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");
const envPath = join(appRoot, ".env.local");
const publicImages = join(appRoot, "public", "images");

const SUPABASE_ORIGIN = "https://yfwyxafsgexejjebkwor.supabase.co";
const BUCKET = "site-assets";
const SOURCE_URL = `${SUPABASE_ORIGIN}/storage/v1/object/public/site-assets/images/mbh_hero_landscape.png`;

const OUTPUTS = [
  { name: "mbh_home_hero_poster.webp", width: 1280, quality: 72, format: "webp" },
  { name: "mbh_home_hero_poster_mobile.webp", width: 480, quality: 72, format: "webp" },
  { name: "mbh_home_hero_poster_mobile.avif", width: 480, quality: 45, format: "avif" },
];

function loadEnvKey() {
  if (!existsSync(envPath)) return null;
  const text = readFileSync(envPath, "utf8");
  return text.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m)?.[1]?.trim() ?? null;
}

async function upload(serviceKey, storagePath, buffer, contentType) {
  const url = `${SUPABASE_ORIGIN}/storage/v1/object/${BUCKET}/${storagePath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": contentType,
      "x-upsert": "true",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: buffer,
  });
  if (!res.ok) {
    throw new Error(`Upload failed ${storagePath}: ${res.status} ${await res.text()}`);
  }
}

async function encode(source, { width, quality, format }) {
  let pipeline = sharp(source).rotate().resize({ width, withoutEnlargement: true });
  if (format === "avif") {
    return pipeline.avif({ quality, effort: 6 }).toBuffer();
  }
  return pipeline.webp({ quality, effort: 6 }).toBuffer();
}

async function main() {
  console.log("Downloading source poster…");
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const source = Buffer.from(await res.arrayBuffer());
  console.log(`Source: ${(source.length / 1024).toFixed(0)} KB`);

  mkdirSync(publicImages, { recursive: true });

  const serviceKey = loadEnvKey();
  if (!serviceKey) {
    console.warn("No SUPABASE_SERVICE_ROLE_KEY — writing public/ only.");
  }

  for (const spec of OUTPUTS) {
    const buffer = await encode(source, spec);
    const localPath = join(publicImages, spec.name);
    writeFileSync(localPath, buffer);
    const contentType = spec.format === "avif" ? "image/avif" : "image/webp";
    console.log(`public/images/${spec.name}: ${(buffer.length / 1024).toFixed(1)} KB`);

    if (serviceKey) {
      await upload(serviceKey, `images/${spec.name}`, buffer, contentType);
      console.log(`  → uploaded to Supabase images/${spec.name}`);
    }
  }

  console.log("\nDone. heroMedia.ts serves posters from /images/ on the app origin.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
