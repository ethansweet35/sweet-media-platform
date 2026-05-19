#!/usr/bin/env node
/**
 * Sweet Media — Push Brand .env.local to 1Password
 *
 * Reads apps/<slug>/.env.local from disk and saves it as a document
 * in the "Sweet Media Platform" 1Password vault.
 *
 * Usage:
 *   node scripts/push-brand-env.mjs --slug simple-health
 *   node scripts/push-brand-env.mjs --slug rize-oc
 *
 * Or via pnpm (from repo root):
 *   pnpm env:push --slug <slug>
 *
 * Prerequisites:
 *   - 1Password CLI installed: brew install 1password-cli
 *   - Desktop app integration enabled: 1Password → Settings → Developer → Integrate with CLI
 *   - Access to the "Sweet Media Platform" vault
 */

import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const OP_VAULT  = 'Sweet Media Platform';

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

async function main() {
  const slug = getArg('--slug');
  if (!slug) die('--slug <slug> is required');

  // Check 1Password CLI
  try {
    execSync('op --version', { stdio: 'pipe' });
  } catch {
    die('1Password CLI not found. Install: brew install 1password-cli\nThen enable Desktop App integration in 1Password → Settings → Developer.');
  }

  const filesToPush = [
    { path: join(REPO_ROOT, 'apps', slug, '.env.local'),  title: `${slug} — .env.local`  },
    { path: join(REPO_ROOT, 'apps', slug, '.upload.env'), title: `${slug} — .upload.env` },
  ];

  let pushed = 0;

  for (const { path: filePath, title } of filesToPush) {
    if (!existsSync(filePath)) {
      warn(`Skipping "${title}" — file not found at ${filePath}`);
      continue;
    }

    step(`Saving "${title}" to 1Password vault "${OP_VAULT}"`);
    try {
      // Check if item already exists
      const listOutput = execSync(
        `op document list --vault "${OP_VAULT}" --format json`,
        { stdio: 'pipe' }
      ).toString();
      const items = JSON.parse(listOutput);
      const existing = items.find(i => i.title === title);

      if (existing) {
        execSync(
          `op document edit "${existing.id}" "${filePath}" --vault "${OP_VAULT}"`,
          { stdio: 'pipe' }
        );
        log(`Updated "${title}" in 1Password`);
      } else {
        execSync(
          `op document create "${filePath}" --title "${title}" --vault "${OP_VAULT}"`,
          { stdio: 'pipe' }
        );
        log(`Created "${title}" in 1Password`);
      }
      pushed++;
    } catch (err) {
      warn(
        `1Password save failed for "${title}": ${err instanceof Error ? err.message : String(err)}\n` +
        '  Make sure you are signed in and Desktop App integration is enabled.'
      );
    }
  }

  if (pushed > 0) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Done — ${pushed} item(s) saved to 1Password
   Vault : ${OP_VAULT}
   Brand : ${slug}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  } else {
    warn('No files were pushed. Check that .env.local exists for this brand.');
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
