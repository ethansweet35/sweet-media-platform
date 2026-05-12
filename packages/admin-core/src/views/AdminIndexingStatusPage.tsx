"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { ADMIN_OCEAN, adminFontSerif } from "../lib/adminTheme";
import { canonicalBlogPostUrl, getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { collectSitemapUrls } from "../lib/sitemap";

type PingStatus = "idle" | "pinging" | "success" | "error";

interface PingResult {
  status: PingStatus;
  message: string | null;
  pinggedAt: string | null;
}

type UrlType = "blog" | "page";

interface UrlRow {
  id: string;
  type: UrlType;
  title: string;
  url: string;
  updatedAt: string | null;
}

interface IndexStatusResult {
  checkedAt: string;
  currentlyIndexed: boolean;
  recentlyIndexed: boolean;
  lastCrawlTime: string | null;
  latestUpdateNotification: string | null;
  indexStatus: {
    verdict: string;
    coverageState: string;
    indexingState: string;
    robotsTxtState: string;
    pageFetchState: string;
  };
  error?: string;
}

async function fetchSitemapUrls(origin: string): Promise<string[]> {
  try {
    return await collectSitemapUrls(origin);
  } catch {
    return [];
  }
}

function errMessage(e: unknown): string {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  if (typeof e === "object") {
    const obj = e as Record<string, unknown>;
    const parts = [obj.message, obj.details, obj.hint]
      .filter((v): v is string => typeof v === "string" && v.trim().length > 0);
    if (parts.length > 0) return parts.join(" — ");
  }
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

function fmt(ts: string | null | undefined): string {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return ts;
  }
}

function PingButton({ pingResult, onPing }: { pingResult: PingResult | undefined; onPing: () => void }) {
  const pinging = pingResult?.status === "pinging";
  const success = pingResult?.status === "success";
  return (
    <button
      type="button"
      onClick={onPing}
      disabled={pinging}
      className="rounded-lg px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60 transition-colors duration-150"
      style={{ backgroundColor: success ? "#16a34a" : "#15803d" }}
      title="Submit URL to Google Indexing API"
    >
      {pinging ? "Pinging…" : success ? "✓ Pinged" : "Ping"}
    </button>
  );
}

function PingFeedback({ result }: { result: PingResult }) {
  if (result.status === "pinging") return null;
  if (result.status === "success") {
    return (
      <p className="text-[11px] text-emerald-600 font-medium">
        ✓ Submitted to Google{result.pinggedAt ? ` at ${fmt(result.pinggedAt)}` : ""}
      </p>
    );
  }
  if (result.status === "error") {
    return (
      <p className="text-[11px] text-red-600 leading-snug" title={result.message ?? ""}>
        ✕ {result.message ? (result.message.length > 60 ? result.message.slice(0, 60) + "…" : result.message) : "Ping failed"}
      </p>
    );
  }
  return null;
}

export default function AdminIndexingStatusPage() {
  const [rows, setRows] = useState<UrlRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, IndexStatusResult>>({});
  const [pingResults, setPingResults] = useState<Record<string, PingResult>>({});
  const [pingingAll, setPingingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const siteOrigin = useMemo(() => getPublicSiteOrigin(), []);
  const siteUrl = useMemo(() => `${siteOrigin}/`, [siteOrigin]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: posts, error: postsErr } = await supabase
          .from("blog_posts")
          .select("id,title,slug,updated_at,status")
          .eq("status", "published")
          .order("updated_at", { ascending: false })
          .limit(200);

        if (postsErr) throw postsErr;

        const { data: pages, error: pagesErr } = await supabase
          .from("tracked_pages")
          .select("id,page_title,route_path,updated_at,is_active")
          .eq("is_active", true)
          .order("updated_at", { ascending: false })
          .limit(200);

        const trackedPagesMissing = pagesErr && (
          String((pagesErr as { code?: string }).code) === "42P01" ||
          String(pagesErr.message ?? "").toLowerCase().includes("tracked_pages")
        );

        if (pagesErr && !trackedPagesMissing) throw pagesErr;

        const blogRows: UrlRow[] = (posts ?? []).map((p) => ({
          id: `blog:${p.id}`,
          type: "blog",
          title: p.title || "(Untitled post)",
          url: canonicalBlogPostUrl(p.slug),
          updatedAt: p.updated_at ?? null,
        }));

        const pageRowsFromDb: UrlRow[] = ((trackedPagesMissing ? [] : pages) ?? []).map((p) => {
          const rawPath = String((p as { route_path?: string }).route_path ?? "");
          const absoluteUrl = rawPath.startsWith("http")
            ? rawPath
            : `${siteOrigin}${rawPath.startsWith("/") ? "" : "/"}${rawPath}`;
          return {
            id: `page:${(p as { id: string }).id}`,
            type: "page",
            title: String((p as { page_title?: string }).page_title ?? "").trim() || rawPath || "(Untitled page)",
            url: absoluteUrl,
            updatedAt: (p as { updated_at?: string | null }).updated_at ?? null,
          };
        });

        let pageRows = pageRowsFromDb;
        if (pageRows.length === 0) {
          // Try the app's own route scanner API first.
          try {
            const appPagesRes = await fetch("/api/admin/app-pages", { cache: "no-store" });
            if (appPagesRes.ok) {
              const json = (await appPagesRes.json()) as { routes?: string[] };
              pageRows = (json.routes ?? []).map((r) => ({
                id: `app:${r}`,
                type: "page" as const,
                title: r === "/" ? "Homepage" : r.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                url: `${siteOrigin}${r}`,
                updatedAt: null,
              }));
            }
          } catch {
            // non-fatal — fall through to sitemap fetch
          }
        }

        if (pageRows.length === 0) {
          const sitemapUrls = await fetchSitemapUrls(siteOrigin);
          pageRows = sitemapUrls.map((u) => ({
            id: `sitemap:${u}`,
            type: "page",
            title: u.replace(siteOrigin, "") || "/",
            url: u,
            updatedAt: null,
          }));
        }

        if (!pageRows.some((r) => r.url === `${siteOrigin}/` || r.url === siteOrigin)) {
          pageRows.unshift({
            id: "page:home",
            type: "page",
            title: "Homepage",
            url: `${siteOrigin}/`,
            updatedAt: null,
          });
        }

        setRows([...blogRows, ...pageRows]);
      } catch (e) {
        setError(errMessage(e));
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [siteOrigin]);

  const checkOne = async (row: UrlRow) => {
    setChecking((prev) => ({ ...prev, [row.id]: true }));
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("inspect-google-indexing", {
        body: { url: row.url, siteUrl },
      });
      if (fnErr) {
        setResults((prev) => ({
          ...prev,
          [row.id]: {
            checkedAt: new Date().toISOString(),
            currentlyIndexed: false,
            recentlyIndexed: false,
            lastCrawlTime: null,
            latestUpdateNotification: null,
            indexStatus: {
              verdict: "",
              coverageState: "",
              indexingState: "",
              robotsTxtState: "",
              pageFetchState: "",
            },
            error: fnErr.message,
          },
        }));
      } else {
        setResults((prev) => ({ ...prev, [row.id]: data as IndexStatusResult }));
      }
    } finally {
      setChecking((prev) => ({ ...prev, [row.id]: false }));
    }
  };

  const checkAll = async () => {
    for (const row of rows) {
      // Sequential checks avoid quota bursts.
      // eslint-disable-next-line no-await-in-loop
      await checkOne(row);
    }
  };

  const pingOne = async (row: UrlRow) => {
    setPingResults((prev) => ({
      ...prev,
      [row.id]: { status: "pinging", message: null, pinggedAt: null },
    }));
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("ping-google-indexing", {
        body: { url: row.url },
      });
      if (fnErr) {
        setPingResults((prev) => ({
          ...prev,
          [row.id]: { status: "error", message: fnErr.message, pinggedAt: new Date().toISOString() },
        }));
      } else if (data && (data as { success?: boolean }).success) {
        setPingResults((prev) => ({
          ...prev,
          [row.id]: { status: "success", message: "Submitted to Google", pinggedAt: new Date().toISOString() },
        }));
      } else {
        const msg = (data as { error?: string })?.error ?? "Unknown response";
        setPingResults((prev) => ({
          ...prev,
          [row.id]: { status: "error", message: msg, pinggedAt: new Date().toISOString() },
        }));
      }
    } catch (e) {
      setPingResults((prev) => ({
        ...prev,
        [row.id]: { status: "error", message: errMessage(e), pinggedAt: new Date().toISOString() },
      }));
    }
  };

  const pingAll = async () => {
    setPingingAll(true);
    for (const row of rows) {
      // eslint-disable-next-line no-await-in-loop
      await pingOne(row);
    }
    setPingingAll(false);
  };

  return (
    <div>
      <section className="mb-8">
        <h1 className={`text-[2.2rem] font-semibold tracking-tight text-neutral-900 ${adminFontSerif}`}>
          Indexing Status
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Live Google indexing checks for published blog posts and tracked pages.
        </p>
      </section>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void checkAll()}
          disabled={rows.length === 0}
          className="rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white disabled:opacity-60"
          style={{ backgroundColor: ADMIN_OCEAN }}
        >
          Scan All URLs
        </button>
        <button
          type="button"
          onClick={() => void pingAll()}
          disabled={rows.length === 0 || pingingAll}
          className="rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white disabled:opacity-60"
          style={{ backgroundColor: "#16a34a" }}
        >
          {pingingAll ? "Pinging…" : "Ping All URLs"}
        </button>
        <p className="self-center text-xs text-neutral-500">
          Property: <span className="font-mono">{siteUrl}</span>
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-10 text-sm text-neutral-500">
          Loading URLs…
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-black/[0.06] bg-black/[0.02] text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Title / URL</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Currently indexed</th>
                  <th className="px-4 py-3">Recently indexed</th>
                  <th className="px-4 py-3">Last crawl</th>
                  <th className="px-4 py-3">Last submitted</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05] text-sm">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                      No URLs found.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    const result = results[row.id];
                    const busy = Boolean(checking[row.id]);
                    return (
                      <tr key={row.id}>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-black/[0.05] px-2 py-1 text-[11px] uppercase tracking-wide text-neutral-600">
                            {row.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-neutral-900">{row.title}</p>
                          <a href={row.url} target="_blank" rel="noreferrer" className="text-xs text-neutral-500 hover:underline">
                            {row.url}
                          </a>
                          {result?.error ? (
                            <p className="mt-1 text-xs text-red-600">{result.error}</p>
                          ) : result ? (
                            <p className="mt-1 text-xs text-neutral-500">
                              Verdict: {result.indexStatus.verdict || "—"} · {result.indexStatus.coverageState || "—"}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-600">{fmt(row.updatedAt)}</td>
                        <td className="px-4 py-3 text-xs">
                          {result ? (
                            <span className={result.currentlyIndexed ? "text-emerald-600" : "text-rose-600"}>
                              {result.currentlyIndexed ? "Yes" : "No"}
                            </span>
                          ) : "—"}
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {result ? (
                            <span className={result.recentlyIndexed ? "text-emerald-600" : "text-neutral-500"}>
                              {result.recentlyIndexed ? "Yes (7d)" : "No"}
                            </span>
                          ) : "—"}
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-600">{fmt(result?.lastCrawlTime)}</td>
                        <td className="px-4 py-3 text-xs text-neutral-600">{fmt(result?.latestUpdateNotification)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => void checkOne(row)}
                                disabled={busy}
                                className="rounded-lg border border-black/[0.12] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-700 hover:bg-black/[0.03] disabled:opacity-60"
                              >
                                {busy ? "Checking…" : "Check"}
                              </button>
                              <PingButton
                                pingResult={pingResults[row.id]}
                                onPing={() => void pingOne(row)}
                              />
                            </div>
                            {pingResults[row.id] && pingResults[row.id].status !== "idle" && (
                              <PingFeedback result={pingResults[row.id]} />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
