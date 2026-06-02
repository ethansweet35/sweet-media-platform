#!/usr/bin/env node
/**
 * Generate navbar WebP from public/brand/mbh-logo-full-horizontal.png
 *
 *   node apps/missouri-behavioral-health/scripts/optimize-nav-logo.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = join(__dirname, "..");
const source = join(appRoot, "public", "brand", "mbh-logo-full-horizontal.png");
const out = join(appRoot, "public", "brand", "mbh-logo-nav.webp");

const buffer = await sharp(readFileSync(source))
  .resize({ width: 280, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toBuffer();

writeFileSync(out, buffer);
console.log(`Wrote ${out} (${(buffer.length / 1024).toFixed(1)} KB)`);
