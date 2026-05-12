#!/usr/bin/env node
/**
 * Sweet Media Platform — Developer Machine Setup
 *
 * Run this once on a new machine (or after deleting local env files) to pull
 * all secrets from 1Password and Vercel into the correct local paths.
 *
 * Usage:
 *   node scripts/dev-setup.mjs
 *   node scripts/dev-setup.mjs --brands northbound-treatment,cipher-billing
 *   node scripts/dev-setup.mjs --skip-vercel   # 1Password only
 *   node scripts/dev-setup.mjs --skip-1password # Vercel only
 *
 * Prerequisites:
 *   1. Vercel team access  → vercel.com/teams (ask Ethan to invite you)
 *   2. 1Password vault access → "Sweet Media Platform" vault (ask Ethan)
 *   3. Install tools:
 *        npm i -g vercel
 *        brew install 1password-cli
 *   4. Sign in:
 *        vercel login
 *        op signin
 *
 * What this script does:
 *   1. Pulls repo-root .env from 1Password ("platform — root .env")
 *   2. For each brand: pulls .env.local via `vercel env pull`
 *   3. For each brand: pulls .upload.env from 1Password ("<slug> — .upload.env")
 *
 * Vercel project name mapping (for brands whose Vercel project name ≠ slug):
 *   sweet-media           → sweet-media-platform
 *   inner-peak-colorado   → inner-peak-colorado-platform
 */

import { execSync, spawnSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const OP_VAULT = 'Sweet Media Platform';

// All active brands in the monorepo
const ALL_BRANDS = [
  'sweet-media',
  'northbound-treatment',
  'inner-peak-colorado',
  'addiction-interventions',
  'cipher-billing',
  'rize-oc',
];

// Brands whose Vercel project name differs from the app slug
const VERCEL_PROJECT_NAMES = {
  'sweet-media':         'sweet-media-platform',
  'inner-peak-colorado': 'inner-peak-colorado-platform',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }
function info(msg) { console.log(`     ${msg}`); }

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] ?? null : null;
}

function checkTool(cmd, installHint) {
  try {
    execSync(`${cmd} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    warn(`"${cmd}" not found.\n  ${installHint}`);
    return false;
  }
}

function run(cmd, cwd = REPO_ROOT) {
  const result = spawnSync(cmd, { shell: true, cwd, stdio: 'pipe', encoding: 'utf8' });
  return {
    ok:     result.status === 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Sweet Media Platform — Developer Setup\n');
  console.log('     This script pulls secrets from 1Password and Vercel');
  console.log('     into the correct local file paths.\n');

  const skip1password = hasFlag('--skip-1password');
  const skipVercel    = hasFlag('--skip-vercel');

  // Determine which brands to set up
  const brandsArg = getArg('--brands');
  const brands = brandsArg
    ? brandsArg.split(',').map(b => b.trim()).filter(Boolean)
    : ALL_BRANDS;

  const invalidBrands = brands.filter(b => !ALL_BRANDS.includes(b));
  if (invalidBrands.length > 0) {
    die(`Unknown brand(s): ${invalidBrands.join(', ')}\nAvailable: ${ALL_BRANDS.join(', ')}`);
  }

  // ── Check required tools ──────────────────────────────────────────────────
  let opOk     = true;
  let vercelOk = true;

  if (!skip1password) {
    opOk = checkTool('op', 'brew install 1password-cli  →  then: op signin');
    if (!opOk) {
      info('Continuing without 1Password — use --skip-1password to suppress this warning.');
    }
  }

  if (!skipVercel) {
    vercelOk = checkTool('vercel', 'npm i -g vercel  →  then: vercel login');
    if (!vercelOk) {
      info('Continuing without Vercel — use --skip-vercel to suppress this warning.');
    }
  }

  // ── Step 1: Pull root .env from 1Password ─────────────────────────────────
  if (!skip1password && opOk) {
    const rootEnvPath = join(REPO_ROOT, '.env');
    step('Pulling root .env from 1Password');
    const result = run(`op document get "platform — root .env" --vault "${OP_VAULT}"`);
    if (result.ok && result.stdout.trim()) {
      writeFileSync(rootEnvPath, result.stdout, 'utf8');
      log('Root .env written');
    } else {
      warn(
        'Could not pull root .env from 1Password.\n' +
        '  Make sure you are signed in: op signin\n' +
        '  And that the item "platform — root .env" exists in the "Sweet Media Platform" vault.'
      );
    }
  } else if (!skip1password) {
    info('Skipping root .env pull (op not available).');
  } else {
    info('Skipping root .env pull (--skip-1password).');
  }

  // ── Step 2: Per-brand setup ───────────────────────────────────────────────
  for (const slug of brands) {
    console.log(`\n${'─'.repeat(52)}`);
    console.log(`  ${slug}`);
    console.log(`${'─'.repeat(52)}`);

    const appDir = join(REPO_ROOT, 'apps', slug);
    if (!existsSync(appDir)) {
      warn(`apps/${slug} does not exist — clone the repo first or scaffold this brand.`);
      continue;
    }

    // 2a. vercel env pull → .env.local
    if (!skipVercel && vercelOk) {
      const projectName = VERCEL_PROJECT_NAMES[slug] ?? slug;
      step(`Pulling .env.local for ${slug} via Vercel (project: ${projectName})`);

      // Link the project if not already linked
      const vercelDir = join(appDir, '.vercel');
      if (!existsSync(vercelDir)) {
        info(`Linking Vercel project "${projectName}"...`);
        const linkResult = run(`vercel link --project "${projectName}" --yes`, appDir);
        if (!linkResult.ok) {
          warn(
            `vercel link failed for ${slug}.\n` +
            `  Make sure you have Vercel team access and the project "${projectName}" exists.\n` +
            `  Error: ${linkResult.stderr.slice(0, 200)}`
          );
          continue;
        }
      }

      const pullResult = run('vercel env pull .env.local --environment development --yes', appDir);
      if (pullResult.ok) {
        log(`.env.local pulled for ${slug}`);
      } else {
        warn(
          `vercel env pull failed for ${slug}.\n` +
          `  Error: ${pullResult.stderr.slice(0, 200)}\n` +
          `  Try manually: cd apps/${slug} && vercel env pull`
        );
      }
    } else if (!skipVercel) {
      info(`Skipping vercel env pull for ${slug} (vercel CLI not available).`);
    } else {
      info(`Skipping vercel env pull for ${slug} (--skip-vercel).`);
    }

    // 2b. Pull .upload.env from 1Password
    if (!skip1password && opOk) {
      const uploadEnvPath = join(appDir, '.upload.env');
      const title = `${slug} — .upload.env`;
      step(`Pulling .upload.env for ${slug} from 1Password`);
      const result = run(`op document get "${title}" --vault "${OP_VAULT}"`);
      if (result.ok && result.stdout.trim()) {
        writeFileSync(uploadEnvPath, result.stdout, 'utf8');
        log(`.upload.env written for ${slug}`);
      } else {
        warn(
          `Could not pull "${title}" from 1Password.\n` +
          `  Make sure the item exists in the "Sweet Media Platform" vault.`
        );
      }
    } else if (!skip1password) {
      info(`Skipping .upload.env pull for ${slug} (op not available).`);
    } else {
      info(`Skipping .upload.env pull for ${slug} (--skip-1password).`);
    }
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log(`
${'━'.repeat(52)}
✅  Dev setup complete
${'━'.repeat(52)}

Files written:
  .env                        (root platform keys)
${brands.map(s => `  apps/${s}/.env.local`).join('\n')}
${brands.map(s => `  apps/${s}/.upload.env`).join('\n')}

Next:
  pnpm install                       (if not already done)
  pnpm --filter @sweetmedia/<slug> dev

${'━'.repeat(52)}
`);
}

main().catch(err => { console.error(err); process.exit(1); });
