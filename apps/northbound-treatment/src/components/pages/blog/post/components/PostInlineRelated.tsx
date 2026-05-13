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
    <div className="my-10 border border-[#cdd8e8] bg-[#eef2f7] p-6 md:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-[2px] w-6 bg-[#e97a52]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
          Related Reading
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-4 border border-transparent bg-white p-3 transition-all hover:border-[#cdd8e8]"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                sizes="80px"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#e97a52]">
                {post.category}
              </span>
              <h4 className="font-heading line-clamp-2 text-sm font-bold leading-snug text-[#3a6697] transition-colors group-hover:text-[#e97a52]">
                {post.title}
              </h4>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[11px] text-[#94a3b8]">{post.readTime}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#e97a52]">
                  Read
                  <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
