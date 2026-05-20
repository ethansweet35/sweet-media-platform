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
const OP_VAULT  = 'Sweet Media Platform';

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
    // SECURE_NOTE env blob in notesPlain
    if (field.id === 'notesPlain' || field.purpose === 'NOTES') {
      if (/^[A-Z_]+=.+/m.test(val)) Object.assign(out, parseEnvText(val));
      continue;
    }
    if (/^[A-Z_]+=.+/m.test(val)) {
      Object.assign(out, parseEnvText(val));
    } else if (field.label && /^[A-Z_]+$/.test(field.label)) {
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

/** Fetch raw .env.local text — supports SECURE_NOTE (notesPlain) and DOCUMENT (file attachment). */
function fetchEnvFileContent(itemName) {
  const item = fetchOpItem(itemName);
  if (!item) return null;

  const envMap = extractEnvFromItem(item);
  if (envMap) return envMapToFile(envMap);

  const hasDocumentFile = item.category === 'DOCUMENT' || (item.files?.length ?? 0) > 0;
  if (hasDocumentFile) {
    try {
      const escaped = itemName.replace(/"/g, '\\"');
      const text = execSync(
        `op document get "${escaped}" --vault "${OP_VAULT}"`,
        { stdio: ['pipe', 'pipe', 'pipe'] },
      ).toString();
      if (text.trim()) return text.endsWith('\n') ? text : `${text}\n`;
    } catch {
      return null;
    }
  }

  return null;
}

async function main() {
  console.log('\n🔑  Sweet Media — Pull Brand .env.local from 1Password\n');

  const slug = getArg('--slug') || die('--slug required. Usage: node scripts/pull-brand-env.mjs --slug cipher-billing');

  const appDir  = join(REPO_ROOT, 'apps', slug);
  const outPath = join(appDir, '.env.local');

  if (!existsSync(appDir)) die(`apps/${slug} does not exist. Check the slug and try again.`);

  // --if-missing: skip silently if .env.local already exists (used by predev hook)
  if (hasFlag('--if-missing') && existsSync(outPath)) {
    process.exit(0);
  }

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

  const envContent = fetchEnvFileContent(itemName);

  if (!envContent) {
    die(
      `Could not find or read "${itemName}" in vault "${OP_VAULT}".\n` +
      '  Make sure:\n' +
      '  1. 1Password desktop app is open and unlocked\n' +
      '  2. The desktop app integration is enabled (Settings → Developer → Integrate with CLI)\n' +
      `  3. The vault item is named exactly: "${itemName}"\n` +
      '  4. The item has either a notesPlain env blob or a .env.local file attachment'
    );
  }

  const envMap = parseEnvText(envContent);

  // ── Write .env.local ─────────────────────────────────────────────────────
  const existed = existsSync(outPath);
  writeFileSync(outPath, envContent, 'utf8');

  log(`${existed ? 'Updated' : 'Created'} apps/${slug}/.env.local (${Object.keys(envMap).length} vars)`);

  // ── Summary ──────────────────────────────────────────────────────────────
  const keyList = Object.keys(envMap).join(', ');
  console.log(`\n  Keys written: ${keyList}\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Run: pnpm --filter @sweetmedia/${slug} dev`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main().catch((err) => { console.error(err); process.exit(1); });
