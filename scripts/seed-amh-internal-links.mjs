#!/usr/bin/env node
/**
 * Seed internal_links for adolescent-mental-health marketing + blog auto-linking.
 *
 * Usage:
 *   node scripts/seed-amh-internal-links.mjs --dry-run
 *   node scripts/seed-amh-internal-links.mjs
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (from apps/adolescent-mental-health/.env.local or env).
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const SUPABASE_REF = "almncgkbmooyuptdgkhe";

/** keyword, href, priority — longer / more specific phrases get higher priority. */
export const AMH_INTERNAL_LINKS = [
  // Virtual IOP & levels of care
  ["virtual IOP for teens", "/virtual-iop-for-teens", 100],
  ["virtual intensive outpatient", "/virtual-iop-for-teens", 98],
  ["Virtual IOP", "/virtual-iop-for-teens", 97],
  ["intensive outpatient program", "/virtual-iop-for-teens", 95],
  ["intensive outpatient", "/virtual-iop-for-teens", 92],
  ["IOP for teens", "/virtual-iop-for-teens", 95],
  ["telehealth IOP", "/virtual-iop-for-teens", 90],
  ["online therapy for teens", "/virtual-iop-for-teens", 88],
  ["adolescent IOP", "/adolescent-iop-for-teens", 100],
  ["IOP for adolescents", "/adolescent-iop-for-teens", 98],
  ["levels of care", "/levels-of-care", 85],

  // Treatment conditions
  ["teen depression treatment", "/teen-depression-treatment", 100],
  ["depression treatment for teens", "/teen-depression-treatment", 98],
  ["teen depression", "/teen-depression-treatment", 90],
  ["adolescent depression", "/teen-depression-treatment", 90],

  ["PTSD treatment online", "/ptsd-treatment-online", 100],
  ["PTSD treatment for teens", "/ptsd-treatment-online", 98],
  ["trauma treatment for teens", "/ptsd-treatment-online", 95],
  ["post-traumatic stress", "/ptsd-treatment-online", 90],

  ["online anxiety treatment", "/online-anxiety-treatment", 100],
  ["anxiety treatment for teens", "/online-anxiety-treatment", 98],
  ["teen anxiety", "/online-anxiety-treatment", 88],

  ["online bipolar treatment", "/online-bipolar-treatment", 100],
  ["bipolar treatment for teens", "/online-bipolar-treatment", 98],
  ["bipolar disorder in teens", "/online-bipolar-treatment", 95],

  ["online OCD treatment", "/online-ocd-treatment", 100],
  ["OCD treatment for teens", "/online-ocd-treatment", 98],
  ["obsessive compulsive disorder", "/online-ocd-treatment", 92],

  ["ADHD treatment for teens", "/adhd-treatment-for-teens", 100],
  ["teen ADHD", "/adhd-treatment-for-teens", 90],
  ["attention deficit hyperactivity", "/adhd-treatment-for-teens", 88],

  ["self-harm", "/conditions/self-harm", 100],
  ["self harm", "/conditions/self-harm", 100],
  ["non-suicidal self-injury", "/conditions/self-harm", 95],
  ["cutting behavior", "/conditions/self-harm", 90],

  ["school avoidance", "/conditions/school-avoidance", 100],
  ["school refusal", "/conditions/school-avoidance", 98],

  ["insomnia treatment for teens", "/online-insomnia-treatment-for-teens", 100],
  ["teen insomnia", "/online-insomnia-treatment-for-teens", 90],
  ["sleep problems in teens", "/online-insomnia-treatment-for-teens", 88],

  ["schizophrenia in adolescence", "/schizophrenia-in-adolescence", 100],
  ["teen schizophrenia", "/schizophrenia-in-adolescence", 95],
  ["psychosis in teens", "/schizophrenia-in-adolescence", 92],

  ["psychiatrist for teens", "/psychiatrist-for-teens", 100],
  ["teen psychiatrist", "/psychiatrist-for-teens", 98],
  ["adolescent psychiatrist", "/psychiatrist-for-teens", 98],
  ["psychiatric care for teens", "/psychiatrist-for-teens", 95],

  // Therapies
  ["cognitive behavioral therapy", "/online-cognitive-behavioral-therapy", 100],
  ["cognitive behavioural therapy", "/online-cognitive-behavioral-therapy", 100],
  ["CBT for teens", "/online-cognitive-behavioral-therapy", 98],
  ["online CBT", "/online-cognitive-behavioral-therapy", 95],

  ["dialectical behavioral therapy", "/online-dialectical-behavioral-therapy", 100],
  ["dialectical behaviour therapy", "/online-dialectical-behavioral-therapy", 100],
  ["DBT for teens", "/online-dialectical-behavioral-therapy", 98],
  ["online DBT", "/online-dialectical-behavioral-therapy", 95],

  ["individual therapy for teens", "/therapy/individual-therapy-for-teens", 98],
  ["one-on-one therapy for teens", "/therapy/individual-therapy-for-teens", 90],

  ["group therapy for teens", "/therapy/group-therapy-with-adolescents", 98],
  ["group therapy with adolescents", "/therapy/group-therapy-with-adolescents", 98],

  ["adolescent family therapy", "/therapy/adolescent-family-therapy", 98],
  ["family therapy for teens", "/therapy/adolescent-family-therapy", 98],
  ["family therapy", "/therapy/adolescent-family-therapy", 92],

  // Hubs
  ["treatment programs", "/treatment", 80],
  ["mental health treatment for teens", "/treatment", 82],
  ["therapy for teens", "/therapy", 80],
  ["teen therapy", "/therapy", 78],

  // Conversion & utility
  ["verify insurance", "/verify-insurance", 85],
  ["insurance coverage", "/verify-insurance", 82],
  ["insurance verification", "/verify-insurance", 82],
  ["admissions process", "/admissions", 80],
  ["free assessment", "/admissions", 78],
  ["contact us", "/contact", 75],
  ["parent resources", "/resources", 70],
  ["about us", "/about", 65],

  // Insurance carriers
  ["Cigna", "/verify-insurance", 65],
  ["Anthem", "/verify-insurance", 65],
  ["Aetna", "/verify-insurance", 65],
  ["Blue Cross", "/verify-insurance", 60],
];

function loadServiceKey() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY;
  const envPath = join(REPO_ROOT, "apps/adolescent-mental-health/.env.local");
  if (!existsSync(envPath)) die("Missing SUPABASE_SERVICE_ROLE_KEY and .env.local");
  const line = readFileSync(envPath, "utf8")
    .split("\n")
    .find((l) => l.startsWith("SUPABASE_SERVICE_ROLE_KEY="));
  if (!line) die("SUPABASE_SERVICE_ROLE_KEY not found in .env.local");
  return line.slice("SUPABASE_SERVICE_ROLE_KEY=".length).trim();
}

function die(msg) {
  console.error(`\n❌  ${msg}`);
  process.exit(1);
}

async function supabaseGet(path, key) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: { Authorization: `Bearer ${key}`, apikey: key },
  });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function supabasePost(path, body, key) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
}

const dryRun = process.argv.includes("--dry-run");
const serviceKey = loadServiceKey();
const supabaseUrl = `https://${SUPABASE_REF}.supabase.co`;

async function main() {
  console.log(`\n🔗  AMH internal links seed${dryRun ? " (DRY RUN)" : ""}\n`);

  const existing = await supabaseGet(
    "internal_links?select=keyword,href&active=eq.true",
    serviceKey,
  );
  const existingKeys = new Set(existing.map((r) => `${r.keyword}\0${r.href}`));

  const toInsert = AMH_INTERNAL_LINKS.filter(
    ([keyword, href]) => !existingKeys.has(`${keyword}\0${href}`),
  ).map(([keyword, href, priority]) => ({
    keyword,
    href,
    priority,
    active: true,
  }));

  console.log(`Configured: ${AMH_INTERNAL_LINKS.length} mappings`);
  console.log(`Already in DB: ${existing.length}`);
  console.log(`Would insert: ${toInsert.length}\n`);

  if (toInsert.length === 0) {
    console.log("Nothing to insert — all mappings already exist.");
    return;
  }

  const byHref = {};
  for (const row of toInsert) {
    byHref[row.href] = (byHref[row.href] ?? 0) + 1;
  }
  console.log("New mappings by destination:");
  for (const [href, count] of Object.entries(byHref).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(2)}  ${href}`);
  }

  if (!dryRun) {
    await supabasePost("internal_links", toInsert, serviceKey);
    console.log(`\nInserted ${toInsert.length} internal link rows.`);
  } else {
    console.log("\nDry run — no rows written.");
  }
}

main().catch((err) => die(err.message));
