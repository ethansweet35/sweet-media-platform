#!/usr/bin/env node
/**
 * Re-categorize adolescent-mental-health blog posts into brand taxonomy.
 *
 * Usage:
 *   node scripts/recategorize-amh-blogs.mjs --dry-run
 *   node scripts/recategorize-amh-blogs.mjs
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (from apps/adolescent-mental-health/.env.local or env).
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

const SITE_ID = "adolescent-mental-health";
const SUPABASE_REF = "almncgkbmooyuptdgkhe";

const CATEGORIES = [
  "Crisis & Safety",
  "Treatment Programs",
  "School & Social Life",
  "Family Support",
  "Teen Mental Health",
  "Parent Resources",
];

/** First matching rule wins (most specific → general). */
const RULES = [
  {
    category: "Crisis & Safety",
    patterns: [
      /\b(self[- ]?harm|suicid|overdose|withdrawal|detox|addict|substance|drug|heroin|cocaine|fentanyl|kratom|molly|roofied|track marks|cross[- ]?fad|cold turkey|narcotic|lethal|deadly combination|mixing (morphine|alcohol|ativan|seroquel|klonopin)|delta[- ]?8|thc detox|weed detox|opioid|benzo|xanax|valium|meth\b|amphetamine|injection drug|harm reduction|overdose|poisoning|emergency room|988\b|crisis line)/i,
      /\b(alcohol abuse|alcoholism|drunk|intoxicat| binge drinking|drinking and driving)/i,
    ],
  },
  {
    category: "Treatment Programs",
    patterns: [
      /\b(virtual iop|intensive outpatient|\biop\b|\bphp\b|partial hospital|outpatient program|level(s)? of care|residential treatment|acute mental health treatment|treatment program|admissions|verify insurance|telehealth (therapy|treatment)|online therapy for teens|phone therapy session|group therapy for teen|adolescent iop|mental health treatment for teen|intensive therapy|structured (care|support|program)|outpatient care)/i,
      /\b(cbt for teens|dbt for teens|online cbt|online dbt|virtual therapy program|therapy program)/i,
    ],
  },
  {
    category: "School & Social Life",
    patterns: [
      /\b(school avoidance|school refusal|school stress|bullying|student mental health|peer pressure|social media|screen addiction|social anxiety|classroom|academic|homework|homeschool|school[- ]?based|teen stressor|common stressors for teens|social life|friendship|dating|egocentrism|identity development|lgbtq|gender dysphoria|coming out)/i,
    ],
  },
  {
    category: "Family Support",
    patterns: [
      /\b(family therapy|family support|family involvement|family communication|family systems|parent[- ]?child|communicating with (your )?teen|strengthening families|family session|parenting style|co[- ]?parent|sibling|household|family dynamic|supporting (your )?(teen|child|adolescent)|family guide|for families\b)/i,
    ],
  },
  {
    category: "Teen Mental Health",
    patterns: [
      /\b(anxiety|depression|\badhd\b|bipolar|\bocd\b|ptsd|trauma|grief|insomnia|sleep disorder|mood disorder|schizophren|psychosis|personality disorder|\bbpd\b|borderline|narcissist|neurodiverg|autism|asperger|eating disorder|anorexia|bulimia|body dysmorph|self esteem|emotional regulation|mindfulness|\bcbt\b|\bdbt\b|\bemdr\b|therapy for teen|counseling for teen|behavioral health|mental health|therapeutic|psychiatr|psycholog|counseling|therapy activity|therapy technique|dialectical|cognitive behavioral|mind[- ]?body|holistic approach|medication for|antidepress|ssri|prozac|lexapro|zoloft|wellbutrin|quetiapine|managing emotion)/i,
      /\b(teen (anger|mood|emotion)|adolescent (anxiety|depression|mental health))/i,
    ],
  },
  {
    category: "Parent Resources",
    patterns: [
      /\b(for parents|parent'?s guide|parents guide|guide for families|practical guide|what parents|how to (help|support|talk)|warning signs|red flags|signs (of|your)|tips for parent|parenting tip|raising (a )?teen|understanding your teen|help your teen|support your teen)/i,
    ],
  },
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

function normalize(text) {
  return `${text || ""}`.toLowerCase();
}

function categorizePost(post) {
  const haystack = normalize([post.title, post.slug, post.excerpt, ...(post.tags || [])].join(" "));

  for (const rule of RULES) {
    if (rule.patterns.some((re) => re.test(haystack))) {
      return rule.category;
    }
  }

  return "Parent Resources";
}

async function supabaseGet(path) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
    },
  });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function supabasePatch(path, body) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
}

const dryRun = process.argv.includes("--dry-run");
const serviceKey = loadServiceKey();
const supabaseUrl = `https://${SUPABASE_REF}.supabase.co`;

async function main() {
  console.log(`\n🏷️  AMH blog re-categorization${dryRun ? " (DRY RUN)" : ""}\n`);

  const categories = await supabaseGet(
    `blog_categories?site_id=eq.${SITE_ID}&is_active=eq.true&select=id,name,slug`,
  );
  const categoryByName = new Map(categories.map((c) => [c.name, c]));

  for (const name of CATEGORIES) {
    if (!categoryByName.has(name)) die(`Missing active category: ${name}`);
  }

  const posts = await supabaseGet(
    `blog_posts?status=eq.published&select=id,slug,title,excerpt,tags,category&order=published_at.desc`,
  );

  console.log(`Found ${posts.length} published posts\n`);

  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  let updated = 0;

  for (const post of posts) {
    const nextCategory = categorizePost(post);
    counts[nextCategory]++;

    const catRow = categoryByName.get(nextCategory);
    if (post.category === nextCategory && post.category_id === catRow.id) continue;

    if (!dryRun) {
      await supabasePatch(`blog_posts?id=eq.${post.id}`, {
        category: nextCategory,
        category_id: catRow.id,
      });
    }
    updated++;
  }

  if (!dryRun) {
    const blogCat = categories.find((c) => c.slug === "blog");
    if (blogCat) {
      await supabasePatch(`blog_categories?id=eq.${blogCat.id}`, { is_active: false });
      console.log('Deactivated legacy WP category "Blog"\n');
    }
  }

  console.log("Category distribution:");
  for (const name of CATEGORIES) {
    console.log(`  ${String(counts[name]).padStart(4)}  ${name}`);
  }
  console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated} posts`);
}

main().catch((err) => die(err.message));
