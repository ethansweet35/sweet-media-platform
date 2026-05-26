"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogPosts } from "@sweetmedia/blog-core";
import {
  BLOG_CONTAINER,
  BLOG_FEATURED_GAP,
  BLOG_FEATURED_OVERLAP,
  BLOG_HEADING,
} from "@/components/pages/blog/blogTokens";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.featured);

  if (loading) {
    return (
      <section className={`relative z-10 px-6 lg:px-10 ${BLOG_FEATURED_OVERLAP} ${BLOG_FEATURED_GAP}`}>
        <div className={BLOG_CONTAINER}>
          <div className="animate-pulse overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ink/10 ring-1 ring-border">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="aspect-[16/10] bg-surface lg:aspect-auto lg:min-h-[420px]" />
              <div className="space-y-4 p-8 lg:p-12">
                <div className="h-4 w-1/3 rounded bg-surface" />
                <div className="h-10 w-4/5 rounded bg-surface" />
                <div className="h-4 w-full rounded bg-surface" />
                <div className="h-4 w-2/3 rounded bg-surface" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className={`relative z-10 px-6 lg:px-10 ${BLOG_FEATURED_OVERLAP} ${BLOG_FEATURED_GAP}`}>
      <div className={BLOG_CONTAINER}>
        <Link
          href={`/blog/${post.slug}`}
          className="group grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ink/10 ring-1 ring-border transition duration-300 hover:-translate-y-0.5 hover:shadow-accent/10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-dark/5" />
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Featured
              </span>
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mb-4 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-body">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{post.readTime}</span>
            </div>

            <h2
              className="text-2xl font-bold leading-snug text-ink transition group-hover:text-accent-dark md:text-3xl lg:text-4xl"
              style={BLOG_HEADING}
            >
              {post.title}
            </h2>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-body md:text-base">{post.excerpt}</p>

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark">
                  <span className="text-xs font-bold text-white">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{post.author}</p>
                  <p className="text-[11px] text-body">{post.authorRole}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark transition group-hover:text-accent">
                Read featured article
                <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
