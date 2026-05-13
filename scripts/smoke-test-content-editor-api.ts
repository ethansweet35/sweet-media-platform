/**
 * Smoke test — content editor API handlers.
 *
 * Exercises createContentEditor → getContentEditorState → scoreContentEditorDraft
 * → deleteContentEditor end-to-end. Does NOT run the pipeline (use
 * smoke-test-pipeline for that). Verifies the API surface is callable
 * and returns sensible data.
 *
 * Usage:
 *   pnpm smoke-test-api
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  createContentEditor,
  deleteContentEditor,
  getContentEditorState,
  saveContentEditorDraft,
  scoreContentEditorDraft,
} from "@sweetmedia/admin-core/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

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
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://ynmldknprfusujudvutq.supabase.co";

const reset = "\x1b[0m";
const bold = "\x1b[1m";
const dim = "\x1b[2m";
const green = "\x1b[32m";
const red = "\x1b[31m";

function ok(msg: string): void { console.log(`  ${green}✓${reset} ${msg}`); }
function fail(msg: string): void { console.log(`  ${red}✗${reset} ${msg}`); }
function info(msg: string): void { console.log(`  ${dim}${msg}${reset}`); }

async function main(): Promise<void> {
  console.log(`\n${bold}Content Editor API — Smoke Test${reset}\n`);
  let editorId: string | null = null;
  let failures = 0;

  try {
    // 1. Create editor
    console.log(`${bold}1/4 createContentEditor${reset}`);
    const editor = await createContentEditor({
      primaryKeyword: "test keyword for smoke test",
      locationCode: 2840,
      languageCode: "en",
      device: "desktop",
    });
    editorId = editor.id;
    ok(`created editor ${editorId}`);
    info(`  status=${editor.status}, keyword="${editor.primary_keyword}"`);

    // 2. Get state (no pipeline data yet — should still return cleanly)
    console.log(`\n${bold}2/4 getContentEditorState${reset}`);
    const state = await getContentEditorState(editorId);
    if (!state) {
      fail("getContentEditorState returned null");
      failures++;
    } else {
      ok(`loaded state: editor + ${state.competitors.length} competitors + ${state.terms.length} terms`);
      info(`  current draft: ${state.currentDraft ? "present" : "none (expected)"}`);
    }

    // 3. Save draft (without pipeline data, this should still work)
    console.log(`\n${bold}3/4 saveContentEditorDraft${reset}`);
    const draft = await saveContentEditorDraft({
      editorId,
      titleTag: "Smoke Test Title | Brand",
      metaDescription: "A test meta description for the smoke test draft.",
      h1Text: "Smoke Test H1",
      bodyPlaintext:
        "This is a smoke test draft body. It includes the test keyword for smoke test " +
        "to verify the primary keyword detection works correctly. The body is intentionally " +
        "short but contains some sentences that can be scored.",
      bodyMarkdown:
        "# Smoke Test H1\n\nThis is a smoke test draft body. It includes the test keyword for smoke test...",
    });
    ok(`saved draft ${draft.id}`);
    info(`  word_count=${draft.word_count}, is_current=${draft.is_current}`);

    // 4. Score the draft (no terms yet — should return 0s gracefully)
    console.log(`\n${bold}4/4 scoreContentEditorDraft${reset}`);
    const result = await scoreContentEditorDraft({
      editorId,
      titleTag: "Smoke Test Title | Brand",
      metaDescription: "A test meta description for the smoke test draft.",
      h1Text: "Smoke Test H1",
      bodyPlaintext:
        "This is a smoke test draft body. It includes the test keyword for smoke test " +
        "to verify the primary keyword detection works correctly.",
      earlyHeadings: ["Smoke Test H1"],
      includeFactCoverage: false,
      persist: false,
    });
    ok(`scored draft: content=${result.content_score}, coverage=${result.coverage_score}, frequency=${result.frequency_score}, placement=${result.placement_score}`);
    info(`  primary kw placement: title=${result.placement_checks.primary_kw_in_title} h1=${result.placement_checks.primary_kw_in_h1} meta=${result.placement_checks.primary_kw_in_meta} first100=${result.placement_checks.primary_kw_in_first_100} early-heading=${result.placement_checks.primary_kw_in_early_heading}`);
  } catch (err) {
    fail(`unexpected error: ${err instanceof Error ? err.message : String(err)}`);
    failures++;
  } finally {
    if (editorId) {
      try {
        await deleteContentEditor(editorId);
        console.log(`\n${dim}Cleaned up editor ${editorId}${reset}`);
      } catch (err) {
        console.log(`\n${red}Cleanup failed:${reset}`, err instanceof Error ? err.message : String(err));
      }
    }
  }

  console.log(`\n${bold}Result: ${failures === 0 ? `${green}PASS${reset}` : `${red}FAIL${reset}`}${reset}\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err: unknown) => {
  console.error(`\n${red}Smoke test crashed:${reset}`, err);
  process.exit(1);
});
