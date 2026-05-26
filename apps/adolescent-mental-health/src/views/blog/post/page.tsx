"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useBlogPost, useBlogPosts } from "@sweetmedia/blog-core";
import PostHero from "@/components/pages/blog/post/components/PostHero";
import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostRelated from "@/components/pages/blog/post/components/PostRelated";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostMoreFromCategory from "@/components/pages/blog/post/components/PostMoreFromCategory";
import PostCta from "@/components/pages/blog/post/components/PostCta";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import { BLOG_CONTAINER, BLOG_HEADING, BLOG_SHELL } from "@/components/pages/blog/blogTokens";
import { buildManualOnlyLinkMap, fetchManualLinkMappings } from "@sweetmedia/blog-core";
import { useAuth } from "@sweetmedia/admin-core";
import { canonicalBlogPostUrl } from "@/lib/publicSiteUrl";

/**
 * Admin draft preview (`?preview=admin`). Public published posts render via SSR
 * in `src/views/blog/post/BlogPostViewServer.tsx` from `app/blog/[slug]/page.tsx`.
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
      <div className={BLOG_SHELL}>
        <div className={`${BLOG_CONTAINER} animate-pulse px-6 pt-36 pb-20 lg:px-10`}>
          <div className="mb-8 h-4 w-1/4 rounded bg-surface" />
          <div className="mb-6 h-12 w-3/4 rounded bg-surface" />
          <div className="mb-10 h-4 w-1/3 rounded bg-surface" />
          <div className="h-[320px] w-full rounded-3xl bg-surface md:h-[460px]" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`${BLOG_SHELL} flex min-h-screen flex-col items-center justify-center`}>
        <div className="px-6 pt-32 pb-20 text-center">
          <i className="ri-article-line mb-6 block text-5xl text-border" aria-hidden />
          <h1 className="mb-3 text-2xl font-bold text-ink" style={BLOG_HEADING}>
            Article not found
          </h1>
          <p className="mb-8 text-sm text-body">This article doesn&apos;t exist or may have been moved.</p>
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="cursor-pointer rounded-2xl bg-cta px-6 py-3 text-sm font-bold text-white transition hover:bg-cta-hover"
          >
            Back to blog
          </button>
        </div>
      </div>
    );
  }

  const contentSections = post.content;
  const midPoint = Math.ceil(contentSections.length / 2);
  const firstHalf = contentSections.slice(0, midPoint);
  const secondHalf = contentSections.slice(midPoint);

  const usedHrefs = new Set<string>();

  return (
    <div className={BLOG_SHELL}>
      {showDraftPreviewBanner ? (
        <div className={`${BLOG_CONTAINER} px-6 pt-6 lg:px-10`}>
          <div
            role="note"
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            Draft Preview — visible only to admins
          </div>
        </div>
      ) : null}

      <PostHero post={post} />

      <section className="w-full bg-white">
        <div className={`${BLOG_CONTAINER} px-6 py-12 md:py-16 lg:px-10`}>
          <div className="flex items-start gap-10 lg:gap-16">
            <div className="hidden w-12 shrink-0 pt-2 lg:block">
              <PostShare title={post.title} canonicalUrl={canonicalUrl} />
            </div>

            <div className="min-w-0 max-w-3xl flex-1">
              <div className="mb-8 border-b border-border pb-8">
                <p className="text-lg italic leading-relaxed text-body md:text-xl" style={BLOG_HEADING}>
                  {post.excerpt}
                </p>
              </div>

              <PostBody
                sections={firstHalf}
                autoLinkMap={autoLinkMap}
                currentSlug={post.slug}
                usedHrefs={usedHrefs}
              />

              <PostInlineRelated currentPost={post} allPosts={allPosts} />

              <PostBody
                sections={secondHalf}
                autoLinkMap={autoLinkMap}
                currentSlug={post.slug}
                usedHrefs={usedHrefs}
              />

              <PostAuthor post={post} />

              <PostBlogMobileShareRow title={post.title} canonicalUrl={canonicalUrl} />
            </div>

            <div className="hidden w-56 shrink-0 xl:block">
              <div className="sticky top-28">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                  In this article
                </p>
                <nav className="flex flex-col gap-2">
                  {post.content
                    .filter((s) => s.type === "h2")
                    .map((s, i) => (
                      <span
                        key={i}
                        className="cursor-pointer border-l-2 border-transparent py-1 pl-3 text-[12px] leading-snug text-body transition hover:border-accent hover:text-ink"
                      >
                        {s.text}
                      </span>
                    ))}
                </nav>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="whitespace-nowrap rounded-full bg-accent/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-accent-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PostRelated currentPost={post} allPosts={allPosts} />
      <PostMoreFromCategory currentPost={post} allPosts={allPosts} />
      <PostCta />
    </div>
  );
}
