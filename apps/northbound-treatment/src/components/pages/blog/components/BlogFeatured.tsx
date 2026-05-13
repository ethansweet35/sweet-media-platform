"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.featured);

  if (loading) {
    return (
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid animate-pulse grid-cols-1 gap-0 overflow-hidden border border-[#cdd8e8] lg:grid-cols-2">
            <div className="aspect-[4/3] bg-[#eef2f7] lg:aspect-auto lg:min-h-[440px]" />
            <div className="space-y-5 p-10">
              <div className="h-3 w-1/3 rounded-none bg-[#eef2f7]" />
              <div className="h-8 w-3/4 rounded-none bg-[#eef2f7]" />
              <div className="h-4 w-full rounded-none bg-[#eef2f7]" />
              <div className="h-4 w-2/3 rounded-none bg-[#eef2f7]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[2px] w-10 bg-[#e97a52]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
            Featured Article
          </span>
        </div>

        {/* Card */}
        <div className="grid grid-cols-1 overflow-hidden border border-[#cdd8e8] lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={900}
              priority
              className="h-full w-full object-cover"
              style={{ minHeight: "380px" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Category badge */}
            <div className="absolute left-0 top-6">
              <span className="bg-[#e97a52] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center border-l border-[#cdd8e8] bg-white p-8 md:p-12 lg:p-14">
            {/* Meta */}
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[11px] font-medium text-[#64748b]">{post.date}</span>
              <span className="h-3 w-px bg-[#cdd8e8]" />
              <span className="text-[11px] font-medium text-[#64748b]">{post.readTime}</span>
            </div>

            <h2 className="font-heading mb-4 text-3xl font-bold leading-snug text-[#3a6697] md:text-4xl">
              {post.title}
            </h2>

            <p className="mb-8 text-sm leading-relaxed text-[#64748b] md:text-base">
              {post.excerpt}
            </p>

            {/* Author + CTA */}
            <div className="flex items-center justify-between border-t border-[#eef2f7] pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#3a6697]">
                  <span className="text-[10px] font-bold text-white">
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3a6697]">{post.author}</p>
                  <p className="text-[11px] text-[#64748b]">{post.authorRole}</p>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-2 bg-[#3a6697] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#e97a52]"
              >
                Read Article
                <i className="ri-arrow-right-line text-sm transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
