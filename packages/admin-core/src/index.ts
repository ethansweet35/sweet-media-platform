export * from "./lib/adminTheme";
export * from "./lib/adminNav";
export * from "./lib/blogPipeline";
export * from "./lib/adminCommandPalette";
export * from "./lib/aiModels";

export * from "./types/blog-queue";
export * from "./types/content-links";
export * from "./types/knowledge-base";
export * from "./types/tracked-page";
export * from "./types/semrush";

export {
  cleanSeedPhrase,
  stripBrandSuffix,
  buildPrimaryPageKeywordSeed,
  derivePageKeywordResearchSeed,
  toPageKeywordSeedContextPayload,
  type PageKeywordSeedContextPayload,
  type PageKeywordSeedInput,
} from "./lib/seedCleaner";

export { AnalyticsWrapper } from "./components/AnalyticsWrapper";
export { default as AdminPageHeader } from "./components/AdminPageHeader";
export { default as OptimizationStatusBanner } from "./components/OptimizationStatusBanner";
export { default as ContentEditorCell, type ContentEditorCellRow } from "./components/ContentEditorCell";
export { useContentEditorRowActions, type ContentEditorRowRef } from "./hooks/useContentEditorRowActions";
export { default as KeywordSuggestPopover } from "./components/KeywordSuggestPopover";
export { default as SeoImpactTimelinePopover } from "./components/SeoImpactTimelinePopover";
export {
  diffTrackedPageUpdates,
  diffBlogPostUpdates,
  postContentChangeLog,
  blogPostForChangeDiff,
  formatChangeValue,
  type ContentEntityType,
  type ContentChangeInput,
} from "./lib/contentChangeLog";
export { default as InlineKeywordCell } from "./components/InlineKeywordCell";
export { default as BulkPickKeywordModal } from "./components/BulkPickKeywordModal";
export { default as RankingKeywordsPopover } from "./components/RankingKeywordsPopover";
export type {
  SemrushRankingKeywordDTO,
  SemrushRankingKeywordsResponse,
} from "./types/semrush";
export { supabase, supabaseConfigured } from "./lib/supabase";
export { AuthProvider, useAuth } from "./contexts/AuthContext";
export { default as AdminGuard } from "./components/AdminGuard";
export { default as AdminSidebar } from "./components/AdminSidebar";
export { default as AdminChrome } from "./components/AdminChrome";
export { useBlogQueue } from "./hooks/useBlogQueue";
export { useSystemSettings, useAutoPublishEnabled } from "./hooks/useSystemSettings";
export { useKnowledgeBase, type KbEntryUpdates } from "./hooks/useKnowledgeBase";
export { useTrackedPages } from "./hooks/useTrackedPages";
export {
  useAiOptimizeRuns,
  type AiOptimizeRun,
  type AiOptimizeRunStatus,
} from "./hooks/useAiOptimizeRuns";
export { useInternalLinks, type InternalLink } from "./hooks/useInternalLinks";
export { AdminCommandPaletteProvider, useAdminCommandPalette } from "./components/AdminCommandPalette";
export { useContentPipeline } from "./hooks/useContentPipeline";
export { useDashboardData, formatDashboardDate, relativeTimeSince } from "./hooks/useDashboardData";
export { useAdminBlogPosts } from "./hooks/useAdminBlogPosts";
export { useAdminBlogCategories } from "./hooks/useAdminBlogCategories";
export { useSearchConsoleData, type GscMetrics } from "./hooks/useSearchConsoleData";
export { usePerformanceOverview } from "./hooks/usePerformanceOverview";
export type { PerformanceOverviewPayload } from "./types/performance-overview";
export { useBlogPostBySlug } from "./hooks/useBlogPostBySlug";
export { useLinkUtilization, type LinkUtilization, type UtilizationStatus } from "./hooks/useLinkUtilization";
export { getPublicSiteOrigin, canonicalBlogPostUrl } from "./lib/publicSiteUrl";
export { resolveTrackedPageMetadata } from "./lib/resolveTrackedPageMetadata";
export {
  mergeRobotsDisallow,
  NOT_FOUND_PAGE_METADATA,
  DRAFT_PAGE_ROBOTS,
  withDraftPageRobots,
  WP_LEGACY_ROBOTS_DISALLOW,
} from "./lib/wpLegacySeo";
// scanAppRoutes / syncTrackedPages are server-only (use node:fs).
// Import them from "@sweetmedia/admin-core/server" in Node.js scripts.
export {
  buildSitemapEntries,
  buildSitemapPartitionEntries,
  buildSitemapPartitions,
  collectSitemapUrls,
  discoverSitemapGroups,
  getChildSitemapPath,
  getChildSitemapUrl,
  isSitemapIndexXml,
  parseSitemapLocations,
  toSitemapIndexXml,
  toSitemapXml,
  DEFAULT_SITEMAP_CONFIG,
  SITEMAP_REVALIDATE_SECONDS,
  type SitemapConfig,
  type SitemapEntry,
  type SitemapGroupDefinition,
  type SitemapGroupKind,
  type SitemapPageRow,
  type SitemapPartition,
  type SitemapPostRow,
} from "./lib/sitemap";
export { default as AdminSitemapPage } from "./views/AdminSitemapPage";
export { default as AdminIndexingStatusPage } from "./views/AdminIndexingStatusPage";
export { default as AdminTrackedPagesPage } from "./views/AdminTrackedPagesPage";
export { default as AdminLoginPage } from "./views/AdminLoginPage";
export { default as AdminDashboardPage } from "./views/AdminDashboardPage";
export { default as AdminSearchConsolePage } from "./views/AdminSearchConsolePage";
export { default as AdminBlogsPage } from "./views/AdminBlogsPage";
export { default as AdminBlogWriterPage } from "./views/AdminBlogWriterPage";
export { default as AdminBlogEditPage } from "./views/AdminBlogEditPage";
export { default as AdminContentCalendarPage } from "./views/AdminContentCalendarPage";
export { default as AdminContentLinksPage } from "./views/AdminContentLinksPage";
export { default as AdminFixTablesPage } from "./views/AdminFixTablesPage";
export { default as AdminInternalLinksPage } from "./views/AdminInternalLinksPage";
export { default as AdminKnowledgeBasePage } from "./views/AdminKnowledgeBasePage";
export { default as AdminLinkHealthPage } from "./views/AdminLinkHealthPage";
export { default as AdminSetupPage } from "./views/AdminSetupPage";
export { default as AdminBrandSettingsPage } from "./views/AdminBrandSettingsPage";
export { default as AdminKeywordResearchPage } from "./views/AdminKeywordResearchPage";
export { default as AdminContentEditorPage } from "./views/AdminContentEditorPage";
export { default as AdminContentEditorBriefPage } from "./views/AdminContentEditorBriefPage";
export {
  useContentEditors,
  useContentEditor,
  useLiveScore,
  useDraftAutosave,
  type DraftInputs,
} from "./hooks/useContentEditors";
export type {
  ContentEditorListRow,
  ContentEditorRow as ContentEditorClientRow,
  ContentEditorCompetitorRow as ContentEditorClientCompetitorRow,
  ContentEditorTermRow as ContentEditorClientTermRow,
  ContentEditorQuestionRow as ContentEditorClientQuestionRow,
  ContentEditorFactRow as ContentEditorClientFactRow,
  ContentEditorOutlineRow as ContentEditorClientOutlineRow,
  ContentEditorDraftRow as ContentEditorClientDraftRow,
  ContentEditorState as ContentEditorClientState,
  ContentEditorStatus,
  TermStatus,
  StructuralStatus,
  PlacementChecks,
  TermUsage,
  StructuralCheck,
  ScoreBreakdown,
  EeatBreakdown,
  EeatCheck,
  EeatCheckKey,
} from "./types/content-editor";
export {
  STATUS_LABELS,
  STATUS_IS_PROCESSING,
  EEAT_CHECK_LABELS,
} from "./types/content-editor";
export { useBrandSettings, type BrandSettingsRow, type BusinessHoursRow } from "./hooks/useBrandSettings";
