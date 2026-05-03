"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import PostHeroImage from "@/components/pages/blog/post/components/PostHeroImage";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <div className="w-full">
      <section className="w-full bg-[#0A1F44] pt-32 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-[11px] tracking-[0.15em] uppercase font-medium"
            >
              <i className="ri-arrow-left-line text-xs" />
              Blog
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-white/40 text-[11px] tracking-[0.15em] uppercase font-medium">{post.category}</span>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-white/10 text-white/80 text-[10px] tracking-[0.25em] uppercase font-bold px-3 py-1.5 rounded-full border border-white/10">
              {post.category}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8 max-w-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-0 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                <Image
                  src={post.authorPhoto}
                  alt={post.author}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-white leading-tight">{post.author}</p>
                <p className="text-[11px] text-white/40">{post.authorRole}</p>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            <div className="flex items-center gap-1.5 text-white/40">
              <i className="ri-calendar-line text-xs" />
              <span className="text-[11px]">{post.date}</span>
            </div>

            <div className="flex items-center gap-1.5 text-white/40">
              <i className="ri-time-line text-xs" />
              <span className="text-[11px]">{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 ml-auto">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-widest uppercase text-white/30 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {post.image ? (
        <div className="w-full bg-white">
          <div className="max-w-screen-xl mx-auto px-6">
            <PostHeroImage src={post.image} alt={post.title} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
