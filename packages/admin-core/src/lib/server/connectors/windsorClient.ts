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

import type { ChannelMetricRow, WindsorAccountConfig } from "../../../types/marketing";

const WINDSOR_BASE = "https://connectors.windsor.ai";

interface WindsorRow {
  date?: string;
  [field: string]: string | number | null | undefined;
}

function num(v: unknown): number {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

async function queryWindsor(
  connector: string,
  accountName: string,
  fields: string[],
  startDate: string,
  endDate: string,
): Promise<WindsorRow[]> {
  const apiKey = process.env.WINDSOR_API_KEY;
  if (!apiKey) return [];

  const filter = JSON.stringify([["account_name", "eq", accountName]]);
  const params = new URLSearchParams({
    api_key: apiKey,
    fields: ["date", ...fields].join(","),
    date_from: startDate,
    date_to: endDate,
    filter,
    _max_rows: "5000",
  });

  try {
    const res = await fetch(`${WINDSOR_BASE}/${connector}?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: WindsorRow[]; error?: string };
    if (json.error || !Array.isArray(json.data)) return [];
    return json.data;
  } catch {
    return [];
  }
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
  const metricFields = ["clicks", "impressions", "spend", "conversions"];

  for (const { connector, source, configKey } of ADS_CONNECTORS) {
    const accountName = config[configKey];
    if (!accountName) continue;

    const rows = await queryWindsor(connector, accountName, metricFields, startDate, endDate);
    for (const row of rows) {
      const date = typeof row.date === "string" ? row.date : null;
      if (!date) continue;
      for (const metric of metricFields) {
        out.push({
          channel: "ads",
          metric,
          metric_date: date,
          value: num(row[metric]),
          dimensions: { source, account_name: accountName },
          dim_key: source,
        });
      }
    }
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
