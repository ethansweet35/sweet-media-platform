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
    const score = tagOverlap * 2 + sameCategory;
    return { post, score };
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
    <div className="my-12 bg-cream border border-warm px-6 py-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-5 h-[2px] bg-accent shrink-0" />
        <span className="text-[9px] tracking-[0.32em] uppercase text-ink/40 font-semibold">
          Related Reading
        </span>
      </div>

      <div className="flex flex-col divide-y divide-soft">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-5 py-4 first:pt-0 last:pb-0 hover:bg-cream-alt transition-colors -mx-6 px-6"
          >
            <div className="relative w-16 h-16 overflow-hidden flex-shrink-0 bg-soft">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  loading="lazy"
                  sizes="64px"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <i className="ri-article-line text-lg" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {post.category && (
                <span className="text-[8.5px] tracking-[0.2em] uppercase font-semibold text-accent mb-1 block">
                  {post.category}
                </span>
              )}
              <h4
                className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug line-clamp-2 group-hover:text-accent transition-colors"
                style={{ fontSize: "15px" }}
              >
                {post.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-1.5 text-muted text-[10.5px]">
                <span>{post.readTime}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5 font-medium group-hover:text-accent transition-colors">
                  Read <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
