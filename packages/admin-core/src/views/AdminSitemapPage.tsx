"use client";

import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { supabase } from "../lib/supabase";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { useSystemSettings } from "../hooks/useSystemSettings";
import {
  buildSitemapPartitions,
  discoverSitemapGroups,
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
  const [postCount, setPostCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [totalUrlCount, setTotalUrlCount] = useState(0);
  const [selectedView, setSelectedView] = useState<SitemapViewId>("index");
  const [indexXml, setIndexXml] = useState("");
  const [groups, setGroups] = useState<SitemapGroupDefinition[]>([]);
  const [partitionXml, setPartitionXml] = useState<Record<string, string>>({});

  const origin = getPublicSiteOrigin();
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

  const handleCopy = async () => {
    if (!activeXml) return;

    try {
      await navigator.clipboard.writeText(activeXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = activeXml;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    void generateSitemap();
  }, []);

  const displayViews = useMemo(
    () => [{ id: "index", label: "Index" }, ...groups.map((group) => ({ id: group.id, label: group.label }))],
    [groups],
  );

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
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <i className={`ri-refresh-line text-sm ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#3d6f7f]/8 flex-shrink-0">
              <i className="ri-map-2-line text-lg text-[#3d6f7f]"></i>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-800 mb-1">How this works</h2>
              <p className="text-xs text-neutral-500 leading-relaxed">
                The public <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">/sitemap.xml</code> route
                serves a sitemap index. Child sitemaps are grouped automatically into pages, blog posts, and route
                sections such as <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">/service-areas</code>{" "}
                when a brand has enough URLs under the same parent folder.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Tracked Pages</p>
            <p className="text-lg font-semibold text-neutral-800">{pageCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Published Posts</p>
            <p className="text-lg font-semibold text-neutral-800">{postCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Child Sitemaps</p>
            <p className="text-lg font-semibold text-neutral-800">{groupCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Total URLs</p>
            <p className="text-lg font-semibold text-neutral-800">{totalUrlCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayViews.map((view) => (
            <button
              key={view.id}
              type="button"
              onClick={() => setSelectedView(view.id)}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                selectedView === view.id
                  ? "bg-[#3d6f7f] text-white"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => void generateSitemap()}
            disabled={loading}
            className="flex items-center gap-2 bg-[#3d6f7f] text-white text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors disabled:opacity-40 cursor-pointer whitespace-nowrap"
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
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <i className={`text-xs ${copied ? "ri-check-line" : "ri-clipboard-line"}`}></i>
              {copied ? "Copied!" : "Copy XML"}
            </button>
          )}
        </div>

        {activeXml && (
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
              <p className="text-[10px] tracking-wider uppercase font-semibold text-neutral-500">
                {selectedView === "index" ? "Generated sitemap index" : `Generated /sitemaps/${selectedView}`}
              </p>
              <p className="text-[10px] text-neutral-400">{activeXml.length.toLocaleString()} chars</p>
            </div>
            <textarea
              value={activeXml}
              readOnly
              className="w-full h-[500px] px-5 py-4 text-xs font-mono text-neutral-700 bg-neutral-50 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
