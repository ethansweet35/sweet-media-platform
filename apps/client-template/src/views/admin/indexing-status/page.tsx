"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { canonicalBlogPostUrl, getPublicSiteOrigin } from "@/lib/publicSiteUrl";
import Seo from "@/components/feature/Seo";
import { ADMIN_OCEAN, adminFontSerif } from "@sweetmedia/admin-core";

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

function fmt(ts: string | null | undefined): string {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return ts;
  }
}

export default function AdminIndexingStatusPage() {
  const [rows, setRows] = useState<UrlRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, IndexStatusResult>>({});
  const [error, setError] = useState<string | null>(null);

  const siteUrl = useMemo(() => `${getPublicSiteOrigin()}/`, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [{ data: posts, error: postsErr }, { data: pages, error: pagesErr }] =
          await Promise.all([
            supabase
              .from("blog_posts")
              .select("id,title,slug,updated_at,status")
              .eq("status", "published")
              .order("updated_at", { ascending: false })
              .limit(200),
            supabase
              .from("tracked_pages")
              .select("id,title,url,updated_at,status")
              .eq("status", "active")
              .order("updated_at", { ascending: false })
              .limit(200),
          ]);

        if (postsErr) throw postsErr;
        if (pagesErr) throw pagesErr;

        const blogRows: UrlRow[] = (posts ?? []).map((p) => ({
          id: `blog:${p.id}`,
          type: "blog",
          title: p.title || "(Untitled post)",
          url: canonicalBlogPostUrl(p.slug),
          updatedAt: p.updated_at ?? null,
        }));

        const pageRows: UrlRow[] = (pages ?? []).map((p) => {
          const rawUrl = String(p.url ?? "");
          const absoluteUrl = rawUrl.startsWith("http")
            ? rawUrl
            : `${getPublicSiteOrigin()}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
          return {
            id: `page:${p.id}`,
            type: "page",
            title: p.title || rawUrl || "(Untitled page)",
            url: absoluteUrl,
            updatedAt: p.updated_at ?? null,
          };
        });

        setRows([...blogRows, ...pageRows]);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, []);

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

  const checkTopTen = async () => {
    const top = rows.slice(0, 10);
    for (const row of top) {
      // Run sequentially to avoid burst quota issues.
      // eslint-disable-next-line no-await-in-loop
      await checkOne(row);
    }
  };

  return (
    <div>
      <Seo
        title="Indexing Status | Admin"
        description="Check Google indexing status for blog posts and tracked pages."
        noindex
      />

      <section className="mb-8">
        <h1 className={`text-[2.2rem] font-semibold tracking-tight text-neutral-900 ${adminFontSerif}`}>
          Indexing Status
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Live Google indexing checks for published blog posts and tracked pages.
        </p>
      </section>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void checkTopTen()}
          className="rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ backgroundColor: ADMIN_OCEAN }}
        >
          Check top 10 URLs
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
                          <button
                            type="button"
                            onClick={() => void checkOne(row)}
                            disabled={busy}
                            className="rounded-lg border border-black/[0.12] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-700 hover:bg-black/[0.03] disabled:opacity-60"
                          >
                            {busy ? "Checking…" : "Check"}
                          </button>
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
