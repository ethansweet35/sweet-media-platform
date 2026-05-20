#!/usr/bin/env node
/**
 * Scrapes YouTube video IDs from live Squarespace testimonial pages.
 * Run after adding new video stories; paste output into src/mocks/testimonials.ts
 */
const SLUGS = [
  "ashley",
  "paul",
  "jillian",
  "alexa",
  "jason",
  "jodi",
  "mitch",
  "justin",
  "alex",
  "angela",
];

const ORIGIN = process.env.LIVE_SITE_URL || "https://tfrfoundation.org";

async function scrape(slug) {
  const res = await fetch(`${ORIGIN}/testimonials/${slug}`, {
    headers: { "User-Agent": "Mozilla/5.0 SweetMediaMigration/1.0" },
  });
  const html = await res.text();
  const patterns = [
    /youtube\.com(?:\/embed\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/g,
    /youtube\.com%2Fembed%2F([a-zA-Z0-9_-]{11})/g,
  ];
  const ids = [];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) ids.push(m[1]);
  }
  return [...new Set(ids)][0] ?? null;
}

const out = {};
for (const slug of SLUGS) {
  out[slug] = await scrape(slug);
  await new Promise((r) => setTimeout(r, 800));
}
console.log(JSON.stringify(out, null, 2));
