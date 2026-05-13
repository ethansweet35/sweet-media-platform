/**
 * Smoke test — full content editor pipeline end-to-end.
 *
 * Creates an editor row directly in Sweet Media's Supabase, runs the
 * complete 8-phase pipeline, and verifies all child tables are populated.
 *
 * Usage:
 *   pnpm smoke-test-pipeline                       # default keyword
 *   KEYWORD="..." pnpm smoke-test-pipeline         # custom keyword
 *
 * Approximate cost: ~$0.25-0.30 per run. Cleans up the editor row at
 * the end unless KEEP_EDITOR=1 is set.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { runContentEditorPipeline } from "@sweetmedia/admin-core/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

// ─── Load .env files into process.env ────────────────────────────────────
function loadEnvFile(p: string): void {
  let text: string;
  try {
    text = readFileSync(p, "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1);
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k && !process.env[k]) process.env[k] = v;
  }
}

loadEnvFile(join(REPO_ROOT, ".env"));
loadEnvFile(join(REPO_ROOT, "apps/sweet-media/.env.local"));

// ─── Helpers ──────────────────────────────────────────────────────────────
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";

function header(label: string): void {
  console.log(`\n${bold}━━━ ${label} ━━━${reset}`);
}
function ok(msg: string): void {
  console.log(`  ${green}✓${reset} ${msg}`);
}
function fail(msg: string): void {
  console.log(`  ${red}✗${reset} ${msg}`);
}
function info(msg: string): void {
  console.log(`  ${dim}${msg}${reset}`);
}
function warn(msg: string): void {
  console.log(`  ${yellow}!${reset} ${msg}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log(`\n${bold}Content Editor Pipeline — Full Smoke Test${reset}\n`);

  const keyword = process.env.KEYWORD ?? "intensive outpatient program orange county";
  const keepEditor = process.env.KEEP_EDITOR === "1";

  // Use Sweet Media's Supabase
  const supabaseUrl = "https://ynmldknprfusujudvutq.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error(`${red}SUPABASE_SERVICE_ROLE_KEY not found. Set it in apps/sweet-media/.env.local${reset}`);
    process.exit(1);
  }

  // Make these visible to the pipeline (it reads process.env.NEXT_PUBLIC_SUPABASE_URL).
  process.env.NEXT_PUBLIC_SUPABASE_URL = supabaseUrl;

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  info(`Keyword: "${keyword}"`);
  info(`Supabase: ${supabaseUrl}`);

  // ─── Create editor row ──────────────────────────────────────────────
  header("Creating editor row");
  const { data: created, error: createErr } = await client
    .from("content_editors")
    .insert({
      primary_keyword: keyword,
      location_code: 2840,
      language_code: "en",
      device: "desktop",
      competitor_pool_size: 20,
      status: "pending",
    })
    .select("id")
    .single();

  if (createErr || !created) {
    fail(`Could not insert editor: ${createErr?.message ?? "no data"}`);
    process.exit(1);
  }
  const editorId = (created as { id: string }).id;
  ok(`Editor created: ${editorId}`);

  // ─── Run pipeline ───────────────────────────────────────────────────
  header("Running pipeline (this takes ~60-90s)");
  const startedAt = Date.now();
  try {
    await runContentEditorPipeline({ editorId, client });
    ok(`Pipeline completed in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
  } catch (err) {
    fail(`Pipeline failed: ${err instanceof Error ? err.message : String(err)}`);
    // Don't exit yet — still print whatever state was reached.
  }

  // ─── Verify outputs ─────────────────────────────────────────────────
  header("Verifying pipeline outputs");
  const { data: finalEditor } = await client
    .from("content_editors")
    .select("*")
    .eq("id", editorId)
    .single();

  if (!finalEditor) {
    fail("Editor row vanished");
    process.exit(1);
  }
  const e = finalEditor as Record<string, unknown>;
  info(`status: ${e.status}`);
  info(`total_cost_usd: $${Number(e.total_cost_usd).toFixed(4)}`);
  info(`recommended_word_count: ${e.recommended_word_count_min}-${e.recommended_word_count_max} (target ${e.recommended_word_count_target})`);
  info(`competitor_avg_score: ${e.competitor_avg_score} | target_score: ${e.target_score}`);
  if (e.error) warn(`error: ${e.error}`);

  // Count child rows
  const tables = [
    "content_editor_competitors",
    "content_editor_terms",
    "content_editor_questions",
    "content_editor_facts",
    "content_editor_outlines",
  ];
  for (const t of tables) {
    const { count } = await client.from(t).select("id", { count: "exact", head: true }).eq("editor_id", editorId);
    if ((count ?? 0) > 0) ok(`${t}: ${count} rows`);
    else fail(`${t}: 0 rows`);
  }

  // Sample some terms + facts
  header("Sample data");
  const { data: topTerms } = await client
    .from("content_editor_terms")
    .select("term, relevance_score, min_recommended_uses, max_recommended_uses, competitor_coverage_pct, term_type")
    .eq("editor_id", editorId)
    .order("relevance_score", { ascending: false })
    .limit(10);
  if (topTerms?.length) {
    console.log(`\n  ${bold}Top 10 terms by relevance:${reset}`);
    for (const t of topTerms as Array<{ term: string; relevance_score: number; min_recommended_uses: number; max_recommended_uses: number; competitor_coverage_pct: number; term_type: string }>) {
      console.log(
        `    ${dim}${t.term.padEnd(40)}${reset} ` +
          `rel=${t.relevance_score.toFixed(1).padStart(7)} ` +
          `uses=${t.min_recommended_uses}-${t.max_recommended_uses} ` +
          `cov=${t.competitor_coverage_pct}% ` +
          `[${t.term_type}]`,
      );
    }
  }

  const { data: topFacts } = await client
    .from("content_editor_facts")
    .select("fact_text, source_domain, importance_score, source_count")
    .eq("editor_id", editorId)
    .order("importance_score", { ascending: false })
    .limit(5);
  if (topFacts?.length) {
    console.log(`\n  ${bold}Top 5 facts by importance:${reset}`);
    for (const f of topFacts as Array<{ fact_text: string; source_domain: string; importance_score: number; source_count: number }>) {
      console.log(`    ${dim}[${f.importance_score}|${f.source_count}src] ${f.fact_text.slice(0, 110)}${f.fact_text.length > 110 ? "…" : ""}${reset}`);
      console.log(`      ${dim}— ${f.source_domain}${reset}`);
    }
  }

  // ─── Cleanup ────────────────────────────────────────────────────────
  if (keepEditor) {
    console.log(`\n${dim}Keeping editor ${editorId} (KEEP_EDITOR=1)${reset}`);
  } else {
    header("Cleanup");
    await client.from("content_editors").delete().eq("id", editorId);
    ok(`Deleted editor + cascaded children`);
  }

  const success = e.status === "ready";
  console.log(`\n${bold}Result: ${success ? `${green}PASS${reset}` : `${red}FAIL${reset}`}${reset}\n`);
  process.exit(success ? 0 : 1);
}

main().catch((err: unknown) => {
  console.error(`\n${red}Smoke test crashed:${reset}`, err);
  process.exit(1);
});
