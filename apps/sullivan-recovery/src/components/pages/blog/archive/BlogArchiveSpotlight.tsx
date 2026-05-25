"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

type BlogArchiveSpotlightProps = {
  post: BlogPost | null;
  loading: boolean;
};

export default function BlogArchiveSpotlight({ post, loading }: BlogArchiveSpotlightProps) {
  if (loading) {
    return (
      <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-linen)] py-8 md:py-10">
        <div className="sr-container">
          <div className="grid animate-pulse border border-[var(--sr-sand)] bg-white lg:grid-cols-12">
            <div className="min-h-[280px] bg-[var(--sr-mist)] lg:col-span-7" />
            <div className="space-y-4 p-8 lg:col-span-5">
              <div className="h-3 w-24 bg-[var(--sr-sand)]" />
              <div className="h-10 w-full bg-[var(--sr-sand)]" />
              <div className="h-4 w-full bg-[var(--sr-sand)]" />
              <div className="h-4 w-2/3 bg-[var(--sr-sand)]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-linen)] py-8 md:py-10">
      <div className="sr-container">
        <p
          className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Featured story
        </p>

        <article className="group grid overflow-hidden border border-[var(--sr-sand)] bg-white lg:grid-cols-12">
          <Link
            href={`/blog/${post.slug}/`}
            className="relative block min-h-[260px] overflow-hidden lg:col-span-7 lg:min-h-[380px]"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--sr-charcoal)]/20" />
            <span
              className="absolute left-4 top-4 bg-[var(--sr-moss)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--sr-parchment)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {post.category}
            </span>
          </Link>

          <div className="flex flex-col justify-center border-t border-[var(--sr-sand)] p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-10">
            <div
              className="mb-4 flex flex-wrap items-center gap-3 text-[11px] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <time dateTime={post.publishedAt}>{post.date}</time>
              <span className="h-1 w-1 rounded-full bg-[var(--sr-sand)]" aria-hidden />
              <span>{post.readTime}</span>
            </div>

            <h2
              className="mb-4 text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.1] text-[var(--sr-ink)] transition group-hover:text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
            </h2>

            <p
              className="mb-8 line-clamp-4 text-[15px] leading-[1.8] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between gap-4 border-t border-[var(--sr-sand)] pt-6">
              <div className="min-w-0">
                <p
                  className="text-[13px] font-medium text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.author}
                </p>
                <p className="text-[11px] text-[var(--sr-muted)]">{post.authorRole}</p>
              </div>
              <Link
                href={`/blog/${post.slug}/`}
                className="inline-flex shrink-0 items-center gap-2 bg-[var(--sr-moss)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sr-parchment)] transition hover:bg-[var(--sr-bark)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Read
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
