"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#1F2937]">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F8FAFC 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -top-28 right-0 w-96 h-96 rounded-full bg-[#DDA15E]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#8FA489]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="flex items-center gap-2 mb-8">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#E2E8F0]/45 hover:text-[#E2E8F0]/80 transition-colors"
          >
            <i className="ri-arrow-left-line text-xs" />
            Blog
          </Link>
          <span className="text-[#E2E8F0]/25">/</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#DDA15E]">
            {post.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#E2E8F0]/15 bg-[#E2E8F0]/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#DDA15E]">
              {post.category}
            </span>

            <h1
              className="font-serif text-[#F8FAFC] leading-[1.08] mt-7 mb-7"
              style={{ fontSize: "clamp(38px, 5.5vw, 76px)" }}
            >
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="text-[#E2E8F0]/70 font-light text-base md:text-lg leading-[1.9] max-w-3xl">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap items-center gap-4 md:gap-6 border-t border-[#E2E8F0]/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#E2E8F0]/10 flex-shrink-0">
                  {post.authorPhoto ? (
                    <Image
                      src={post.authorPhoto}
                      alt={post.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#DDA15E] text-xs">
                      IP
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F8FAFC] leading-tight">
                    {post.author || "Client Brand"}
                  </p>
                  <p className="text-[11px] text-[#E2E8F0]/45">
                    {post.authorRole || "Clinical Editorial Team"}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-9 bg-[#E2E8F0]/10" />

              <div className="flex items-center gap-2 text-[#E2E8F0]/45">
                <i className="ri-calendar-line text-xs" />
                <span className="text-[11px]">{post.date}</span>
              </div>

              <div className="flex items-center gap-2 text-[#E2E8F0]/45">
                <i className="ri-time-line text-xs" />
                <span className="text-[11px]">{post.readTime}</span>
              </div>
            </div>
          </div>

          {post.image ? (
            <div className="relative aspect-[3/2] w-full max-w-[520px] lg:ml-auto rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden border border-[#E2E8F0]/10 bg-[#E2E8F0]/5 shadow-2xl shadow-black/20">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/40 via-transparent to-transparent" />
            </div>
          ) : null}
        </div>

        {post.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-widest uppercase text-[#E2E8F0]/40 bg-[#E2E8F0]/5 border border-[#E2E8F0]/10 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
