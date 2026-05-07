#!/usr/bin/env node
/**
 * Sweet Media — WordPress Content Migration
 *
 * Migrates all published blog posts and page inventory from a WordPress site
 * into the platform's Supabase project. Run AFTER setup-new-client.mjs.
 *
 * Usage:
 *   node scripts/migrate-wordpress-content.mjs \
 *     --wp-url     https://example.com \
 *     --site-id    brand-slug \
 *     --supabase-ref  xxxxxxxxxxxxxxxx \
 *     --supabase-key  eyJhbGciOiJIUzI1NiIsInR5...  (service role key)
 *
 * Optional flags:
 *   --wp-user       WP application username (needed for password-protected content)
 *   --wp-pass       WP application password
 *   --skip-images   Skip image re-hosting; use original WP image URLs instead
 *   --dry-run       Fetch and report only — no DB writes, no image uploads
 *   --post-status   WP post status to migrate (default: publish)
 *
 * Prerequisites:
 *   - Run `node scripts/setup-new-client.mjs` first to provision the Supabase project
 *   - pnpm install (turndown must be in node_modules)
 *
 * Output:
 *   - Blog posts upserted into Supabase blog_posts table
 *   - Featured images re-uploaded to site-assets/images/blog/
 *   - migration-report-[site-id].json written to repo root (page inventory for Track B build)
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

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

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripWpShortcodes(html = '') {
  // Remove Elementor / WP shortcodes that don't render in Markdown
  return html
    .replace(/\[[\w-]+[^\]]*\][\s\S]*?\[\/[\w-]+\]/g, '')
    .replace(/\[[\w-]+[^\]]*\/?\]/g, '');
}

function calcReadTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Fetch all pages of a WP REST endpoint with pagination */
async function wpFetchAll(baseUrl, endpoint, auth, params = {}) {
  const results = [];
  let page = 1;
  while (true) {
    const qs = new URLSearchParams({ per_page: '100', page: String(page), ...params });
    const url = `${baseUrl}/wp-json/wp/v2/${endpoint}?${qs}`;
    const headers = { 'User-Agent': 'SweetMediaMigration/1.0' };
    if (auth) headers['Authorization'] = `Basic ${auth}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) break; // no more pages
      throw new Error(`WP API error ${res.status} on ${url}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    const total = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    if (page >= total) break;
    page++;
    await sleep(200); // be polite to the WP server
  }
  return results;
}

/** Upload image buffer to Supabase Storage */
async function uploadImageToSupabase(supabaseUrl, serviceKey, bucket, storagePath, imageBuffer, contentType) {
  const url = `${supabaseUrl}/storage/v1/object/${bucket}/${storagePath}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
      'Cache-Control': '31536000',
    },
    body: imageBuffer,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Storage upload failed ${res.status}: ${text}`);
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${storagePath}`;
}

/** Download a remote image and return { buffer, contentType, ext } */
async function downloadImage(imageUrl) {
  const res = await fetch(imageUrl, { headers: { 'User-Agent': 'SweetMediaMigration/1.0' } });
  if (!res.ok) throw new Error(`Image download failed ${res.status}: ${imageUrl}`);
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = await res.arrayBuffer();
  const urlExt = extname(new URL(imageUrl).pathname).toLowerCase();
  const extFromCt = contentType.includes('png') ? '.png'
    : contentType.includes('webp') ? '.webp'
    : contentType.includes('gif') ? '.gif'
    : '.jpg';
  return { buffer, contentType, ext: urlExt || extFromCt };
}

/** Upsert a row into a Supabase table via REST */
async function supabaseUpsert(supabaseUrl, serviceKey, table, rows) {
  const url = `${supabaseUrl}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'apikey': serviceKey,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase upsert into ${table} failed ${res.status}: ${text}`);
  }
  return res.json();
}

/** Query Supabase to check connection */
async function supabaseSelect(supabaseUrl, serviceKey, table, query = '') {
  const url = `${supabaseUrl}/rest/v1/${table}${query}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'apikey': serviceKey,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase select from ${table} failed ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚚  Sweet Media — WordPress Content Migration\n');

  // ── Load TurndownService ────────────────────────────────────────────────────
  let TurndownService;
  try {
    const require = createRequire(import.meta.url);
    TurndownService = require('turndown');
  } catch {
    die('turndown is not installed. Run: pnpm install (from repo root)');
  }

  const turndown = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
  });

  // Strip WP-specific elements that don't translate well
  turndown.addRule('remove-wp-captions', {
    filter: node => node.classList?.contains('wp-caption') || node.classList?.contains('wp-block-image'),
    replacement: (content, node) => {
      const img = node.querySelector?.('img');
      if (!img) return '';
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      return src ? `\n\n![${alt}](${src})\n\n` : '';
    },
  });
  turndown.addRule('remove-scripts', {
    filter: ['script', 'style', 'noscript', 'iframe'],
    replacement: () => '',
  });

  // ── Parse args ──────────────────────────────────────────────────────────────
  const wpUrl       = (getArg('--wp-url') || '').replace(/\/$/, '');
  const siteId      = getArg('--site-id');
  const supabaseRef = getArg('--supabase-ref');
  const serviceKey  = getArg('--supabase-key');
  const wpUser      = getArg('--wp-user');
  const wpPass      = getArg('--wp-pass');
  const skipImages  = hasFlag('--skip-images');
  const dryRun      = hasFlag('--dry-run');
  const postStatus  = getArg('--post-status') || 'publish';

  if (!wpUrl)   die('--wp-url is required (e.g. https://example.com)');
  if (!siteId)  die('--site-id is required (e.g. brand-slug)');

  // Supabase args are required unless --dry-run is set
  if (!dryRun) {
    if (!supabaseRef) die('--supabase-ref is required (omit only with --dry-run)');
    if (!serviceKey)  die('--supabase-key is required (omit only with --dry-run)');
  }

  const supabaseUrl = supabaseRef ? `https://${supabaseRef}.supabase.co` : null;
  const auth = wpUser && wpPass ? Buffer.from(`${wpUser}:${wpPass}`).toString('base64') : null;

  if (dryRun) warn('DRY RUN — no DB writes or image uploads will occur');
  if (skipImages) warn('--skip-images — WP image URLs will be used directly (not re-hosted)');

  // ── 1. Validate connections ─────────────────────────────────────────────────
  step('Validating WordPress REST API connection');
  try {
    const pingUrl = `${wpUrl}/wp-json/wp/v2/posts?per_page=1`;
    const pingHeaders = { 'User-Agent': 'SweetMediaMigration/1.0' };
    if (auth) pingHeaders['Authorization'] = `Basic ${auth}`;
    const ping = await fetch(pingUrl, { headers: pingHeaders });
    if (!ping.ok) throw new Error(`HTTP ${ping.status}`);
    const total = ping.headers.get('X-WP-Total');
    log(`WordPress API responding — ${total || '?'} published posts found`);
  } catch (err) {
    die(`Cannot reach WordPress REST API at ${wpUrl}/wp-json/wp/v2/\nError: ${err.message}\n\nMake sure the WP REST API is enabled and publicly accessible.`);
  }

  if (!dryRun) {
    step('Validating Supabase connection');
    try {
      await supabaseSelect(supabaseUrl, serviceKey, 'brand_settings', `?site_key=eq.${siteId}&select=site_key`);
      log(`Supabase connection OK — project ${supabaseRef}`);
    } catch (err) {
      die(`Cannot connect to Supabase: ${err.message}`);
    }
  }

  // ── 2. Migrate categories ───────────────────────────────────────────────────
  step('Fetching WordPress categories');
  const wpCategories = await wpFetchAll(wpUrl, 'categories', auth, { hide_empty: 'false' });
  log(`Found ${wpCategories.length} WordPress categories`);

  // Build WP category ID → our DB UUID map
  const categoryIdMap = new Map(); // wpId → { uuid, slug, name }

  if (!dryRun && wpCategories.length > 0) {
    step('Upserting categories into Supabase');
    const catRows = wpCategories
      .filter(c => c.slug !== 'uncategorized')
      .map((c, i) => ({
        site_id:    siteId,
        name:       stripHtml(c.name),
        slug:       c.slug,
        description: stripHtml(c.description || ''),
        sort_order: (i + 1) * 10,
        is_active:  true,
      }));

    if (catRows.length > 0) {
      const inserted = await supabaseUpsert(supabaseUrl, serviceKey, 'blog_categories', catRows);
      if (Array.isArray(inserted)) {
        for (const row of inserted) {
          const wpCat = wpCategories.find(c => c.slug === row.slug);
          if (wpCat) categoryIdMap.set(wpCat.id, { uuid: row.id, slug: row.slug, name: row.name });
        }
      }
    }
    log(`Categories upserted (${catRows.length} active)`);
  }

  // Also populate map from what was already seeded in Supabase (for when upsert return is incomplete)
  if (categoryIdMap.size === 0 && !dryRun && supabaseUrl) {
    const existing = await supabaseSelect(supabaseUrl, serviceKey, 'blog_categories', `?site_id=eq.${siteId}&select=id,slug,name`);
    if (Array.isArray(existing)) {
      for (const row of existing) {
        const wpCat = wpCategories.find(c => c.slug === row.slug);
        if (wpCat) categoryIdMap.set(wpCat.id, { uuid: row.id, slug: row.slug, name: row.name });
      }
    }
  }

  // ── 3. Fetch all posts ──────────────────────────────────────────────────────
  step(`Fetching all ${postStatus} posts from WordPress`);
  const wpPosts = await wpFetchAll(wpUrl, 'posts', auth, {
    status:  postStatus,
    _embed:  'wp:featuredmedia,author,wp:term',
    orderby: 'date',
    order:   'desc',
  });
  log(`Found ${wpPosts.length} posts to migrate`);

  // ── 4. Migrate posts ────────────────────────────────────────────────────────
  let migratedCount = 0;
  let skippedCount  = 0;
  let errorCount    = 0;
  const errors      = [];

  step('Migrating posts');

  for (let i = 0; i < wpPosts.length; i++) {
    const post = wpPosts[i];
    const progress = `[${i + 1}/${wpPosts.length}]`;

    try {
      const title   = stripHtml(post.title?.rendered || 'Untitled');
      const wpSlug  = post.slug || slugify(title);
      const rawHtml = stripWpShortcodes(post.content?.rendered || '');

      // Convert HTML → Markdown
      const markdown = turndown.turndown(rawHtml);

      // Excerpt — prefer WP excerpt, fall back to first 160 chars of plain text
      const rawExcerpt = post.excerpt?.rendered || '';
      const excerpt = stripHtml(rawExcerpt).substring(0, 300) ||
        stripHtml(rawHtml).substring(0, 300);

      // Author from _embedded
      const embeddedAuthor = post._embedded?.author?.[0];
      const authorName  = embeddedAuthor?.name  || '';
      const authorBio   = stripHtml(embeddedAuthor?.description || '');
      const authorPhoto = embeddedAuthor?.avatar_urls?.['96'] || null;

      // Categories
      const postWpCategoryIds = post.categories || [];
      const primaryCat = postWpCategoryIds
        .map(id => categoryIdMap.get(id))
        .find(Boolean);

      // Tags (WP tag names → plain string array)
      const embeddedTerms = post._embedded?.['wp:term'] || [];
      const wpTags = embeddedTerms
        .flat()
        .filter(t => t.taxonomy === 'post_tag')
        .map(t => stripHtml(t.name));

      // Yoast / RankMath SEO meta (if plugin exposes it in REST)
      const yoast       = post.yoast_head_json || {};
      const rankMath    = post.rank_math_seo    || {};
      const seoTitle    = yoast.title      || rankMath.title    || null;
      const seoDesc     = yoast.description || rankMath.description || null;
      const focusKw     = yoast.schema?.keywords || post.focus_keyword || null;

      // Featured image
      let heroImageUrl = null;
      const embeddedMedia = post._embedded?.['wp:featuredmedia']?.[0];

      if (embeddedMedia?.source_url) {
        if (skipImages || dryRun) {
          heroImageUrl = embeddedMedia.source_url;
        } else {
          try {
            const wpImageUrl = embeddedMedia.source_url;
            const { buffer, contentType, ext } = await downloadImage(wpImageUrl);
            const safeFilename = `${wpSlug}${ext}`.replace(/[^a-z0-9._-]/gi, '-');
            const storagePath = `images/blog/${safeFilename}`;
            heroImageUrl = await uploadImageToSupabase(supabaseUrl, serviceKey, 'site-assets', storagePath, buffer, contentType);
          } catch (imgErr) {
            warn(`  Image upload failed for "${title}": ${imgErr.message} — using original URL`);
            heroImageUrl = embeddedMedia.source_url;
          }
        }
      }

      const readTime    = calcReadTime(markdown);
      const publishedAt = post.date_gmt ? new Date(post.date_gmt + 'Z').toISOString() : new Date(post.date).toISOString();

      const dbRow = {
        title,
        slug:                wpSlug,
        excerpt:             excerpt || null,
        content:             markdown,
        status:              'published',
        category:            primaryCat?.name  || null,
        category_id:         primaryCat?.uuid  || null,
        author:              authorName || null,
        author_bio:          authorBio  || null,
        author_photo:        authorPhoto,
        hero_image_url:      heroImageUrl,
        featured_image_url:  heroImageUrl,
        read_time:           readTime,
        featured:            false,
        seo_title:           seoTitle,
        seo_description:     seoDesc,
        meta_title:          seoTitle,
        meta_description:    seoDesc,
        focus_keyword:       focusKw || null,
        tags:                wpTags.length > 0 ? wpTags : null,
        published_at:        publishedAt,
        approved_for_publish: true,
      };

      if (!dryRun) {
        await supabaseUpsert(supabaseUrl, serviceKey, 'blog_posts', [dbRow]);
      }

      info(`${progress} ✓ "${title}" → /blog/${wpSlug}`);
      migratedCount++;

    } catch (err) {
      const title = stripHtml(post.title?.rendered || 'Unknown');
      warn(`${progress} Failed: "${title}" — ${err.message}`);
      errors.push({ title, slug: post.slug, error: err.message });
      errorCount++;
    }

    // Brief pause every 10 posts to avoid overwhelming Supabase
    if ((i + 1) % 10 === 0) await sleep(300);
  }

  // ── 5. Fetch page inventory ─────────────────────────────────────────────────
  step('Fetching WordPress pages for migration report');
  const wpPages = await wpFetchAll(wpUrl, 'pages', auth, {
    status: 'publish',
    _embed: 'wp:featuredmedia',
    orderby: 'menu_order',
    order: 'asc',
  });
  log(`Found ${wpPages.length} pages`);

  // Build page inventory for Track B build work
  const pageInventory = wpPages.map(page => {
    const htmlContent = page.content?.rendered || '';
    const plainText   = stripHtml(htmlContent);
    const wordCount   = plainText.trim().split(/\s+/).filter(Boolean).length;
    const title       = stripHtml(page.title?.rendered || '');
    const slug        = page.slug || slugify(title);

    // Suggested Next.js route
    const parentId = page.parent;
    const suggestedRoute = slug === 'home' || page.link === wpUrl + '/' ? '/'
      : `/${slug}`;

    return {
      id:              page.id,
      title,
      slug,
      wpUrl:           page.link,
      suggestedRoute,
      status:          page.status,
      wordCount,
      menuOrder:       page.menu_order || 0,
      excerpt:         stripHtml(page.excerpt?.rendered || '').substring(0, 200),
      rawHtml:         htmlContent,
      featuredImage:   page._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      buildStatus:     'pending',
    };
  });

  // Sort: homepage first, then by menu order
  pageInventory.sort((a, b) => {
    if (a.slug === 'home' || a.suggestedRoute === '/') return -1;
    if (b.slug === 'home' || b.suggestedRoute === '/') return 1;
    return a.menuOrder - b.menuOrder;
  });

  // Write migration report
  const reportPath = join(REPO_ROOT, `migration-report-${siteId}.json`);
  const report = {
    generatedAt:   new Date().toISOString(),
    siteId,
    wpUrl,
    supabaseRef,
    dryRun,
    summary: {
      postsTotal:    wpPosts.length,
      postsMigrated: migratedCount,
      postsSkipped:  skippedCount,
      postsErrored:  errorCount,
      pagesFound:    wpPages.length,
      categoriesFound: wpCategories.length,
    },
    buildChecklist: pageInventory.map(p => ({
      title:          p.title,
      slug:           p.slug,
      wpUrl:          p.wpUrl,
      suggestedRoute: p.suggestedRoute,
      wordCount:      p.wordCount,
      excerpt:        p.excerpt,
      featuredImage:  p.featuredImage,
      buildStatus:    p.buildStatus,
      notes:          '',
    })),
    pageContents: pageInventory.map(p => ({
      slug:     p.slug,
      title:    p.title,
      rawHtml:  p.rawHtml,
    })),
    errors,
  };

  writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  // ── 6. Summary ──────────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Migration complete${dryRun ? ' (DRY RUN)' : ''}!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Blog posts
  Migrated : ${migratedCount}
  Errors   : ${errorCount}

Pages inventory
  Found    : ${wpPages.length} pages
  Report   : migration-report-${siteId}.json

${errorCount > 0 ? `⚠️  Failed posts:\n${errors.map(e => `  - "${e.title}" (${e.slug}): ${e.error}`).join('\n')}\n` : ''}
─── Next steps ──────────────────────────────────────

1. Verify blogs at your Supabase dashboard → Table Editor → blog_posts
2. Run your dev server and check /blog renders all posts
3. Open migration-report-${siteId}.json — work through buildChecklist top-to-bottom
4. Each page in the checklist needs a Next.js route built in Track B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error(err); process.exit(1); });
