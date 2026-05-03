"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useBlogPost, useBlogPosts } from "@sweetmedia/blog-core";
import SiteHeader from "@/components/feature/SiteHeader";
import PostHero from "@/components/pages/blog/post/components/PostHero";
import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostRelated from "@/components/pages/blog/post/components/PostRelated";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostMoreFromCategory from "@/components/pages/blog/post/components/PostMoreFromCategory";
import PostCta from "@/components/pages/blog/post/components/PostCta";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import Footer from "@/components/pages/home/components/Footer";
import { buildManualOnlyLinkMap, fetchManualLinkMappings } from "@/lib/autoInternalLinks";
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
        <SiteHeader heroTheme="dark" />
        <div className="max-w-screen-xl mx-auto px-6 pt-36 pb-20 animate-pulse">
          <div className="h-4 bg-neutral-100 rounded w-1/4 mb-8" />
          <div className="h-12 bg-neutral-100 rounded w-3/4 mb-6" />
          <div className="h-4 bg-neutral-100 rounded w-1/3 mb-10" />
          <div className="w-full h-[320px] md:h-[460px] bg-neutral-100 rounded-t-2xl" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <SiteHeader heroTheme="light" />
        <div className="text-center pt-32 pb-20 px-6">
          <i className="ri-article-line text-5xl text-neutral-200 mb-6 block"></i>
          <h1
            className="text-2xl font-light text-neutral-800 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Article Not Found
          </h1>
          <p className="text-sm text-neutral-400 mb-8">This article doesn&apos;t exist or may have been moved.</p>
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3 rounded-full cursor-pointer whitespace-nowrap"
          >
            Back to Blog
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
      <SiteHeader heroTheme="dark" />

      {showDraftPreviewBanner ? (
        <div className="max-w-screen-xl mx-auto px-6 pt-6">
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
        <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-16">
          <div className="flex gap-10 lg:gap-16 items-start">
            <div className="hidden lg:block w-12 flex-shrink-0 pt-2">
              <PostShare title={post.title} canonicalUrl={canonicalUrl} />
            </div>

            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="mb-8 pb-8 border-b border-neutral-100">
                <p
                  className="text-lg md:text-xl text-neutral-700 leading-relaxed font-light italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
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

            <div className="hidden xl:block w-56 flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-4">
                  In This Article
                </p>
                <nav className="flex flex-col gap-2">
                  {post.content
                    .filter((s) => s.type === "h2")
                    .map((s, i) => (
                      <span
                        key={i}
                        className="text-[12px] text-neutral-400 hover:text-[#0A1F44] leading-snug cursor-pointer transition-colors py-1 border-l-2 border-transparent hover:border-[#0A1F44] pl-3"
                      >
                        {s.text}
                      </span>
                    ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-[#0A1F44] bg-[#0A1F44]/6 px-2 py-1 rounded-full whitespace-nowrap"
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
      <Footer />
    </div>
  );
}
