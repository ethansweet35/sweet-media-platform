#!/usr/bin/env node
/**
 * Strip Vercel build-time noise from a vercel env pull → local .env.local
 *
 * Usage:
 *   node scripts/filter-vercel-env.mjs --slug rize-oc
 *   node scripts/filter-vercel-env.mjs --slug rize-oc --in .env.local.production
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const KEEP = new Set([
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SITE_ID',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_BLOG_PATH_BASE',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_PROJECT_REF',
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_BRAND_NAME',
  'OPENROUTER_API_KEY',
  'OPENAI_API_KEY',
  'SEMRUSH_API_KEY',
  'DATAFORSEO_LOGIN',
  'DATAFORSEO_PASSWORD',
  'FIRECRAWL_API_KEY',
  'GOOGLE_NLP_API_KEY',
  'GOOGLE_INDEXING_CLIENT_EMAIL',
  'GOOGLE_INDEXING_PRIVATE_KEY',
  'GOOGLE_OAUTH_CLIENT_ID',
  'GOOGLE_OAUTH_CLIENT_SECRET',
  'AI_OPTIMIZE_VERCEL_PROJECT_ID',
  'CURSOR_API_KEY',
  'SURFER_API_KEY',
]);

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

const slug = getArg('--slug');
if (!slug) {
  console.error('Usage: node scripts/filter-vercel-env.mjs --slug <slug> [--in <file>]');
  process.exit(1);
}

const inPath =
  getArg('--in') ??
  join(REPO_ROOT, 'apps', slug, '.env.local.production');
const outPath = join(REPO_ROOT, 'apps', slug, '.env.local');

if (!existsSync(inPath)) {
  console.error(`Missing input: ${inPath}`);
  process.exit(1);
}

const env = {};
for (const line of readFileSync(inPath, 'utf8').replace(/\\n/g, '\n').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const eq = t.indexOf('=');
  if (eq < 0) continue;
  let k = t.slice(0, eq).trim();
  let v = t.slice(eq + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  if (KEEP.has(k)) env[k] = v;
}

if (!env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('No usable env vars found in input file.');
  process.exit(1);
}

const body = Object.entries(env)
  .map(([k, v]) => `${k}=${v}`)
  .join('\n');

writeFileSync(outPath, `${body}\n`, 'utf8');
console.log(`✅  Wrote ${outPath} (${Object.keys(env).length} vars)`);
