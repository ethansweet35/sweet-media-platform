"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { decodeEntities } from "@/lib/decodeEntities";
import { useBlogPosts, useSearchBlogPosts, useBlogCategories } from "@sweetmedia/blog-core";

interface BlogGridProps {
  searchQuery: string;
}

export default function BlogGrid({ searchQuery }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const { posts: allPosts, loading: allLoading } = useBlogPosts();
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const loading = isSearching ? searchLoading : allLoading;
  const posts = isSearching ? searchResults : allPosts.filter((p) => !p.featured);

  const filtered =
    activeCategory === "All" || isSearching
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const tabCategories = catsLoading
    ? ["All", "Billing", "Coding", "Compliance", "RCM", "Reimbursement"]
    : categories;

  return (
    <section className="w-full bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-[#101E3F]/10 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-[#166C96]" />
              <span
                className="text-[10px] tracking-[0.35em] uppercase text-[#166C96] font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isSearching ? `Results · "${searchQuery}"` : "All Articles"}
              </span>
            </div>
            <h2
              className="text-[#101E3F]"
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "clamp(24px, 3vw, 38px)",
              }}
            >
              {isSearching ? `${filtered.length} articles found` : "Billing Resource Library"}
            </h2>
          </div>

          {/* Category tabs */}
          {!isSearching && (
            <div className="flex flex-wrap gap-0 border border-[#101E3F]/10 overflow-hidden">
              {tabCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-[0.2em] uppercase font-semibold px-4 py-2.5 transition-all duration-150 cursor-pointer whitespace-nowrap border-r border-[#101E3F]/10 last:border-r-0 ${
                    activeCategory === cat
                      ? "bg-[#101E3F] text-white"
                      : "bg-white text-[#101E3F]/50 hover:bg-[#101E3F]/5 hover:text-[#101E3F]"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#101E3F]/8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6 animate-pulse space-y-4">
                <div className="h-44 bg-neutral-100" />
                <div className="h-3 bg-neutral-100 w-1/3" />
                <div className="h-5 bg-neutral-100 w-full" />
                <div className="h-4 bg-neutral-100 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Post grid — separated by 1px gap = grid lines effect */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#101E3F]/10">
            {filtered.map((post) => (
              <article
                key={post.id}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group bg-white cursor-pointer flex flex-col overflow-hidden hover:z-10 hover:shadow-[0_8px_32px_rgba(16,30,63,0.12)] transition-all duration-300 relative"
              >
                {/* Image */}
                {post.image ? (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    {/* Blue left accent on hover */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#166C96] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="bg-[#101E3F]/5" style={{ aspectRatio: "16/9" }}>
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#166C96] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#166C96] border border-[#166C96]/30 px-2 py-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-[10px] text-[#101E3F]/35"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.date}
                    </span>
                  </div>

                  <h3
                    className="text-[#101E3F] leading-snug mb-3 flex-1 group-hover:text-[#166C96] transition-colors"
                    style={{
                      fontFamily: "'Marcellus', serif",
                      fontSize: "clamp(16px, 1.5vw, 20px)",
                    }}
                  >
                    {decodeEntities(post.title)}
                  </h3>

                  <p
                    className="text-[#101E3F]/55 text-[13px] leading-relaxed mb-5 line-clamp-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {decodeEntities(post.excerpt)}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#101E3F]/8">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#101E3F] flex items-center justify-center flex-shrink-0">
                        <span
                          className="text-white text-[8px] font-bold"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {post.author ? post.author.split(" ").map((n) => n[0]).join("").slice(0, 2) : "CB"}
                        </span>
                      </div>
                      <div>
                        <span
                          className="text-[11px] text-[#101E3F]/60 block"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {post.author || "Cipher Billing"}
                        </span>
                        <span
                          className="text-[10px] text-[#101E3F]/35"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <span
                      className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#166C96] flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Read
                      <i className="ri-arrow-right-line text-xs" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 border border-[#101E3F]/10 bg-white">
            <i className="ri-file-search-line text-4xl text-[#101E3F]/20 mb-4 block" />
            <p
              className="text-sm text-[#101E3F]/40"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {isSearching
                ? `No articles found for "${searchQuery}". Try different keywords.`
                : "No articles in this category yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
