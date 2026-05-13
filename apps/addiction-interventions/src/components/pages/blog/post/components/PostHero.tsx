"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <div className="w-full">
      {/* ── Top metadata bar ─────────────────────────────────────────────── */}
      <div className="w-full bg-[#F5F3E7] border-b border-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-2">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4B4B4B]/60 hover:text-[#507969] transition-colors"
          >
            <i className="ri-arrow-left-line text-xs" />
            Blog
          </Link>
          <span className="text-[#4B4B4B]/30">/</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#8FAC87] font-semibold">
            {post.category}
          </span>
        </div>
      </div>

      {/* ── Hero text block ───────────────────────────────────────────────── */}
      <section className="w-full bg-white pt-12 pb-10 md:pt-16 md:pb-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {/* Category badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8FAC87]/12 border border-[#8FAC87]/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#507969]">
            <i className="ri-bookmark-line text-xs" />
            {post.category}
          </span>

          {/* Headline */}
          <h1
            className="font-heading font-bold text-[#1A1A17] leading-[1.1] mt-6 mb-6"
            style={{ fontSize: "clamp(32px, 4.5vw, 62px)", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt ? (
            <p className="text-[#4B4B4B] text-base md:text-lg leading-[1.8] max-w-3xl border-l-4 border-[#8FAC87] pl-5 italic">
              {post.excerpt}
            </p>
          ) : null}

          {/* Author + meta row */}
          <div className="mt-8 flex flex-wrap items-center gap-5 pt-6 border-t border-[#EFEFEF]">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#8FAC87]/20 flex-shrink-0">
                {post.authorPhoto ? (
                  <Image
                    src={post.authorPhoto}
                    alt={post.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-user-line text-sm text-[#507969]" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A17] leading-tight">
                  {post.author || "Addiction Interventions"}
                </p>
                <p className="text-[11px] text-[#4B4B4B]/50 mt-0.5">
                  {post.authorRole || "Clinical Editorial Team"}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#EFEFEF]" />

            <div className="flex items-center gap-1.5 text-[#4B4B4B]/55">
              <i className="ri-calendar-2-line text-xs text-[#8FAC87]" />
              <span className="text-[12px]">{post.date}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#4B4B4B]/55">
              <i className="ri-time-line text-xs text-[#8FAC87]" />
              <span className="text-[12px]">{post.readTime}</span>
            </div>

            {/* Tags */}
            {post.tags?.length ? (
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-widest uppercase text-[#507969]/70 bg-[#8FAC87]/10 border border-[#8FAC87]/20 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Full-bleed hero image ─────────────────────────────────────────── */}
      {post.image ? (
        <div className="relative w-full h-[220px] md:h-[320px] overflow-hidden bg-[#3E5B50]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17]/30 via-transparent to-transparent" />
          {/* Subtle sage overlay strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#8FAC87]/60" />
        </div>
      ) : (
        <div className="w-full h-3 bg-[#8FAC87]/30" />
      )}
    </div>
  );
}
