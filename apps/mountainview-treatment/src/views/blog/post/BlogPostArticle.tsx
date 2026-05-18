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
    <section className="w-full bg-[var(--mvt-cream)] py-10 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex items-start gap-6 xl:gap-8">

          {/* ── Left: TOC panel ── */}
          {h2Sections.length > 0 && (
            <aside className="hidden w-[220px] flex-shrink-0 xl:block">
              <div className="sticky top-24 overflow-hidden rounded-2xl shadow-sm">
                {/* Panel header */}
                <div className="bg-[var(--mvt-forest)] px-5 py-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-teal-light)]">
                    In This Article
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-white/70">
                    {post.title}
                  </p>
                </div>

                {/* Section list */}
                <nav className="bg-white px-4 py-4">
                  <ol className="flex flex-col gap-0.5">
                    {h2Sections.map((s, i) => (
                      <li key={`${post.id}-toc-${i}`}>
                        <span className="group flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 transition hover:bg-[var(--mvt-cream)]">
                          <span className="mt-px flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[8px] font-bold text-[var(--mvt-teal)] transition group-hover:bg-[var(--mvt-teal)] group-hover:text-white">
                            {i + 1}
                          </span>
                          <span className="text-[11px] leading-snug text-[var(--mvt-muted)] transition group-hover:text-[var(--mvt-ink)]">
                            {s.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </nav>

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="border-t border-[var(--mvt-cream-2)] bg-white px-5 pb-5 pt-4">
                    <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-stone)]">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--mvt-cream)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[var(--mvt-forest)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* ── Center: article reading card ── */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {/* Teal accent bar */}
              <div className="h-[3px] bg-[var(--mvt-teal)]" />

              <div className="px-7 py-10 md:px-10 lg:px-12 lg:py-12">
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
            </div>
          </div>

          {/* ── Right: share column ── */}
          <div className="hidden w-10 flex-shrink-0 pt-3 lg:block">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

        </div>
      </div>
    </section>
  );
}
