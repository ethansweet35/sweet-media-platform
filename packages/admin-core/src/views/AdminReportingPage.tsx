"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminCardCls,
  adminFontSerif,
} from "../lib/adminTheme";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useMarketingOverview } from "../hooks/useMarketingOverview";
import { useReportShares } from "../hooks/useReportShares";
import MarketingReportView from "../components/marketing/MarketingReportView";
import type { ReportShareRow } from "../types/marketing";

const PERIODS = [7, 28, 90] as const;

function reportUrl(token: string): string {
  let origin = "";
  try {
    origin = getPublicSiteOrigin();
  } catch {
    origin = "";
  }
  if (!origin && typeof window !== "undefined") origin = window.location.origin;
  return `${origin.replace(/\/$/, "")}/report/${token}`;
}

function ShareRow({
  share,
  onToggle,
  onDelete,
}: {
  share: ReportShareRow;
  onToggle: (s: ReportShareRow) => void;
  onDelete: (s: ReportShareRow) => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = reportUrl(share.token);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }, [url]);

  return (
    <li className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderColor: ADMIN_BORDER }}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: ADMIN_TEXT }}>
            {share.label}
          </span>
          <span className="rounded-full bg-[#0A1F44]/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: ADMIN_TEXT_MUTED }}>
            {share.period_days}d
          </span>
          {!share.is_active ? (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
              Disabled
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          className="mt-1 block max-w-full truncate text-left font-mono text-xs hover:underline"
          style={{ color: ADMIN_TEXT_MUTED }}
          title={url}
        >
          {url}
        </button>
        {share.view_count > 0 ? (
          <p className="mt-0.5 text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
            {share.view_count} view{share.view_count === 1 ? "" : "s"}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white"
          style={{ backgroundColor: ADMIN_NAVY }}
        >
          <i className={copied ? "ri-check-line" : "ri-file-copy-line"} />
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[11px] font-semibold"
          style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
        >
          <i className="ri-external-link-line" />
          Open
        </a>
        <button
          type="button"
          onClick={() => onToggle(share)}
          className="inline-flex items-center rounded-lg border bg-white px-3 py-1.5 text-[11px] font-semibold"
          style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
          title={share.is_active ? "Disable link" : "Enable link"}
        >
          <i className={share.is_active ? "ri-pause-line" : "ri-play-line"} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(share)}
          className="inline-flex items-center rounded-lg border bg-white px-3 py-1.5 text-[11px] font-semibold text-red-600"
          style={{ borderColor: ADMIN_BORDER }}
          title="Delete link"
        >
          <i className="ri-delete-bin-line" />
        </button>
      </div>
    </li>
  );
}

export default function AdminReportingPage() {
  const [days, setDays] = useState<number>(28);
  const { data, loading, error, refetch } = useMarketingOverview(days);
  const shares = useReportShares();

  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newPeriod, setNewPeriod] = useState<number>(28);

  const onSync = useCallback(async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch("/api/admin/ingest-metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ lookback_days: 35 }),
      });
      const json = (await res.json()) as { ran?: string[]; written?: number; errors?: { channel: string; message: string }[] };
      const ran = json.ran && json.ran.length ? json.ran.join(", ") : "no channels configured";
      const errs =
        json.errors && json.errors.length
          ? ` · errors: ${json.errors.map((e) => `${e.channel}: ${e.message}`).join("; ")}`
          : "";
      setSyncMsg(`Synced ${ran} (${json.written ?? 0} rows)${errs}`);
      await refetch();
    } catch (e) {
      setSyncMsg(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  }, [refetch]);

  const onCreate = useCallback(async () => {
    setCreating(true);
    try {
      await shares.createShare({ label: newLabel || undefined, period_days: newPeriod });
      setNewLabel("");
    } catch {
      /* surfaced via shares.error */
    } finally {
      setCreating(false);
    }
  }, [newLabel, newPeriod, shares]);

  const onToggle = useCallback(
    (s: ReportShareRow) => void shares.updateShare(s.id, { is_active: !s.is_active }),
    [shares],
  );
  const onDelete = useCallback(
    (s: ReportShareRow) => {
      if (typeof window !== "undefined" && !window.confirm(`Delete the link "${s.label}"? Anyone with the URL will lose access.`)) return;
      void shares.deleteShare(s.id);
    },
    [shares],
  );

  const periodTabs = useMemo(
    () =>
      PERIODS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setDays(p)}
          className={`rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition ${days === p ? "text-white shadow-sm" : ""}`}
          style={days === p ? { backgroundColor: ADMIN_NAVY } : { color: ADMIN_TEXT_MUTED }}
        >
          {p}d
        </button>
      )),
    [days],
  );

  return (
    <div>
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className={`text-[2.4rem] font-semibold tracking-tight ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
            Marketing Reporting
          </h1>
          <p className="mt-2 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            One live view across search, ads, local, and site performance — and a shareable link for your client.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border bg-white p-1" style={{ borderColor: ADMIN_BORDER }}>
            {periodTabs}
          </div>
          <button
            type="button"
            onClick={() => void onSync()}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white disabled:opacity-60"
            style={{ backgroundColor: ADMIN_NAVY }}
          >
            <i className={syncing ? "ri-loader-4-line animate-spin" : "ri-refresh-line"} />
            {syncing ? "Syncing…" : "Sync data"}
          </button>
        </div>
      </section>

      {syncMsg ? (
        <div className="mb-6 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}>
          {syncMsg}
        </div>
      ) : null}

      {/* Share links */}
      <section className={`${adminCardCls} mb-8 overflow-hidden`}>
        <div className="flex flex-wrap items-end justify-between gap-3 border-b px-5 py-4" style={{ borderColor: ADMIN_BORDER }}>
          <div>
            <h2 className={`text-lg font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
              <i className="ri-share-forward-line mr-2" />
              Client share links
            </h2>
            <p className="text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
              Each link opens a live, read-only report at <span className="font-mono">/report/&lt;token&gt;</span> — no login required.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label (e.g. Acme Co.)"
              className="rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
            />
            <select
              value={newPeriod}
              onChange={(e) => setNewPeriod(parseInt(e.target.value, 10))}
              className="rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT }}
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p} days
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void onCreate()}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white disabled:opacity-60"
              style={{ backgroundColor: ADMIN_NAVY }}
            >
              <i className="ri-add-line" />
              New link
            </button>
          </div>
        </div>
        {shares.error ? (
          <div className="px-5 py-3 text-sm text-red-600">{shares.error}</div>
        ) : null}
        {shares.loading ? (
          <div className="px-5 py-8 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            Loading links…
          </div>
        ) : shares.shares.length === 0 ? (
          <div className="px-5 py-8 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
            No share links yet. Create one above to give a client live access.
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: ADMIN_BORDER }}>
            {shares.shares.map((s) => (
              <ShareRow key={s.id} share={s} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </ul>
        )}
      </section>

      {/* Report preview */}
      <section>
        <h2 className={`mb-1 text-xl font-semibold ${adminFontSerif}`} style={{ color: ADMIN_TEXT }}>
          Report preview
        </h2>
        <p className="mb-5 text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
          This is exactly what clients see at their share link.
        </p>
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
            <button type="button" onClick={() => void refetch()} className="ml-3 font-semibold underline">
              Retry
            </button>
          </div>
        ) : loading || !data ? (
          <div className={`flex items-center justify-center gap-3 ${adminCardCls} py-24`} style={{ color: ADMIN_TEXT_MUTED }}>
            <i className="ri-loader-4-line animate-spin text-2xl" />
            Building report…
          </div>
        ) : (
          <MarketingReportView data={data} />
        )}
      </section>
    </div>
  );
}
