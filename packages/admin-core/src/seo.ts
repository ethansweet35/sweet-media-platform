/**
 * Server-safe SEO helpers — import from `@sweetmedia/admin-core/seo` in page.tsx
 * files instead of the main barrel.
 */
export { resolveTrackedPageMetadata } from "./lib/resolveTrackedPageMetadata";
export {
  mergeRobotsDisallow,
  NEXT_INTERNAL_ROBOTS_DISALLOW,
  NOT_FOUND_PAGE_METADATA,
  DRAFT_PAGE_ROBOTS,
  withDraftPageRobots,
  WP_LEGACY_ROBOTS_DISALLOW,
} from "./lib/wpLegacySeo";
