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
