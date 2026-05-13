"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-[90px] md:py-[110px]">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

      <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors"
          >
            <i className="ri-arrow-left-line text-xs" />
            Blog
          </Link>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
            {post.category ?? "Article"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] gap-12 lg:gap-16 items-end">
          {/* Left: text */}
          <div>
            {post.category && (
              <span className="inline-block border border-accent/30 bg-accent/10 px-4 py-1.5 text-[9px] uppercase tracking-[0.28em] text-accent mb-7">
                {post.category}
              </span>
            )}

            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white leading-[0.95]"
              style={{ fontSize: "clamp(38px, 5vw, 72px)" }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/65 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="mt-9 flex flex-wrap items-center gap-4 md:gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-accent text-xs font-bold">
                    {(post.author ?? "R").split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-white leading-tight">
                    {post.author || "Rize OC"}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {post.authorRole || "Clinical Editorial Team"}
                  </p>
                </div>
              </div>

              <span className="hidden md:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-calendar-line text-xs" />
                <span className="text-[11px]">{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-time-line text-xs" />
                <span className="text-[11px]">{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-widest uppercase text-white/35 bg-white/5 border border-white/10 px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: hero image */}
          {post.image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 shadow-2xl shadow-black/30">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
