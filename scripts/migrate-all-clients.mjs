#!/usr/bin/env node
/**
 * Sweet Media — Apply Supabase migrations to every client project
 *
 * Reads `scripts/clients.json` and runs every `.sql` file in
 * `supabase/migrations/` against each client's Supabase project, in
 * filename order. Already-applied migrations are tracked in a
 * `public.schema_migrations` table (created on first run) and skipped.
 *
 * Usage:
 *   node scripts/migrate-all-clients.mjs
 *   node scripts/migrate-all-clients.mjs --dry-run
 *   node scripts/migrate-all-clients.mjs --client northbound-treatment
 *   node scripts/migrate-all-clients.mjs --client sweet-media --dry-run
 *
 * Requires:
 *   - SUPABASE_ACCESS_TOKEN in repo-root `.env`
 *   - `scripts/clients.json` populated with { slug, ref } pairs
 *
 * Exit codes:
 *   0  every targeted client migrated cleanly (or had nothing to do)
 *   1  one or more clients failed (see summary)
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const MIGRATIONS_DIR = join(REPO_ROOT, 'supabase', 'migrations');
const CLIENTS_JSON = join(__dirname, 'clients.json');
const MGMT = 'https://api.supabase.com';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg)  { console.log(`✅  ${msg}`); }
function step(msg) { console.log(`⏳  ${msg}`); }
function info(msg) { console.log(`   ${msg}`); }
function warn(msg) { console.log(`⚠️   ${msg}`); }
function err(msg)  { console.error(`❌  ${msg}`); }
function hr()      { console.log('─'.repeat(72)); }

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}
function hasFlag(flag) { return process.argv.includes(flag); }

function loadEnvFile() {
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const [k, ...v] = line.split('=');
    if (k && v.length) out[k.trim()] = v.join('=').trim();
  }
  return out;
}

async function runSQL(token, ref, sql) {
  const res = await fetch(`${MGMT}/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) {
    const e = new Error(`Supabase API ${res.status}: ${text || res.statusText}`);
    e.status = res.status;
    e.body = text;
    throw e;
  }
  return text ? JSON.parse(text) : null;
}

function loadClients() {
  if (!existsSync(CLIENTS_JSON)) {
    err(`Missing ${CLIENTS_JSON}`);
    process.exit(1);
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(CLIENTS_JSON, 'utf8'));
  } catch (e) {
    err(`Could not parse ${CLIENTS_JSON}: ${e.message}`);
    process.exit(1);
  }
  const list = parsed?.clients;
  if (!Array.isArray(list) || list.length === 0) {
    err(`${CLIENTS_JSON} must contain a non-empty "clients" array.`);
    process.exit(1);
  }
  for (const c of list) {
    if (!c.slug || !c.ref) {
      err(`Every entry in ${CLIENTS_JSON} must have "slug" and "ref" — got ${JSON.stringify(c)}`);
      process.exit(1);
    }
  }
  return list;
}

function loadMigrations() {
  if (!existsSync(MIGRATIONS_DIR)) {
    warn(`No migrations directory at ${MIGRATIONS_DIR} — nothing to do.`);
    return [];
  }
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();
  return files.map((file) => ({
    file,
    version: file.replace(/\.sql$/, ''),
    path: join(MIGRATIONS_DIR, file),
  }));
}

// ─── Per-client work ─────────────────────────────────────────────────────────

async function ensureSchemaMigrationsTable(token, ref, dryRun) {
  const sql = `
    create table if not exists public.schema_migrations (
      version    text primary key,
      applied_at timestamptz not null default now()
    );
  `;
  if (dryRun) return;
  await runSQL(token, ref, sql);
}

async function fetchAppliedVersions(token, ref) {
  const result = await runSQL(
    token,
    ref,
    `select version from public.schema_migrations order by version;`
  );
  if (!Array.isArray(result)) return new Set();
  return new Set(result.map((row) => row.version));
}

function escapeSqlLiteral(s) {
  return s.replace(/'/g, "''");
}

async function applyMigration(token, ref, migration) {
  const body = readFileSync(migration.path, 'utf8');
  if (!body.trim()) {
    throw new Error(`Migration file ${migration.file} is empty.`);
  }
  // Run migration + tracking insert as one batch so a failure in either
  // rolls back the other (Postgres treats multi-statement queries as a
  // single implicit transaction).
  const sql = `
${body.trim().replace(/;?\s*$/, ';')}
insert into public.schema_migrations (version) values ('${escapeSqlLiteral(migration.version)}');
`;
  await runSQL(token, ref, sql);
}

async function migrateClient(token, client, migrations, dryRun) {
  hr();
  step(`${client.slug}  (ref: ${client.ref})`);

  let applied = new Set();
  try {
    await ensureSchemaMigrationsTable(token, client.ref, dryRun);
    if (!dryRun) {
      applied = await fetchAppliedVersions(token, client.ref);
    } else {
      // In dry-run we still try to read what's already applied so the
      // preview is accurate. If the table doesn't exist yet (first run),
      // the read will fail; that's fine — treat as empty.
      try {
        applied = await fetchAppliedVersions(token, client.ref);
      } catch {
        applied = new Set();
        info(`(dry-run) schema_migrations table does not exist yet — would be created.`);
      }
    }
  } catch (e) {
    err(`${client.slug}: could not prepare schema_migrations table — ${e.message}`);
    return { slug: client.slug, ok: false, applied: [], skipped: [], error: e.message };
  }

  const result = { slug: client.slug, ok: true, applied: [], skipped: [], error: null };

  for (const migration of migrations) {
    if (applied.has(migration.version)) {
      info(`⏭   skip   ${migration.file}  (already applied)`);
      result.skipped.push(migration.version);
      continue;
    }
    if (dryRun) {
      info(`👀  would  ${migration.file}`);
      result.applied.push(migration.version);
      continue;
    }
    try {
      info(`▶️   apply  ${migration.file}`);
      await applyMigration(token, client.ref, migration);
      result.applied.push(migration.version);
    } catch (e) {
      err(`${client.slug}: failed on ${migration.file} — ${e.message}`);
      if (e.body) info(e.body);
      result.ok = false;
      result.error = `${migration.file}: ${e.message}`;
      // Stop applying further migrations on this client to avoid running
      // later migrations on a half-broken state.
      break;
    }
  }

  return result;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const dryRun = hasFlag('--dry-run');
  const targetSlug = getArg('--client');

  console.log('');
  console.log('🚀  Sweet Media — Supabase migration runner');
  if (dryRun) info('(dry-run mode — no DB writes)');
  console.log('');

  const env = loadEnvFile();
  const token = env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) {
    err('SUPABASE_ACCESS_TOKEN missing — add it to repo-root .env or export it before running.');
    process.exit(1);
  }

  const allClients = loadClients();
  const clients = targetSlug
    ? allClients.filter((c) => c.slug === targetSlug)
    : allClients;

  if (targetSlug && clients.length === 0) {
    err(`No client with slug "${targetSlug}" in ${CLIENTS_JSON}.`);
    info(`Available: ${allClients.map((c) => c.slug).join(', ')}`);
    process.exit(1);
  }

  const migrations = loadMigrations();
  if (migrations.length === 0) {
    log('No .sql files found in supabase/migrations/ — nothing to do.');
    process.exit(0);
  }

  info(`Migrations directory: ${MIGRATIONS_DIR}`);
  info(`Found ${migrations.length} migration file(s):`);
  for (const m of migrations) info(`  • ${m.file}`);
  info(`Targeting ${clients.length} client(s): ${clients.map((c) => c.slug).join(', ')}`);

  const results = [];
  for (const client of clients) {
    const r = await migrateClient(token, client, migrations, dryRun);
    results.push(r);
  }

  // ─── Summary ─────────────────────────────────────────────────────────────
  hr();
  console.log('\n📋  Summary\n');
  for (const r of results) {
    const status = r.ok ? '✅ ok    ' : '❌ failed';
    const verb = dryRun ? 'would apply' : 'applied';
    console.log(
      `  ${status}  ${r.slug.padEnd(26)} ${verb}: ${r.applied.length}, skipped: ${r.skipped.length}` +
        (r.error ? `\n              error: ${r.error}` : '')
    );
  }
  console.log('');

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    err(`${failed.length} client(s) failed: ${failed.map((r) => r.slug).join(', ')}`);
    process.exit(1);
  }

  log(dryRun ? 'Dry run complete. No changes made.' : 'All clients migrated cleanly.');
}

main().catch((e) => {
  err(`Unhandled error: ${e?.stack || e?.message || e}`);
  process.exit(1);
});
