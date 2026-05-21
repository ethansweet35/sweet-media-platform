"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogPostBySlug } from "../hooks/useBlogPostBySlug";
import type { BlogSection } from "@sweetmedia/blog-core";
import BlogEditorHeader, { type RewriteStatus } from "../components/pages/admin/blog-edit/components/BlogEditorHeader";
import BlogEditorSidebar from "../components/pages/admin/blog-edit/components/BlogEditorSidebar";
import ContentBlockEditor from "../components/pages/admin/blog-edit/components/ContentBlockEditor";
import AiRewritePanel, { type RewriteResult, type RewriteParams } from "../components/pages/admin/blog-edit/components/AiRewritePanel";
import { supabase } from "../lib/supabase";
import { canonicalBlogPostUrl } from "../lib/publicSiteUrl";

interface EditorForm {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorPhoto: string;
  image: string;
  readTime: string;
  tags: string;
  status: string;
  featured: boolean;
  metaDescription: string;
  focusKeyword: string;
}

export default function BlogEditPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : undefined;
  const router = useRouter();
  const { post, loading, error, savePost } = useBlogPostBySlug(slug);

  const [form, setForm] = useState<EditorForm>({
    title: "",
    excerpt: "",
    slug: "",
    category: "Company News",
    author: "",
    authorRole: "",
    authorBio: "",
    authorPhoto: "",
    image: "",
    readTime: "5 min read",
    tags: "",
    status: "published",
    featured: false,
    metaDescription: "",
    focusKeyword: "",
  });
  const [blocks, setBlocks] = useState<BlogSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  // Rewrite state lives here so it survives the panel closing
  const [rewriteStatus, setRewriteStatus] = useState<RewriteStatus>("idle");
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  const initializedRef = useRef(false);
  const applyBannerRef = useRef<HTMLDivElement>(null);

  // Populate form when post loads
  useEffect(() => {
    if (post && !initializedRef.current) {
      initializedRef.current = true;
      setForm({
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        category: post.category,
        author: post.author,
        authorRole: post.authorRole,
        authorBio: post.authorBio,
        authorPhoto: post.authorPhoto,
        image: post.image,
        readTime: post.readTime,
        tags: post.tags.join(", "),
        status: post.status || "published",
        featured: post.featured || false,
        metaDescription: post.metaDescription || "",
        focusKeyword: post.focus_keyword || "",
      });
      setBlocks(post.content || []);
      validateSlug(post.slug);
    }
  }, [post]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateSlug = (value: string): boolean => {
    if (!value.trim()) { setSlugError("Slug is required"); return false; }
    if (value.includes(" ")) { setSlugError("Slug cannot contain spaces — use hyphens instead"); return false; }
    if (!/^[a-z0-9-]+$/.test(value)) { setSlugError("Only lowercase letters, numbers, and hyphens allowed"); return false; }
    if (value.startsWith("-") || value.endsWith("-")) { setSlugError("Slug cannot start or end with a hyphen"); return false; }
    setSlugError(null);
    return true;
  };

  const handleFormChange = useCallback((field: keyof EditorForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    if (field === "slug") validateSlug(value as string);
  }, []);

  const handleBlocksChange = useCallback((newBlocks: BlogSection[]) => {
    setBlocks(newBlocks);
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleSave = async () => {
    if (!post) return;
    if (!validateSlug(form.slug)) { showToast("Please fix the slug error before saving", "error"); return; }
    setSaving(true);
    const cleanSlug = form.slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const updates = {
      title: form.title, slug: cleanSlug, excerpt: form.excerpt, category: form.category,
      author: form.author, author_title: form.authorRole, author_bio: form.authorBio,
      author_photo: form.authorPhoto, hero_image_url: form.image, read_time: form.readTime,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status: form.status, featured: form.featured, meta_description: form.metaDescription,
      focus_keyword: form.focusKeyword.trim() || null, content: JSON.stringify(blocks),
    };
    const ok = await savePost(post.id, updates);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setHasChanges(false);
      showToast("Post saved successfully");
      if (form.status === "published") {
        const postUrl = canonicalBlogPostUrl(cleanSlug);
        supabase.functions.invoke("ping-google-indexing", { body: { url: postUrl } })
          .then(({ error }) => { if (error) console.warn("[ping-google-indexing] failed:", error); });
      }
      if (cleanSlug !== slug) router.replace(`/admin/blog-edit/${cleanSlug}`);
    } else {
      showToast("Failed to save post", "error");
    }
  };

  const handlePreview = () => window.open(`/blog/${form.slug}`, "_blank");

  // Called when panel submits — runs in the background here
  const handleStartGenerate = useCallback(async (params: RewriteParams) => {
    setRewriteStatus("generating");
    setRewriteResult(null);
    setRewriteError(null);

    try {
      const res = await fetch("/api/admin/rewrite-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: params.topic,
          primaryKeyword: params.primaryKeyword,
          category: params.category || undefined,
          targetWordCount: params.targetWordCount,
          seoGuidelines: params.seoGuidelines || undefined,
          model: params.model,
        }),
      });

      let json: Record<string, unknown>;
      try {
        json = await res.json() as Record<string, unknown>;
      } catch {
        throw new Error(res.status === 504
          ? "Request timed out — try a shorter word count or smaller brief."
          : `Server error (HTTP ${res.status}).`);
      }

      if (!res.ok || !json.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Generation failed.");
      }

      const result: RewriteResult = {
        title: String(json.title ?? ""),
        excerpt: String(json.excerpt ?? ""),
        metaDescription: String(json.metaDescription ?? ""),
        content: (json.content as BlogSection[]) ?? [],
      };
      setRewriteResult(result);
      setRewriteStatus("ready");
      // Scroll the apply banner into view
      setTimeout(() => applyBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error.";
      setRewriteError(msg);
      setRewriteStatus("error");
    }
  }, []);

  const handleApplyRewrite = () => {
    if (!rewriteResult) return;
    setForm((prev) => ({
      ...prev,
      title: rewriteResult.title,
      excerpt: rewriteResult.excerpt,
      metaDescription: rewriteResult.metaDescription,
    }));
    setBlocks(rewriteResult.content as BlogSection[]);
    setHasChanges(true);
    setSaved(false);
    setRewriteStatus("idle");
    setRewriteResult(null);
    showToast("AI rewrite applied — review and save when ready");
  };

  const handleDismissRewrite = () => {
    setRewriteStatus("idle");
    setRewriteResult(null);
    setRewriteError(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FB]">
        <div className="bg-white border-b border-[#E2E8F0] h-14" />
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <div className="flex gap-6 animate-pulse">
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-[#F4F7FB] rounded-2xl" />
              <div className="h-6 bg-[#F4F7FB] rounded-xl w-1/3" />
              <div className="h-40 bg-[#F4F7FB] rounded-2xl" />
            </div>
            <div className="w-72 space-y-4">
              <div className="h-32 bg-[#F4F7FB] rounded-2xl" />
              <div className="h-48 bg-[#F4F7FB] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error / not found
  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-article-line text-5xl text-[#E2E8F0] mb-4 block"></i>
          <h1 className="text-xl font-semibold text-[#0A1F44] mb-2">Post Not Found</h1>
          <p className="text-sm text-[#94A3B8] mb-6">{error || "This post doesn't exist."}</p>
          <button onClick={() => router.push("/admin/blogs")}
            className="bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3 rounded-xl cursor-pointer">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      <BlogEditorHeader
        title={form.title}
        status={form.status}
        saving={saving}
        saved={saved}
        hasChanges={hasChanges}
        rewriteStatus={rewriteStatus}
        rewriteError={rewriteError}
        onBack={() => router.push("/admin/blogs")}
        onSave={handleSave}
        onPreview={handlePreview}
        onAiRewrite={() => setAiPanelOpen(true)}
      />

      {/* AI Rewrite panel (form only — generation runs in page) */}
      {aiPanelOpen && (
        <AiRewritePanel
          initialTopic={form.title}
          initialKeyword={form.focusKeyword}
          initialCategory={form.category}
          onStartGenerate={handleStartGenerate}
          onClose={() => setAiPanelOpen(false)}
        />
      )}

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">
          {/* Main editor */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Apply rewrite banner */}
            {(rewriteStatus === "ready" || rewriteStatus === "error") && (
              <div ref={applyBannerRef} className={`rounded-2xl border p-5 flex items-start gap-4 ${
                rewriteStatus === "ready"
                  ? "bg-violet-50 border-violet-200"
                  : "bg-red-50 border-red-200"
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  rewriteStatus === "ready" ? "bg-violet-100" : "bg-red-100"
                }`}>
                  <i className={`text-base ${rewriteStatus === "ready" ? "ri-sparkling-2-line text-violet-600" : "ri-error-warning-line text-red-500"}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  {rewriteStatus === "ready" && rewriteResult ? (
                    <>
                      <p className="text-sm font-semibold text-violet-900 mb-1">AI rewrite is ready</p>
                      <p className="text-[12px] text-violet-700 leading-relaxed mb-3">
                        <span className="font-medium">New title:</span> {rewriteResult.title}
                        <span className="mx-2 text-violet-300">·</span>
                        {rewriteResult.content.length} content blocks
                        <span className="mx-2 text-violet-300">·</span>
                        {rewriteResult.metaDescription.length} char meta
                      </p>
                      <p className="text-[11px] text-violet-500 mb-3">
                        Applying will replace your current title, excerpt, meta description, and all content blocks. The post won't be saved automatically.
                      </p>
                      <div className="flex items-center gap-2">
                        <button onClick={handleApplyRewrite}
                          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[11px] tracking-[0.1em] uppercase font-bold px-5 py-2 rounded-xl transition-colors cursor-pointer">
                          <i className="ri-check-line text-xs"></i>Apply Rewrite
                        </button>
                        <button onClick={handleDismissRewrite}
                          className="text-[11px] text-violet-400 hover:text-violet-600 cursor-pointer transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-red-700 mb-1">Rewrite failed</p>
                      <p className="text-[12px] text-red-600">{rewriteError}</p>
                      <button onClick={handleDismissRewrite}
                        className="mt-2 text-[11px] text-red-400 hover:text-red-600 cursor-pointer transition-colors">
                        Dismiss
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Title */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8] mb-2">Post Title</label>
              <input type="text" value={form.title} onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder="Enter your post title..."
                className="w-full text-2xl font-semibold text-[#0A1F44] placeholder:text-[#CBD5E1] focus:outline-none bg-transparent leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }} />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8] mb-2">
                Excerpt <span className="normal-case font-normal text-[#94A3B8]">— shown on blog listing cards</span>
              </label>
              <textarea value={form.excerpt} onChange={(e) => handleFormChange("excerpt", e.target.value)}
                rows={3} maxLength={500} placeholder="A short, compelling summary of this post..."
                className="w-full text-base text-[#64748B] placeholder:text-[#CBD5E1] focus:outline-none bg-transparent resize-none leading-relaxed" />
              <div className="flex justify-end mt-2 pt-2 border-t border-[#F4F7FB]">
                <span className={`text-[10px] font-medium ${form.excerpt.length > 450 ? "text-amber-500" : "text-[#CBD5E1]"}`}>
                  {form.excerpt.length}/500
                </span>
              </div>
            </div>

            {/* Content blocks */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#CBD5E1]" />
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#94A3B8]">Article Content</span>
                <div className="flex-1 h-px bg-[#F4F7FB]" />
                <span className="text-[10px] text-[#94A3B8]">{blocks.length} block{blocks.length !== 1 ? "s" : ""}</span>
              </div>
              <ContentBlockEditor blocks={blocks} onChange={handleBlocksChange} />
            </div>
          </div>

          {/* Sidebar */}
          <BlogEditorSidebar form={form} onChange={handleFormChange} postDate={post.date} slugError={slugError} />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300 ${
          toast.type === "success" ? "bg-[#0A1F44] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
