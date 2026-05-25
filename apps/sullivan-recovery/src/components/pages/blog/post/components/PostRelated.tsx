import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostRelatedProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const otherPosts = allPosts.filter((p) => p.id !== currentPost.id);

  const scored = otherPosts.map((post) => {
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()));
    const postTags = post.tags.map((t) => t.toLowerCase());
    const tagOverlap = postTags.filter((t) => currentTags.has(t)).length;
    const sameCategory = post.category === currentPost.category ? 2 : 0;
    const score = tagOverlap * 3 + sameCategory;
    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
  });

  return scored.slice(0, 4).map((s) => s.post);
}

export default function PostRelated({ currentPost, allPosts }: PostRelatedProps) {
  const related = getRelatedPosts(currentPost, allPosts);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-16 md:py-20">
      <div className="sr-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Continue reading
            </p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-light text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              More from the journal
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-fern)] transition hover:text-[var(--sr-moss)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            All insights
            <i className="ri-arrow-right-line text-sm" aria-hidden />
          </Link>
        </div>

        <div className="divide-y divide-[var(--sr-sand)] border-t border-[var(--sr-sand)]">
          {related.map((post, index) => (
            <article
              key={post.id}
              className="group grid grid-cols-1 gap-4 py-8 transition hover:bg-[var(--sr-linen)]/60 md:grid-cols-12 md:items-start md:gap-8"
            >
              <div
                className="font-light tabular-nums text-2xl text-[var(--sr-sand)] transition group-hover:text-[var(--sr-fern)] md:col-span-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <Link
                href={`/blog/${post.slug}/`}
                className="relative aspect-[16/10] overflow-hidden bg-[var(--sr-mist)] md:col-span-3"
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </Link>
              <div className="md:col-span-8">
                <div
                  className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.category ? <span>{post.category}</span> : null}
                  <span className="text-[var(--sr-sand)]" aria-hidden>
                    ·
                  </span>
                  <span className="text-[var(--sr-muted)]">{post.date}</span>
                  <span className="text-[var(--sr-muted)]">{post.readTime}</span>
                </div>
                <h3
                  className="text-xl font-light leading-[1.12] text-[var(--sr-ink)] transition group-hover:text-[var(--sr-moss)] md:text-2xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h3>
                {post.excerpt ? (
                  <p
                    className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--sr-muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
