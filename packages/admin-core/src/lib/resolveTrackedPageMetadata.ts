import type { Metadata } from "next";
import { getPageAutoLinkRegistry } from "@sweetmedia/blog-core";

type TrackedPageMetadataRow = {
  seo_title: string | null;
  meta_description: string | null;
};

const DEFAULT_CACHE_TTL_SECONDS = 15;

function getCacheTtlSeconds(): number {
  const raw = process.env.TRACKED_PAGE_METADATA_CACHE_SECONDS;
  const parsed = raw ? Number(raw) : NaN;
  if (Number.isFinite(parsed) && parsed >= 0) {
    return Math.floor(parsed);
  }
  return DEFAULT_CACHE_TTL_SECONDS;
}

function toNonEmptyString(value: string | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function mergeTrackedMetadata(
  fallbackMetadata: Metadata,
  seoTitle: string | null,
  metaDescription: string | null
): Metadata {
  if (!seoTitle && !metaDescription) {
    return fallbackMetadata;
  }

  const metadata: Metadata = {
    ...fallbackMetadata,
    ...(seoTitle ? { title: { absolute: seoTitle } } : {}),
    ...(metaDescription ? { description: metaDescription } : {}),
  };

  if (fallbackMetadata.openGraph) {
    metadata.openGraph = {
      ...fallbackMetadata.openGraph,
      ...(seoTitle ? { title: seoTitle } : {}),
      ...(metaDescription ? { description: metaDescription } : {}),
    };
  }

  if (fallbackMetadata.twitter) {
    metadata.twitter = {
      ...fallbackMetadata.twitter,
      ...(seoTitle ? { title: seoTitle } : {}),
      ...(metaDescription ? { description: metaDescription } : {}),
    };
  }

  return metadata;
}

/**
 * Fetches SEO metadata from the Supabase REST API using Next.js native fetch
 * caching. Using native fetch (rather than unstable_cache) ensures the cache
 * is tagged correctly for revalidateTag() to work in Next.js 16.
 */
async function fetchTrackedPageMetadata(
  routePath: string
): Promise<TrackedPageMetadataRow | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer service role key (bypasses RLS) since this runs server-side only.
  // Falls back to anon key if service role is not available.
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    const url = new URL(`${supabaseUrl}/rest/v1/tracked_pages`);
    url.searchParams.set("select", "seo_title,meta_description");
    url.searchParams.set("route_path", `eq.${routePath}`);
    url.searchParams.set("is_active", "eq.true");
    url.searchParams.set("limit", "1");

    const response = await fetch(url.toString(), {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: {
        tags: ["tracked-page-metadata"],
        revalidate: getCacheTtlSeconds(),
      },
    });

    if (!response.ok) return null;

    const rows = (await response.json()) as unknown[];
    if (!Array.isArray(rows) || rows.length === 0) return null;

    return rows[0] as TrackedPageMetadataRow;
  } catch {
    return null;
  }
}

export async function resolveTrackedPageMetadata(
  routePath: string,
  fallbackMetadata: Metadata
): Promise<Metadata> {
  // Register the current page path in the per-request auto-link registry so
  // every <AutoLinkedText> on this page automatically skips self-links.
  // React.cache() is request-scoped, so this is shared with all server
  // components that render during the same request.
  getPageAutoLinkRegistry().currentPath = routePath;

  const baseMetadata: Metadata = fallbackMetadata.alternates?.canonical
    ? fallbackMetadata
    : {
        ...fallbackMetadata,
        alternates: {
          ...fallbackMetadata.alternates,
          canonical: routePath,
        },
      };

  const data = await fetchTrackedPageMetadata(routePath);
  if (!data) {
    return baseMetadata;
  }

  const seoTitle = toNonEmptyString(data.seo_title);
  const metaDescription = toNonEmptyString(data.meta_description);
  return mergeTrackedMetadata(baseMetadata, seoTitle, metaDescription);
}
