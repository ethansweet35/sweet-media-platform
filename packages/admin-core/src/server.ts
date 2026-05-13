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

// ─── Content Editor — full pipeline + vendor wrappers ──────────────────
// Surfer/Rankability-style content optimization. Each vendor wrapper
// returns `{ data, cost_usd }`. The pipeline orchestrator is idempotent
// and persists state after every phase, so it can be safely retried.
export {
  // Errors
  ContentEditorError,
  // Vendor wrappers
  fetchSerpResults,
  scrapePage,
  analyzeEntities,
  callClaude,
  embedTexts,
  cosineSimilarity,
  // Pipeline
  runContentEditorPipeline,
  // DB helpers
  getAdminClient as getContentEditorAdminClient,
  loadEditor as loadContentEditor,
  loadCompetitors as loadContentEditorCompetitors,
  setStatus as setContentEditorStatus,
  addCost as addContentEditorCost,
  // Scoring
  scoreDocument,
  computeTargetScore,
  // Pricing constants
  CLAUDE_MODELS,
  claudeCallCost,
  OPENAI_EMBEDDING_DIMENSIONS,
  // Types
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
  type RunPipelineOptions,
  type ContentEditorStatus,
  type ContentEditorRow,
  type CompetitorRow,
  type ScoringTerm,
  type DraftDocument,
  type TermStatus,
  type TermUsage,
  type ScoreBreakdown,
} from "./lib/server/contentEditor";
