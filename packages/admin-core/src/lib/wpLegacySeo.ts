import type { Metadata } from "next";

/**
 * WordPress archive, feed, and core paths that should not be crawled on migrated
 * Next.js brands. Covers legacy URLs still discovered via backlinks/sitemaps.
 */
export const WP_LEGACY_ROBOTS_DISALLOW = [
  "/tag/",
  "/tag",
  "/category/",
  "/category",
  "/feed/",
  "/feed",
  "/author/",
  "/author",
  "/wp-admin/",
  "/wp-admin",
  "/wp-content/",
  "/wp-content",
  "/wp-includes/",
  "/wp-includes",
  "/xmlrpc.php",
] as const;

/** Merge brand-specific robots disallow paths with WordPress legacy paths (deduped). */
export function mergeRobotsDisallow(brandDisallow: string[]): string[] {
  return [...new Set([...brandDisallow, ...WP_LEGACY_ROBOTS_DISALLOW])];
}

/** Use on `src/app/not-found.tsx` so 404s (including dead WP URLs) are not indexed. */
export const NOT_FOUND_PAGE_METADATA: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** Robots directive for pre-launch pages (still reachable by URL, excluded from sitemap via `is_active`). */
export const DRAFT_PAGE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
};

/** Merge draft robots into metadata returned from `generateMetadata`. */
export function withDraftPageRobots(metadata: Metadata): Metadata {
  return { ...metadata, robots: DRAFT_PAGE_ROBOTS };
}
