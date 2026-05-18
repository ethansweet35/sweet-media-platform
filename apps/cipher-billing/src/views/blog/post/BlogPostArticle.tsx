import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { AutoLinkMapping } from "@sweetmedia/blog-core";
import { decodeEntities } from "@/lib/decodeEntities";

interface BlogPostArticleProps {
  post: BlogPost;
  allPosts: BlogPost[];
  autoLinkMap: AutoLinkMapping[];
  canonicalUrl: string;
}

/** Server component: renders full article layout for Cipher Billing — clinical publication style */
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
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="flex gap-12 xl:gap-16 items-start">

          {/* Left: share column */}
          <div className="hidden lg:block w-10 flex-shrink-0 pt-2">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {/* Center: article body */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Excerpt lede */}
            {post.excerpt && (
              <div className="mb-8 pb-8 border-b border-[#101E3F]/10">
                <p
                  className="text-[#101E3F]/65 text-base md:text-lg leading-[1.9] font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {decodeEntities(post.excerpt)}
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

          {/* Right: navy TOC + tags sidebar */}
          <div className="hidden xl:block w-60 flex-shrink-0">
            <div className="sticky top-28">

              {/* TOC panel */}
              {h2Sections.length > 0 && (
                <div className="bg-[#101E3F] mb-5">
                  <div className="px-5 py-4 border-b border-white/10">
                    <p
                      className="text-[9px] tracking-[0.35em] uppercase text-[#166C96] font-semibold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      In This Article
                    </p>
                  </div>
                  <nav className="px-5 py-4 flex flex-col gap-0">
                    {h2Sections.map((s, i) => (
                      <span
                        key={`${post.id}-h2-${i}`}
                        className="text-[12px] text-white/45 hover:text-white leading-snug cursor-pointer transition-colors py-2 border-b border-white/8 last:border-b-0 hover:pl-1 transition-all duration-150"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {s.text}
                      </span>
                    ))}
                  </nav>
                </div>
              )}

              {/* Tags panel */}
              {post.tags?.length > 0 && (
                <div className="border border-[#101E3F]/10">
                  <div className="px-4 py-3 bg-[#F5F7FA] border-b border-[#101E3F]/10">
                    <p
                      className="text-[9px] tracking-[0.35em] uppercase text-[#101E3F]/40 font-semibold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Topics
                    </p>
                  </div>
                  <div className="px-4 py-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-[#166C96] border border-[#166C96]/30 px-2.5 py-1 whitespace-nowrap"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA mini */}
              <div className="mt-5 bg-[#166C96] p-5">
                <p
                  className="text-white font-semibold text-sm leading-snug mb-3"
                  style={{ fontFamily: "'Marcellus', serif" }}
                >
                  Need billing support?
                </p>
                <p
                  className="text-white/70 text-[12px] leading-relaxed mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Our team specializes in behavioral health RCM.
                </p>
                <a
                  href="/contact-us"
                  className="block text-center bg-white text-[#166C96] text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2.5 hover:bg-[#F5F7FA] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Free Consultation
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
