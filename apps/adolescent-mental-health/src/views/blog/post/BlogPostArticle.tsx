import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import { BLOG_CONTAINER, BLOG_HEADING } from "@/components/pages/blog/blogTokens";
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
                      key={`${post.id}-h2-${i}`}
                      className="cursor-pointer border-l-2 border-transparent py-1 pl-3 text-[12px] leading-snug text-body transition hover:border-accent hover:text-ink"
                    >
                      {s.text}
                    </span>
                  ))}
              </nav>

              {post.tags.length > 0 ? (
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
