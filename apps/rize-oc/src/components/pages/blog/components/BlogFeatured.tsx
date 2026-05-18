"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.featured);

  if (loading) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-pulse">
            <div className="aspect-[4/3] bg-[#EBEBEB]" />
            <div className="space-y-4">
              <div className="h-3 bg-[#EBEBEB] w-1/4" />
              <div className="h-10 bg-[#EBEBEB] w-3/4" />
              <div className="h-4 bg-[#EBEBEB] w-full" />
              <div className="h-4 bg-[#EBEBEB] w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[80px]">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-8 h-px bg-[#DCDCDC]" />
          <span className="text-[10px] tracking-[0.32em] uppercase text-ink/40 font-semibold">
            Featured Article
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <Link href={`/${post.slug}`} className="group block overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-accent text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5">
                  {post.category}
                </span>
              </div>
            </div>
          </Link>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-[11px] text-ink/40">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>{post.readTime}</span>
            </div>

            <Link href={`/${post.slug}`} className="group block">
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.0] group-hover:opacity-75 transition-opacity"
                style={{ fontSize: "clamp(30px, 3vw, 46px)" }}
              >
                {post.title}
              </h2>
            </Link>

            <p className="mt-5 text-[15px] font-light text-ink/60 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-[#EBEBEB] pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-bold">
                    {(post.author ?? "R").split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-ink">{post.author ?? "Rize OC"}</p>
                  <p className="text-[11px] text-ink/40">{post.authorRole}</p>
                </div>
              </div>

              <Link
                href={`/${post.slug}`}
                className="group flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold text-accent hover:gap-3 transition-all"
              >
                Read Article
                <i className="ri-arrow-right-line text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
