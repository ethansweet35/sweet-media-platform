export * from "./types/blog";
export {
  markdownToSections,
  stripInlineMarkdown,
  looksLikeMarkdown,
  normalizeSections,
  parseEmbeddedHeading,
  isResourceSectionHeading,
} from "./lib/markdownToSections";
export { sectionsToMarkdown } from "./lib/sectionsToMarkdown";
export { supabase } from "./lib/supabase";
export { useBlogPosts, useBlogPost, useBlogCategories, useSearchBlogPosts, usePaginatedBlogPosts } from "./hooks/useBlogPosts";
export * from "./lib/autoInternalLinks";
export { getInternalLinkMappings, getPageAutoLinkRegistry } from "./lib/getInternalLinkMappings";
export { AutoLinkedText, initPageAutoLinks } from "./components/AutoLinkedText";
export { AutoLinkedTextSync } from "./components/AutoLinkedTextSync";
export { AutoLinkedTextClient } from "./components/AutoLinkedTextClient";

export * from "./types/brandSettings";
export { getBrandSettings } from "./lib/getBrandSettings";
export {
  fetchBlogCategoryNames,
  type FetchBlogCategoryNamesOptions,
} from "./lib/fetchBlogCategoryNames";
export {
  BRAND_BLOG_CATEGORY_DEFAULTS,
  TEMPLATE_BLOG_CATEGORY_NAMES,
  getBrandBlogCategoryDefaults,
  isTemplateBlogCategoryList,
  blogCategoryNameToSlug,
} from "./lib/brandBlogCategoryDefaults";
export { defaultBrandSettings, mergeBrandSettings } from "./lib/brandSettingsFallback";

export {
  fetchPublishedBlogPostForRender,
  fetchPublishedBlogPostsForListing,
  fetchPublishedBlogPostSlugs,
  fetchManualLinkMappingsForServer,
} from "./lib/fetchBlogPostForRender";
export {
  fetchPublishedBlogPostForMetadata,
  type BlogPostMetadataRow,
} from "./lib/fetchBlogPostForMetadata";
