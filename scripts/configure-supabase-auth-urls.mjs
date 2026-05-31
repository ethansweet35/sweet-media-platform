#!/usr/bin/env node
/**
 * Set Supabase Auth site_url + redirect allow list per brand project.
 * Usage: node scripts/configure-supabase-auth-urls.mjs [--slug sullivan-recovery]
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const BRANDS = [
  { slug: 'sweet-media', ref: 'ynmldknprfusujudvutq', url: 'https://sweetmediaservices.com' },
  { slug: 'northbound-treatment', ref: 'ahufsygjwpbymomfdazb', url: 'https://www.northboundtreatment.com' },
  { slug: 'inner-peak-colorado', ref: 'papiwmobmdbtzeeebmpr', url: 'https://innerpeakcolorado.com' },
  { slug: 'addiction-interventions', ref: 'bxtwcdgjzzjxjvqdiuvn', url: 'https://addictioninterventions.com' },
  { slug: 'cipher-billing', ref: 'nstzjqmtsqgeihkyvkqq', url: 'https://cipherbilling.com' },
  { slug: 'rize-oc', ref: 'uivbbrwuaffqujzkqjvr', url: 'https://rizeoc.com' },
  { slug: 'simple-health', ref: 'zxpkxysqzxozgocfuvug', url: 'https://getsimplehealth.us' },
  { slug: 'adolescent-mental-health', ref: 'almncgkbmooyuptdgkhe', url: 'https://adolescentmentalhealth.com' },
  { slug: 'mountainview-treatment', ref: 'gueqxorkktfcwiakepcp', url: 'https://mountainviewtreatment.com' },
  { slug: 'missouri-behavioral-health', ref: 'yfwyxafsgexejjebkwor', url: 'https://missouribehavioralhealth.com' },
  { slug: 'an-invite-to-life', ref: 'hrjmsrkrfenkltjlldfo', url: 'https://aninvitetolife.com' },
  { slug: 'the-family-recovery-foundation', ref: 'jkiafgbizwufsycqlfyr', url: 'https://tfrfoundation.org' },
  { slug: 'sullivan-recovery', ref: 'knvkrhwlflkulybcmgmq', url: 'https://sullivanrecovery.com' },
];

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function loadToken() {
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) throw new Error('Missing repo-root .env');
  const token = readFileSync(envPath, 'utf8').match(/^SUPABASE_ACCESS_TOKEN=(.+)$/m)?.[1]?.trim();
  if (!token) throw new Error('SUPABASE_ACCESS_TOKEN missing from .env');
  return token;
}

function buildAllowList(siteUrl) {
  const origin = siteUrl.replace(/\/+$/, '');
  return [
    `${origin}/admin/reset-password`,
    `${origin}/admin/reset-password/`,
    `${origin}/admin/**`,
    'http://localhost:3000/admin/reset-password',
    'http://localhost:3000/admin/reset-password/',
    'http://localhost:3001/admin/reset-password',
    'http://localhost:3001/admin/reset-password/',
  ].join(',');
}

async function configureBrand({ slug, ref, url }, token) {
  const body = {
    site_url: url.replace(/\/+$/, ''),
    uri_allow_list: buildAllowList(url),
  };
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/config/auth`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${slug} (${ref}) HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  console.log(`OK  ${slug} → site_url=${body.site_url}`);
}

async function main() {
  const token = loadToken();
  const slugFilter = getArg('--slug');
  const targets = slugFilter ? BRANDS.filter((b) => b.slug === slugFilter) : BRANDS;
  if (targets.length === 0) {
    console.error(`Unknown slug: ${slugFilter}`);
    process.exit(1);
  }
  for (const brand of targets) {
    try {
      await configureBrand(brand, token);
    } catch (e) {
      console.error(`FAIL ${brand.slug}: ${e.message}`);
    }
  }
}

main();
