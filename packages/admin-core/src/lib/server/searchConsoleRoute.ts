import { NextResponse } from "next/server";
import {
  queryGscByPage,
  queryGscPageKeywords,
  resolveGscAccessToken,
  type GscPageRow,
  type GscQueryRow,
} from "./gscClient";

const CACHE_TTL_MS = 60 * 60 * 1000;

type PageCacheEntry = { data: GscPageRow[]; fetchedAt: number };
const pageCache = new Map<string, PageCacheEntry>();

type QueryCacheEntry = { rows: GscQueryRow[]; fetchedAt: number };
const queryCache = new Map<string, QueryCacheEntry>();

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function gscDateWindow(days: number): { startDate: string; endDate: string } {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
}

/**
 * GET /api/admin/search-console?days=28
 *
 * Returns page-level GSC aggregates for the current brand.
 * Auth: per-brand system_settings → shared env token → service account.
 */
export async function handleSearchConsoleGet(request: Request): Promise<Response> {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!rawSiteUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL is not set." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const days = Math.min(90, Math.max(1, parseInt(searchParams.get("days") ?? "28", 10)));

  const cacheKey = `${rawSiteUrl}:${days}`;
  const cached = pageCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ rows: cached.data, cached: true });
  }

  const { startDate, endDate } = gscDateWindow(days);
  const auth = await resolveGscAccessToken();

  if (!auth.accessToken) {
    return NextResponse.json({ rows: [], needs_oauth: true }, { status: 200 });
  }

  const rows = await queryGscByPage(auth.accessToken, rawSiteUrl, startDate, endDate);

  if (rows === null) {
    return NextResponse.json(
      {
        error: "Search Console returned an error for all site URL variants.",
        needs_oauth: false,
        auth_method: auth.method,
      },
      { status: 502 },
    );
  }

  pageCache.set(cacheKey, { data: rows, fetchedAt: Date.now() });
  return NextResponse.json({ rows, auth_method: auth.method });
}

/**
 * GET /api/admin/search-console/page-queries?url=<page-url>&days=90
 */
export async function handleSearchConsolePageQueriesGet(request: Request): Promise<Response> {
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
  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ ok: true, rows: cached.rows, cached: true });
  }

  const { startDate, endDate } = gscDateWindow(days);
  const auth = await resolveGscAccessToken();

  if (!auth.accessToken) {
    return NextResponse.json({ ok: false, needs_oauth: true, rows: [] }, { status: 200 });
  }

  const rows = await queryGscPageKeywords(
    auth.accessToken,
    rawSiteUrl,
    pageUrl,
    startDate,
    endDate,
  );

  if (rows === null) {
    return NextResponse.json(
      { ok: false, error: "GSC returned an error for all site URL variants.", rows: [] },
      { status: 502 },
    );
  }

  queryCache.set(cacheKey, { rows, fetchedAt: Date.now() });
  return NextResponse.json({ ok: true, rows, auth_method: auth.method });
}
