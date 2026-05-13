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
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[72px]">
        <div className="flex gap-10 lg:gap-16 items-start">

          {/* Share sidebar */}
          <div className="hidden lg:block w-12 shrink-0 pt-2">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {/* Article body */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Lead excerpt */}
            <div className="mb-8 pb-8 border-b border-[#EBEBEB]">
              <p
                className="font-[family-name:var(--font-display)] font-normal text-ink/65 leading-relaxed italic"
                style={{ fontSize: "clamp(19px, 1.8vw, 24px)" }}
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

          {/* TOC + floating CTA sidebar */}
          <div className="hidden xl:block w-52 shrink-0">
            <div className="sticky top-28 flex flex-col gap-8">

              {/* Table of contents */}
              {post.content.filter((s) => s.type === "h2").length > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.32em] uppercase text-ink/35 font-semibold mb-5">
                    In This Article
                  </p>
                  <nav className="flex flex-col gap-1">
                    {post.content
                      .filter((s) => s.type === "h2")
                      .map((s, i) => (
                        <span
                          key={`${post.id}-h2-${i}`}
                          className="text-[12px] font-light text-ink/45 hover:text-ink leading-snug cursor-pointer transition-colors py-1.5 border-l-2 border-transparent hover:border-accent pl-3"
                        >
                          {s.text}
                        </span>
                      ))}
                  </nav>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="pt-6 border-t border-[#EBEBEB]">
                  <p className="text-[9px] tracking-[0.32em] uppercase text-ink/35 font-semibold mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-ink/60 bg-cream border border-[#E0E0E0] px-2 py-1 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Floating CTA card */}
              <div className="bg-ink p-5 flex flex-col gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent mb-2">
                    Get Help Today
                  </p>
                  <p className="font-[family-name:var(--font-display)] font-normal text-white leading-snug" style={{ fontSize: "17px" }}>
                    Speak with our team — free &amp; confidential.
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {["Same-day admissions", "Most PPO plans accepted", "Available 24/7"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[11px] font-light text-white/65">
                      <i className="ri-check-line text-accent text-xs shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:9494612620"
                  className="flex items-center justify-center gap-2 bg-accent text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-4 py-3 hover:bg-accent/90 transition-colors"
                >
                  <i className="ri-phone-line text-xs" /> (949) 461-2620
                </a>
                <a
                  href="/admissions"
                  className="flex items-center justify-center gap-2 border border-white/20 text-white/65 text-[10px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 hover:border-white/40 hover:text-white transition-colors"
                >
                  Verify Insurance
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
