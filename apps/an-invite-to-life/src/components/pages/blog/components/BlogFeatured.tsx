"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBlogPosts } from "@sweetmedia/blog-core";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const router = useRouter();

  const post = posts.find((p) => p.featured);

  if (loading) {
    return (
      <section className="w-full bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-pulse">
            <div className="aspect-[4/3] bg-neutral-100 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-4 bg-neutral-100 rounded w-1/3" />
              <div className="h-8 bg-neutral-100 rounded w-3/4" />
              <div className="h-4 bg-neutral-100 rounded w-full" />
              <div className="h-4 bg-neutral-100 rounded w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-10 justify-center lg:justify-start">
          <div className="w-8 h-px bg-neutral-300" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
            Featured Article
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={900}
              priority
              className="w-full h-auto block"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.2em] uppercase font-bold text-[#1F2937] px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] text-neutral-400">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="text-[11px] text-neutral-400">{post.readTime}</span>
            </div>

            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 leading-snug mb-5"
              style={{ fontFamily: "'Inter', serif" }}
            >
              {post.title}
            </h2>

            <p className="text-sm md:text-base text-neutral-500 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {post.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-800">{post.author}</p>
                  <p className="text-[11px] text-neutral-400">{post.authorRole}</p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold text-[#1F2937] hover:text-[#2563EB] transition-colors cursor-pointer whitespace-nowrap"
              >
                Read Article
                <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
