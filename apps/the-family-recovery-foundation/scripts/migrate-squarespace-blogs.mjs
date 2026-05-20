#!/usr/bin/env npx tsx
/**
 * Migrates Squarespace lrsf-blogs posts into Supabase blog_posts.
 *
 * Usage (from repo root or app dir):
 *   node apps/the-family-recovery-foundation/scripts/migrate-squarespace-blogs.mjs
 *   node apps/the-family-recovery-foundation/scripts/migrate-squarespace-blogs.mjs --dry-run
 *   node apps/the-family-recovery-foundation/scripts/migrate-squarespace-blogs.mjs --skip-images
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import { markdownToSections } from "@sweetmedia/blog-core";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".upload.env") });

const LIVE_ORIGIN = (process.env.LIVE_SITE_URL || "https://tfrfoundation.org").replace(/\/$/, "");
const COLLECTION_PATH = "/lrsf-blogs";
const dryRun = process.argv.includes("--dry-run");
const skipImages = process.argv.includes("--skip-images");

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const projectRef =
  process.env.SUPABASE_PROJECT_REF || supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

function log(msg) {
  console.log(`\n✅  ${msg}`);
}
function step(msg) {
  console.log(`\n⏳  ${msg}...`);
}
function warn(msg) {
  console.log(`\n⚠️   ${msg}`);
}
function die(msg) {
  console.error(`\n❌  ${msg}`);
  process.exit(1);
}
function info(msg) {
  console.log(`    ${msg}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calcReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function rewriteLinks(markdown) {
  return markdown
    .replace(/\]\(\/lrsf-blogs\//g, "](/blog/")
    .replace(/\]\(https?:\/\/(?:www\.)?tfrfoundation\.org\/lrsf-blogs\//g, "](/blog/")
    .replace(/\]\(\/blogs\//g, "](/blog/")
    .replace(/\]\(https?:\/\/(?:www\.)?tfrfoundation\.org\/blogs\//g, "](/blog/");
}

async function fetchJson(urlPath) {
  const url = `${LIVE_ORIGIN}${urlPath}${urlPath.includes("?") ? "&" : "?"}format=json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 SweetMediaMigration/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function supabaseUpsert(rows) {
  const res = await fetch(`${supabaseUrl}/rest/v1/blog_posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase upsert failed ${res.status}: ${text}`);
  }
  return res.json();
}

async function uploadImage(sourceUrl, slug) {
  const res = await fetch(sourceUrl, { headers: { "User-Agent": "Mozilla/5.0 SweetMediaMigration/1.0" } });
  if (!res.ok) throw new Error(`Image download ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const ext = contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : ".jpg";
  const storagePath = `images/blog/${slug}${ext}`.replace(/[^a-z0-9._-]/gi, "-");
  const uploadUrl = `${supabaseUrl}/storage/v1/object/site-assets/${storagePath}`;
  const up = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: buffer,
  });
  if (!up.ok) {
    const text = await up.text();
    throw new Error(`Storage upload ${up.status}: ${text}`);
  }
  return `https://${projectRef}.supabase.co/storage/v1/object/public/site-assets/${storagePath}`;
}

/** Collect blog post summaries from Squarespace collection JSON */
function extractCollectionPosts(data) {
  const posts = [];
  const seen = new Set();

  function walk(o, depth = 0) {
    if (depth > 14 || !o) return;
    if (Array.isArray(o)) {
      for (const x of o) walk(x, depth + 1);
      return;
    }
    if (typeof o !== "object") return;

    const urlId = o.urlId;
    const title = o.title;
    if (urlId && title && (o.recordTypeLabel === "Blog Post" || o.recordType === 1)) {
      if (!seen.has(urlId)) {
        seen.add(urlId);
        posts.push({
          urlId,
          title: stripHtml(title),
          excerpt: stripHtml(o.excerpt || ""),
          assetUrl: o.assetUrl || null,
          publishOn: o.publishOn || o.addedOn || null,
          fullUrl: o.fullUrl || `${LIVE_ORIGIN}${COLLECTION_PATH}/${urlId}`,
        });
      }
    }
    for (const v of Object.values(o)) walk(v, depth + 1);
  }

  walk(data);
  return posts;
}

async function main() {
  console.log("\n📰  TFRF — Squarespace Blog Migration\n");
  if (dryRun) warn("DRY RUN — no Supabase writes");
  if (skipImages) warn("--skip-images — hero URLs from Squarespace CDN");

  if (!dryRun && (!supabaseUrl || !serviceKey || !projectRef)) {
    die("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  let TurndownService;
  try {
    const require = createRequire(import.meta.url);
    TurndownService = require("turndown");
  } catch {
    die("turndown not installed — run pnpm install from repo root");
  }

  const turndown = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });
  turndown.addRule("remove-scripts", {
    filter: ["script", "style", "noscript", "iframe"],
    replacement: () => "",
  });

  step("Fetching blog collection");
  const collection = await fetchJson(COLLECTION_PATH);
  const summaries = extractCollectionPosts(collection);
  if (summaries.length === 0) die("No posts found in collection JSON");
  log(`Found ${summaries.length} posts in ${COLLECTION_PATH}`);

  const manifestPath = path.join(projectRoot, "uploaded-squarespace-images.json");
  let imageManifest = {};
  if (fs.existsSync(manifestPath)) {
    imageManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    log(`Loaded ${Object.keys(imageManifest).length} image manifest entries`);
  }

  let migrated = 0;
  let errors = 0;

  for (let i = 0; i < summaries.length; i++) {
    const summary = summaries[i];
    const progress = `[${i + 1}/${summaries.length}]`;
    try {
      await sleep(1200);
      const detail = await fetchJson(`${COLLECTION_PATH}/${summary.urlId}`);
      const item = detail.item || {};
      const rawHtml = typeof item.body === "string" ? item.body : "";
      let markdown = turndown.turndown(rawHtml || "<p></p>");
      markdown = rewriteLinks(markdown);

      const excerpt =
        stripHtml(item.excerpt || "") ||
        summary.excerpt ||
        stripHtml(rawHtml).slice(0, 300);

      const title = stripHtml(item.title || summary.title);
      const slug = summary.urlId;
      const publishedAt = item.publishOn
        ? new Date(item.publishOn).toISOString()
        : new Date().toISOString();

      let heroImageUrl = null;
      const assetUrl = item.assetUrl || summary.assetUrl;
      if (assetUrl) {
        const normalized = assetUrl.split("?")[0];
        if (imageManifest[normalized] || imageManifest[assetUrl]) {
          heroImageUrl = imageManifest[normalized] || imageManifest[assetUrl];
        } else if (skipImages || dryRun) {
          heroImageUrl = assetUrl;
        } else {
          try {
            heroImageUrl = await uploadImage(assetUrl, slug);
          } catch (imgErr) {
            warn(`${progress} Image upload failed for "${title}": ${imgErr.message}`);
            heroImageUrl = assetUrl;
          }
        }
      }

      const row = {
        title,
        slug,
        excerpt: excerpt || null,
        content: JSON.stringify(markdownToSections(markdown)),
        status: "published",
        category: "Family Recovery",
        author: "The Family Recovery Foundation",
        author_title: null,
        author_bio: null,
        author_photo: null,
        hero_image_url: heroImageUrl,
        featured_image_url: heroImageUrl,
        read_time: calcReadTime(markdown),
        featured: false,
        meta_title: `${title} | The Family Recovery Foundation`,
        meta_description: excerpt?.slice(0, 160) || null,
        seo_title: title,
        seo_description: excerpt?.slice(0, 160) || null,
        tags: null,
        published_at: publishedAt,
        approved_for_publish: true,
        published_url: `${process.env.NEXT_PUBLIC_SITE_URL || LIVE_ORIGIN}/blog/${slug}/`,
      };

      if (!dryRun) {
        await supabaseUpsert([row]);
      }

      info(`${progress} ✓ "${title}" → /blog/${slug}/`);
      migrated++;
    } catch (err) {
      warn(`${progress} Failed "${summary.title}": ${err.message}`);
      errors++;
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    origin: LIVE_ORIGIN,
    collection: COLLECTION_PATH,
    dryRun,
    summary: { total: summaries.length, migrated, errors },
    posts: summaries.map((p) => ({ slug: p.urlId, title: p.title, nextPath: `/blog/${p.urlId}/` })),
  };
  const reportPath = path.join(projectRoot, "migration-report-blogs.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`Report written to ${reportPath}`);
  log(`Done — ${migrated} migrated, ${errors} errors`);
}

main().catch((err) => die(err.message));
