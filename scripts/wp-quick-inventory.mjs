#!/usr/bin/env node
/**
 * WP Quick Inventory — fast read-only inventory of WP REST API
 *
 * Pulls minimal fields (id, slug, title, link, date, parent) for posts and pages
 * via the `_fields` parameter so we can review content scope before a full migration.
 *
 * Usage:
 *   node scripts/wp-quick-inventory.mjs --wp-url https://example.com [--out wp-inventory-<host>.json]
 *
 * One-time utility. Delete after the migration project completes.
 */

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { URL } from 'node:url';

function getArg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
}

const wpUrl = (getArg('--wp-url') || '').replace(/\/$/, '');
if (!wpUrl) {
  console.error('--wp-url is required');
  process.exit(1);
}

const host = new URL(wpUrl).hostname.replace(/^www\./, '');
const outPath = getArg('--out') || join(process.cwd(), `wp-inventory-${host}.json`);

const FIELDS = {
  posts: 'id,slug,title,link,date,categories,status',
  pages: 'id,slug,title,link,parent,date,status,menu_order',
  categories: 'id,slug,name,count',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchAll(endpoint, fields) {
  const all = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const u = `${wpUrl}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=${fields}&status=publish,draft,future,private`;
    process.stdout.write(`  ${endpoint} page ${page}/${totalPages}...\r`);
    const res = await fetch(u, { headers: { 'User-Agent': 'SweetMediaInventory/1.0' } });
    if (!res.ok) {
      // 401 with status filter? retry without
      if (res.status === 401 || res.status === 400) {
        const u2 = `${wpUrl}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=${fields}`;
        const res2 = await fetch(u2, { headers: { 'User-Agent': 'SweetMediaInventory/1.0' } });
        if (!res2.ok) throw new Error(`${endpoint} fetch failed: ${res2.status}`);
        const data = await res2.json();
        all.push(...data);
        if (page === 1) totalPages = parseInt(res2.headers.get('x-wp-totalpages') || '1', 10);
      } else {
        throw new Error(`${endpoint} fetch failed: ${res.status}`);
      }
    } else {
      const data = await res.json();
      all.push(...data);
      if (page === 1) totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    }
    page++;
    await sleep(150);
  }
  process.stdout.write('\n');
  return all;
}

function pathOf(link) {
  try {
    return new URL(link).pathname;
  } catch {
    return link;
  }
}

(async () => {
  console.log(`\nQuick WP inventory: ${wpUrl}\n`);

  const start = Date.now();

  console.log('Fetching posts...');
  const posts = await fetchAll('posts', FIELDS.posts);
  console.log(`  → ${posts.length} posts`);

  console.log('Fetching pages...');
  const pages = await fetchAll('pages', FIELDS.pages);
  console.log(`  → ${pages.length} pages`);

  console.log('Fetching categories...');
  const categories = await fetchAll('categories', FIELDS.categories);
  console.log(`  → ${categories.length} categories`);

  const inventory = {
    site: wpUrl,
    extracted_at: new Date().toISOString(),
    summary: {
      posts: posts.length,
      pages: pages.length,
      categories: categories.length,
    },
    pages: pages
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || '',
        path: pathOf(p.link),
        parent: p.parent || null,
        status: p.status,
        menu_order: p.menu_order ?? 0,
        date: p.date,
      }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    posts: posts
      .map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || '',
        path: pathOf(p.link),
        categories: p.categories,
        status: p.status,
        date: p.date,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)),
    categories: categories
      .map((c) => ({ id: c.id, slug: c.slug, name: c.name, count: c.count }))
      .sort((a, b) => (b.count || 0) - (a.count || 0)),
  };

  writeFileSync(outPath, JSON.stringify(inventory, null, 2));

  const seconds = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${seconds}s. Wrote ${outPath}`);

  console.log('\nTop categories by post count:');
  for (const c of inventory.categories.slice(0, 10)) {
    console.log(`  ${String(c.count).padStart(4)}  ${c.name}  (${c.slug})`);
  }

  console.log('\nFirst 25 page paths:');
  for (const p of inventory.pages.slice(0, 25)) {
    console.log(`  ${p.path}`);
  }
})().catch((err) => {
  console.error(`\n${err.stack || err.message}`);
  process.exit(1);
});
