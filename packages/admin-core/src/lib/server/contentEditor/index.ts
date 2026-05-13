/**
 * Content Editor — vendor wrapper barrel export.
 *
 * Import from `@sweetmedia/admin-core/server` rather than this path directly;
 * see ../../../server.ts for the public surface.
 */

export { ContentEditorError } from "./errors";

export * from "./types";

export {
  fetchSerpResults,
  type FetchSerpOptions,
} from "./dataforseo";

export {
  scrapePage,
  type ScrapeOptions,
} from "./firecrawl";

export { analyzeEntities } from "./googleNlp";

export { callClaude } from "./claudeViaOpenRouter";

export { embedTexts, cosineSimilarity } from "./embeddings";

export {
  CLAUDE_MODELS,
  claudeCallCost,
  DATAFORSEO_SERP_COST_PER_CALL,
  FIRECRAWL_COST_PER_SCRAPE,
  GOOGLE_NLP_COST_PER_UNIT,
  OPENAI_EMBEDDING_COST_PER_MTOKEN,
  OPENAI_EMBEDDING_DIMENSIONS,
  OPENAI_EMBEDDING_MODEL,
} from "./pricing";

export { withRetry } from "./retry";
