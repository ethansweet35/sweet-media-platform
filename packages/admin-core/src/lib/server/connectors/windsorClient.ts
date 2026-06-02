/**
 * Windsor.ai connectors API (server-only).
 *
 * Windsor blends every connected account across all brands, so each brand's
 * report MUST filter to its own `account_name` per source. The per-brand
 * account mapping lives in system_settings.marketing_windsor_accounts.
 *
 * Docs: https://windsor.ai/api-documentation/
 *   GET https://connectors.windsor.ai/{connector}?api_key=…&fields=…&date_from=…&date_to=…&filter=…
 *   → { "data": [ { date, …metrics } ] }
 *
 * Field names verified against the live account:
 *   ads (google|facebook|bing): clicks, impressions, spend, conversions
 *   google_my_business:          impressions, call_clicks, direction_requests, website_clicks
 *
 * Never import from a client component.
 */

import { slugConversionAction } from "../../adsConversionGoals";
import type { ChannelMetricRow, WindsorAccountConfig } from "../../../types/marketing";

const WINDSOR_BASE = "https://connectors.windsor.ai";

interface FacebookConversionAction {
  action_type?: string;
  value?: string | number | null;
}

interface WindsorRow {
  date?: string;
  [field: string]: string | number | null | undefined | FacebookConversionAction[];
}

function num(v: unknown): number {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

/** Windsor returns Meta `conversions` as an array of { action_type, value }, not a scalar. */
function parseFacebookConversionsArray(raw: unknown): { action: string; value: number }[] {
  if (!Array.isArray(raw)) return [];
  const out: { action: string; value: number }[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const action = String((item as FacebookConversionAction).action_type ?? "").trim();
    if (!action) continue;
    const value = num((item as FacebookConversionAction).value);
    if (value > 0) out.push({ action, value });
  }
  return out;
}

function pushFacebookConversionRows(
  out: ChannelMetricRow[],
  date: string,
  accountName: string,
  actions: { action: string; value: number }[],
): void {
  const total = actions.reduce((s, a) => s + a.value, 0);
  out.push({
    channel: "ads",
    metric: "conversions",
    metric_date: date,
    value: total,
    dimensions: { source: "facebook", account_name: accountName },
    dim_key: "facebook",
  });
  for (const { action, value } of actions) {
    out.push({
      channel: "ads",
      metric: "conversions_by_action",
      metric_date: date,
      value,
      dimensions: { source: "facebook", conversion_action: action, account_name: accountName },
      dim_key: `facebook|action|${slugConversionAction(action)}`,
    });
  }
}

export class WindsorQueryError extends Error {
  constructor(
    message: string,
    readonly connector: string,
    readonly accountName: string,
  ) {
    super(message);
    this.name = "WindsorQueryError";
  }
}

export async function queryWindsor(
  connector: string,
  accountName: string,
  fields: string[],
  startDate: string,
  endDate: string,
): Promise<WindsorRow[]> {
  const apiKey = process.env.WINDSOR_API_KEY;
  if (!apiKey) {
    throw new WindsorQueryError("WINDSOR_API_KEY is not set on the server", connector, accountName);
  }

  const filter = JSON.stringify([["account_name", "eq", accountName]]);
  const params = new URLSearchParams({
    api_key: apiKey,
    fields: ["date", ...fields].join(","),
    date_from: startDate,
    date_to: endDate,
    filter,
    _max_rows: "5000",
  });

  const res = await fetch(`${WINDSOR_BASE}/${connector}?${params.toString()}`, {
    cache: "no-store",
  });
  const text = await res.text();
  let json: { data?: WindsorRow[]; error?: string };
  try {
    json = JSON.parse(text) as { data?: WindsorRow[]; error?: string };
  } catch {
    throw new WindsorQueryError(
      `Windsor ${connector} returned non-JSON (${res.status})`,
      connector,
      accountName,
    );
  }
  if (!res.ok) {
    throw new WindsorQueryError(
      json.error ?? `Windsor ${connector} HTTP ${res.status}`,
      connector,
      accountName,
    );
  }
  if (json.error) {
    throw new WindsorQueryError(json.error, connector, accountName);
  }
  if (!Array.isArray(json.data)) {
    throw new WindsorQueryError(`Windsor ${connector} returned no data array`, connector, accountName);
  }
  return json.data;
}

// `connector` is the Windsor API endpoint slug; `source` is the stable label we
// store/display. Note the Google Ads endpoint is `google_ads` even though the
// blended feed labels the source `google`.
const ADS_CONNECTORS: { connector: string; source: string; configKey: keyof WindsorAccountConfig }[] = [
  { connector: "google_ads", source: "google", configKey: "google_ads" },
  { connector: "facebook", source: "facebook", configKey: "facebook" },
  { connector: "bing", source: "bing", configKey: "bing" },
];

/**
 * Paid media (Google Ads / Meta / Bing) → channel='ads' rows.
 * One row per (date, source, metric). dim_key = source so different sources
 * on the same date upsert independently.
 */
export async function fetchWindsorAds(
  config: WindsorAccountConfig,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const out: ChannelMetricRow[] = [];
  const standardMetrics = ["clicks", "impressions", "spend", "conversions"] as const;

  for (const { connector, source, configKey } of ADS_CONNECTORS) {
    const accountName = config[configKey];
    if (!accountName) continue;

    const isFacebook = connector === "facebook";
    const requestFields = isFacebook
      ? ["clicks", "impressions", "spend", "conversions"]
      : [...standardMetrics];

    const rows = await queryWindsor(connector, accountName, requestFields, startDate, endDate);
    for (const row of rows) {
      const date = typeof row.date === "string" ? row.date : null;
      if (!date) continue;

      for (const metric of ["clicks", "impressions", "spend"] as const) {
        out.push({
          channel: "ads",
          metric,
          metric_date: date,
          value: num(row[metric]),
          dimensions: { source, account_name: accountName },
          dim_key: source,
        });
      }

      if (isFacebook) {
        const fbActions = parseFacebookConversionsArray(row.conversions);
        pushFacebookConversionRows(out, date, accountName, fbActions);
      } else {
        out.push({
          channel: "ads",
          metric: "conversions",
          metric_date: date,
          value: num(row.conversions),
          dimensions: { source, account_name: accountName },
          dim_key: source,
        });
      }
    }

    if (connector === "google_ads") {
      const actionRows = await fetchWindsorGoogleAdsConversionActions(
        accountName,
        startDate,
        endDate,
      );
      out.push(...actionRows);
    }

    if (connector === "facebook") {
      const supplemental = await fetchWindsorFacebookSupplementalActions(
        accountName,
        startDate,
        endDate,
      );
      out.push(...supplemental);
    }
  }

  return out;
}

/** Standard Meta lead / click-to-call fields (separate Windsor request from spend). */
export async function fetchWindsorFacebookSupplementalActions(
  accountName: string,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const supplemental: { field: string; actionLabel: string }[] = [
    { field: "actions_lead", actionLabel: "actions_lead" },
    { field: "actions_click_to_call_native_call_placed", actionLabel: "click_to_call" },
    { field: "actions_offsite_conversion_fb_pixel_lead", actionLabel: "fb_pixel_lead" },
  ];

  const rows = await queryWindsor(
    "facebook",
    accountName,
    supplemental.map((s) => s.field),
    startDate,
    endDate,
  );

  const out: ChannelMetricRow[] = [];
  for (const row of rows) {
    const date = typeof row.date === "string" ? row.date : null;
    if (!date) continue;
    for (const { field, actionLabel } of supplemental) {
      const value = num(row[field]);
      if (value <= 0) continue;
      out.push({
        channel: "ads",
        metric: "conversions_by_action",
        metric_date: date,
        value,
        dimensions: {
          source: "facebook",
          conversion_action: actionLabel,
          account_name: accountName,
        },
        dim_key: `facebook|action|${slugConversionAction(actionLabel)}`,
      });
    }
  }
  return out;
}

/**
 * Google Ads conversions broken out by conversion_action_name (cannot mix with spend in one request).
 */
export async function fetchWindsorGoogleAdsConversionActions(
  accountName: string,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const rows = await queryWindsor(
    "google_ads",
    accountName,
    ["conversion_action_name", "conversions"],
    startDate,
    endDate,
  );

  const out: ChannelMetricRow[] = [];
  for (const row of rows) {
    const date = typeof row.date === "string" ? row.date : null;
    const action = String(row.conversion_action_name ?? "").trim();
    if (!date || !action) continue;
    const slug = slugConversionAction(action);
    out.push({
      channel: "ads",
      metric: "conversions_by_action",
      metric_date: date,
      value: num(row.conversions),
      dimensions: { source: "google", conversion_action: action },
      dim_key: `google|action|${slug}`,
    });
  }
  return out;
}

const GMB_FIELD_MAP: { field: string; metric: string }[] = [
  { field: "impressions", metric: "views" },
  { field: "call_clicks", metric: "calls" },
  { field: "direction_requests", metric: "directions" },
  { field: "website_clicks", metric: "website_clicks" },
];

/** Google Business Profile → channel='gmb' rows. */
export async function fetchWindsorGmb(
  config: WindsorAccountConfig,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const accountName = config.google_my_business;
  if (!accountName) return [];

  const fields = GMB_FIELD_MAP.map((m) => m.field);
  const rows = await queryWindsor("google_my_business", accountName, fields, startDate, endDate);

  const out: ChannelMetricRow[] = [];
  for (const row of rows) {
    const date = typeof row.date === "string" ? row.date : null;
    if (!date) continue;
    for (const { field, metric } of GMB_FIELD_MAP) {
      out.push({
        channel: "gmb",
        metric,
        metric_date: date,
        value: num(row[field]),
        dimensions: { account_name: accountName },
        dim_key: "",
      });
    }
  }
  return out;
}
