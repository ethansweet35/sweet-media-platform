#!/usr/bin/env node
/**
 * WP Redirect Map Builder
 *
 * Reads:
 *   - WP inventory JSON (posts + pages + categories, all enriched with paths)
 *   - Blog ranking analysis CSV (decision per post: keep / review / drop)
 *   - Cruft pages list (hardcoded — derived from the user's deletion decisions)
 *
 * For every URL we are NOT migrating (dropped posts + cruft pages), choose a
 * destination URL via:
 *   1. Title-token Jaccard similarity vs every KEPT post title
 *   2. Same primary category (fallback if title match score < threshold)
 *   3. Category landing page (/blog/category/<slug>/)
 *   4. Closest manual mapping for hardcoded cruft pages (passed via --cruft-map)
 *   5. Final fallback: /blog/ index, or /<top-bucket>/ for cruft pages
 *
 * Output: redirect-map.csv — sorted by quality, ready for review.
 *
 * Usage:
 *   node scripts/wp-build-redirect-map.mjs \
 *     --inventory wp-inventory-<host>.json \
 *     --analysis  apps/<slug>-migration/blog-analysis.csv \
 *     --keep-2025-plus \
 *     --out apps/<slug>-migration/redirect-map.csv
 */

import { readFileSync, writeFileSync } from 'node:fs';

function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}
function hasFlag(name) {
  return process.argv.indexOf(name) > -1;
}

const inventoryPath = getArg('--inventory');
const analysisPath = getArg('--analysis');
const outPath = getArg('--out', './redirect-map.csv');
const keep2025Plus = hasFlag('--keep-2025-plus');

if (!inventoryPath || !analysisPath) {
  console.error('Usage: --inventory <wp-inventory.json> --analysis <blog-analysis.csv> [--keep-2025-plus] [--out file]');
  process.exit(1);
}

// ---------- Cruft pages → manual redirect destinations ----------
// Source of truth: apps/northbound-treatment-migration/deleted-pages.md
const CRUFT_PAGE_REDIRECTS = {
  '/alcohol-detox-2/': '/alcohol-detox/',
  '/drug-rehab-2/': '/',
  '/community/alumni-2/': '/community/alumni/',
  '/locations/washington/seattle-2/': '/locations/washington/',
  '/insurance/blue-cross-blue-shield-old/': '/insurance/blue-cross-blue-shield/',
  '/home-optimized/': '/',
  '/new-homepage/': '/',
  '/history-testing/': '/about/our-history/',
  '/our-history-old/': '/about/our-history/',
  '/more-articles/__trashed/': '/more-articles/',
  '/confirm-subscription/': '/', // marketing chose to keep newsletter — confirm just sends home
  '/site-map/': '/sitemap.xml',
};

// ---------- Helpers ----------
function parseCSV(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cells = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; continue; }
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { cells.push(cur); cur = ''; continue; }
      cur += ch;
    }
    cells.push(cur);
    const row = {};
    header.forEach((h, idx) => { row[h.trim()] = cells[idx]?.trim() ?? ''; });
    return row;
  });
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from', 'has', 'have',
  'in', 'is', 'it', 'its', 'of', 'on', 'or', 'so', 'that', 'the', 'this', 'to', 'was',
  'were', 'will', 'with', 'what', 'how', 'why', 'when', 'where', 'who', 'whose', 'which',
  'about', 'over', 'after', 'before', 'into', 'than', 'then', 'there', 'these', 'those',
  'you', 'your', 'i', 'we', 'our', 'us', 'they', 'them', 'their',
]);

function tokenize(s) {
  return new Set(
    (s || '')
      .toLowerCase()
      .replace(/&[a-z]+;/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/)
      .filter((t) => t && t.length > 2 && !STOP_WORDS.has(t)),
  );
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const t of a) if (b.has(t)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

// ---------- Load data ----------
const inv = JSON.parse(readFileSync(inventoryPath, 'utf8'));
const analysisRows = parseCSV(readFileSync(analysisPath, 'utf8'));

const decisionByPath = new Map();
for (const r of analysisRows) {
  decisionByPath.set(r.path.replace(/\/$/, ''), r.decision);
}

const postById = new Map(inv.posts.map((p) => [p.id, p]));
const catById = new Map(inv.categories.map((c) => [c.id, c]));

// Apply 2025+ override
const finalDecision = (post) => {
  const norm = post.path.replace(/\/$/, '');
  let decision = decisionByPath.get(norm) || 'drop';
  if (keep2025Plus && post.date.slice(0, 4) >= '2025') decision = 'keep';
  return decision;
};

const keepPosts = inv.posts.filter((p) => finalDecision(p) !== 'drop');
const dropPosts = inv.posts.filter((p) => finalDecision(p) === 'drop');

console.log(`Inventory: ${inv.posts.length} posts.`);
console.log(`Keep:      ${keepPosts.length}`);
console.log(`Drop:      ${dropPosts.length}`);
console.log(`Cruft pgs: ${Object.keys(CRUFT_PAGE_REDIRECTS).length}\n`);

// ---------- Pre-compute kept post token sets, indexed by category for fast lookup ----------
const keptByCategory = new Map();
const keptTokens = new Map();
for (const p of keepPosts) {
  keptTokens.set(p.id, tokenize(p.title));
  for (const cId of p.categories || []) {
    if (!keptByCategory.has(cId)) keptByCategory.set(cId, []);
    keptByCategory.get(cId).push(p);
  }
}

const SIM_THRESHOLD_HIGH = 0.4;
const SIM_THRESHOLD_MED = 0.2;

// ---------- Score every dropped post ----------
function scorePost(dropPost) {
  const dropTokens = tokenize(dropPost.title);
  const primaryCatId = (dropPost.categories || [])[0];
  const primaryCat = primaryCatId ? catById.get(primaryCatId) : null;

  // Pool = same-category kept posts first (more relevant), then everything else
  const sameCategoryPool = primaryCatId ? keptByCategory.get(primaryCatId) || [] : [];
  const otherPool = keepPosts.filter((kp) => !sameCategoryPool.includes(kp));

  let bestScore = 0;
  let best = null;
  let bestPool = null;

  // 1. Same category — strongly preferred
  for (const kp of sameCategoryPool) {
    const s = jaccard(dropTokens, keptTokens.get(kp.id));
    if (s > bestScore) {
      bestScore = s;
      best = kp;
      bestPool = 'same-category';
    }
  }

  // 2. Cross-category — only if same-category was weak
  if (bestScore < SIM_THRESHOLD_HIGH) {
    for (const kp of otherPool) {
      const s = jaccard(dropTokens, keptTokens.get(kp.id));
      if (s > bestScore) {
        bestScore = s;
        best = kp;
        bestPool = 'cross-category';
      }
    }
  }

  let quality;
  let destination;
  if (bestScore >= SIM_THRESHOLD_HIGH && best) {
    quality = bestPool === 'same-category' ? 'high (same cat title match)' : 'high (cross-cat title match)';
    destination = best.path;
  } else if (bestScore >= SIM_THRESHOLD_MED && best) {
    quality = bestPool === 'same-category' ? 'medium (same cat title match)' : 'medium (cross-cat title match)';
    destination = best.path;
  } else if (primaryCat) {
    quality = 'category-page';
    destination = `/blog/category/${primaryCat.slug}/`;
  } else {
    quality = 'fallback';
    destination = '/blog/';
  }

  return {
    score: bestScore,
    destination,
    matched_to: best?.path || null,
    matched_title: best?.title || null,
    primary_category: primaryCat?.name || null,
    quality,
  };
}

// ---------- Score everything ----------
const rows = [];

// Cruft pages (manual mappings)
for (const [from, to] of Object.entries(CRUFT_PAGE_REDIRECTS)) {
  rows.push({
    from_path: from,
    to_path: to,
    quality: 'manual (cruft page)',
    score: '',
    type: 'cruft-page',
    title: '',
    primary_category: '',
    matched_to: '',
  });
}

// Dropped posts
let scoredHigh = 0;
let scoredMed = 0;
let scoredCategory = 0;
let scoredFallback = 0;
for (const dp of dropPosts) {
  const r = scorePost(dp);
  rows.push({
    from_path: dp.path,
    to_path: r.destination,
    quality: r.quality,
    score: r.score.toFixed(3),
    type: 'blog-post',
    title: (dp.title || '').replace(/<[^>]+>/g, '').replace(/&#\d+;/g, ''),
    primary_category: r.primary_category || '',
    matched_to: r.matched_to || '',
  });
  if (r.quality.startsWith('high')) scoredHigh++;
  else if (r.quality.startsWith('medium')) scoredMed++;
  else if (r.quality === 'category-page') scoredCategory++;
  else scoredFallback++;
}

// ---------- Summary ----------
console.log('--- Match quality breakdown ---');
console.log(`  High (close title match):   ${scoredHigh}`);
console.log(`  Medium (loose title match): ${scoredMed}`);
console.log(`  Category page fallback:     ${scoredCategory}`);
console.log(`  /blog/ fallback:            ${scoredFallback}`);
console.log(`  Manual (cruft pages):       ${Object.keys(CRUFT_PAGE_REDIRECTS).length}`);
console.log(`  TOTAL redirects:            ${rows.length}\n`);

// ---------- Sort: cruft first, then by quality, then alphabetic ----------
const qualityOrder = {
  'manual (cruft page)': 0,
  'high (same cat title match)': 1,
  'high (cross-cat title match)': 2,
  'medium (same cat title match)': 3,
  'medium (cross-cat title match)': 4,
  'category-page': 5,
  'fallback': 6,
};
rows.sort((a, b) => {
  const aq = qualityOrder[a.quality] ?? 99;
  const bq = qualityOrder[b.quality] ?? 99;
  if (aq !== bq) return aq - bq;
  return a.from_path.localeCompare(b.from_path);
});

// ---------- Sample output ----------
console.log('--- Sample (first 12 high-quality matches) ---');
for (const r of rows.filter((r) => r.quality.startsWith('high')).slice(0, 12)) {
  console.log(`  ${r.from_path}`);
  console.log(`    → ${r.to_path}  [${r.quality}, score=${r.score}]`);
  if (r.title) console.log(`    title: ${r.title.slice(0, 90)}`);
}

console.log('\n--- Sample (first 5 fallback) ---');
for (const r of rows.filter((r) => r.quality === 'fallback').slice(0, 5)) {
  console.log(`  ${r.from_path}  →  ${r.to_path}  [${r.quality}]`);
  console.log(`    title: ${(r.title || '').slice(0, 90)}`);
}

// ---------- Write CSV ----------
const csvHeader = 'from_path,to_path,quality,score,type,title,primary_category,matched_to\n';
const csvBody = rows.map((r) => {
  const cells = [
    r.from_path,
    r.to_path,
    r.quality,
    r.score,
    r.type,
    `"${(r.title || '').replace(/"/g, '""')}"`,
    r.primary_category,
    r.matched_to,
  ];
  return cells.join(',');
}).join('\n');
writeFileSync(outPath, csvHeader + csvBody);
console.log(`\nCSV written to ${outPath}`);
