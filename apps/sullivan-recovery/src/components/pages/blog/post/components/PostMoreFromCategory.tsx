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
    .slice(0, 3);

  const others = allPosts
    .filter((p) => p.id !== currentPost.id && p.category !== currentPost.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3 - sameCategory.length);

  const posts = [...sameCategory, ...others];

  if (posts.length === 0) return null;

  const label = currentPost.category
    ? `More in ${currentPost.category}`
    : "More articles";

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-14 md:py-16">
      <div className="sr-container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {label}
          </p>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View all
            <i className="ri-arrow-right-line text-sm" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}/`}
              className="group overflow-hidden border border-[var(--sr-sand)] bg-[var(--sr-parchment)] transition hover:border-[var(--sr-moss)]/30"
            >
              <div className="relative aspect-[16/10] bg-[var(--sr-mist)]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                {post.category ? (
                  <span
                    className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--sr-fern)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {post.category}
                  </span>
                ) : null}
                <h4
                  className="line-clamp-3 text-lg font-light leading-snug text-[var(--sr-ink)] transition group-hover:text-[var(--sr-moss)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {post.title}
                </h4>
                <p
                  className="mt-2 text-[11px] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
