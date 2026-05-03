"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import { ADMIN_OCEAN } from "@sweetmedia/admin-core";
import { supabase } from "@/lib/supabase";
import Seo from "@/components/feature/Seo";

export default function AdminSitemapPage() {
  const [sitemapXml, setSitemapXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [postCount, setPostCount] = useState(0);

  const generateSitemap = async () => {
    setLoading(true);
    try {
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("slug, updated_at, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;

      setPostCount(posts?.length || 0);

      const today = new Date().toISOString().split("T")[0];

      const staticPages = [
        { path: "/", priority: "1.0", changefreq: "weekly" },
        { path: "/seo", priority: "0.9", changefreq: "weekly" },
        { path: "/paid-media", priority: "0.9", changefreq: "weekly" },
        { path: "/social-media", priority: "0.9", changefreq: "weekly" },
        { path: "/web-dev", priority: "0.9", changefreq: "weekly" },
        { path: "/industries", priority: "0.8", changefreq: "monthly" },
        { path: "/case-studies/california-prime-recovery", priority: "0.8", changefreq: "monthly" },
        { path: "/case-studies/rize-oc", priority: "0.8", changefreq: "monthly" },
        { path: "/results", priority: "0.8", changefreq: "monthly" },
        { path: "/about", priority: "0.7", changefreq: "monthly" },
        { path: "/contact", priority: "0.7", changefreq: "monthly" },
        { path: "/blog", priority: "0.8", changefreq: "weekly" },
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      for (const page of staticPages) {
        xml += `  <url>\n`;
        xml += `    <loc>https://example.com${page.path}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
      }

      for (const post of posts || []) {
        const lastmod = post.updated_at
          ? post.updated_at.split("T")[0]
          : post.published_at
            ? post.published_at.split("T")[0]
            : today;

        xml += `  <url>\n`;
        xml += `    <loc>https://example.com/blog/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      }

      xml += `</urlset>`;

      setSitemapXml(xml);
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
    generateSitemap();
  }, []);

  return (
    <div className="">
      <Seo title="Sitemap Generator | Admin" description="Generate sitemap.xml from database" noindex />

      <AdminPageHeader
        title="Sitemap"
        subtitle={`${postCount} published posts reflected in XML · Copy into public/sitemap.xml when you regenerate.`}
        actions={
          <button
            type="button"
            onClick={() => generateSitemap()}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <i className={`ri-refresh-line text-sm ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Info card */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#3d6f7f]/8 flex-shrink-0">
                <i className="ri-map-2-line text-lg text-[#3d6f7f]"></i>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-800 mb-1">How this works</h2>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  This pulls all published blog posts from your database and generates a fresh <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">sitemap.xml</code>.
                  Your Search Console is already pointing to <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">/sitemap.xml</code> — so just copy the output below and paste it into your <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">public/sitemap.xml</code> file, then rebuild.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
              <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Published Posts</p>
              <p className="text-lg font-semibold text-neutral-800">{postCount}</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
              <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Static Pages</p>
              <p className="text-lg font-semibold text-neutral-800">12</p>
            </div>
            <div className="bg-white rounded-xl border border-neutral-100 px-4 py-3">
              <p className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Total URLs</p>
              <p className="text-lg font-semibold text-neutral-800">{postCount + 12}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={generateSitemap}
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
                onClick={handleCopy}
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

          {/* Output */}
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
    </div>
  );
}