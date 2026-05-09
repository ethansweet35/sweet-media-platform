"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@sweetmedia/blog-core";
import BlogGrid from "@/components/pages/blog/components/BlogGrid";

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
        <section className="relative w-full overflow-hidden bg-[#1F2937]">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #F8FAFC 1px, transparent 0)",
              backgroundSize: "34px 34px",
            }}
          />
          <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#DDA15E]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#8FA489]/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-8 md:px-16 pt-36 pb-20 md:pt-44 md:pb-28">
            <div className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="text-[10px] tracking-[0.25em] uppercase text-[#E2E8F0]/45 hover:text-[#E2E8F0]/80 transition-colors"
              >
                Home
              </Link>
              <span className="text-[#E2E8F0]/25">/</span>
              <Link
                href="/blog"
                className="text-[10px] tracking-[0.25em] uppercase text-[#E2E8F0]/45 hover:text-[#E2E8F0]/80 transition-colors"
              >
                Resources
              </Link>
              <span className="text-[#E2E8F0]/25">/</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#DDA15E]">
                {loading ? "…" : category?.name ?? "Category"}
              </span>
            </div>

            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-[0.35em] text-[#DDA15E] font-medium">
                Category
              </span>

              <h1
                className="font-serif text-[#F8FAFC] leading-[1.08] mt-6 mb-6"
                style={{ fontSize: "clamp(42px, 6vw, 78px)" }}
              >
                {loading ? "Loading…" : category?.name ?? ""}
              </h1>

              <p className="text-[#E2E8F0]/70 font-light text-base md:text-lg leading-[1.9] max-w-2xl mb-10">
                Articles, guides, and resources from the Northbound Treatment
                team in the {category?.name ?? "selected"} category.
              </p>

              <div className="max-w-xl flex items-center gap-3 bg-[#F8FAFC]/10 backdrop-blur-sm border border-[#F8FAFC]/15 rounded-full px-5 py-3">
                <i className="ri-search-line text-[#E2E8F0]/45 text-lg" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${category?.name ?? "articles"}...`}
                  className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder:text-[#E2E8F0]/35 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {category ? (
          <BlogGrid searchQuery={searchQuery} lockedCategoryName={category.name} />
        ) : null}
      </main>
    </div>
  );
}
