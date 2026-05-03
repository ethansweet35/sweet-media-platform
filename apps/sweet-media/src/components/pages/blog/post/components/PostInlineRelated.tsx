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
    <div className="my-10 bg-[#f4f6f9] rounded-2xl p-6 md:p-8 border border-black/5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-6 h-px bg-neutral-300" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
          Related Reading
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-white transition-all duration-200"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                sizes="80px"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#0A1F44]/60 mb-1 block">
                {post.category}
              </span>
              <h4 className="text-sm font-medium text-neutral-800 leading-snug group-hover:text-[#0A1F44] transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] text-neutral-400">{post.readTime}</span>
                <span className="flex items-center gap-1 text-[11px] text-[#0A1F44] group-hover:text-[#7B9FD4] transition-colors">
                  Read article
                  <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform"></i>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
