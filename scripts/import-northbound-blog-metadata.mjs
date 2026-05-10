#!/usr/bin/env node
/**
 * scripts/import-northbound-blog-metadata.mjs
 *
 * Fetches all posts from the northboundtreatment.com WP REST API,
 * extracts Yoast SEO title + description, and updates meta_description
 * on matching blog_posts rows in the northbound-treatment Supabase project.
 *
 * Usage:
 *   node scripts/import-northbound-blog-metadata.mjs            # live run
 *   node scripts/import-northbound-blog-metadata.mjs --dry-run  # preview first 5 posts
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from apps/northbound-treatment/.env.local
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");

// ── Config ──────────────────────────────────────────────────────────────────

const WP_API = "https://northboundtreatment.com/wp-json/wp/v2/posts";
const PER_PAGE = 100;
const SUPABASE_URL = "https://ahufsygjwpbymomfdazb.supabase.co";

function loadEnv() {
  const envPath = resolve(__dirname, "../apps/northbound-treatment/.env.local");
  try {
    const raw = readFileSync(envPath, "utf-8");
    const vars = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) vars[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
    return vars;
  } catch {
    return {};
  }
}

const env = loadEnv();
const SUPABASE_KEY = process.env.SUPABASE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error(
    "Service role key not found. Set SUPABASE_KEY or ensure apps/northbound-treatment/.env.local exists."
  );
  process.exit(1);
}

const sbHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWpPage(page) {
  const url = `${WP_API}?per_page=${PER_PAGE}&page=${page}&_fields=slug,title,yoast_head_json&orderby=date&order=desc`;
  const res = await fetch(url, {
    headers: { "User-Agent": "SEO-import/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`WP API HTTP ${res.status} on page ${page}`);
  const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
  const total = parseInt(res.headers.get("x-wp-total") || "0", 10);
  const posts = await res.json();
  return { posts, totalPages, total };
}

async function sbUpdate(slug, metaDescription) {
  const body = { meta_description: metaDescription };
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}`,
    { method: "PATCH", headers: sbHeaders, body: JSON.stringify(body) }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\nImporting blog metadata from WP REST API → blog_posts\n${"─".repeat(60)}`
  );
  if (DRY_RUN) console.log("DRY RUN — showing first 5 posts only\n");

  // Fetch page 1 — headers give accurate total / page count for PER_PAGE=100
  const { posts: firstPage, totalPages: realTotalPages, total: realTotal } =
    await fetchWpPage(1);

  console.log(`Found ${realTotal} posts across ${realTotalPages} API pages\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;
  let pageNum = 1;
  let posts = firstPage;

  while (true) {
    for (const post of posts) {
      const slug = post.slug;
      const yoast = post.yoast_head_json || {};
      const metaDescription = yoast.description
        ? decodeHtmlEntities(yoast.description)
        : null;

      if (!metaDescription) {
        skipped++;
        if (DRY_RUN) console.log(`  — ${slug}  (no Yoast description)`);
        continue;
      }

      if (DRY_RUN) {
        console.log(`  ✓ ${slug}`);
        console.log(`      desc: ${metaDescription.slice(0, 90)}…`);
        if (updated + skipped >= 4) {
          console.log(`\n  … (dry run showing first 5 only)`);
          console.log("\nDry run complete — no DB writes.");
          return;
        }
        updated++;
        continue;
      }

      try {
        await sbUpdate(slug, metaDescription);
        updated++;
        if (updated % 50 === 0) {
          process.stdout.write(
            `  … ${updated} updated (page ${pageNum}/${realTotalPages})\n`
          );
        }
      } catch (e) {
        failed++;
        console.error(`  ✗ ${slug}: ${e.message}`);
      }
    }

    if (pageNum >= realTotalPages) break;
    pageNum++;

    const { posts: nextPage } = await fetchWpPage(pageNum);
    posts = nextPage;

    // Small delay between pages to be polite
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Done!`);
  console.log(`  Updated:  ${updated}`);
  console.log(`  Skipped:  ${skipped}  (no Yoast description)`);
  if (failed) console.log(`  Failed:   ${failed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
