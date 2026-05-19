"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import type {
  SemrushKeywordOverviewDTO,
  SemrushKeywordSuggestionDTO,
  SemrushSuggestionsResponse,
} from "../types/semrush";

const inputCls =
  "w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#3d6f7f] transition-colors";

const SUGGEST_LIMIT_DEFAULT = 10;
const SUGGEST_LIMIT_MAX = 25;

type SortKey = "searchVolume" | "difficulty" | "cpc";
type RankSortKey = "position" | "impressions" | "clicks";
type ActiveTab = "research" | "rankings";

interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscPageQueriesResponse {
  ok: boolean;
  rows: GscQueryRow[];
  needs_oauth?: boolean;
  error?: string;
}

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

function difficultyBadgeClass(kd: number): string {
  if (kd === 0) return "bg-neutral-100 text-neutral-500";
  if (kd < 30) return "bg-emerald-50 text-emerald-700";
  if (kd < 50) return "bg-amber-50 text-amber-700";
  if (kd < 70) return "bg-orange-50 text-orange-700";
  return "bg-red-50 text-red-700";
}

function difficultyLabel(kd: number): string {
  if (kd === 0) return "—";
  if (kd < 30) return "Easy";
  if (kd < 50) return "Medium";
  if (kd < 70) return "Hard";
  return "Very Hard";
}

function positionBadgeClass(pos: number): string {
  if (pos <= 3) return "bg-emerald-50 text-emerald-700";
  if (pos <= 10) return "bg-amber-50 text-amber-700";
  if (pos <= 20) return "bg-orange-50 text-orange-700";
  return "bg-neutral-100 text-neutral-500";
}

function formatCtr(ctr: number): string {
  return `${(ctr * 100).toFixed(1)}%`;
}

interface ResearchState {
  seedPhrase: string;
  seed: SemrushKeywordOverviewDTO | null;
  suggestions: SemrushKeywordSuggestionDTO[];
  fetchedAt: number;
}

interface RankingsState {
  url: string;
  rows: GscQueryRow[];
  fetchedAt: number;
  needsOAuth?: boolean;
}

export default function AdminKeywordResearchPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("research");

  // ── Keyword research state ──────────────────────────────────
  const [seedInput, setSeedInput] = useState("");
  const [limit, setLimit] = useState(SUGGEST_LIMIT_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchState | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("searchVolume");
  const [copyState, setCopyState] = useState<string | null>(null);

  // ── Page rankings state ─────────────────────────────────────
  const [urlInput, setUrlInput] = useState("");
  const [rankDays, setRankDays] = useState(90);
  const [rankLoading, setRankLoading] = useState(false);
  const [rankError, setRankError] = useState<string | null>(null);
  const [rankResult, setRankResult] = useState<RankingsState | null>(null);
  const [rankSortKey, setRankSortKey] = useState<RankSortKey>("position");
  const [rankCopyState, setRankCopyState] = useState<string | null>(null);

  // ── Keyword research handlers ───────────────────────────────
  const runResearch = useCallback(
    async (phrase: string, suggestLimit: number) => {
      const cleaned = phrase.trim();
      if (!cleaned) {
        setError("Enter a seed keyword.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/semrush/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phrase: cleaned, limit: suggestLimit }),
        });
        const data = (await res.json()) as SemrushSuggestionsResponse;
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }
        setResult({
          seedPhrase: cleaned,
          seed: data.seed,
          suggestions: data.suggestions,
          fetchedAt: Date.now(),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch from Semrush.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runResearch(seedInput, limit);
  };

  const handleCopy = async (phrase: string) => {
    try {
      await navigator.clipboard.writeText(phrase);
      setCopyState(phrase);
      setTimeout(() => setCopyState(null), 1500);
    } catch {
      // ignore
    }
  };

  const handleExportCsv = () => {
    if (!result) return;
    const rows: string[] = [];
    rows.push("phrase,search_volume,keyword_difficulty,cpc_usd,competition,results");
    if (result.seed) {
      const s = result.seed;
      rows.push(
        [s.phrase, s.searchVolume, s.difficulty, s.cpc, s.competition, s.results]
          .map((c) => csvEscape(String(c)))
          .join(","),
      );
    }
    for (const sug of result.suggestions) {
      rows.push(
        [sug.phrase, sug.searchVolume, sug.difficulty, sug.cpc, sug.competition, sug.results]
          .map((c) => csvEscape(String(c)))
          .join(","),
      );
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `semrush-${result.seedPhrase.replace(/\s+/g, "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sorted = result
    ? [...result.suggestions].sort((a, b) => {
        if (sortKey === "cpc") return b.cpc - a.cpc;
        if (sortKey === "difficulty") {
          const ax = a.difficulty || 999;
          const bx = b.difficulty || 999;
          return ax - bx;
        }
        return b.searchVolume - a.searchVolume;
      })
    : [];

  // ── Page rankings handlers ──────────────────────────────────
  const runRankings = useCallback(async (url: string, days: number) => {
    const cleaned = url.trim();
    if (!cleaned) {
      setRankError("Enter a page URL.");
      return;
    }
    setRankLoading(true);
    setRankError(null);
    try {
      const res = await fetch(
        `/api/admin/search-console/page-queries?url=${encodeURIComponent(cleaned)}&days=${days}`,
      );
      const data = (await res.json()) as GscPageQueriesResponse;

      if (data.needs_oauth) {
        setRankResult({ url: cleaned, rows: [], fetchedAt: Date.now(), needsOAuth: true });
        return;
      }
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }
      setRankResult({ url: cleaned, rows: data.rows, fetchedAt: Date.now() });
    } catch (err) {
      setRankError(err instanceof Error ? err.message : "Failed to fetch from Search Console.");
    } finally {
      setRankLoading(false);
    }
  }, []);

  const handleRankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runRankings(urlInput, rankDays);
  };

  const handleRankCopy = async (query: string) => {
    try {
      await navigator.clipboard.writeText(query);
      setRankCopyState(query);
      setTimeout(() => setRankCopyState(null), 1500);
    } catch {
      // ignore
    }
  };

  const handleRankExportCsv = () => {
    if (!rankResult) return;
    const csvRows: string[] = [];
    csvRows.push("query,position,impressions,clicks,ctr");
    for (const row of rankResult.rows) {
      csvRows.push(
        [row.query, row.position.toFixed(1), row.impressions, row.clicks, (row.ctr * 100).toFixed(2) + "%"]
          .map((c) => csvEscape(String(c)))
          .join(","),
      );
    }
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gsc-rankings-${rankResult.url.replace(/https?:\/\//, "").replace(/\//g, "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const rankSorted = rankResult
    ? [...rankResult.rows].sort((a, b) => {
        if (rankSortKey === "impressions") return b.impressions - a.impressions;
        if (rankSortKey === "clicks") return b.clicks - a.clicks;
        return a.position - b.position;
      })
    : [];

  return (
    <div>
      <AdminPageHeader
        title="Keyword Research"
        subtitle="Find keywords to target or see which keywords a page is actively ranking for."
      />

      <div className="mx-auto max-w-screen-xl py-6 space-y-6">
        {/* Tab switcher */}
        <div className="inline-flex rounded-xl border border-neutral-200 bg-white p-1 shadow-sm gap-1">
          <TabButton
            active={activeTab === "research"}
            icon="ri-search-eye-line"
            label="Keyword Research"
            onClick={() => setActiveTab("research")}
          />
          <TabButton
            active={activeTab === "rankings"}
            icon="ri-bar-chart-grouped-line"
            label="Page Rankings"
            onClick={() => setActiveTab("rankings")}
          />
        </div>

        {/* ── TAB: Keyword Research ── */}
        {activeTab === "research" && (
          <>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
                Seed keyword or topic
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={seedInput}
                  onChange={(e) => setSeedInput(e.target.value)}
                  placeholder='e.g. "addiction intervention services"'
                  className={inputCls}
                  autoFocus
                  disabled={loading}
                />
                <div className="flex gap-3">
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    disabled={loading}
                    className="px-3 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-700 cursor-pointer disabled:opacity-50"
                  >
                    {[5, 10, 15, 25].map((n) => (
                      <option key={n} value={n}>
                        {n} suggestions
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={loading || !seedInput.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    style={{ backgroundColor: ADMIN_OCEAN }}
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" /> Researching
                      </>
                    ) : (
                      <>
                        <i className="ri-search-eye-line" /> Research
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-neutral-400">
                Cost per click: ~10 + (40 × {limit > SUGGEST_LIMIT_MAX ? SUGGEST_LIMIT_MAX : limit})
                Semrush API units. Database: US.
              </p>
            </form>

            {error && <ErrorBanner message={error} />}

            {!result && !loading && !error && (
              <EmptyState
                icon="ri-search-eye-line"
                title="Type a topic above and click Research."
                body="You'll see the seed's search volume & difficulty alongside the top broad-match keywords (every phrase containing your seed words), sortable by volume, KD, or CPC."
              />
            )}

            {result && (
              <div className="space-y-5">
                {result.seed && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                          Seed keyword
                        </p>
                        <p className="mt-1 text-xl font-semibold text-neutral-900 truncate">
                          {result.seed.phrase}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-end gap-5">
                        <Stat label="Volume" value={formatNumber(result.seed.searchVolume)} />
                        <Stat
                          label="Difficulty"
                          value={result.seed.difficulty ? String(result.seed.difficulty) : "—"}
                          valueClass={difficultyClass(result.seed.difficulty)}
                          hint={difficultyLabel(result.seed.difficulty)}
                        />
                        <Stat label="CPC" value={`$${result.seed.cpc.toFixed(2)}`} />
                        <Stat
                          label="Competition"
                          value={`${(result.seed.competition * 100).toFixed(0)}%`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                        Broad-match keywords
                        <span className="ml-2 text-neutral-400 normal-case font-normal tracking-normal">
                          ({result.suggestions.length})
                        </span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        Sorted by{" "}
                        <span className="font-semibold text-neutral-600">
                          {sortKey === "searchVolume"
                            ? "volume"
                            : sortKey === "cpc"
                              ? "CPC"
                              : "difficulty"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 mr-2">
                        {(["searchVolume", "difficulty", "cpc"] as SortKey[]).map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setSortKey(k)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                              sortKey === k
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-500 hover:bg-neutral-100"
                            }`}
                          >
                            {k === "searchVolume" ? "Volume" : k === "difficulty" ? "KD" : "CPC"}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 cursor-pointer transition-colors"
                      >
                        <i className="ri-download-line mr-1" />
                        CSV
                      </button>
                    </div>
                  </div>

                  {sorted.length === 0 ? (
                    <p className="p-8 text-center text-sm text-neutral-500">
                      No broad-match keywords returned. Try a shorter or more general seed.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-500">
                          <tr>
                            <th className="px-5 py-2.5">Keyword</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Volume</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Difficulty</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">CPC</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Competition</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {sorted.map((s) => (
                            <tr key={s.phrase} className="hover:bg-neutral-50/50 transition-colors">
                              <td className="px-5 py-3">
                                <p className="text-[13px] text-neutral-900">{s.phrase}</p>
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-700">
                                {formatNumber(s.searchVolume)}
                              </td>
                              <td className="px-3 py-3 text-right">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${difficultyBadgeClass(s.difficulty)}`}
                                >
                                  {s.difficulty || "—"}
                                  <span className="ml-1 opacity-60">{difficultyLabel(s.difficulty)}</span>
                                </span>
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-600">
                                ${s.cpc.toFixed(2)}
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-600">
                                {(s.competition * 100).toFixed(0)}%
                              </td>
                              <td className="px-3 py-3 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(s.phrase)}
                                    title="Copy keyword"
                                    className="px-2 py-1 rounded-md text-[10px] font-semibold text-neutral-500 hover:bg-neutral-200 cursor-pointer transition-colors"
                                  >
                                    {copyState === s.phrase ? (
                                      <>
                                        <i className="ri-check-line mr-1" />
                                        Copied
                                      </>
                                    ) : (
                                      <>
                                        <i className="ri-clipboard-line mr-1" />
                                        Copy
                                      </>
                                    )}
                                  </button>
                                  <Link
                                    href={`/admin/blog-writer?primary_keyword=${encodeURIComponent(s.phrase)}`}
                                    title="Use this keyword in a new blog draft"
                                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: ADMIN_OCEAN }}
                                  >
                                    <i className="ri-quill-pen-line mr-0.5" />
                                    Draft
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-neutral-400 text-center">
                  Pulled {new Date(result.fetchedAt).toLocaleTimeString()} · Click{" "}
                  <strong>Draft</strong> to start a new blog post pre-filled with that keyword.
                </p>
              </div>
            )}
          </>
        )}

        {/* ── TAB: Page Rankings ── */}
        {activeTab === "rankings" && (
          <>
            <form
              onSubmit={handleRankSubmit}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
                Page URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://yourdomain.com/about"
                  className={inputCls}
                  autoFocus
                  disabled={rankLoading}
                />
                <div className="flex gap-3">
                  <select
                    value={rankDays}
                    onChange={(e) => setRankDays(Number(e.target.value))}
                    disabled={rankLoading}
                    className="px-3 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-700 cursor-pointer disabled:opacity-50"
                  >
                    {[28, 90].map((n) => (
                      <option key={n} value={n}>
                        Last {n} days
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={rankLoading || !urlInput.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    style={{ backgroundColor: ADMIN_OCEAN }}
                  >
                    {rankLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" /> Fetching
                      </>
                    ) : (
                      <>
                        <i className="ri-google-line" /> Fetch from GSC
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-neutral-400">
                Pulls real query data from Google Search Console — no API unit cost. Shows every
                keyword Google served this page for in the selected date range.
              </p>
            </form>

            {rankError && <ErrorBanner message={rankError} />}

            {!rankResult && !rankLoading && !rankError && (
              <EmptyState
                icon="ri-google-line"
                title="Enter a page URL to see its ranking keywords."
                body="Paste any full URL from your site and click Fetch from GSC. You'll see every keyword Google showed your page for — with real position, impressions, and click data."
              />
            )}

            {rankResult?.needsOAuth && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
                <i className="ri-link-unlink-line text-2xl text-amber-400 block mb-2" />
                <p className="text-sm font-semibold text-amber-800">
                  Search Console is not connected.
                </p>
                <p className="mt-1 text-[12px] text-amber-700 max-w-sm mx-auto">
                  Connect your Google account under{" "}
                  <a href="/admin/search-console" className="underline font-semibold">
                    Search Console settings
                  </a>{" "}
                  to enable this feature.
                </p>
              </div>
            )}

            {rankResult && !rankResult.needsOAuth && (
              <div className="space-y-5">
                {/* Summary card */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                        Queries for
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-800 break-all">
                        {rankResult.url}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-end gap-5 shrink-0">
                      <Stat label="Queries" value={String(rankResult.rows.length)} />
                      {rankResult.rows.length > 0 && (
                        <>
                          <Stat
                            label="Total clicks"
                            value={rankResult.rows.reduce((s, r) => s + r.clicks, 0).toLocaleString()}
                          />
                          <Stat
                            label="Total impressions"
                            value={rankResult.rows.reduce((s, r) => s + r.impressions, 0).toLocaleString()}
                          />
                          <Stat
                            label="Best position"
                            value={`#${Math.round(Math.min(...rankResult.rows.map((r) => r.position)))}`}
                            valueClass="text-emerald-600"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rankings table */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                        Ranking queries
                        <span className="ml-2 text-neutral-400 normal-case font-normal tracking-normal">
                          ({rankResult.rows.length})
                        </span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-neutral-400">
                        Sorted by{" "}
                        <span className="font-semibold text-neutral-600">
                          {rankSortKey === "position"
                            ? "position"
                            : rankSortKey === "impressions"
                              ? "impressions"
                              : "clicks"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 mr-2">
                        {(["position", "impressions", "clicks"] as RankSortKey[]).map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setRankSortKey(k)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                              rankSortKey === k
                                ? "bg-neutral-900 text-white"
                                : "text-neutral-500 hover:bg-neutral-100"
                            }`}
                          >
                            {k === "position" ? "Pos" : k === "impressions" ? "Impr" : "Clicks"}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleRankExportCsv}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 cursor-pointer transition-colors"
                      >
                        <i className="ri-download-line mr-1" />
                        CSV
                      </button>
                    </div>
                  </div>

                  {rankSorted.length === 0 ? (
                    <div className="p-10 text-center">
                      <p className="text-sm font-semibold text-neutral-700">
                        No queries found for this URL.
                      </p>
                      <p className="mt-1.5 text-[12px] text-neutral-500 max-w-sm mx-auto">
                        Google hasn&apos;t served this page for any queries in the selected date
                        range. The page may be too new, not indexed, or use a different URL format.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-500">
                          <tr>
                            <th className="px-5 py-2.5">Query</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Position</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Impressions</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Clicks</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">CTR</th>
                            <th className="px-3 py-2.5 text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {rankSorted.map((row) => (
                            <tr key={row.query} className="hover:bg-neutral-50/50 transition-colors">
                              <td className="px-5 py-3">
                                <p className="text-[13px] text-neutral-900">{row.query}</p>
                              </td>
                              <td className="px-3 py-3 text-right">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${positionBadgeClass(Math.round(row.position))}`}
                                >
                                  #{Math.round(row.position)}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-700">
                                {row.impressions.toLocaleString()}
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-700">
                                {row.clicks.toLocaleString()}
                              </td>
                              <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-500">
                                {formatCtr(row.ctr)}
                              </td>
                              <td className="px-3 py-3 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleRankCopy(row.query)}
                                    title="Copy query"
                                    className="px-2 py-1 rounded-md text-[10px] font-semibold text-neutral-500 hover:bg-neutral-200 cursor-pointer transition-colors"
                                  >
                                    {rankCopyState === row.query ? (
                                      <>
                                        <i className="ri-check-line mr-1" />
                                        Copied
                                      </>
                                    ) : (
                                      <>
                                        <i className="ri-clipboard-line mr-1" />
                                        Copy
                                      </>
                                    )}
                                  </button>
                                  <Link
                                    href={`/admin/blog-writer?primary_keyword=${encodeURIComponent(row.query)}`}
                                    title="Use this query as a blog keyword"
                                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: ADMIN_OCEAN }}
                                  >
                                    <i className="ri-quill-pen-line mr-0.5" />
                                    Draft
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-neutral-400 text-center">
                  Pulled {new Date(rankResult.fetchedAt).toLocaleTimeString()} · Real data from
                  Google Search Console · Last {rankDays} days
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
        active ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"
      }`}
    >
      <i className={`${icon} text-sm`} />
      {label}
    </button>
  );
}

function EmptyState({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-10 text-center">
      <div
        className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${ADMIN_OCEAN}18` }}
      >
        <i className={`${icon} text-2xl`} style={{ color: ADMIN_OCEAN }} />
      </div>
      <p className="text-sm font-semibold text-neutral-700">{title}</p>
      <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed max-w-md mx-auto">{body}</p>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-2">
      <i className="ri-error-warning-line mt-0.5 shrink-0 text-base" />
      <span>{message}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  valueClass,
}: {
  label: string;
  value: string;
  hint?: string;
  valueClass?: string;
}) {
  return (
    <div className="text-right">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">{label}</p>
      <p className={`mt-0.5 font-mono text-xl font-semibold ${valueClass ?? "text-neutral-900"}`}>
        {value}
      </p>
      {hint && <p className={`text-[10px] ${valueClass ?? "text-neutral-500"}`}>{hint}</p>}
    </div>
  );
}

function csvEscape(v: string): string {
  if (/[",\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}
