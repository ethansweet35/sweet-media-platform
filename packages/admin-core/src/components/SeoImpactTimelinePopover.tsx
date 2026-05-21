"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSans,
  adminFontSerif,
} from "../lib/adminTheme";
import { formatChangeValue, type ContentEntityType } from "../lib/contentChangeLog";

const POPOVER_W = 400;
const CACHE_TTL_MS = 20 * 60 * 1000;

type ChangeRow = {
  id: string;
  field_key: string;
  field_label: string;
  summary: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  created_at: string;
};

type MetricBlock = {
  current: { clicks: number; impressions: number; position: number };
  previous: { clicks: number; impressions: number; position: number };
  deltas: {
    clicks: number;
    clicksPct: number | null;
    impressions: number;
    impressionsPct: number | null;
    positionDelta: number;
  };
  daily: { date: string; impressions: number }[];
};

type SeoImpactResponse = {
  ok: boolean;
  changes: ChangeRow[];
  metrics: MetricBlock | null;
  needs_oauth?: boolean;
  no_gsc_data?: boolean;
  period_days?: number;
  error?: string;
};

type CacheEntry = { data: SeoImpactResponse; fetchedAt: number };
const cache = new Map<string, CacheEntry>();

function fmtShortDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function DeltaBadge({
  label,
  value,
  pct,
  positiveIsGood,
}: {
  label: string;
  value: number;
  pct: number | null;
  positiveIsGood: boolean;
}) {
  const improved = positiveIsGood ? value > 0 : value < 0;
  const flat = value === 0;
  const color = flat ? "text-[#94A3B8]" : improved ? "text-emerald-700" : "text-red-600";
  const icon = flat ? "ri-subtract-line" : improved ? "ri-arrow-up-line" : "ri-arrow-down-line";

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2">
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">{label}</p>
      <p className={`mt-1 flex items-center gap-1 text-[13px] font-semibold ${color}`}>
        <i className={`${icon} text-xs`} />
        {value > 0 && positiveIsGood ? "+" : ""}
        {value.toLocaleString()}
        {pct !== null ? (
          <span className="text-[10px] font-medium opacity-80">
            ({pct > 0 ? "+" : ""}
            {pct}%)
          </span>
        ) : null}
      </p>
    </div>
  );
}

function MiniSparkline({ daily }: { daily: { date: string; impressions: number }[] }) {
  if (daily.length < 2) return null;
  const max = Math.max(...daily.map((d) => d.impressions), 1);
  const h = 28;
  const w = 100;
  const step = w / (daily.length - 1);
  const points = daily
    .map((d, i) => {
      const x = i * step;
      const y = h - (d.impressions / max) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="shrink-0 text-[#7B9FD4]" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export interface SeoImpactTimelinePopoverProps {
  entityType: ContentEntityType;
  entityId: string;
  pageUrl: string;
  children: ReactNode;
}

/**
 * Hover popover: recent SEO/content changes + GSC period-over-period impact.
 */
export default function SeoImpactTimelinePopover({
  entityType,
  entityId,
  pageUrl,
  children,
}: SeoImpactTimelinePopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [data, setData] = useState<SeoImpactResponse | null>(null);
  const [mounted, setMounted] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cacheKey = `${entityType}:${entityId}:${pageUrl}`;

  const load = useCallback(async () => {
    const hit = cache.get(cacheKey);
    if (hit && Date.now() - hit.fetchedAt < CACHE_TTL_MS) {
      setData(hit.data);
      setStatus("done");
      return;
    }
    setStatus("loading");
    try {
      const params = new URLSearchParams({
        entity_type: entityType,
        entity_id: entityId,
        page_url: pageUrl,
        days: "28",
      });
      const res = await fetch(`/api/admin/seo-impact?${params}`);
      const json = (await res.json()) as SeoImpactResponse;
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }
      cache.set(cacheKey, { data: json, fetchedAt: Date.now() });
      setData(json);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setData({
        ok: false,
        changes: [],
        metrics: null,
        error: err instanceof Error ? err.message : "Failed to load",
      });
    }
  }, [cacheKey, entityType, entityId, pageUrl]);

  const positionPopover = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const left = Math.min(
      Math.max(8, rect.left),
      window.innerWidth - POPOVER_W - 8,
    );
    setCoords({ top: rect.bottom + 8, left });
  }, []);

  const show = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setOpen(true);
    positionPopover();
    if (status === "idle") void load();
  };

  const hide = () => {
    hideTimeoutRef.current = setTimeout(() => setOpen(false), 180);
  };

  const periodDays = data?.period_days ?? 28;

  const popover = open && mounted ? (
    <div
      className="fixed z-[9999] overflow-hidden rounded-xl border bg-white shadow-2xl"
      style={{
        top: coords.top,
        left: coords.left,
        width: POPOVER_W,
        borderColor: ADMIN_BORDER,
      }}
      onMouseEnter={() => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      }}
      onMouseLeave={hide}
    >
      <div
        className="border-b px-4 py-3"
        style={{ borderColor: ADMIN_BORDER, backgroundColor: `${ADMIN_NAVY}08` }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: ADMIN_ACCENT }}>
          SEO impact
        </p>
        <p className={`mt-0.5 text-sm font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
          Changes &amp; performance
        </p>
        <p className={`mt-1 text-[11px] ${adminFontSans}`} style={{ color: ADMIN_TEXT_MUTED }}>
          Last {periodDays}d vs prior {periodDays}d (GSC)
        </p>
      </div>

      <div className="max-h-[420px] overflow-y-auto px-4 py-3">
        {status === "loading" ? (
          <div className="flex items-center gap-2 py-6 text-sm text-[#94A3B8]">
            <i className="ri-loader-4-line animate-spin" />
            Loading timeline…
          </div>
        ) : null}

        {status === "error" ? (
          <p className="py-4 text-[12px] text-red-600">{data?.error ?? "Could not load."}</p>
        ) : null}

        {status === "done" && data ? (
          <>
            {data.needs_oauth ? (
              <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
                <i className="ri-google-line mr-1" />
                Connect Search Console in admin to see traffic impact.
              </p>
            ) : null}

            {data.metrics ? (
              <section className="mb-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                    GSC performance
                  </p>
                  <MiniSparkline daily={data.metrics.daily} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <DeltaBadge
                    label="Clicks"
                    value={data.metrics.deltas.clicks}
                    pct={data.metrics.deltas.clicksPct}
                    positiveIsGood
                  />
                  <DeltaBadge
                    label="Impressions"
                    value={data.metrics.deltas.impressions}
                    pct={data.metrics.deltas.impressionsPct}
                    positiveIsGood
                  />
                  <DeltaBadge
                    label="Avg position"
                    value={data.metrics.deltas.positionDelta}
                    pct={null}
                    positiveIsGood={false}
                  />
                </div>
                <p className="mt-2 text-[10px] text-[#94A3B8]">
                  Now: {data.metrics.current.clicks} clk ·{" "}
                  {data.metrics.current.impressions.toLocaleString()} imp · pos{" "}
                  {data.metrics.current.position.toFixed(1)}
                </p>
              </section>
            ) : data.no_gsc_data ? (
              <p className="mb-3 text-[11px] text-[#94A3B8]">No GSC data for this URL yet.</p>
            ) : null}

            <section>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                Recent changes
              </p>
              {data.changes.length === 0 ? (
                <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                  No logged changes yet. Edits to SEO fields, keywords, and content will appear here
                  going forward.
                </p>
              ) : (
                <ul className="space-y-3">
                  {data.changes.map((c) => (
                    <li
                      key={c.id}
                      className="relative border-l-2 pl-3"
                      style={{ borderColor: ADMIN_ACCENT }}
                    >
                      <time className="text-[10px] font-semibold text-[#94A3B8]">
                        {fmtShortDate(c.created_at)}
                      </time>
                      <p className="text-[12px] font-semibold text-[#0A1F44]">{c.field_label}</p>
                      <p className="text-[11px] text-[#64748B]">{c.summary}</p>
                      {(c.old_value || c.new_value) && c.field_key !== "content" ? (
                        <p className="mt-1 text-[10px] leading-snug text-[#64748B]">
                          <span className="text-[#94A3B8]">Was:</span>{" "}
                          {formatChangeValue(c.old_value)}
                          <br />
                          <span className="text-[#94A3B8]">Now:</span>{" "}
                          {formatChangeValue(c.new_value)}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>
      {mounted && popover ? createPortal(popover, document.body) : null}
    </>
  );
}
