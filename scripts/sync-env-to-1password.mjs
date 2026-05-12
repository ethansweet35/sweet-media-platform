#!/usr/bin/env node
/**
 * Sweet Media Platform — Sync env files to 1Password
 *
 * Run after manually editing any .env file to keep 1Password in sync.
 *
 * Usage:
 *   pnpm sync-env                        # sync all env files
 *   pnpm sync-env --brand northbound-treatment  # sync one brand
 *   pnpm sync-env --file .env            # sync root .env only
 *
 * Requires: 1Password CLI (brew install 1password-cli) + op signin
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const OP_VAULT  = 'Sweet Media Platform';

const ALL_BRANDS = [
  'sweet-media',
  'northbound-treatment',
  'inner-peak-colorado',
  'addiction-interventions',
  'cipher-billing',
  'rize-oc',
];

function log(msg)  { console.log(`✅  ${msg}`); }
function step(msg) { console.log(`⏳  ${msg}...`); }
function warn(msg) { console.log(`⚠️   ${msg}`); }
function die(msg)  { console.error(`❌  ${msg}`); process.exit(1); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] ?? null : null;
}

function opUpsert(filePath, title) {
  if (!existsSync(filePath)) {
    warn(`Skipping "${title}" — file not found: ${filePath}`);
    return;
  }
  step(`Syncing "${title}"`);
  try {
    const listOutput = execSync(
      `op document list --vault "${OP_VAULT}" --format json`,
      { stdio: 'pipe' }
    ).toString();
    const items = JSON.parse(listOutput);
    const existing = items.find(i => i.title === title);
    if (existing) {
      execSync(`op document edit "${existing.id}" "${filePath}" --vault "${OP_VAULT}"`, { stdio: 'pipe' });
    } else {
      execSync(`op document create "${filePath}" --title "${title}" --vault "${OP_VAULT}"`, { stdio: 'pipe' });
    }
    log(`"${title}" synced`);
  } catch (err) {
    warn(`Failed to sync "${title}": ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function main() {
  console.log('\n🔐  Sweet Media Platform — Sync env → 1Password\n');

  // Check op is available
  try {
    execSync('op --version', { stdio: 'pipe' });
  } catch {
    die('1Password CLI not found.\n  Install: brew install 1password-cli\n  Then: op signin');
  }
  try {
    execSync('op account list', { stdio: 'pipe' });
  } catch {
    die('Not signed into 1Password.\n  Run: op signin');
  }

  const brandArg = getArg('--brand');
  const fileArg  = getArg('--file');

  // Single file mode
  if (fileArg === '.env') {
    opUpsert(join(REPO_ROOT, '.env'), 'platform — root .env');
    return;
  }

  // Root .env
  if (!brandArg) {
    opUpsert(join(REPO_ROOT, '.env'), 'platform — root .env');
  }

  // Brand files
  const brands = brandArg ? [brandArg] : ALL_BRANDS;
  for (const slug of brands) {
    opUpsert(join(REPO_ROOT, 'apps', slug, '.env.local'),  `${slug} — .env.local`);
    opUpsert(join(REPO_ROOT, 'apps', slug, '.upload.env'), `${slug} — .upload.env`);
  }

  console.log('\n✅  Sync complete\n');
}

main().catch(err => { console.error(err); process.exit(1); });
