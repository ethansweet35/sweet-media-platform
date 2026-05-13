"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBlogPosts, useSearchBlogPosts, useBlogCategories } from "@sweetmedia/blog-core";

interface BlogGridProps {
  searchQuery: string;
  lockedCategoryName?: string;
}

export default function BlogGrid({ searchQuery, lockedCategoryName }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState(lockedCategoryName ?? "All");

  const { posts: allPosts, loading: allLoading } = useBlogPosts();
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const effectiveCategory = lockedCategoryName ?? activeCategory;
  const isSearching = searchQuery.trim().length > 0;
  const loading = isSearching ? searchLoading : allLoading;
  const sourcePosts = lockedCategoryName ? allPosts : allPosts.filter((p) => !p.featured);
  const posts = isSearching ? searchResults : sourcePosts;

  const filtered =
    effectiveCategory === "All" || isSearching
      ? posts
      : posts.filter((p) => p.category === effectiveCategory);

  const categoryList = catsLoading
    ? ["All", "Mental Health", "Addiction Recovery", "Trauma", "Family Support"]
    : categories;

  return (
    <section className="bg-[#eef2f7] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Header row */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="h-[2px] w-10 bg-[#e97a52]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">
                {isSearching ? `Results for "${searchQuery}"` : "Latest Articles"}
              </span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-[#3a6697] md:text-4xl">
              {isSearching
                ? `${filtered.length} Article${filtered.length !== 1 ? "s" : ""} Found`
                : "All Insights"}
            </h2>
          </div>

          {/* Category filters */}
          {!isSearching && !lockedCategoryName && (
            <div className="flex flex-wrap gap-2">
              {categoryList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#3a6697] text-white"
                      : "border border-[#cdd8e8] bg-white text-[#64748b] hover:border-[#3a6697] hover:text-[#3a6697]"
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
          <div className="grid animate-pulse grid-cols-1 gap-px bg-[#cdd8e8] md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white">
                <div className="aspect-[16/10] bg-[#eef2f7]" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-1/3 bg-[#eef2f7]" />
                  <div className="h-5 w-3/4 bg-[#eef2f7]" />
                  <div className="h-4 w-full bg-[#eef2f7]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post grid — gapless with 1px separator */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-px bg-[#cdd8e8] md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article key={post.id} className="group bg-white">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: "16/10" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                  {/* Left-edge category tag */}
                  <div className="absolute left-0 top-4">
                    <span className="bg-[#3a6697] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col p-6">
                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] text-[#94a3b8]">{post.date}</span>
                    <span className="h-3 w-px bg-[#cdd8e8]" />
                    <span className="text-[11px] text-[#94a3b8]">{post.readTime}</span>
                  </div>

                  <h3 className="font-heading mb-3 text-lg font-bold leading-snug text-[#3a6697] group-hover:text-[#e97a52] transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[#64748b]">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-[#eef2f7] pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center bg-[#3a6697]">
                        <span className="text-[9px] font-bold text-white">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#64748b]">{post.author}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#e97a52] transition-colors hover:text-[#3a6697]"
                    >
                      Read
                      <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center border border-[#cdd8e8] bg-white">
              <i className="ri-article-line text-2xl text-[#94a3b8]" />
            </div>
            <p className="text-sm font-medium text-[#64748b]">
              {isSearching
                ? `No articles found for "${searchQuery}". Try a different search term.`
                : "No articles in this category yet. Check back soon."}
            </p>
          </div>
        )}

        {/* CTA strip */}
        <div className="mt-16 flex flex-col items-center gap-5 border border-[#cdd8e8] bg-white py-10 text-center md:flex-row md:justify-between md:px-12 md:text-left">
          <div>
            <p className="font-heading text-xl font-bold text-[#3a6697]">
              Ready to start your recovery journey?
            </p>
            <p className="mt-1 text-sm text-[#64748b]">
              Our admissions team is available 24/7 — confidential, no obligation.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/contact-us"
              className="bg-[#e97a52] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#3a6697]"
            >
              Contact Us
            </Link>
            <a
              href="tel:8888563990"
              className="border border-[#3a6697] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#3a6697] transition-colors hover:bg-[#3a6697] hover:text-white"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
