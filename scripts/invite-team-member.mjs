#!/usr/bin/env node
/**
 * Sweet Media — Invite Team Member
 *
 * Creates a Supabase Auth user and grants admin access on one or more client apps.
 *
 * Usage:
 *   node scripts/invite-team-member.mjs \
 *     --email jake@sweetmediaservices.com \
 *     --clients inner-peak-colorado,sweet-media
 *
 *   # Add to every client at once:
 *   node scripts/invite-team-member.mjs \
 *     --email jake@sweetmediaservices.com \
 *     --all-clients
 *
 * Options:
 *   --email       (required) Team member's email address
 *   --clients     Comma-separated list of client app slugs
 *   --all-clients Add to every client app that has a valid .env.local
 *   --role        Role to grant in admin_users table (default: admin)
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT  = join(__dirname, '..');
const APPS_DIR   = join(REPO_ROOT, 'apps');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

/** Parse key=value lines from a .env.local file into a plain object. */
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return null;
  const out = {};
  readFileSync(filePath, 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) return;
    out[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  });
  return out;
}

/** Return all app slugs that have a usable .env.local (URL + service role key present). */
function discoverClients() {
  return readdirSync(APPS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(slug => {
      const env = parseEnvFile(join(APPS_DIR, slug, '.env.local'));
      return !!(env?.NEXT_PUBLIC_SUPABASE_URL && env?.SUPABASE_SERVICE_ROLE_KEY);
    });
}

// ─── Core: invite one user to one client ──────────────────────────────────────

async function inviteToClient(email, slug, role) {
  const envPath = join(APPS_DIR, slug, '.env.local');
  const env     = parseEnvFile(envPath);

  if (!env) {
    warn(`Skipping ${slug} — no .env.local found at apps/${slug}/.env.local`);
    return { slug, success: false, reason: 'missing .env.local' };
  }

  const supabaseUrl    = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    warn(`Skipping ${slug} — .env.local is missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY`);
    return { slug, success: false, reason: 'missing env vars' };
  }

  step(`[${slug}] Inviting ${email}`);

  // ── Part A: Create / invite Supabase Auth user ────────────────────────────
  let authOk   = false;
  let authNote = '';

  try {
    const authRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        email_confirm: false,
        send_email_invite: true,
      }),
    });

    const authJson = await authRes.json();

    if (authJson.id) {
      authOk   = true;
      authNote = 'invite email sent';
    } else if (
      authRes.status === 422 ||
      authJson.msg?.toLowerCase().includes('already') ||
      authJson.code === 'email_exists' ||
      authJson.error?.toLowerCase().includes('already')
    ) {
      authOk   = true;
      authNote = 'auth user already existed';
    } else {
      warn(`[${slug}] Auth user response: ${JSON.stringify(authJson).slice(0, 200)}`);
      authNote = `auth warning — check dashboard`;
    }
  } catch (err) {
    warn(`[${slug}] Auth user creation failed: ${err.message}`);
    authNote = `auth error: ${err.message}`;
  }

  // ── Part B: Upsert email into admin_users table ───────────────────────────
  // Strategy: plain INSERT, treat duplicate key (409) as success since the row already exists.
  // Some live DBs don't have the `role` column yet, so fall back to email-only on PGRST204.
  let adminOk = false;

  const adminHeaders = {
    'Authorization': `Bearer ${serviceRoleKey}`,
    'apikey': serviceRoleKey,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  };

  for (const payload of [{ email, role }, { email }]) {
    try {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/admin_users`, {
        method: 'POST',
        headers: adminHeaders,
        body: JSON.stringify(payload),
      });

      if (dbRes.status === 200 || dbRes.status === 201 || dbRes.status === 204) {
        adminOk = true;
        break;
      }

      const body = await dbRes.text();

      // Duplicate key = row already exists = access already granted → treat as success
      if (dbRes.status === 409 || body.includes('23505') || body.includes('duplicate key')) {
        adminOk = true;
        break;
      }

      // PGRST204 = column not in schema cache (role column missing) → retry without role
      if (body.includes('PGRST204') && payload.role) continue;

      warn(`[${slug}] admin_users insert failed (${dbRes.status}): ${body.slice(0, 200)}`);
      break;
    } catch (err) {
      warn(`[${slug}] admin_users insert error: ${err.message}`);
      break;
    }
  }

  if (authOk && adminOk) {
    log(`[${slug}] Done — ${authNote}, admin access granted`);
    return { slug, success: true, authNote };
  }

  return {
    slug,
    success: false,
    reason: [!authOk && 'auth failed', !adminOk && 'admin_users insert failed'].filter(Boolean).join(', '),
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n👋  Sweet Media — Invite Team Member\n');

  // ── Email ─────────────────────────────────────────────────────────────────
  let email = getArg('--email');
  if (!email) email = await prompt('  Team member email: ');
  if (!email || !email.includes('@')) die('A valid --email is required.');

  const role = getArg('--role') || 'admin';

  // ── Client list ───────────────────────────────────────────────────────────
  let slugs = [];
  const available = discoverClients();

  if (hasFlag('--all-clients')) {
    if (available.length === 0) die('No client apps with valid .env.local found in apps/.');
    slugs = available;
    console.log(`  Found ${slugs.length} client(s): ${slugs.join(', ')}`);
  } else {
    const clientsArg = getArg('--clients');
    if (clientsArg) {
      slugs = clientsArg.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      console.log('\n  Available clients:');
      available.forEach((s, i) => console.log(`    ${i + 1}. ${s}`));
      console.log('');
      const input = await prompt('  Enter slug(s) comma-separated (or "all"): ');
      slugs = input.toLowerCase() === 'all' ? available : input.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  if (slugs.length === 0) die('No clients specified. Use --clients <slug,...> or --all-clients.');

  // Validate each slug exists as an app directory
  for (const slug of slugs) {
    if (!existsSync(join(APPS_DIR, slug))) {
      die(`App not found: apps/${slug} — check the slug spelling.`);
    }
  }

  // ── Run invitations ───────────────────────────────────────────────────────
  console.log(`\n  Inviting ${email} as ${role} on: ${slugs.join(', ')}\n`);

  const results = [];
  for (const slug of slugs) {
    results.push(await inviteToClient(email, slug, role));
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  const succeeded = results.filter(r => r.success);
  const failed    = results.filter(r => !r.success);

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Invite complete for ${email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  if (succeeded.length > 0) {
    console.log('\n  Admin access granted on:');
    succeeded.forEach(r => console.log(`    ✓  ${r.slug}  (${r.authNote})`));
    console.log(`
  Next steps for ${email}:
    1. Check their inbox for an invitation email from Supabase
    2. Click the link to set their password
    3. Log in at /admin on the relevant site(s)`);
  }

  if (failed.length > 0) {
    console.log('\n  Could not complete on:');
    failed.forEach(r => console.log(`    ✗  ${r.slug}  — ${r.reason}`));
    console.log('\n  See warnings above for details. You can re-run this script to retry.');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(err => { console.error(err); process.exit(1); });
