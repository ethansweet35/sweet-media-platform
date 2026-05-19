"use client";

/**
 * Hover popover that shows the top 5 keywords a page is actively receiving
 * impressions for, pulled from Google Search Console (free, real data).
 *
 * Uses position:fixed so the popover escapes table overflow:hidden contexts.
 * Fetches lazily on first hover; caches results in memory for the session.
 */

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ADMIN_OCEAN } from "../lib/adminTheme";

const SHOW_TOP_N = 5;

interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageQueriesResponse {
  ok: boolean;
  rows: GscQueryRow[];
  needs_oauth?: boolean;
  error?: string;
}

interface CacheEntry {
  rows: GscQueryRow[];
  fetchedAt: number;
}

const queryCache = new Map<string, CacheEntry>();
// Re-fetch after 30 min, or immediately if the cached result was empty
// (so a stale "no data" result from before a fix doesn't persist forever).
const CACHE_TTL_MS = 30 * 60 * 1000;
const EMPTY_CACHE_TTL_MS = 5 * 60 * 1000;

function positionBadgeClass(pos: number): string {
  if (pos <= 3) return "bg-emerald-50 text-emerald-700";
  if (pos <= 10) return "bg-amber-50 text-amber-700";
  if (pos <= 20) return "bg-orange-50 text-orange-700";
  return "bg-neutral-100 text-neutral-500";
}

type FetchStatus = "idle" | "loading" | "done" | "error" | "none" | "no_auth";

export interface RankingKeywordsPopoverProps {
  pageUrl: string;
  children: ReactNode;
}

export default function RankingKeywordsPopover({
  pageUrl,
  children,
}: RankingKeywordsPopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [rows, setRows] = useState<GscQueryRow[]>([]);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const fetchKeywords = useCallback(async () => {
    const cached = queryCache.get(pageUrl);
    if (cached) {
      const ttl = cached.rows.length === 0 ? EMPTY_CACHE_TTL_MS : CACHE_TTL_MS;
      if (Date.now() - cached.fetchedAt < ttl) {
        setRows(cached.rows);
        setStatus(cached.rows.length === 0 ? "none" : "done");
        return;
      }
      // Stale — fall through to re-fetch
      queryCache.delete(pageUrl);
    }
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/admin/search-console/page-queries?url=${encodeURIComponent(pageUrl)}&days=90`,
      );
      const data = (await res.json()) as PageQueriesResponse;
      if (data.needs_oauth) { setStatus("no_auth"); return; }
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Request failed");
      const top = data.rows.slice(0, SHOW_TOP_N);
      queryCache.set(pageUrl, { rows: top, fetchedAt: Date.now() });
      setRows(top);
      setStatus(top.length === 0 ? "none" : "done");
    } catch {
      setStatus("error");
    }
  }, [pageUrl]);

  const handleMouseEnter = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Calculate fixed coords from the trigger element
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 6, left: rect.left });
    }
    setOpen(true);
    if (status === "idle") void fetchKeywords();
  }, [status, fetchKeywords]);

  const handleMouseLeave = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => setOpen(false), 200);
  }, []);

  const popover = open && mounted ? (
    <div
      style={{ position: "fixed", top: coords.top, left: coords.left, zIndex: 9999 }}
      className="w-72 rounded-xl border border-neutral-200 bg-white shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Arrow */}
      <div className="absolute -top-1.5 left-3 h-3 w-3 rotate-45 border-l border-t border-neutral-200 bg-white" />

      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-neutral-100">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: ADMIN_OCEAN }}>
          <i className="ri-google-line mr-1" />
          Top ranking queries · GSC
        </p>
        <p className="mt-0.5 text-[10px] text-neutral-400 truncate">{pageUrl}</p>
      </div>

      {/* Body */}
      <div className="px-2 py-2">
        {status === "loading" && (
          <div className="flex items-center gap-2 px-2 py-3 text-[12px] text-neutral-500">
            <i className="ri-loader-4-line animate-spin text-sm" style={{ color: ADMIN_OCEAN }} />
            Fetching from Search Console…
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 px-2 py-3 text-[12px] text-red-500">
            <i className="ri-error-warning-line text-sm" />
            Failed to load rankings.
          </div>
        )}
        {status === "no_auth" && (
          <div className="px-2 py-3 text-[12px] text-neutral-500 text-center">
            <i className="ri-link-unlink-line block text-xl text-neutral-300 mb-1" />
            Connect Search Console to see rankings.
          </div>
        )}
        {status === "none" && (
          <p className="px-2 py-3 text-[12px] text-neutral-500 text-center">
            No GSC impressions found for this page yet.
          </p>
        )}
        {status === "done" && (
          <ul className="divide-y divide-neutral-50">
            {rows.map((row, i) => (
              <li key={row.query} className="flex items-center gap-2.5 px-2 py-2">
                <span className="text-[10px] font-bold text-neutral-300 w-3 shrink-0 text-center">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-neutral-800 truncate">{row.query}</p>
                  <p className="text-[10px] text-neutral-400">
                    {row.impressions.toLocaleString()} impr · {row.clicks.toLocaleString()} clk
                  </p>
                </div>
                <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${positionBadgeClass(Math.round(row.position))}`}>
                  #{Math.round(row.position)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {status === "done" && (
        <div className="px-3.5 py-2 border-t border-neutral-100">
          <a
            href="/admin/keyword-research"
            className="text-[10px] font-semibold text-neutral-400 hover:text-neutral-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            See full rankings in Keyword Research →
          </a>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {mounted && createPortal(popover, document.body)}
    </div>
  );
}
