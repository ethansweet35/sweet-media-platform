import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { AutoLinkMapping } from "@sweetmedia/blog-core";
import Link from "next/link";

interface BlogPostArticleProps {
  post: BlogPost;
  allPosts: BlogPost[];
  autoLinkMap: AutoLinkMapping[];
  canonicalUrl: string;
}

/** Server component: renders full article markup (body + TOC) for SSR. */
export default function BlogPostArticle({
  post,
  allPosts,
  autoLinkMap,
  canonicalUrl,
}: BlogPostArticleProps) {
  const contentSections = post.content;
  const midPoint = Math.ceil(contentSections.length / 2);
  const firstHalf = contentSections.slice(0, midPoint);
  const secondHalf = contentSections.slice(midPoint);

  const h2Sections = post.content.filter((s) => s.type === "h2");
  const usedHrefs = new Set<string>();

  return (
    <section className="w-full bg-white border-t border-[#EFEFEF]">
      <div className="max-w-screen-xl mx-auto px-6 py-12 md:py-16">
        <div className="flex gap-10 lg:gap-16 items-start">

          {/* ── Left: share column ─────────────────────────────────────────── */}
          <div className="hidden lg:block w-12 flex-shrink-0 pt-2">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {/* ── Center: article body ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Lead paragraph — displayed only if body doesn't start with it */}
            {post.excerpt ? (
              <div className="mb-8 pb-8 border-b border-[#EFEFEF]">
                <p className="font-heading text-lg md:text-xl font-bold italic text-[#507969] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            ) : null}

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

          {/* ── Right: sticky sidebar ─────────────────────────────────────── */}
          <div className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-8">

              {/* Table of contents */}
              {h2Sections.length > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#8FAC87] font-bold mb-4">
                    In This Article
                  </p>
                  <nav className="flex flex-col gap-1">
                    {h2Sections.map((s, i) => (
                      <span
                        key={`${post.id}-h2-${i}`}
                        className="text-[12px] text-[#4B4B4B]/60 hover:text-[#507969] leading-snug cursor-pointer transition-colors py-1.5 border-l-2 border-[#EFEFEF] hover:border-[#8FAC87] pl-3"
                      >
                        {s.text}
                      </span>
                    ))}
                  </nav>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="pt-6 border-t border-[#EFEFEF]">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#8FAC87] font-bold mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-[#507969] bg-[#8FAC87]/12 border border-[#8FAC87]/20 px-2 py-1 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div className="pt-6 border-t border-[#EFEFEF]">
                <div className="rounded-2xl bg-[#3E5B50] p-5 text-center">
                  <i className="ri-phone-fill text-xl text-[#8FAC87] mb-3 block" />
                  <p className="text-white text-xs font-semibold leading-snug mb-3">
                    Ready to help your loved one?
                  </p>
                  <Link
                    href="tel:9497767093"
                    className="inline-block w-full text-center text-xs font-bold text-[#3E5B50] bg-[#8FAC87] hover:bg-white rounded-full py-2 transition-colors"
                  >
                    Call Now
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
