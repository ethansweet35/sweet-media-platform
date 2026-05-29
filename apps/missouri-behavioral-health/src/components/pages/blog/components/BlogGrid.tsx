"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  useBlogPosts,
  useSearchBlogPosts,
  useBlogCategories,
} from "@sweetmedia/blog-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

interface BlogGridProps {
  searchQuery: string;
}

function ArticleRow({
  post,
  index,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
  };
  index: number;
}) {
  return (
    <article>
      <Link
        href={`/${post.slug}`}
        className="group flex flex-col gap-5 rounded-2xl border border-transparent bg-white p-4 transition hover:border-mbh-green/25 hover:shadow-md hover:shadow-mbh-forest/5 sm:flex-row sm:items-stretch sm:p-5"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-cream sm:aspect-auto sm:h-[7.5rem] sm:w-[11.5rem]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 184px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green">
                {post.category}
              </span>
              <span className="font-body text-[10px] text-mbh-body/45" aria-hidden>
                ·
              </span>
              <span className="font-body text-[10px] text-mbh-body/55">
                {post.date}
              </span>
              <span className="font-body text-[10px] text-mbh-body/45" aria-hidden>
                ·
              </span>
              <span className="font-body text-[10px] text-mbh-body/55">
                {post.readTime}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold leading-snug text-mbh-forest transition group-hover:text-mbh-green sm:text-xl">
              <span className="mr-2 font-body text-xs font-bold text-mbh-body/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              {post.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-forest transition group-hover:text-mbh-green">
            Continue reading
            <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogGrid({ searchQuery }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const { posts: allPosts, loading: allLoading } = useBlogPosts();
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const loading = isSearching ? searchLoading : allLoading;

  const featuredSlug =
    allPosts.find((p) => p.featured)?.slug ?? allPosts[0]?.slug;

  const posts = isSearching
    ? searchResults
    : allPosts.filter((p) => p.slug !== featuredSlug);

  const filtered =
    activeCategory === "All" || isSearching
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const categoryList = catsLoading ? ["All"] : categories;

  return (
    <>
      <section className="bg-cream-alt py-14 lg:py-20">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,17rem)_1fr]">
            {/* Sidebar — topics */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-mbh-forest/10 bg-white p-5 shadow-sm ring-1 ring-mbh-forest/5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-green">
                  Browse by topic
                </p>
                <p className="mt-1 font-body text-xs text-mbh-body/60">
                  {isSearching
                    ? `Results for “${searchQuery}”`
                    : "Filter the article index"}
                </p>

                {!isSearching ? (
                  <nav className="mt-5 flex flex-col gap-0.5" aria-label="Blog categories">
                    {categoryList.map((cat) => {
                      const active = activeCategory === cat;
                      const count =
                        cat === "All"
                          ? posts.length
                          : posts.filter((p) => p.category === cat).length;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left font-body text-sm transition ${
                            active
                              ? "bg-mbh-forest text-white"
                              : "text-mbh-body hover:bg-cream hover:text-mbh-forest"
                          }`}
                        >
                          <span className={active ? "font-semibold" : ""}>{cat}</span>
                          <span
                            className={`text-[11px] tabular-nums ${
                              active ? "text-white/60" : "text-mbh-body/40"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className="mt-5 w-full rounded-lg border border-mbh-forest/15 px-3 py-2.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-cream"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Mobile category scroll */}
              {!isSearching && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
                  {categoryList.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 rounded-full px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-wide transition ${
                        activeCategory === cat
                          ? "bg-mbh-forest text-white"
                          : "bg-white text-mbh-body ring-1 ring-mbh-forest/15"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </aside>

            {/* Article index list */}
            <div>
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-mbh-forest/10 pb-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-mbh-forest">
                    {isSearching ? "Search results" : "Article index"}
                  </h2>
                  {!loading && (
                    <p className="mt-1 font-body text-sm text-mbh-body">
                      {filtered.length}{" "}
                      {filtered.length === 1 ? "article" : "articles"}
                      {activeCategory !== "All" && !isSearching
                        ? ` in ${activeCategory}`
                        : ""}
                    </p>
                  )}
                </div>
              </div>

              {loading && (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex animate-pulse gap-5 rounded-2xl bg-white p-5"
                    >
                      <div className="hidden h-[7.5rem] w-[11.5rem] shrink-0 rounded-xl bg-mbh-forest/8 sm:block" />
                      <div className="flex-1 space-y-3 py-2">
                        <div className="h-3 w-1/4 rounded bg-mbh-forest/8" />
                        <div className="h-6 w-3/4 rounded bg-mbh-forest/8" />
                        <div className="h-4 w-full rounded bg-mbh-forest/8" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <div className="space-y-4">
                  {filtered.map((post, i) => (
                    <ArticleRow key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-mbh-forest/20 bg-white px-8 py-16 text-center">
                  <i className="ri-article-line text-4xl text-mbh-green/40" aria-hidden />
                  <p className="mt-4 font-display text-lg font-semibold text-mbh-forest">
                    No articles found
                  </p>
                  <p className="mx-auto mt-2 max-w-sm font-body text-sm text-mbh-body">
                    {isSearching
                      ? `Nothing matched “${searchQuery}”. Try another keyword or browse all topics.`
                      : "No articles in this category yet. Check back soon or explore another topic."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-mbh-forest/10 bg-white py-16">
        <div className={`${CONTAINER} text-center`}>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
            Need help now?
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold text-mbh-forest">
            Questions about treatment? Talk to our team 24/7.
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm text-mbh-body">
            Every call is confidential. We can answer clinical questions, verify insurance, and help
            you find the right level of care.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
            >
              Admissions
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
