"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@sweetmedia/blog-core";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";
import { heroSectionPad, heroOverlayClass } from "@/lib/heroSpacing";

interface CategoryPageProps {
  slug: string;
}

interface CategoryRow {
  slug: string;
  name: string;
  is_active: boolean;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState<CategoryRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("slug,name,is_active")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setMissing(true);
      } else {
        setCategory(data as CategoryRow);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (missing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero — matches BlogHero design system */}
        <section className={`${heroOverlayClass} relative overflow-hidden bg-[#3a6697] ${heroSectionPad}`}>
          <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-white/10" />
          <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-white/10" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e97a52]/10 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2">
              <Link
                href="/"
                className="text-[10px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/70"
              >
                Home
              </Link>
              <span className="text-white/20">/</span>
              <Link
                href="/blog"
                className="text-[10px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/70"
              >
                Journal
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e97a52]">
                {loading ? "…" : (category?.name ?? "Category")}
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e97a52]">
              Category
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl">
              {loading ? "Loading…" : <>{category?.name ?? ""}</>}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              Articles, guides, and resources from the Northbound Treatment team in the{" "}
              {category?.name ?? "selected"} category.
            </p>

            {/* Search */}
            <div
              className={`mt-8 flex max-w-lg items-center gap-3 border bg-white/5 px-5 py-3.5 transition-all duration-200 ${
                isFocused ? "border-[#e97a52]/60 bg-white/10" : "border-white/15"
              }`}
            >
              <i className="ri-search-line text-lg text-white/35" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={`Search ${category?.name ?? "articles"}…`}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex h-6 w-6 items-center justify-center bg-white/10 text-white/50 transition-colors hover:bg-white/20"
                  aria-label="Clear search"
                >
                  <i className="ri-close-line text-xs" />
                </button>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e97a52] via-[#3a6697] to-[#e97a52]/30" />
        </section>

        {category ? (
          <BlogGrid searchQuery={searchQuery} lockedCategoryName={category.name} />
        ) : null}
      </main>
    </div>
  );
}
