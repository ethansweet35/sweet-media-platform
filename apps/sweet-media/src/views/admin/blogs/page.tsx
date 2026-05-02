"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, useRef } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminBlogPosts } from "@/hooks/useAdminBlogPosts";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import AdminBlogTable from "@/components/pages/admin/blogs/components/AdminBlogTable";
import AdminBlogDeleteModal from "@/components/pages/admin/blogs/components/AdminBlogDeleteModal";
import Seo from "@/components/feature/Seo";
import { ADMIN_OCEAN } from "@/lib/adminTheme";

type FilterStatus = "all" | "published" | "draft";

interface ImageGenStatus {
  status: "pending" | "generating" | "done" | "error";
  url?: string;
  error?: string;
  model?: string;
}

/** Calls generate-blog-image edge fn; backend updates hero_image_url when postId is set. */
async function callGenerateBlogImage(post: BlogPost): Promise<{ url: string; model?: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error("You must be logged in to generate images.");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl?.trim()) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");

  const apikey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  const imgRes = await fetch(`${supabaseUrl}/functions/v1/generate-blog-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      apikey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      excerpt: post.title,
      category: post.category,
      postId: post.id,
    }),
  });

  let body: Record<string, unknown>;
  try {
    body = (await imgRes.json()) as Record<string, unknown>;
  } catch {
    throw new Error("Invalid response from image generator");
  }

  if (imgRes.ok && typeof body.url === "string" && body.url.length > 0) {
    return {
      url: body.url,
      model: typeof body.model === "string" ? body.model : undefined,
    };
  }

  const errMsg =
    typeof body.error === "string"
      ? body.error
      : !imgRes.ok
        ? `HTTP ${imgRes.status}`
        : "Image generation failed";
  throw new Error(errMsg.slice(0, 2000));
}

export default function AdminBlogDashboard() {
  const {
    posts,
    loading,
    error,
    deletePost,
    toggleStatus,
    toggleApprovedForPublish,
    toggleFeatured,
    refetch,
  } = useAdminBlogPosts();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [approvingForPublishId, setApprovingForPublishId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Bulk image generation state
  const [imageGenStatuses, setImageGenStatuses] = useState<Record<string, ImageGenStatus>>({});
  const [bulkGenRunning, setBulkGenRunning] = useState(false);
  const [bulkGenProgress, setBulkGenProgress] = useState({ done: 0, total: 0 });
  const abortRef = useRef(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  const stats = useMemo(() => ({
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    featured: posts.filter((p) => p.featured).length,
  }), [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      const matchesCategory = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, searchQuery, filterStatus, filterCategory]);

  // Selection handlers
  const handleSelectId = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [filtered]);

  const clearSelection = () => setSelectedIds(new Set());

  // Last error detail for debugging
  const [lastErrorDetail, setLastErrorDetail] = useState<string | null>(null);

  const [testResult] = useState<string | null>(null);

  // Bulk image generation
  const handleBulkGenerateImages = useCallback(async () => {
    const targetPosts = posts.filter((p) => selectedIds.has(p.id));
    if (targetPosts.length === 0) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      showToast("You must be logged in to generate images.", "error");
      return;
    }

    abortRef.current = false;
    setBulkGenRunning(true);
    setBulkGenProgress({ done: 0, total: targetPosts.length });

    // Mark all as pending
    const initialStatuses: Record<string, ImageGenStatus> = {};
    targetPosts.forEach((p) => { initialStatuses[p.id] = { status: "pending" }; });
    setImageGenStatuses((prev) => ({ ...prev, ...initialStatuses }));

    let doneCount = 0;
    let successCount = 0;

    for (const post of targetPosts) {
      if (abortRef.current) break;

      // Mark as generating
      setImageGenStatuses((prev) => ({
        ...prev,
        [post.id]: { status: "generating" },
      }));

      try {
        const data = await callGenerateBlogImage(post);
        successCount++;

        setImageGenStatuses((prev) => ({
          ...prev,
          [post.id]: { status: "done", url: data.url, model: data.model },
        }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        setLastErrorDetail(msg);
        setImageGenStatuses((prev) => ({
          ...prev,
          [post.id]: { status: "error", error: msg },
        }));
      }

      doneCount++;
      setBulkGenProgress({ done: doneCount, total: targetPosts.length });
    }

    setBulkGenRunning(false);

    // Refresh posts so images show up in the table
    await refetch();

    if (successCount === doneCount && doneCount > 0) {
      showToast(`Done! Generated images for ${successCount} post${successCount !== 1 ? "s" : ""}.`);
    } else if (doneCount > 0) {
      showToast(
        `${successCount} succeeded, ${doneCount - successCount} failed (of ${doneCount} attempted).`,
        successCount === 0 ? "error" : "success"
      );
    }
  }, [posts, selectedIds, refetch]);

  const handleAbortGeneration = () => {
    abortRef.current = true;
  };

  // Single-post image regeneration
  const handleRegenerateImage = useCallback(
    async (post: BlogPost) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        showToast("You must be logged in to generate images.", "error");
        return;
      }

      setImageGenStatuses((prev) => ({ ...prev, [post.id]: { status: "generating" } }));
      setLastErrorDetail(null);

      try {
        const data = await callGenerateBlogImage(post);

        setImageGenStatuses((prev) => ({
          ...prev,
          [post.id]: { status: "done", url: data.url, model: data.model },
        }));
        showToast(`Image generated for "${post.title.slice(0, 40)}${post.title.length > 40 ? "…" : ""}"`);
        await refetch();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        setLastErrorDetail(msg);
        setImageGenStatuses((prev) => ({ ...prev, [post.id]: { status: "error", error: msg } }));
        showToast("Image generation failed", "error");
      }
    },
    [refetch]
  );

  const handleToggleStatus = async (post: BlogPost) => {
    setTogglingId(post.id);
    const ok = await toggleStatus(post.id, post.status || "published");
    setTogglingId(null);
    if (ok) {
      const newStatus = post.status === "published" ? "draft" : "published";
      showToast(`Post ${newStatus === "published" ? "published" : "moved to drafts"}`);
    } else {
      showToast("Failed to update status", "error");
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    const ok = await toggleFeatured(post.id, post.featured || false);
    if (ok) {
      showToast(post.featured ? "Removed from featured" : "Set as featured post");
    } else {
      showToast("Failed to update featured status", "error");
    }
  };

  const handleToggleApprovedForPublish = async (post: BlogPost) => {
    if (post.status !== "draft") return;
    const wasApproved = post.approved_for_publish === true;
    setApprovingForPublishId(post.id);
    const ok = await toggleApprovedForPublish(post.id, wasApproved);
    setApprovingForPublishId(null);
    if (ok) {
      showToast(
        wasApproved
          ? "Auto-publish disabled for this draft"
          : "Auto-publish enabled for this draft",
      );
    } else {
      showToast("Could not update auto-publish for this draft", "error");
    }
  };

  const handleDelete = async () => {
    if (!deletingPost) return;
    const ok = await deletePost(deletingPost.id);
    setDeletingPost(null);
    if (ok) {
      showToast("Post deleted successfully");
    } else {
      showToast("Failed to delete post", "error");
    }
  };

  const handlePreview = (post: BlogPost) => {
    const url =
      post.status === "draft" ? `/blog/${post.slug}?preview=admin` : `/blog/${post.slug}`;
    window.open(url, "_blank");
  };

  const selectedCount = selectedIds.size;
  const selectedPostsWithoutImages = posts.filter(
    (p) => selectedIds.has(p.id) && !p.image
  ).length;

  return (
    <div className="">
      <Seo title="Blog Posts | Sweet Media Admin" description="Manage blog posts" noindex />

      <AdminPageHeader
        title="Blog Posts"
        subtitle="Manage drafts, scheduling, hero images, and featured posts."
        actions={
          <>
            <Link
              href="/admin/blog-writer"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)]"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-quill-pen-line text-xs" />
              New post
            </Link>
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-600 shadow-[0_1px_12px_rgba(0,0,0,0.04)] transition-colors hover:bg-black/[0.02]"
            >
              <i className="ri-external-link-line text-xs" />
              View blog
            </a>
          </>
        }
      />

      <div className="">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Posts",
              value: stats.total,
              icon: "ri-article-line",
              color: "text-[#3d6f7f]",
              bg: "bg-[#3d6f7f]/8",
            },
            { label: "Published", value: stats.published, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Drafts", value: stats.drafts, icon: "ri-draft-line", color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Featured", value: stats.featured, icon: "ri-star-line", color: "text-orange-500", bg: "bg-orange-50" },
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

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5">
            <i className="ri-search-line text-neutral-400 text-sm flex-shrink-0"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or category..."
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

          <div className="flex items-center gap-1 bg-neutral-100 rounded-xl p-1 flex-shrink-0">
            {(["all", "published", "draft"] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-[11px] tracking-[0.1em] uppercase font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === s
                    ? "bg-white text-neutral-800 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-neutral-200 bg-white text-sm text-neutral-700 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#3d6f7f] transition-all cursor-pointer flex-shrink-0"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Bulk action bar — slides in when posts are selected */}
        {selectedCount > 0 && (
          <div
            className="rounded-2xl px-5 py-3.5 mb-4 flex items-center gap-4 flex-wrap"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[11px] font-bold">{selectedCount}</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {selectedCount} post{selectedCount !== 1 ? "s" : ""} selected
              </span>
              {selectedPostsWithoutImages > 0 && (
                <span className="text-white/50 text-[11px] whitespace-nowrap hidden sm:block">
                  · {selectedPostsWithoutImages} without image
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Generate images action */}
              {bulkGenRunning ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <i className="ri-loader-4-line animate-spin text-white text-sm"></i>
                    <span className="text-white text-[11px] font-semibold whitespace-nowrap">
                      Generating {bulkGenProgress.done}/{bulkGenProgress.total}...
                    </span>
                    {/* Progress bar */}
                    <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${bulkGenProgress.total > 0 ? (bulkGenProgress.done / bulkGenProgress.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAbortGeneration}
                    className="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-stop-line text-xs"></i>
                    Stop
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleBulkGenerateImages}
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-image-ai-line text-xs"></i>
                  Generate Images
                </button>
              )}

              {/* Deselect */}
              <button
                onClick={clearSelection}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-close-line text-xs"></i>
                Deselect
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-semibold text-neutral-800">{filtered.length}</span> of{" "}
            <span className="font-semibold text-neutral-800">{posts.length}</span> posts
          </p>
          {selectedCount === 0 && (
            <p className="text-[11px] text-neutral-400">
              Select posts to use bulk actions
            </p>
          )}
        </div>

        {/* API test result panel */}
        {testResult && (
          <div className="bg-neutral-900 rounded-2xl p-4 mb-4">
            <p className="text-xs text-emerald-400 font-mono break-all whitespace-pre-wrap">{testResult}</p>
          </div>
        )}

        {/* Error detail panel */}
        {lastErrorDetail && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 min-w-0">
                <i className="ri-error-warning-line text-red-500 text-base flex-shrink-0 mt-0.5"></i>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-red-700 mb-1">Image generation error — full details:</p>
                  <p className="text-xs text-red-600 font-mono break-all whitespace-pre-wrap">{lastErrorDetail}</p>
                </div>
              </div>
              <button
                onClick={() => setLastErrorDetail(null)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-500 transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
            <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
            <p className="text-sm text-neutral-400">Loading posts...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <i className="ri-error-warning-line text-2xl text-red-400 mb-2 block"></i>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <AdminBlogTable
            posts={filtered}
            onDelete={setDeletingPost}
            onToggleStatus={handleToggleStatus}
            onToggleApprovedForPublish={handleToggleApprovedForPublish}
            onToggleFeatured={handleToggleFeatured}
            onPreview={handlePreview}
            onRegenerateImage={handleRegenerateImage}
            togglingId={togglingId}
            approvingForPublishId={approvingForPublishId}
            selectedIds={selectedIds}
            onSelectId={handleSelectId}
            onSelectAll={handleSelectAll}
            imageGenStatuses={imageGenStatuses}
          />
        )}
      </div>

      {/* Delete Modal */}
      {deletingPost && (
        <AdminBlogDeleteModal
          post={deletingPost}
          onConfirm={handleDelete}
          onCancel={() => setDeletingPost(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 text-white ${
          toast.type === "success"
            ? ""
            : "bg-red-500"
        }`}
          style={toast.type === "success" ? { backgroundColor: ADMIN_OCEAN } : undefined}
        >
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}