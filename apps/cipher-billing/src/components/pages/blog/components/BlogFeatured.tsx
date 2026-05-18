"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBlogPosts } from "@sweetmedia/blog-core";
import { decodeEntities } from "@/lib/decodeEntities";

export default function BlogFeatured() {
  const { posts, loading } = useBlogPosts();
  const router = useRouter();

  const post = posts.find((p) => p.featured) ?? posts[0];

  if (loading) {
    return (
      <section className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0">
            <div className="bg-neutral-100 h-[360px]" />
            <div className="bg-[#101E3F]/5 p-10 space-y-4">
              <div className="h-3 bg-neutral-200 w-1/3 rounded" />
              <div className="h-8 bg-neutral-200 w-full rounded" />
              <div className="h-4 bg-neutral-200 w-3/4 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) return null;

  return (
    <section className="w-full bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-[#166C96]" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#166C96] font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Featured Resource
          </span>
        </div>

        {/* Card — image left, navy content right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_440px] overflow-hidden border border-[#101E3F]/10 cursor-pointer group"
          onClick={() => router.push(`/${post.slug}`)}
        >
          {/* Image panel */}
          <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-[#101E3F]/10" />
            )}
            {/* Blue category tag */}
            <div className="absolute top-0 left-0">
              <span
                className="inline-block bg-[#166C96] text-white text-[9px] tracking-[0.3em] uppercase font-semibold px-4 py-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* Navy content panel */}
          <div className="bg-[#101E3F] p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div
                className="flex items-center gap-3 mb-6 text-white/40"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-[11px]">{post.date}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className="text-[11px]">{post.readTime}</span>
              </div>

              <h2
                className="text-white leading-[1.1] mb-5"
                style={{
                  fontFamily: "'Marcellus', serif",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                }}
              >
                {decodeEntities(post.title)}
              </h2>

              <p
                className="text-white/55 text-sm leading-[1.85] mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {decodeEntities(post.excerpt)}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#166C96] flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-white text-[10px] font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.author ? post.author.split(" ").map((n) => n[0]).join("").slice(0, 2) : "CB"}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[12px] text-white/80 font-medium"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.author || "Cipher Billing"}
                  </p>
                  <p
                    className="text-[10px] text-white/35"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {post.authorRole || "Billing Team"}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <span
                className="flex items-center gap-2 text-[#166C96] text-[11px] tracking-[0.2em] uppercase font-semibold group-hover:gap-3 transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Read Article
                <i className="ri-arrow-right-line text-xs" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
