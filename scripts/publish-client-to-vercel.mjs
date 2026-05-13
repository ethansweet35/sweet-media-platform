#!/usr/bin/env node
/**
 * Sweet Media — Publish Client App to Vercel
 *
 * Creates (or updates) a Vercel project linked to this GitHub monorepo,
 * sets all required env vars, and triggers a production deployment.
 *
 * Usage:
 *   node scripts/publish-client-to-vercel.mjs \
 *     --slug  cipher-billing \
 *     --name  "Cipher Billing" \
 *     --domain cipherbilling.com
 *
 * Prerequisites:
 *   Add to repo-root .env:
 *     VERCEL_TOKEN=<your Vercel API token>      → vercel.com/account/tokens
 *     VERCEL_TEAM_ID=<team_xxx...>              → optional; omit for personal account
 *     GITHUB_REPO=ethansweet/sweet-media-platform  → owner/repo
 *
 * Env vars pushed to Vercel production come from:
 *   apps/<slug>/.env.local  (written by scaffold-client-app.mjs)
 *   Plus any secrets in repo-root .env: SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
 *
 * Flags:
 *   --update-env    Re-push env vars to an existing project (upsert)
 *   --redeploy      Trigger a new production deployment after env update
 *   --skip-deploy   Create project + set env but do NOT trigger a deploy
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const VERCEL_API = 'https://api.vercel.com';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  readFileSync(filePath, 'utf8').split('\n').forEach((line) => {
    // Strip inline comments (# ...) that appear after the value
    const withoutComment = line.replace(/\s+#.*$/, '');
    const trimmed = withoutComment.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq < 0) return;
    const k = trimmed.slice(0, eq).trim();
    // Preserve everything after = (including spaces) but strip surrounding quotes
    let v = trimmed.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k) out[k] = v;
  });
  return out;
}

async function vercelApi(token, teamId, method, path, body) {
  const url = `${VERCEL_API}${path}${teamId ? `?teamId=${teamId}` : ''}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }
  return { ok: res.ok, status: res.status, json, text };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Sweet Media — Publish Client to Vercel\n');

  const rootEnv  = loadEnvFile(join(REPO_ROOT, '.env'));
  const token    = process.env.VERCEL_TOKEN || rootEnv.VERCEL_TOKEN;
  const teamId   = process.env.VERCEL_TEAM_ID || rootEnv.VERCEL_TEAM_ID || null;
  const ghRepo   = process.env.GITHUB_REPO || rootEnv.GITHUB_REPO;

  if (!token)  die('VERCEL_TOKEN not found in .env. Create one at vercel.com/account/tokens');
  if (!ghRepo) die('GITHUB_REPO not found in .env. Format: owner/repo (e.g. ethansweet/sweet-media-platform)');

  const slug   = getArg('--slug')   || die('--slug required');
  const name   = getArg('--name')   || die('--name required');
  const domain = getArg('--domain') || null;
  // Vercel project name; defaults to slug. Use --project when the brand's
  // Vercel project name differs from its slug (e.g. sweet-media-platform).
  const projectName = getArg('--project') || slug;

  const appDir    = join(REPO_ROOT, 'apps', slug);
  const envLocal  = join(appDir, '.env.local');

  if (!existsSync(appDir))  die(`apps/${slug} does not exist. Run: pnpm new-client --slug ${slug} first.`);
  if (!existsSync(envLocal)) warn(`.env.local not found at apps/${slug}/.env.local — env vars will be incomplete.`);

  // ── Collect env vars ───────────────────────────────────────────────────────
  const localEnv = loadEnvFile(envLocal);

  const PUBLIC_VARS = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SITE_ID',
    'NEXT_PUBLIC_SITE_URL',
  ];

  const SECRET_VARS = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY',
    'CONTACT_TO_EMAIL',
    'CONTACT_FROM_EMAIL',
    'CONTACT_BRAND_NAME',
    'OPENROUTER_API_KEY',
    'OPENAI_API_KEY',
    'SEMRUSH_API_KEY',
    'DATAFORSEO_LOGIN',
    'DATAFORSEO_PASSWORD',
    'FIRECRAWL_API_KEY',
    'GOOGLE_NLP_API_KEY',
  ];

  // Shared platform secrets live in repo-root .env; per-brand values stay in apps/<slug>/.env.local.
  const ROOT_SHARED_SECRETS = new Set([
    'OPENROUTER_API_KEY',
    'OPENAI_API_KEY',
    'SEMRUSH_API_KEY',
    'DATAFORSEO_LOGIN',
    'DATAFORSEO_PASSWORD',
    'FIRECRAWL_API_KEY',
    'GOOGLE_NLP_API_KEY',
  ]);

  const resolve = (key) => {
    if (ROOT_SHARED_SECRETS.has(key)) {
      return rootEnv[key] || process.env[key] || localEnv[key];
    }
    return localEnv[key] || rootEnv[key] || process.env[key];
  };

  const envPayload = [];

  for (const key of PUBLIC_VARS) {
    const value = resolve(key);
    if (!value) { warn(`Missing ${key} — skipping`); continue; }
    envPayload.push({ key, value, target: ['production', 'preview', 'development'], type: 'plain' });
  }

  for (const key of SECRET_VARS) {
    const value = resolve(key);
    if (!value) { warn(`Missing secret ${key} — skipping`); continue; }
    envPayload.push({ key, value, target: ['production', 'preview'], type: 'encrypted' });
  }

  if (envPayload.length === 0) die('No env vars collected — aborting.');

  // ── Check if project already exists ───────────────────────────────────────
  step(`Checking if Vercel project "${projectName}" already exists`);
  const existCheck = await vercelApi(token, teamId, 'GET', `/v9/projects/${projectName}`);
  const projectExists = existCheck.ok && existCheck.json?.id;
  let projectId = existCheck.json?.id || null;

  if (projectExists) {
    log(`Project already exists (id: ${projectId})`);

    if (hasFlag('--update-env') || hasFlag('--redeploy')) {
      step('Upserting environment variables');
      let envFailed = 0;
      for (const envVar of envPayload) {
        const envRes = await vercelApi(
          token, teamId, 'POST',
          `/v10/projects/${projectName}/env?upsert=true`,
          envVar,
        );
        if (!envRes.ok) envFailed++;
      }
      if (envFailed > 0) {
        warn(`${envFailed} env var(s) failed to upsert — check Vercel dashboard → Settings → Environment Variables`);
      } else {
        log('Environment variables updated');
      }
    } else {
      log('Project exists — pass --update-env to re-push env vars, --redeploy to trigger deploy.');
    }
  } else {
    // ── Create new project ─────────────────────────────────────────────────
    step(`Creating Vercel project "${name}" (${projectName})`);

    const createBody = {
      name: projectName,
      framework: 'nextjs',
      rootDirectory: `apps/${slug}`,
      // Required for pnpm monorepo: Vercel must read package.json from repo root
      // but build from rootDirectory. sourceFilesOutsideRootDirectory allows that.
      buildCommand: `pnpm --filter @sweetmedia/${slug} build`,
      installCommand: 'pnpm install',
      gitRepository: {
        type: 'github',
        repo: ghRepo,
      },
      environmentVariables: envPayload,
    };

    const createRes = await vercelApi(token, teamId, 'POST', '/v11/projects', createBody);

    if (!createRes.ok) {
      die(
        `Failed to create project (${createRes.status}):\n${createRes.text.slice(0, 600)}\n\n` +
        'Common fixes:\n' +
        '  1. Verify the Vercel GitHub App is installed on your GitHub account/org.\n' +
        '  2. Verify GITHUB_REPO matches exactly (owner/repo).\n' +
        '  3. Check VERCEL_TOKEN has sufficient scope.'
      );
    }

    projectId = createRes.json?.id;
    log(`Project created (id: ${projectId})`);
  }

  // ── Add custom domain ──────────────────────────────────────────────────────
  if (domain && projectId && !projectExists) {
    step(`Adding domain: ${domain}`);
    const domRes = await vercelApi(
      token, teamId, 'POST',
      `/v10/projects/${projectName}/domains`,
      { name: domain },
    );
    if (!domRes.ok) {
      warn(`Domain add returned ${domRes.status} — add it manually in Vercel dashboard.`);
    } else {
      log(`Domain ${domain} added to project`);
    }
  }

  // ── Trigger deployment ─────────────────────────────────────────────────────
  if (!hasFlag('--skip-deploy')) {
    step('Triggering production deployment');

    // Fetch the repoId from the newly created (or existing) project link
    let repoId = null;
    try {
      const projRes = await vercelApi(token, teamId, 'GET', `/v9/projects/${projectName}`);
      repoId = projRes.json?.link?.repoId ?? null;
    } catch { /* ignore */ }

    const deployBody = {
      name: projectName,
      gitSource: {
        type: 'github',
        repo: ghRepo.split('/')[1],
        org: ghRepo.split('/')[0],
        ref: 'main',
        ...(repoId ? { repoId: String(repoId) } : {}),
      },
      target: 'production',
    };
    const deployRes = await vercelApi(token, teamId, 'POST', '/v13/deployments', deployBody);
    if (!deployRes.ok) {
      warn(
        `Deploy trigger returned ${deployRes.status} — push to main branch to deploy, or trigger manually.\n` +
        deployRes.text.slice(0, 300),
      );
    } else {
      const deployUrl = deployRes.json?.url ? `https://${deployRes.json.url}` : 'check Vercel dashboard';
      log(`Deployment triggered → ${deployUrl}`);
    }
  } else {
    log('Skipping deploy (--skip-deploy)');
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  ${name} → Vercel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project   : ${slug}
Dashboard : https://vercel.com/dashboard${teamId ? '' : ''}
${domain ? `Domain    : https://${domain} (DNS still needed — see below)` : ''}

${domain ? `─── DNS (add at your registrar / Cloudflare) ────────
  CNAME  ${domain}  →  cname.vercel-dns.com
  or
  A      ${domain}  →  76.76.21.21
` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch((err) => { console.error(err); process.exit(1); });
