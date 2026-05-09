#!/usr/bin/env node
/**
 * WP Blog Ranking Analyzer
 *
 * Cross-references the WP inventory with a Google Search Console "Pages" CSV
 * export and tags every blog post (and optionally every page) with a
 * keep / review / drop decision based on traffic thresholds.
 *
 * Usage:
 *   node scripts/wp-analyze-blog-rankings.mjs \
 *     --inventory wp-inventory-<host>.json \
 *     --gsc apps/<slug>-migration/gsc/Pages.csv \
 *     --out  apps/<slug>-migration/blog-analysis.csv \
 *     [--keep-clicks 10] [--keep-impressions 1000] [--target-prefix /blog/]
 *
 * One-time utility. Delete after the migration project completes.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { URL } from 'node:url';

function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const inventoryPath = getArg('--inventory');
const gscPath = getArg('--gsc');
const outPath = getArg('--out', './blog-analysis.csv');
const keepClicks = parseInt(getArg('--keep-clicks', '10'), 10);
const keepImpressions = parseInt(getArg('--keep-impressions', '1000'), 10);
const targetPrefix = getArg('--target-prefix', '/blog/');
const keepSinceYear = getArg('--keep-since-year'); // e.g. "2025" — auto-keep all posts published >= this year
                                                   // (used to protect recent posts that haven't ranked yet)

if (!inventoryPath || !gscPath) {
  console.error('Usage: --inventory <wp-inventory.json> --gsc <Pages.csv> [--out file] [--keep-clicks N] [--keep-impressions N] [--target-prefix /blog/]');
  process.exit(1);
}

// ---------- Parse GSC Pages.csv ----------
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

function pathOf(urlOrPath) {
  try {
    if (urlOrPath.startsWith('http')) return new URL(urlOrPath).pathname;
    return urlOrPath;
  } catch {
    return urlOrPath;
  }
}

function parsePercent(s) {
  if (!s) return 0;
  const n = parseFloat(s.replace('%', ''));
  return Number.isFinite(n) ? n : 0;
}

const gscRaw = readFileSync(gscPath, 'utf8');
const gscRows = parseCSV(gscRaw);

const gscByPath = new Map();
for (const r of gscRows) {
  const url = r['Top pages'] || r['Page'] || r['Top Pages'] || '';
  if (!url) continue;
  const p = pathOf(url).replace(/\/$/, '') || '/';
  gscByPath.set(p, {
    clicks: parseInt(r.Clicks || '0', 10),
    impressions: parseInt(r.Impressions || '0', 10),
    ctr: parsePercent(r.CTR),
    position: parseFloat(r.Position || '0'),
  });
}

console.log(`Parsed ${gscRows.length} GSC rows.`);

// ---------- Parse inventory ----------
const inv = JSON.parse(readFileSync(inventoryPath, 'utf8'));
console.log(`Inventory: ${inv.posts.length} posts, ${inv.pages.length} pages.\n`);

// ---------- Decision logic ----------
function decide(stats) {
  if (!stats) return { decision: 'drop', reason: 'no GSC data (no clicks/impressions in last 12 months)' };
  if (stats.clicks >= keepClicks) {
    return { decision: 'keep', reason: `clicks ≥ ${keepClicks} (${stats.clicks})` };
  }
  if (stats.impressions >= keepImpressions) {
    return { decision: 'review', reason: `impressions ≥ ${keepImpressions} but clicks < ${keepClicks} (clicks=${stats.clicks}, imp=${stats.impressions}, pos=${stats.position.toFixed(1)})` };
  }
  if (stats.clicks > 0) {
    return { decision: 'review', reason: `low clicks (${stats.clicks}) — ranking but underperforming` };
  }
  return { decision: 'drop', reason: `near-zero traffic (clicks=${stats.clicks}, imp=${stats.impressions})` };
}

// ---------- Apply to posts (and optionally pages with same prefix logic) ----------
const items = inv.posts.filter((p) => p.path.startsWith(targetPrefix));
console.log(`Analyzing ${items.length} items under "${targetPrefix}" prefix.\n`);

const enriched = items.map((p) => {
  const normalized = p.path.replace(/\/$/, '') || '/';
  const stats = gscByPath.get(normalized);
  let { decision, reason } = decide(stats);
  const year = p.date.slice(0, 4);
  // Year-override: protect recent posts that haven't had time to rank yet
  if (keepSinceYear && decision !== 'keep' && year >= keepSinceYear) {
    decision = 'keep';
    reason = `auto-keep (published ${year} >= --keep-since-year ${keepSinceYear}; original verdict: ${reason})`;
  }
  return {
    id: p.id,
    path: p.path,
    title: p.title.replace(/&#\d+;/g, '').replace(/<[^>]+>/g, ''),
    date: p.date.slice(0, 10),
    year,
    clicks: stats?.clicks ?? 0,
    impressions: stats?.impressions ?? 0,
    ctr: stats?.ctr ?? 0,
    position: stats?.position ?? null,
    decision,
    reason,
  };
});

// ---------- Summary ----------
const counts = { keep: 0, review: 0, drop: 0 };
let totalKeptClicks = 0;
let totalDroppedClicks = 0;
let totalKeptImp = 0;
let totalDroppedImp = 0;
for (const e of enriched) {
  counts[e.decision]++;
  if (e.decision === 'drop') {
    totalDroppedClicks += e.clicks;
    totalDroppedImp += e.impressions;
  } else {
    totalKeptClicks += e.clicks;
    totalKeptImp += e.impressions;
  }
}

console.log('--- Decisions ---');
console.log(`  KEEP   ${counts.keep}  (clicks ≥ ${keepClicks})`);
console.log(`  REVIEW ${counts.review}  (impressions ≥ ${keepImpressions} or some clicks)`);
console.log(`  DROP   ${counts.drop}\n`);

console.log('--- SEO impact ---');
console.log(`  Clicks kept (incl review): ${totalKeptClicks}`);
console.log(`  Clicks dropped:            ${totalDroppedClicks}`);
const totalClicks = totalKeptClicks + totalDroppedClicks;
const pctKept = totalClicks ? ((totalKeptClicks / totalClicks) * 100).toFixed(1) : '0';
console.log(`  → keeping ${pctKept}% of all blog clicks\n`);
console.log(`  Impressions kept (incl review): ${totalKeptImp.toLocaleString()}`);
console.log(`  Impressions dropped:            ${totalDroppedImp.toLocaleString()}`);

// ---------- By-year breakdown ----------
console.log('\n--- Decisions by year ---');
const byYear = {};
for (const e of enriched) {
  byYear[e.year] = byYear[e.year] || { keep: 0, review: 0, drop: 0 };
  byYear[e.year][e.decision]++;
}
const years = Object.keys(byYear).sort().reverse();
console.log('  YEAR    KEEP REVIEW  DROP   TOTAL');
for (const y of years) {
  const yr = byYear[y];
  const total = yr.keep + yr.review + yr.drop;
  console.log(`  ${y}    ${String(yr.keep).padStart(4)}   ${String(yr.review).padStart(4)}  ${String(yr.drop).padStart(4)}   ${String(total).padStart(4)}`);
}

// ---------- Top 20 highest-traffic posts ----------
console.log('\n--- Top 20 posts by clicks ---');
const top = [...enriched].sort((a, b) => b.clicks - a.clicks).slice(0, 20);
for (const t of top) {
  const dec = t.decision.padEnd(6);
  console.log(`  ${dec} ${String(t.clicks).padStart(6)} clicks  ${t.path}`);
}

// ---------- Write CSV ----------
const csvHeader = 'decision,clicks,impressions,position,year,date,path,title,reason\n';
const csvRows = enriched
  .sort((a, b) => b.clicks - a.clicks)
  .map((e) => {
    const cells = [
      e.decision,
      e.clicks,
      e.impressions,
      e.position?.toFixed(2) ?? '',
      e.year,
      e.date,
      e.path,
      `"${(e.title || '').replace(/"/g, '""')}"`,
      `"${e.reason.replace(/"/g, '""')}"`,
    ];
    return cells.join(',');
  })
  .join('\n');
writeFileSync(outPath, csvHeader + csvRows);
console.log(`\nCSV written to ${outPath}`);
