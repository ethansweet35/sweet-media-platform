import {
  computeMetricDeltas,
  gscComparisonDateRanges,
  queryGscByPage,
  queryGscByQuery,
  queryGscSiteDailySeries,
  queryGscSiteTotals,
  resolveGscAccessToken,
  type GscPageRow,
  type GscQueryRow,
} from "./gscClient";
import { fetchRecentSiteContentChanges } from "./contentChangeLogServer";
import type {
  PerformanceKeywordRow,
  PerformanceOverviewPayload,
  PerformancePageMover,
} from "../../types/performance-overview";

export type {
  PerformanceKeywordRow,
  PerformanceOverviewPayload,
  PerformancePageMover,
} from "../../types/performance-overview";

type CacheEntry = { data: PerformanceOverviewPayload; fetchedAt: number };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000;

function pagePathKey(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/$/, "").toLowerCase() || "/";
  } catch {
    return url.toLowerCase();
  }
}

function queryKey(q: string): string {
  return q.trim().toLowerCase();
}

export function buildKeywordMomentum(
  current: GscQueryRow[],
  previous: GscQueryRow[],
): {
  emerging: PerformanceKeywordRow[];
  lost: PerformanceKeywordRow[];
  topMovers: PerformanceKeywordRow[];
} {
  const prevMap = new Map(previous.map((r) => [queryKey(r.query), r]));

  const emerging = current
    .filter((r) => {
      const prev = prevMap.get(queryKey(r.query));
      return r.impressions >= 15 && (!prev || prev.impressions < 8);
    })
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 8)
    .map((r) => ({
      query: r.query,
      clicks: r.clicks,
      impressions: r.impressions,
      position: Math.round(r.position * 10) / 10,
    }));

  const curMap = new Map(current.map((r) => [queryKey(r.query), r]));

  const lost = previous
    .filter((r) => {
      const cur = curMap.get(queryKey(r.query));
      return r.impressions >= 15 && (!cur || cur.impressions < 8);
    })
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 8)
    .map((r) => ({
      query: r.query,
      clicks: r.clicks,
      impressions: r.impressions,
      position: Math.round(r.position * 10) / 10,
      impressions_prev: r.impressions,
    }));

  const topMovers = current
    .map((r) => {
      const prev = prevMap.get(queryKey(r.query));
      const clicks_delta = r.clicks - (prev?.clicks ?? 0);
      return {
        query: r.query,
        clicks: r.clicks,
        impressions: r.impressions,
        position: Math.round(r.position * 10) / 10,
        clicks_delta,
      };
    })
    .filter((r) => r.clicks_delta > 0)
    .sort((a, b) => (b.clicks_delta ?? 0) - (a.clicks_delta ?? 0))
    .slice(0, 6);

  return { emerging, lost, topMovers };
}

export function buildTopPageMovers(
  current: GscPageRow[],
  previous: GscPageRow[],
): PerformancePageMover[] {
  const prevMap = new Map(previous.map((r) => [pagePathKey(r.page), r]));

  return current
    .map((r) => {
      const prev = prevMap.get(pagePathKey(r.page));
      return {
        page: r.page,
        path: pagePathKey(r.page) || "/",
        clicks: r.clicks,
        clicks_delta: r.clicks - (prev?.clicks ?? 0),
      };
    })
    .filter((r) => r.clicks_delta > 0)
    .sort((a, b) => b.clicks_delta - a.clicks_delta)
    .slice(0, 6);
}

export async function fetchPerformanceOverview(periodDays: number): Promise<PerformanceOverviewPayload> {
  const days = Math.min(90, Math.max(7, periodDays));
  return fetchPerformanceOverviewForRanges(gscComparisonDateRanges(days), days);
}

/** GSC overview for explicit comparison windows (marketing report presets). */
export async function fetchPerformanceOverviewForRanges(
  ranges: { curStart: string; curEnd: string; prevStart: string; prevEnd: string },
  periodDaysForLabel = 28,
): Promise<PerformanceOverviewPayload> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const cacheKey = `${siteUrl}:${ranges.curStart}:${ranges.curEnd}:${ranges.prevStart}:${ranges.prevEnd}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.data;
  }
  const recent_changes = await fetchRecentSiteContentChanges(12);

  const empty: PerformanceOverviewPayload = {
    ok: true,
    period_days: periodDaysForLabel,
    date_ranges: {
      current: { start: ranges.curStart, end: ranges.curEnd },
      previous: { start: ranges.prevStart, end: ranges.prevEnd },
    },
    needs_oauth: true,
    summary: null,
    daily: [],
    emerging_keywords: [],
    lost_keywords: [],
    top_query_movers: [],
    top_page_movers: [],
    recent_changes,
  };

  if (!siteUrl) {
    return empty;
  }

  const auth = await resolveGscAccessToken();
  if (!auth.accessToken) {
    const payload = {
      ...empty,
      needs_oauth: true,
      connected_email: "connectedEmail" in auth ? auth.connectedEmail ?? null : null,
    };
    return payload;
  }

  const token = auth.accessToken;
  const [siteCurrent, sitePrevious, dailyRaw, currentPages, prevPages, currentQueries, prevQueries] =
    await Promise.all([
      queryGscSiteTotals(token, siteUrl, ranges.curStart, ranges.curEnd),
      queryGscSiteTotals(token, siteUrl, ranges.prevStart, ranges.prevEnd),
      queryGscSiteDailySeries(token, siteUrl, ranges.curStart, ranges.curEnd),
      queryGscByPage(token, siteUrl, ranges.curStart, ranges.curEnd),
      queryGscByPage(token, siteUrl, ranges.prevStart, ranges.prevEnd),
      queryGscByQuery(token, siteUrl, ranges.curStart, ranges.curEnd),
      queryGscByQuery(token, siteUrl, ranges.prevStart, ranges.prevEnd),
    ]);

  if (!siteCurrent || !sitePrevious) {
    const payload: PerformanceOverviewPayload = {
      ...empty,
      needs_oauth: false,
      no_gsc_data: true,
      connected_email: "connectedEmail" in auth ? auth.connectedEmail ?? null : null,
      recent_changes,
    };
    return payload;
  }

  const momentum =
    currentQueries && prevQueries
      ? buildKeywordMomentum(currentQueries, prevQueries)
      : { emerging: [], lost: [], topMovers: [] };

  const top_page_movers =
    currentPages && prevPages ? buildTopPageMovers(currentPages, prevPages) : [];

  const payload: PerformanceOverviewPayload = {
    ok: true,
    period_days: periodDaysForLabel,
    date_ranges: {
      current: { start: ranges.curStart, end: ranges.curEnd },
      previous: { start: ranges.prevStart, end: ranges.prevEnd },
    },
    needs_oauth: false,
    connected_email: "connectedEmail" in auth ? auth.connectedEmail ?? null : null,
    summary: {
      current: {
        clicks: siteCurrent.clicks,
        impressions: siteCurrent.impressions,
        ctr: siteCurrent.ctr,
        position: siteCurrent.position,
      },
      previous: {
        clicks: sitePrevious.clicks,
        impressions: sitePrevious.impressions,
        ctr: sitePrevious.ctr,
        position: sitePrevious.position,
      },
      deltas: computeMetricDeltas(siteCurrent, sitePrevious),
    },
    daily: dailyRaw.map((d) => ({
      date: d.date,
      clicks: d.clicks,
      impressions: d.impressions,
    })),
    emerging_keywords: momentum.emerging,
    lost_keywords: momentum.lost,
    top_query_movers: momentum.topMovers,
    top_page_movers,
    recent_changes,
  };

  cache.set(cacheKey, { data: payload, fetchedAt: Date.now() });
  return payload;
}

export async function handlePerformanceOverviewGet(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") ?? "28", 10);
  const data = await fetchPerformanceOverview(days);
  return Response.json(data);
}
