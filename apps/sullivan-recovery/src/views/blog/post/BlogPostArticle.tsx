import type { AutoLinkMapping, BlogPost, BlogSection } from "@sweetmedia/blog-core";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import { slugifyHeading } from "@/lib/slugify";

type BlogPostArticleProps = {
  post: BlogPost;
  allPosts: BlogPost[];
  autoLinkMap: AutoLinkMapping[];
  canonicalUrl: string;
};

function getTocHeadings(content: BlogSection[]): { id: string; text: string }[] {
  return content
    .filter((s: BlogSection) => s.type === "h2" && s.text?.trim())
    .map((s: BlogSection) => {
      const text = s.text!.trim();
      return { id: slugifyHeading(text), text };
    });
}

export default function BlogPostArticle({
  post,
  allPosts,
  autoLinkMap,
  canonicalUrl,
}: BlogPostArticleProps) {
  const usedHrefs = new Set<string>();
  const toc = getTocHeadings(post.content);

  return (
    <div className="bg-[var(--sr-linen)]">
      <div className="sr-container py-10 md:py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <aside className="hidden w-14 shrink-0 lg:block">
            <PostShare title={post.title} canonicalUrl={canonicalUrl} />
          </aside>

          <div className="min-w-0 flex-1 lg:max-w-3xl">
            {post.excerpt ? (
              <p
                className="mb-10 border-l-2 border-[var(--sr-moss)] pl-6 text-lg leading-relaxed text-[var(--sr-ink)]/85 md:text-xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {post.excerpt}
              </p>
            ) : null}

            <PostBody
              sections={post.content}
              autoLinkMap={autoLinkMap}
              currentSlug={post.slug}
              usedHrefs={usedHrefs}
            />

            <PostInlineRelated currentPost={post} allPosts={allPosts} />
            <PostAuthor post={post} />
            <PostBlogMobileShareRow title={post.title} canonicalUrl={canonicalUrl} />
          </div>

          {toc.length > 0 ? (
            <aside className="hidden w-56 shrink-0 xl:block">
              <nav
                className="sticky top-28 rounded-2xl border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-5"
                aria-label="On this page"
              >
                <p
                  className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  On this page
                </p>
                <ol className="space-y-2.5">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-[13px] leading-snug text-[var(--sr-muted)] transition hover:text-[var(--sr-fern)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
