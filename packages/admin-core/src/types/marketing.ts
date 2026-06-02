/**
 * Shared types for the unified marketing reporting layer.
 *
 * `channel_metrics` is a normalized, brand-isolated time-series store written by
 * the ingest pipeline (native PageSpeed + Windsor.ai connectors) and read by both
 * the admin dashboard and the public client report at /report/[token].
 */

export type MarketingChannel = "gsc" | "psi" | "ga4" | "gmb" | "ads" | "callrail" | "ctm";

export type MarketingPeriodId =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "this_week"
  | "last_month"
  | "this_month";

export type CallTrackingProvider = "callrail" | "ctm";

export interface CallTrackingTagSummary {
  tag: string;
  calls: MetricDelta;
}

/** Rolled-up call + form metrics for one provider (CallRail or CTM). */
export interface CallTrackingSourceSummary {
  provider: CallTrackingProvider;
  label: string;
  calls: MetricDelta;
  forms: MetricDelta;
  top_tags: CallTrackingTagSummary[];
}

export interface CallTrackingReport {
  sources: CallTrackingSourceSummary[];
}

export interface ChannelMetricRow {
  channel: MarketingChannel;
  metric: string;
  metric_date: string; // YYYY-MM-DD
  value: number;
  dimensions: Record<string, string | number | null>;
  dim_key: string;
}

/** A metric value with a comparison delta vs the prior equal-length window. */
export interface MetricDelta {
  current: number;
  previous: number;
  delta: number;
  deltaPct: number | null;
}

export interface PageSpeedEntry {
  url: string;
  strategy: "mobile" | "desktop";
  performance: number | null; // 0–100
  lcp_ms: number | null;
  cls: number | null;
  inp_ms: number | null;
  fetched_at: string | null;
}

/** One tracked Google Ads conversion action in the report window. */
export interface AdsConversionGoalRow {
  /** Display label (e.g. "First time phone call") */
  name: string;
  conversions: MetricDelta;
}

/** Paid media (Google Ads / Meta / Bing) rolled up per source. */
export interface AdsSourceSummary {
  source: string; // 'google' | 'facebook' | 'bing' | ...
  clicks: MetricDelta;
  impressions: MetricDelta;
  spend: MetricDelta;
  /** Platform-reported conversions (all actions). */
  conversions: MetricDelta;
  /** Sum of tracked goal actions (Google: phone/VOB; Meta: leads/calls/forms). */
  goal_conversions: MetricDelta | null;
  /** Spend ÷ goal conversions when goals are tracked for this source. */
  cpa: MetricDelta | null;
  /** Per-goal breakdown when tracked for this source. */
  conversion_goals: AdsConversionGoalRow[];
}

/** Google Business Profile engagement summary. */
export interface GmbSummary {
  views: MetricDelta;
  calls: MetricDelta;
  directions: MetricDelta;
  website_clicks: MetricDelta;
}

export type ChannelStatus = "connected" | "not_configured" | "no_data";

export interface MarketingChannelBlock<T> {
  status: ChannelStatus;
  data: T | null;
}

/**
 * Full payload rendered by both the admin preview and the public client report.
 * Channels that are not yet wired for a brand report `status: "not_configured"`
 * with `data: null` so the UI can show a graceful "coming soon / connect" state.
 */
export interface MarketingReportPayload {
  ok: true;
  brand: { name: string; site_url: string };
  /** @deprecated Use period.id — kept for share links / backward compat */
  period_days: number;
  period: {
    id: MarketingPeriodId | "custom";
    label: string;
  };
  generated_at: string;
  date_ranges: {
    current: { start: string; end: string };
    previous: { start: string; end: string };
  };
  /** Organic search (Google Search Console) — reuses the existing live overview. */
  search: {
    status: ChannelStatus;
    summary: {
      clicks: MetricDelta;
      impressions: MetricDelta;
      ctr: { current: number; previous: number };
      position: { current: number; previous: number; delta: number };
    } | null;
    daily: { date: string; clicks: number; impressions: number }[];
    top_pages: { path: string; clicks: number; clicks_delta: number }[];
    top_queries: { query: string; clicks: number; impressions: number; position: number }[];
  };
  pagespeed: MarketingChannelBlock<PageSpeedEntry[]>;
  ads: MarketingChannelBlock<AdsSourceSummary[]>;
  gmb: MarketingChannelBlock<GmbSummary>;
  ga4: MarketingChannelBlock<null>;
  callTracking: MarketingChannelBlock<CallTrackingReport>;
}

export interface ReportShareRow {
  id: string;
  token: string;
  label: string;
  period_days: number;
  is_active: boolean;
  created_by: string | null;
  last_viewed_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

/** Per-brand Windsor account mapping stored in system_settings. */
export interface WindsorAccountConfig {
  google_ads?: string;
  facebook?: string;
  bing?: string;
  google_my_business?: string;
  searchconsole?: string;
  /** Windsor `account_name` filter for the CallRail connector */
  callrail?: string;
}

/** Per-brand call tracking IDs (system_settings.marketing_call_tracking). */
export interface MarketingCallTrackingConfig {
  /** CallRail API account id (ACC…) — agency account; required for form submissions via API */
  callrail_account_id?: string;
  /**
   * Windsor `account_name` for the CallRail connector — use the tracking number with dashes
   * (e.g. `548-983-303`), not the `ctrk_*` script id.
   */
  windsor_callrail_account?: string;
  /** CallRail company id from swap.js URL (numeric) — scopes form API under agency account */
  callrail_company_id?: string;
  /** CallRail tracking script id (`ctrk_…`) — stored for reference; not used by Windsor ingest */
  callrail_tracking_id?: string;
  /** CTM numeric account id */
  ctm_account_id?: string;
}

export interface IngestResult {
  ok: boolean;
  ran: string[]; // channels that ran
  written: number; // rows upserted
  errors: { channel: string; message: string }[];
}
