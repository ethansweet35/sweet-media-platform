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
    <section className="w-full bg-white border-t border-warm py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="w-5 h-[2px] bg-accent shrink-0" />
            <span className="text-[9px] tracking-[0.32em] uppercase text-ink/40 font-semibold">
              More from {currentPost.category ?? "the Blog"}
            </span>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold text-muted hover:text-accent transition-colors whitespace-nowrap"
          >
            View All <i className="ri-arrow-right-line text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group bg-cream-tile border border-warm hover:border-accent/40 transition-colors overflow-hidden block"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden bg-soft">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">
                      <i className="ri-article-line text-3xl" />
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-ink/70 text-white text-[8px] tracking-[0.18em] uppercase font-semibold px-2 py-1">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-warm">
                  <div className="flex items-center gap-2 mb-2 text-[10px] text-muted">
                    <span>{post.date}</span>
                    <span className="w-[3px] h-[3px] rotate-45 bg-warm shrink-0" />
                    <span>{post.readTime}</span>
                  </div>
                  <h4
                    className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug line-clamp-2 group-hover:text-accent transition-colors"
                    style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}
                  >
                    {post.title}
                  </h4>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
