/**
 * Smoke test — content editor vendor wrappers.
 *
 * One-off verification that DataForSEO, Firecrawl, Google NLP, OpenRouter,
 * and OpenAI embeddings all work with our env vars and that our wrappers
 * parse their responses correctly. Run once after setting up vendor
 * accounts; not part of the regular workflow.
 *
 * Usage:
 *   pnpm exec tsx scripts/smoke-test-content-editor-vendors.ts
 *
 * Approximate cost per run: ~$0.05.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  fetchSerpResults,
  scrapePage,
  analyzeEntities,
  callClaude,
  embedTexts,
} from "@sweetmedia/admin-core/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

// ─── Load repo-root .env ─────────────────────────────────────────────────
// Wrappers read process.env at call time (not module-load time) so loading
// after imports is fine.
function loadEnv(): void {
  const envText = readFileSync(join(REPO_ROOT, ".env"), "utf8");
  for (const line of envText.split("\n")) {
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

// ─── Helpers ─────────────────────────────────────────────────────────────
const dim = "\x1b[2m";
const reset = "\x1b[0m";
const bold = "\x1b[1m";
const green = "\x1b[32m";
const red = "\x1b[31m";

let totalCost = 0;
let failures = 0;

function header(label: string): void {
  console.log(`\n${bold}━━━ ${label} ━━━${reset}`);
}

function ok(msg: string, cost?: number): void {
  if (typeof cost === "number") {
    totalCost += cost;
    console.log(`  ${green}✓${reset} ${msg} ${dim}($${cost.toFixed(4)})${reset}`);
  } else {
    console.log(`  ${green}✓${reset} ${msg}`);
  }
}

function info(msg: string): void {
  console.log(`  ${dim}${msg}${reset}`);
}

function fail(msg: string, err?: unknown): void {
  failures++;
  console.log(`  ${red}✗${reset} ${msg}`);
  if (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log(`    ${red}${message}${reset}`);
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  loadEnv();
  console.log(`\n${bold}Content Editor Vendor Smoke Test${reset}\n`);

  // 1. DataForSEO
  header("1/5  DataForSEO — SERP fetch");
  try {
    const result = await fetchSerpResults({
      keyword: "intensive outpatient program orange county",
      depth: 10,
    });
    info(`organic results: ${result.data.organicResults.length}`);
    info(`PAA questions: ${result.data.paaQuestions.length}`);
    if (result.data.organicResults.length > 0) {
      info(`top result: ${result.data.organicResults[0].domain}`);
    }
    if (result.data.organicResults.length < 5) {
      fail("Expected at least 5 organic results");
    } else {
      ok("SERP fetch returned valid results", result.cost_usd);
    }
  } catch (err) {
    fail("DataForSEO call failed", err);
  }

  // 2. Firecrawl
  header("2/5  Firecrawl — page scrape");
  try {
    const result = await scrapePage({
      url: "https://en.wikipedia.org/wiki/Intensive_outpatient_program",
    });
    info(`title: "${result.data.title.slice(0, 60)}"`);
    info(`word count: ${result.data.wordCount}`);
    info(`h2 count: ${result.data.h2Count}, h3 count: ${result.data.h3Count}`);
    info(`paragraphs: ${result.data.paragraphCount}, images: ${result.data.imageCount}`);
    info(`headings extracted: ${result.data.headings.length}`);
    if (result.data.wordCount < 100) {
      fail("Expected at least 100 words from a real article");
    } else {
      ok("Firecrawl scrape returned valid metrics", result.cost_usd);
    }
  } catch (err) {
    fail("Firecrawl call failed", err);
  }

  // 3. Google NLP
  header("3/5  Google NLP — entity extraction");
  try {
    const result = await analyzeEntities(
      "Intensive outpatient programs (IOPs) provide structured addiction treatment " +
        "without requiring residential admission. The Substance Abuse and Mental " +
        "Health Services Administration (SAMHSA) recommends IOPs as a step-down from " +
        "partial hospitalization (PHP) for stable patients in Orange County, California.",
    );
    info(`entities extracted: ${result.data.length}`);
    if (result.data.length > 0) {
      const top = result.data[0];
      info(`top entity: "${top.name}" (${top.type}, salience ${top.salience.toFixed(3)})`);
    }
    if (result.data.length < 3) {
      fail("Expected at least 3 entities");
    } else {
      ok("Google NLP returned valid entities", result.cost_usd);
    }
  } catch (err) {
    fail("Google NLP call failed", err);
  }

  // 4. Claude via OpenRouter
  header("4/5  Claude (Haiku) via OpenRouter — JSON-mode call");
  try {
    const result = await callClaude<{ ok: string }>({
      model: "haiku",
      systemPrompt: "You are a concise assistant. Respond only with the requested JSON object.",
      userPrompt:
        'Return a JSON object with a single key "ok" whose value is the literal string "yes". ' +
        "No other keys, no explanation.",
      maxTokens: 100,
      expectJson: true,
    });
    info(`prompt tokens: ${result.data.usage.promptTokens}, completion: ${result.data.usage.completionTokens}`);
    info(`parsed value: ${JSON.stringify(result.data.data)}`);
    if (typeof result.data.data !== "object" || result.data.data === null) {
      fail("Expected a JSON object back");
    } else {
      ok("Claude returned valid JSON", result.cost_usd);
    }
  } catch (err) {
    fail("Claude call failed", err);
  }

  // 5. OpenAI embeddings
  header("5/5  OpenAI embeddings — single text");
  try {
    const result = await embedTexts([
      "Intensive outpatient programs treat addiction without overnight stays.",
    ]);
    info(`embeddings returned: ${result.data.embeddings.length}`);
    info(`dimensions: ${result.data.embeddings[0]?.length ?? 0}`);
    info(`total tokens: ${result.data.totalTokens}`);
    if (result.data.embeddings[0]?.length !== 1536) {
      fail("Expected 1536-dim embedding");
    } else {
      ok("OpenAI embeddings returned valid vector", result.cost_usd);
    }
  } catch (err) {
    fail("OpenAI embeddings call failed", err);
  }

  // Summary
  console.log(`\n${bold}━━━ Summary ━━━${reset}`);
  console.log(`  Total cost:  ${green}$${totalCost.toFixed(4)}${reset}`);
  console.log(`  Failures:    ${failures === 0 ? `${green}0${reset}` : `${red}${failures}${reset}`}\n`);

  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err: unknown) => {
  console.error(`\n${red}Smoke test crashed:${reset}`, err);
  process.exit(1);
});
