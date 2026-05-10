import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

type TrackedPageMetadataRow = {
  seo_title: string | null;
  meta_description: string | null;
};

let trackedPagesClient: SupabaseClient | null = null;
const DEFAULT_CACHE_TTL_SECONDS = 15;

function getTrackedPagesClient(): SupabaseClient | null {
  if (trackedPagesClient) return trackedPagesClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  trackedPagesClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return trackedPagesClient;
}

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

async function fetchTrackedPageMetadata(routePath: string): Promise<TrackedPageMetadataRow | null> {
  const client = getTrackedPagesClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from("tracked_pages")
      .select("seo_title, meta_description")
      .eq("route_path", routePath)
      .eq("is_active", true)
      .maybeSingle<TrackedPageMetadataRow>();

    if (error || !data) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

const fetchTrackedPageMetadataCached = unstable_cache(
  async (routePath: string) => fetchTrackedPageMetadata(routePath),
  ["tracked-page-metadata"],
  { revalidate: getCacheTtlSeconds(), tags: ["tracked-page-metadata"] }
);

export async function resolveTrackedPageMetadata(
  routePath: string,
  fallbackMetadata: Metadata
): Promise<Metadata> {
  const baseMetadata: Metadata = fallbackMetadata.alternates?.canonical
    ? fallbackMetadata
    : {
        ...fallbackMetadata,
        alternates: {
          ...fallbackMetadata.alternates,
          canonical: routePath,
        },
      };

  const data = await fetchTrackedPageMetadataCached(routePath);
  if (!data) {
    return baseMetadata;
  }

  const seoTitle = toNonEmptyString(data.seo_title);
  const metaDescription = toNonEmptyString(data.meta_description);
  return mergeTrackedMetadata(baseMetadata, seoTitle, metaDescription);
}
