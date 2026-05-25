"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useBlogPosts,
  useSearchBlogPosts,
  useBlogCategories,
  type BlogPost,
} from "@sweetmedia/blog-core";

type BlogArchiveFeedProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
};

function ArticleRow({
  post,
  index,
  variant = "default",
}: {
  post: BlogPost;
  index: number;
  variant?: "lead" | "default";
}) {
  const num = String(index + 1).padStart(2, "0");
  const isLead = variant === "lead";

  return (
    <article
      className={`group grid border-b border-[var(--sr-sand)] transition hover:bg-white/80 ${
        isLead
          ? "grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10"
          : "grid-cols-1 gap-4 py-8 md:grid-cols-12 md:items-start md:gap-8"
      }`}
    >
      <div
        className={`font-light tabular-nums text-[var(--sr-sand)] transition group-hover:text-[var(--sr-fern)] ${
          isLead ? "text-4xl md:col-span-1" : "text-2xl md:col-span-1"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
        aria-hidden
      >
        {num}
      </div>

      <Link
        href={`/blog/${post.slug}/`}
        className={`relative overflow-hidden bg-[var(--sr-mist)] ${
          isLead ? "aspect-[16/10] md:col-span-4" : "aspect-[16/10] md:col-span-3"
        }`}
      >
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes={isLead ? "(max-width: 768px) 100vw, 320px" : "(max-width: 768px) 100vw, 240px"}
        />
      </Link>

      <div className={isLead ? "md:col-span-7" : "md:col-span-8"}>
        <div
          className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--sr-fern)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <span>{post.category}</span>
          <span className="text-[var(--sr-sand)]" aria-hidden>
            ·
          </span>
          <span className="text-[var(--sr-muted)]">{post.date}</span>
          <span className="text-[var(--sr-muted)]">{post.readTime}</span>
        </div>

        <h3
          className={`font-light leading-[1.12] text-[var(--sr-ink)] transition group-hover:text-[var(--sr-moss)] ${
            isLead ? "text-[clamp(1.5rem,2.5vw,2.25rem)]" : "text-xl md:text-2xl"
          }`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
        </h3>

        <p
          className={`mt-3 text-[var(--sr-body)] ${isLead ? "line-clamp-3 text-[15px] leading-[1.8]" : "line-clamp-2 text-[14px] leading-relaxed"}`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {post.excerpt}
        </p>

        <p
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-fern)] opacity-0 transition group-hover:opacity-100"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Continue reading
          <i className="ri-arrow-right-line" aria-hidden />
        </p>
      </div>
    </article>
  );
}

function FeedSkeleton() {
  return (
    <div className="divide-y divide-[var(--sr-sand)]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="grid animate-pulse gap-4 py-8 md:grid-cols-12">
          <div className="h-8 w-8 bg-[var(--sr-sand)] md:col-span-1" />
          <div className="aspect-[16/10] bg-[var(--sr-sand)] md:col-span-3" />
          <div className="space-y-3 md:col-span-8">
            <div className="h-3 w-20 bg-[var(--sr-sand)]" />
            <div className="h-8 w-3/4 bg-[var(--sr-sand)]" />
            <div className="h-4 w-full bg-[var(--sr-sand)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogArchiveFeed({ searchQuery, onSearchChange }: BlogArchiveFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const { posts: allPosts, loading: allLoading } = useBlogPosts();
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const loading = isSearching ? searchLoading : allLoading;

  const { listPosts, featuredPost } = useMemo(() => {
    const source = isSearching ? searchResults : allPosts;
    const featured = isSearching ? null : source.find((p) => p.featured) ?? null;
    const rest = isSearching
      ? source
      : source.filter((p) => !p.featured || p.id !== featured?.id);
    return { listPosts: rest, featuredPost: featured };
  }, [allPosts, searchResults, isSearching]);

  const filtered =
    activeCategory === "All" || isSearching
      ? listPosts
      : listPosts.filter((p) => p.category === activeCategory);

  const [leadPost, ...rowPosts] = filtered;

  return (
    <section className="bg-[var(--sr-parchment)] py-12 md:py-16">
      <div className="sr-container">
        {/* Search — full width above feed so it never fights the hero layout */}
        <div className="mb-10 border border-[var(--sr-sand)] bg-white p-4 md:p-5">
          <label
            htmlFor="blog-archive-search"
            className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Search the journal
          </label>
          <div className="flex w-full border border-[var(--sr-sand)] bg-[var(--sr-parchment)] focus-within:border-[var(--sr-fern)]">
            <span className="flex shrink-0 items-center px-4 text-[var(--sr-fern)]">
              <i className="ri-search-line text-lg" aria-hidden />
            </span>
            <input
              id="blog-archive-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Keywords, topics, substances…"
              className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-[14px] text-[var(--sr-ink)] placeholder:text-[var(--sr-subtle)] focus:outline-none"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="shrink-0 px-4 text-[var(--sr-muted)] transition hover:text-[var(--sr-ink)]"
                aria-label="Clear search"
              >
                <i className="ri-close-line text-lg" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sidebar — categories */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p
                className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Browse by topic
              </p>

              <nav aria-label="Blog categories">
                <ul className="border border-[var(--sr-sand)] bg-white">
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveCategory("All")}
                      className={`flex w-full items-center justify-between border-b border-[var(--sr-sand)] px-4 py-3.5 text-left text-[13px] transition ${
                        activeCategory === "All"
                          ? "border-l-2 border-l-[var(--sr-fern)] bg-[var(--sr-mist)]/50 font-medium text-[var(--sr-moss)]"
                          : "border-l-2 border-l-transparent text-[var(--sr-body)] hover:bg-[var(--sr-linen)]"
                      }`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      All topics
                      {!isSearching && !loading ? (
                        <span className="text-[11px] text-[var(--sr-muted)]">
                          {listPosts.length}
                        </span>
                      ) : null}
                    </button>
                  </li>
                  {catsLoading
                    ? null
                    : categories
                        .filter((c) => c !== "All")
                        .map((cat) => (
                          <li key={cat}>
                            <button
                              type="button"
                              onClick={() => setActiveCategory(cat)}
                              disabled={isSearching}
                              className={`flex w-full items-center justify-between border-b border-[var(--sr-sand)] px-4 py-3.5 text-left text-[13px] transition last:border-b-0 disabled:opacity-50 ${
                                activeCategory === cat
                                  ? "border-l-2 border-l-[var(--sr-fern)] bg-[var(--sr-mist)]/50 font-medium text-[var(--sr-moss)]"
                                  : "border-l-2 border-l-transparent text-[var(--sr-body)] hover:bg-[var(--sr-linen)]"
                              }`}
                              style={{ fontFamily: "var(--font-dm-sans)" }}
                            >
                              {cat}
                            </button>
                          </li>
                        ))}
                </ul>
              </nav>

              <div className="mt-8 hidden border border-[var(--sr-sand)] bg-[var(--sr-moss)] p-5 lg:block">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--sr-sage)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Need help now?
                </p>
                <p
                  className="mb-4 text-sm leading-relaxed text-white/75"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Speak with our admissions team about detox in Mission Viejo.
                </p>
                <Link
                  href="/insurance/"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sr-sage)] hover:text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Contact us
                  <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              </div>
            </div>
          </aside>

          {/* Article index */}
          <div className="lg:col-span-9">
            <div className="mb-8 flex flex-col gap-2 border-b border-[var(--sr-sand)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="sr-eyebrow mb-2">
                  {isSearching ? "Search results" : "Article index"}
                </p>
                <h2
                  className="text-[clamp(1.75rem,3vw,2.5rem)] font-light text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {isSearching
                    ? `"${searchQuery}"`
                    : activeCategory === "All"
                      ? "Latest from the journal"
                      : activeCategory}
                </h2>
              </div>
              {!loading && (
                <p
                  className="text-[13px] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                  {featuredPost && !isSearching ? " · 1 featured above" : ""}
                </p>
              )}
            </div>

            {loading ? <FeedSkeleton /> : null}

            {!loading && filtered.length === 0 ? (
              <div className="border border-[var(--sr-sand)] bg-white px-8 py-16 text-center">
                <i className="ri-article-line mb-4 text-4xl text-[var(--sr-sand)]" aria-hidden />
                <p
                  className="text-[15px] text-[var(--sr-muted)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {isSearching
                    ? `No articles match "${searchQuery}". Try another term.`
                    : "No articles in this category yet."}
                </p>
              </div>
            ) : null}

            {!loading && filtered.length > 0 ? (
              <div>
                {leadPost ? (
                  <ArticleRow post={leadPost} index={0} variant="lead" />
                ) : null}
                {rowPosts.map((post, i) => (
                  <ArticleRow key={post.id} post={post} index={i + (leadPost ? 1 : 0)} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
