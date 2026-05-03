import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostMoreFromCategoryProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export default function PostMoreFromCategory({ currentPost, allPosts }: PostMoreFromCategoryProps) {
  const sameCategory = allPosts
    .filter((p) => p.id !== currentPost.id && p.category === currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  const others = allPosts
    .filter((p) => p.id !== currentPost.id && p.category !== currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4 - sameCategory.length);

  const posts = [...sameCategory, ...others];

  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-[#f4f6f9] py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-neutral-300" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
              More from {currentPost.category}
            </span>
          </div>
          <Link
            href="/blog"
            className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#0A1F44] hover:text-[#7B9FD4] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
          >
            View All
            <i className="ri-arrow-right-line text-xs"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-300 block"
            >
              <article>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#0A1F44]/60 mb-1.5 block">
                    {post.category}
                  </span>
                  <h4
                    className="text-sm font-medium text-neutral-800 leading-snug group-hover:text-[#0A1F44] transition-colors line-clamp-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-neutral-400">{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
