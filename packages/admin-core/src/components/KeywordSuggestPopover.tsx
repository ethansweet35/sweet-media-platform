"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { cleanSeedPhrase } from "../lib/seedCleaner";
import type {
  SemrushKeywordOverviewDTO,
  SemrushKeywordSuggestionDTO,
  SemrushSuggestionsResponse,
} from "../types/semrush";

interface KeywordSuggestPopoverProps {
  /** Current keyword in the parent input. Used as the seed when non-empty. */
  currentKeyword: string;
  /**
   * Auto-derived seed (e.g. the page title, blog title, or URL slug).
   * Used when `currentKeyword` is empty. Will be passed through `cleanSeedPhrase`
   * (subtitle stripping, stopword removal, 4-word cap) so long titles like
   * "Parent Enabling Addiction: Signs & How to Stop" still return Semrush results.
   */
  seedFallback?: string;
  /**
   * The page's route path (e.g. "/about"). When provided and the seed is ≤2 words,
   * the server crawls the live page and uses its H1 as a better Semrush seed.
   */
  routePath?: string;
  /** Called when the user clicks a suggestion (or the seed row itself). */
  onSelect: (phrase: string) => void;
  /** Optional className for the trigger button. */
  className?: string;
  /** Disable the trigger (e.g. while parent form is submitting). */
  disabled?: boolean;
}

type SortKey = "searchVolume" | "difficulty" | "cpc";

const SUGGEST_LIMIT = 10;
const POPOVER_WIDTH = 460;
const POPOVER_GAP = 8;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function formatNumber(n: number): string {
  if (!Number.isFinite(n) || n === 0) return "—";
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function difficultyClass(kd: number): string {
  if (kd === 0) return "text-neutral-400";
  if (kd < 30) return "text-emerald-600";
  if (kd < 50) return "text-amber-600";
  if (kd < 70) return "text-orange-600";
  return "text-red-600";
}

function difficultyLabel(kd: number): string {
  if (kd === 0) return "—";
  if (kd < 30) return "Easy";
  if (kd < 50) return "Medium";
  if (kd < 70) return "Hard";
  return "Very Hard";
}

/**
 * Inline keyword research popover.
 *
 * Rendering: the popover content is portalled into `document.body` with fixed
 * positioning so it always escapes table/cell overflow clipping. Position is
 * recomputed on scroll/resize so it stays attached to the trigger.
 */
export default function KeywordSuggestPopover({
  currentKeyword,
  seedFallback,
  routePath,
  onSelect,
  className,
  disabled,
}: KeywordSuggestPopoverProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState<SemrushKeywordOverviewDTO | null>(null);
  const [suggestions, setSuggestions] = useState<SemrushKeywordSuggestionDTO[]>([]);
  const [lastFetchedSeed, setLastFetchedSeed] = useState<string | null>(null);
  const [serverEffectiveSeed, setServerEffectiveSeed] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("searchVolume");
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Effective seed: prefer the user's typed/saved keyword as-is. Fall back to
  // the cleaned auto-derived seed so even a 12-word blog title returns results.
  const trimmedKeyword = currentKeyword.trim();
  const cleanedFallback = cleanSeedPhrase(seedFallback);
  const effectiveSeed = trimmedKeyword || cleanedFallback;
  const seedIsAutoDerived = !trimmedKeyword && cleanedFallback.length > 0;

  // Track mount for portal SSR safety.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute popover position relative to the trigger button.
  const computePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + POPOVER_GAP,
      right: Math.max(8, window.innerWidth - rect.right),
    });
  }, []);

  useIsoLayoutEffect(() => {
    if (open) computePosition();
  }, [open, computePosition]);

  // Reposition on scroll/resize while open.
  useEffect(() => {
    if (!open) return;
    const onScroll = () => computePosition();
    const onResize = () => computePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, computePosition]);

  // Click-outside / Escape closes.
  useEffect(() => {
    if (!open) return;
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (portalRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const fetchSuggestions = useCallback(async (seedPhrase: string) => {
    const cleaned = seedPhrase.trim();
    if (!cleaned) {
      setError("No seed phrase available — type a keyword or set a page title.");
      return;
    }
    if (cleaned === lastFetchedSeed && suggestions.length > 0) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/semrush/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase: cleaned, limit: SUGGEST_LIMIT, route_path: routePath }),
      });
      const data = (await res.json()) as SemrushSuggestionsResponse;
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      setSeed(data.seed);
      setSuggestions(data.suggestions);
      setLastFetchedSeed(cleaned);
      setServerEffectiveSeed(data.effectiveSeed ?? cleaned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch suggestions.");
      setSeed(null);
      setSuggestions([]);
      setServerEffectiveSeed(null);
    } finally {
      setLoading(false);
    }
  }, [lastFetchedSeed, suggestions.length]);

  const handleTrigger = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && effectiveSeed && effectiveSeed !== lastFetchedSeed) {
        void fetchSuggestions(effectiveSeed);
      }
      return next;
    });
  };

  const handleSelect = (phrase: string) => {
    onSelect(phrase);
    setOpen(false);
  };

  const sorted = [...suggestions].sort((a, b) => {
    if (sortKey === "cpc") return b.cpc - a.cpc;
    if (sortKey === "difficulty") {
      const ax = a.difficulty || 999;
      const bx = b.difficulty || 999;
      return ax - bx;
    }
    return b.searchVolume - a.searchVolume;
  });

  const popoverContent = (
    <div
      ref={portalRef}
      style={{
        position: "fixed",
        top: position?.top ?? 0,
        right: position?.right ?? 0,
        width: POPOVER_WIDTH,
        maxWidth: "92vw",
        zIndex: 100,
      }}
      className="rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      role="dialog"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-100">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
            <i className="ri-search-eye-line mr-1" style={{ color: ADMIN_OCEAN }} />
            Semrush Keyword Research
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-400 truncate">
            Seed:{" "}
            <span className="font-mono">{effectiveSeed || "(none)"}</span>
            {seedIsAutoDerived && (
              <span className="ml-1 text-[10px] text-neutral-400">(auto-derived)</span>
            )}
          </p>
          {serverEffectiveSeed &&
            lastFetchedSeed &&
            serverEffectiveSeed !== lastFetchedSeed && (
              <p className="mt-0.5 text-[10px] text-amber-600 truncate">
                <i className="ri-arrow-right-down-line mr-0.5" />
                Original seed returned 0 — matched on{" "}
                <span className="font-mono font-semibold">{serverEffectiveSeed}</span>
              </p>
            )}
        </div>
        <button
          type="button"
          onClick={() => fetchSuggestions(effectiveSeed)}
          disabled={loading || !effectiveSeed}
          className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          {loading ? (
            <>
              <i className="ri-loader-4-line animate-spin" /> Loading
            </>
          ) : lastFetchedSeed ? (
            "Refresh"
          ) : (
            "Fetch"
          )}
        </button>
      </div>

      {/* Body */}
      <div className="max-h-[60vh] overflow-y-auto">
        {error && (
          <div className="m-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 flex items-start gap-2">
            <i className="ri-error-warning-line mt-0.5 shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        )}

        {!error && !loading && !lastFetchedSeed && (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-neutral-500 leading-relaxed">
              Click <span className="font-semibold">Fetch</span> to pull a Semrush overview for
              &quot;{effectiveSeed || "(seed)"}&quot; plus the top {SUGGEST_LIMIT}{" "}
              broad-match keywords (matches Keyword Magic Tool).
            </p>
            {seedIsAutoDerived && (
              <p className="mt-2 text-[10px] text-neutral-500 italic">
                Seed auto-derived from this row — Semrush will broad-match on it
                even though you haven&apos;t set a primary keyword yet.
              </p>
            )}
            <p className="mt-2 text-[10px] text-neutral-400">
              Cost: ~10 + (40 × {SUGGEST_LIMIT}) Semrush API units per click.
            </p>
          </div>
        )}

        {loading && !error && (
          <div className="px-4 py-10 text-center">
            <i className="ri-loader-4-line animate-spin text-xl text-neutral-400" />
            <p className="mt-2 text-xs text-neutral-500">Fetching from Semrush…</p>
          </div>
        )}

        {!loading && !error && lastFetchedSeed && (
          <>
            {/* Seed row */}
            {seed && (
              <div className="mx-3 mt-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400">
                      Your seed
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-neutral-900 truncate">
                      {seed.phrase}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] shrink-0">
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">Vol</p>
                      <p className="font-mono font-semibold text-neutral-700">
                        {formatNumber(seed.searchVolume)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">KD</p>
                      <p className={`font-mono font-semibold ${difficultyClass(seed.difficulty)}`}>
                        {seed.difficulty || "—"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSelect(seed.phrase)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: ADMIN_OCEAN }}
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sort tabs */}
            {suggestions.length > 0 && (
              <div className="flex items-center gap-2 px-3 pt-3 pb-1">
                <span className="text-[10px] uppercase tracking-[0.1em] text-neutral-400 font-bold">
                  Sort:
                </span>
                {(["searchVolume", "difficulty", "cpc"] as SortKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSortKey(k)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      sortKey === k
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-500 hover:bg-neutral-100"
                    }`}
                  >
                    {k === "searchVolume" ? "Volume" : k === "difficulty" ? "KD" : "CPC"}
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions list */}
            {suggestions.length === 0 && seed === null && (
              <p className="px-4 py-6 text-center text-xs text-neutral-500">
                No data returned for that seed. Try a different phrase.
              </p>
            )}

            {suggestions.length === 0 && seed !== null && (
              <p className="px-4 py-4 text-center text-xs text-neutral-500">
                No broad-match keywords found in Semrush. Try a shorter or more general seed.
              </p>
            )}

            {suggestions.length > 0 && (
              <ul className="px-2 pb-3 pt-1 divide-y divide-neutral-100">
                {sorted.map((s) => (
                  <li
                    key={s.phrase}
                    className="group flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => handleSelect(s.phrase)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-neutral-900 truncate group-hover:text-neutral-900">
                        {s.phrase}
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-400">
                        CPC ${s.cpc.toFixed(2)} · Comp {(s.competition * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="text-right text-[11px] shrink-0">
                      <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">Vol</p>
                      <p className="font-mono font-semibold text-neutral-700">
                        {formatNumber(s.searchVolume)}
                      </p>
                    </div>
                    <div className="text-right text-[11px] shrink-0 w-[42px]">
                      <p className="text-[9px] uppercase tracking-[0.08em] text-neutral-400">KD</p>
                      <p className={`font-mono font-semibold ${difficultyClass(s.difficulty)}`}>
                        {s.difficulty || "—"}
                      </p>
                      <p className={`text-[9px] ${difficultyClass(s.difficulty)}`}>
                        {difficultyLabel(s.difficulty)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <div className="px-4 py-2 border-t border-neutral-100 text-[10px] text-neutral-400 flex items-center justify-between">
        <span>Click a row to use it as your primary keyword.</span>
        <a
          href="/admin/keyword-research"
          className="font-semibold text-neutral-600 hover:underline"
        >
          Open full research →
        </a>
      </div>
    </div>
  );

  return (
    <div className={`relative inline-block ${className ?? ""}`} ref={triggerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleTrigger}
        disabled={disabled}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        style={{ backgroundColor: ADMIN_OCEAN }}
        title="Get Semrush keyword suggestions"
      >
        <i className="ri-search-eye-line text-xs" />
        Suggest
      </button>

      {open && mounted && createPortal(popoverContent, document.body)}
    </div>
  );
}
