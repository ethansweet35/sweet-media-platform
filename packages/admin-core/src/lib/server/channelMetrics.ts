/**
 * Server-only persistence + ingest orchestration for channel_metrics.
 *
 * The dashboard and public report READ from channel_metrics (fast, full
 * history, no provider rate limits). A scheduled ingest WRITES to it from the
 * native PageSpeed connector + Windsor.ai connectors (ads / GMB).
 *
 * Each brand has its own Supabase project, so this is tenant-isolated by
 * construction — it only ever uses the current app's env vars.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  ChannelMetricRow,
  IngestResult,
  MarketingCallTrackingConfig,
  WindsorAccountConfig,
} from "../../types/marketing";
import { fetchCallrailFormMetrics } from "./connectors/callrailClient";
import { fetchCtmMetrics } from "./connectors/ctmClient";
import { fetchPageSpeed } from "./connectors/psiClient";
import { fetchWindsorAds, fetchWindsorGmb } from "./connectors/windsorClient";
import { fetchWindsorCallrail } from "./connectors/windsorCallrail";

export function getMetricsAdminClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function readJsonSetting<T>(admin: SupabaseClient, key: string, fallback: T): Promise<T> {
  try {
    const { data } = await admin
      .from("system_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (data?.value == null) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

/** Idempotent upsert keyed on the (channel, metric, metric_date, dim_key) unique index. */
export async function upsertChannelMetrics(
  admin: SupabaseClient,
  rows: ChannelMetricRow[],
): Promise<number> {
  if (rows.length === 0) return 0;
  const payload = rows.map((r) => ({
    channel: r.channel,
    metric: r.metric,
    metric_date: r.metric_date,
    value: r.value,
    dimensions: r.dimensions,
    dim_key: r.dim_key,
    ingested_at: new Date().toISOString(),
  }));

  // Chunk to stay well under request size limits.
  let written = 0;
  const CHUNK = 500;
  for (let i = 0; i < payload.length; i += CHUNK) {
    const slice = payload.slice(i, i + CHUNK);
    const { error } = await admin
      .from("channel_metrics")
      .upsert(slice, { onConflict: "channel,metric,metric_date,dim_key" });
    if (error) throw new Error(error.message);
    written += slice.length;
  }
  return written;
}

export interface FetchMetricsOptions {
  channel?: string;
  startDate: string;
  endDate: string;
}

/** PostgREST caps responses at 1,000 rows — paginate so reports are not truncated. */
const METRICS_PAGE_SIZE = 1000;

export async function fetchChannelMetrics(
  admin: SupabaseClient,
  opts: FetchMetricsOptions,
): Promise<ChannelMetricRow[]> {
  const out: ChannelMetricRow[] = [];
  let offset = 0;

  while (true) {
    let query = admin
      .from("channel_metrics")
      .select("channel, metric, metric_date, value, dimensions, dim_key")
      .gte("metric_date", opts.startDate)
      .lte("metric_date", opts.endDate)
      .order("metric_date", { ascending: true })
      .order("channel", { ascending: true })
      .order("metric", { ascending: true })
      .order("dim_key", { ascending: true })
      .range(offset, offset + METRICS_PAGE_SIZE - 1);
    if (opts.channel) query = query.eq("channel", opts.channel);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as ChannelMetricRow[];
    out.push(...batch);
    if (batch.length < METRICS_PAGE_SIZE) break;
    offset += METRICS_PAGE_SIZE;
  }

  return out;
}

/** ISO date N days back from today (UTC). */
function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

/**
 * Run all configured connectors and persist results to channel_metrics.
 * Safe to run on a schedule (daily) — upserts are idempotent.
 *
 * `lookbackDays` controls how far back Windsor metrics are pulled (PSI is a
 * point-in-time snapshot stored under today's date).
 */
export async function ingestChannelMetrics(lookbackDays = 35): Promise<IngestResult> {
  const result: IngestResult = { ok: true, ran: [], written: 0, errors: [] };
  const admin = getMetricsAdminClient();
  if (!admin) {
    return { ok: false, ran: [], written: 0, errors: [{ channel: "_", message: "Supabase service role not configured" }] };
  }

  const today = new Date().toISOString().slice(0, 10);
  const startDate = isoDaysAgo(lookbackDays);

  // ── PageSpeed (native) ──────────────────────────────────────────────
  const psiUrls = await readJsonSetting<string[]>(admin, "marketing_psi_urls", []);
  if (Array.isArray(psiUrls) && psiUrls.length > 0) {
    try {
      const entries = await fetchPageSpeed(psiUrls);
      const rows: ChannelMetricRow[] = [];
      for (const e of entries) {
        const dimKey = `${e.strategy}|${e.url}`;
        const dims = { url: e.url, strategy: e.strategy };
        if (e.performance != null)
          rows.push({ channel: "psi", metric: "performance", metric_date: today, value: e.performance, dimensions: dims, dim_key: dimKey });
        if (e.lcp_ms != null)
          rows.push({ channel: "psi", metric: "lcp_ms", metric_date: today, value: e.lcp_ms, dimensions: dims, dim_key: dimKey });
        if (e.cls != null)
          rows.push({ channel: "psi", metric: "cls", metric_date: today, value: e.cls, dimensions: dims, dim_key: dimKey });
        if (e.inp_ms != null)
          rows.push({ channel: "psi", metric: "inp_ms", metric_date: today, value: e.inp_ms, dimensions: dims, dim_key: dimKey });
      }
      result.written += await upsertChannelMetrics(admin, rows);
      result.ran.push("psi");
    } catch (e) {
      result.ok = false;
      result.errors.push({ channel: "psi", message: e instanceof Error ? e.message : String(e) });
    }
  }

  const windsor = await readJsonSetting<WindsorAccountConfig>(admin, "marketing_windsor_accounts", {});
  const callTracking = await readJsonSetting<MarketingCallTrackingConfig>(
    admin,
    "marketing_call_tracking",
    {},
  );
  const windsorApiKey = process.env.WINDSOR_API_KEY?.trim();
  const hasWindsorAccounts = windsor && Object.keys(windsor).length > 0;

  // ── Windsor (ads + GMB) ─────────────────────────────────────────────
  if (windsorApiKey && hasWindsorAccounts) {
    try {
      const adsRows = await fetchWindsorAds(windsor, startDate, today);
      result.written += await upsertChannelMetrics(admin, adsRows);
      result.ran.push("ads");
    } catch (e) {
      result.ok = false;
      result.errors.push({ channel: "ads", message: e instanceof Error ? e.message : String(e) });
    }

    if (windsor.google_my_business) {
      try {
        const gmbRows = await fetchWindsorGmb(windsor, startDate, today);
        result.written += await upsertChannelMetrics(admin, gmbRows);
        result.ran.push("gmb");
      } catch (e) {
        result.ok = false;
        result.errors.push({ channel: "gmb", message: e instanceof Error ? e.message : String(e) });
      }
    }
  }

  // ── Windsor CallRail (calls + tags) — phone account_name, not ctrk_* ──
  const callrailWindsorAccount =
    windsor?.callrail?.trim() || callTracking.windsor_callrail_account?.trim();
  if (windsorApiKey && callrailWindsorAccount) {
    try {
      const callRows = await fetchWindsorCallrail(callrailWindsorAccount, startDate, today);
      result.written += await upsertChannelMetrics(admin, callRows);
      result.ran.push("callrail");
    } catch (e) {
      result.ok = false;
      result.errors.push({
        channel: "callrail",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  // CallRail forms via direct API. The per-brand ctrk_ tracking id doubles as
  // the API key, so no separate secret is required — fall back to it when
  // CALLRAIL_API_KEY env is not set.
  const callrailApiKey =
    process.env.CALLRAIL_API_KEY?.trim() || callTracking.callrail_tracking_id?.trim();
  const callrailAccountId =
    callTracking.callrail_account_id?.trim() || process.env.CALLRAIL_ACCOUNT_ID?.trim();
  if (callrailApiKey && callrailAccountId) {
    try {
      const formRows = await fetchCallrailFormMetrics(callrailAccountId, startDate, today, {
        apiKey: callrailApiKey,
        companyId: callTracking.callrail_company_id,
      });
      result.written += await upsertChannelMetrics(admin, formRows);
      if (!result.ran.includes("callrail")) result.ran.push("callrail");
    } catch (e) {
      result.ok = false;
      result.errors.push({
        channel: "callrail-forms",
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const ctmAccountId = callTracking.ctm_account_id?.trim() || process.env.CTM_ACCOUNT_ID?.trim();
  const hasCtm =
    (process.env.CTM_ACCESS_KEY ?? process.env.CTM_API_KEY)?.trim() &&
    (process.env.CTM_SECRET_KEY ?? process.env.CTM_API_SECRET)?.trim() &&
    ctmAccountId;
  if (hasCtm) {
    try {
      const ctmRows = await fetchCtmMetrics(ctmAccountId, startDate, today);
      result.written += await upsertChannelMetrics(admin, ctmRows);
      result.ran.push("ctm");
    } catch (e) {
      result.ok = false;
      result.errors.push({ channel: "ctm", message: e instanceof Error ? e.message : String(e) });
    }
  }

  return result;
}
