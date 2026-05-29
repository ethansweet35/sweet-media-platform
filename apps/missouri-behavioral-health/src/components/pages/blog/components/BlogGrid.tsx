"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "@sweetmedia/blog-core";
import { useSearchBlogPosts, useBlogCategories } from "@sweetmedia/blog-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const PAGE_SIZE = 12;

interface BlogGridProps {
  allPosts: BlogPost[];
  allLoading: boolean;
  searchQuery: string;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-mbh-forest/15 bg-white text-mbh-forest transition hover:border-mbh-green/40 disabled:pointer-events-none disabled:opacity-35"
      >
        <i className="ri-arrow-left-s-line text-lg" aria-hidden />
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const isActive = i === page;
        const show = i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1;
        const ellipsisBefore = i === 1 && page > 2;
        const ellipsisAfter = i === totalPages - 2 && page < totalPages - 3;
        if (!show) return null;
        if (ellipsisBefore || ellipsisAfter) {
          return (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-8 items-center justify-center font-body text-sm text-mbh-body/50"
              aria-hidden
            >
              …
            </span>
          );
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onPageChange(i)}
            aria-label={`Page ${i + 1}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-body text-sm font-semibold transition ${
              isActive
                ? "bg-mbh-forest text-white"
                : "border border-mbh-forest/15 bg-white text-mbh-body hover:border-mbh-green/40 hover:text-mbh-forest"
            }`}
          >
            {i + 1}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-mbh-forest/15 bg-white text-mbh-forest transition hover:border-mbh-green/40 disabled:pointer-events-none disabled:opacity-35"
      >
        <i className="ri-arrow-right-s-line text-lg" aria-hidden />
      </button>
    </nav>
  );
}

function BlogCard({
  post,
  priority,
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
    featured?: boolean;
  };
  priority?: boolean;
}) {
  const hasImage = Boolean(post.image?.trim());

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mbh-forest/10 bg-white shadow-sm ring-1 ring-mbh-forest/5 transition hover:-translate-y-0.5 hover:border-mbh-green/30 hover:shadow-lg hover:shadow-mbh-forest/8">
      <Link href={`/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          {hasImage ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority={priority}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mbh-forest/8 via-cream to-mbh-green/10"
              aria-hidden
            >
              <i className="ri-article-line text-5xl text-mbh-green/25" />
            </div>
          )}
          {hasImage ? (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mbh-forest-deep/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
              aria-hidden
            />
          ) : null}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.14em] text-mbh-forest shadow-sm backdrop-blur-sm">
              {post.category}
            </span>
            {post.featured ? (
              <span className="rounded-full bg-mbh-green px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                Featured
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-mbh-body/55">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-mbh-body/30" aria-hidden />
            <span>{post.readTime}</span>
          </div>
          <h2 className="font-display text-lg font-semibold leading-snug text-mbh-forest transition group-hover:text-mbh-green line-clamp-3">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-mbh-body line-clamp-3">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-forest transition group-hover:text-mbh-green">
            Read article
            <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogGrid({
  allPosts,
  allLoading,
  searchQuery,
  activeCategory,
  onCategoryChange,
}: BlogGridProps) {
  const [page, setPage] = useState(0);

  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const loading = isSearching ? searchLoading : allLoading;

  const filtered = useMemo(() => {
    const source = isSearching ? searchResults : allPosts;
    if (isSearching || activeCategory === "All") return source;
    return source.filter((p) => p.category === activeCategory);
  }, [allPosts, searchResults, isSearching, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagePosts = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, activeCategory]);

  const handlePageChange = (next: number) => {
    setPage(next);
    const el = document.getElementById("blog-grid");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categoryList = catsLoading ? ["All"] : categories;

  return (
    <>
      <section id="blog-grid" className="bg-cream-alt py-14 lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-mbh-forest md:text-3xl">
                {isSearching ? "Search results" : "All articles"}
              </h2>
              {!loading && (
                <p className="mt-2 font-body text-sm text-mbh-body">
                  {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                  {activeCategory !== "All" && !isSearching ? ` · ${activeCategory}` : ""}
                  {totalPages > 1 ? ` · Page ${page + 1} of ${totalPages}` : ""}
                </p>
              )}
            </div>

            {!isSearching ? (
              <div className="flex max-w-full flex-wrap gap-2 lg:max-w-2xl lg:justify-end">
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onCategoryChange(cat)}
                    className={`rounded-full px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                      activeCategory === cat
                        ? "bg-mbh-forest text-white shadow-sm"
                        : "border border-mbh-forest/15 bg-white text-mbh-body hover:border-mbh-green/40 hover:text-mbh-forest"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-mbh-forest/8 bg-white"
                >
                  <div className="aspect-[16/10] bg-mbh-forest/8" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-1/3 rounded bg-mbh-forest/8" />
                    <div className="h-5 w-4/5 rounded bg-mbh-forest/8" />
                    <div className="h-4 w-full rounded bg-mbh-forest/8" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!loading && pagePosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pagePosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} priority={page === 0 && index < 3} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          ) : null}

          {!loading && filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-mbh-forest/20 bg-white px-8 py-16 text-center">
              <i className="ri-article-line text-4xl text-mbh-green/40" aria-hidden />
              <p className="mt-4 font-display text-lg font-semibold text-mbh-forest">No articles found</p>
              <p className="mx-auto mt-2 max-w-sm font-body text-sm text-mbh-body">
                {isSearching
                  ? `Nothing matched “${searchQuery}”. Try another keyword or browse all topics.`
                  : "No articles in this category yet."}
              </p>
            </div>
          ) : null}
        </div>
      </section>

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
