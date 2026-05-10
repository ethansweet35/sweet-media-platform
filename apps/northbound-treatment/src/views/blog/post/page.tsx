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
      <div className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-7xl animate-pulse px-6 pb-20 pt-36">
          <div className="mb-8 h-3 w-1/4 bg-[#eef2f7]" />
          <div className="mb-6 h-10 w-3/4 bg-[#eef2f7]" />
          <div className="mb-10 h-4 w-1/3 bg-[#eef2f7]" />
          <div className="h-[320px] w-full bg-[#eef2f7] md:h-[440px]" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="px-6 pb-20 pt-32 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[#cdd8e8] bg-[#eef2f7]">
            <i className="ri-article-line text-2xl text-[#94a3b8]" />
          </div>
          <h1 className="font-heading mb-3 text-2xl font-bold text-[#1b2a47]">Article Not Found</h1>
          <p className="mb-8 text-sm text-[#64748b]">
            This article doesn&apos;t exist or may have been moved.
          </p>
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="bg-[#1b2a47] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#e97a52] cursor-pointer"
          >
            Back to Journal
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
    <div className="min-h-screen bg-white">

      {showDraftPreviewBanner ? (
        <div className="mx-auto w-full max-w-7xl px-6 pt-6">
          <div
            role="note"
            className="border-l-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            Draft Preview — visible only to admins
          </div>
        </div>
      ) : null}

      <PostHero post={post} />

      <section className="w-full bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-16">
          <div className="flex gap-10 lg:gap-16 items-start">
            <div className="hidden lg:block w-12 flex-shrink-0 pt-2">
              <PostShare title={post.title} canonicalUrl={canonicalUrl} />
            </div>

            <div className="flex-1 min-w-0 max-w-3xl">
              {post.excerpt && (
                <div className="mb-8 border-l-4 border-[#e97a52] py-2 pl-5 pb-8 border-b border-b-[#eef2f7]">
                  <p className="font-heading text-lg font-bold italic leading-relaxed text-[#1b2a47] md:text-xl">
                    {post.excerpt}
                  </p>
                </div>
              )}

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

            <div className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-28 space-y-8">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-[2px] w-6 bg-[#e97a52]" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
                      In This Article
                    </p>
                  </div>
                  <nav className="flex flex-col gap-0.5">
                    {post.content
                      .filter((s) => s.type === "h2")
                      .map((s, i) => (
                        <span
                          key={i}
                          className="cursor-pointer border-l-2 border-transparent py-1.5 pl-3 text-[12px] leading-snug text-[#94a3b8] transition-colors hover:border-[#e97a52] hover:text-[#1b2a47]"
                        >
                          {s.text}
                        </span>
                      ))}
                  </nav>
                </div>

                {post.tags?.length > 0 && (
                  <div className="border-t border-[#eef2f7] pt-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-[2px] w-6 bg-[#e97a52]" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
                        Tags
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#cdd8e8] bg-[#eef2f7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#64748b] whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border border-[#cdd8e8] bg-[#eef2f7] p-5">
                  <p className="font-heading text-sm font-bold text-[#1b2a47]">
                    Ready to start recovery?
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">
                    Confidential, no-obligation call with our team.
                  </p>
                  <a
                    href="tel:8888563990"
                    className="mt-4 flex items-center gap-2 bg-[#e97a52] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#1b2a47]"
                  >
                    <i className="ri-phone-line" />
                    Call Now
                  </a>
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
