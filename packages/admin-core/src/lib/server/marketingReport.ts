/**
 * Builds the unified MarketingReportPayload consumed by both the admin
 * dashboard preview and the public client report at /report/[token].
 *
 * Organic search is pulled live from Search Console (already cached). Paid
 * media, Google Business Profile, and PageSpeed are read from channel_metrics
 * (populated by the ingest pipeline). Channels with no config/data degrade
 * gracefully to a "connect" state instead of erroring.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ADS_CONVERSION_GOALS,
  META_ADS_CONVERSION_GOALS,
  goalLabelForAction,
  isTrackedAdsGoal,
  isTrackedMetaGoal,
  metaGoalLabelForAction,
} from "../adsConversionGoals";
import {
  gscRangesForPeriod,
  isoDateInTz,
  parseMarketingPeriodParam,
  resolveMarketingPeriod,
  type MarketingPeriodRanges,
} from "../marketingPeriod";
import { fetchPerformanceOverviewForRanges } from "./performanceOverview";
import {
  fetchChannelMetrics,
  getMetricsAdminClient,
  ingestChannelMetrics,
} from "./channelMetrics";
import type {
  AdsConversionGoalRow,
  AdsSourceSummary,
  CallTrackingProvider,
  CallTrackingReport,
  CallTrackingSourceSummary,
  CallTrackingTagSummary,
  ChannelMetricRow,
  GmbSummary,
  MarketingPeriodId,
  MarketingReportPayload,
  MetricDelta,
  PageSpeedEntry,
} from "../../types/marketing";

function delta(current: number, previous: number): MetricDelta {
  const d = current - previous;
  const pct = previous === 0 ? (current > 0 ? 100 : null) : Math.round((d / previous) * 1000) / 10;
  return { current, previous, delta: d, deltaPct: pct };
}

type ComparisonRanges = { curStart: string; curEnd: string; prevStart: string; prevEnd: string };

function periodToRanges(period: MarketingPeriodRanges): ComparisonRanges {
  return {
    curStart: period.curStart,
    curEnd: period.curEnd,
    prevStart: period.prevStart,
    prevEnd: period.prevEnd,
  };
}

function cpaDelta(spend: MetricDelta, goals: MetricDelta): MetricDelta {
  const cur = goals.current > 0 ? spend.current / goals.current : 0;
  const prev = goals.previous > 0 ? spend.previous / goals.previous : 0;
  return delta(Math.round(cur * 100) / 100, Math.round(prev * 100) / 100);
}

function inRange(date: string, start: string, end: string): boolean {
  return date >= start && date <= end;
}

function sumBy(
  rows: ChannelMetricRow[],
  predicate: (r: ChannelMetricRow) => boolean,
): number {
  return rows.reduce((acc, r) => (predicate(r) ? acc + Number(r.value || 0) : acc), 0);
}

function buildConversionGoalsForSource(
  ads: ChannelMetricRow[],
  ranges: ComparisonRanges,
  source: string,
  goalDefs: typeof ADS_CONVERSION_GOALS,
  isTracked: (action: string) => boolean,
  labelFor: (action: string) => string | null,
): { goals: AdsConversionGoalRow[]; total: MetricDelta } {
  const actionRows = ads.filter(
    (r) => r.metric === "conversions_by_action" && String(r.dimensions?.source ?? "") === source,
  );
  const byLabel = new Map<string, { cur: number; prev: number }>();

  for (const row of actionRows) {
    const action = String(row.dimensions?.conversion_action ?? "");
    if (!isTracked(action)) continue;
    const label = labelFor(action) ?? action;
    const bucket = byLabel.get(label) ?? { cur: 0, prev: 0 };
    const v = Number(row.value || 0);
    if (inRange(row.metric_date, ranges.curStart, ranges.curEnd)) bucket.cur += v;
    if (inRange(row.metric_date, ranges.prevStart, ranges.prevEnd)) bucket.prev += v;
    byLabel.set(label, bucket);
  }

  const order = new Map(goalDefs.map((g, i) => [g.label, i]));
  const goals: AdsConversionGoalRow[] = [...byLabel.entries()]
    .sort((a, b) => (order.get(a[0]) ?? 99) - (order.get(b[0]) ?? 99))
    .map(([name, { cur, prev }]) => ({
      name,
      conversions: delta(Math.round(cur * 10) / 10, Math.round(prev * 10) / 10),
    }));

  const totalCur = goals.reduce((s, g) => s + g.conversions.current, 0);
  const totalPrev = goals.reduce((s, g) => s + g.conversions.previous, 0);
  return { goals, total: delta(Math.round(totalCur * 10) / 10, Math.round(totalPrev * 10) / 10) };
}

function buildGoogleConversionGoals(
  ads: ChannelMetricRow[],
  ranges: ComparisonRanges,
): { goals: AdsConversionGoalRow[]; total: MetricDelta } {
  return buildConversionGoalsForSource(
    ads,
    ranges,
    "google",
    ADS_CONVERSION_GOALS,
    isTrackedAdsGoal,
    goalLabelForAction,
  );
}

function buildMetaConversionGoals(
  ads: ChannelMetricRow[],
  ranges: ComparisonRanges,
): { goals: AdsConversionGoalRow[]; total: MetricDelta } {
  return buildConversionGoalsForSource(
    ads,
    ranges,
    "facebook",
    META_ADS_CONVERSION_GOALS,
    isTrackedMetaGoal,
    metaGoalLabelForAction,
  );
}

function buildAds(rows: ChannelMetricRow[], ranges: ComparisonRanges): AdsSourceSummary[] {
  const ads = rows.filter((r) => r.channel === "ads");
  if (ads.length === 0) return [];

  const sources = Array.from(
    new Set(
      ads
        .filter((r) => r.metric !== "conversions_by_action")
        .map((r) => String(r.dimensions?.source ?? r.dim_key ?? "unknown")),
    ),
  ).sort();

  const metricDelta = (source: string, metric: string): MetricDelta => {
    const cur = sumBy(
      ads,
      (r) =>
        String(r.dimensions?.source ?? r.dim_key) === source &&
        r.metric === metric &&
        inRange(r.metric_date, ranges.curStart, ranges.curEnd),
    );
    const prev = sumBy(
      ads,
      (r) =>
        String(r.dimensions?.source ?? r.dim_key) === source &&
        r.metric === metric &&
        inRange(r.metric_date, ranges.prevStart, ranges.prevEnd),
    );
    return delta(Math.round(cur * 100) / 100, Math.round(prev * 100) / 100);
  };

  const googleGoals = buildGoogleConversionGoals(ads, ranges);
  const metaGoals = buildMetaConversionGoals(ads, ranges);

  return sources.map((source) => {
    const spend = metricDelta(source, "spend");
    const isGoogle = source === "google";
    const isMeta = source === "facebook";
    const platformGoals = isGoogle ? googleGoals : isMeta ? metaGoals : null;
    const goalConversions = platformGoals?.total ?? null;
    const cpa =
      platformGoals && goalConversions && goalConversions.current > 0
        ? cpaDelta(spend, goalConversions)
        : null;

    return {
      source,
      clicks: metricDelta(source, "clicks"),
      impressions: metricDelta(source, "impressions"),
      spend,
      conversions: metricDelta(source, "conversions"),
      goal_conversions: goalConversions,
      cpa,
      conversion_goals: platformGoals?.goals ?? [],
    };
  });
}

function buildGmb(rows: ChannelMetricRow[], ranges: ComparisonRanges): GmbSummary | null {
  const gmb = rows.filter((r) => r.channel === "gmb");
  if (gmb.length === 0) return null;

  const metricDelta = (metric: string): MetricDelta => {
    const cur = sumBy(gmb, (r) => r.metric === metric && inRange(r.metric_date, ranges.curStart, ranges.curEnd));
    const prev = sumBy(gmb, (r) => r.metric === metric && inRange(r.metric_date, ranges.prevStart, ranges.prevEnd));
    return delta(cur, prev);
  };

  return {
    views: metricDelta("views"),
    calls: metricDelta("calls"),
    directions: metricDelta("directions"),
    website_clicks: metricDelta("website_clicks"),
  };
}

function sumTagsInRange(
  rows: ChannelMetricRow[],
  channel: CallTrackingProvider,
  start: string,
  end: string,
): Map<string, number> {
  const out = new Map<string, number>();
  for (const r of rows) {
    if (r.channel !== channel || r.metric !== "calls_by_tag") continue;
    if (!inRange(r.metric_date, start, end)) continue;
    const tag = String(r.dimensions?.tag ?? (r.dim_key.replace(/^tag\|/, "") || "(untagged)"));
    out.set(tag, (out.get(tag) ?? 0) + Number(r.value || 0));
  }
  return out;
}

function buildCallTracking(
  rows: ChannelMetricRow[],
  ranges: ComparisonRanges,
): CallTrackingReport | null {
  const providers: { channel: CallTrackingProvider; label: string }[] = [
    { channel: "callrail", label: "CallRail" },
    { channel: "ctm", label: "Call Tracking Metrics" },
  ];

  const sources: CallTrackingSourceSummary[] = [];

  for (const { channel, label } of providers) {
    const channelRows = rows.filter((r) => r.channel === channel);
    if (channelRows.length === 0) continue;

    const callsCur = sumBy(
      channelRows,
      (r) =>
        r.metric === "calls" &&
        r.dim_key === "total" &&
        inRange(r.metric_date, ranges.curStart, ranges.curEnd),
    );
    const callsPrev = sumBy(
      channelRows,
      (r) =>
        r.metric === "calls" &&
        r.dim_key === "total" &&
        inRange(r.metric_date, ranges.prevStart, ranges.prevEnd),
    );

    const formsCur = sumBy(
      channelRows,
      (r) =>
        r.metric === "forms" &&
        r.dim_key === "total" &&
        inRange(r.metric_date, ranges.curStart, ranges.curEnd),
    );
    const formsPrev = sumBy(
      channelRows,
      (r) =>
        r.metric === "forms" &&
        r.dim_key === "total" &&
        inRange(r.metric_date, ranges.prevStart, ranges.prevEnd),
    );

    const curTags = sumTagsInRange(channelRows, channel, ranges.curStart, ranges.curEnd);
    const prevTags = sumTagsInRange(channelRows, channel, ranges.prevStart, ranges.prevEnd);

    const top_tags: CallTrackingTagSummary[] = [...curTags.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag, count]) => ({
        tag,
        calls: delta(count, prevTags.get(tag) ?? 0),
      }));

    sources.push({
      provider: channel,
      label,
      calls: delta(Math.round(callsCur), Math.round(callsPrev)),
      forms: delta(Math.round(formsCur), Math.round(formsPrev)),
      top_tags,
    });
  }

  return sources.length > 0 ? { sources } : null;
}

function buildPageSpeed(rows: ChannelMetricRow[]): PageSpeedEntry[] {
  const psi = rows.filter((r) => r.channel === "psi");
  if (psi.length === 0) return [];

  // Group by dim_key (strategy|url); keep only the most recent date per group.
  const latestDateByKey = new Map<string, string>();
  for (const r of psi) {
    const prev = latestDateByKey.get(r.dim_key);
    if (!prev || r.metric_date > prev) latestDateByKey.set(r.dim_key, r.metric_date);
  }

  const byKey = new Map<string, PageSpeedEntry>();
  for (const r of psi) {
    if (r.metric_date !== latestDateByKey.get(r.dim_key)) continue;
    const url = String(r.dimensions?.url ?? "");
    const strategy = (r.dimensions?.strategy === "desktop" ? "desktop" : "mobile") as
      | "mobile"
      | "desktop";
    const entry =
      byKey.get(r.dim_key) ??
      ({ url, strategy, performance: null, lcp_ms: null, cls: null, inp_ms: null, fetched_at: r.metric_date } as PageSpeedEntry);
    if (r.metric === "performance") entry.performance = Number(r.value);
    if (r.metric === "lcp_ms") entry.lcp_ms = Number(r.value);
    if (r.metric === "cls") entry.cls = Number(r.value);
    if (r.metric === "inp_ms") entry.inp_ms = Number(r.value);
    byKey.set(r.dim_key, entry);
  }

  return Array.from(byKey.values()).sort(
    (a, b) => a.url.localeCompare(b.url) || a.strategy.localeCompare(b.strategy),
  );
}

async function resolveBrand(
  admin: SupabaseClient | null,
): Promise<{ name: string; site_url: string }> {
  const fallbackUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  let name = "";
  if (admin) {
    try {
      const { data } = await admin
        .from("brand_settings")
        .select("site_name, site_url")
        .limit(1)
        .maybeSingle();
      if (data?.site_name) name = String(data.site_name);
    } catch {
      // ignore
    }
  }
  if (!name) {
    try {
      name = fallbackUrl ? new URL(fallbackUrl).hostname.replace(/^www\./, "") : "Your Brand";
    } catch {
      name = "Your Brand";
    }
  }
  return { name, site_url: fallbackUrl };
}

function daysInPeriod(period: MarketingPeriodRanges): number {
  const a = new Date(`${period.curStart}T12:00:00Z`).getTime();
  const b = new Date(`${period.curEnd}T12:00:00Z`).getTime();
  return Math.max(1, Math.round((b - a) / 86_400_000) + 1);
}

/** Build the full multi-channel report for a lookback preset or legacy day count. */
export async function buildMarketingReport(
  periodOrDays: MarketingPeriodId | number = "last_7_days",
): Promise<MarketingReportPayload> {
  const period =
    typeof periodOrDays === "number"
      ? parseMarketingPeriodParam(null, String(periodOrDays))
      : resolveMarketingPeriod(periodOrDays);

  const ranges = periodToRanges(period);
  const gscRanges = gscRangesForPeriod(period);
  const periodDays = daysInPeriod(period);
  const admin = getMetricsAdminClient();

  const psiLookbackStart = (() => {
    const d = new Date(`${isoDateInTz()}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 90);
    return d.toISOString().slice(0, 10);
  })();

  const [brand, perf, metrics, psiMetrics, psiUrlsSetting] = await Promise.all([
    resolveBrand(admin),
    fetchPerformanceOverviewForRanges(gscRanges, periodDays),
    admin
      ? fetchChannelMetrics(admin, { startDate: ranges.prevStart, endDate: ranges.curEnd }).catch(
          () => [],
        )
      : Promise.resolve([] as ChannelMetricRow[]),
    admin
      ? fetchChannelMetrics(admin, {
          channel: "psi",
          startDate: psiLookbackStart,
          endDate: isoDateInTz(),
        }).catch(() => [])
      : Promise.resolve([] as ChannelMetricRow[]),
    admin
      ? readJsonSetting<string[]>(admin, "marketing_psi_urls", [])
      : Promise.resolve([] as string[]),
  ]);

  // ── Search block (live GSC) ─────────────────────────────────────────
  const searchStatus = perf.needs_oauth
    ? "not_configured"
    : perf.no_gsc_data
      ? "no_data"
      : "connected";

  const searchSummary =
    perf.summary != null
      ? {
          clicks: delta(perf.summary.current.clicks, perf.summary.previous.clicks),
          impressions: delta(perf.summary.current.impressions, perf.summary.previous.impressions),
          ctr: { current: perf.summary.current.ctr, previous: perf.summary.previous.ctr },
          position: {
            current: perf.summary.current.position,
            previous: perf.summary.previous.position,
            delta: perf.summary.deltas.positionDelta,
          },
        }
      : null;

  // ── Stored channels ─────────────────────────────────────────────────
  const ads = buildAds(metrics, ranges);
  const gmb = buildGmb(metrics, ranges);
  const pagespeed = buildPageSpeed(psiMetrics.length > 0 ? psiMetrics : metrics.filter((r) => r.channel === "psi"));
  const callTracking = buildCallTracking(metrics, ranges);

  const psiConfigured = Array.isArray(psiUrlsSetting) && psiUrlsSetting.length > 0;
  const pagespeedStatus =
    pagespeed.length > 0
      ? ("connected" as const)
      : psiConfigured
        ? ("no_data" as const)
        : ("not_configured" as const);

  return {
    ok: true,
    brand,
    period_days: periodDays,
    period: { id: period.id, label: period.label },
    generated_at: new Date().toISOString(),
    date_ranges: {
      current: { start: ranges.curStart, end: ranges.curEnd },
      previous: { start: ranges.prevStart, end: ranges.prevEnd },
    },
    search: {
      status: searchStatus,
      summary: searchSummary,
      daily: perf.daily,
      top_pages: perf.top_page_movers.map((p) => ({
        path: p.path,
        clicks: p.clicks,
        clicks_delta: p.clicks_delta,
      })),
      top_queries: perf.top_query_movers.map((q) => ({
        query: q.query,
        clicks: q.clicks,
        impressions: q.impressions,
        position: q.position,
      })),
    },
    pagespeed: {
      status: pagespeedStatus,
      data: pagespeed.length > 0 ? pagespeed : null,
    },
    ads: {
      status: ads.length > 0 ? "connected" : "not_configured",
      data: ads.length > 0 ? ads : null,
    },
    gmb: {
      status: gmb ? "connected" : "not_configured",
      data: gmb,
    },
    ga4: { status: "not_configured", data: null },
    callTracking: {
      status: callTracking ? "connected" : "not_configured",
      data: callTracking,
    },
  };
}

// ─── Public share resolution ────────────────────────────────────────────────

export interface ResolvedShareReport {
  label: string;
  period_days: number;
  payload: MarketingReportPayload;
}

/**
 * Resolve a public share token → report payload. Returns null when the token
 * is unknown or inactive. Bumps view_count / last_viewed_at as a side effect.
 * Uses the service role, so it intentionally bypasses RLS.
 */
export async function resolveReportShare(token: string): Promise<ResolvedShareReport | null> {
  const admin = getMetricsAdminClient();
  if (!admin || !token) return null;

  const { data: share } = await admin
    .from("report_shares")
    .select("id, label, period_days, is_active")
    .eq("token", token)
    .maybeSingle();

  if (!share || share.is_active === false) return null;

  const payload = await buildMarketingReport(share.period_days ?? "last_7_days");

  // Best-effort view tracking (never blocks the render).
  try {
    await admin
      .from("report_shares")
      .update({
        last_viewed_at: new Date().toISOString(),
        view_count: ((share as { view_count?: number }).view_count ?? 0) + 1,
      })
      .eq("id", share.id);
  } catch {
    // ignore tracking failures
  }

  return { label: share.label ?? "Client report", period_days: share.period_days ?? 28, payload };
}

// ─── Route handlers ───────────────────────────────────────────────────────────

async function readJsonSetting<T>(admin: SupabaseClient, key: string, fallback: T): Promise<T> {
  try {
    const { data } = await admin.from("system_settings").select("value").eq("key", key).maybeSingle();
    if (data?.value == null) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

export async function handleMarketingOverviewGet(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const periodParam = searchParams.get("period");
  const daysParam = searchParams.get("days");

  let data: MarketingReportPayload;
  if (periodParam) {
    data = await buildMarketingReport(parseMarketingPeriodParam(periodParam, daysParam).id);
  } else if (daysParam) {
    data = await buildMarketingReport(parseInt(daysParam, 10) || 28);
  } else {
    data = await buildMarketingReport("last_7_days");
  }

  return Response.json(data);
}

export async function handleIngestMetricsPost(request: Request): Promise<Response> {
  let lookbackDays = 35;
  try {
    const body = (await request.json()) as { lookback_days?: number };
    if (typeof body?.lookback_days === "number") lookbackDays = body.lookback_days;
  } catch {
    // no body — use default
  }
  const result = await ingestChannelMetrics(lookbackDays);
  return Response.json(result, { status: result.ok ? 200 : 207 });
}
