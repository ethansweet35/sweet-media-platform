#!/usr/bin/env node
/**
 * Generate a one-time admin password recovery link (no email; bypasses rate limit).
 * Usage: node scripts/generate-admin-recovery-link.mjs --slug sullivan-recovery --email you@example.com
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const TRAILING_SLASH_SLUGS = new Set([
  'sullivan-recovery',
  'northbound-treatment',
  'mountainview-treatment',
  'missouri-behavioral-health',
  'simple-health',
  'the-family-recovery-foundation',
]);

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function parseEnv(text) {
  const out = {};
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
  }
  return out;
}

const slug = getArg('--slug');
const email = getArg('--email')?.trim().toLowerCase();
if (!slug || !email) {
  console.error('Usage: node scripts/generate-admin-recovery-link.mjs --slug <slug> --email <email>');
  process.exit(1);
}

const envPath = join(REPO_ROOT, 'apps', slug, '.env.local');
if (!existsSync(envPath)) {
  console.error(`Missing ${envPath}`);
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, 'utf8'));
const siteUrl = (env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '');
const trailing = TRAILING_SLASH_SLUGS.has(slug) || env.NEXT_PUBLIC_TRAILING_SLASH === 'true';
const redirectTo = `${siteUrl}/admin/reset-password${trailing ? '/' : ''}`;

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: adminRow } = await admin.from('admin_users').select('id').ilike('email', email).maybeSingle();
if (!adminRow) {
  console.error(`No admin_users row for ${email} on ${slug}`);
  process.exit(1);
}

const { data, error } = await admin.auth.admin.generateLink({
  type: 'recovery',
  email,
  options: { redirectTo },
});

if (error || !data?.properties?.action_link) {
  console.error(error?.message || 'generateLink failed');
  process.exit(1);
}

console.log(`Recovery link for ${email} (${slug}):`);
console.log(data.properties.action_link);
console.log(`Redirect target: ${redirectTo}`);
