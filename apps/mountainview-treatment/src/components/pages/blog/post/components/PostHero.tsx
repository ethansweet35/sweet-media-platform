"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="w-full">
      {/* Dark green header band — masthead + headline */}
      <div className="relative overflow-hidden bg-[var(--mvt-forest)] pt-28 lg:pt-36">
        {/* Subtle contour texture */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1280 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M-60 260 C80 240 200 160 340 130 C460 104 520 122 640 95 C760 68 840 80 960 55 C1060 34 1160 50 1340 40 L1340 400 L-60 400 Z" fill="none" stroke="#7FB5B5" strokeWidth="1.2" />
          <path d="M-60 290 C120 265 240 185 380 155 C500 128 570 145 690 118 C810 90 895 102 1020 76 C1120 54 1210 68 1340 58 L1340 400 L-60 400 Z" fill="none" stroke="#7FB5B5" strokeWidth="0.8" />
        </svg>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Masthead strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-5">
            <div className="flex items-center gap-4">
              <Link
                href="/blog/"
                className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 transition hover:text-white"
              >
                <i className="ri-arrow-left-line" />
                Mountain View Journal
              </Link>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-teal-light)]">
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-medium text-white/40">
              <span className="flex items-center gap-1.5">
                <i className="ri-calendar-line text-xs" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line text-xs" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="py-8 lg:py-10">
            <h1 className="font-heading max-w-4xl text-[32px] font-bold leading-[1.06] tracking-tight text-white sm:text-[42px] lg:text-[56px]">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Angled bottom edge */}
        <div
          className="h-10 w-full bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        />
        <svg className="block w-full" viewBox="0 0 1280 40" preserveAspectRatio="none" aria-hidden="true" style={{ marginTop: "-1px" }}>
          <polygon points="0,40 1280,0 1280,40" fill="white" />
        </svg>
      </div>

      {/* White content area: excerpt + image + author */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
            {/* Left: excerpt + tags + author */}
            <div className="flex flex-col justify-between gap-6">
              {post.excerpt && (
                <p className="font-heading text-lg italic leading-[1.75] text-[var(--mvt-forest)] lg:text-xl">
                  {post.excerpt}
                </p>
              )}

              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--mvt-cream)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-forest)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center gap-3 border-t border-[var(--mvt-cream-2)] pt-5">
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[var(--mvt-cream-2)]">
                  {post.authorPhoto ? (
                    <Image src={post.authorPhoto} alt={post.author} fill sizes="40px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[9px] font-bold text-[var(--mvt-teal)]">
                      MVT
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--mvt-ink)]">
                    {post.author || "Mountain View Treatment"}
                  </p>
                  <p className="text-[11px] text-[var(--mvt-muted)]">
                    {post.authorRole || "Clinical Editorial Team"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: featured image — pulled up to overlap the green band */}
            {post.image && (
              <div className="-mt-16 hidden overflow-hidden rounded-2xl shadow-xl ring-4 ring-white lg:block">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={840}
                  height={560}
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
