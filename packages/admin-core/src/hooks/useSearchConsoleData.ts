"use client";

import { useState, useEffect, useRef } from "react";

export type GscMetrics = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/**
 * Fetches Google Search Console search analytics for the current site and
 * returns a map of page path → metrics for O(1) lookup in admin tables.
 *
 * Paths are normalised to lower-case route paths (e.g. "/about") by stripping
 * the site origin from the full URL returned by the GSC API.
 *
 * Requires the app to have `/api/admin/search-console` route which uses the
 * GOOGLE_INDEXING_CLIENT_EMAIL + GOOGLE_INDEXING_PRIVATE_KEY env vars and the
 * NEXT_PUBLIC_SITE_URL as the GSC property.
 */
export function useSearchConsoleData(days = 28) {
  const [data, setData] = useState<Record<string, GscMetrics>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/search-console?days=${days}`);
        if (!res.ok) {
          const json = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }

        const json = (await res.json()) as {
          rows: { page: string; clicks: number; impressions: number; ctr: number; position: number }[];
        };

        if (cancelled) return;

        // Build path → metrics map, stripping origin prefix
        const map: Record<string, GscMetrics> = {};
        for (const row of json.rows ?? []) {
          let path = row.page;
          try {
            path = new URL(row.page).pathname;
          } catch {
            // already a path
          }
          path = path.toLowerCase().replace(/\/$/, "") || "/";
          map[path] = {
            clicks: row.clicks,
            impressions: row.impressions,
            ctr: row.ctr,
            position: row.position,
          };
        }
        setData(map);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [days]);

  return { data, loading, error };
}
