"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useBlogPost, useBlogPosts } from "@sweetmedia/blog-core";
import BlogPostViewServer from "@/views/blog/post/BlogPostViewServer";
import { buildManualOnlyLinkMap, fetchManualLinkMappings } from "@sweetmedia/blog-core";
import { useAuth } from "@sweetmedia/admin-core";
import { CONTAINER } from "@/data/site";

/**
 * Admin draft preview (`?preview=admin`). Public published posts render via SSR
 * in `BlogPostViewServer` from `app/blog/[slug]/page.tsx` and root `[slug]`.
 */
export default function BlogPostPreviewPage({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewAdminRequested = searchParams?.get("preview") === "admin";
  const { isAdmin, isLoading: authLoading } = useAuth();

  const deferAuthForPreview = previewAdminRequested && authLoading;
  const effectiveSlug = deferAuthForPreview ? undefined : slug;
  const allowDraftPreviews = previewAdminRequested && !authLoading && isAdmin;

  const { post, loading, error } = useBlogPost(effectiveSlug, allowDraftPreviews);
  const { posts: allPosts } = useBlogPosts();

  const showDraftPreviewBanner =
    previewAdminRequested && isAdmin && post && post.status !== "published";

  const [manualMappings, setManualMappings] = useState<
    { keyword: string; href: string; priority: number }[]
  >([]);

  useEffect(() => {
    fetchManualLinkMappings().then(setManualMappings);
  }, []);

  const autoLinkMap = useMemo(() => buildManualOnlyLinkMap(manualMappings), [manualMappings]);

  if (loading || deferAuthForPreview) {
    return (
      <div className="min-h-screen bg-cream">
        <div className={`${CONTAINER} animate-pulse pb-20 pt-36`}>
          <div className="mb-8 h-4 w-1/4 rounded bg-mbh-forest/8" />
          <div className="mb-6 h-12 w-3/4 rounded bg-mbh-forest/8" />
          <div className="mb-10 h-4 w-1/3 rounded bg-mbh-forest/8" />
          <div className="h-[min(52vh,28rem)] w-full rounded-2xl bg-mbh-forest/8" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pb-20 pt-32 text-center">
        <i className="ri-article-line mb-6 block text-5xl text-mbh-green/30" aria-hidden />
        <h1 className="font-display text-2xl font-semibold text-mbh-forest">Article not found</h1>
        <p className="mt-3 font-body text-sm text-mbh-body">
          This article doesn&apos;t exist or may have been moved.
        </p>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-mbh-green px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
        >
          Back to insights
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {showDraftPreviewBanner ? (
        <div className={`${CONTAINER} pt-6`}>
          <div
            role="note"
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-body text-sm text-amber-900"
          >
            Draft preview — visible only to admins.{" "}
            <Link href="/admin/blogs" className="font-semibold underline">
              Back to blogs
            </Link>
          </div>
        </div>
      ) : null}

      <BlogPostViewServer post={post} allPosts={allPosts} autoLinkMap={autoLinkMap} />
    </div>
  );
}
