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
  runAutoOptimize,
  type AutoOptimizeOptions,
  fetchAndScoreLivePage,
  loadLatestSnapshotIgnoreTtl,
  scoreUrlAgainstEditor,
  type FetchAndScoreLivePageOptions,
  type TrackedPageLiveSnapshot,
  type ScoreUrlResult,
  // DB helpers
  getAdminClient as getContentEditorAdminClient,
  loadEditor as loadContentEditor,
  loadCompetitors as loadContentEditorCompetitors,
  setStatus as setContentEditorStatus,
  addCost as addContentEditorCost,
  // Scoring
  scoreDocument,
  computeTargetScore,
  computeAiSearchScore,
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
  type ScoringQuestion,
  type DraftDocument,
  type TermStatus,
  type TermUsage,
  type StructuralStatus,
  type StructuralCheck,
  type StructuralTargets,
  type PlacementChecks,
  type ScoreBreakdown,
  type ScoringOptions,
  // API handlers
  createContentEditor,
  getContentEditorState,
  deleteContentEditor,
  saveDraft as saveContentEditorDraft,
  scoreDraft as scoreContentEditorDraft,
  type CreateContentEditorInput,
  type ContentEditorState,
  type ContentEditorTermRow,
  type ContentEditorQuestionRow,
  type ContentEditorFactRow,
  type ContentEditorOutlineRow,
  type ContentEditorDraftRow,
  type SaveDraftInput,
  type ScoreDraftInput,
  type ScoreDraftResult,
} from "./lib/server/contentEditor";

// ─── AI Optimize Runs (Cursor cloud agent PRs) ────────────────────────
// Each row in `ai_optimize_runs` is a Cursor cloud-agent invocation that
// opens a PR with code-level edits to a tracked page's hand-coded React
// layout. The agent reads the page's tsx + the brand design system rules
// + the content brief, then commits + opens the PR via autoCreatePR.
// See /lib/server/aiOptimizeRuns.ts for the full module.
export {
  triggerAiOptimizeRun,
  refreshAiOptimizeRunFromCursor,
  refreshAllActiveRunsForEditor,
  cancelAiOptimizeRun,
  getAiOptimizeRun,
  listAiOptimizeRuns,
  getRevalidationPathsForEditor,
  type AiOptimizeRunRow,
  type AiOptimizeRunStatus as AiOptimizeRunStatusServer,
  type TriggerAiOptimizeRunInput,
} from "./lib/server/aiOptimizeRuns";
