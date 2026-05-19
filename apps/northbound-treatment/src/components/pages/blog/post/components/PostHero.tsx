"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#3a6697] pb-0 pt-6 lg:pt-8">
      {/* Corner accents */}
      <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-white/10" />
      <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-white/10" />
      {/* Terracotta glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e97a52]/8 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/70"
          >
            <i className="ri-arrow-left-line text-xs" />
            Journal
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#e97a52]">
            {post.category}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left — text */}
          <div className="pb-12 lg:pb-16">
            {/* Category pill */}
            <div className="mb-6 inline-flex items-center border border-[#e97a52]/30 bg-[#e97a52]/10 px-4 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e97a52]">
                {post.category}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
                {post.excerpt}
              </p>
            )}

            {/* Meta strip */}
            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-white/10">
                  {post.authorPhoto ? (
                    <Image
                      src={post.authorPhoto}
                      alt={post.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[#e97a52]">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight text-white">
                    {post.author || "Northbound Treatment"}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {post.authorRole || "Clinical Editorial Team"}
                  </p>
                </div>
              </div>

              <div className="hidden h-8 w-px bg-white/10 md:block" />

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-calendar-line text-xs" />
                <span className="text-[11px]">{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-time-line text-xs" />
                <span className="text-[11px]">{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Right — image, flush to bottom */}
          {post.image && (
            <div className="relative hidden self-end lg:block">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="420px"
                  className="object-cover object-center"
                />
                {/* Gradient overlay at bottom to blend into page */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#3a6697]/60 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#e97a52] via-[#3a6697] to-[#e97a52]/30" />
    </section>
  );
}
