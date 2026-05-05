#!/usr/bin/env node
/**
 * Sweet Media — New Client Supabase Setup
 *
 * Usage:
 *   node scripts/setup-new-client.mjs \
 *     --slug  cipher-billing \
 *     --name  "Cipher Billing" \
 *     --url   "https://cipherbilling.com"
 *
 * Optional flags:
 *   --region    AWS region (default: us-east-1)
 *   --org       Supabase org ID (auto-detected if you only have one)
 *   --admin-email  Seed the admin_users table with this email
 *
 * Prerequisites:
 *   - Run `supabase login` once before using this script
 *   - Add OPENROUTER_API_KEY and OPENAI_API_KEY to .env at repo root
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { randomBytes } from 'crypto';
import * as readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const MGMT = 'https://api.supabase.com';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }

async function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans.trim()); }));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function api(token, method, path, body) {
  const res = await fetch(`${MGMT}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  if (!res.ok) die(`Supabase API error ${res.status} on ${method} ${path}:\n${text}`);
  return text ? JSON.parse(text) : null;
}

async function runSQL(token, ref, sql) {
  return api(token, 'POST', `/v1/projects/${ref}/database/query`, { query: sql });
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function loadEnvFile() {
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) return {};
  const out = {};
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) out[k.trim()] = v.join('=').trim();
  });
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Sweet Media — New Client Supabase Setup\n');

  // ── 1. Access token ──────────────────────────────────────────────────────
  const tokenPath = join(process.env.HOME, '.supabase', 'access-token');
  if (!existsSync(tokenPath)) {
    die('Not logged in to Supabase CLI.\nRun:  supabase login\nThen re-run this script.');
  }
  const token = readFileSync(tokenPath, 'utf8').trim();
  log('Supabase CLI token found');

  // ── 2. Client config from args / prompts ─────────────────────────────────
  const slug       = getArg('--slug')        || await prompt('Client slug    (e.g. cipher-billing): ');
  const name       = getArg('--name')        || await prompt('Client name    (e.g. Cipher Billing): ');
  const siteUrl    = getArg('--url')         || await prompt('Client URL     (e.g. https://cipherbilling.com): ');
  const region     = getArg('--region')      || 'us-east-1';
  const adminEmail = getArg('--admin-email') || null;

  if (!slug || !name || !siteUrl) die('--slug, --name and --url are required.');
  if (!/^[a-z0-9-]+$/.test(slug)) die('Slug must be lowercase letters, numbers, and hyphens only.');

  // ── 3. Env keys ──────────────────────────────────────────────────────────
  const envVars = loadEnvFile();
  const openrouterKey = envVars.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || null;
  const openaiKey     = envVars.OPENAI_API_KEY     || process.env.OPENAI_API_KEY     || null;

  if (!openrouterKey) warn('OPENROUTER_API_KEY not found in .env — edge function secret will be skipped.');
  if (!openaiKey)     warn('OPENAI_API_KEY not found in .env — edge function secret will be skipped.');

  // ── 4. Org ID ─────────────────────────────────────────────────────────────
  let orgId = getArg('--org');
  if (!orgId) {
    step('Fetching your Supabase organizations');
    const orgs = await api(token, 'GET', '/v1/organizations');
    if (orgs.length === 1) {
      orgId = orgs[0].id;
      log(`Org: ${orgs[0].name} (${orgId})`);
    } else {
      console.log('\nMultiple orgs found:');
      orgs.forEach((o, i) => console.log(`  ${i + 1}. ${o.name}  →  ${o.id}`));
      orgId = await prompt('Paste your org ID: ');
    }
  }

  // ── 5. Create project ─────────────────────────────────────────────────────
  const dbPass = randomBytes(20).toString('base64url');
  step(`Creating Supabase project "${name}" (${slug})`);
  const project = await api(token, 'POST', '/v1/projects', {
    name,
    organization_id: orgId,
    plan: 'free',
    region,
    db_pass: dbPass,
  });
  const ref = project.id;
  log(`Project created — ref: ${ref}`);

  // ── 6. Wait for project to be healthy ────────────────────────────────────
  step('Waiting for project to be ready (this takes ~60 seconds)');
  for (let i = 0; i < 24; i++) {
    await sleep(5000);
    const p = await api(token, 'GET', `/v1/projects/${ref}`);
    process.stdout.write('.');
    if (p.status === 'ACTIVE_HEALTHY') {
      console.log('');
      log('Project is ready');
      break;
    }
    if (i === 23) die('Project did not become healthy in time. Check supabase.com and re-run schema manually.');
  }

  // Give the DB a few more seconds before running SQL
  await sleep(3000);

  // ── 7. Run schema ─────────────────────────────────────────────────────────
  step('Running client template schema');
  const schemaPath = join(REPO_ROOT, 'apps/client-template/supabase/client-template-schema.sql');
  const schemaSql = readFileSync(schemaPath, 'utf8');
  await runSQL(token, ref, schemaSql);
  log('Schema applied');

  // ── 8. Update brand_settings ──────────────────────────────────────────────
  step('Seeding brand_settings');
  await runSQL(token, ref, `
    update public.brand_settings set
      site_key   = '${slug}',
      site_name  = '${name.replace(/'/g, "''")}',
      site_url   = '${siteUrl}',
      image_bucket = 'site-assets',
      image_folder = 'blog-featured',
      updated_at = now()
    where site_key = 'client-template';
  `);
  log('brand_settings updated');

  // ── 9. Update blog_categories site_id ────────────────────────────────────
  step('Updating blog_categories site_id');
  await runSQL(token, ref, `
    update public.blog_categories set site_id = '${slug}' where site_id = 'client-template';
  `);
  log('blog_categories updated');

  // ── 10. Create storage bucket ─────────────────────────────────────────────
  step('Creating site-assets storage bucket');
  await api(token, 'POST', `/v1/projects/${ref}/storage/buckets`, {
    id: 'site-assets',
    name: 'site-assets',
    public: true,
  });
  log('Storage bucket "site-assets" created (public)');

  // ── 11. Seed admin user (optional) ───────────────────────────────────────
  if (adminEmail) {
    step(`Seeding admin user: ${adminEmail}`);
    await runSQL(token, ref, `
      insert into public.admin_users (email, role)
      values ('${adminEmail.replace(/'/g, "''")}', 'admin')
      on conflict (email) do update set role = excluded.role;
    `);
    log(`admin_users seeded with ${adminEmail}`);
  }

  // ── 12. Edge function secrets ─────────────────────────────────────────────
  if (openrouterKey || openaiKey) {
    step('Setting edge function secrets');
    const secretParts = [];
    if (openrouterKey) secretParts.push(`OPENROUTER_API_KEY=${openrouterKey}`);
    if (openaiKey)     secretParts.push(`OPENAI_API_KEY=${openaiKey}`);
    secretParts.push(`BLOG_IMAGE_BUCKET=site-assets`);
    try {
      execSync(
        `supabase secrets set ${secretParts.join(' ')} --project-ref ${ref}`,
        { cwd: REPO_ROOT, stdio: 'inherit' }
      );
      log('Secrets set');
    } catch {
      warn('Could not set secrets via CLI — set them manually in the Supabase dashboard.');
    }
  }

  // ── 13. Deploy edge functions ─────────────────────────────────────────────
  const functions = ['generate-blog-post', 'generate-blog-image'];
  for (const fn of functions) {
    step(`Deploying edge function: ${fn}`);
    try {
      execSync(
        `supabase functions deploy ${fn} --project-ref ${ref} --workdir apps/sweet-media`,
        { cwd: REPO_ROOT, stdio: 'inherit' }
      );
      log(`${fn} deployed`);
    } catch {
      warn(`Failed to deploy ${fn} — run manually:\n  supabase functions deploy ${fn} --project-ref ${ref} --workdir apps/sweet-media`);
    }
  }

  // ── 14. Get project API keys ───────────────────────────────────────────────
  step('Fetching project API keys');
  const { anon_key } = await api(token, 'GET', `/v1/projects/${ref}/api-keys`)
    .then(keys => ({ anon_key: keys.find(k => k.name === 'anon')?.api_key }))
    .catch(() => ({ anon_key: '← get from Supabase dashboard → Project Settings → API' }));

  // ── 15. Done — print summary ──────────────────────────────────────────────
  const supabaseUrl = `https://${ref}.supabase.co`;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  ${name} is ready!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project ref : ${ref}
Dashboard   : https://supabase.com/dashboard/project/${ref}

─── Copy this into apps/${slug}/.env.local ─────────

NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${anon_key}
NEXT_PUBLIC_SITE_ID=${slug}

─── Next steps ──────────────────────────────────────

1. Copy apps/client-template → apps/${slug}
2. Update apps/${slug}/package.json name to @sweetmedia/${slug}
3. Paste the .env.local above
4. Update next.config.ts image hostname to ${ref}.supabase.co
5. Run: pnpm install
6. Build and test: pnpm --filter @sweetmedia/${slug} dev
${adminEmail ? '' : '7. Add admin user in Supabase Auth, then run:\n   insert into public.admin_users (email, role) values (\'your@email.com\', \'admin\');'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error(err); process.exit(1); });
