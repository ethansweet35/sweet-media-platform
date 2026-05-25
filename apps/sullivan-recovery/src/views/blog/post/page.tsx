"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useBlogPost, useBlogPosts } from "@sweetmedia/blog-core";
import PostHero from "@/components/pages/blog/post/components/PostHero";
import PostRelated from "@/components/pages/blog/post/components/PostRelated";
import PostMoreFromCategory from "@/components/pages/blog/post/components/PostMoreFromCategory";
import PostCta from "@/components/pages/blog/post/components/PostCta";
import BlogPostArticle from "@/views/blog/post/BlogPostArticle";
import { buildManualOnlyLinkMap, fetchManualLinkMappings } from "@sweetmedia/blog-core";
import { useAuth } from "@sweetmedia/admin-core";
import { canonicalBlogPostUrl } from "@/lib/publicSiteUrl";
import Link from "next/link";

/**
 * Admin draft preview (`?preview=admin`). Public published posts render via SSR
 * in `src/views/blog/post/BlogPostViewServer.tsx` from `app/blog/[slug]/page.tsx`.
 */
export default function BlogPostPreviewPage({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const previewAdminRequested = searchParams?.get("preview") === "admin";
  const { isAdmin, isLoading: authLoading } = useAuth();

  const deferAuthForPreview = previewAdminRequested && authLoading;
  const effectiveSlug = deferAuthForPreview ? undefined : slug;
  const allowDraftPreviews = previewAdminRequested && !authLoading && isAdmin;

  const { post, loading, error } = useBlogPost(effectiveSlug, allowDraftPreviews);
  const { posts: allPosts } = useBlogPosts();

  const canonicalUrl = useMemo(() => canonicalBlogPostUrl(slug), [slug]);

  const showDraftPreviewBanner =
    previewAdminRequested && isAdmin && post && post.status !== "published";

  const [manualMappings, setManualMappings] = useState<{ keyword: string; href: string; priority: number }[]>(
    [],
  );

  useEffect(() => {
    fetchManualLinkMappings().then(setManualMappings);
  }, []);

  const autoLinkMap = useMemo(() => buildManualOnlyLinkMap(manualMappings), [manualMappings]);

  if (loading || deferAuthForPreview) {
    return (
      <div className="min-h-screen animate-pulse bg-[var(--sr-linen)]">
        <div className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
          <div className="sr-container py-10">
            <div className="mb-6 h-3 w-24 rounded bg-[var(--sr-sand)]" />
            <div className="mb-4 h-12 max-w-2xl rounded bg-[var(--sr-sand)]" />
          </div>
          <div className="h-[min(40vh,360px)] bg-[var(--sr-sand)]/60" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--sr-linen)] px-6">
        <div className="pt-32 pb-20 text-center">
          <i className="ri-article-line mb-6 block text-5xl text-[var(--sr-sand)]" aria-hidden />
          <h1
            className="mb-3 text-2xl font-light text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Article not found
          </h1>
          <p
            className="mb-8 text-sm text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            This article doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 bg-[var(--sr-moss)] px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--sr-parchment)] transition hover:bg-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Back to insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--sr-linen)]">
      {showDraftPreviewBanner ? (
        <div className="sr-container pt-6">
          <div
            role="note"
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            Draft preview — visible only to admins
          </div>
        </div>
      ) : null}

      <PostHero post={post} />
      <BlogPostArticle
        post={post}
        allPosts={allPosts}
        autoLinkMap={autoLinkMap}
        canonicalUrl={canonicalUrl}
      />
      <PostRelated currentPost={post} allPosts={allPosts} />
      <PostMoreFromCategory currentPost={post} allPosts={allPosts} />
      <PostCta />
    </div>
  );
}
