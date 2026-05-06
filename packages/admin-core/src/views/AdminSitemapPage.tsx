"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { supabase } from "../lib/supabase";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import { buildSitemapEntries, toSitemapXml, type SitemapPageRow, type SitemapPostRow } from "../lib/sitemap";

export default function AdminSitemapPage() {
  const [sitemapXml, setSitemapXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const generateSitemap = async () => {
    setLoading(true);
    try {
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

      const pages = ((pagesRes.data ?? []) as SitemapPageRow[]) ?? [];
      const posts = ((postsRes.data ?? []) as SitemapPostRow[]) ?? [];
      setPostCount(posts.length);
      setPageCount(pages.length);

      const entries = buildSitemapEntries(getPublicSiteOrigin(), pages, posts);
      setSitemapXml(toSitemapXml(entries));
    } catch (err) {
      console.error("Failed to generate sitemap:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sitemapXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = sitemapXml;
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

  return (
    <div>
      <AdminPageHeader
        title="Sitemap"
        subtitle={`${postCount} published posts reflected in XML · /sitemap.xml auto-refreshes daily.`}
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
                This generates sitemap XML from your active tracked pages and published blog posts using your site
                domain. Your public <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">/sitemap.xml</code>{" "}
                route updates automatically every day.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Published Posts</p>
            <p className="text-lg font-semibold text-neutral-800">{postCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Tracked Pages</p>
            <p className="text-lg font-semibold text-neutral-800">{pageCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
            <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Total URLs</p>
            <p className="text-lg font-semibold text-neutral-800">{postCount + pageCount}</p>
          </div>
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
          {sitemapXml && (
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

        {sitemapXml && (
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
              <p className="text-[10px] tracking-wider uppercase font-semibold text-neutral-500">Generated sitemap.xml</p>
              <p className="text-[10px] text-neutral-400">{sitemapXml.length.toLocaleString()} chars</p>
            </div>
            <textarea
              value={sitemapXml}
              readOnly
              className="w-full h-[500px] px-5 py-4 text-xs font-mono text-neutral-700 bg-neutral-50 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
