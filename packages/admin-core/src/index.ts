export * from "./lib/adminTheme";
export * from "./lib/aiModels";

export * from "./types/blog-queue";
export * from "./types/content-links";
export * from "./types/knowledge-base";
export * from "./types/tracked-page";
export * from "./types/surfer";
export * from "./types/semrush";

export { default as AdminPageHeader } from "./components/AdminPageHeader";
export { default as SurferCell, type SurferCellRow } from "./components/SurferCell";
export { default as KeywordSuggestPopover } from "./components/KeywordSuggestPopover";
export { default as InlineKeywordCell } from "./components/InlineKeywordCell";
export { default as BulkPickKeywordModal } from "./components/BulkPickKeywordModal";
export { supabase, supabaseConfigured } from "./lib/supabase";
export { AuthProvider, useAuth } from "./contexts/AuthContext";
export { default as AdminGuard } from "./components/AdminGuard";
export { default as AdminSidebar } from "./components/AdminSidebar";
export { default as AdminChrome } from "./components/AdminChrome";
export { useBlogQueue } from "./hooks/useBlogQueue";
export { useSystemSettings, useAutoPublishEnabled } from "./hooks/useSystemSettings";
export { useKnowledgeBase, type KbEntryUpdates } from "./hooks/useKnowledgeBase";
export { useTrackedPages } from "./hooks/useTrackedPages";
export { useInternalLinks, type InternalLink } from "./hooks/useInternalLinks";
export { useDashboardData, formatDashboardDate, relativeTimeSince } from "./hooks/useDashboardData";
export { useAdminBlogPosts } from "./hooks/useAdminBlogPosts";
export { useSurferActions } from "./hooks/useSurferActions";
export { useBlogPostBySlug } from "./hooks/useBlogPostBySlug";
export { useLinkUtilization, type LinkUtilization, type UtilizationStatus } from "./hooks/useLinkUtilization";
export { getPublicSiteOrigin, canonicalBlogPostUrl } from "./lib/publicSiteUrl";
export { resolveTrackedPageMetadata } from "./lib/resolveTrackedPageMetadata";
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
export { useBrandSettings, type BrandSettingsRow, type BusinessHoursRow } from "./hooks/useBrandSettings";
