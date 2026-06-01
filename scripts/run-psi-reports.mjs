#!/usr/bin/env node
/**
 * Run Lighthouse (same engine as PSI) for all live brand homepages.
 * Usage:
 *   node scripts/run-psi-reports.mjs
 *   node scripts/run-psi-reports.mjs --slug sullivan-recovery --strategy mobile
 *   node scripts/run-psi-reports.mjs --engine psi   # Google PSI API (needs GOOGLE_PSI_API_KEY)
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const BRANDS = [
  { slug: 'sweet-media', url: 'https://sweetmediaservices.com' },
  { slug: 'northbound-treatment', url: 'https://www.northboundtreatment.com' },
  { slug: 'inner-peak-colorado', url: 'https://innerpeakcolorado.com' },
  { slug: 'addiction-interventions', url: 'https://addictioninterventions.com' },
  { slug: 'cipher-billing', url: 'https://cipherbilling.com' },
  { slug: 'rize-oc', url: 'https://rizeoc.com' },
  { slug: 'simple-health', url: 'https://getsimplehealth.us' },
  { slug: 'adolescent-mental-health', url: 'https://adolescentmentalhealth.com' },
  { slug: 'mountainview-treatment', url: 'https://mountainviewtreatment.com' },
  { slug: 'missouri-behavioral-health', url: 'https://missouribehavioralhealth.com' },
  { slug: 'an-invite-to-life', url: 'https://aninvitetolife.com' },
  { slug: 'the-family-recovery-foundation', url: 'https://tfrfoundation.org' },
  { slug: 'sullivan-recovery', url: 'https://sullivanrecovery.com' },
];

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function loadPsiApiKey() {
  if (process.env.GOOGLE_PSI_API_KEY?.trim()) return process.env.GOOGLE_PSI_API_KEY.trim();
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) return null;
  return readFileSync(envPath, 'utf8').match(/^GOOGLE_PSI_API_KEY=(.+)$/m)?.[1]?.trim() || null;
}

function scorePct(score) {
  if (score == null) return null;
  return Math.round(Number(score) * 100);
}

function fmtMs(ms) {
  if (ms == null) return null;
  return `${Math.round(ms)}ms`;
}

function parseLighthouseJson(json) {
  const cats = json.categories ?? {};
  const audits = json.audits ?? {};
  return {
    performance: scorePct(cats.performance?.score),
    accessibility: scorePct(cats.accessibility?.score),
    bestPractices: scorePct(cats['best-practices']?.score),
    seo: scorePct(cats.seo?.score),
    lcp: fmtMs(audits['largest-contentful-paint']?.numericValue),
    cls: audits['cumulative-layout-shift']?.displayValue ?? null,
    tbt: fmtMs(audits['total-blocking-time']?.numericValue),
  };
}

async function runPsiApi(url, strategy, apiKey) {
  if (!apiKey) throw new Error('GOOGLE_PSI_API_KEY not set in repo-root .env');
  const params = new URLSearchParams({ url, strategy });
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) params.append('category', c);
  params.set('key', apiKey);
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `HTTP ${res.status}`);
  return parseLighthouseJson(json.lighthouseResult ?? {});
}

function runLighthouse(url, strategy) {
  const formFactor = strategy === 'desktop' ? 'desktop' : 'mobile';
  const tmp = join(REPO_ROOT, 'reports', 'psi', `.lh-${Date.now()}.json`);
  mkdirSync(dirname(tmp), { recursive: true });
  try {
    execSync(
      `npx lighthouse "${url}" --form-factor=${formFactor} --screenEmulation.mobile=${formFactor === 'mobile'} --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --output-path="${tmp}"`,
      { stdio: ['pipe', 'pipe', 'pipe'], timeout: 180000 },
    );
    const json = JSON.parse(readFileSync(tmp, 'utf8'));
    return parseLighthouseJson(json);
  } finally {
    try {
      readFileSync(tmp);
      execSync(`rm -f "${tmp}"`);
    } catch {
      /* ignore */
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function printTable(results) {
  console.log('\n| Brand | Strategy | Perf | A11y | BP | SEO | LCP | CLS |');
  console.log('|-------|----------|------|------|----|-----|-----|-----|');
  for (const r of results) {
    if (r.error) {
      console.log(`| ${r.slug} | ${r.strategy} | — | — | — | — | — | ${r.error.slice(0, 30)} |`);
    } else {
      console.log(`| ${r.slug} | ${r.strategy} | ${r.performance ?? '—'} | ${r.accessibility ?? '—'} | ${r.bestPractices ?? '—'} | ${r.seo ?? '—'} | ${r.lcp ?? '—'} | ${r.cls ?? '—'} |`);
    }
  }
}

async function main() {
  const slugFilter = getArg('--slug');
  const strategyArg = getArg('--strategy');
  const engine = getArg('--engine') || 'lighthouse';
  const strategies = strategyArg ? [strategyArg] : ['mobile', 'desktop'];
  const apiKey = loadPsiApiKey();
  const targets = slugFilter ? BRANDS.filter((b) => b.slug === slugFilter) : BRANDS;

  if (targets.length === 0) {
    console.error(`Unknown slug: ${slugFilter}`);
    process.exit(1);
  }

  const outDir = join(REPO_ROOT, 'reports', 'psi');
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const results = [];

  console.log(`Performance reports — engine: ${engine}, ${targets.length} brand(s), ${strategies.join(' + ')}\n`);

  for (const brand of targets) {
    for (const strategy of strategies) {
      process.stdout.write(`${brand.slug} (${strategy}) … `);
      try {
        const metrics =
          engine === 'psi'
            ? await runPsiApi(brand.url, strategy, apiKey)
            : runLighthouse(brand.url, strategy);
        const row = { slug: brand.slug, url: brand.url, strategy, engine, ...metrics, fetchedAt: new Date().toISOString() };
        results.push(row);
        console.log(`perf ${row.performance} | a11y ${row.accessibility} | BP ${row.bestPractices} | SEO ${row.seo} | LCP ${row.lcp}`);
      } catch (e) {
        results.push({ slug: brand.slug, url: brand.url, strategy, engine, error: String(e.message || e) });
        console.log(`FAILED — ${String(e.message || e).slice(0, 70)}`);
      }
      if (engine === 'psi') await sleep(1500);
    }
  }

  const outPath = join(outDir, `lighthouse-${stamp}.json`);
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${outPath}`);
  printTable(results);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
