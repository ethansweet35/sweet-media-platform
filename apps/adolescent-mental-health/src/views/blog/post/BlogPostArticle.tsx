import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostSidebarCta from "@/components/pages/blog/post/components/PostSidebarCta";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import { BLOG_CONTAINER, BLOG_HEADING, BLOG_ARTICLE_CARD, BLOG_LEAD, BLOG_SIDEBAR_PANEL } from "@/components/pages/blog/blogTokens";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { AutoLinkMapping } from "@sweetmedia/blog-core";

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

  const usedHrefs = new Set<string>();

  return (
    <section className="relative w-full overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" aria-hidden />
      <div className={`${BLOG_CONTAINER} relative px-6 py-10 md:py-12 lg:px-10`}>
        <div className="mx-auto grid w-full max-w-[880px] grid-cols-1 items-start gap-x-5 lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-x-6 xl:max-w-[1180px] xl:grid-cols-[56px_minmax(0,780px)_220px] xl:gap-x-8">
          <div className="hidden lg:flex lg:justify-center">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          <div className={`min-w-0 ${BLOG_ARTICLE_CARD}`}>
            <div className={`mb-6 ${BLOG_LEAD}`}>
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-accent" aria-hidden />
              <p className="pl-4 text-lg italic leading-relaxed text-ink/80 md:pl-5 md:text-xl" style={BLOG_HEADING}>
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

          <div className="hidden xl:block">
            <div className="sticky top-28 flex flex-col gap-5">
              {post.content.some((s) => s.type === "h2") ? (
                <div className={BLOG_SIDEBAR_PANEL}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-4 w-1 rounded-full bg-accent" aria-hidden />
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                      In this article
                    </p>
                  </div>
                  <nav className="flex flex-col">
                    {post.content
                      .filter((s) => s.type === "h2")
                      .map((s, i) => (
                        <div
                          key={`${post.id}-h2-${i}`}
                          className="group flex items-start gap-3 border-b border-border/70 py-2.5 last:border-b-0"
                        >
                          <span className="mt-0.5 shrink-0 text-[10px] font-bold tabular-nums text-accent/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="cursor-pointer text-[12px] leading-snug text-body transition group-hover:text-ink">
                            {s.text}
                          </span>
                        </div>
                      ))}
                  </nav>
                </div>
              ) : null}

              {post.tags.length > 0 ? (
                <div className={BLOG_SIDEBAR_PANEL}>
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Topics</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="whitespace-nowrap rounded-full border border-accent/15 bg-accent/[0.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-accent-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <PostSidebarCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
