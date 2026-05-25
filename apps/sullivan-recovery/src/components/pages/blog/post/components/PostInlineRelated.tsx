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
    <aside className="my-12 rounded-2xl border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-6 md:p-8">
      <p
        className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Related reading
      </p>

      <ul className="flex flex-col divide-y divide-[var(--sr-sand)]">
        {related.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}/`}
              className="group -mx-2 flex items-start gap-4 rounded-xl px-2 py-4 transition hover:bg-[var(--sr-linen)]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[var(--sr-mist)] md:h-20 md:w-20">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="80px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="min-w-0 flex-1">
                {post.category ? (
                  <span
                    className="mb-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--sr-fern)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {post.category}
                  </span>
                ) : null}
                <h4
                  className="line-clamp-2 text-base font-light leading-snug text-[var(--sr-ink)] transition group-hover:text-[var(--sr-moss)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {post.title}
                </h4>
                <span
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.readTime}
                  <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
