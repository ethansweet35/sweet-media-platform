"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

  return (
    <section className="w-full" style={{ background: "#F5F5F3" }}>
      <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <div className="w-8 h-px bg-neutral-300" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
                {isSearching ? `Search Results for "${searchQuery}"` : "Latest Articles"}
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-light text-neutral-900 text-center lg:text-left"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {isSearching ? `${filtered.length} Articles Found` : "All Insights"}
            </h2>
          </div>

          {/* Category pills */}
          {!isSearching && (
            <div className="flex flex-wrap gap-2">
              {catsLoading
                ? ["All", "Mental Health", "Addiction Recovery", "Trauma", "Virtual Care", "Women’s Wellness", "Family Support"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        activeCategory === cat
                          ? "bg-[#2C3B2E] text-[#FAF8F5]"
                          : "bg-white text-neutral-500 hover:text-neutral-800 border border-neutral-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))
                : categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[11px] tracking-[0.12em] uppercase font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        activeCategory === cat
                          ? "bg-[#2C3B2E] text-[#FAF8F5]"
                          : "bg-white text-neutral-500 hover:text-neutral-800 border border-neutral-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
                <div className="aspect-[16/10] bg-neutral-100" />
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-3 bg-neutral-100 rounded w-1/3" />
                  <div className="h-5 bg-neutral-100 rounded w-3/4" />
                  <div className="h-4 bg-neutral-100 rounded w-full" />
                  <div className="h-4 bg-neutral-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((post) => (
              <article
                key={post.id}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="w-full h-auto block"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase font-bold text-[#2C3B2E] px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-neutral-400">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="text-[11px] text-neutral-400">{post.readTime}</span>
                  </div>

                  <h3
                    className="text-lg font-medium text-neutral-900 leading-snug mb-3 group-hover:text-[#2C3B2E] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#2C3B2E] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          {post.author.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500">{post.author}</span>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase font-medium text-[#2C3B2E] group-hover:text-[#C8795A] transition-colors">
                      Read
                      <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform"></i>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-article-line text-4xl text-neutral-300 mb-4"></i>
            <p className="text-sm text-neutral-400">
              {isSearching
                ? `No articles found for "${searchQuery}". Try a different search term.`
                : "No articles in this category yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
