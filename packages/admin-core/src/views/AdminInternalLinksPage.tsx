"use client";

import { useState, useMemo, useCallback } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { useInternalLinks } from "../hooks/useInternalLinks";
import { useBlogPosts } from "@sweetmedia/blog-core";
import { useLinkUtilization } from "../hooks/useLinkUtilization";
import { useTrackedPages } from "../hooks/useTrackedPages";
import type { InternalLink } from "../hooks/useInternalLinks";

interface LinkForm {
  keyword: string;
  href: string;
  priority: number;
  active: boolean;
}

const DEFAULT_FORM: LinkForm = {
  keyword: "",
  href: "",
  priority: 80,
  active: true,
};

export default function InternalLinksPage() {
  const { links, loading, error, refetch, createLink, updateLink, deleteLink } = useInternalLinks();
  const { posts: blogPosts, loading: blogLoading } = useBlogPosts();
  const { utilization, loading: utilLoading, refetch: refetchUtil } = useLinkUtilization(links);
  const { pages: trackedPages, loading: pagesLoading } = useTrackedPages();

  const [searchQuery, setSearchQuery] = useState("");
  const [presetTab, setPresetTab] = useState<"pages" | "blogs">("pages");
  const [presetSearch, setPresetSearch] = useState("");
  const [form, setForm] = useState<LinkForm>(DEFAULT_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"mappings" | "by-url" | "utilization">("mappings");
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [urlSearch, setUrlSearch] = useState("");
  const [utilSearch, setUtilSearch] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return links;
    const q = searchQuery.toLowerCase();
    return links.filter(
      (l) =>
        l.keyword.toLowerCase().includes(q) ||
        l.href.toLowerCase().includes(q)
    );
  }, [links, searchQuery]);

  const filteredUtilization = useMemo(() => {
    if (!utilSearch) return utilization;
    const q = utilSearch.toLowerCase();
    return utilization.filter(
      (u) =>
        u.keyword.toLowerCase().includes(q) ||
        u.href.toLowerCase().includes(q)
    );
  }, [utilization, utilSearch]);

  // Group links by URL for the "By URL" tab
  const linksByUrl = useMemo(() => {
    const groups: Record<string, { href: string; links: InternalLink[]; activeCount: number; inactiveCount: number }> = {};
    for (const link of links) {
      if (!groups[link.href]) {
        groups[link.href] = { href: link.href, links: [], activeCount: 0, inactiveCount: 0 };
      }
      groups[link.href].links.push(link);
      if (link.active) {
        groups[link.href].activeCount++;
      } else {
        groups[link.href].inactiveCount++;
      }
    }
    // Sort by total link count descending
    return Object.values(groups).sort((a, b) => b.links.length - a.links.length);
  }, [links]);

  const filteredLinksByUrl = useMemo(() => {
    if (!urlSearch) return linksByUrl;
    const q = urlSearch.toLowerCase();
    return linksByUrl.filter(
      (g) =>
        g.href.toLowerCase().includes(q) ||
        g.links.some((l) => l.keyword.toLowerCase().includes(q))
    );
  }, [linksByUrl, urlSearch]);

  const activeCount = links.filter((l) => l.active).length;
  const inactiveCount = links.filter((l) => !l.active).length;

  // Utilization summary stats
  const utilSummary = useMemo(() => {
    if (utilization.length === 0) return null;
    const totalActive = utilization.length;
    const usedAtLeastOnce = utilization.filter((u) => u.postsLinked > 0).length;
    const totalPostsWithKeywords = utilization.reduce((sum, u) => sum + u.postsWithKeyword, 0);
    const totalLinksCreated = utilization.reduce((sum, u) => sum + u.postsLinked, 0);
    const avgUtilization = totalPostsWithKeywords > 0
      ? Math.round((totalLinksCreated / totalPostsWithKeywords) * 100)
      : 0;
    const highPerformers = utilization.filter((u) => u.utilizationRate >= 50).length;
    const zeroUtil = utilization.filter((u) => u.utilizationRate === 0 && u.postsWithKeyword > 0).length;
    return { totalActive, usedAtLeastOnce, totalPostsWithKeywords, totalLinksCreated, avgUtilization, highPerformers, zeroUtil };
  }, [utilization]);

  const validateForm = (f: LinkForm): string | null => {
    const kws = f.keyword
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    const href = f.href.trim();
    if (kws.length === 0) return "Anchor text is required";
    const short = kws.find((k) => k.length < 3);
    if (short) return `Anchor text "${short}" must be at least 3 characters`;
    if (!href) return "Destination URL is required";
    if (!href.startsWith("/")) return "URL must start with / (internal link only)";
    if (f.priority < 1 || f.priority > 200) return "Priority must be 1–200";
    return null;
  };

  const handleSubmit = async () => {
    setFormError(null);
    const errMsg = validateForm(form);
    if (errMsg) {
      setFormError(errMsg);
      return;
    }

    setSaving(true);

    if (editingId) {
      const payload = {
        keyword: form.keyword.trim(),
        href: form.href.trim(),
        priority: form.priority,
        active: form.active,
      };
      const ok = await updateLink(editingId, payload);
      if (ok) {
        showToast("Link updated");
        setForm(DEFAULT_FORM);
        setEditingId(null);
      } else {
        setFormError("Failed to update link. Keyword may already exist.");
      }
      setSaving(false);
      return;
    }

    const keywords = form.keyword
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    const href = form.href.trim();
    let createdCount = 0;
    let failedCount = 0;

    for (const keyword of keywords) {
      const created = await createLink({
        keyword,
        href,
        priority: form.priority,
        active: form.active,
      });
      if (created) {
        createdCount++;
      } else {
        failedCount++;
      }
    }

    if (createdCount > 0) {
      showToast(`${createdCount} link${createdCount > 1 ? "s" : ""} created`);
      setForm(DEFAULT_FORM);
    }
    if (failedCount > 0) {
      setFormError(`${failedCount} failed — keyword may already exist.`);
    }
    setSaving(false);
  };

  const handleEdit = (link: InternalLink) => {
    setForm({
      keyword: link.keyword,
      href: link.href,
      priority: link.priority,
      active: link.active,
    });
    setEditingId(link.id);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setForm(DEFAULT_FORM);
    setEditingId(null);
    setFormError(null);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const ok = await deleteLink(deletingId);
    setDeletingId(null);
    if (ok) {
      showToast("Link deleted");
    } else {
      showToast("Failed to delete link", "error");
    }
  };

  const handleToggleActive = async (link: InternalLink) => {
    const ok = await updateLink(link.id, { active: !link.active });
    if (ok) {
      showToast(link.active ? "Link deactivated" : "Link activated");
    }
  };

  const setPresetHref = useCallback((href: string) => {
    setForm((prev) => ({ ...prev, href }));
  }, []);

  return (
    <div className="">

      <AdminPageHeader
        title="Internal Links"
        subtitle="Anchor text mappings and utilization across your posts."
      />

      <div className="">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Mappings", value: links.length, icon: "ri-links-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/5" },
            { label: "Active", value: activeCount, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Inactive", value: inactiveCount, icon: "ri-eye-off-line", color: "text-[#64748B]", bg: "bg-[#F4F7FB]" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <i className={`${stat.icon} ${stat.color} text-lg`}></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0A1F44] leading-none">{stat.value}</p>
                <p className="text-[11px] text-[#94A3B8] mt-1 tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6 items-start">
          {/* Form */}
          <div className="w-full lg:w-[420px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#0A1F44]/5 flex items-center justify-center">
                  <i className="ri-link-m text-[#0A1F44] text-sm"></i>
                </div>
                <h2 className="text-sm font-semibold text-[#0A1F44]">
                  {editingId ? "Edit Link Mapping" : "New Link Mapping"}
                </h2>
              </div>

              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                  <i className="ri-error-warning-line text-red-500 text-sm flex-shrink-0 mt-0.5"></i>
                  <p className="text-xs text-red-600">{formError}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Anchor text */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8] mb-1.5">
                    Anchor Text
                  </label>
                  <input
                    type="text"
                    value={form.keyword}
                    onChange={(e) => setForm((prev) => ({ ...prev, keyword: e.target.value }))}
                    placeholder="e.g. local SEO, local search, Google local ranking"
                    className="w-full border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-sm text-[#0A1F44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#7B9FD4] transition-colors"
                  />
                  <p className="text-[10px] text-[#94A3B8] mt-1">
                    Separate multiple phrases with commas to create multiple mappings at once.
                  </p>
                </div>

                {/* Destination URL */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8] mb-1.5">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={form.href}
                    onChange={(e) => setForm((prev) => ({ ...prev, href: e.target.value }))}
                    placeholder="/seo or /blog/slug"
                    className="w-full border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-sm text-[#0A1F44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#7B9FD4] transition-colors"
                  />

                  {/* Destination picker */}
                  <div className="mt-3 bg-[#F4F7FB] border border-[#E2E8F0] rounded-xl overflow-hidden">
                    {/* Tabs + search */}
                    <div className="px-3 pt-2.5 pb-2 border-b border-[#E2E8F0] space-y-2">
                      <div className="flex gap-1 bg-[#F4F7FB] rounded-lg p-0.5">
                        <button
                          onClick={() => { setPresetTab("pages"); setPresetSearch(""); }}
                          className={`flex-1 text-[10px] tracking-[0.1em] uppercase font-bold py-1.5 rounded-md transition-colors cursor-pointer ${
                            presetTab === "pages"
                              ? "bg-white text-[#0A1F44] shadow-sm"
                              : "text-[#94A3B8] hover:text-[#64748B]"
                          }`}
                        >
                          <i className="ri-pages-line mr-1 text-xs"></i>
                          Pages
                        </button>
                        <button
                          onClick={() => { setPresetTab("blogs"); setPresetSearch(""); }}
                          className={`flex-1 text-[10px] tracking-[0.1em] uppercase font-bold py-1.5 rounded-md transition-colors cursor-pointer ${
                            presetTab === "blogs"
                              ? "bg-white text-[#0A1F44] shadow-sm"
                              : "text-[#94A3B8] hover:text-[#64748B]"
                          }`}
                        >
                          <i className="ri-article-line mr-1 text-xs"></i>
                          Blog Posts
                        </button>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5">
                        <i className="ri-search-line text-[#94A3B8] text-xs flex-shrink-0"></i>
                        <input
                          type="text"
                          value={presetSearch}
                          onChange={(e) => setPresetSearch(e.target.value)}
                          placeholder={presetTab === "pages" ? "Search pages…" : "Search blog posts…"}
                          className="flex-1 bg-transparent text-xs text-[#334155] placeholder:text-[#94A3B8] focus:outline-none min-w-0"
                        />
                        {presetSearch && (
                          <button
                            onClick={() => setPresetSearch("")}
                            className="w-4 h-4 flex items-center justify-center rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] transition-colors cursor-pointer flex-shrink-0"
                          >
                            <i className="ri-close-line text-[8px]"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable list */}
                    <div className="max-h-[200px] overflow-y-auto">
                      {presetTab === "pages" ? (
                        pagesLoading ? (
                          <div className="px-3 py-4 text-center">
                            <i className="ri-loader-4-line animate-spin text-[#CBD5E1] text-sm"></i>
                          </div>
                        ) : (() => {
                          const filtered = trackedPages
                            .filter((p) => p.is_active)
                            .filter((p) =>
                              !presetSearch ||
                              p.page_title.toLowerCase().includes(presetSearch.toLowerCase()) ||
                              p.route_path.toLowerCase().includes(presetSearch.toLowerCase())
                            );
                          return filtered.length === 0 ? (
                            <div className="px-3 py-4 text-center">
                              <p className="text-xs text-[#94A3B8]">
                                {presetSearch ? "No pages match your search." : "No tracked pages found."}
                              </p>
                            </div>
                          ) : (
                            <div className="divide-y divide-[#E2E8F0]">
                              {filtered.map((page) => (
                                <button
                                  key={page.route_path}
                                  onClick={() => setPresetHref(page.route_path)}
                                  className={`w-full text-left px-3 py-2.5 transition-colors cursor-pointer ${
                                    form.href === page.route_path
                                      ? "bg-[#0A1F44]/5 text-[#0A1F44] font-medium"
                                      : "text-[#64748B] hover:bg-[#F4F7FB]"
                                  }`}
                                >
                                  <span className="truncate block text-xs">{page.page_title}</span>
                                  <span className="truncate block text-[10px] text-[#94A3B8] mt-0.5">{page.route_path}</span>
                                </button>
                              ))}
                            </div>
                          );
                        })()
                      ) : (
                        blogLoading ? (
                          <div className="px-3 py-4 text-center">
                            <i className="ri-loader-4-line animate-spin text-[#CBD5E1] text-sm"></i>
                          </div>
                        ) : (() => {
                          const filtered = blogPosts.filter((p) =>
                            !presetSearch ||
                            p.title.toLowerCase().includes(presetSearch.toLowerCase())
                          );
                          return filtered.length === 0 ? (
                            <div className="px-3 py-4 text-center">
                              <p className="text-xs text-[#94A3B8]">
                                {presetSearch ? "No blog posts match your search." : "No published blog posts found."}
                              </p>
                            </div>
                          ) : (
                            <div className="divide-y divide-[#E2E8F0]">
                              {filtered.map((post) => (
                                <button
                                  key={post.id}
                                  onClick={() => setPresetHref(`/blog/${post.slug}`)}
                                  className={`w-full text-left px-3 py-2.5 transition-colors cursor-pointer ${
                                    form.href === `/blog/${post.slug}`
                                      ? "bg-[#0A1F44]/5 text-[#0A1F44] font-medium"
                                      : "text-[#64748B] hover:bg-[#F4F7FB]"
                                  }`}
                                >
                                  <span className="truncate block text-xs">{post.title}</span>
                                </button>
                              ))}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8] mb-1.5">
                    Priority — {form.priority}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={200}
                    value={form.priority}
                    onChange={(e) => setForm((prev) => ({ ...prev, priority: parseInt(e.target.value, 10) }))}
                    className="w-full accent-[#0A1F44]"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1">
                    <span>Low (1)</span>
                    <span>High (200)</span>
                  </div>
                  <p className="text-[10px] text-[#94A3B8] mt-1">
                    Higher priority wins when multiple mappings could match the same text.
                  </p>
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm text-[#334155]">Active</label>
                  <button
                    onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      form.active ? "bg-emerald-500" : "bg-[#CBD5E1]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        form.active ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {saving ? (
                      <i className="ri-loader-4-line animate-spin text-xs"></i>
                    ) : (
                      <i className="ri-save-line text-xs"></i>
                    )}
                    {editingId ? "Update Mapping" : `Create ${(() => {
                      const count = form.keyword
                        .split(",")
                        .map((k) => k.trim())
                        .filter((k) => k.length > 0).length;
                      return count > 1 ? `${count} Mappings` : "Mapping";
                    })()}`}
                  </button>
                  {editingId && (
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 border border-[#E2E8F0] text-[#64748B] text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#F4F7FB] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-close-line text-xs"></i>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <h3 className="text-sm font-semibold text-[#0A1F44] mb-3 flex items-center gap-2">
                <i className="ri-information-line text-[#94A3B8]"></i>
                How It Works
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Add anchor text + destination URL pairs here.",
                  "These override auto-extracted blog title phrases.",
                  "Higher priority mappings win when multiple could match.",
                  "Each destination page gets linked at most once per blog post.",
                  "Inactive mappings are ignored but kept for later.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#64748B] leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-[#F4F7FB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-bold text-[#94A3B8]">{i + 1}</span>
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* List / Utilization */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-1 mb-4 flex gap-1">
              <button
                onClick={() => setActiveTab("mappings")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "mappings"
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#64748B] hover:bg-[#F4F7FB]"
                }`}
              >
                <i className="ri-links-line mr-1.5 text-xs"></i>
                All Mappings
              </button>
              <button
                onClick={() => setActiveTab("by-url")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "by-url"
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#64748B] hover:bg-[#F4F7FB]"
                }`}
              >
                <i className="ri-folders-line mr-1.5 text-xs"></i>
                By URL
              </button>
              <button
                onClick={() => setActiveTab("utilization")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "utilization"
                    ? "bg-[#0A1F44] text-white"
                    : "text-[#64748B] hover:bg-[#F4F7FB]"
                }`}
              >
                <i className="ri-bar-chart-box-line mr-1.5 text-xs"></i>
                Utilization
              </button>
            </div>

            {activeTab === "mappings" ? (
              <>
                {/* Search */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F4F7FB] border border-[#E2E8F0] rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-[#94A3B8] text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anchor text or URL..."
                      className="flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94A3B8] focus:outline-none min-w-0"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetch}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F4F7FB] transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-[#CBD5E1] mb-3 block"></i>
                    <p className="text-sm text-[#94A3B8]">Loading links...</p>
                  </div>
                )}

                {/* Error */}
                {error && !loading && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block"></i>
                    <p className="text-sm text-red-600">{error}</p>
                    <button
                      onClick={refetch}
                      className="mt-3 text-xs text-red-600 underline cursor-pointer"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {/* Empty */}
                {!loading && !error && filtered.length === 0 && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-links-line text-4xl text-[#E2E8F0] mb-3 block"></i>
                    <p className="text-sm text-[#64748B] mb-1">
                      {searchQuery ? "No matches found." : "No manual link mappings yet."}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      {searchQuery
                        ? "Try a different search term."
                        : "Create your first mapping using the form on the left."}
                    </p>
                  </div>
                )}

                {/* Table */}
                {!loading && !error && filtered.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#E2E8F0]">
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-3">Anchor Text</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-3">Destination</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-3">Priority</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-3">Status</th>
                            <th className="text-right text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((link) => (
                            <tr
                              key={link.id}
                              className={`border-b border-[#F4F7FB] hover:bg-[#F4F7FB]/50 transition-colors ${
                                !link.active ? "opacity-60" : ""
                              } ${editingId === link.id ? "bg-[#0A1F44]/3" : ""}`}
                            >
                              <td className="px-5 py-3.5">
                                <span className="text-sm font-medium text-[#0A1F44]">{link.keyword}</span>
                              </td>
                              <td className="px-5 py-3.5">
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#0A1F44] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  {link.href}
                                  <i className="ri-external-link-line text-[10px]"></i>
                                </a>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-[#F4F7FB] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#0A1F44] rounded-full"
                                      style={{ width: `${(link.priority / 200) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-[#64748B] font-mono">{link.priority}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <button
                                  onClick={() => handleToggleActive(link)}
                                  className={`inline-flex items-center gap-1 text-[10px] tracking-wide font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                                    link.active
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-[#F4F7FB] text-[#64748B]"
                                  }`}
                                >
                                  <i className={`${link.active ? "ri-checkbox-circle-line" : "ri-eye-off-line"} text-xs`}></i>
                                  {link.active ? "Active" : "Inactive"}
                                </button>
                              </td>
                              <td className="px-5 py-3.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => handleEdit(link)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F7FB] text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                                    title="Edit"
                                  >
                                    <i className="ri-pencil-line text-sm"></i>
                                  </button>
                                  <button
                                    onClick={() => setDeletingId(link.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-red-500 transition-colors cursor-pointer"
                                    title="Delete"
                                  >
                                    <i className="ri-delete-bin-line text-sm"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : activeTab === "by-url" ? (
              <>
                {/* Search */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F4F7FB] border border-[#E2E8F0] rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-[#94A3B8] text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={urlSearch}
                      onChange={(e) => setUrlSearch(e.target.value)}
                      placeholder="Search URL or anchor text..."
                      className="flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94A3B8] focus:outline-none min-w-0"
                    />
                    {urlSearch && (
                      <button
                        onClick={() => setUrlSearch("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetch}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F4F7FB] transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-[#CBD5E1] mb-3 block"></i>
                    <p className="text-sm text-[#94A3B8]">Loading links...</p>
                  </div>
                )}

                {/* Error */}
                {error && !loading && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block"></i>
                    <p className="text-sm text-red-600">{error}</p>
                    <button
                      onClick={refetch}
                      className="mt-3 text-xs text-red-600 underline cursor-pointer"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {/* Empty */}
                {!loading && !error && filteredLinksByUrl.length === 0 && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-folders-line text-4xl text-[#E2E8F0] mb-3 block"></i>
                    <p className="text-sm text-[#64748B] mb-1">
                      {urlSearch ? "No matches found." : "No link mappings yet."}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      {urlSearch
                        ? "Try a different search term."
                        : "Create your first mapping using the form on the left."}
                    </p>
                  </div>
                )}

                {/* URL Groups */}
                {!loading && !error && filteredLinksByUrl.length > 0 && (
                  <div className="space-y-3">
                    {filteredLinksByUrl.map((group) => (
                      <div key={group.href} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
                        {/* URL Header — clickable to expand */}
                        <button
                          onClick={() => setExpandedUrl(expandedUrl === group.href ? null : group.href)}
                          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#F4F7FB]/50 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0A1F44]/5 flex-shrink-0">
                            <i className={`ri-arrow-right-s-line text-[#0A1F44] transition-transform ${expandedUrl === group.href ? "rotate-90" : ""}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <a
                                href={group.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-semibold text-[#0A1F44] hover:underline truncate cursor-pointer"
                              >
                                {group.href}
                              </a>
                              <span className="text-[10px] tracking-wide text-[#94A3B8]">
                                {group.links.length} anchor text{group.links.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                {group.activeCount} active
                              </span>
                              {group.inactiveCount > 0 && (
                                <span className="text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full bg-[#F4F7FB] text-[#64748B]">
                                  {group.inactiveCount} inactive
                                </span>
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Expanded anchor text list */}
                        {expandedUrl === group.href && (
                          <div className="border-t border-[#E2E8F0]">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-[#F4F7FB] bg-[#F4F7FB]/50">
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-2.5">Anchor Text</th>
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-2.5">Priority</th>
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-2.5">Status</th>
                                  <th className="text-right text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] px-5 py-2.5">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.links.map((link) => (
                                  <tr
                                    key={link.id}
                                    className={`border-b border-[#F4F7FB] hover:bg-[#F4F7FB]/50 transition-colors ${
                                      !link.active ? "opacity-60" : ""
                                    }`}
                                  >
                                    <td className="px-5 py-3">
                                      <span className="text-sm font-medium text-[#0A1F44]">{link.keyword}</span>
                                    </td>
                                    <td className="px-5 py-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-12 h-1.5 bg-[#F4F7FB] rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-[#0A1F44] rounded-full"
                                            style={{ width: `${(link.priority / 200) * 100}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-[#64748B] font-mono">{link.priority}</span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-3">
                                      <button
                                        onClick={() => handleToggleActive(link)}
                                        className={`inline-flex items-center gap-1 text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${
                                          link.active
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-[#F4F7FB] text-[#64748B]"
                                        }`}
                                      >
                                        <i className={`${link.active ? "ri-checkbox-circle-line" : "ri-eye-off-line"} text-xs`}></i>
                                        {link.active ? "Active" : "Inactive"}
                                      </button>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        <button
                                          onClick={() => handleEdit(link)}
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F7FB] text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                                          title="Edit"
                                        >
                                          <i className="ri-pencil-line text-xs"></i>
                                        </button>
                                        <button
                                          onClick={() => setDeletingId(link.id)}
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-red-500 transition-colors cursor-pointer"
                                          title="Delete"
                                        >
                                          <i className="ri-delete-bin-line text-xs"></i>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Utilization Dashboard */}
                {utilSummary && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Active Links", value: utilSummary.totalActive, icon: "ri-links-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/5" },
                      { label: "Getting Used", value: utilSummary.usedAtLeastOnce, icon: "ri-link-unlink-m", color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Links Created", value: utilSummary.totalLinksCreated, icon: "ri-link-m", color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Avg Utilization", value: `${utilSummary.avgUtilization}%`, icon: "ri-percent-line", color: "text-sky-600", bg: "bg-sky-50" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                          <i className={`${stat.icon} ${stat.color} text-base`}></i>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-[#0A1F44] leading-none">{stat.value}</p>
                          <p className="text-[10px] text-[#94A3B8] mt-1 tracking-wide">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Utilization search + refresh */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#F4F7FB] border border-[#E2E8F0] rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-[#94A3B8] text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={utilSearch}
                      onChange={(e) => setUtilSearch(e.target.value)}
                      placeholder="Search keyword or URL..."
                      className="flex-1 bg-transparent text-sm text-[#334155] placeholder:text-[#94A3B8] focus:outline-none min-w-0"
                    />
                    {utilSearch && (
                      <button
                        onClick={() => setUtilSearch("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#64748B] transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetchUtil}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F4F7FB] transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh utilization"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {utilLoading && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-[#CBD5E1] mb-3 block"></i>
                    <p className="text-sm text-[#94A3B8]">Scanning blog posts for keyword matches...</p>
                  </div>
                )}

                {!utilLoading && filteredUtilization.length === 0 && (
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <i className="ri-bar-chart-box-line text-4xl text-[#E2E8F0] mb-3 block"></i>
                    <p className="text-sm text-[#64748B] mb-1">
                      {utilSearch ? "No matches found." : "No active links to analyze yet."}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      {utilSearch
                        ? "Try a different search term."
                        : "Create and activate some link mappings first, then come back here."}
                    </p>
                  </div>
                )}

                {!utilLoading && filteredUtilization.length > 0 && (
                  <div className="space-y-3">
                    {filteredUtilization.map((u) => (
                      <div key={u.linkId} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-semibold text-[#0A1F44]">{u.keyword}</span>
                                <span className={`text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full ${
                                  u.utilizationRate >= 50
                                    ? "bg-emerald-50 text-emerald-600"
                                    : u.utilizationRate > 0
                                    ? "bg-amber-50 text-amber-600"
                                    : u.postsWithKeyword > 0
                                    ? "bg-red-50 text-red-500"
                                    : "bg-[#F4F7FB] text-[#94A3B8]"
                                }`}>
                                  {u.utilizationRate >= 50 ? "High" : u.utilizationRate > 0 ? "Low" : u.postsWithKeyword > 0 ? "Blocked" : "No Matches"}
                                </span>
                              </div>
                              {u.blockReason && (
                                <p className="text-[11px] text-red-400 mt-1 leading-snug flex items-start gap-1">
                                  <i className="ri-information-line flex-shrink-0 mt-0.5"></i>
                                  {u.blockReason}
                                </p>
                              )}
                              <a
                                href={u.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#0A1F44] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                {u.href}
                                <i className="ri-external-link-line text-[10px]"></i>
                              </a>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl font-bold text-[#0A1F44] leading-none">{u.utilizationRate}%</p>
                              <p className="text-[10px] text-[#94A3B8] mt-1">utilization</p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-[10px] text-[#94A3B8] mb-1.5">
                              <span>{u.postsLinked} linked out of {u.postsWithKeyword} posts containing this keyword</span>
                              <span className="font-mono">{u.priority} priority</span>
                            </div>
                            <div className="w-full h-2 bg-[#F4F7FB] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  u.utilizationRate >= 50
                                    ? "bg-emerald-500"
                                    : u.utilizationRate > 0
                                    ? "bg-amber-400"
                                    : u.postsWithKeyword > 0
                                    ? "bg-red-400"
                                    : "bg-[#CBD5E1]"
                                }`}
                                style={{ width: `${u.utilizationRate}%` }}
                              />
                            </div>
                          </div>

                          {/* Top posts */}
                          {u.topPosts.length > 0 && (
                            <div>
                              <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#94A3B8] mb-2">Top Posts</p>
                              <div className="space-y-1.5">
                                {u.topPosts.map((post) => (
                                  <div key={post.slug} className="flex items-center justify-between gap-3">
                                    <a
                                      href={`/blog/${post.slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-[#64748B] hover:text-[#0A1F44] truncate transition-colors cursor-pointer"
                                    >
                                      {post.title}
                                    </a>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                      post.linked
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-[#F4F7FB] text-[#94A3B8]"
                                    }`}>
                                      {post.linked ? "Linked" : "Not linked"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <i className="ri-delete-bin-line text-red-500 text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A1F44]">Delete Mapping?</h3>
                <p className="text-xs text-[#94A3B8]">This cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-[#E2E8F0] text-[#64748B] text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#F4F7FB] transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
          toast.type === "success" ? "bg-[#0A1F44] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}