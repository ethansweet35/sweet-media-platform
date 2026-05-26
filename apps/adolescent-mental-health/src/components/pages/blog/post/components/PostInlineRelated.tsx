import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_HEADING } from "@/components/pages/blog/blogTokens";

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
    <div className="my-8 rounded-3xl border border-border bg-surface p-6 md:p-7">
      <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Related reading</p>

      <div className="flex flex-col gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group -mx-3 flex items-start gap-4 rounded-2xl p-3 transition hover:bg-white"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl md:h-20 md:w-20">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                sizes="80px"
                className="object-cover object-top transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                {post.category}
              </span>
              <h4
                className="line-clamp-2 text-sm font-bold leading-snug text-ink transition group-hover:text-accent-dark"
                style={BLOG_HEADING}
              >
                {post.title}
              </h4>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[11px] text-body">{post.readTime}</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-accent-dark transition group-hover:text-accent">
                  Read article
                  <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
