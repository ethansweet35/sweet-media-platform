export * from "./types/blog";
export { supabase } from "./lib/supabase";
export { useBlogPosts, useBlogPost, useBlogCategories, useSearchBlogPosts, usePaginatedBlogPosts } from "./hooks/useBlogPosts";
export * from "./lib/autoInternalLinks";
export { getInternalLinkMappings, getPageAutoLinkRegistry } from "./lib/getInternalLinkMappings";
export { AutoLinkedText, initPageAutoLinks } from "./components/AutoLinkedText";
export { AutoLinkedTextClient } from "./components/AutoLinkedTextClient";

export * from "./types/brandSettings";
export { getBrandSettings } from "./lib/getBrandSettings";
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
