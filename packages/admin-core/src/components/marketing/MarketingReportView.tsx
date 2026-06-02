"use client";

import { useMemo, useState } from "react";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSerif,
} from "../../lib/adminTheme";
import TrafficLineChart from "../dashboard/TrafficLineChart";
import type {
  AdsPlatformSection,
  AdsSourceSummary,
  CallTrackingReport,
  CallTrackingSourceSummary,
  ChannelStatus,
  GmbSummary,
  LiveChangelogEntry,
  MarketingReportPayload,
  MetricDelta,
  PageSpeedEntry,
  SeoDeliverables,
} from "../../types/marketing";

function fmtShortDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString();
}

function fmtMoney(n: number): string {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/** Colored delta pill. `invert` = lower-is-better (position, LCP, CLS, spend-neutral). */
function DeltaBadge({ d, invert = false, suffix = "" }: { d: MetricDelta; invert?: boolean; suffix?: string }) {
  const up = d.delta > 0;
  const flat = d.delta === 0;
  const good = invert ? d.delta < 0 : d.delta > 0;
  const color = flat ? "#94A3B8" : good ? "#047857" : "#DC2626";
  const arrow = flat ? "" : up ? "ri-arrow-up-line" : "ri-arrow-down-line";
  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-1 text-xs font-semibold" style={{ color }}>
      {arrow ? <i className={arrow} /> : null}
      {up ? "+" : ""}
      {fmtInt(d.delta)}
      {suffix}
      {d.deltaPct != null ? ` (${d.deltaPct > 0 ? "+" : ""}${d.deltaPct}%)` : ""}
    </span>
  );
}

function StatCard({
  label,
  value,
  footer,
}: {
  label: string;
  value: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`${adminCardCls} min-w-0 px-4 py-4`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
        {label}
      </p>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
        {value}
      </p>
      {footer ? <p className="mt-1 text-xs">{footer}</p> : null}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  status,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  status?: ChannelStatus;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${ADMIN_NAVY}0d`, color: ADMIN_NAVY }}
      >
        <i className={`${icon} text-lg`} />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className={`text-lg font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
          {title}
        </h2>
        {subtitle ? (
          <p className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {status === "connected" ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      ) : null}
    </div>
  );
}

function NotConnected({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      className="rounded-2xl border border-dashed px-5 py-6 text-sm"
      style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
    >
      <i className="ri-plug-line mr-2" />
      {hint ?? `${label} isn’t connected yet — it’ll appear here once linked.`}
    </div>
  );
}

function lcpLabel(ms: number | null): string {
  if (ms == null) return "—";
  return `${(ms / 1000).toFixed(1)}s`;
}

function scoreColor(score: number | null): string {
  if (score == null) return ADMIN_TEXT_MUTED;
  if (score >= 90) return "#047857";
  if (score >= 50) return "#B45309";
  return "#DC2626";
}

function PageSpeedGrid({ entries }: { entries: PageSpeedEntry[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((e) => {
        let path = e.url;
        try {
          path = new URL(e.url).pathname || "/";
        } catch {
          /* keep raw */
        }
        return (
          <div key={`${e.strategy}|${e.url}`} className={`${adminCardCls} min-w-0 px-4 py-4`}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-mono text-xs" style={{ color: ADMIN_TEXT }} title={e.url}>
                {path}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide" style={{ color: ADMIN_TEXT_MUTED }}>
                <i className={e.strategy === "mobile" ? "ri-smartphone-line" : "ri-computer-line"} />
                {e.strategy}
              </span>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className={`text-3xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: scoreColor(e.performance) }}>
                {e.performance ?? "—"}
              </span>
              <span className="pb-1 text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                performance
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
              <span>LCP {lcpLabel(e.lcp_ms)}</span>
              <span>CLS {e.cls != null ? e.cls.toFixed(2) : "—"}</span>
              {e.inp_ms != null ? <span>INP {Math.round(e.inp_ms)}ms</span> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function fmtCpa(n: number): string {
  if (n <= 0) return "—";
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function AccountSummaryCard({ s }: { s: AdsSourceSummary }) {
  return (
    <div>
      {s.goal_conversions != null ? (
            <div
              className="mt-4 grid gap-3 border-b pb-4 sm:grid-cols-2"
              style={{ borderColor: ADMIN_BORDER }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
                  Goal conversions
                </p>
                <p className={`mt-1 text-xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                  {fmtInt(s.goal_conversions.current)}
                </p>
                <p className="mt-0.5 text-xs">
                  <DeltaBadge d={s.goal_conversions} />
                </p>
                <p className="mt-1 text-[10px]" style={{ color: ADMIN_TEXT_MUTED }}>
                  {s.source === "facebook"
                    ? "Leads · Calls · Form submissions"
                    : "Phone · VOB · Opportunity goals"}
                </p>
              </div>
              {s.cpa != null ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
                    CPA (goals)
                  </p>
                  <p className={`mt-1 text-xl font-semibold tabular-nums ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                    {fmtCpa(s.cpa.current)}
                  </p>
                  <p className="mt-0.5 text-xs">
                    <DeltaBadge d={s.cpa} invert />
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {s.conversion_goals.length > 0 ? (
            <div className="mt-3 mb-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
                Conversion goals
              </p>
              <div className="space-y-2">
                {s.conversion_goals.map((g) => (
                  <div
                    key={g.name}
                    className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-2"
                  >
                    <span className="min-w-0 break-words" style={{ color: ADMIN_TEXT }}>
                      {g.name}
                    </span>
                    <span className="flex shrink-0 flex-wrap items-center gap-2 tabular-nums sm:justify-end">
                      <span className="font-semibold">{fmtInt(g.conversions.current)}</span>
                      <DeltaBadge d={g.conversions} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <dl className="mt-2 space-y-3">
            {[
              { label: "Spend", d: s.spend, money: true },
              { label: "Clicks", d: s.clicks, money: false },
              { label: "All conversions", d: s.conversions, money: false },
              { label: "Impressions", d: s.impressions, money: false },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
              >
                <dt className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
                  {row.label}
                </dt>
                <dd className="flex flex-wrap items-center gap-2 sm:justify-end sm:text-right">
                  <span className="text-sm font-semibold tabular-nums" style={{ color: ADMIN_TEXT }}>
                    {row.money ? fmtMoney(row.d.current) : fmtInt(row.d.current)}
                  </span>
                  <DeltaBadge d={row.d} />
                </dd>
              </div>
            ))}
          </dl>
    </div>
  );
}

function CampaignTable({ platform }: { platform: AdsPlatformSection }) {
  if (platform.campaigns.length === 0) {
    return (
      <p className="px-5 pb-4 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
        No campaign-level data yet — run Sync metrics after Windsor campaign fields are connected.
      </p>
    );
  }

  return (
    <div
      className="max-w-full min-w-0 overflow-x-auto border-t px-5 py-4 [-webkit-overflow-scrolling:touch]"
      style={{ borderColor: ADMIN_BORDER }}
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
        Campaign performance
      </p>
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest" style={{ color: ADMIN_TEXT_MUTED }}>
            <th className="pb-2 pr-4 font-semibold">Campaign</th>
            <th className="pb-2 pr-4 text-right font-semibold">Spend</th>
            <th className="pb-2 pr-4 text-right font-semibold">Clicks</th>
            <th className="pb-2 pr-4 text-right font-semibold">Conv.</th>
            <th className="pb-2 text-right font-semibold">Impr.</th>
          </tr>
        </thead>
        <tbody>
          {platform.campaigns.map((c) => (
            <tr key={c.name} className="border-t" style={{ borderColor: `${ADMIN_BORDER}88` }}>
              <td className="max-w-[220px] py-2.5 pr-4 font-medium" style={{ color: ADMIN_TEXT }}>
                <span className="line-clamp-2" title={c.name}>
                  {c.name}
                </span>
              </td>
              <td className="py-2.5 pr-4 text-right">
                <div className="font-semibold tabular-nums" style={{ color: ADMIN_TEXT }}>
                  {fmtMoney(c.spend.current)}
                </div>
                <DeltaBadge d={c.spend} />
              </td>
              <td className="py-2.5 pr-4 text-right">
                <div className="font-semibold tabular-nums" style={{ color: ADMIN_TEXT }}>
                  {fmtInt(c.clicks.current)}
                </div>
                <DeltaBadge d={c.clicks} />
              </td>
              <td className="py-2.5 pr-4 text-right">
                <div className="font-semibold tabular-nums" style={{ color: ADMIN_TEXT }}>
                  {fmtInt(c.conversions.current)}
                </div>
                <DeltaBadge d={c.conversions} />
              </td>
              <td className="py-2.5 text-right">
                <div className="font-semibold tabular-nums" style={{ color: ADMIN_TEXT }}>
                  {fmtInt(c.impressions.current)}
                </div>
                <DeltaBadge d={c.impressions} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdsPlatformSectionBlock({ platform }: { platform: AdsPlatformSection }) {
  return (
    <div className={`${adminCardCls} max-w-full min-w-0 overflow-hidden`}>
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4"
        style={{ borderColor: ADMIN_BORDER }}
      >
        <h3 className={`min-w-0 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
          {platform.label}
        </h3>
        <span className="text-[10px] uppercase tracking-wide" style={{ color: ADMIN_TEXT_MUTED }}>
          Account summary
        </span>
      </div>
      <div className="p-5">
        <AccountSummaryCard s={platform.account} />
      </div>
      <CampaignTable platform={platform} />
    </div>
  );
}

function AdsPlatforms({ platforms }: { platforms: AdsPlatformSection[] }) {
  return (
    <div className="space-y-8">
      {platforms.map((p) => (
        <AdsPlatformSectionBlock key={p.source} platform={p} />
      ))}
    </div>
  );
}

function fmtChangelogWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function LiveChangelogBlock({ entries }: { entries: LiveChangelogEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className={`${adminCardCls} px-5 py-6 text-sm`} style={{ color: ADMIN_TEXT_MUTED }}>
        No recent site activity logged yet. Blog publishes, page SEO edits, and drafts will show here.
      </p>
    );
  }

  return (
    <ul className={`${adminCardCls} divide-y`} style={{ borderColor: ADMIN_BORDER }}>
      {entries.map((entry, i) => (
        <li
          key={`${entry.route_path}-${entry.occurred_at}-${i}`}
          className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:gap-3"
        >
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
            style={{
              backgroundColor:
                entry.kind === "in_progress"
                  ? "#FEF3C7"
                  : entry.kind === "published"
                    ? "#DCFCE7"
                    : `${ADMIN_NAVY}0d`,
              color: entry.kind === "in_progress" ? "#B45309" : entry.kind === "published" ? "#047857" : ADMIN_NAVY,
            }}
          >
            <i
              className={
                entry.kind === "in_progress"
                  ? "ri-draft-line"
                  : entry.entity_type === "blog"
                    ? "ri-article-line"
                    : "ri-file-edit-line"
              }
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="break-all font-mono text-[11px]" style={{ color: ADMIN_TEXT }}>
                {entry.route_path || "—"}
              </span>
              {entry.kind === "in_progress" ? (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">
                  In progress
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium" style={{ color: ADMIN_TEXT }}>
              {entry.title}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
              {entry.summary}
              {entry.status ? ` · ${entry.status}` : ""}
            </p>
          </div>
          <time
            className="shrink-0 text-xs tabular-nums sm:self-start sm:pt-0.5"
            style={{ color: ADMIN_TEXT_MUTED }}
          >
            {fmtChangelogWhen(entry.occurred_at)}
          </time>
        </li>
      ))}
    </ul>
  );
}

function SeoDeliverablesBlock({ deliverables }: { deliverables: SeoDeliverables }) {
  const { blogs_published, pages_added, updates } = deliverables;
  return (
    <div className="space-y-4">
      {blogs_published.length > 0 ? (
        <div className={`${adminCardCls} min-w-0 px-5 py-5`}>
          <h3 className={`mb-1 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Blog posts published ({blogs_published.length})
          </h3>
          <p className="mb-3 text-[11px] leading-snug" style={{ color: ADMIN_TEXT_MUTED }}>
            Counts posts that went live this period (publish date, first publish without a date, or
            draft → published in the change log). Edits to posts already live with an older publish
            date are not included.
          </p>
          <ul className="space-y-2">
            {blogs_published.map((b) => (
              <li
                key={b.route_path}
                className="flex flex-col gap-1 rounded-lg bg-[#F0FDF4] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium break-words" style={{ color: ADMIN_TEXT }}>
                    {b.title}
                  </p>
                  <p className="break-all font-mono text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                    {b.route_path}
                  </p>
                </div>
                <time className="shrink-0 text-xs sm:text-right" style={{ color: ADMIN_TEXT_MUTED }}>
                  {fmtChangelogWhen(b.published_at)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {pages_added.length > 0 ? (
        <div className={`${adminCardCls} min-w-0 px-5 py-5`}>
          <h3 className={`mb-3 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            New pages added ({pages_added.length})
          </h3>
          <ul className="space-y-2">
            {pages_added.map((p) => (
              <li
                key={p.route_path}
                className="flex flex-col gap-1 rounded-lg bg-[#EFF6FF] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium break-words" style={{ color: ADMIN_TEXT }}>
                    {p.page_title}
                  </p>
                  <p className="break-all font-mono text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                    {p.route_path}
                  </p>
                </div>
                <time className="shrink-0 text-xs sm:text-right" style={{ color: ADMIN_TEXT_MUTED }}>
                  {fmtChangelogWhen(p.added_at)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {updates.length > 0 ? (
        <div className={`${adminCardCls} min-w-0 px-5 py-5`}>
          <h3 className={`mb-3 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            SEO & content updates ({updates.length})
          </h3>
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {updates.map((u) => (
              <li
                key={u.id}
                className="flex flex-col gap-1 border-b pb-2 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-2"
                style={{ borderColor: `${ADMIN_BORDER}66` }}
              >
                <div className="min-w-0 flex-1">
                  <span className="break-all font-mono text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
                    {u.route_path}
                  </span>
                  <p className="text-sm break-words" style={{ color: ADMIN_TEXT }}>
                    {u.summary}
                  </p>
                </div>
                <time className="shrink-0 text-xs sm:text-right" style={{ color: ADMIN_TEXT_MUTED }}>
                  {fmtChangelogWhen(u.created_at)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function CallTrackingBlock({ report }: { report: CallTrackingReport }) {
  return (
    <div className="space-y-6">
      {report.sources.map((source) => (
        <CallTrackingSourcePanel key={source.provider} source={source} />
      ))}
    </div>
  );
}

function CallTrackingSourcePanel({ source }: { source: CallTrackingSourceSummary }) {
  const [tagFilter, setTagFilter] = useState("");

  const filteredTags = useMemo(() => {
    const q = tagFilter.trim().toLowerCase();
    if (!q) return source.top_tags;
    return source.top_tags.filter((row) => row.tag.toLowerCase().includes(q));
  }, [source.top_tags, tagFilter]);

  return (
    <div className={`${adminCardCls} max-w-full min-w-0 overflow-hidden`}>
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4"
        style={{ borderColor: ADMIN_BORDER }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <i
            className={
              source.provider === "callrail" ? "ri-phone-find-line text-lg" : "ri-phone-line text-lg"
            }
            style={{ color: ADMIN_NAVY }}
          />
          <h3 className={`text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            {source.label}
          </h3>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2">
        <StatCard
          label="Call volume"
          value={fmtInt(source.calls.current)}
          footer={<DeltaBadge d={source.calls} />}
        />
        <StatCard
          label="Form submissions"
          value={fmtInt(source.forms.current)}
          footer={<DeltaBadge d={source.forms} />}
        />
      </div>

      {source.top_tags.length > 0 ? (
        <div className="border-t px-5 py-4" style={{ borderColor: ADMIN_BORDER }}>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_TEXT_MUTED }}>
              Call tags (current period)
            </p>
            <div className="relative w-full max-w-xs sm:w-56">
              <i
                className="ri-search-line pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: ADMIN_TEXT_MUTED }}
                aria-hidden
              />
              <input
                type="search"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                placeholder="Filter tags…"
                aria-label="Filter call tags"
                className="w-full rounded-lg border py-2 pl-8 pr-8 text-sm outline-none focus:ring-2"
                style={{
                  borderColor: ADMIN_BORDER,
                  color: ADMIN_TEXT,
                }}
              />
              {tagFilter ? (
                <button
                  type="button"
                  onClick={() => setTagFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 transition hover:bg-black/5"
                  style={{ color: ADMIN_TEXT_MUTED }}
                  aria-label="Clear tag filter"
                >
                  <i className="ri-close-line text-base" aria-hidden />
                </button>
              ) : null}
            </div>
          </div>
          {tagFilter.trim() ? (
            <p className="mb-2 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
              Showing {filteredTags.length} of {source.top_tags.length} tags
            </p>
          ) : null}
          {filteredTags.length > 0 ? (
            <div className="max-w-full min-w-0 overflow-x-auto max-h-80 overflow-y-auto [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-[10px] uppercase tracking-widest" style={{ color: ADMIN_TEXT_MUTED }}>
                    <th className="pb-2 pr-4 font-semibold">Tag</th>
                    <th className="pb-2 pr-4 text-right font-semibold">Calls</th>
                    <th className="pb-2 text-right font-semibold">vs prior</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.map((row) => (
                    <tr key={row.tag} className="border-t" style={{ borderColor: `${ADMIN_BORDER}88` }}>
                      <td className="max-w-[200px] py-2.5 pr-4 font-medium break-words" style={{ color: ADMIN_TEXT }}>
                        {row.tag}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums" style={{ color: ADMIN_TEXT }}>
                        {fmtInt(row.calls.current)}
                      </td>
                      <td className="py-2.5 text-right">
                        <DeltaBadge d={row.calls} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
              No tags match &ldquo;{tagFilter.trim()}&rdquo;.
            </p>
          )}
        </div>
      ) : (
        <p className="px-5 pb-4 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
          No call tags recorded in this period.
        </p>
      )}
    </div>
  );
}

function GmbBlock({ gmb }: { gmb: GmbSummary }) {
  const items: { label: string; icon: string; d: MetricDelta }[] = [
    { label: "Profile views", icon: "ri-eye-line", d: gmb.views },
    { label: "Calls", icon: "ri-phone-line", d: gmb.calls },
    { label: "Direction requests", icon: "ri-map-pin-line", d: gmb.directions },
    { label: "Website clicks", icon: "ri-external-link-line", d: gmb.website_clicks },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <StatCard
          key={it.label}
          label={it.label}
          value={fmtInt(it.d.current)}
          footer={<DeltaBadge d={it.d} />}
        />
      ))}
    </div>
  );
}

export interface MarketingReportViewProps {
  data: MarketingReportPayload;
  /** Hide admin-only affordances (connect links, internal CTAs) for client-facing view. */
  publicMode?: boolean;
}

export default function MarketingReportView({ data, publicMode = false }: MarketingReportViewProps) {
  const periodLabel = `${fmtShortDate(data.date_ranges.current.start)} – ${fmtShortDate(
    data.date_ranges.current.end,
  )}`;
  const s = data.search.summary;

  return (
    <div className="min-w-0 max-w-full space-y-10">
      {/* ── Live activity ──────────────────────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-pulse-line"
          title="What we're working on"
          subtitle="Live changelog — recent publishes, SEO edits, and drafts in progress"
        />
        <LiveChangelogBlock entries={data.live_changelog} />
      </section>

      {/* ── Organic search ─────────────────────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-google-line"
          title="Organic Search"
          subtitle={`Google Search Console · ${periodLabel}`}
          status={data.search.status}
        />
        {data.search.status === "connected" && s ? (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Clicks" value={fmtInt(s.clicks.current)} footer={<DeltaBadge d={s.clicks} />} />
              <StatCard label="Impressions" value={fmtInt(s.impressions.current)} footer={<DeltaBadge d={s.impressions} />} />
              <StatCard
                label="CTR"
                value={`${(s.ctr.current * 100).toFixed(2)}%`}
                footer={<span style={{ color: ADMIN_TEXT_MUTED }}>Prior {(s.ctr.previous * 100).toFixed(2)}%</span>}
              />
              <StatCard
                label="Avg position"
                value={s.position.current.toFixed(1)}
                footer={
                  <DeltaBadge d={{ current: s.position.current, previous: s.position.previous, delta: s.position.delta, deltaPct: null }} invert suffix="" />
                }
              />
            </div>
            {data.search.daily.length > 0 ? (
              <article className={`${adminCardCls} min-w-0 overflow-hidden px-4 py-5 sm:px-6 sm:py-6`}>
                <TrafficLineChart daily={data.search.daily} periodLabel={periodLabel} />
              </article>
            ) : null}
            {(data.search.top_pages.length > 0 || data.search.top_queries.length > 0) && (
              <div className="grid gap-6 lg:grid-cols-2">
                {data.search.top_queries.length > 0 ? (
                  <div className={`${adminCardCls} min-w-0 px-5 py-5`}>
                    <h3 className={`mb-3 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                      Top growing searches
                    </h3>
                    <ul className="space-y-2">
                      {data.search.top_queries.map((q) => (
                        <li
                          key={q.query}
                          className="flex flex-col gap-1 rounded-lg bg-[#F0FDF4] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                        >
                          <span className="min-w-0 text-sm font-medium break-words" style={{ color: ADMIN_TEXT }}>
                            {q.query}
                          </span>
                          <span
                            className="shrink-0 text-xs font-semibold sm:text-right"
                            style={{ color: ADMIN_TEXT_MUTED }}
                          >
                            {fmtInt(q.clicks)} clicks · pos {q.position.toFixed(1)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {data.search.top_pages.length > 0 ? (
                  <div className={`${adminCardCls} min-w-0 px-5 py-5`}>
                    <h3 className={`mb-3 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
                      Top growing pages
                    </h3>
                    <ul className="space-y-2">
                      {data.search.top_pages.map((p) => (
                        <li
                          key={p.path}
                          className="flex flex-col gap-1 rounded-lg bg-[#EFF6FF] px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                        >
                          <span className="min-w-0 break-all font-mono text-xs" style={{ color: ADMIN_TEXT }}>
                            {p.path}
                          </span>
                          <span className="shrink-0 text-xs font-bold sm:text-right" style={{ color: ADMIN_ACCENT }}>
                            +{fmtInt(p.clicks_delta)} clicks
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ) : (
          <NotConnected label="Search Console" />
        )}
        {data.search.deliverables ? (
          <div className="mt-6">
            <h3 className={`mb-3 text-base font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              Content shipped this period
            </h3>
            <SeoDeliverablesBlock deliverables={data.search.deliverables} />
          </div>
        ) : null}
      </section>

      {/* ── Paid media ─────────────────────────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-megaphone-line"
          title="Paid Advertising"
          subtitle="Google Ads · Meta · Microsoft — account summary and campaign breakdown"
          status={data.ads.status}
        />
        {data.ads.status === "connected" && data.ads.data ? (
          <AdsPlatforms platforms={data.ads.data} />
        ) : (
          <NotConnected label="Paid advertising" />
        )}
      </section>

      {/* ── Google Business Profile ────────────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-store-2-line"
          title="Google Business Profile"
          subtitle="Local visibility & engagement"
          status={data.gmb.status}
        />
        {data.gmb.status === "connected" && data.gmb.data ? (
          <GmbBlock gmb={data.gmb.data} />
        ) : (
          <NotConnected label="Google Business Profile" />
        )}
      </section>

      {/* ── PageSpeed ──────────────────────────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-speed-up-line"
          title="Website Performance"
          subtitle="Google PageSpeed Insights"
          status={data.pagespeed.status}
        />
        {data.pagespeed.status === "connected" && data.pagespeed.data ? (
          <PageSpeedGrid entries={data.pagespeed.data} />
        ) : data.pagespeed.status === "no_data" ? (
          <NotConnected
            label="PageSpeed monitoring"
            hint="PageSpeed URLs are configured — click Sync data to pull the latest scores (requires GOOGLE_PSI_API_KEY on the server)."
          />
        ) : (
          <NotConnected label="PageSpeed monitoring" />
        )}
      </section>

      {/* ── Call tracking (CallRail + CTM) ─────────────────────────── */}
      <section>
        <SectionHeader
          icon="ri-phone-find-line"
          title="Call & form tracking"
          subtitle="CallRail · Call Tracking Metrics"
          status={data.callTracking.status}
        />
        {data.callTracking.status === "connected" && data.callTracking.data ? (
          <CallTrackingBlock report={data.callTracking.data} />
        ) : (
          <NotConnected label="Call tracking (set Windsor CallRail account, CallRail API keys, or CTM credentials — then run Sync metrics)" />
        )}
      </section>

      {/* ── Coming soon channels ───────────────────────────────────── */}
      {!publicMode ? (
        <section className="grid gap-3 sm:grid-cols-2">
          <NotConnected label="Google Analytics 4" />
        </section>
      ) : null}
    </div>
  );
}
