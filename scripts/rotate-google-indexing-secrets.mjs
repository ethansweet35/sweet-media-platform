#!/usr/bin/env node
/**
 * Rotate GOOGLE_INDEXING_* across repo-root .env, all Supabase projects, and Vercel brands.
 *
 * Usage:
 *   node scripts/rotate-google-indexing-secrets.mjs --json /path/to/service-account.json
 *   node scripts/rotate-google-indexing-secrets.mjs --json /path/to/key.json --skip-vercel
 *   node scripts/rotate-google-indexing-secrets.mjs --json /path/to/key.json --skip-supabase
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** Unique Supabase project refs for live brands */
const SUPABASE_REFS = [
  'ynmldknprfusujudvutq', // sweet-media
  'ahufsygjwpbymomfdazb', // northbound-treatment
  'papiwmobmdbtzeeebmpr', // inner-peak-colorado (cipher placeholder ref)
  'bxtwcdgjzzjxjvqdiuvn', // addiction-interventions
  'uivbbrwuaffqujzkqjvr', // rize-oc
  'almncgkbmooyuptdgkhe', // adolescent-mental-health
  'knvkrhwlflkulybcmgmq', // sullivan-recovery
  'nstzjqmtsqgeihkyvkqq', // cipher-billing alt
  'zxpkxysqzxozgocfuvug', // simple-health
  'gueqxorkktfcwiakepcp', // mountainview-treatment
  'yfwyxafsgexejjebkwor', // missouri-behavioral-health
  'hrjmsrkrfenkltjlldfo', // an-invite-to-life
  'jkiafgbizwufsycqlfyr', // the-family-recovery-foundation
];

const VERCEL_BRANDS = [
  { slug: 'sweet-media', name: 'Sweet Media', project: 'sweet-media-platform' },
  { slug: 'northbound-treatment', name: 'Northbound Treatment' },
  { slug: 'inner-peak-colorado', name: 'Inner Peak Colorado', project: 'inner-peak-colorado-platform' },
  { slug: 'addiction-interventions', name: 'Addiction Interventions' },
  { slug: 'cipher-billing', name: 'Cipher Billing' },
  { slug: 'rize-oc', name: 'Rize OC' },
  { slug: 'simple-health', name: 'Simple Health' },
  { slug: 'adolescent-mental-health', name: 'Adolescent Mental Health' },
  { slug: 'mountainview-treatment', name: 'Mountainview Treatment' },
  { slug: 'missouri-behavioral-health', name: 'Missouri Behavioral Health' },
  { slug: 'an-invite-to-life', name: 'An Invite to Life' },
  { slug: 'the-family-recovery-foundation', name: 'The Family Recovery Foundation' },
  { slug: 'sullivan-recovery', name: 'Sullivan Recovery' },
];

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function updateRootEnv(email, privateKeyPem) {
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) {
    console.error('Missing repo-root .env');
    process.exit(1);
  }
  const escapedKey = privateKeyPem.replace(/\n/g, '\\n');
  let text = readFileSync(envPath, 'utf8');
  const lines = text.split('\n');
  let emailSet = false;
  let keySet = false;
  const out = lines.map((line) => {
    if (line.startsWith('GOOGLE_INDEXING_CLIENT_EMAIL=')) {
      emailSet = true;
      return `GOOGLE_INDEXING_CLIENT_EMAIL=${email}`;
    }
    if (line.startsWith('GOOGLE_INDEXING_PRIVATE_KEY=')) {
      keySet = true;
      return `GOOGLE_INDEXING_PRIVATE_KEY=${escapedKey}`;
    }
    return line;
  });
  if (!emailSet) out.push(`GOOGLE_INDEXING_CLIENT_EMAIL=${email}`);
  if (!keySet) out.push(`GOOGLE_INDEXING_PRIVATE_KEY=${escapedKey}`);
  writeFileSync(envPath, out.join('\n').replace(/\n*$/, '\n'), 'utf8');
  console.log(`Updated ${envPath}`);
  console.log(`  GOOGLE_INDEXING_CLIENT_EMAIL=${email}`);
}

function pushSupabaseSecrets(email, privateKeyPem) {
  const tmpFile = join(tmpdir(), `google-indexing-secrets-${Date.now()}.env`);
  const escapedKey = privateKeyPem.replace(/\n/g, '\\n');
  writeFileSync(
    tmpFile,
    `GOOGLE_INDEXING_CLIENT_EMAIL=${email}\nGOOGLE_INDEXING_PRIVATE_KEY=${escapedKey}\n`,
    'utf8',
  );
  try {
    for (const ref of SUPABASE_REFS) {
      process.stdout.write(`Supabase ${ref} … `);
      try {
        execSync(`supabase secrets set --env-file "${tmpFile}" --project-ref ${ref}`, {
          cwd: REPO_ROOT,
          stdio: ['pipe', 'pipe', 'pipe'],
        });
        console.log('OK');
      } catch (e) {
        console.log('FAILED');
        console.error(`  ${String(e.stderr || e.message).slice(0, 200)}`);
      }
    }
  } finally {
    try {
      unlinkSync(tmpFile);
    } catch {
      /* ignore */
    }
  }
}

function pushVercelEnv() {
  for (const brand of VERCEL_BRANDS) {
    const projectFlag = brand.project ? ` --project ${brand.project}` : '';
    const cmd =
      `node scripts/publish-client-to-vercel.mjs --slug ${brand.slug} --name "${brand.name}"${projectFlag} --update-env --skip-deploy`;
    process.stdout.write(`Vercel ${brand.slug} … `);
    try {
      execSync(cmd, { cwd: REPO_ROOT, stdio: ['pipe', 'pipe', 'pipe'] });
      console.log('OK');
    } catch (e) {
      console.log('FAILED');
      console.error(`  ${String(e.stderr || e.message).slice(0, 300)}`);
    }
  }
}

const jsonPath = getArg('--json');
if (!jsonPath) {
  console.error('Usage: node scripts/rotate-google-indexing-secrets.mjs --json /path/to/key.json');
  process.exit(1);
}

const raw = JSON.parse(readFileSync(jsonPath, 'utf8'));
const email = raw.client_email;
const privateKey = raw.private_key;
if (!email || !privateKey) {
  console.error('JSON must include client_email and private_key');
  process.exit(1);
}

console.log(`Rotating to ${email}\n`);
updateRootEnv(email, privateKey);

if (!hasFlag('--skip-supabase')) {
  console.log('\nPushing Supabase edge function secrets…');
  pushSupabaseSecrets(email, privateKey);
}

if (!hasFlag('--skip-vercel')) {
  console.log('\nPushing Vercel env vars…');
  pushVercelEnv();
}

console.log('\nDone. Run: node scripts/audit-indexing-secrets.mjs');
console.log('Add the service account as GSC Owner on each brand domain if not already done.');
