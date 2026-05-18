"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@sweetmedia/blog-core";
import { decodeEntities } from "@/lib/decodeEntities";

interface PostHeroProps {
  post: BlogPost;
}

export default function PostHero({ post }: PostHeroProps) {
  return (
    <section className="w-full bg-[#101E3F] relative">
      {/* Blue top rule */}
      <div className="w-full h-1 bg-[#166C96]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-0 md:pt-36">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <i className="ri-arrow-left-line text-xs" />
            Resource Hub
          </Link>
          <span className="text-white/20 text-xs mx-1">›</span>
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[#166C96] truncate max-w-[200px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.category}
          </span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 pb-0">
          <div className="pb-12 md:pb-16">
            {/* Category chip */}
            <span
              className="inline-block border border-[#166C96] text-[#166C96] text-[9px] tracking-[0.3em] uppercase font-semibold px-3 py-1.5 mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {post.category}
            </span>

            <h1
              className="text-white leading-[1.06] mb-6"
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "clamp(28px, 4vw, 56px)",
              }}
            >
              {decodeEntities(post.title)}
            </h1>

            {post.excerpt && (
              <p
                className="text-white/55 text-base leading-[1.85] mb-10 max-w-2xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {decodeEntities(post.excerpt)}
              </p>
            )}

            {/* Metadata strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#166C96] flex items-center justify-center flex-shrink-0">
                  {post.authorPhoto && !post.authorPhoto.includes("ynmldknprfu") ? (
                    <Image
                      src={post.authorPhoto}
                      alt={post.author}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-white text-[10px] font-bold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.author ? post.author.split(" ").map((n) => n[0]).join("").slice(0, 2) : "CB"}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className="text-[12px] text-white/80 font-medium leading-tight"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.author || "Cipher Billing"}
                  </p>
                  <p
                    className="text-[10px] text-white/35"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.authorRole || "Behavioral Health Billing Team"}
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10 hidden md:block" />

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-calendar-line text-xs" />
                <span className="text-[11px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {post.date}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-white/40">
                <i className="ri-time-line text-xs" />
                <span className="text-[11px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {post.readTime}
                </span>
              </div>

              {post.tags?.length > 0 && (
                <>
                  <div className="w-px h-8 bg-white/10 hidden md:block" />
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-widest uppercase text-white/30 bg-white/5 border border-white/10 px-2 py-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Hero image — flush to bottom of section */}
          {post.image ? (
            <div className="hidden lg:block self-end">
              <div className="relative overflow-hidden border-l border-t border-[#166C96]/30" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="380px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101E3F]/60 via-transparent to-transparent" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
