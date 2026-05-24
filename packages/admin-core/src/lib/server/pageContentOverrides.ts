import { cache } from "react";

/**
 * Per-field text/image override values that back the inline page editor.
 *
 * Each editable slot on a page is keyed by `(route_path, field_key)` and
 * stores both a pending draft value (visible only in edit mode) and a
 * live published value (visible to all visitors). The page's hardcoded
 * default is used when neither is set.
 */
export type PageContentFieldType = "text" | "rich_text" | "image" | "icon";

export interface PageContentOverrideRow {
  field_key: string;
  field_type: PageContentFieldType;
  draft_value: string | null;
  published_value: string | null;
  draft_updated_at: string | null;
  published_at: string | null;
  updated_by: string | null;
}

export interface PageContentOverrideMap {
  /** Map of field_key -> override row. */
  byKey: Map<string, PageContentOverrideRow>;
  /** Route path this map was fetched for. */
  routePath: string;
}

const EMPTY_MAP: PageContentOverrideMap = { byKey: new Map(), routePath: "" };
const DEFAULT_CACHE_TTL_SECONDS = 15;

function getCacheTtlSeconds(): number {
  const raw = process.env.PAGE_CONTENT_OVERRIDES_CACHE_SECONDS;
  const parsed = raw ? Number(raw) : NaN;
  if (Number.isFinite(parsed) && parsed >= 0) {
    return Math.floor(parsed);
  }
  return DEFAULT_CACHE_TTL_SECONDS;
}

function normalizeRoutePath(routePath: string): string {
  if (!routePath) return "/";
  let trimmed = routePath.trim();
  if (!trimmed.startsWith("/")) trimmed = `/${trimmed}`;
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
}

/** Tag every cached fetch with both a per-route tag and a global tag. */
export function getPageContentCacheTags(routePath: string): string[] {
  const normalized = normalizeRoutePath(routePath);
  return [`page-content:${normalized}`, "page-content"];
}

async function fetchPageContentRows(
  routePath: string,
  options: { includeDrafts: boolean },
): Promise<PageContentOverrideRow[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = options.includeDrafts
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return [];

  const normalized = normalizeRoutePath(routePath);

  try {
    const url = new URL(`${supabaseUrl}/rest/v1/page_content_overrides`);
    url.searchParams.set(
      "select",
      "field_key,field_type,draft_value,published_value,draft_updated_at,published_at,updated_by",
    );
    url.searchParams.set("route_path", `eq.${normalized}`);
    if (!options.includeDrafts) {
      url.searchParams.set("published_value", "not.is.null");
    }

    const response = await fetch(url.toString(), {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: options.includeDrafts
        ? { revalidate: 0 }
        : {
            tags: getPageContentCacheTags(normalized),
            revalidate: getCacheTtlSeconds(),
          },
    });

    if (!response.ok) return [];
    const rows = (await response.json()) as unknown[];
    if (!Array.isArray(rows)) return [];
    return rows as PageContentOverrideRow[];
  } catch {
    return [];
  }
}

function rowsToMap(rows: PageContentOverrideRow[], routePath: string): PageContentOverrideMap {
  const byKey = new Map<string, PageContentOverrideRow>();
  for (const row of rows) {
    if (row?.field_key) byKey.set(row.field_key, row);
  }
  return { byKey, routePath };
}

/**
 * Fetch only the published overrides for a route, cached via Next fetch
 * with `tags: page-content:<route>` so a publish action can revalidate
 * the page instantly. Safe to call from anonymous server contexts.
 */
async function fetchPublishedPageContentInternal(
  routePath: string,
): Promise<PageContentOverrideMap> {
  if (!routePath) return EMPTY_MAP;
  const rows = await fetchPageContentRows(routePath, { includeDrafts: false });
  return rowsToMap(rows, normalizeRoutePath(routePath));
}

/**
 * Fetch BOTH draft and published overrides for a route. Used inside the
 * admin API routes (publish/discard) and inside edit-mode rendering so
 * admins see their drafts before publishing. Requires service role.
 */
export async function fetchAllPageContent(
  routePath: string,
): Promise<PageContentOverrideMap> {
  if (!routePath) return EMPTY_MAP;
  const rows = await fetchPageContentRows(routePath, { includeDrafts: true });
  return rowsToMap(rows, normalizeRoutePath(routePath));
}

/**
 * Request-scoped cached fetcher. Multiple <EditableText> / <EditableImage>
 * server components on the same page share one Supabase request per page
 * render, thanks to React's built-in cache().
 */
export const getPageContentForRequest = cache(
  async (routePath: string): Promise<PageContentOverrideMap> => {
    return fetchPublishedPageContentInternal(routePath);
  },
);

/** Public alias preserved for external imports and clarity. */
export const fetchPublishedPageContent = fetchPublishedPageContentInternal;

/**
 * Resolve the effective value for a single field, respecting the field
 * type. Order of preference depends on viewing mode:
 *
 *   - public / live: published_value -> fallback
 *   - admin viewing draft: draft_value -> published_value -> fallback
 *
 * Returns `null` when no override applies (caller should render fallback).
 */
export function resolvePageContentValue(
  override: PageContentOverrideRow | undefined,
  options: { mode: "published" | "draft" },
): string | null {
  if (!override) return null;
  if (options.mode === "draft") {
    if (typeof override.draft_value === "string" && override.draft_value.length > 0) {
      return override.draft_value;
    }
  }
  if (typeof override.published_value === "string" && override.published_value.length > 0) {
    return override.published_value;
  }
  return null;
}
