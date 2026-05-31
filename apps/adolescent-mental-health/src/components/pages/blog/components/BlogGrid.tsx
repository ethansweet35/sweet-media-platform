"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AmhButton } from "@/components/marketing";
import {
  usePaginatedBlogPosts,
  useSearchBlogPosts,
  useBlogCategories,
} from "@sweetmedia/blog-core";
import {
  BLOG_CONTAINER,
  BLOG_GRID_TOP,
  BLOG_HEADING,
  BLOG_PAGE_SIZE,
  BLOG_SECTION,
  blogAuthorInitials,
  blogAuthorName,
} from "@/components/pages/blog/blogTokens";

interface BlogGridProps {
  searchQuery: string;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function PaginationControls({
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
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-body transition hover:border-accent/50 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <i className="ri-arrow-left-s-line text-base" aria-hidden />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const isActive = i === page;
        const show =
          i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1;
        const showEllipsisBefore = i === 1 && page > 3;
        const showEllipsisAfter = i === totalPages - 2 && page < totalPages - 4;

        if (!show) return null;

        if (showEllipsisBefore || showEllipsisAfter) {
          return (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-body/50"
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
            className={`flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
              isActive
                ? "bg-dark text-white shadow-sm"
                : "border border-border bg-white text-body hover:border-accent/50 hover:text-ink"
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
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-body transition hover:border-accent/50 hover:text-ink disabled:pointer-events-none disabled:opacity-30"
      >
        <i className="ri-arrow-right-s-line text-base" aria-hidden />
      </button>
    </nav>
  );
}

export default function BlogGrid({ searchQuery, activeCategory, onCategoryChange }: BlogGridProps) {
  const filterKey = `${searchQuery}|${activeCategory}`;
  const [pagination, setPagination] = useState({ page: 0, filterKey });
  const page = pagination.filterKey === filterKey ? pagination.page : 0;

  const { posts, total, loading } = usePaginatedBlogPosts(page, BLOG_PAGE_SIZE, activeCategory);
  const { posts: searchResults, loading: searchLoading } = useSearchBlogPosts(searchQuery);
  const { categories, loading: catsLoading } = useBlogCategories();

  const isSearching = searchQuery.trim().length > 0;
  const searchTotal = searchResults.length;
  const searchTotalPages = Math.ceil(searchTotal / BLOG_PAGE_SIZE);
  const searchPagePosts = searchResults.slice(
    page * BLOG_PAGE_SIZE,
    page * BLOG_PAGE_SIZE + BLOG_PAGE_SIZE,
  );

  const displayPosts = isSearching ? searchPagePosts : posts;
  const displayLoading = isSearching ? searchLoading : loading;
  const totalPages = isSearching ? searchTotalPages : Math.ceil(total / BLOG_PAGE_SIZE);
  const resultTotal = isSearching ? searchTotal : total;

  function handleCategoryChange(category: string) {
    onCategoryChange(category);
  }

  function handlePageChange(nextPage: number) {
    setPagination({ page: nextPage, filterKey });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const categoryPills = catsLoading
    ? ["All", "Mental Health", "Virtual IOP", "Family Support", "Teen Therapy"]
    : ["All", ...categories.filter((c) => c !== "All")];

  return (
    <section className={`${BLOG_SECTION} ${BLOG_GRID_TOP} bg-surface px-6 lg:px-10`}>
      <div className={BLOG_CONTAINER}>
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
              {isSearching ? `Results for "${searchQuery}"` : "Latest articles"}
            </p>
            <h2 className="text-2xl font-bold text-ink md:text-3xl" style={BLOG_HEADING}>
              {isSearching
                ? `${resultTotal} ${resultTotal === 1 ? "article" : "articles"} found`
                : activeCategory === "All"
                  ? "All insights"
                  : activeCategory}
            </h2>
            {!displayLoading ? (
              <p className="mt-1.5 text-sm text-body">
                {resultTotal} {resultTotal === 1 ? "article" : "articles"} in this view
                {totalPages > 1
                  ? ` · Page ${page + 1} of ${totalPages}`
                  : ""}
              </p>
            ) : null}
          </div>

          {!isSearching ? (
            <div className="flex max-w-full flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {categoryPills.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-dark text-white shadow-sm"
                      : "border border-border bg-white text-body hover:border-accent/50 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {displayLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {Array.from({ length: BLOG_PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-3xl border border-border bg-white"
              >
                <div className="aspect-[16/10] bg-surface-muted" />
                <div className="space-y-3 p-5 md:p-6">
                  <div className="h-3 w-1/3 rounded bg-surface" />
                  <div className="h-5 w-3/4 rounded bg-surface" />
                  <div className="h-4 w-full rounded bg-surface" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!displayLoading && displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {displayPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-ink/5"
                >
                  <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={750}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="block aspect-[16/10] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark/25 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="absolute left-3 top-3">
                        <span className="inline-block rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink shadow-sm backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-body">
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3
                        className="mb-2.5 line-clamp-2 text-lg font-bold leading-snug text-ink transition group-hover:text-accent-dark"
                        style={BLOG_HEADING}
                      >
                        {post.title}
                      </h3>

                      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-body">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-border pt-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-dark">
                            <span className="text-[10px] font-bold text-white">
                              {blogAuthorInitials(post.author)}
                            </span>
                          </div>
                          <span className="text-[11px] text-body">{blogAuthorName(post.author)}</span>
                        </div>

                        <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-dark transition group-hover:text-accent">
                          Read
                          <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <PaginationControls
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}

        {!displayLoading && displayPosts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white px-8 py-20 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-accent">
              <i className="ri-article-line text-2xl" aria-hidden />
            </span>
            <h3 className="text-lg font-bold text-ink" style={BLOG_HEADING}>
              {isSearching
                ? "No matching articles"
                : activeCategory !== "All"
                  ? "No articles in this category yet"
                  : "Articles coming soon"}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-body">
              {isSearching
                ? `We couldn't find anything for "${searchQuery}". Try a different keyword or browse all topics.`
                : activeCategory !== "All"
                  ? "Check back soon — we're regularly publishing new guidance for parents and caregivers."
                  : "Content is being prepared for launch. Preview the article layout to confirm typography, blocks, and CTAs before import."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {!isSearching && activeCategory === "All" && total === 0 ? (
                <AmhButton href="/blog/demo" variant="primary" icon="ri-layout-line">
                  Preview article template
                </AmhButton>
              ) : null}
              {!isSearching && activeCategory !== "All" ? (
                <button
                  type="button"
                  onClick={() => handleCategoryChange("All")}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-accent/50 hover:text-accent-dark"
                >
                  View all articles
                  <i className="ri-arrow-right-line text-sm" aria-hidden />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
