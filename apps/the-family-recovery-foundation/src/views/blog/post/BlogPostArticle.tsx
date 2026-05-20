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
  const tocHeadings = contentSections.filter((s) => s.type === "h2" || s.type === "h3");

  const usedHrefs = new Set<string>();

  return (
    <section className="w-full bg-soft-white">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-12 md:py-16">
        <div className="flex items-start gap-8 lg:gap-12">
          <div className="hidden lg:block w-12 shrink-0 pt-2">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          <article className="min-w-0 flex-1 max-w-3xl">
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
          </article>

          <aside className="hidden xl:block w-52 shrink-0">
            <div className="sticky top-28 rounded-2xl border border-mist bg-pure-white p-6 shadow-sm">
              {tocHeadings.length > 0 ? (
                <>
                  <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
                    In This Article
                  </p>
                  <nav className="flex flex-col gap-1">
                    {tocHeadings.map((s, i) => (
                      <span
                        key={`${post.id}-toc-${i}`}
                        className={`border-l-2 py-1.5 pl-3 font-body text-[13px] leading-snug transition-colors ${
                          s.type === "h2"
                            ? "border-tfrf-blue text-deep-navy font-semibold"
                            : "border-mist text-slate hover:border-tfrf-blue/50 hover:text-tfrf-blue"
                        }`}
                      >
                        {s.text}
                      </span>
                    ))}
                  </nav>
                </>
              ) : null}

              {post.tags?.length ? (
                <div className={tocHeadings.length ? "mt-8 border-t border-mist pt-6" : ""}>
                  <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-powder-blue/40 px-2.5 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.1em] text-deep-navy"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
