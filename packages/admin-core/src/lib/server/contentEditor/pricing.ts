/**
 * Vendor pricing constants for cost tracking.
 *
 * Update these when vendors change their rates. The pipeline orchestrator
 * uses them to compute `content_editors.total_cost_usd` and surface a
 * running cost ticker in the UI.
 */

// ─── DataForSEO ────────────────────────────────────────────────────────
// As of 2026 the live SERP "advanced" endpoint costs $0.0006 per task.
// https://docs.dataforseo.com/v3/serp/google/organic/live/advanced
export const DATAFORSEO_SERP_COST_PER_CALL = 0.0006;

// ─── Firecrawl ─────────────────────────────────────────────────────────
// Hobby plan: $0 for first 500 pages/month, then $0.002 per scrape on paid
// plans. The wrapper treats every scrape as $0.002 for visibility; if the
// account is on the free tier the real cost is $0 but it's safer to show
// the "would-cost" estimate.
export const FIRECRAWL_COST_PER_SCRAPE = 0.002;

// ─── Google Cloud Natural Language ─────────────────────────────────────
// 1 unit = 1,000 characters. First 5,000 units/month free, then $1 per 1k.
// We report at the paid rate for cost visibility.
export const GOOGLE_NLP_COST_PER_UNIT = 0.001;
export const GOOGLE_NLP_CHARS_PER_UNIT = 1000;

// ─── OpenAI embeddings (text-embedding-3-small) ────────────────────────
// $0.02 per 1M input tokens.
export const OPENAI_EMBEDDING_MODEL = "text-embedding-3-small";
export const OPENAI_EMBEDDING_DIMENSIONS = 1536;
export const OPENAI_EMBEDDING_COST_PER_MTOKEN = 0.02;

// ─── Claude via OpenRouter ─────────────────────────────────────────────
// OpenRouter passes through Anthropic's published pricing plus a small markup.
// Verified pricing (Anthropic API, late 2025):
//   Claude Sonnet 4.5:  $3.00 input / $15.00 output per million tokens
//   Claude Haiku 4.5:   $1.00 input /  $5.00 output per million tokens
// OpenRouter passthrough is ~exact (no surcharge on this provider as of
// 2026-05); update if that changes.
export const CLAUDE_MODELS = {
  sonnet: {
    /** OpenRouter model id. */
    id: "anthropic/claude-sonnet-4.6",
    inputCostPerMtoken: 3.0,
    outputCostPerMtoken: 15.0,
  },
  haiku: {
    id: "anthropic/claude-haiku-4.5",
    inputCostPerMtoken: 1.0,
    outputCostPerMtoken: 5.0,
  },
  /** Lite question synthesis — override via OPENROUTER_QUESTIONS_MODEL (e.g. Composer 2.5). */
  questions: {
    id: "anthropic/claude-haiku-4.5",
    inputCostPerMtoken: 1.0,
    outputCostPerMtoken: 5.0,
  },
} as const;

export type ClaudePricingAlias = keyof typeof CLAUDE_MODELS;

/** Resolve OpenRouter model id; questions alias reads OPENROUTER_QUESTIONS_MODEL. */
export function resolveOpenRouterModelId(alias: ClaudePricingAlias): string {
  if (alias === "questions") {
    const custom = process.env.OPENROUTER_QUESTIONS_MODEL?.trim();
    if (custom) return custom;
  }
  return CLAUDE_MODELS[alias].id;
}

export function claudeCallCost(
  alias: ClaudePricingAlias,
  promptTokens: number,
  completionTokens: number,
): number {
  const pricing = CLAUDE_MODELS[alias === "questions" ? "questions" : alias];
  return (
    (promptTokens / 1_000_000) * pricing.inputCostPerMtoken +
    (completionTokens / 1_000_000) * pricing.outputCostPerMtoken
  );
}
