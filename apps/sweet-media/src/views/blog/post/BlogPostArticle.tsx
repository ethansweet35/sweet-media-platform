import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import type { BlogPost } from "@/types/blog";
import type { AutoLinkMapping } from "@/lib/autoInternalLinks";

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
                      key={`${post.id}-h2-${i}`}
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
  );
}
