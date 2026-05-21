"use client";

import Link from "next/link";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSerif,
} from "../../lib/adminTheme";
import { formatChangeValue } from "../../lib/contentChangeLog";
import { usePerformanceOverview } from "../../hooks/usePerformanceOverview";
import TrafficLineChart from "./TrafficLineChart";

function fmtShortDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function fmtRange(start: string, end: string): string {
  return `${fmtShortDate(start)} – ${fmtShortDate(end)}`;
}

function KeywordList({
  title,
  icon,
  items,
  variant,
  periodDays,
}: {
  title: string;
  icon: string;
  items: { query: string; clicks: number; impressions: number; position: number; impressions_prev?: number }[];
  variant: "gain" | "loss";
  periodDays: number;
}) {
  const accent = variant === "gain" ? "text-emerald-700" : "text-red-600";
  const bg = variant === "gain" ? "bg-emerald-50" : "bg-red-50";

  return (
    <div className={`${adminCardCls} flex flex-col px-5 py-5`}>
      <div className="mb-4 flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
          <i className={`${icon} ${accent}`} />
        </span>
        <div>
          <h3 className={`text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            {title}
          </h3>
          <p className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
            vs prior {periodDays}d window
          </p>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-[#94A3B8]">Nothing notable in this period.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((row) => (
            <li
              key={row.query}
              className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] px-3 py-2.5"
            >
              <p className="text-sm font-medium leading-snug" style={{ color: ADMIN_TEXT }}>
                {row.query}
              </p>
              <p className="mt-1 text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                {row.impressions.toLocaleString()} impr
                {variant === "loss" && row.impressions_prev != null
                  ? ` (was ${row.impressions_prev.toLocaleString()})`
                  : ""}
                · {row.clicks} clicks · pos {row.position.toFixed(1)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardPerformanceTab() {
  const { data, loading, error, refetch } = usePerformanceOverview(28);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center gap-3 ${adminCardCls} py-24`}
        style={{ color: ADMIN_TEXT_MUTED }}
      >
        <i className="ri-loader-4-line animate-spin text-2xl" />
        Syncing Search Console…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {error}
        <button
          type="button"
          onClick={() => void refetch()}
          className="ml-3 font-semibold underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  if (data.needs_oauth) {
    return (
      <div className={`${adminCardCls} px-8 py-12 text-center`}>
        <i className="ri-google-line mb-4 text-4xl" style={{ color: ADMIN_ACCENT }} />
        <h2 className={`text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
          Connect Google Search Console
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          Link your property to see organic traffic trends, keyword movers, and how recent content
          changes line up with performance.
        </p>
        <Link
          href="/admin/search-console"
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
          style={{ backgroundColor: ADMIN_NAVY }}
        >
          <i className="ri-link" />
          Connect Search Console
        </Link>
      </div>
    );
  }

  if (data.no_gsc_data) {
    return (
      <div className={`${adminCardCls} px-8 py-12 text-center`}>
        <p className="text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          Search Console is connected but returned no data for this site URL. Verify the property
          matches your site URL in brand settings and in Search Console.
          settings.
        </p>
        <Link
          href="/admin/search-console"
          className="mt-4 inline-block text-sm font-semibold hover:underline"
          style={{ color: ADMIN_ACCENT }}
        >
          Search Console settings
        </Link>
      </div>
    );
  }

  const summary = data.summary;
  const periodLabel = fmtRange(data.date_ranges.current.start, data.date_ranges.current.end);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          {data.connected_email ? (
            <p className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
              <i className="ri-google-line mr-1" />
              Connected as {data.connected_email}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[11px] font-semibold"
          style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
        >
          <i className="ri-refresh-line" />
          Refresh
        </button>
      </div>

      {summary ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${adminCardCls} px-4 py-4`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
              Clicks
            </p>
            <p className={`mt-2 text-2xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              {summary.current.clicks.toLocaleString()}
            </p>
            <p
              className={`mt-1 text-xs font-semibold ${
                summary.deltas.clicks > 0
                  ? "text-emerald-700"
                  : summary.deltas.clicks < 0
                    ? "text-red-600"
                    : "text-[#94A3B8]"
              }`}
            >
              {summary.deltas.clicks > 0 ? "+" : ""}
              {summary.deltas.clicks.toLocaleString()}
              {summary.deltas.clicksPct != null ? ` (${summary.deltas.clicksPct > 0 ? "+" : ""}${summary.deltas.clicksPct}%)` : ""}{" "}
              vs prior
            </p>
          </div>
          <div className={`${adminCardCls} px-4 py-4`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
              Impressions
            </p>
            <p className={`mt-2 text-2xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              {summary.current.impressions.toLocaleString()}
            </p>
            <p
              className={`mt-1 text-xs font-semibold ${
                summary.deltas.impressions > 0
                  ? "text-emerald-700"
                  : summary.deltas.impressions < 0
                    ? "text-red-600"
                    : "text-[#94A3B8]"
              }`}
            >
              {summary.deltas.impressions > 0 ? "+" : ""}
              {summary.deltas.impressions.toLocaleString()}
              {summary.deltas.impressionsPct != null
                ? ` (${summary.deltas.impressionsPct > 0 ? "+" : ""}${summary.deltas.impressionsPct}%)`
                : ""}{" "}
              vs prior
            </p>
          </div>
          <div className={`${adminCardCls} px-4 py-4`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
              CTR
            </p>
            <p className={`mt-2 text-2xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              {(summary.current.ctr * 100).toFixed(2)}%
            </p>
            <p className="mt-1 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
              Prior {(summary.previous.ctr * 100).toFixed(2)}%
            </p>
          </div>
          <div className={`${adminCardCls} px-4 py-4`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
              Avg position
            </p>
            <p className={`mt-2 text-2xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              {summary.current.position.toFixed(1)}
            </p>
            <p
              className={`mt-1 flex items-center gap-1 text-xs font-semibold ${
                summary.deltas.positionDelta < 0
                  ? "text-emerald-700"
                  : summary.deltas.positionDelta > 0
                    ? "text-red-600"
                    : "text-[#94A3B8]"
              }`}
            >
              {summary.deltas.positionDelta !== 0 && (
                <i
                  className={
                    summary.deltas.positionDelta < 0 ? "ri-arrow-up-line" : "ri-arrow-down-line"
                  }
                />
              )}
              {summary.deltas.positionDelta > 0 ? "+" : ""}
              {summary.deltas.positionDelta.toFixed(1)} vs prior (lower is better)
            </p>
          </div>
        </div>
      ) : null}

      <article className={`${adminCardCls} px-6 py-6`}>
        <TrafficLineChart daily={data.daily} periodLabel={periodLabel} />
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        <KeywordList
          title="Emerging keywords"
          icon="ri-seedling-line"
          items={data.emerging_keywords}
          variant="gain"
          periodDays={data.period_days}
        />
        <KeywordList
          title="Keywords we lost"
          icon="ri-arrow-down-circle-line"
          items={data.lost_keywords}
          variant="loss"
          periodDays={data.period_days}
        />
      </div>

      {(data.top_query_movers.length > 0 || data.top_page_movers.length > 0) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {data.top_query_movers.length > 0 ? (
            <div className={`${adminCardCls} px-5 py-5`}>
              <h3 className={`mb-4 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                Top query gains
              </h3>
              <ul className="space-y-2">
                {data.top_query_movers.map((q) => (
                  <li
                    key={q.query}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#F0FDF4] px-3 py-2"
                  >
                    <span className="text-sm font-medium" style={{ color: ADMIN_TEXT }}>
                      {q.query}
                    </span>
                    <span className="shrink-0 text-xs font-bold text-emerald-700">
                      +{q.clicks_delta} clicks
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {data.top_page_movers.length > 0 ? (
            <div className={`${adminCardCls} px-5 py-5`}>
              <h3 className={`mb-4 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                Top page gains
              </h3>
              <ul className="space-y-2">
                {data.top_page_movers.map((p) => (
                  <li
                    key={p.page}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#EFF6FF] px-3 py-2"
                  >
                    <span className="truncate font-mono text-xs" style={{ color: ADMIN_TEXT }}>
                      {p.path}
                    </span>
                    <span className="shrink-0 text-xs font-bold" style={{ color: ADMIN_ACCENT }}>
                      +{p.clicks_delta} clicks
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      <section>
        <div className="mb-4">
          <h2 className={`text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Recent changes
          </h2>
          <p className="mt-1 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            SEO and content edits logged across pages and blog posts
          </p>
        </div>
        {data.recent_changes.length === 0 ? (
          <p className={`${adminCardCls} px-5 py-8 text-sm text-[#94A3B8]`}>
            No logged changes yet. Edits from tracked pages, blog posts, and Content Editor will appear
            here.
          </p>
        ) : (
          <ul className={`${adminCardCls} divide-y`} style={{ borderColor: ADMIN_BORDER }}>
            {data.recent_changes.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-start justify-between gap-3 px-5 py-4"
                style={{ borderColor: ADMIN_BORDER }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-md bg-[#0A1F44]/[0.06] px-2 py-0.5 font-mono text-[11px]"
                      style={{ color: ADMIN_TEXT }}
                    >
                      {c.route_path || "—"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">
                      {c.entity_type}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium" style={{ color: ADMIN_TEXT }}>
                    {c.summary || c.field_label}
                  </p>
                  {(c.old_value || c.new_value) && (
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: ADMIN_TEXT_MUTED }}>
                      {formatChangeValue(c.old_value)} → {formatChangeValue(c.new_value)}
                    </p>
                  )}
                </div>
                <time className="shrink-0 text-xs tabular-nums" style={{ color: ADMIN_TEXT_MUTED }}>
                  {fmtShortDate(c.created_at)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
