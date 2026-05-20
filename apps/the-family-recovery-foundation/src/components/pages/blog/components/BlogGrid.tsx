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

  const pillActive =
    "bg-deep-navy text-pure-white border-deep-navy";
  const pillIdle =
    "bg-pure-white text-slate border-mist hover:border-tfrf-blue/40 hover:text-tfrf-blue";

  return (
    <section className="w-full bg-soft-white">
      <div className="max-w-content mx-auto px-6 lg:px-16 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-3">
              {isSearching ? `Search: "${searchQuery}"` : "Latest Articles"}
            </p>
            <h2 className="font-display text-[clamp(26px,3vw,36px)] text-deep-navy leading-[1.15]">
              {isSearching ? `${filtered.length} articles found` : "All insights"}
            </h2>
          </div>

          {!isSearching && (
            <div className="flex flex-wrap gap-2">
              {catsLoading
                ? ["All"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[11px] font-body font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${pillActive}`}
                    >
                      {cat}
                    </button>
                  ))
                : ["All", ...categories.filter((c) => c !== "All")].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`text-[11px] font-body font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        activeCategory === cat ? pillActive : pillIdle
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
            </div>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-mist bg-pure-white animate-pulse"
              >
                <div className="aspect-[16/10] bg-mist" />
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-3 bg-mist rounded w-1/3" />
                  <div className="h-5 bg-mist rounded w-3/4" />
                  <div className="h-4 bg-mist rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((post) => (
              <article
                key={post.id}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-mist bg-pure-white transition-all duration-300 hover:border-tfrf-blue/30 hover:shadow-[0_8px_32px_rgba(30,58,95,0.08)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-deep-navy/90 px-2.5 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.14em] text-pure-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3 text-caption font-body text-stone-blue">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-mist" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg text-deep-navy leading-snug mb-3 transition-colors group-hover:text-tfrf-blue line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-body text-body-s text-slate leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-mist">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-tfrf-blue text-pure-white">
                        <span className="text-[10px] font-body font-bold">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-caption font-body text-slate">{post.author}</span>
                    </div>

                    <span className="flex items-center gap-1 text-caption font-body font-semibold uppercase tracking-[0.1em] text-tfrf-blue group-hover:text-deep-navy transition-colors">
                      Read
                      <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-article-line text-4xl text-mist mb-4" />
            <p className="font-body text-body-s text-stone-blue">
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
