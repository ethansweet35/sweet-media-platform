#!/usr/bin/env node
/**
 * Sweet Media — WordPress Site Image Migration
 *
 * Downloads all images from a WordPress media library and any additional images
 * found by crawling the homepage, then uploads them to the client's Supabase
 * site-assets/images/ bucket. Writes a JSON mapping of original URLs → Supabase
 * public URLs for use during page/component builds.
 *
 * Usage:
 *   node scripts/migrate-wp-site-images.mjs \
 *     --wp-url       https://example.com \
 *     --site-id      brand-slug \
 *     --supabase-url https://ref.supabase.co \
 *     --supabase-key <service-role-key>
 *
 * Optional flags:
 *   --folder          Sub-folder inside site-assets/images/ (default: "wp-migrated")
 *   --per-page        WP REST API page size (default: 100)
 *   --skip-media-api  Skip WP REST /media endpoint; only crawl homepage HTML for images
 *   --dry-run         Download images locally but do not upload to Supabase
 *   --env-file        Path to .env.local to read credentials from (default: auto-detect)
 *
 * Note: Only original (full-resolution) images are uploaded. WordPress size variants
 * (thumbnail, medium, large, etc.) are intentionally skipped — Next.js handles
 * responsive resizing automatically via next/image with the `sizes` prop.
 *
 * Output:
 *   - Images uploaded to: {supabase-url}/storage/v1/object/public/site-assets/images/{folder}/
 *   - Mapping written to: image-map-{site-id}.json in repo root
 *
 * Standard workflow integration (Replicate Mode RM-1.5):
 *   Run this immediately after setup-new-client.mjs and before building any pages.
 *   Reference image-map-{site-id}.json when building components to use real images.
 */

import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { randomBytes } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT  = join(__dirname, '..');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }
function info(msg) { console.log(`    ${msg}`); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) { return process.argv.includes(flag); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function loadEnvFile(envPath) {
  if (!existsSync(envPath)) return {};
  const out = {};
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) return;
    const k = trimmed.slice(0, eqIdx).trim();
    const v = trimmed.slice(eqIdx + 1).trim();
    out[k] = v;
  });
  return out;
}

/** Slugify a filename — strip query strings, preserve extension */
function sanitizeFilename(url) {
  try {
    const u = new URL(url);
    const pathPart = u.pathname.split('/').pop() || 'image';
    // Remove query params from filename; keep extension
    const ext = extname(pathPart).toLowerCase() || '.jpg';
    const base = basename(pathPart, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
    return `${base}${ext}`;
  } catch {
    return `image-${randomBytes(4).toString('hex')}.jpg`;
  }
}

/** Determine MIME type from extension */
function mimeFromExt(filename) {
  const ext = extname(filename).toLowerCase();
  const map = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.png': 'image/png', '.gif': 'image/gif',
    '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
  };
  return map[ext] || 'image/jpeg';
}

/** Download a URL as a Buffer */
async function downloadImage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'SweetMedia-ImageMigrator/1.0' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    // Skip non-image responses (e.g. HTML error pages)
    if (!contentType.startsWith('image/') && !contentType.includes('svg')) {
      throw new Error(`Not an image (content-type: ${contentType})`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, contentType };
  } finally {
    clearTimeout(timeout);
  }
}

/** Upload buffer to Supabase Storage */
async function uploadToSupabase(supabaseUrl, serviceKey, storagePath, buf, contentType) {
  const url = `${supabaseUrl}/storage/v1/object/site-assets/${storagePath}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: buf,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed ${res.status}: ${text}`);
  }
  return `${supabaseUrl}/storage/v1/object/public/site-assets/${storagePath}`;
}

/** Fetch all WP media items via REST API (paginated) */
async function fetchWpMediaLibrary(wpUrl, perPage = 100) {
  const items = [];
  let page = 1;
  while (true) {
    const url = `${wpUrl}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}&_fields=id,source_url,mime_type,title,alt_text,media_details`;
    let res;
    try {
      res = await fetch(url, { headers: { 'User-Agent': 'SweetMedia-ImageMigrator/1.0' } });
    } catch (e) {
      warn(`WP REST /media fetch failed: ${e.message}`);
      break;
    }
    if (res.status === 400 || res.status === 404) break; // past last page
    if (!res.ok) {
      warn(`WP REST /media returned ${res.status} — skipping media library`);
      break;
    }
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    items.push(...batch);
    info(`  Page ${page}/${totalPages} — ${items.length} items so far`);
    if (page >= totalPages) break;
    page++;
    await sleep(200);
  }
  return items;
}

/** Crawl homepage HTML and extract all <img> src and srcset URLs */
async function crawlHomepageImages(wpUrl) {
  const urls = new Set();
  try {
    const res = await fetch(wpUrl, { headers: { 'User-Agent': 'SweetMedia-ImageMigrator/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // <img src="...">
    for (const m of html.matchAll(/\bsrc=["']([^"']+\.(?:jpe?g|png|gif|webp|avif|svg)[^"']*)/gi)) {
      try { urls.add(new URL(m[1], wpUrl).href.split('?')[0]); } catch {}
    }
    // srcset
    for (const m of html.matchAll(/\bsrcset=["']([^"']+)/gi)) {
      for (const part of m[1].split(',')) {
        const src = part.trim().split(/\s+/)[0];
        if (src && /\.(jpe?g|png|gif|webp|avif|svg)/i.test(src)) {
          try { urls.add(new URL(src, wpUrl).href.split('?')[0]); } catch {}
        }
      }
    }
    // CSS background-image: url(...)
    for (const m of html.matchAll(/url\(["']?([^"')]+\.(?:jpe?g|png|gif|webp|avif)[^"')]*)/gi)) {
      try { urls.add(new URL(m[1], wpUrl).href.split('?')[0]); } catch {}
    }
  } catch (e) {
    warn(`Homepage crawl failed: ${e.message}`);
  }
  return [...urls];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🖼️   Sweet Media — WordPress Site Image Migration\n');

  // ── Resolve credentials ───────────────────────────────────────────────────
  const wpUrl      = (getArg('--wp-url') || '').replace(/\/$/, '');
  const siteId     = getArg('--site-id');
  const folder     = getArg('--folder') || 'wp-migrated';
  const perPage    = parseInt(getArg('--per-page') || '100', 10);
  const isDryRun   = hasFlag('--dry-run');
  const skipMedia  = hasFlag('--skip-media-api');

  if (!wpUrl) die('--wp-url is required (e.g. https://rizeoc.com)');
  if (!siteId) die('--site-id is required (e.g. rize-oc)');

  // Resolve Supabase credentials: flags → .env.local → .env
  let supabaseUrl = getArg('--supabase-url');
  let serviceKey  = getArg('--supabase-key');

  if (!supabaseUrl || !serviceKey) {
    // Try auto-detecting from apps/<site-id>/.env.local
    const envCandidates = [
      join(REPO_ROOT, 'apps', siteId, '.env.local'),
      getArg('--env-file'),
      join(REPO_ROOT, '.env'),
    ].filter(Boolean);

    for (const envPath of envCandidates) {
      if (!existsSync(envPath)) continue;
      const env = loadEnvFile(envPath);
      supabaseUrl = supabaseUrl || env.NEXT_PUBLIC_SUPABASE_URL;
      serviceKey  = serviceKey  || env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && serviceKey) break;
    }
  }

  if (!supabaseUrl) die('Supabase URL not found. Pass --supabase-url or ensure NEXT_PUBLIC_SUPABASE_URL is in apps/<site-id>/.env.local');
  if (!serviceKey && !isDryRun) die('Service role key not found. Pass --supabase-key or ensure SUPABASE_SERVICE_ROLE_KEY is in apps/<site-id>/.env.local');

  log(`WordPress source: ${wpUrl}`);
  log(`Supabase project: ${supabaseUrl}`);
  log(`Upload folder:    images/${folder}/`);
  if (isDryRun) warn('DRY RUN — no uploads will be performed');

  // ── Collect image URLs ────────────────────────────────────────────────────
  const imageMap = {}; // originalUrl → supabasePublicUrl
  const allImageUrls = new Map(); // url → { filename, alt, mime }

  if (!skipMedia) {
    step('Fetching WordPress media library via REST API');
    const mediaItems = await fetchWpMediaLibrary(wpUrl, perPage);
    log(`Found ${mediaItems.length} items in WP media library`);

    for (const item of mediaItems) {
      if (!item.source_url) continue;
      const mime = item.mime_type || '';
      if (!mime.startsWith('image/') && !mime.includes('svg')) continue;
      const filename = sanitizeFilename(item.source_url);
      const alt = item.alt_text || item.title?.rendered || '';
      // Originals only — Next.js handles responsive resizing via next/image; WP size variants are redundant
      allImageUrls.set(item.source_url, { filename, alt, mime: mime || mimeFromExt(filename) });
    }
  }

  step('Crawling homepage HTML for additional images');
  const homepageUrls = await crawlHomepageImages(wpUrl);
  let newFromHomepage = 0;
  for (const url of homepageUrls) {
    if (!allImageUrls.has(url)) {
      const filename = sanitizeFilename(url);
      allImageUrls.set(url, { filename, alt: '', mime: mimeFromExt(filename) });
      newFromHomepage++;
    }
  }
  log(`Homepage crawl found ${homepageUrls.length} images (${newFromHomepage} new, not in media library)`);

  // Filter to only images hosted on the WP domain (skip CDN/external)
  const wpHost = new URL(wpUrl).hostname;
  const toProcess = [...allImageUrls.entries()].filter(([url]) => {
    try { return new URL(url).hostname.includes(wpHost.replace('www.', '')); }
    catch { return false; }
  });

  info(`Total images to migrate: ${toProcess.length}`);

  // ── Download & upload ────────────────────────────────────────────────────
  step(`Downloading and uploading ${toProcess.length} images`);
  const results = { uploaded: [], skipped: [], failed: [] };
  const seenFilenames = new Map(); // track duplicates

  for (let i = 0; i < toProcess.length; i++) {
    const [originalUrl, meta] = toProcess[i];

    // Deduplicate filenames
    let filename = meta.filename;
    if (seenFilenames.has(filename)) {
      const count = seenFilenames.get(filename) + 1;
      seenFilenames.set(filename, count);
      const ext = extname(filename);
      filename = `${basename(filename, ext)}-${count}${ext}`;
    } else {
      seenFilenames.set(filename, 1);
    }

    const storagePath = `images/${folder}/${filename}`;
    const progress = `[${i + 1}/${toProcess.length}]`;

    try {
      const { buf, contentType } = await downloadImage(originalUrl);

      if (isDryRun) {
        info(`${progress} DRY RUN: would upload ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
        imageMap[originalUrl] = `${supabaseUrl}/storage/v1/object/public/site-assets/${storagePath}`;
        results.uploaded.push({ originalUrl, filename, bytes: buf.length });
      } else {
        const publicUrl = await uploadToSupabase(supabaseUrl, serviceKey, storagePath, buf, contentType);
        imageMap[originalUrl] = publicUrl;
        results.uploaded.push({ originalUrl, filename, publicUrl, bytes: buf.length });
        info(`${progress} ✓ ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
      }
    } catch (e) {
      warn(`${progress} FAILED ${filename}: ${e.message}`);
      results.failed.push({ originalUrl, filename, error: e.message });
    }

    // Rate limiting — be polite to WP and Supabase
    if ((i + 1) % 10 === 0) await sleep(300);
  }

  // ── Write mapping file ────────────────────────────────────────────────────
  const mapPath = join(REPO_ROOT, `image-map-${siteId}.json`);
  writeFileSync(mapPath, JSON.stringify({
    _meta: {
      generatedAt: new Date().toISOString(),
      wpSource: wpUrl,
      supabaseProject: supabaseUrl,
      folder: `images/${folder}/`,
      totalImages: toProcess.length,
      uploaded: results.uploaded.length,
      failed: results.failed.length,
    },
    map: imageMap,
    failed: results.failed,
  }, null, 2));

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log(`Image migration complete!`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  info(`Uploaded : ${results.uploaded.length}`);
  info(`Failed   : ${results.failed.length}`);
  info(`Map file : ${mapPath}`);
  if (!isDryRun) {
    info(`Public base: ${supabaseUrl}/storage/v1/object/public/site-assets/images/${folder}/`);
  }

  if (results.failed.length > 0) {
    warn('Some images failed — see "failed" array in the map file for details.');
  }

  console.log('\n─── Next steps ──────────────────────────────────────\n');
  console.log(`1. Reference image-map-${siteId}.json when building page components`);
  console.log('   Use map[originalWpUrl] to get the Supabase public URL');
  console.log('2. For pages needing new/AI images, use GenerateImage tool per platform-unique-page-imagery rule');
  console.log('3. Run migrate-wordpress-content.mjs next to migrate blog posts\n');
}

main().catch(e => { console.error(e); process.exit(1); });
