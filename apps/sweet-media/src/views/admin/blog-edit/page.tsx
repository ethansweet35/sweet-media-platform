"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogPostBySlug } from "@/hooks/useBlogPostBySlug";
import type { BlogSection } from "@sweetmedia/blog-core";
import BlogEditorHeader from "@/components/pages/admin/blog-edit/components/BlogEditorHeader";
import BlogEditorSidebar from "@/components/pages/admin/blog-edit/components/BlogEditorSidebar";
import ContentBlockEditor from "@/components/pages/admin/blog-edit/components/ContentBlockEditor";
import Seo from "@/components/feature/Seo";

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
    category: "SEO",
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
  });
  const [blocks, setBlocks] = useState<BlogSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const initializedRef = useRef(false);

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
      });
      setBlocks(post.content || []);
      validateSlug(post.slug);
    }
  }, [post]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateSlug = (value: string): boolean => {
    if (!value.trim()) {
      setSlugError("Slug is required");
      return false;
    }
    if (value.includes(" ")) {
      setSlugError("Slug cannot contain spaces — use hyphens instead");
      return false;
    }
    if (!/^[a-z0-9-]+$/.test(value)) {
      setSlugError("Only lowercase letters, numbers, and hyphens allowed");
      return false;
    }
    if (value.startsWith("-") || value.endsWith("-")) {
      setSlugError("Slug cannot start or end with a hyphen");
      return false;
    }
    setSlugError(null);
    return true;
  };

  const handleFormChange = useCallback((field: keyof EditorForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaved(false);
    if (field === "slug") {
      validateSlug(value as string);
    }
  }, []);

  const handleBlocksChange = useCallback((newBlocks: BlogSection[]) => {
    setBlocks(newBlocks);
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleSave = async () => {
    if (!post) return;

    // Validate slug before saving
    if (!validateSlug(form.slug)) {
      showToast("Please fix the slug error before saving", "error");
      return;
    }

    setSaving(true);

    // Sanitize slug — no spaces, lowercase, hyphens only
    const cleanSlug = form.slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const updates = {
      title: form.title,
      slug: cleanSlug,
      excerpt: form.excerpt,
      category: form.category,
      author: form.author,
      author_title: form.authorRole,
      author_bio: form.authorBio,
      author_photo: form.authorPhoto,
      hero_image_url: form.image,
      read_time: form.readTime,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status: form.status,
      featured: form.featured,
      meta_description: form.metaDescription,
      content: JSON.stringify(blocks),
    };
    const ok = await savePost(post.id, updates);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setHasChanges(false);
      showToast("Post saved successfully");
      // If slug changed, navigate to new slug
      if (cleanSlug !== slug) {
        router.replace(`/admin/blog-edit/${cleanSlug}`);
      }
    } else {
      showToast("Failed to save post", "error");
    }
  };

  const handlePreview = () => {
    window.open(`/blog/${form.slug}`, "_blank");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white border-b border-neutral-100 h-14" />
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <div className="flex gap-6 animate-pulse">
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-neutral-100 rounded-2xl" />
              <div className="h-6 bg-neutral-100 rounded-xl w-1/3" />
              <div className="h-40 bg-neutral-100 rounded-2xl" />
              <div className="h-40 bg-neutral-100 rounded-2xl" />
            </div>
            <div className="w-72 space-y-4">
              <div className="h-32 bg-neutral-100 rounded-2xl" />
              <div className="h-48 bg-neutral-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error / not found
  if (error || !post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-article-line text-5xl text-neutral-200 mb-4 block"></i>
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">Post Not Found</h1>
          <p className="text-sm text-neutral-400 mb-6">{error || "This post doesn't exist."}</p>
          <button
            onClick={() => router.push("/admin/blogs")}
            className="bg-[#3d6f7f] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3 rounded-xl cursor-pointer whitespace-nowrap"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Seo title="Edit Post | Admin" description="Admin blog post editor" noindex />
      <BlogEditorHeader
        title={form.title}
        status={form.status}
        saving={saving}
        saved={saved}
        hasChanges={hasChanges}
        onBack={() => router.push("/admin/blogs")}
        onSave={handleSave}
        onPreview={handlePreview}
      />

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex gap-6 items-start">
          {/* Main editor area */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-2">Post Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder="Enter your post title..."
                className="w-full text-2xl font-semibold text-neutral-900 placeholder:text-neutral-300 focus:outline-none bg-transparent leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-6">
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-2">
                Excerpt <span className="normal-case font-normal text-neutral-400">— shown on blog listing cards</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => handleFormChange("excerpt", e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="A short, compelling summary of this post..."
                className="w-full text-base text-neutral-600 placeholder:text-neutral-300 focus:outline-none bg-transparent resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-2 pt-2 border-t border-neutral-50">
                <span className={`text-[10px] font-medium ${form.excerpt.length > 450 ? "text-amber-500" : "text-neutral-300"}`}>
                  {form.excerpt.length}/500
                </span>
              </div>
            </div>

            {/* Content blocks */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-neutral-300" />
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-neutral-400">Article Content</span>
                <div className="flex-1 h-px bg-neutral-100" />
                <span className="text-[10px] text-neutral-400">{blocks.length} block{blocks.length !== 1 ? "s" : ""}</span>
              </div>
              <ContentBlockEditor blocks={blocks} onChange={handleBlocksChange} />
            </div>
          </div>

          {/* Sidebar */}
          <BlogEditorSidebar
            form={form}
            onChange={handleFormChange}
            postDate={post.date}
            slugError={slugError}
          />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300 ${
          toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}