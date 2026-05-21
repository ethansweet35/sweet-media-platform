"use client";

import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import {
  ADMIN_OCEAN,
  adminPageCardCls,
  adminPillTabCls,
  adminPrimaryActionCls,
  adminPrimaryBtnCls,
  adminReadonlyInputCls,
  adminStatCardCls,
  adminTableWrapCls,
} from "../lib/adminTheme";
import { supabase } from "../lib/supabase";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useSystemSettings } from "../hooks/useSystemSettings";
import {
  buildSitemapPartitions,
  discoverSitemapGroups,
  getChildSitemapUrl,
  toSitemapIndexXml,
  toSitemapXml,
  type SitemapConfig,
  type SitemapGroupDefinition,
  type SitemapPageRow,
  type SitemapPostRow,
} from "../lib/sitemap";

type SitemapViewId = "index" | string;

export default function AdminSitemapPage() {
  const { getSetting } = useSystemSettings();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [totalUrlCount, setTotalUrlCount] = useState(0);
  const [selectedView, setSelectedView] = useState<SitemapViewId>("index");
  const [indexXml, setIndexXml] = useState("");
  const [groups, setGroups] = useState<SitemapGroupDefinition[]>([]);
  const [partitionXml, setPartitionXml] = useState<Record<string, string>>({});

  const origin = getPublicSiteOrigin();
  const sitemapIndexUrl = useMemo(() => `${origin}/sitemap.xml`, [origin]);
  const currentViewPublicUrl = useMemo(
    () =>
      selectedView === "index" ? sitemapIndexUrl : getChildSitemapUrl(origin, selectedView),
    [origin, sitemapIndexUrl, selectedView],
  );
  const activeXml = selectedView === "index" ? indexXml : (partitionXml[selectedView] ?? "");

  const generateSitemap = async () => {
    setLoading(true);
    try {
      const config = await getSetting<SitemapConfig>("sitemap_config");
      const [pagesRes, postsRes] = await Promise.all([
        supabase
          .from("tracked_pages")
          .select("route_path,updated_at")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .order("updated_at", { ascending: false })
          .limit(500),
        supabase
          .from("blog_posts")
          .select("slug,updated_at,published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(500),
      ]);

      if (postsRes.error) throw postsRes.error;
      if (pagesRes.error) throw pagesRes.error;

      let pages = ((pagesRes.data ?? []) as SitemapPageRow[]) ?? [];
      const posts = ((postsRes.data ?? []) as SitemapPostRow[]) ?? [];

      if (pages.length === 0) {
        try {
          const appPagesRes = await fetch("/api/admin/app-pages", { cache: "no-store" });
          if (appPagesRes.ok) {
            const json = (await appPagesRes.json()) as { routes?: string[] };
            pages = (json.routes ?? []).map((route) => ({ route_path: route, updated_at: null }));
          }
        } catch {
          // non-fatal
        }
      }

      const groups = discoverSitemapGroups(pages, posts, config);
      const partitions = buildSitemapPartitions(origin, pages, posts, config);
      const nextPartitionXml: Record<string, string> = {};

      for (const partition of partitions) {
        nextPartitionXml[partition.group.id] = toSitemapXml(partition.entries);
      }

      setPostCount(posts.length);
      setPageCount(pages.length);
      setGroupCount(groups.length);
      setTotalUrlCount(partitions.reduce((sum, partition) => sum + partition.entries.length, 0));
      setGroups(groups);
      setIndexXml(toSitemapIndexXml(origin, groups));
      setPartitionXml(nextPartitionXml);

      if (selectedView !== "index" && !nextPartitionXml[selectedView]) {
        setSelectedView("index");
      }
    } catch (err) {
      console.error("Failed to generate sitemap:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyTextToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  const handleCopyUrl = async (href: string) => {
    try {
      await copyTextToClipboard(href);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    if (!activeXml) return;

    try {
      await copyTextToClipboard(activeXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    void generateSitemap();
  }, []);

  const displayViews = useMemo(
    () => [{ id: "index", label: "Index" }, ...groups.map((group) => ({ id: group.id, label: group.label }))],
    [groups],
  );

  const selectedCategoryLabel = displayViews.find((v) => v.id === selectedView)?.label ?? "Index";

  return (
    <div>
      <AdminPageHeader
        title="Sitemap"
        subtitle={`${groupCount} child sitemaps · ${totalUrlCount} URLs · /sitemap.xml is the index.`}
        actions={
          <button
            type="button"
            onClick={() => void generateSitemap()}
            disabled={loading}
            className={adminPrimaryActionCls}
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <i className={`ri-refresh-line text-sm ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className={adminPageCardCls}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 flex-shrink-0">
              <i className="ri-map-2-line text-lg text-[#0A1F44]"></i>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#0A1F44] mb-1">How this works</h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                The public <code className="bg-[#F4F7FB] px-1 py-0.5 rounded text-[10px]">/sitemap.xml</code> route
                serves a sitemap index. Child sitemaps are grouped automatically into pages, blog posts, and route
                sections such as <code className="bg-[#F4F7FB] px-1 py-0.5 rounded text-[10px]">/service-areas</code>{" "}
                when a brand has enough URLs under the same parent folder.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayViews.map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setSelectedView(view.id)}
              className={adminPillTabCls(selectedView === view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className={adminPageCardCls}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <i className={`text-lg ${selectedView === "index" ? "ri-google-line text-emerald-700" : "ri-links-line text-[#0A1F44]"}`}></i>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <h2 className="text-sm font-semibold text-[#0A1F44]">
                {selectedView === "index" ? "Search Console URL" : `Public URL · ${selectedCategoryLabel}`}
              </h2>
              {selectedView === "index" ? (
                <p className="text-xs leading-relaxed text-[#64748B]">
                  Paste into <span className="font-medium text-[#64748B]">Sitemaps</span> in Google Search Console.
                  Uses the live sitemap index (
                  <code className="rounded bg-[#F4F7FB] px-1 py-0.5 text-[10px]">/sitemap.xml</code>), which references
                  all partitions.
                </p>
              ) : (
                <p className="text-xs leading-relaxed text-[#64748B]">
                  Direct URL that serves only the{" "}
                  <span className="font-medium text-[#334155]">{selectedCategoryLabel}</span> URLs. Search Console works
                  best with the Index tab&apos;s URL; use this link to verify one partition or share a subset.
                </p>
              )}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  readOnly
                  value={currentViewPublicUrl}
                  className={adminReadonlyInputCls}
                  aria-label={selectedView === "index" ? "Sitemap URL for Google Search Console" : "Public URL for selected sitemap partition"}
                />
                <button
                  type="button"
                  onClick={() => void handleCopyUrl(currentViewPublicUrl)}
                  className={`flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                    urlCopied
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "border border-[#E2E8F0] bg-white text-[#334155] hover:border-[#CBD5E1]"
                  }`}
                >
                  <i className={`text-sm ${urlCopied ? "ri-check-line" : "ri-links-line"}`} />
                  {urlCopied ? "Copied" : "Copy URL"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className={`${adminStatCardCls} px-4 py-3 flex-col items-start gap-0`}>
            <p className="text-[10px] tracking-wider uppercase text-[#94A3B8] font-semibold">Tracked Pages</p>
            <p className="text-lg font-semibold text-[#0A1F44]">{pageCount}</p>
          </div>
          <div className={`${adminStatCardCls} px-4 py-3 flex-col items-start gap-0`}>
            <p className="text-[10px] tracking-wider uppercase text-[#94A3B8] font-semibold">Published Posts</p>
            <p className="text-lg font-semibold text-[#0A1F44]">{postCount}</p>
          </div>
          <div className={`${adminStatCardCls} px-4 py-3 flex-col items-start gap-0`}>
            <p className="text-[10px] tracking-wider uppercase text-[#94A3B8] font-semibold">Child Sitemaps</p>
            <p className="text-lg font-semibold text-[#0A1F44]">{groupCount}</p>
          </div>
          <div className={`${adminStatCardCls} px-4 py-3 flex-col items-start gap-0`}>
            <p className="text-[10px] tracking-wider uppercase text-[#94A3B8] font-semibold">Total URLs</p>
            <p className="text-lg font-semibold text-[#0A1F44]">{totalUrlCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => void generateSitemap()}
            disabled={loading}
            className={adminPrimaryBtnCls}
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xs"></i>
                Generating...
              </>
            ) : (
              <>
                <i className="ri-refresh-line text-xs"></i>
                Regenerate
              </>
            )}
          </button>
          {activeXml && (
            <button
              onClick={() => void handleCopy()}
              className={`flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                copied
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#CBD5E1]"
              }`}
            >
              <i className={`text-xs ${copied ? "ri-check-line" : "ri-clipboard-line"}`}></i>
              {copied ? "Copied!" : "Copy XML"}
            </button>
          )}
        </div>

        {activeXml && (
          <div className={adminTableWrapCls}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                {selectedView === "index" ? "Generated sitemap index" : `Generated · ${selectedCategoryLabel} (/sitemaps/${selectedView})`}
              </p>
              <p className="text-[10px] text-[#94A3B8]">{activeXml.length.toLocaleString()} chars</p>
            </div>
            <textarea
              value={activeXml}
              readOnly
              className="w-full h-[500px] px-5 py-4 text-xs font-mono text-[#334155] bg-[#F4F7FB] focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
