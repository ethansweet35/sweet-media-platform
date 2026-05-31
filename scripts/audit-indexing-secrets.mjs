#!/usr/bin/env node
/**
 * Audit GOOGLE_INDEXING_* consistency (digests only; no secret values printed).
 * Usage: node scripts/audit-indexing-secrets.mjs
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const BRANDS = [
  { slug: 'sweet-media', ref: 'ynmldknprfusujudvutq' },
  { slug: 'sweet-media-legacy', ref: 'grbxnkgzhquwdqxlscv' },
  { slug: 'northbound-treatment', ref: 'ahufsygjwpbymomfdazb' },
  { slug: 'inner-peak-colorado', ref: 'papiwmobmdbtzeeebmpr' },
  { slug: 'cipher-billing', ref: 'papiwmobmdbtzeeebmpr' },
  { slug: 'addiction-interventions', ref: 'bxtwcdgjzzjxjvqdiuvn' },
  { slug: 'rize-oc', ref: 'uivbbrwuaffqujzkqjvr' },
  { slug: 'rize-oc-legacy', ref: 'nfjlvkxrbzytjefmcvhg' },
  { slug: 'adolescent-mental-health', ref: 'almncgkbmooyuptdgkhe' },
  { slug: 'sullivan-recovery', ref: 'knvkrhwlflkulybcmgmq' },
  { slug: 'cipher-billing-alt', ref: 'nstzjqmtsqgeihkyvkqq' },
  { slug: 'simple-health', ref: 'zxpkxysqzxozgocfuvug' },
  { slug: 'mountainview-treatment', ref: 'gueqxorkktfcwiakepcp' },
  { slug: 'missouri-behavioral-health', ref: 'yfwyxafsgexejjebkwor' },
  { slug: 'an-invite-to-life', ref: 'hrjmsrkrfenkltjlldfo' },
  { slug: 'the-family-recovery-foundation', ref: 'jkiafgbizwufsycqlfyr' },
];

function sha256(val) {
  return createHash('sha256').update(val).digest('hex');
}

function parseEnv(text) {
  const out = {};
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

function supabaseDigests(ref) {
  try {
    const raw = execSync(`supabase secrets list --project-ref ${ref}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const email = raw.match(/GOOGLE_INDEXING_CLIENT_EMAIL\s*\|\s*([a-f0-9]+)/)?.[1];
    const key = raw.match(/GOOGLE_INDEXING_PRIVATE_KEY\s*\|\s*([a-f0-9]+)/)?.[1];
    return { email, key, error: null };
  } catch (e) {
    return { email: null, key: null, error: String(e.message || e).slice(0, 80) };
  }
}

const rootPath = join(REPO_ROOT, '.env');
if (!existsSync(rootPath)) {
  console.error('No repo-root .env');
  process.exit(1);
}
const root = parseEnv(readFileSync(rootPath, 'utf8'));
const rootEmail = root.GOOGLE_INDEXING_CLIENT_EMAIL || '';
const rootKey = root.GOOGLE_INDEXING_PRIVATE_KEY || '';
const rootEmailDigest = rootEmail ? sha256(rootEmail) : null;
const rootKeyDigest = rootKey ? sha256(rootKey) : null;

console.log('Root .env service account:', rootEmail || '(missing)');
console.log('Root email digest:', rootEmailDigest);
console.log('Root key digest:', rootKeyDigest ? `${rootKeyDigest.slice(0, 16)}…` : '(missing)');
console.log('');

const seenRefs = new Map();
for (const { slug, ref } of BRANDS) {
  if (!seenRefs.has(ref)) {
    seenRefs.set(ref, supabaseDigests(ref));
  }
  const d = seenRefs.get(ref);
  const emailOk = d.email === rootEmailDigest;
  const keyOk = d.key === rootKeyDigest;
  let status = 'OK';
  if (!d.email && !d.key) status = 'NO_INDEXING_SECRETS';
  else if (!emailOk || !keyOk) status = 'MISMATCH';
  if (d.error && status === 'NO_INDEXING_SECRETS') status = `ERR: ${d.error}`;

  const localPath = join(REPO_ROOT, 'apps', slug.replace(/-legacy$/, '').replace(/-alt$/, ''), '.env.local');
  let localNote = '';
  if (existsSync(localPath)) {
    const local = parseEnv(readFileSync(localPath, 'utf8'));
    if (local.GOOGLE_INDEXING_CLIENT_EMAIL) {
      const match = sha256(local.GOOGLE_INDEXING_CLIENT_EMAIL) === rootEmailDigest;
      localNote = match ? ' local=match' : ' local=DIFF';
    }
  }

  console.log(`${status.padEnd(22)} ${ref}  (${slug})${localNote}`);
}
