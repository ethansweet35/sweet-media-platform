"use client";

import Link from "next/link";
import { CONTAINER } from "@/data/site";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  articleCount?: number;
}

export default function BlogHero({ searchQuery, onSearchChange, articleCount }: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-mbh-forest/10 bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-mbh-green via-mbh-green/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-8 font-display text-[clamp(6rem,18vw,11rem)] font-bold leading-none tracking-tighter text-mbh-forest/[0.04] select-none"
      >
        MBH
      </div>

      <div className={`${CONTAINER} relative py-14 lg:py-20`}>
        <nav
          className="mb-8 flex items-center gap-2 font-body text-[11px] text-mbh-body/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition hover:text-mbh-forest">
            Home
          </Link>
          <i className="ri-arrow-right-s-line" aria-hidden />
          <span className="text-mbh-forest/70">Insights</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Recovery resources
              </span>
            </div>
            <h1
              className="font-display font-semibold leading-[1.04] tracking-[-0.03em] text-mbh-forest"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              Evidence-based guidance for{" "}
              <span className="italic font-medium text-mbh-green">healing at home.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Articles on mental health, addiction recovery, trauma-informed care, and outpatient
              treatment — written by the Missouri Behavioral Health clinical team.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-mbh-forest/10 bg-white p-5 shadow-sm ring-1 ring-mbh-forest/5">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <div className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3 ring-1 ring-mbh-forest/8">
                <i className="ri-search-line text-lg text-mbh-green" aria-hidden />
                <input
                  id="blog-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search topics, conditions, care levels…"
                  className="min-w-0 flex-1 bg-transparent font-body text-sm text-mbh-ink placeholder:text-mbh-body/45 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-mbh-body/60 transition hover:bg-mbh-forest/8 hover:text-mbh-forest"
                    aria-label="Clear search"
                  >
                    <i className="ri-close-line" aria-hidden />
                  </button>
                ) : null}
              </div>
              {typeof articleCount === "number" ? (
                <p className="mt-3 font-body text-[11px] text-mbh-body/60">
                  <span className="font-semibold text-mbh-forest">{articleCount}</span> published
                  articles
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
