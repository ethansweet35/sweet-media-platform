#!/usr/bin/env node
/**
 * Append shared platform secrets from repo-root .env into apps/<slug>/.env.local
 * (only keys not already set in the brand file).
 *
 * Usage: node scripts/merge-root-env-into-brand.mjs --slug adolescent-mental-health
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const SHARED_FROM_ROOT = [
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
];

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function parseEnv(text) {
  const out = {};
  for (const line of text.replace(/\\n/g, '\n').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    let k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k) out[k] = v;
  }
  return out;
}

const slug = getArg('--slug');
if (!slug) {
  console.error('Usage: node scripts/merge-root-env-into-brand.mjs --slug <slug>');
  process.exit(1);
}

const rootPath = join(REPO_ROOT, '.env');
const brandPath = join(REPO_ROOT, 'apps', slug, '.env.local');

if (!existsSync(rootPath) || !existsSync(brandPath)) {
  console.error('Missing .env or apps/<slug>/.env.local');
  process.exit(1);
}

const root = parseEnv(readFileSync(rootPath, 'utf8'));
const brand = parseEnv(readFileSync(brandPath, 'utf8'));
let added = 0;

for (const key of SHARED_FROM_ROOT) {
  if (!brand[key] && root[key]) {
    brand[key] = root[key];
    added++;
  }
}

const body = Object.entries(brand)
  .map(([k, v]) => `${k}=${v}`)
  .join('\n');

writeFileSync(brandPath, `${body}\n`, 'utf8');
console.log(`✅  Updated apps/${slug}/.env.local (+${added} keys from root .env)`);
