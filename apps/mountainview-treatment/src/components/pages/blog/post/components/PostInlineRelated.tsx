import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostInlineRelatedProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

function getInlineRelated(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const otherPosts = allPosts.filter((p) => p.id !== currentPost.id);
  const scored = otherPosts.map((post) => {
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));
    const postTags = post.tags.map((t) => t.toLowerCase());
    const tagOverlap = postTags.filter((t) => currentTags.has(t)).length;
    const sameCategory = post.category === currentPost.category ? 1 : 0;
    return { post, score: tagOverlap * 2 + sameCategory };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });
  return scored.slice(0, 3).map((s) => s.post);
}

export default function PostInlineRelated({ currentPost, allPosts }: PostInlineRelatedProps) {
  const related = getInlineRelated(currentPost, allPosts);
  if (related.length === 0) return null;

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-[var(--mvt-cream-2)] bg-[var(--mvt-cream)]">
      {/* Header */}
      <div className="border-b border-[var(--mvt-cream-2)] px-7 py-5">
        <p className="mvt-eyebrow text-[10px] tracking-[0.25em]">CONTINUE READING</p>
      </div>

      {/* Cards */}
      <div className="divide-y divide-[var(--mvt-cream-2)]">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}/`}
            className="group flex items-center gap-5 px-7 py-5 transition hover:bg-white"
          >
            {/* Thumbnail */}
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                sizes="112px"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)]">
                {post.category}
              </span>
              <h4 className="font-heading line-clamp-2 text-lg font-bold leading-snug text-[var(--mvt-ink)] transition group-hover:text-[var(--mvt-forest)]">
                {post.title}
              </h4>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs text-[var(--mvt-muted)]">{post.readTime}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[var(--mvt-teal)] transition group-hover:gap-1.5">
                  Read article
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>

            {/* Arrow indicator */}
            <i className="ri-arrow-right-s-line flex-shrink-0 text-xl text-[var(--mvt-cream-2)] transition group-hover:text-[var(--mvt-teal)]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
