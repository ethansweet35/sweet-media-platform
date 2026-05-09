#!/usr/bin/env node
/**
 * WP Inline Image Migration
 *
 * Scans both data sources for image URLs pointing at the legacy WP host:
 *   - blog_posts.content in Supabase (markdown bodies, with both ![](url) and <img src="url">)
 *   - migration-report.json pageContents[].rawHtml (full WP HTML for every page)
 *
 * For every unique WP image URL found:
 *   1. Download the image
 *   2. Upload to Supabase site-assets bucket at images/wp-inline/<sanitized-path>
 *   3. Record old → new URL mapping
 *
 * Then rewrites all references in-place:
 *   - Updates blog_posts.content for every post that referenced any migrated URL
 *   - Updates migration-report.json's pageContents[].rawHtml in-place + writes back
 *
 * Usage:
 *   node scripts/wp-migrate-inline-images.mjs \
 *     --supabase-ref ahufsygjwpbymomfdazb \
 *     --supabase-key <service_role_key> \
 *     --wp-host www.northboundtreatment.com \
 *     [--report apps/<slug>-migration/migration-report.json] \
 *     [--bucket site-assets] \
 *     [--prefix images/wp-inline/] \
 *     [--concurrency 6] \
 *     [--dry-run]
 *
 * One-time utility. Designed to be re-runnable safely (skips already-uploaded images).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}
function hasFlag(name) { return process.argv.indexOf(name) > -1; }

function log(msg)  { console.log(`✓ ${msg}`); }
function step(msg) { console.log(`\n⏳ ${msg}...`); }
function warn(msg) { console.log(`⚠️  ${msg}`); }
function info(msg) { console.log(`   ${msg}`); }
function die(msg)  { console.error(`\n❌ ${msg}`); process.exit(1); }

const supabaseRef = getArg('--supabase-ref');
const serviceKey  = getArg('--supabase-key');
const wpHost      = getArg('--wp-host');
const reportPath  = getArg('--report');
const bucket      = getArg('--bucket', 'site-assets');
const prefix      = (getArg('--prefix', 'images/wp-inline/') || '').replace(/^\/+|\/+$/g, '') + '/';
const concurrency = parseInt(getArg('--concurrency', '6'), 10);
const dryRun      = hasFlag('--dry-run');

if (!supabaseRef) die('--supabase-ref is required');
if (!serviceKey)  die('--supabase-key is required');
if (!wpHost)      die('--wp-host is required (e.g. www.example.com)');

const supabaseUrl = `https://${supabaseRef}.supabase.co`;
const publicBase  = `${supabaseUrl}/storage/v1/object/public/${bucket}/`;

const wpHostsToReplace = new Set([wpHost, wpHost.replace(/^www\./, ''), 'www.' + wpHost.replace(/^www\./, '')]);

console.log(`\n📦 WP inline image migration`);
console.log(`  Supabase ref : ${supabaseRef}`);
console.log(`  WP host      : ${wpHost} (also matches: ${[...wpHostsToReplace].join(', ')})`);
console.log(`  Bucket       : ${bucket}`);
console.log(`  Prefix       : ${prefix}`);
console.log(`  Concurrency  : ${concurrency}`);
if (reportPath) console.log(`  Page report  : ${reportPath}`);
if (dryRun)     console.log(`  ** DRY RUN — no uploads or DB writes **`);
console.log('');

// ───────────────────────────────────────────────────────────────────────────────
// URL extraction helpers
// ───────────────────────────────────────────────────────────────────────────────

/** Returns true if url's hostname matches any of the WP hosts we want to migrate. */
function isWpImageUrl(url) {
  try {
    const u = new URL(url);
    if (!wpHostsToReplace.has(u.hostname)) return false;
    // Heuristic: WP uploads live under /wp-content/uploads/. Don't migrate other things.
    if (!u.pathname.includes('/wp-content/uploads/')) return false;
    return true;
  } catch {
    return false;
  }
}

/** Sanitize a WP image URL pathname into a Supabase storage key. */
function urlToStoragePath(url) {
  const u = new URL(url);
  // /wp-content/uploads/2024/01/foo.jpg → 2024/01/foo.jpg
  let p = u.pathname.replace(/^\/+/, '').replace(/^wp-content\/uploads\//, '');
  // Replace any unsafe chars but preserve slashes for nesting
  p = p.split('/').map(seg => seg.replace(/[^a-zA-Z0-9._-]+/g, '-')).join('/');
  return prefix + p;
}

function publicUrlFor(storagePath) {
  return publicBase + storagePath.split('/').map(encodeURIComponent).join('/');
}

/** Extract every image URL referenced anywhere in markdown content. */
function extractMarkdownImageUrls(md) {
  const urls = new Set();
  if (!md) return urls;
  // Standard markdown: ![alt](url) and ![alt](url "title")
  const mdImage = /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  let m;
  while ((m = mdImage.exec(md)) !== null) urls.add(m[1].trim());
  // Embedded HTML <img src="...">
  const htmlImg = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;
  while ((m = htmlImg.exec(md)) !== null) urls.add(m[1].trim());
  // Embedded HTML <img srcset="..."> — multiple URLs
  const htmlSrcset = /<img\b[^>]*\bsrcset=["']([^"']+)["']/gi;
  while ((m = htmlSrcset.exec(md)) !== null) {
    for (const part of m[1].split(',')) urls.add(part.trim().split(/\s+/)[0]);
  }
  return urls;
}

/** Extract every image URL referenced in HTML content. */
function extractHtmlImageUrls(html) {
  const urls = new Set();
  if (!html) return urls;
  // <img src="...">
  const reSrc = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;
  let m;
  while ((m = reSrc.exec(html)) !== null) urls.add(m[1].trim());
  // <img srcset="..."> — comma-separated, each has size descriptor
  const reSrcset = /\bsrcset=["']([^"']+)["']/gi;
  while ((m = reSrcset.exec(html)) !== null) {
    for (const part of m[1].split(',')) urls.add(part.trim().split(/\s+/)[0]);
  }
  // <a href="..."> to image files (lightbox links)
  const reHref = /<a\b[^>]*\bhref=["']([^"']+\.(?:jpe?g|png|gif|webp|svg))["']/gi;
  while ((m = reHref.exec(html)) !== null) urls.add(m[1].trim());
  // CSS background-image: url(...)
  const reBg = /background(?:-image)?\s*:\s*url\(\s*["']?([^)"']+)["']?\s*\)/gi;
  while ((m = reBg.exec(html)) !== null) urls.add(m[1].trim());
  return urls;
}

/** Replace every occurrence of `oldUrl` (and common variants) with `newUrl` in `text`. */
function replaceUrlEverywhere(text, urlMap) {
  if (!text || urlMap.size === 0) return text;
  // Build a sorted list (longest URL first) so substring overlaps don't miss-match
  const sortedOld = [...urlMap.keys()].sort((a, b) => b.length - a.length);
  let out = text;
  for (const oldUrl of sortedOld) {
    const newUrl = urlMap.get(oldUrl);
    if (out.includes(oldUrl)) {
      out = out.split(oldUrl).join(newUrl);
    }
  }
  return out;
}

// ───────────────────────────────────────────────────────────────────────────────
// Supabase helpers
// ───────────────────────────────────────────────────────────────────────────────

async function supabaseSelectAll(table, query) {
  const url = `${supabaseUrl}/rest/v1/${table}${query}`;
  const res = await fetch(url, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase select ${table} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function supabasePatch(table, id, body) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Supabase patch ${table}/${id} failed: ${res.status} ${await res.text()}`);
}

async function storageObjectExists(storagePath) {
  // HEAD on the public URL — the bucket is public so this works without auth
  const res = await fetch(publicUrlFor(storagePath), { method: 'HEAD' });
  return res.ok;
}

async function uploadToStorage(storagePath, buffer, contentType) {
  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${storagePath}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': contentType,
      'x-upsert': 'true', // overwrite if it exists, idempotent
    },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Storage upload failed: ${res.status} ${await res.text()}`);
  return publicUrlFor(storagePath);
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'SweetMediaInlineImageMigrator/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  let contentType = res.headers.get('content-type') || 'application/octet-stream';
  contentType = contentType.split(';')[0].trim();
  return { buffer, contentType };
}

// ───────────────────────────────────────────────────────────────────────────────
// Main
// ───────────────────────────────────────────────────────────────────────────────

(async () => {
  // ── 1. Pull blog post bodies ───────────────────────────────────────────────
  step('Loading blog posts from Supabase');
  const posts = await supabaseSelectAll('blog_posts', '?select=id,slug,content&order=published_at.desc');
  log(`Loaded ${posts.length} posts`);

  // ── 2. Load migration report (optional) ────────────────────────────────────
  let report = null;
  if (reportPath) {
    if (!existsSync(reportPath)) die(`Report file not found: ${reportPath}`);
    step('Loading migration report');
    report = JSON.parse(readFileSync(reportPath, 'utf8'));
    log(`Loaded ${report.pageContents.length} page bodies`);
  }

  // ── 3. Build set of all unique WP image URLs across both sources ───────────
  step('Scanning all content for WP image URLs');
  const refCount = new Map(); // url → { posts: count, pages: count }
  function bump(url, kind) {
    if (!isWpImageUrl(url)) return;
    if (!refCount.has(url)) refCount.set(url, { posts: 0, pages: 0 });
    refCount.get(url)[kind]++;
  }

  for (const post of posts) {
    for (const u of extractMarkdownImageUrls(post.content || '')) bump(u, 'posts');
  }
  if (report) {
    for (const pg of report.pageContents) {
      for (const u of extractHtmlImageUrls(pg.rawHtml || '')) bump(u, 'pages');
    }
  }
  log(`Found ${refCount.size} unique WP image URLs`);
  const fromPosts = [...refCount.values()].filter((v) => v.posts > 0).length;
  const fromPages = [...refCount.values()].filter((v) => v.pages > 0).length;
  info(`from blog posts: ${fromPosts}`);
  info(`from pages    : ${fromPages}`);

  if (refCount.size === 0) {
    log('Nothing to migrate. Exiting.');
    return;
  }

  if (dryRun) {
    console.log('\n--- DRY RUN: first 20 URLs that would be migrated ---');
    let i = 0;
    for (const [url, counts] of refCount) {
      if (i++ >= 20) break;
      const sp = urlToStoragePath(url);
      console.log(`  ${url}`);
      console.log(`    → ${publicUrlFor(sp)}  (posts:${counts.posts} pages:${counts.pages})`);
    }
    console.log(`\n(${refCount.size} total — run without --dry-run to actually migrate)`);
    return;
  }

  // ── 4. Migrate each unique URL with bounded concurrency ────────────────────
  step(`Migrating ${refCount.size} unique images (concurrency=${concurrency})`);
  const allUrls = [...refCount.keys()];
  const urlMap = new Map(); // oldUrl → newUrl
  const errors = [];
  let done = 0;
  let skipped = 0;
  let uploaded = 0;

  const tickLog = (tag, oldUrl, newUrl) => {
    done++;
    const status = `${String(done).padStart(4)}/${refCount.size}`;
    if (done <= 5 || done % 25 === 0 || done === refCount.size) {
      console.log(`  [${status}] ${tag}  ${oldUrl.slice(0, 70)}${oldUrl.length > 70 ? '…' : ''}`);
    }
  };

  // Worker pool
  let cursor = 0;
  async function worker() {
    while (cursor < allUrls.length) {
      const idx = cursor++;
      const oldUrl = allUrls[idx];
      try {
        const storagePath = urlToStoragePath(oldUrl);

        // Check if already uploaded (idempotent re-runs)
        const existsAlready = await storageObjectExists(storagePath);
        if (existsAlready) {
          urlMap.set(oldUrl, publicUrlFor(storagePath));
          skipped++;
          tickLog('SKIP   ', oldUrl);
          continue;
        }

        const { buffer, contentType } = await downloadImage(oldUrl);
        const newUrl = await uploadToStorage(storagePath, buffer, contentType);
        urlMap.set(oldUrl, newUrl);
        uploaded++;
        tickLog('UPLOAD ', oldUrl);
      } catch (err) {
        errors.push({ url: oldUrl, error: err.message });
        tickLog('ERROR  ', oldUrl);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  console.log('');
  log(`Uploaded ${uploaded}, skipped ${skipped} (already in storage), errors ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n  Errors:');
    for (const e of errors.slice(0, 10)) console.log(`    ${e.error}  ${e.url}`);
    if (errors.length > 10) console.log(`    ... and ${errors.length - 10} more`);
  }

  if (urlMap.size === 0) die('No images successfully migrated — aborting before content rewrite.');

  // ── 5. Rewrite blog_posts.content in Supabase ──────────────────────────────
  step('Rewriting blog post bodies and updating Supabase');
  let postsUpdated = 0;
  for (const post of posts) {
    if (!post.content) continue;
    const newContent = replaceUrlEverywhere(post.content, urlMap);
    if (newContent !== post.content) {
      try {
        await supabasePatch('blog_posts', post.id, { content: newContent });
        postsUpdated++;
      } catch (err) {
        warn(`PATCH failed for post id=${post.id} slug=${post.slug}: ${err.message}`);
      }
    }
  }
  log(`Updated ${postsUpdated} posts in Supabase`);

  // ── 6. Rewrite migration-report.json pageContents in-place ─────────────────
  if (report) {
    step('Rewriting page bodies in migration-report.json');
    let pagesUpdated = 0;
    for (const pg of report.pageContents) {
      if (!pg.rawHtml) continue;
      const newHtml = replaceUrlEverywhere(pg.rawHtml, urlMap);
      if (newHtml !== pg.rawHtml) {
        pg.rawHtml = newHtml;
        pagesUpdated++;
      }
    }
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`Updated ${pagesUpdated} pages in ${reportPath}`);
  }

  // ── 7. Final report ────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Inline image migration complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Unique URLs found     : ${refCount.size}
  Uploaded to Supabase  : ${uploaded}
  Already in storage    : ${skipped}
  Errors                : ${errors.length}
  Posts content updated : ${postsUpdated}
${report ? `  Pages content updated : (see above)` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
})().catch((err) => {
  console.error(`\n${err.stack || err.message}`);
  process.exit(1);
});
