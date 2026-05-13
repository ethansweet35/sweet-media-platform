#!/usr/bin/env node
/**
 * Categorize all rize-oc blog posts based on title/slug keyword matching.
 * Run: node scripts/categorize-rize-oc-blogs.mjs
 */

const SUPABASE_URL = "https://nfjlvkxrbzytjefmcvhg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mamx2a3hyYnp5dGplZm1jdmhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUxMjY2MSwiZXhwIjoyMDk0MDg4NjYxfQ._Upu9H-1BdinuRpOnVVXKbnD7zp_LJbAy_7bQ6CZQwo";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

// ─── Category rules (first match wins) ──────────────────────────────────────
// Each rule: { category, keywords[] }
// Matched against lowercase title + slug combined.

const RULES = [
  {
    category: "Detox & Withdrawal",
    keywords: [
      "detox", "withdrawal", "withdraw", "flush alcohol", "flush thc",
      "taper", "suboxone", "gabapentin for opiate", "kratom withdrawal",
      "delta 8 detox", "toxin rid", "quitting alcohol",
    ],
  },
  {
    category: "Substances",
    keywords: [
      "cocaine", "heroin", "fentanyl", "meth", "methamphetamine",
      "xanax", "opioid", "opiate", "benzo", "benzodiazepine",
      "marijuana", "cannabis", "weed", "thc", "kratom", "ketamine",
      "adderall", "vyvanse", "ritalin", "suboxone", "naltrexone",
      "molly", "mdma", "lsd", "ayahuasca", "delta 8", "hhc",
      "alcohol", "roxies", "tweaking", "hotboxing", "candy flip",
      "modafinil", "zoloft", "lexapro", "wellbutrin", "tylenol",
      "librium", "percocet", "m5 pill", "k56", "galaxy gas",
      "nitrous oxide", "8 ball", "feening", "psychosis",
      "pornography addiction", "phone addiction", "screen time",
      "vaping", "smoking", "tobacco",
    ],
  },
  {
    category: "Insurance & Cost",
    keywords: [
      "insurance", "ppo", "hdhp", "cost", "price", "coverage",
      "copay", "verify insurance", "does insurance cover",
      "how much does", "payment", "afford", "financial",
    ],
  },
  {
    category: "Treatment Programs",
    keywords: [
      "iop", "php", "partial hospitalization", "intensive outpatient",
      "outpatient", "inpatient", "residential", "day treatment",
      "levels of care", "virtual rehab", "telehealth", "virtual iop",
      "virtual mental health", "virtual treatment",
      "rehab program", "drug rehab", "alcohol rehab",
      "how long is", "how long are", "what is rehab",
      "what do you do in", "what happens after",
      "returning to work after",
    ],
  },
  {
    category: "Family Support",
    keywords: [
      "family therapy", "family support", "family treatment",
      "dysfunctional family", "intervention", "how to stage",
      "how to talk to someone", "partner", "enabling", "codependency",
      "codependent", "setting boundaries", "child in recovery",
      "loved one", "staging an intervention",
    ],
  },
  {
    category: "Mental Health",
    keywords: [
      "mental health", "depression", "anxiety", "ptsd", "trauma",
      "bipolar", "schizophrenia", "adhd", "ocd", "borderline",
      "bpd", "dissociative", "insomnia", "burnout", "stress",
      "affirmations", "resilience", "self harm", "gaslighting",
      "narcissism", "narcissist", "testosterone", "tms",
      "cognitive behavioral", "cbt", "dbt", "behavioral therapy",
      "brainspot", "brainrot therapy", "therapy techniques",
      "mental illness", "psychiatry", "mood disorder",
      "dual diagnosis", "co-occurring", "hyper-connectivity",
      "news overwhelm",
    ],
  },
  {
    category: "Addiction Recovery",
    keywords: [
      "addiction", "recovery", "sober", "sobriety", "relapse",
      "rehab", "12 step", "twelve step", "na ", " aa ",
      "california sober", "drug free", "clean", "getting sober",
      "overcoming", "break free", "transform your life",
      "high-functioning", "high functioning", "kratom kidney",
      "digital addiction", "screen addiction",
    ],
  },
  {
    category: "Wellness & Lifestyle",
    keywords: [
      "wellness", "lifestyle", "self-care", "mindful",
      "alcohol-free activities", "sober activities",
      "fatigue", "depression nap", "positive affirmation",
      "peace", "navigate", "finding peace", "2026",
    ],
  },
];

function categorize(title, slug) {
  const haystack = `${title} ${slug}`.toLowerCase();
  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (haystack.includes(kw)) return rule.category;
    }
  }
  return "Addiction Recovery"; // safe fallback
}

async function fetchAllPosts() {
  const all = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,slug,category&status=eq.published&order=id.asc&offset=${from}&limit=${pageSize}`,
      { headers }
    );
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

async function updateCategory(id, category) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({ category }),
    }
  );
  return res.ok;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log("Fetching all posts...");
const posts = await fetchAllPosts();
console.log(`Found ${posts.length} posts.\n`);

const tally = {};
let updated = 0;
let skipped = 0;

for (const post of posts) {
  const assigned = categorize(post.title ?? "", post.slug ?? "");

  if (post.category === assigned) {
    skipped++;
    continue;
  }

  const ok = await updateCategory(post.id, assigned);
  if (ok) {
    updated++;
    tally[assigned] = (tally[assigned] ?? 0) + 1;
    console.log(`  ✅  [${assigned}] ${post.title}`);
  } else {
    console.log(`  ❌  Failed: ${post.title}`);
  }
}

console.log(`\n─── Summary ─────────────────────────────`);
console.log(`Updated : ${updated}`);
console.log(`Skipped : ${skipped} (already had correct category)`);
console.log(`\nCategory breakdown:`);
for (const [cat, count] of Object.entries(tally).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${cat.padEnd(24)} ${count}`);
}
