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

// ─── Pipeline + supporting modules ─────────────────────────────────────
export {
  runContentEditorPipeline,
  type RunPipelineOptions,
} from "./pipeline";

export {
  runAutoOptimize,
  type AutoOptimizeOptions,
} from "./autoOptimize";

export {
  getAdminClient,
  loadEditor,
  loadCompetitors,
  loadBlacklistedDomains,
  setStatus,
  addCost,
  type ContentEditorStatus,
  type ContentEditorRow,
  type CompetitorRow,
} from "./db";

export {
  scoreDocument,
  computeTargetScore,
  computeAiSearchScore,
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
} from "./scoring";

export {
  computeEeatScore,
  isAuthoritativeDomain,
  isAuthoritativeUrl,
  AUTHORITATIVE_DOMAINS,
  AUTHORITATIVE_TLDS,
  type EeatBreakdown,
  type EeatCheck,
  type EeatCheckKey,
  type EeatScoreInput,
} from "./eeat";

export {
  extractNgrams,
  termAppearsInHeadings,
  type NgramTerm,
  type NgramExtractionOptions,
} from "./ngrams";

export {
  ENGLISH_STOPWORDS,
  tokenize,
  splitSentences,
  percentile,
  mean,
  median,
  countTermOccurrences,
  getFirstNWords,
  looksLikeQuestion,
  extractDomain,
  sha256,
} from "./textUtils";

export {
  buildOutlinePrompt,
  buildQuestionSynthesisPrompt,
  buildFactExtractionPrompt,
  approximateMetricsFromText,
  type OutlineSection,
  type OutlineResponse,
  type QuestionResponse,
  type ExtractedFact,
  type FactsResponse,
} from "./prompts";

// ─── API handlers (called by Next.js route files) ──────────────────────
export {
  createContentEditor,
  getContentEditorState,
  deleteContentEditor,
  saveDraft,
  scoreDraft,
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
} from "./api";
