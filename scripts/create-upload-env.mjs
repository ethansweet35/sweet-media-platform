#!/usr/bin/env node
/**
 * Create apps/<slug>/.upload.env from apps/<slug>/.env.local
 *
 * Usage:
 *   node scripts/create-upload-env.mjs --slug rize-oc
 *   node scripts/create-upload-env.mjs --slug mountainview-treatment --image-dir ~/Downloads/mv-images
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

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

function refFromUrl(url) {
  const m = url?.match(/https:\/\/([^.]+)\.supabase\.co/);
  return m?.[1] ?? null;
}

const slug = getArg('--slug');
if (!slug) {
  console.error('Usage: node scripts/create-upload-env.mjs --slug <slug> [--image-dir <path>]');
  process.exit(1);
}

const envLocalPath = join(REPO_ROOT, 'apps', slug, '.env.local');
const outPath = join(REPO_ROOT, 'apps', slug, '.upload.env');

if (!existsSync(envLocalPath)) {
  console.error(`Missing ${envLocalPath}`);
  process.exit(1);
}

const env = parseEnv(readFileSync(envLocalPath, 'utf8'));
const url = env.NEXT_PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL;
const ref = env.SUPABASE_PROJECT_REF ?? refFromUrl(url);
const serviceRole = env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!ref || !url) {
  console.error('Could not determine Supabase project ref/URL from .env.local');
  process.exit(1);
}
if (!serviceRole) {
  console.error(
    'SUPABASE_SERVICE_ROLE_KEY missing from .env.local.\n' +
      '  Add it from Supabase Dashboard → Project Settings → API → service_role,\n' +
      '  or pull production env: vercel env pull .env.local --environment production',
  );
  process.exit(1);
}

const imageDir =
  getArg('--image-dir') ??
  join(homedir(), 'Downloads', `${slug}-images`);

const lines = [
  `SUPABASE_PROJECT_REF=${ref}`,
  `SUPABASE_URL=${url.replace(/\/$/, '')}`,
  `SUPABASE_SERVICE_ROLE_KEY=${serviceRole}`,
  'SUPABASE_BUCKET=site-assets',
  `LOCAL_IMAGE_DIR=${imageDir}`,
  '',
];

writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`✅  Wrote ${outPath}`);
