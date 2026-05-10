#!/usr/bin/env node
/**
 * scripts/import-northbound-metadata.mjs
 *
 * Crawls northboundtreatment.com for each known Next.js route, extracts
 * <title> and <meta name="description">, and upserts them as seo_title /
 * meta_description overrides in the northbound-treatment tracked_pages table.
 *
 * Usage:
 *   node scripts/import-northbound-metadata.mjs            # live run
 *   node scripts/import-northbound-metadata.mjs --dry-run  # preview only
 *
 * Env vars (auto-read from apps/northbound-treatment/.env.local):
 *   SUPABASE_URL  - https://ahufsygjwpbymomfdazb.supabase.co
 *   SUPABASE_KEY  - service role key
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");

// ── Config ─────────────────────────────────────────────────────────────────

const LIVE_SITE = "https://northboundtreatment.com";
const SUPABASE_URL = "https://ahufsygjwpbymomfdazb.supabase.co";

// Load .env.local to get the service role key
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
const SUPABASE_KEY =
  process.env.SUPABASE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error(
    "Service role key not found. Set SUPABASE_KEY env var or ensure apps/northbound-treatment/.env.local exists."
  );
  process.exit(1);
}

// ── All static routes in the Next.js app (skip dynamic [slug] routes) ──────

const ROUTES = [
  "/",
  "/about",
  "/about/accreditation-recognition",
  "/about/code-of-ethics",
  "/about/our-history",
  "/addiction-treatment-resources",
  "/admissions",
  "/admissions/alternative-sentencing",
  "/admissions/faqs",
  "/admissions/interventions",
  "/admissions/spouse-of-an-addict",
  "/adventure-therapy-program",
  "/blog",
  "/community/alumni",
  "/contact-us",
  "/financial-assistance",
  "/impact-reach/reviews-testimonials",
  "/insurance",
  "/insurance/aetna",
  "/insurance/anthem-blue-cross",
  "/insurance/beacon",
  "/insurance/blue-cross-blue-shield",
  "/insurance/cigna",
  "/insurance/compsych",
  "/insurance/first-health",
  "/insurance/geha-insurance",
  "/insurance/health-net",
  "/insurance/ilwu",
  "/insurance/magellan",
  "/insurance/mhn",
  "/insurance/nyship",
  "/insurance/premera-blue-cross",
  "/insurance/tricare",
  "/insurance/usamco",
  "/locations",
  "/locations/california/garden-grove",
  "/locations/california/newport-beach",
  "/locations/california/san-diego",
  "/locations/washington/seattle",
  "/programs/aftercare",
  "/programs/detox",
  "/programs/family-therapy",
  "/programs/intensive-outpatient-treatment",
  "/programs/lgbtq",
  "/programs/partial-hospitalization-program",
  "/programs/residential-treatment-center",
  "/programs/residential-treatment-center/christ-centered-links-residential-program",
  "/programs/residential-treatment-center/mens-residential-treatment",
  "/programs/residential-treatment-center/womens-residential-treatment",
  "/referring-professionals",
  "/resources",
  "/services",
  "/team",
  "/telehealth-iop-services",
  "/treatment/adderall",
  "/treatment/alcoholism",
  "/treatment/amphetamine",
  "/treatment/benzodiazepine-addiction",
  "/treatment/cocaine",
  "/treatment/crack-cocaine",
  "/treatment/dual-diagnosis",
  "/treatment/dual-diagnosis/ocd-treatment-and-counseling",
  "/treatment/dual-diagnosis/treatment-for-anxiety-disorders",
  "/treatment/fentanyl",
  "/treatment/heroin",
  "/treatment/hydrocodone-addiction",
  "/treatment/marijuana",
  "/treatment/medication-assisted-treatment",
  "/treatment/mental-health-disorders",
  "/treatment/mental-health-disorders/anxiety",
  "/treatment/mental-health-disorders/bipolar-disorder",
  "/treatment/mental-health-disorders/borderline-personality-disorder",
  "/treatment/mental-health-disorders/codependency",
  "/treatment/mental-health-disorders/depression",
  "/treatment/mental-health-disorders/eating-disorders",
  "/treatment/mental-health-disorders/ptsd",
  "/treatment/mental-health-disorders/trauma",
  "/treatment/mental-health-disorders/trauma-therapy",
  "/treatment/meth",
  "/treatment/methadone",
  "/treatment/music-program",
  "/treatment/opioid",
  "/treatment/oxycontin",
  "/treatment/prescription",
  "/treatment/suboxone",
  "/treatment/transitional-living-programs",
  "/treatment/transitional-living-programs/sober-living",
  "/veterans-track-program",
  "/wahler-scholarship",
  "/wolf-assisted-therapy",
];

// ── Helpers ─────────────────────────────────────────────────────────────────

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!m) return null;
  return m[1]
    .trim()
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/\s+/g, " ");
}

function extractDescription(html) {
  const m =
    html.match(
      /<meta\s+name=["']description["']\s+content=["']([^"']{1,500})["']/i
    ) ||
    html.match(
      /<meta\s+content=["']([^"']{1,500})["']\s+name=["']description["']/i
    );
  if (!m) return null;
  return m[1]
    .trim()
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  async function sbUpdate(routePath, seoTitle, metaDescription) {
    const body = {};
    if (seoTitle) body.seo_title = seoTitle;
    if (metaDescription) body.meta_description = metaDescription;
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/tracked_pages?route_path=eq.${encodeURIComponent(routePath)}`,
      { method: "PATCH", headers, body: JSON.stringify(body) }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${text}`);
    }
  }

  console.log(
    `\nImporting metadata from ${LIVE_SITE} → tracked_pages\n${"─".repeat(60)}`
  );
  if (DRY_RUN) console.log("DRY RUN — nothing will be written\n");

  const results = [];
  const failed = [];

  for (const route of ROUTES) {
    // WP site uses trailing slashes; root is just "/"
    const wpUrl =
      route === "/" ? `${LIVE_SITE}/` : `${LIVE_SITE}${route}/`;

    try {
      const html = await fetchPage(wpUrl);
      const seoTitle = extractTitle(html);
      const metaDescription = extractDescription(html);

      if (!seoTitle && !metaDescription) {
        console.log(`  — ${route}  (no metadata found)`);
        continue;
      }

      results.push({ route_path: route, seoTitle, metaDescription });
      console.log(`  ✓ ${route}`);
      if (seoTitle) console.log(`      title: ${seoTitle}`);
      if (metaDescription)
        console.log(`      desc:  ${metaDescription.slice(0, 90)}…`);
    } catch (e) {
      failed.push({ route, error: e.message });
      console.log(`  ✗ ${route}  (${e.message})`);
    }

    await sleep(400); // polite crawl delay
  }

  console.log(
    `\n${"─".repeat(60)}\nFound metadata for ${results.length} / ${ROUTES.length} routes`
  );
  if (failed.length)
    console.log(`Failed to fetch: ${failed.map((f) => f.route).join(", ")}`);

  if (DRY_RUN || results.length === 0) {
    if (DRY_RUN) console.log("\nDry run complete — no DB writes.");
    return;
  }

  // Update only rows that already exist in tracked_pages (never insert new rows)
  console.log(`\nWriting to Supabase…`);
  let updated = 0;
  for (const r of results) {
    try {
      await sbUpdate(r.route_path, r.seoTitle, r.metaDescription);
      updated++;
    } catch (e) {
      console.error(`  ✗ ${r.route_path}: ${e.message}`);
    }
  }

  console.log(`\nDone! Updated ${updated} rows in tracked_pages.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
