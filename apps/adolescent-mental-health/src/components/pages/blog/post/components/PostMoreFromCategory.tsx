import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { BLOG_CONTAINER, BLOG_HEADING, BLOG_SECTION } from "@/components/pages/blog/blogTokens";

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
    <section className={`${BLOG_SECTION} bg-surface`}>
      <div className={`${BLOG_CONTAINER} px-6 lg:px-10`}>
        <div className="mb-10 flex items-center justify-between gap-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            More from {currentPost.category}
          </p>
          <Link
            href="/blog"
            className="flex shrink-0 items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-dark transition hover:text-accent"
          >
            View all
            <i className="ri-arrow-right-line text-xs" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-white transition hover:border-accent/30 hover:shadow-md"
            >
              <article>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                    {post.category}
                  </span>
                  <h4
                    className="line-clamp-2 text-sm font-bold leading-snug text-ink transition group-hover:text-accent-dark"
                    style={BLOG_HEADING}
                  >
                    {post.title}
                  </h4>
                  <span className="mt-2 block text-[11px] text-body">{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
