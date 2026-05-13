"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-ink py-[100px]">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

      <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            href="/"
            className="text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-accent transition-colors"
          >
            Home
          </Link>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-accent">
            Blog
          </span>
        </div>

        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-5">
            Rize OC Blog
          </p>

          <h1
            className="font-[family-name:var(--font-display)] font-normal text-white leading-[0.95]"
            style={{ fontSize: "clamp(48px, 6vw, 84px)" }}
          >
            Insights for
            <br />
            <em className="italic text-white/55">healing &amp; recovery.</em>
          </h1>

          <p className="mt-7 text-[16px] font-light leading-relaxed text-white/65 max-w-2xl">
            Mental health, addiction recovery, trauma-informed care, and wellness resources from the Rize OC clinical team.
          </p>

          {/* Search */}
          <div
            className={`mt-10 max-w-xl flex items-center gap-3 border px-5 py-3.5 transition-all duration-200 ${
              isFocused
                ? "border-accent/50 bg-white/8"
                : "border-white/15 bg-white/5"
            }`}
          >
            <i className="ri-search-line text-white/40 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/60 transition-colors"
                aria-label="Clear search"
              >
                <i className="ri-close-line text-xs" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
