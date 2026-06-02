/**
 * Server-only exports for @sweetmedia/admin-core.
 * Import from "@sweetmedia/admin-core/server" in Node.js / Next API routes only.
 * Never import this in React components or browser code.
 */
export { OPENROUTER_HAIKU_MODEL } from "./lib/openRouterModels";
export { scanAppRoutes, derivePageTitle, syncTrackedPages } from "./lib/scanAppRoutes";

export {
  resolveGscAccessToken,
  queryGscByPage,
  queryGscPageKeywords,
  buildSiteCandidates,
  buildPageUrlVariants,
  type GscAuthResult,
  type GscPageRow,
  type GscQueryRow,
} from "./lib/server/gscClient";

export {
  fetchPageTextContent,
  deriveKeywordSeedWithAi,
  fetchLivePageWordCount,
  countWordsInHtml,
  type PageContentResult,
  type PageWordCountResult,
} from "./lib/server/pageContentFetcher";

export {
  cleanSeedPhrase,
  stripBrandSuffix,
  derivePageKeywordResearchSeed,
  routeSlugToSeed,
  isDistinctiveRouteSlug,
  seedOverlapsRoute,
} from "./lib/seedCleaner";

export {
  shouldRefineKeywordSeedFromPage,
  refineKeywordSeedFromPage,
  handleSemrushSuggestionsPost,
  handleSemrushAutoPickPost,
} from "./lib/server/semrushSeedRefinement";

export {
  insertContentChangeLogEntries,
  recordTrackedPageChanges,
  recordBlogPostChanges,
  recordNewTrackedPageInventoryEntries,
  fetchContentChangeLog,
  fetchRecentSiteContentChanges,
  handleContentChangeLogPost,
} from "./lib/server/contentChangeLogServer";

export { handleSeoImpactGet } from "./lib/server/seoImpact";

export { handlePerformanceOverviewGet, fetchPerformanceOverview } from "./lib/server/performanceOverview";

export {
  handleSearchConsoleGet,
  handleSearchConsolePageQueriesGet,
} from "./lib/server/searchConsoleRoute";

export {
  normalizeSpeedTestUrl,
  runSpeedTestAnalysis,
  fetchPsiMetricsQuick,
  type PsiQuickMetrics,
  type PsiStrategy,
  type SpeedTestCoreMetrics,
  type SpeedTestRecommendation,
  type SpeedTestResult,
  type RecommendationImpact,
  type RecommendationEffort,
} from "./lib/server/psiAnalysis";

export {
  queryGscPagePeriodComparison,
  queryGscSiteDailySeries,
  queryGscSiteTotals,
  queryGscByQuery,
  gscComparisonDateRanges,
  computeMetricDeltas,
  resolveCanonicalGscPageUrl,
  type GscPeriodMetrics,
  type GscDailyMetric,
} from "./lib/server/gscClient";

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
  getUrlRankingKeywords,
  pickKeyword,
  type SemrushKeywordOverview,
  type SemrushKeywordSuggestion,
  type KeywordSuggestionResult,
  type SemrushIntent,
  type KeywordPickMode,
  type SemrushAutoPickResult,
  type SemrushRankingKeyword,
  hostnameToSemrushDomain,
  getDomainOverview,
  getDomainOrganicKeywords,
  getDomainOrganicCompetitors,
  getDomainMissingKeywords,
  type SemrushDomainOverview,
  type SemrushDomainOrganicKeyword,
  type SemrushOrganicCompetitor,
  type SemrushDomainGapKeyword,
} from "./lib/server/semrushClient";

export {
  normalizeSeoStrategyUrl,
  runSeoStrategyAnalysis,
  type RunSeoStrategyOptions,
} from "./lib/server/seoStrategyAnalysis";

export { buildSiteStructureSnapshot, type SiteStructureSnapshot } from "./lib/server/siteStructureSnapshot";

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
  handleContentEditorAutoOptimizePost,
  type ContentEditorAutoOptimizeRequest,
  resolveEditorPublishLink,
  ensureBlogPostForEditor,
  linkEditorToTrackedPage,
  ensurePublishTargetForAutoOptimize,
  applyTrackedPageSeoFromEditorDraft,
  syncEditorDraftToBlogPost,
  syncBlogPostToEditorDraft,
  handleBulkSyncContentEditorsPost,
  bulkSyncEditorsToBlog,
  type SyncEditorDraftToBlogResult,
  type SyncBlogPostToEditorDraftResult,
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
// Keep @cursor/sdk behind a lazy import so non-optimize routes (like
// content editor polling/status routes) can compile/build without eagerly
// loading native SDK dependencies.
import type {
  AiOptimizeRunRow,
  AiOptimizeRunStatus,
  TriggerAiOptimizeRunInput,
} from "./lib/server/aiOptimizeRuns";

export type { AiOptimizeRunRow, TriggerAiOptimizeRunInput };
export type AiOptimizeRunStatusServer = AiOptimizeRunStatus;

async function loadAiOptimizeRuns() {
  return import("./lib/server/aiOptimizeRuns");
}

export async function triggerAiOptimizeRun(input: TriggerAiOptimizeRunInput) {
  const mod = await loadAiOptimizeRuns();
  return mod.triggerAiOptimizeRun(input);
}

export async function refreshAiOptimizeRunFromCursor(id: string) {
  const mod = await loadAiOptimizeRuns();
  return mod.refreshAiOptimizeRunFromCursor(id);
}

export async function refreshAllActiveRunsForEditor(editorId: string) {
  const mod = await loadAiOptimizeRuns();
  return mod.refreshAllActiveRunsForEditor(editorId);
}

export async function cancelAiOptimizeRun(id: string) {
  const mod = await loadAiOptimizeRuns();
  return mod.cancelAiOptimizeRun(id);
}

export async function getAiOptimizeRun(id: string) {
  const mod = await loadAiOptimizeRuns();
  return mod.getAiOptimizeRun(id);
}

export async function listAiOptimizeRuns(opts: { editorId: string; limit?: number }) {
  const mod = await loadAiOptimizeRuns();
  return mod.listAiOptimizeRuns(opts);
}

export async function getRevalidationPathsForEditor(editorId: string) {
  const mod = await loadAiOptimizeRuns();
  return mod.getRevalidationPathsForEditor(editorId);
}

export {
  ensureMiscellaneousHub,
  discoverTopicsForHub,
  createBriefEditorFromPlannerItem,
  type CreatePlannerEditorResult,
  computeCoverage,
  handleBlogPlannerHubsGet,
  handleBlogPlannerHubPatch,
  handleBlogPlannerHubDetailGet,
  handleBlogPlannerDiscoverPost,
  handleBlogPlannerCreateEditorPost,
  handleBlogPlannerItemPost,
  handleBlogPlannerItemPatch,
  handleBlogPlannerLinkPost,
  handleBlogPlannerAttachablesGet,
} from "./lib/server/blogPlanner";

export {
  runBlogPlannerBulkJob,
  startBlogPlannerBulkJob,
  getActiveBlogPlannerBulkJob,
  cancelBlogPlannerBulkJob,
  handleBlogPlannerBulkJobsPost,
  handleBlogPlannerBulkJobsActiveGet,
  handleBlogPlannerBulkJobCancelPost,
  handleBlogPlannerBulkJobContinuePost,
} from "./lib/server/blogPlannerBulkJobs";

export {
  startContentEditorBulkJob,
  runContentEditorBulkJob,
  getActiveContentEditorBulkJob,
  cancelContentEditorBulkJob,
  parseBulkCreateLines,
  handleContentEditorBulkJobsPost,
  handleContentEditorBulkJobsActiveGet,
  handleContentEditorBulkJobCancelPost,
  handleContentEditorBulkJobContinuePost,
} from "./lib/server/contentEditorBulkJobs";

export {
  listContentEditorsForCalendarImport,
  importContentEditorsToBlogQueue,
  handleContentCalendarEditorSourcesGet,
  handleContentCalendarImportFromEditorsPost,
  type CalendarEditorSourceRow,
  type ImportFromEditorsInput,
} from "./lib/server/contentCalendarEditorImport";

// ─── Inline Page Editor (server-side) ─────────────────────────────────
export {
  fetchPublishedPageContent,
  fetchAllPageContent,
  getPageContentForRequest,
  getPageContentCacheTags,
  resolvePageContentValue,
  type PageContentOverrideRow,
  type PageContentOverrideMap,
  type PageContentFieldType,
} from "./lib/server/pageContentOverrides";

export { revalidatePageContentCaches } from "./lib/server/revalidatePageContentCaches";

export {
  SEO_OVERRIDE_KEYS,
  SEO_OVERRIDE_KEY_LIST,
  type PageEditorSeoContextResult,
  type PageEditorSeoSnapshot,
  type PageEditorEntityType,
} from "./components/page-editor/pageEditorSeoTypes";

export {
  handleAdminUsersGet,
  handleAdminUsersPost,
  handleAdminUsersDelete,
  type AdminUserRow,
} from "./lib/server/adminUsers";

export { handleAdminForgotPasswordPost } from "./lib/server/adminForgotPassword";

export {
  handleSaveDraft,
  handlePublish,
  handleDiscard,
  handleUploadImage,
  handleGetSeoContext,
  requireAdminContext,
  pageContentErrorToResponse,
  type PageContentSaveDraftInput,
  type PageContentDraftFieldInput,
  type PageContentSaveDraftResult,
  type PageContentPublishInput,
  type PageContentPublishResult,
  type PageContentDiscardInput,
  type PageContentDiscardResult,
  type PageContentUploadImageResult,
  type PageContentEditorError,
  type AdminContext,
} from "./lib/server/pageContentEditor";

export {
  buildMarketingReport,
  handleMarketingOverviewGet,
  handleIngestMetricsPost,
  resolveReportShare,
  type ResolvedShareReport,
} from "./lib/server/marketingReport";

export {
  handleReportSharesGet,
  handleReportSharesPost,
  handleReportSharePatch,
  handleReportShareDelete,
} from "./lib/server/reportShares";
