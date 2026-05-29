import PostBody from "@/components/pages/blog/post/components/PostBody";
import PostAuthor from "@/components/pages/blog/post/components/PostAuthor";
import PostInlineRelated from "@/components/pages/blog/post/components/PostInlineRelated";
import PostShare from "@/components/pages/blog/post/components/PostShare";
import PostBlogMobileShareRow from "@/components/pages/blog/post/components/PostBlogMobileShareRow";
import PostTableOfContents from "@/components/pages/blog/post/components/PostTableOfContents";
import PostMobileChapters from "@/components/pages/blog/post/components/PostMobileChapters";
import { CONTAINER } from "@/data/site";
import { blogHeadingId } from "@/lib/blogHeadingId";
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

  const headings = contentSections
    .map((s, i) =>
      s.type === "h2" && s.text ? { text: s.text, id: blogHeadingId(s.text, i) } : null,
    )
    .filter((h): h is { text: string; id: string } => h !== null);

  const usedHrefs = new Set<string>();

  return (
    <section className="bg-cream py-10 lg:py-14">
      <div className={CONTAINER}>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:gap-14">
          <article className="min-w-0 flex-1 lg:max-w-[42rem]">
            <PostMobileChapters headings={headings} />

            {post.excerpt ? (
              <p className="mb-8 font-body text-lg leading-relaxed text-mbh-body md:text-xl">
                {post.excerpt}
              </p>
            ) : null}

            <div className="prose-mbh">
              <PostBody
                sections={firstHalf}
                autoLinkMap={autoLinkMap}
                currentSlug={post.slug}
                usedHrefs={usedHrefs}
              />
            </div>

            <PostInlineRelated currentPost={post} allPosts={allPosts} />

            <div className="prose-mbh">
              <PostBody
                sections={secondHalf}
                autoLinkMap={autoLinkMap}
                currentSlug={post.slug}
                usedHrefs={usedHrefs}
              />
            </div>

            <div className="mt-10 hidden items-center justify-between border-t border-mbh-forest/10 pt-8 lg:flex">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-mbh-body/50">
                Share this article
              </p>
              <PostShare title={post.title} canonicalUrl={canonicalUrl} />
            </div>

            <PostAuthor post={post} />
            <PostBlogMobileShareRow title={post.title} canonicalUrl={canonicalUrl} />
          </article>

          <PostTableOfContents headings={headings} tags={post.tags} />
        </div>
      </div>
    </section>
  );
}
