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
  const h2Sections = post.content.filter((s) => s.type === "h2");

  const usedHrefs = new Set<string>();

  return (
    <section className="w-full bg-cream">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex gap-8 lg:gap-12">

          {/* Share sidebar */}
          <div className="hidden lg:block w-10 shrink-0 pt-1 self-start sticky top-28">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {/* Article body — white paper card */}
          <div className="flex-1 min-w-0 max-w-[740px] self-start bg-white border border-warm px-8 py-10 md:px-12 md:py-12">
            {/* Lead excerpt */}
            <div className="mb-10 pb-8 border-b border-soft">
              <p
                className="font-[family-name:var(--font-display)] font-normal text-ink/60 leading-relaxed italic"
                style={{ fontSize: "clamp(19px, 1.8vw, 25px)" }}
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

          {/* Right sidebar — TOC + CTA */}
          <div className="hidden xl:block w-[220px] shrink-0 self-start sticky top-28">
            <div className="flex flex-col gap-6">

              {/* Table of contents */}
              {h2Sections.length > 0 && (
                <div className="bg-white border border-warm px-5 py-6">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-5 h-[2px] bg-accent shrink-0" />
                    <p className="text-[9px] tracking-[0.3em] uppercase text-ink/40 font-semibold">
                      In This Article
                    </p>
                  </div>
                  <nav className="flex flex-col">
                    {h2Sections.map((s, i) => (
                      <div
                        key={`${post.id}-h2-${i}`}
                        className="group flex items-start gap-3 py-2.5 border-b border-soft last:border-b-0"
                      >
                        <span className="text-[9px] font-semibold text-accent/70 mt-0.5 shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11.5px] font-light text-ink/55 leading-snug group-hover:text-ink transition-colors cursor-default">
                          {s.text}
                        </span>
                      </div>
                    ))}
                  </nav>
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="bg-white border border-warm px-5 py-5">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-ink/40 font-semibold mb-3">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8.5px] tracking-widest uppercase text-muted bg-cream border border-soft px-2 py-1 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div className="bg-ink border-l-[3px] border-accent px-5 py-6 flex flex-col gap-4">
                <div>
                  <p className="text-[8.5px] font-semibold uppercase tracking-[0.3em] text-accent mb-2.5">
                    Ready for Help?
                  </p>
                  <p
                    className="font-[family-name:var(--font-display)] font-normal text-white leading-snug"
                    style={{ fontSize: "17px" }}
                  >
                    Confidential support, same day.
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {["Same-day admissions", "Most PPO plans accepted", "Available 24/7"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[10.5px] font-light text-white/60">
                      <span className="w-[5px] h-[5px] rotate-45 bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:9494612620"
                  className="flex items-center justify-center gap-2 bg-accent text-white text-[9.5px] font-semibold uppercase tracking-[0.18em] px-4 py-3 hover:bg-accent/90 transition-colors"
                >
                  <i className="ri-phone-line text-xs" /> (949) 461-2620
                </a>
                <a
                  href="/admissions"
                  className="flex items-center justify-center gap-2 border border-white/15 text-white/50 text-[9.5px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 hover:border-white/35 hover:text-white/80 transition-colors"
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
