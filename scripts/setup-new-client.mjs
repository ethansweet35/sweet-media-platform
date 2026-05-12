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
 *   --admin-email  Seed the admin_users table AND create Supabase Auth user (required for admin login)
 *   --no-scaffold      Do not copy apps/client-template → apps/<slug> or write .env.local
 *   --force-scaffold   Replace existing apps/<slug> when scaffolding (destructive)
 *   --no-brand-replace Pass through to scaffold (skip Client Brand → --name replacements)
 *   --skip-pnpm        Skip `pnpm install` at repo root after scaffold
 *
 * Prerequisites:
 *   - Run `supabase login` once before using this script
 *   - Add the shared platform keys to repo-root .env (used across all brands):
 *       SUPABASE_ACCESS_TOKEN, OPENROUTER_API_KEY, OPENAI_API_KEY,
 *       BLOG_WEBHOOK_SECRET (auto-generated if missing),
 *       GOOGLE_INDEXING_CLIENT_EMAIL, GOOGLE_INDEXING_PRIVATE_KEY,
 *       VERCEL_TOKEN, GITHUB_REPO, SURFER_API_KEY
 *
 * After this script:
 *   - Run `node scripts/publish-client-to-vercel.mjs --slug <slug> --name "<name>"
 *     [--project <vercel-project-name>] [--domain <example.com>]` to create the
 *     Vercel project, push env vars (including contact + shared root secrets),
 *     and trigger the first deploy.
 */

import { readFileSync, existsSync, appendFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { randomBytes } from 'crypto';
import { tmpdir } from 'os';
import * as readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const MGMT = 'https://api.supabase.com';

// ─── Standing Team Members ────────────────────────────────────────────────────
// These developers are auto-invited to every new Supabase org on provisioning.
// Add/remove entries here to update who gets access to all future client projects.
const STANDING_TEAM_MEMBERS = [
  { email: 'jake@sweetmediaservices.com', role: 'developer', github: 'jakechampion88' },
  { email: 'sean@sweetmediaservices.com', role: 'developer', github: 'Maverick0114' },
];

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

function hasFlag(flag) {
  return process.argv.includes(flag);
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
  const googleClientEmail = envVars.GOOGLE_INDEXING_CLIENT_EMAIL || process.env.GOOGLE_INDEXING_CLIENT_EMAIL || null;
  const googlePrivateKey  = envVars.GOOGLE_INDEXING_PRIVATE_KEY  || process.env.GOOGLE_INDEXING_PRIVATE_KEY  || null;

  if (!openrouterKey) warn('OPENROUTER_API_KEY not found in .env — add it for edge function secrets.');
  if (!openaiKey)     warn('OPENAI_API_KEY not found in .env — add it for edge function secrets.');
  if (!googleClientEmail || !googlePrivateKey) {
    warn(
      'Google indexing credentials not found in .env.\n' +
      '  Add these to your repo-root .env file, then re-run with --ref to push them:\n' +
      '    GOOGLE_INDEXING_CLIENT_EMAIL=<service-account-email from JSON key>\n' +
      '    GOOGLE_INDEXING_PRIVATE_KEY=<private_key from JSON key (full PEM including \\n escapes)>'
    );
  }

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

  // ── 4b. Remind about standing team member access ─────────────────────────
  // Supabase Management API does not expose an org invite endpoint.
  // Team members must be invited manually via the dashboard (one-time per org).
  if (STANDING_TEAM_MEMBERS.length > 0) {
    const memberList = STANDING_TEAM_MEMBERS.map(m => `    • ${m.email} (${m.role}) — github: ${m.github || 'n/a'}`).join('\n');
    warn(
      `Standing team members must be invited manually to the Supabase org:\n${memberList}\n` +
      `  → supabase.com/dashboard/org/${orgId}/members\n` +
      `  (Only needed once per org — already done if this org was previously provisioned.)`
    );
  }

  // ── 5. Create project (skip if --ref provided) ───────────────────────────
  let ref = getArg('--ref');
  const isExistingProject = !!ref;
  if (ref) {
    log(`Updating existing project ref: ${ref} — skipping schema/seed/storage, running secrets + functions only`);
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

  if (!isExistingProject) {
    // ── 6. Wait for project to be healthy ──────────────────────────────────
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
  }

  // ── 7–11. Schema, seed, storage (new projects only) ──────────────────────
  if (!isExistingProject) {
    // ── 7. Run schema ───────────────────────────────────────────────────────
    step('Running client template schema');
    const schemaPath = join(REPO_ROOT, 'apps/client-template/supabase/client-template-schema.sql');
    let schemaSql = readFileSync(schemaPath, 'utf8');
    schemaSql = schemaSql.replace(/\ninsert into public\.[\s\S]*?on conflict[\s\S]*?;\n/gi, '\n');
    await runSQL(token, ref, schemaSql);
    log('Schema applied');

    // ── 8. Seed brand_settings ──────────────────────────────────────────────
    step('Seeding brand_settings');
    const safeName = name.replace(/'/g, "''");
    await runSQL(token, ref, `
      insert into public.brand_settings (
        site_key, site_name, site_url,
        author_name, author_title, author_bio,
        tone, audience,
        cta_heading, cta_body, cta_button_label, cta_button_url,
        image_bucket, image_folder,
        image_style_prompt, image_negative_prompt
      ) values (
        '${slug}',
        '${safeName}',
        '${siteUrl}',
        '${safeName}',
        'Editorial Team',
        'Helpful educational resources from ${safeName}.',
        'clear, trustworthy, professional, warm, conversion-focused',
        'prospective clients and their families seeking services',
        'Ready to get started?',
        'Contact our team today to learn more.',
        'Contact Us',
        '/contact-us',
        'site-assets',
        'images',
        'Create a clean, professional editorial blog featured image for ${safeName}. Use a consistent brand color palette, calm composition, premium lighting, and visually relevant imagery that reflects the services offered.',
        'No logos, no watermarks, no distorted text, no cluttered layouts.'
      )
      on conflict (site_key) where site_key is not null
      do update set
        site_name   = excluded.site_name,
        site_url    = excluded.site_url,
        author_name = excluded.author_name,
        author_title = excluded.author_title,
        author_bio  = excluded.author_bio,
        tone        = excluded.tone,
        audience    = excluded.audience,
        cta_heading = excluded.cta_heading,
        cta_body    = excluded.cta_body,
        cta_button_label = excluded.cta_button_label,
        cta_button_url   = excluded.cta_button_url,
        image_bucket = excluded.image_bucket,
        image_folder = excluded.image_folder,
        image_style_prompt = excluded.image_style_prompt,
        image_negative_prompt = excluded.image_negative_prompt,
        updated_at  = now();
    `);
    log('brand_settings seeded');

    // ── 9. Seed blog_categories ─────────────────────────────────────────────
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

    // ── 10. Create storage bucket ───────────────────────────────────────────
    step('Creating site-assets storage bucket');
    const apiKeys = await api(token, 'GET', `/v1/projects/${ref}/api-keys`);
    const serviceRoleKey = apiKeys.find(k => k.name === 'service_role')?.api_key;
    if (!serviceRoleKey) die('Could not retrieve service_role key for project.');

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

    // ── 11. Seed admin user + create Supabase Auth user (optional) ──────────
    if (adminEmail) {
      step(`Seeding admin user: ${adminEmail}`);
      await runSQL(token, ref, `
        insert into public.admin_users (email, role)
        values ('${adminEmail.replace(/'/g, "''")}', 'admin')
        on conflict (email) do update set role = excluded.role;
      `);
      log(`admin_users seeded with ${adminEmail}`);

      // Create Supabase Auth user so the email/password login works immediately
      step(`Creating Supabase Auth user: ${adminEmail}`);
      const tempPassword = 'ChangeMe123!';
      try {
        const apiKeys = await api(token, 'GET', `/v1/projects/${ref}/api-keys`);
        const serviceKey = apiKeys.find(k => k.name === 'service_role')?.api_key;
        if (serviceKey) {
          const authRes = await fetch(`https://${ref}.supabase.co/auth/v1/admin/users`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${serviceKey}`,
              'apikey': serviceKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: adminEmail,
              password: tempPassword,
              email_confirm: true,
            }),
          });
          const authJson = await authRes.json();
          if (authJson.id) {
            log(`Auth user created for ${adminEmail} (temp password: ${tempPassword})`);
          } else if (authJson.msg?.includes('already') || authJson.code === 'email_exists') {
            log(`Auth user already exists for ${adminEmail}`);
          } else {
            warn(`Auth user creation returned: ${JSON.stringify(authJson).slice(0, 200)}`);
          }
        } else {
          warn('Could not retrieve service_role key — create Auth user manually in Supabase dashboard.');
        }
      } catch (err) {
        warn(`Auth user creation failed: ${err.message}\nCreate manually in Supabase dashboard → Authentication → Users`);
      }
    } else {
      warn('No --admin-email provided — add one to enable admin login:\n  node scripts/setup-new-client.mjs --ref ' + ref + ' --admin-email you@email.com');
    }
  }

  // ── 12. Edge function secrets ─────────────────────────────────────────────
  step('Setting edge function secrets');
  const supabaseUrl = `https://${ref}.supabase.co`;

  // Note: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-injected by Supabase at runtime
  // and cannot be set manually — the CLI will skip them if included.
  const secretParts = [
    `BLOG_IMAGE_BUCKET=site-assets`,
    `BLOG_IMAGE_FOLDER=blog-featured`,
  ];
  if (openrouterKey)     secretParts.push(`OPENROUTER_API_KEY=${openrouterKey}`);
  if (openaiKey)         secretParts.push(`OPENAI_API_KEY=${openaiKey}`);
  if (googleClientEmail) secretParts.push(`GOOGLE_INDEXING_CLIENT_EMAIL=${googleClientEmail}`);
  if (googlePrivateKey)  secretParts.push(`GOOGLE_INDEXING_PRIVATE_KEY=${googlePrivateKey}`);
  if (webhookSecret)     secretParts.push(`BLOG_WEBHOOK_SECRET=${webhookSecret}`);

  if (!openrouterKey) warn('OPENROUTER_API_KEY missing from .env — add it and re-run with --ref to set it.');
  if (!openaiKey)     warn('OPENAI_API_KEY missing from .env — add it and re-run with --ref to set it.');

  // Write secrets to a temp file so values with spaces/newlines (e.g. PEM keys) are handled safely
  const tmpFile = join(tmpdir(), `supabase-secrets-${ref}.env`);
  try {
    writeFileSync(tmpFile, secretParts.join('\n') + '\n', 'utf8');
    execSync(
      `supabase secrets set --env-file "${tmpFile}" --project-ref ${ref}`,
      { cwd: REPO_ROOT, stdio: 'inherit' }
    );
    log('Secrets set');
  } catch {
    warn('Could not set secrets via CLI — set them manually in the Supabase dashboard.');
  } finally {
    try { unlinkSync(tmpFile); } catch { /* ignore cleanup errors */ }
  }

  // ── 13. Deploy edge functions ─────────────────────────────────────────────
  const functions = [
    'generate-blog-post',
    'generate-blog-image',
    'ping-google-indexing',
    'inspect-google-indexing',
  ];
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
  const scaffoldMod = await import('./scaffold-client-app.mjs');
  let anon_key = null;
  try {
    const rawKeys = await api(token, 'GET', `/v1/projects/${ref}/api-keys`);
    const keys = scaffoldMod.parseApiKeysResponse(rawKeys);
    anon_key =
      keys.find((k) => k.name === 'anon')?.api_key ??
      keys.find((k) => String(k.name || '').toLowerCase().includes('anon'))?.api_key ??
      null;
  } catch {
    anon_key = null;
  }
  if (!anon_key) {
    warn(
      'Could not fetch anon/public API key automatically.\n' +
        '  Copy it from Dashboard → Project Settings → API into apps/<slug>/.env.local after scaffold.',
    );
    anon_key = '← paste NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from Supabase Dashboard → API';
  } else {
    // Validate the anon key belongs to this project ref (catches copy-paste errors)
    try {
      const payloadB64 = anon_key.split('.')[1];
      if (payloadB64) {
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
        if (payload.ref && payload.ref !== ref) {
          warn(`⚠️  Anon key ref "${payload.ref}" does not match project ref "${ref}". Double-check you have the right key.`);
        }
      }
    } catch { /* ignore parse errors */ }
  }

  // ── 14b. Scaffold Next app from client-template ─────────────────────────────
  const appDir = join(REPO_ROOT, 'apps', slug);
  const anonLooksValid = typeof anon_key === 'string' && !anon_key.includes('←');
  if (!hasFlag('--no-scaffold') && anonLooksValid) {
    if (!existsSync(appDir) || hasFlag('--force-scaffold')) {
      step(`Scaffolding apps/${slug} from client-template`);
      try {
        await scaffoldMod.runScaffold({
          slug,
          displayName: name,
          siteUrl,
          supabaseRef: ref,
          anonKey: anon_key,
          force: hasFlag('--force-scaffold'),
          brandReplace: !hasFlag('--no-brand-replace'),
        });
        log(`Next.js app created at apps/${slug} with .env.local`);

        if (!hasFlag('--skip-pnpm')) {
          step('pnpm install (monorepo root)');
          try {
            execSync('pnpm install', { cwd: REPO_ROOT, stdio: 'inherit' });
            log('pnpm install completed');
          } catch {
            warn('pnpm install failed — run from repo root: pnpm install');
          }
        }
      } catch (err) {
        warn(`Scaffold failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      warn(
        `apps/${slug} already exists — skipped scaffold.\n` +
          `  Delete the folder or re-run with --force-scaffold to replace it.`,
      );
    }
  } else if (hasFlag('--no-scaffold')) {
    log('Skipping scaffold (--no-scaffold)');
  }

  // ── 15. Done — print summary ──────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  ${name} is ready!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project ref : ${ref}
Dashboard   : https://supabase.com/dashboard/project/${ref}

─── Env (also written to apps/${slug}/.env.local if scaffold ran) ─────────

NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${anon_key}
NEXT_PUBLIC_SITE_ID=${slug}
NEXT_PUBLIC_SITE_URL=${siteUrl.replace(/\/$/, '')}
CONTACT_TO_EMAIL=hello@<apex-domain>           # set per brand
CONTACT_FROM_EMAIL=${name} <no-reply@<apex>>   # set per brand (Resend domain must be verified)
CONTACT_BRAND_NAME=${name}

(Shared platform secrets — pulled from repo-root .env on Vercel publish:
   OPENROUTER_API_KEY, SURFER_API_KEY)

─── Next steps ──────────────────────────────────────

1. Dev: pnpm --filter @sweetmedia/${slug} dev
2. Build: pnpm --filter @sweetmedia/${slug} build
3. Vercel: node scripts/publish-client-to-vercel.mjs --slug ${slug} --name "${name.replace(/"/g, '\\"')}" --domain <apex-domain>
   (Adds optional --project <vercel-project-name> if the brand's Vercel project name differs from its slug.)
${existsSync(appDir) ? '' : `4. Scaffold was skipped — run manually:\n   node scripts/scaffold-client-app.mjs --slug ${slug} --name "${name.replace(/"/g, '\\"')}" --url ${siteUrl} --ref ${ref} --anon-key "<anon_key>"\n`}
${adminEmail
  ? `• Admin login ready: ${adminEmail} / ChangeMe123! → change password after first login`
  : '• No admin email set — re-run with --admin-email to create admin access'
}
─── Team access ─────────────────────────────────────
${STANDING_TEAM_MEMBERS.map(m => `• Supabase org invite MANUAL REQUIRED → ${m.email} at supabase.com/dashboard/org/${orgId}/members`).join('\n')}
• Vercel: add team members manually at vercel.com/teams → Members
  (run \`vercel env pull .env.local\` from any app dir once they have access)
• GitHub: add collaborators manually at github.com/ethansweet35/sweet-media-platform/settings/access

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => { console.error(err); process.exit(1); });
