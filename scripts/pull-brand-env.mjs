#!/usr/bin/env node
/**
 * Sweet Media — Pull Brand .env.local from 1Password
 *
 * Fetches the per-brand .env.local from the "sweet media platform" 1Password
 * vault and writes it to apps/<slug>/.env.local on disk.
 *
 * Usage:
 *   node scripts/pull-brand-env.mjs --slug cipher-billing
 *
 * Or via pnpm (from repo root):
 *   pnpm env:pull --slug cipher-billing
 *
 * Prerequisites:
 *   - 1Password CLI installed: brew install 1password-cli
 *   - Desktop app integration enabled: 1Password → Settings → Developer → Integrate with CLI
 *   - Access to the "sweet media platform" vault
 *
 * The vault item name must match: "<slug> — .env.local"
 * (em dash, matching the naming convention used when items were created)
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const OP_VAULT  = 'sweet media platform';

function log(msg)  { console.log(`\n✅  ${msg}`); }
function step(msg) { console.log(`\n⏳  ${msg}...`); }
function warn(msg) { console.log(`\n⚠️   ${msg}`); }
function die(msg)  { console.error(`\n❌  ${msg}`); process.exit(1); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function parseEnvText(text) {
  const out = {};
  const lines = text.replace(/\\n/g, '\n').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k) out[k] = v;
  }
  return out;
}

function fetchOpItem(itemName) {
  try {
    const raw = execSync(
      `op item get "${itemName}" --vault "${OP_VAULT}" --format json`,
      { stdio: ['pipe', 'pipe', 'pipe'] }
    ).toString();
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function extractEnvFromItem(item) {
  if (!item?.fields) return null;
  const out = {};
  for (const field of item.fields) {
    const val = field.value;
    if (!val) continue;
    // If this field value looks like an env file blob, parse it
    if (/^[A-Z_]+=.+/m.test(val)) {
      Object.assign(out, parseEnvText(val));
    } else if (field.label && /^[A-Z_]+$/.test(field.label)) {
      // Individual labeled field matching an env var pattern
      out[field.label] = val;
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

function envMapToFile(envMap) {
  return Object.entries(envMap)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n') + '\n';
}

async function main() {
  console.log('\n🔑  Sweet Media — Pull Brand .env.local from 1Password\n');

  const slug = getArg('--slug') || die('--slug required. Usage: node scripts/pull-brand-env.mjs --slug cipher-billing');

  const appDir  = join(REPO_ROOT, 'apps', slug);
  const outPath = join(appDir, '.env.local');

  if (!existsSync(appDir)) die(`apps/${slug} does not exist. Check the slug and try again.`);

  // ── Check op is available ────────────────────────────────────────────────
  try {
    execSync('op --version', { stdio: ['pipe', 'pipe', 'pipe'] });
  } catch {
    die(
      '1Password CLI not found.\n' +
      '  Install it: brew install 1password-cli\n' +
      '  Then enable: 1Password → Settings → Developer → Integrate with CLI'
    );
  }

  // ── Fetch the brand env item ─────────────────────────────────────────────
  const itemName = `${slug} \u2014 .env.local`; // em dash
  step(`Fetching "${itemName}" from 1Password`);

  const item = fetchOpItem(itemName);

  if (!item) {
    die(
      `Could not find item "${itemName}" in vault "${OP_VAULT}".\n` +
      '  Make sure:\n' +
      '  1. 1Password desktop app is open and unlocked\n' +
      '  2. The desktop app integration is enabled (Settings → Developer → Integrate with CLI)\n' +
      `  3. The vault item is named exactly: "${itemName}"`
    );
  }

  const envMap = extractEnvFromItem(item);

  if (!envMap) {
    die(
      `Found the 1Password item but could not extract any env vars from it.\n` +
      `  Check that the item "${itemName}" contains env var content (KEY=value lines).`
    );
  }

  // ── Write .env.local ─────────────────────────────────────────────────────
  const existed = existsSync(outPath);
  writeFileSync(outPath, envMapToFile(envMap), 'utf8');

  log(`${existed ? 'Updated' : 'Created'} apps/${slug}/.env.local (${Object.keys(envMap).length} vars)`);

  // ── Summary ──────────────────────────────────────────────────────────────
  const keyList = Object.keys(envMap).join(', ');
  console.log(`\n  Keys written: ${keyList}\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Run: pnpm --filter @sweetmedia/${slug} dev`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main().catch((err) => { console.error(err); process.exit(1); });
