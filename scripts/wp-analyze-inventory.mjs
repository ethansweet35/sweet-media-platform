#!/usr/bin/env node
/**
 * Analyze the JSON written by wp-quick-inventory.mjs and print a structured
 * summary: page tree by URL prefix, suspicious slugs, post date distribution,
 * landing-page (lp) candidates, etc.
 *
 * Usage: node scripts/wp-analyze-inventory.mjs --in wp-inventory-<host>.json
 */

import { readFileSync } from 'node:fs';

function getArg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
}

const inPath = getArg('--in');
if (!inPath) {
  console.error('--in <path> required');
  process.exit(1);
}

const inv = JSON.parse(readFileSync(inPath, 'utf8'));

console.log(`\n=== Northbound Treatment WP Inventory Analysis ===`);
console.log(`Posts: ${inv.summary.posts}  Pages: ${inv.summary.pages}  Categories: ${inv.summary.categories}\n`);

// --- 1. URL prefix counts ---
const prefixCounts = new Map();
for (const p of inv.pages) {
  const seg = p.path.split('/').filter(Boolean)[0] || '__root__';
  prefixCounts.set(seg, (prefixCounts.get(seg) || 0) + 1);
}
const sortedPrefixes = [...prefixCounts.entries()].sort((a, b) => b[1] - a[1]);

console.log('--- Page paths grouped by top-level URL segment ---');
for (const [seg, count] of sortedPrefixes) {
  const label = seg === '__root__' ? '/  (homepage)' : `/${seg}/...`;
  console.log(`  ${String(count).padStart(4)}  ${label}`);
}

// --- 2. Suspicious slugs ---
console.log('\n--- Suspicious page slugs (likely duplicates / landing pages / drafts) ---');
const dashNumber = inv.pages.filter((p) => /-\d+$/.test(p.slug));
const lpPages = inv.pages.filter((p) => /-lp$/.test(p.slug) || /\/lp\//.test(p.path));
const drafts = inv.pages.filter((p) => p.status !== 'publish');
console.log(`  ${dashNumber.length} pages with -<num> suffix (e.g. alcohol-detox-2)`);
console.log(`  ${lpPages.length} landing pages (-lp suffix)`);
console.log(`  ${drafts.length} non-published pages`);
if (dashNumber.length > 0 && dashNumber.length <= 25) {
  console.log('\n  -<num> pages:');
  for (const p of dashNumber) console.log(`    ${p.path}  (${p.title.replace(/&#\d+;/g, '')})`);
}

// --- 3. Landing pages list ---
if (lpPages.length > 0) {
  console.log(`\n  -lp landing pages:`);
  for (const p of lpPages.slice(0, 30)) console.log(`    ${p.path}`);
  if (lpPages.length > 30) console.log(`    ... and ${lpPages.length - 30} more`);
}

// --- 4. Page tree by URL prefix (top buckets) ---
console.log('\n--- Pages by URL bucket ---');
const buckets = new Map();
for (const p of inv.pages) {
  const seg = p.path.split('/').filter(Boolean)[0] || '__root__';
  if (!buckets.has(seg)) buckets.set(seg, []);
  buckets.get(seg).push(p.path);
}
for (const [seg, paths] of [...buckets.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 15)) {
  if (paths.length <= 3) {
    console.log(`\n/${seg}/ (${paths.length}):`);
    for (const path of paths) console.log(`  ${path}`);
  } else {
    console.log(`\n/${seg}/ (${paths.length} — showing first 12):`);
    for (const path of paths.slice(0, 12)) console.log(`  ${path}`);
    console.log(`  ...and ${paths.length - 12} more`);
  }
}

// --- 5. Post date distribution ---
console.log('\n--- Blog post date distribution ---');
const yearCounts = new Map();
for (const p of inv.posts) {
  const yr = p.date.slice(0, 4);
  yearCounts.set(yr, (yearCounts.get(yr) || 0) + 1);
}
const sortedYears = [...yearCounts.entries()].sort((a, b) => b[0].localeCompare(a[0]));
for (const [yr, count] of sortedYears) {
  console.log(`  ${yr}  ${String(count).padStart(4)}  ${'█'.repeat(Math.min(60, count))}`);
}

// --- 6. Recent posts sample ---
console.log('\n--- 15 most recent posts ---');
for (const p of inv.posts.slice(0, 15)) {
  console.log(`  ${p.date.slice(0, 10)}  ${p.path}`);
}

// --- 7. Oldest posts ---
console.log('\n--- 5 oldest posts ---');
for (const p of inv.posts.slice(-5).reverse()) {
  console.log(`  ${p.date.slice(0, 10)}  ${p.path}`);
}

// --- 8. Top categories ---
console.log('\n--- All categories (sorted by post count) ---');
for (const c of inv.categories) {
  console.log(`  ${String(c.count).padStart(4)}  ${c.name}  (${c.slug})`);
}
