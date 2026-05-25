import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

type PostHeroProps = {
  post: BlogPost;
};

export default function PostHero({ post }: PostHeroProps) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
      <div className="sr-container py-6 md:py-8">
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-[12px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          aria-label="Breadcrumb"
        >
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-[var(--sr-muted)] transition hover:text-[var(--sr-fern)]"
          >
            <i className="ri-arrow-left-line text-sm" aria-hidden />
            Insights
          </Link>
          {post.category ? (
            <>
              <span className="text-[var(--sr-sand)]" aria-hidden>
                /
              </span>
              <span className="font-medium text-[var(--sr-fern)]">{post.category}</span>
            </>
          ) : null}
        </nav>

        <div className="max-w-4xl">
          {post.category ? (
            <p
              className="mb-3 inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {post.category}
            </p>
          ) : null}
          <h1
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {post.title}
          </h1>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--sr-sand)] pt-6 text-[12px] text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--sr-moss)] text-[11px] font-semibold text-[var(--sr-parchment)]">
              {post.authorPhoto ? (
                <Image
                  src={post.authorPhoto}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || "SR"
              )}
            </div>
            <div>
              <p className="font-medium text-[var(--sr-ink)]">{post.author || "Sullivan Recovery"}</p>
              <p className="text-[11px] text-[var(--sr-muted)]">
                {post.authorRole || "Editorial Team"}
              </p>
            </div>
          </div>
          <span className="hidden h-8 w-px bg-[var(--sr-sand)] sm:block" aria-hidden />
          <span className="inline-flex items-center gap-1.5">
            <i className="ri-calendar-line text-[var(--sr-fern)]" aria-hidden />
            <time dateTime={post.publishedAt}>{post.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="ri-time-line text-[var(--sr-fern)]" aria-hidden />
            {post.readTime}
          </span>
        </div>
      </div>

      {post.image ? (
        <div className="relative w-full border-t border-[var(--sr-sand)] bg-[var(--sr-mist)]">
          <div className="relative mx-auto aspect-[21/9] max-h-[min(52vh,480px)] w-full max-w-[1400px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
