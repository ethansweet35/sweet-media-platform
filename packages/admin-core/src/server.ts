/**
 * Server-only exports for @sweetmedia/admin-core.
 * Import from "@sweetmedia/admin-core/server" in Node.js / Next API routes only.
 * Never import this in React components or browser code.
 */
export { scanAppRoutes, derivePageTitle, syncTrackedPages } from "./lib/scanAppRoutes";

export {
  buildPublicSitemapGroupXml,
  buildPublicSitemapIndexXml,
  loadPublicSitemapSources,
  type PublicSitemapSources,
} from "./lib/server/publicSitemap";

export {
  SemrushApiError,
  getSemrushEnv,
  getKeywordOverview,
  getKeywordSuggestions,
  pickKeyword,
  type SemrushKeywordOverview,
  type SemrushKeywordSuggestion,
  type KeywordSuggestionResult,
  type SemrushIntent,
  type KeywordPickMode,
  type SemrushAutoPickResult,
} from "./lib/server/semrushClient";

export {
  SweetSeoError,
  analyzeKeyword,
  getBrief,
  deleteBrief,
} from "./lib/server/sweetSeoBrief";

// ─── Content Editor vendor wrappers ─────────────────────────────────────
// Used by the new Surfer/Rankability-style content optimization pipeline.
// Each wrapper returns `{ data, cost_usd }` so the pipeline orchestrator
// can update `content_editors.total_cost_usd` as it runs.
export {
  ContentEditorError,
  fetchSerpResults,
  scrapePage,
  analyzeEntities,
  callClaude,
  embedTexts,
  cosineSimilarity,
  CLAUDE_MODELS,
  claudeCallCost,
  OPENAI_EMBEDDING_DIMENSIONS,
  type VendorCallResult,
  type SerpFetchResult,
  type SerpOrganicResult,
  type ScrapeResult,
  type ScrapedHeading,
  type NlpEntity,
  type NlpEntityType,
  type ClaudeCallOptions,
  type ClaudeCallResult,
  type ClaudeModelAlias,
  type ClaudeUsage,
  type EmbeddingResult,
  type FetchSerpOptions,
  type ScrapeOptions,
} from "./lib/server/contentEditor";
