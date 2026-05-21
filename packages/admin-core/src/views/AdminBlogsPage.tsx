"use client";

import Link from "next/link";
import { useState, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminContentBulkBar from "../components/content-list/AdminContentBulkBar";
import AdminContentFilterPills from "../components/content-list/AdminContentFilterPills";
import AdminContentListMeta from "../components/content-list/AdminContentListMeta";
import AdminContentPagination from "../components/content-list/AdminContentPagination";
import {
  AdminContentErrorState,
  AdminContentLoadingState,
} from "../components/content-list/AdminContentListStates";
import AdminContentSearchBar from "../components/content-list/AdminContentSearchBar";
import AdminContentStatsGrid from "../components/content-list/AdminContentStatsGrid";
import AdminGscConnectBanner from "../components/content-list/AdminGscConnectBanner";
import ContentPipelineKanban from "../components/ContentPipelineKanban";
import { useAdminBlogPosts } from "../hooks/useAdminBlogPosts";
import { useContentPipeline } from "../hooks/useContentPipeline";
import { useSearchConsoleData } from "../hooks/useSearchConsoleData";
import { supabase } from "../lib/supabase";
import type { BlogPost } from "@sweetmedia/blog-core";
import AdminBlogTable from "../components/pages/admin/blogs/components/AdminBlogTable";
import AdminBlogDeleteModal from "../components/pages/admin/blogs/components/AdminBlogDeleteModal";
import BulkRewriteModal from "../components/pages/admin/blogs/components/BulkRewriteModal";
import BulkPickKeywordModal from "../components/BulkPickKeywordModal";
import { ADMIN_OCEAN, adminInputCls, adminPrimaryActionCls, adminSecondaryBtnCls, adminToastErrorCls, adminToastSuccessCls } from "../lib/adminTheme";
import { callGenerateSeoMetadata, type SeoGenResult } from "../lib/generateSeoMetadata";
import { getPublicSiteOrigin } from "../lib/publicSiteUrl";
import type { BlogSection } from "@sweetmedia/blog-core";

/**
 * Flatten a BlogSection[] into readable plain text, capped at ~800 chars.
 * Used to give the SEO generator body context when the title/excerpt are bland.
 */
function extractContentSnippet(sections: BlogSection[]): string {
  const parts: string[] = [];
  for (const s of sections) {
    if (s.type === "paragraph" || s.type === "h2" || s.type === "h3" || s.type === "pullquote" || s.type === "callout") {
      if (s.text?.trim()) parts.push(s.text.trim());
    } else if ((s.type === "list" || s.type === "numbered") && s.items?.length) {
      parts.push(s.items.join("; "));
    }
    if (parts.join(" ").length >= 800) break;
  }
  return parts.join(" ").slice(0, 800);
}

type FilterStatus = "all" | "published" | "draft";
type BlogsViewMode = "table" | "pipeline";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewMode: BlogsViewMode =
    searchParams?.get("view") === "pipeline" ? "pipeline" : "table";

  const setViewMode = useCallback(
    (mode: BlogsViewMode) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      if (mode === "pipeline") params.set("view", "pipeline");
      else params.delete("view");
      const qs = params.toString();
      router.replace(qs ? `/admin/blogs?${qs}` : "/admin/blogs", { scroll: false });
    },
    [router, searchParams],
  );

  const {
    posts,
    loading,
    error,
    deletePost,
    toggleStatus,
    toggleApprovedForPublish,
    toggleFeatured,
    updatePost,
    refetch,
  } = useAdminBlogPosts();
  const pipeline = useContentPipeline();
  const { data: gscData, loading: gscLoading, needsOAuth: gscNeedsOAuth } = useSearchConsoleData();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState("All");
  const [pageSize, setPageSize] = useState<10 | 20 | 50>(10);
  const [currentPage, setCurrentPage] = useState(1);
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

  // SEO generation state
  type SeoStatus = { status: "generating" | "done" | "error"; result?: SeoGenResult; error?: string };
  const [seoStatuses, setSeoStatuses] = useState<Record<string, SeoStatus>>({});
  const [bulkSeoRunning, setBulkSeoRunning] = useState(false);
  const [bulkRewriteOpen, setBulkRewriteOpen] = useState(false);
  const [bulkPickKeywordOpen, setBulkPickKeywordOpen] = useState(false);
  const [bulkSeoProgress, setBulkSeoProgress] = useState({ done: 0, total: 0 });
  const seoAbortRef = useRef(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...cats];
  }, [posts]);

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "published").length;
    const drafts = posts.filter((p) => p.status === "draft").length;
    const featured = posts.filter((p) => p.featured).length;
    return { total, published, drafts, featured };
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.author ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category ?? "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || p.status === filterStatus;
      const matchesCategory = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, searchQuery, filterStatus, filterCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize],
  );

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
      setSelectedIds(new Set(paginated.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  }, [paginated]);

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

  // ── AI Generate Meta Data handlers ──────────────────────────────────────────

  const handleRunSeo = useCallback(async (post: BlogPost) => {
    setSeoStatuses((prev) => ({ ...prev, [post.id]: { status: "generating" } }));
    try {
      const result = await callGenerateSeoMetadata({
        type: "post",
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        keyword: post.focus_keyword ?? undefined,
        content_snippet: post.content?.length ? extractContentSnippet(post.content) : undefined,
      });
      setSeoStatuses((prev) => ({ ...prev, [post.id]: { status: "done", result } }));
    } catch (err) {
      setSeoStatuses((prev) => ({
        ...prev,
        [post.id]: { status: "error", error: err instanceof Error ? err.message : "Failed" },
      }));
    }
  }, []);

  const revalidateBlogPost = useCallback(async (slug: string) => {
    try {
      const origin = getPublicSiteOrigin();
      await fetch(`${origin}/api/admin/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: `/blog/${slug}` }),
      });
    } catch {
      // non-critical
    }
  }, []);

  const handleApplySeo = useCallback(async (post: BlogPost, result: SeoGenResult) => {
    // Write all 3 fields when present:
    //   page_title  → blog_posts.title (the human-facing article title)
    //   seo_title   → blog_posts.meta_title (the <title> tag)
    //   meta_desc   → blog_posts.meta_description
    const updates: Record<string, string> = {
      meta_description: result.meta_description,
    };
    if (result.page_title?.trim()) updates.title = result.page_title.trim();
    if (result.seo_title?.trim()) updates.meta_title = result.seo_title.trim();

    const { error: updErr } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", post.id);
    if (!updErr) {
      const displayTitle = (updates.title ?? post.title).slice(0, 40);
      showToast(`Meta data saved for "${displayTitle}${displayTitle.length === 40 ? "…" : ""}"`);
      setSeoStatuses((prev) => { const n = { ...prev }; delete n[post.id]; return n; });
      void revalidateBlogPost(post.slug);
      await refetch();
    } else {
      showToast("Failed to save meta data", "error");
    }
  }, [refetch, revalidateBlogPost]);

  const handleDismissSeo = useCallback((postId: string) => {
    setSeoStatuses((prev) => { const n = { ...prev }; delete n[postId]; return n; });
  }, []);

  const handleBulkSeo = useCallback(async () => {
    const targets = posts.filter((p) => selectedIds.has(p.id));
    if (targets.length === 0) return;
    seoAbortRef.current = false;
    setBulkSeoRunning(true);
    setBulkSeoProgress({ done: 0, total: targets.length });
    setSeoStatuses((prev) => {
      const next = { ...prev };
      targets.forEach((p) => { next[p.id] = { status: "generating" }; });
      return next;
    });
    let done = 0;
    for (const p of targets) {
      if (seoAbortRef.current) break;
      try {
        const result = await callGenerateSeoMetadata({ type: "post", title: p.title, excerpt: p.excerpt, category: p.category, keyword: p.focus_keyword ?? undefined, content_snippet: p.content?.length ? extractContentSnippet(p.content) : undefined });
        setSeoStatuses((prev) => ({ ...prev, [p.id]: { status: "done", result } }));
      } catch (err) {
        setSeoStatuses((prev) => ({ ...prev, [p.id]: { status: "error", error: err instanceof Error ? err.message : "Failed" } }));
      }
      done++;
      setBulkSeoProgress({ done, total: targets.length });
    }
    setBulkSeoRunning(false);
    showToast(`Meta data generated for ${done} post${done !== 1 ? "s" : ""}. Review and apply below.`);
  }, [posts, selectedIds]);

  const pendingSeoReviewCount = Object.values(seoStatuses).filter((s) => s.status === "done").length;

  const handleApplyAllSeo = useCallback(async () => {
    const toApply = posts.filter((p) => seoStatuses[p.id]?.status === "done" && seoStatuses[p.id]?.result);
    let saved = 0;
    for (const p of toApply) {
      const result = seoStatuses[p.id]?.result!;
      const updates: Record<string, string> = { meta_description: result.meta_description };
      if (result.page_title?.trim()) updates.title = result.page_title.trim();
      if (result.seo_title?.trim()) updates.meta_title = result.seo_title.trim();
      const { error: updErr } = await supabase.from("blog_posts").update(updates).eq("id", p.id);
      if (!updErr) {
        saved++;
        void revalidateBlogPost(p.slug);
      }
    }
    setSeoStatuses({});
    clearSelection();
    await refetch();
    showToast(`Applied meta data to ${saved} post${saved !== 1 ? "s" : ""}`);
  }, [posts, seoStatuses, refetch, revalidateBlogPost]);

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

      <AdminPageHeader
        title="Blog Posts"
        subtitle="Manage drafts, scheduling, hero images, and featured posts."
        actions={
          <>
            <div className="flex items-center rounded-xl border border-black/[0.08] bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                  viewMode === "table" ? "bg-[#0A1F44] text-white" : "text-[#64748B] hover:text-[#0A1F44]"
                }`}
              >
                <i className="ri-table-line text-sm" />
                Table
              </button>
              <button
                type="button"
                onClick={() => setViewMode("pipeline")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                  viewMode === "pipeline" ? "bg-[#0A1F44] text-white" : "text-[#64748B] hover:text-[#0A1F44]"
                }`}
              >
                <i className="ri-kanban-view text-sm" />
                Pipeline
              </button>
            </div>
            <Link
              href="/admin/blog-writer"
              className={adminPrimaryActionCls}
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              <i className="ri-quill-pen-line text-xs" />
              New post
            </Link>
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer"
              className={adminSecondaryBtnCls}
            >
              <i className="ri-external-link-line text-xs" />
              View blog
            </a>
          </>
        }
      />

      <div className="">
        {/* Pipeline view */}
        {viewMode === "pipeline" && !pipeline.loading && !pipeline.error && (
          <div className="mb-8">
            <ContentPipelineKanban cardsByStage={pipeline.cardsByStage} maxCardsPerColumn={20} />
          </div>
        )}

        {viewMode === "pipeline" && pipeline.loading && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center mb-8">
            <i className="ri-loader-4-line animate-spin text-3xl text-[#CBD5E1] mb-3 block" />
            <p className="text-sm text-[#94A3B8]">Loading pipeline…</p>
          </div>
        )}

        {viewMode === "pipeline" && pipeline.error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8">
            <p className="text-sm text-red-600">{pipeline.error}</p>
          </div>
        )}

        {viewMode === "table" && (
        <>
        <AdminContentStatsGrid
          stats={[
            { label: "Total Posts", value: stats.total, icon: "ri-article-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/8" },
            { label: "Published", value: stats.published, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Drafts", value: stats.drafts, icon: "ri-draft-line", color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Featured", value: stats.featured, icon: "ri-star-line", color: "text-orange-500", bg: "bg-orange-50" },
          ]}
        />

        <AdminContentSearchBar
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          placeholder="Search by title, author, or category..."
        >
          <AdminContentFilterPills
            value={filterStatus}
            options={["all", "published", "draft"] as const}
            onChange={(value) => {
              setFilterStatus(value);
              setCurrentPage(1);
            }}
          />
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
            className={`${adminInputCls} w-auto shrink-0 cursor-pointer py-2`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </AdminContentSearchBar>

        {gscNeedsOAuth && !gscLoading ? <AdminGscConnectBanner entityLabel="post" /> : null}

        <AdminContentBulkBar
          count={selectedCount}
          noun="post"
          detail={
            selectedPostsWithoutImages > 0
              ? `${selectedPostsWithoutImages} without image`
              : undefined
          }
        >
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

              {/* AI Generate Meta Data */}
              {bulkSeoRunning ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                    <i className="ri-loader-4-line animate-spin text-white text-sm"></i>
                    <span className="text-white text-[11px] font-semibold whitespace-nowrap">
                      Meta {bulkSeoProgress.done}/{bulkSeoProgress.total}…
                    </span>
                    <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-400 rounded-full transition-all duration-500"
                        style={{ width: `${bulkSeoProgress.total > 0 ? (bulkSeoProgress.done / bulkSeoProgress.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                  <button onClick={() => { seoAbortRef.current = true; }}
                    className="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-stop-line text-xs"></i>Stop
                  </button>
                </div>
              ) : (
                <button onClick={() => void handleBulkSeo()}
                  className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-sparkling-2-line text-xs"></i>
                  AI Generate Meta Data
                </button>
              )}

              {pendingSeoReviewCount > 0 && !bulkSeoRunning && (
                <button onClick={() => void handleApplyAllSeo()}
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-check-double-line text-xs"></i>Apply All ({pendingSeoReviewCount})
                </button>
              )}

              {/* Bulk Auto-Optimize (Content Editor brief + sync) */}
              <button
                onClick={() => setBulkRewriteOpen(true)}
                className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                title="Create/reuse Content Editor briefs, Auto-Optimize, sync to posts, set to draft"
              >
                <i className="ri-magic-line text-xs"></i>
                Auto-Optimize
              </button>

              {/* Auto-pick Primary Keywords */}
              <button
                onClick={() => setBulkPickKeywordOpen(true)}
                className="flex items-center gap-1.5 bg-white text-[#0A1F44] hover:bg-white/90 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-search-eye-line text-xs"></i>
                Auto-pick Keywords
              </button>

              <button
                onClick={clearSelection}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-close-line text-xs"></i>
                Deselect
              </button>
        </AdminContentBulkBar>

        <AdminContentListMeta
          rangeStart={filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
          rangeEnd={Math.min(safePage * pageSize, filtered.length)}
          total={filtered.length}
          noun="posts"
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          hint={selectedCount === 0 ? "Select posts to use bulk actions" : undefined}
        />

        {testResult && (
          <div className="bg-[#0A1F44] rounded-2xl p-4 mb-4">
            <p className="text-xs text-emerald-400 font-mono break-all whitespace-pre-wrap">{testResult}</p>
          </div>
        )}

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

        {loading ? <AdminContentLoadingState label="Loading posts…" /> : null}

        {error && !loading ? <AdminContentErrorState message={error} /> : null}

        {!loading && !error && (
          <>
          <AdminBlogTable
            posts={paginated}
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
            seoStatuses={seoStatuses}
            onRunSeo={handleRunSeo}
            onApplySeo={handleApplySeo}
            onDismissSeo={handleDismissSeo}
            onSeoChange={refetch}
            onUpdateFocusKeyword={async (post, keyword) =>
              updatePost(post.id, { focus_keyword: keyword })
            }
            gscData={gscData}
            gscLoading={gscLoading}
          />
          <AdminContentPagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          </>
        )}
        </>
        )}
      </div>

      {/* Bulk Rewrite Modal */}
      {bulkRewriteOpen && (
        <BulkRewriteModal
          posts={posts.filter((p) => selectedIds.has(p.id))}
          onClose={() => setBulkRewriteOpen(false)}
          onComplete={() => { setBulkRewriteOpen(false); void refetch(); }}
        />
      )}

      {/* Bulk Auto-pick Primary Keyword Modal */}
      {bulkPickKeywordOpen && (
        <BulkPickKeywordModal
          mode="blog"
          rows={posts
            .filter((p) => selectedIds.has(p.id))
            .map((p) => ({
              id: p.id,
              title: p.title,
              seed: p.title,
              currentKeyword: p.focus_keyword ?? null,
            }))}
          onApplyRow={async (row, keyword) =>
            updatePost(row.id, { focus_keyword: keyword })
          }
          onClose={() => setBulkPickKeywordOpen(false)}
          onComplete={() => { setBulkPickKeywordOpen(false); void refetch(); }}
        />
      )}

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
        <div className={toast.type === "success" ? adminToastSuccessCls : adminToastErrorCls}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}