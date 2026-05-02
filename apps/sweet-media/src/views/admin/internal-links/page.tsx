"use client";

import { useState, useMemo, useCallback } from "react";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import { useInternalLinks } from "@/hooks/useInternalLinks";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useLinkUtilization } from "@/hooks/useLinkUtilization";
import type { InternalLink } from "@/hooks/useInternalLinks";
import Seo from "@/components/feature/Seo";

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

const HREF_PRESETS = [
  { label: "SEO Service", href: "/seo" },
  { label: "Paid Media", href: "/paid-media" },
  { label: "Social Media", href: "/social-media" },
  { label: "Web Development", href: "/web-dev" },
  { label: "Industries", href: "/industries" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function InternalLinksPage() {
  const { links, loading, error, refetch, createLink, updateLink, deleteLink } = useInternalLinks();
  const { posts: blogPosts, loading: blogLoading } = useBlogPosts();
  const { utilization, loading: utilLoading, refetch: refetchUtil } = useLinkUtilization(links);

  const [searchQuery, setSearchQuery] = useState("");
  const [blogSearch, setBlogSearch] = useState("");
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

  const filteredBlogPosts = useMemo(() => {
    if (!blogSearch) return blogPosts;
    const q = blogSearch.toLowerCase();
    return blogPosts.filter((p) => p.title.toLowerCase().includes(q));
  }, [blogPosts, blogSearch]);

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
      <Seo title="Internal Links | Admin" description="Manage manual internal link anchor text mappings" noindex />

      <AdminPageHeader
        title="Internal Links"
        subtitle="Anchor text mappings and utilization across your posts."
      />

      <div className="">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Mappings", value: links.length, icon: "ri-links-line", color: "text-[#3d6f7f]", bg: "bg-[#3d6f7f]/5" },
            { label: "Active", value: activeCount, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Inactive", value: inactiveCount, icon: "ri-eye-off-line", color: "text-neutral-500", bg: "bg-neutral-100" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-neutral-100 p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <i className={`${stat.icon} ${stat.color} text-lg`}></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900 leading-none">{stat.value}</p>
                <p className="text-[11px] text-neutral-400 mt-1 tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6 items-start">
          {/* Form */}
          <div className="w-full lg:w-[420px] flex-shrink-0 space-y-5">
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#3d6f7f]/5 flex items-center justify-center">
                  <i className="ri-link-m text-[#3d6f7f] text-sm"></i>
                </div>
                <h2 className="text-sm font-semibold text-neutral-900">
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
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-1.5">
                    Anchor Text
                  </label>
                  <input
                    type="text"
                    value={form.keyword}
                    onChange={(e) => setForm((prev) => ({ ...prev, keyword: e.target.value }))}
                    placeholder="e.g. local SEO, local search, Google local ranking"
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#3d6f7f] transition-colors"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Separate multiple phrases with commas to create multiple mappings at once.
                  </p>
                </div>

                {/* Destination URL */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-1.5">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={form.href}
                    onChange={(e) => setForm((prev) => ({ ...prev, href: e.target.value }))}
                    placeholder="/seo or /blog/slug"
                    className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#3d6f7f] transition-colors"
                  />

                  {/* Service Page Presets */}
                  <div className="mt-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">Service Pages</p>
                    <div className="flex flex-wrap gap-1.5">
                      {HREF_PRESETS.map((preset) => (
                        <button
                          key={preset.href}
                          onClick={() => setPresetHref(preset.href)}
                          className={`text-[10px] tracking-wide px-2.5 py-1 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                            form.href === preset.href
                              ? "bg-[#3d6f7f] text-white border-[#3d6f7f]"
                              : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blog Posts Presets */}
                  <div className="mt-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">Blog Posts</p>
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden">
                      <div className="px-3 py-2 border-b border-neutral-200">
                        <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5">
                          <i className="ri-search-line text-neutral-400 text-xs flex-shrink-0"></i>
                          <input
                            type="text"
                            value={blogSearch}
                            onChange={(e) => setBlogSearch(e.target.value)}
                            placeholder="Search blog posts..."
                            className="flex-1 bg-transparent text-xs text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
                          />
                          {blogSearch && (
                            <button
                              onClick={() => setBlogSearch("")}
                              className="w-4 h-4 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                            >
                              <i className="ri-close-line text-[8px]"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="max-h-[180px] overflow-y-auto">
                        {blogLoading ? (
                          <div className="px-3 py-4 text-center">
                            <i className="ri-loader-4-line animate-spin text-neutral-300 text-sm"></i>
                          </div>
                        ) : filteredBlogPosts.length === 0 ? (
                          <div className="px-3 py-4 text-center">
                            <p className="text-xs text-neutral-400">
                              {blogSearch ? "No blog posts match your search." : "No published blog posts found."}
                            </p>
                          </div>
                        ) : (
                          <div className="divide-y divide-neutral-100">
                            {filteredBlogPosts.map((post) => (
                              <button
                                key={post.id}
                                onClick={() => setPresetHref(`/blog/${post.slug}`)}
                                className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                                  form.href === `/blog/${post.slug}`
                                    ? "bg-[#3d6f7f]/5 text-[#3d6f7f] font-medium"
                                    : "text-neutral-600 hover:bg-neutral-100"
                                }`}
                              >
                                <span className="truncate block">{post.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-1.5">
                    Priority — {form.priority}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={200}
                    value={form.priority}
                    onChange={(e) => setForm((prev) => ({ ...prev, priority: parseInt(e.target.value, 10) }))}
                    className="w-full accent-[#3d6f7f]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>Low (1)</span>
                    <span>High (200)</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Higher priority wins when multiple mappings could match the same text.
                  </p>
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm text-neutral-700">Active</label>
                  <button
                    onClick={() => setForm((prev) => ({ ...prev, active: !prev.active }))}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      form.active ? "bg-emerald-500" : "bg-neutral-300"
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
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
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
                      className="flex items-center gap-1.5 border border-neutral-200 text-neutral-500 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-close-line text-xs"></i>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-5">
              <h3 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                <i className="ri-information-line text-neutral-400"></i>
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
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-500 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-bold text-neutral-400">{i + 1}</span>
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
            <div className="bg-white rounded-2xl border border-neutral-100 p-1 mb-4 flex gap-1">
              <button
                onClick={() => setActiveTab("mappings")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "mappings"
                    ? "bg-[#3d6f7f] text-white"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                <i className="ri-links-line mr-1.5 text-xs"></i>
                All Mappings
              </button>
              <button
                onClick={() => setActiveTab("by-url")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "by-url"
                    ? "bg-[#3d6f7f] text-white"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                <i className="ri-folders-line mr-1.5 text-xs"></i>
                By URL
              </button>
              <button
                onClick={() => setActiveTab("utilization")}
                className={`flex-1 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "utilization"
                    ? "bg-[#3d6f7f] text-white"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                <i className="ri-bar-chart-box-line mr-1.5 text-xs"></i>
                Utilization
              </button>
            </div>

            {activeTab === "mappings" ? (
              <>
                {/* Search */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anchor text or URL..."
                      className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetch}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
                    <p className="text-sm text-neutral-400">Loading links...</p>
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
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-links-line text-4xl text-neutral-200 mb-3 block"></i>
                    <p className="text-sm text-neutral-500 mb-1">
                      {searchQuery ? "No matches found." : "No manual link mappings yet."}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {searchQuery
                        ? "Try a different search term."
                        : "Create your first mapping using the form on the left."}
                    </p>
                  </div>
                )}

                {/* Table */}
                {!loading && !error && filtered.length > 0 && (
                  <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-neutral-100">
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-3">Anchor Text</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-3">Destination</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-3">Priority</th>
                            <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-3">Status</th>
                            <th className="text-right text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((link) => (
                            <tr
                              key={link.id}
                              className={`border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors ${
                                !link.active ? "opacity-60" : ""
                              } ${editingId === link.id ? "bg-[#3d6f7f]/3" : ""}`}
                            >
                              <td className="px-5 py-3.5">
                                <span className="text-sm font-medium text-neutral-800">{link.keyword}</span>
                              </td>
                              <td className="px-5 py-3.5">
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#3d6f7f] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  {link.href}
                                  <i className="ri-external-link-line text-[10px]"></i>
                                </a>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#3d6f7f] rounded-full"
                                      style={{ width: `${(link.priority / 200) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-neutral-500 font-mono">{link.priority}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <button
                                  onClick={() => handleToggleActive(link)}
                                  className={`inline-flex items-center gap-1 text-[10px] tracking-wide font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                                    link.active
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-neutral-100 text-neutral-500"
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
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                                    title="Edit"
                                  >
                                    <i className="ri-pencil-line text-sm"></i>
                                  </button>
                                  <button
                                    onClick={() => setDeletingId(link.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
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
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={urlSearch}
                      onChange={(e) => setUrlSearch(e.target.value)}
                      placeholder="Search URL or anchor text..."
                      className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
                    />
                    {urlSearch && (
                      <button
                        onClick={() => setUrlSearch("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetch}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
                    <p className="text-sm text-neutral-400">Loading links...</p>
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
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-folders-line text-4xl text-neutral-200 mb-3 block"></i>
                    <p className="text-sm text-neutral-500 mb-1">
                      {urlSearch ? "No matches found." : "No link mappings yet."}
                    </p>
                    <p className="text-xs text-neutral-400">
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
                      <div key={group.href} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                        {/* URL Header — clickable to expand */}
                        <button
                          onClick={() => setExpandedUrl(expandedUrl === group.href ? null : group.href)}
                          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-neutral-50/50 transition-colors text-left cursor-pointer"
                        >
                          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3d6f7f]/5 flex-shrink-0">
                            <i className={`ri-arrow-right-s-line text-[#3d6f7f] transition-transform ${expandedUrl === group.href ? "rotate-90" : ""}`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <a
                                href={group.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-semibold text-[#3d6f7f] hover:underline truncate cursor-pointer"
                              >
                                {group.href}
                              </a>
                              <span className="text-[10px] tracking-wide text-neutral-400">
                                {group.links.length} anchor text{group.links.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                {group.activeCount} active
                              </span>
                              {group.inactiveCount > 0 && (
                                <span className="text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                                  {group.inactiveCount} inactive
                                </span>
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Expanded anchor text list */}
                        {expandedUrl === group.href && (
                          <div className="border-t border-neutral-100">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-neutral-50 bg-neutral-50/50">
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-2.5">Anchor Text</th>
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-2.5">Priority</th>
                                  <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-2.5">Status</th>
                                  <th className="text-right text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-5 py-2.5">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.links.map((link) => (
                                  <tr
                                    key={link.id}
                                    className={`border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors ${
                                      !link.active ? "opacity-60" : ""
                                    }`}
                                  >
                                    <td className="px-5 py-3">
                                      <span className="text-sm font-medium text-neutral-800">{link.keyword}</span>
                                    </td>
                                    <td className="px-5 py-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-12 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-[#3d6f7f] rounded-full"
                                            style={{ width: `${(link.priority / 200) * 100}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-neutral-500 font-mono">{link.priority}</span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-3">
                                      <button
                                        onClick={() => handleToggleActive(link)}
                                        className={`inline-flex items-center gap-1 text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${
                                          link.active
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-neutral-100 text-neutral-500"
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
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                                          title="Edit"
                                        >
                                          <i className="ri-pencil-line text-xs"></i>
                                        </button>
                                        <button
                                          onClick={() => setDeletingId(link.id)}
                                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
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
                      { label: "Active Links", value: utilSummary.totalActive, icon: "ri-links-line", color: "text-[#3d6f7f]", bg: "bg-[#3d6f7f]/5" },
                      { label: "Getting Used", value: utilSummary.usedAtLeastOnce, icon: "ri-link-unlink-m", color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Links Created", value: utilSummary.totalLinksCreated, icon: "ri-link-m", color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Avg Utilization", value: `${utilSummary.avgUtilization}%`, icon: "ri-percent-line", color: "text-sky-600", bg: "bg-sky-50" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl border border-neutral-100 p-4 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                          <i className={`${stat.icon} ${stat.color} text-base`}></i>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-neutral-900 leading-none">{stat.value}</p>
                          <p className="text-[10px] text-neutral-400 mt-1 tracking-wide">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Utilization search + refresh */}
                <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
                    <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0"></i>
                    <input
                      type="text"
                      value={utilSearch}
                      onChange={(e) => setUtilSearch(e.target.value)}
                      placeholder="Search keyword or URL..."
                      className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none min-w-0"
                    />
                    {utilSearch && (
                      <button
                        onClick={() => setUtilSearch("")}
                        className="w-5 h-5 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-500 transition-colors cursor-pointer flex-shrink-0"
                      >
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={refetchUtil}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors cursor-pointer flex-shrink-0"
                    title="Refresh utilization"
                  >
                    <i className="ri-refresh-line text-sm"></i>
                  </button>
                </div>

                {utilLoading && (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
                    <p className="text-sm text-neutral-400">Scanning blog posts for keyword matches...</p>
                  </div>
                )}

                {!utilLoading && filteredUtilization.length === 0 && (
                  <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                    <i className="ri-bar-chart-box-line text-4xl text-neutral-200 mb-3 block"></i>
                    <p className="text-sm text-neutral-500 mb-1">
                      {utilSearch ? "No matches found." : "No active links to analyze yet."}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {utilSearch
                        ? "Try a different search term."
                        : "Create and activate some link mappings first, then come back here."}
                    </p>
                  </div>
                )}

                {!utilLoading && filteredUtilization.length > 0 && (
                  <div className="space-y-3">
                    {filteredUtilization.map((u) => (
                      <div key={u.linkId} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-semibold text-neutral-800">{u.keyword}</span>
                                <span className={`text-[10px] tracking-wide font-semibold px-2 py-0.5 rounded-full ${
                                  u.utilizationRate >= 50
                                    ? "bg-emerald-50 text-emerald-600"
                                    : u.utilizationRate > 0
                                    ? "bg-amber-50 text-amber-600"
                                    : u.postsWithKeyword > 0
                                    ? "bg-red-50 text-red-500"
                                    : "bg-neutral-100 text-neutral-400"
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
                                className="text-xs text-[#3d6f7f] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                {u.href}
                                <i className="ri-external-link-line text-[10px]"></i>
                              </a>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl font-bold text-neutral-900 leading-none">{u.utilizationRate}%</p>
                              <p className="text-[10px] text-neutral-400 mt-1">utilization</p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1.5">
                              <span>{u.postsLinked} linked out of {u.postsWithKeyword} posts containing this keyword</span>
                              <span className="font-mono">{u.priority} priority</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  u.utilizationRate >= 50
                                    ? "bg-emerald-500"
                                    : u.utilizationRate > 0
                                    ? "bg-amber-400"
                                    : u.postsWithKeyword > 0
                                    ? "bg-red-400"
                                    : "bg-neutral-300"
                                }`}
                                style={{ width: `${u.utilizationRate}%` }}
                              />
                            </div>
                          </div>

                          {/* Top posts */}
                          {u.topPosts.length > 0 && (
                            <div>
                              <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">Top Posts</p>
                              <div className="space-y-1.5">
                                {u.topPosts.map((post) => (
                                  <div key={post.slug} className="flex items-center justify-between gap-3">
                                    <a
                                      href={`/blog/${post.slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-neutral-600 hover:text-[#3d6f7f] truncate transition-colors cursor-pointer"
                                    >
                                      {post.title}
                                    </a>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                      post.linked
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-neutral-100 text-neutral-400"
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
                <h3 className="text-sm font-semibold text-neutral-900">Delete Mapping?</h3>
                <p className="text-xs text-neutral-400">This cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
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
          toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}