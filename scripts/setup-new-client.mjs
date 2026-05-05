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

import { readFileSync, existsSync, appendFileSync } from 'fs';
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
  // Try multiple locations: env var → file (old CLI) → macOS keychain (new CLI)
  const envVarsEarly = loadEnvFile();
  let token = process.env.SUPABASE_ACCESS_TOKEN || envVarsEarly.SUPABASE_ACCESS_TOKEN || null;

  if (!token) {
    const tokenPath = join(process.env.HOME, '.supabase', 'access-token');
    if (existsSync(tokenPath)) token = readFileSync(tokenPath, 'utf8').trim();
  }

  if (!token) {
    try {
      token = execSync(
        'security find-generic-password -s "Supabase CLI" -a "access-token" -w',
        { stdio: ['pipe', 'pipe', 'pipe'] }
      ).toString().trim();
    } catch { /* not in keychain */ }
  }

  if (!token) {
    console.log('\n  Could not auto-detect token.');
    console.log('  Go to: supabase.com/dashboard/account/tokens');
    console.log('  Click "Generate new token", copy the full sbp_... value, paste below.');
    console.log('  (It will be saved to .env so you never need to paste it again.)\n');
    token = await prompt('  Paste your Supabase access token: ');
    if (!token) die('No token provided.');
    // Save to .env so future runs auto-detect it
    try {
      const envPath = join(REPO_ROOT, '.env');
      const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
      if (!existing.includes('SUPABASE_ACCESS_TOKEN')) {
        appendFileSync(envPath, `\nSUPABASE_ACCESS_TOKEN=${token}\n`);
        log('Token saved to .env — future runs will auto-detect it');
      }
    } catch {
      warn('Could not auto-save token. Run this once to save it permanently:\n  echo "SUPABASE_ACCESS_TOKEN=' + token + '" >> .env');
    }
  }

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
  const openrouterKey    = envVars.OPENROUTER_API_KEY    || process.env.OPENROUTER_API_KEY    || null;
  const openaiKey        = envVars.OPENAI_API_KEY        || process.env.OPENAI_API_KEY        || null;
  let   webhookSecret    = envVars.BLOG_WEBHOOK_SECRET   || process.env.BLOG_WEBHOOK_SECRET   || null;

  if (!openrouterKey) warn('OPENROUTER_API_KEY not found in .env — add it for edge function secrets.');
  if (!openaiKey)     warn('OPENAI_API_KEY not found in .env — add it for edge function secrets.');

  // Auto-generate a webhook secret if not set, and save it to .env for reuse
  if (!webhookSecret) {
    webhookSecret = randomBytes(32).toString('hex');
    try {
      const envPath = join(REPO_ROOT, '.env');
      appendFileSync(envPath, `\nBLOG_WEBHOOK_SECRET=${webhookSecret}\n`);
      log('Generated and saved BLOG_WEBHOOK_SECRET to .env (reused across all clients)');
    } catch {
      warn(`Add this to your .env to reuse across clients:\nBLOG_WEBHOOK_SECRET=${webhookSecret}`);
    }
  }

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

  // ── 5. Create project (skip if --ref provided) ───────────────────────────
  let ref = getArg('--ref');
  if (ref) {
    log(`Resuming with existing project ref: ${ref}`);
  } else {
    const dbPass = randomBytes(20).toString('base64url');
    step(`Creating Supabase project "${name}" (${slug})`);
    const project = await api(token, 'POST', '/v1/projects', {
      name,
      organization_id: orgId,
      plan: 'free',
      region,
      db_pass: dbPass,
    });
    ref = project.id;
    log(`Project created — ref: ${ref}`);
  }

  // ── 6. Wait for project to be healthy ────────────────────────────────────
  step('Waiting for project to be ready (this can take 2–3 minutes on free tier)');
  for (let i = 0; i < 36; i++) {
    await sleep(5000);
    const p = await api(token, 'GET', `/v1/projects/${ref}`);
    process.stdout.write('.');
    if (p.status === 'ACTIVE_HEALTHY') {
      console.log('');
      log('Project is ready');
      break;
    }
    if (i === 35) die(`Project did not become healthy in time.\nResume once it's ready:\n  node scripts/setup-new-client.mjs --slug ${slug} --name "${name}" --url "${siteUrl}" --ref ${ref}`);
  }

  // Give the DB a few more seconds before running SQL
  await sleep(3000);

  // ── 7. Run schema ─────────────────────────────────────────────────────────
  // Strip the seed INSERT statements — the script handles seeding separately,
  // and the schema's partial-index ON CONFLICT target fails via the API.
  step('Running client template schema');
  const schemaPath = join(REPO_ROOT, 'apps/client-template/supabase/client-template-schema.sql');
  let schemaSql = readFileSync(schemaPath, 'utf8');
  // Remove all INSERT blocks (they start with "insert into public.")
  schemaSql = schemaSql.replace(/\ninsert into public\.[\s\S]*?on conflict[\s\S]*?;\n/gi, '\n');
  await runSQL(token, ref, schemaSql);
  log('Schema applied');

  // ── 8. Seed brand_settings ────────────────────────────────────────────────
  step('Seeding brand_settings');
  await runSQL(token, ref, `
    insert into public.brand_settings (
      site_key, site_name, site_url, image_bucket, image_folder,
      image_style_prompt, image_negative_prompt
    ) values (
      '${slug}',
      '${name.replace(/'/g, "''")}',
      '${siteUrl}',
      'site-assets',
      'blog-featured',
      'Create a clean, professional editorial blog featured image aligned with the brand. Use a consistent color palette, calm composition, premium lighting, and visually relevant imagery.',
      'No logos, no watermarks, no distorted text, no cluttered layouts.'
    )
    on conflict (site_key) where site_key is not null
    do update set
      site_name  = excluded.site_name,
      site_url   = excluded.site_url,
      image_bucket = excluded.image_bucket,
      image_folder = excluded.image_folder,
      updated_at = now();
  `);
  log('brand_settings seeded');

  // ── 9. Seed blog_categories ───────────────────────────────────────────────
  step('Seeding blog_categories');
  await runSQL(token, ref, `
    insert into public.blog_categories (site_id, name, slug, sort_order)
    values
      ('${slug}', 'Company News',  'company-news', 10),
      ('${slug}', 'Education',     'education',    20),
      ('${slug}', 'Resources',     'resources',    30),
      ('${slug}', 'Guides',        'guides',       40)
    on conflict (site_id, slug) do update set
      name       = excluded.name,
      sort_order = excluded.sort_order,
      is_active  = true,
      updated_at = now();
  `);
  log('blog_categories seeded');

  // ── 10. Create storage bucket via project Storage API ────────────────────
  step('Creating site-assets storage bucket');
  const apiKeys = await api(token, 'GET', `/v1/projects/${ref}/api-keys`);
  const serviceRoleKey = apiKeys.find(k => k.name === 'service_role')?.api_key;
  if (!serviceRoleKey) die('Could not retrieve service_role key for project.');

  // Retry up to 10 times — Storage service may still be initializing
  let bucketDone = false;
  for (let attempt = 1; attempt <= 10; attempt++) {
    const bucketRes = await fetch(`https://${ref}.supabase.co/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'site-assets', name: 'site-assets', public: true }),
    });
    const body = await bucketRes.text();
    if (bucketRes.ok || bucketRes.status === 409 || body.includes('409') || body.includes('Duplicate') || body.includes('already exists')) {
      bucketDone = true;
      break;
    }
    if (body.includes('TenantNotFound') || body.includes('not found')) {
      process.stdout.write(attempt === 1 ? '\n  Storage service still initializing' : '.');
      await sleep(6000);
    } else {
      die(`Storage bucket creation failed (${bucketRes.status}): ${body}`);
    }
  }
  if (!bucketDone) die(`Storage service did not initialize in time.\nCreate the bucket manually in the Supabase dashboard:\n  Project → Storage → New bucket → "site-assets" (public)`);
  console.log('');
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
  step('Setting edge function secrets');
  const supabaseUrl = `https://${ref}.supabase.co`;
  // Get service role key for the SUPABASE_SERVICE_ROLE_KEY secret
  const allKeys = await api(token, 'GET', `/v1/projects/${ref}/api-keys`);
  const serviceRoleKey = allKeys.find(k => k.name === 'service_role')?.api_key;

  const secretParts = [
    `SUPABASE_URL=${supabaseUrl}`,
    `BLOG_IMAGE_BUCKET=site-assets`,
    `BLOG_IMAGE_FOLDER=blog-featured`,
  ];
  if (serviceRoleKey)  secretParts.push(`SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`);
  if (openrouterKey)   secretParts.push(`OPENROUTER_API_KEY=${openrouterKey}`);
  if (openaiKey)       secretParts.push(`OPENAI_API_KEY=${openaiKey}`);

  if (webhookSecret)   secretParts.push(`BLOG_WEBHOOK_SECRET=${webhookSecret}`);
  if (!openrouterKey) warn('OPENROUTER_API_KEY missing from .env — add it and re-run with --ref to set it.');
  if (!openaiKey)     warn('OPENAI_API_KEY missing from .env — add it and re-run with --ref to set it.');

  try {
    execSync(
      `supabase secrets set ${secretParts.join(' ')} --project-ref ${ref}`,
      { cwd: REPO_ROOT, stdio: 'inherit' }
    );
    log('Secrets set');
  } catch {
    warn('Could not set secrets via CLI — set them manually in the Supabase dashboard.');
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
