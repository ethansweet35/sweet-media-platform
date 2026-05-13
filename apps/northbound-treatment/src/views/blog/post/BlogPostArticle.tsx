import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { AutoLinkMapping } from "@sweetmedia/blog-core";

interface BlogPostArticleProps {
  post: BlogPost;
  allPosts: BlogPost[];
  autoLinkMap: AutoLinkMapping[];
  canonicalUrl: string;
}

const h2Headings = (post: BlogPost) =>
  post.content.filter((s) => s.type === "h2").map((s) => s.text ?? "");

/** Server component: renders the full article body with sidebar TOC. */
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
  const headings = h2Headings(post);

  const usedHrefs = new Set<string>();

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex gap-10 lg:gap-14 xl:gap-16">

          {/* ── Left: Share icons ── */}
          <div className="hidden w-10 shrink-0 lg:block">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {/* ── Center: Article body ── */}
          <div className="min-w-0 flex-1">
            {/* Excerpt lede */}
            {post.excerpt && (
              <div className="mb-8 border-l-4 border-[#e97a52] py-2 pl-5 pb-8 border-b border-b-[#eef2f7]">
                <p className="font-heading text-lg font-bold italic leading-relaxed text-[#3a6697] md:text-xl">
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

          {/* ── Right: Sticky TOC + Tags ── */}
          {headings.length > 0 && (
            <div className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-28 space-y-8">
                {/* TOC */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-[2px] w-6 bg-[#e97a52]" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
                      In This Article
                    </p>
                  </div>
                  <nav className="flex flex-col gap-0.5">
                    {headings.map((heading, i) => (
                      <span
                        key={i}
                        className="cursor-pointer border-l-2 border-transparent py-1.5 pl-3 text-[12px] leading-snug text-[#94a3b8] transition-colors hover:border-[#e97a52] hover:text-[#3a6697]"
                      >
                        {heading}
                      </span>
                    ))}
                  </nav>
                </div>

                {/* Tags */}
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

                {/* CTA card */}
                <div className="border border-[#cdd8e8] bg-[#eef2f7] p-5">
                  <p className="font-heading text-sm font-bold text-[#3a6697]">
                    Ready to start recovery?
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#64748b]">
                    Confidential, no-obligation call with our team.
                  </p>
                  <a
                    href="tel:8888563990"
                    className="mt-4 flex items-center gap-2 bg-[#e97a52] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#3a6697]"
                  >
                    <i className="ri-phone-line" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
