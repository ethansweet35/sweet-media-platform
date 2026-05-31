"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePaginatedBlogPosts, useSearchBlogPosts, useBlogCategories } from "@sweetmedia/blog-core";

const PAGE_SIZE = 12;

interface BlogGridProps {
  searchQuery: string;
}

export default function BlogGrid({ searchQuery }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filterKey = `${searchQuery}|${activeCategory}`;
  const [pagination, setPagination] = useState({ page: 0, filterKey });
  const page = pagination.filterKey === filterKey ? pagination.page : 0;

  const { posts, total, loading } = usePaginatedBlogPosts(page, PAGE_SIZE, activeCategory);
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const displayPosts = isSearching ? searchResults : posts;
  const displayLoading = isSearching ? searchLoading : loading;

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
  }

  function handlePage(p: number) {
    setPagination({ page: p, filterKey });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const placeholderCats = ["All", "Mental Health", "Addiction Recovery", "Trauma", "Family Support"];

  return (
    <section className="w-full bg-cream">
      <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-10 py-[80px]">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-ink/20" />
              <span className="text-[10px] tracking-[0.32em] uppercase text-ink/40 font-semibold">
                {isSearching ? `Results for "${searchQuery}"` : "All Articles"}
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(26px, 2.5vw, 38px)" }}
            >
              {isSearching
                ? `${searchResults.length} Articles Found`
                : `${total} Articles`}
            </h2>
          </div>

          {/* Category filter */}
          {!isSearching && (
            <div className="flex flex-wrap gap-2">
              {(catsLoading ? placeholderCats : categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`text-[10px] tracking-[0.15em] uppercase font-semibold px-4 py-2 border transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink/50 border-[#E0E0E0] hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {displayLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="bg-white border border-[#E8E8E8] overflow-hidden animate-pulse">
                <div className="aspect-[16/10] bg-[#EBEBEB]" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-[#EBEBEB] w-1/3" />
                  <div className="h-5 bg-[#EBEBEB] w-3/4" />
                  <div className="h-4 bg-[#EBEBEB] w-full" />
                  <div className="h-4 bg-[#EBEBEB] w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post grid */}
        {!displayLoading && displayPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group bg-white border border-[#E8E8E8] overflow-hidden hover:border-ink/20 transition-colors block"
              >
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block bg-accent text-white text-[9px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-3 text-[11px] text-ink/40">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/20" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3
                      className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug mb-3 group-hover:opacity-70 transition-opacity"
                      style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-[13px] font-light text-ink/55 leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#EBEBEB]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center shrink-0">
                          <span className="text-white text-[9px] font-bold">
                            {(post.author ?? "R").split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-[11px] text-ink/50">{post.author ?? "Rize OC"}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold text-accent group-hover:gap-2 transition-all">
                        Read
                        <i className="ri-arrow-right-line text-xs" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!displayLoading && displayPosts.length === 0 && (
          <div className="text-center py-24">
            <i className="ri-article-line text-4xl text-ink/20 mb-5 block" />
            <p className="text-[13px] text-ink/40 font-light">
              {isSearching
                ? `No articles found for "${searchQuery}". Try a different search term.`
                : "No articles in this category yet."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!isSearching && totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePage(page - 1)}
              disabled={page === 0}
              className="w-9 h-9 flex items-center justify-center border border-[#E0E0E0] text-ink/50 hover:border-ink/30 hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <i className="ri-arrow-left-s-line text-sm" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const isActive = i === page;
              // Show first, last, current ±1, and ellipsis
              const show =
                i === 0 ||
                i === totalPages - 1 ||
                Math.abs(i - page) <= 1;
              const showEllipsisBefore = i === 1 && page > 3;
              const showEllipsisAfter = i === totalPages - 2 && page < totalPages - 4;

              if (!show) return null;
              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={i} className="w-9 h-9 flex items-center justify-center text-ink/30 text-sm">
                    …
                  </span>
                );
              }

              return (
                <button
                  key={i}
                  onClick={() => handlePage(i)}
                  className={`w-9 h-9 flex items-center justify-center text-[11px] font-semibold tracking-[0.1em] border transition-colors ${
                    isActive
                      ? "bg-ink text-white border-ink"
                      : "border-[#E0E0E0] text-ink/55 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}

            <button
              onClick={() => handlePage(page + 1)}
              disabled={page >= totalPages - 1}
              className="w-9 h-9 flex items-center justify-center border border-[#E0E0E0] text-ink/50 hover:border-ink/30 hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <i className="ri-arrow-right-s-line text-sm" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
