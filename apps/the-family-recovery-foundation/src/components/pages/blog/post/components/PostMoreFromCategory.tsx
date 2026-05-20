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
    <section className="w-full bg-soft-white py-14 md:py-18">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue">
            More from {currentPost.category}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-caption font-body font-semibold uppercase tracking-[0.12em] text-tfrf-blue transition-colors hover:text-deep-navy"
          >
            View All
            <i className="ri-arrow-right-line text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-mist bg-pure-white transition-all duration-300 hover:border-tfrf-blue/30 hover:shadow-md"
            >
              <article>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <span className="mb-1.5 block text-[9px] font-body font-semibold uppercase tracking-[0.18em] text-stone-blue">
                    {post.category}
                  </span>
                  <h4 className="font-display text-sm text-deep-navy leading-snug line-clamp-2 transition-colors group-hover:text-tfrf-blue">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-caption font-body text-stone-blue">{post.readTime}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
