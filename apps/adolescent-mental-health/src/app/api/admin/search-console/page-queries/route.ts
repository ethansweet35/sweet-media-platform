import { NextResponse } from "next/server";
import {
  resolveGscAccessToken,
  queryGscPageKeywords,
} from "@sweetmedia/admin-core/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory cache per page URL — 1-hour TTL, cleared on server restart.
type CacheEntry = {
  rows: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  fetchedAt: number;
};
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * GET /api/admin/search-console/page-queries?url=<encoded-page-url>&days=90
 *
 * Returns all GSC search queries (keywords) that generated impressions for the
 * given page URL over the requested date range, sorted by impressions descending.
 *
 * Auth follows the same priority as the main search-console route:
 *   1. OAuth refresh token from system_settings
 *   2. Service account (GOOGLE_INDEXING_CLIENT_EMAIL / GOOGLE_INDEXING_PRIVATE_KEY)
 */
export async function GET(request: Request) {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!rawSiteUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL is not set." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const pageUrl = searchParams.get("url")?.trim();
  const days = Math.min(90, Math.max(1, parseInt(searchParams.get("days") ?? "90", 10)));

  if (!pageUrl) {
    return NextResponse.json({ error: "url query parameter is required." }, { status: 400 });
  }

  const cacheKey = `${pageUrl}:${days}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ ok: true, rows: cached.rows, cached: true });
  }

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // GSC lags ~3 days
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  const auth = await resolveGscAccessToken();

  if (!auth.accessToken) {
    return NextResponse.json({ ok: false, needs_oauth: true, rows: [] }, { status: 200 });
  }

  const rows = await queryGscPageKeywords(
    auth.accessToken,
    rawSiteUrl,
    pageUrl,
    formatDate(startDate),
    formatDate(endDate),
  );

  if (rows === null) {
    return NextResponse.json(
      { ok: false, error: "GSC returned an error for all site URL variants.", rows: [] },
      { status: 502 },
    );
  }
  // rows === [] means the property responded but no data for this page/date range

  cache.set(cacheKey, { rows, fetchedAt: Date.now() });

  return NextResponse.json({ ok: true, rows, auth_method: auth.method });
}
