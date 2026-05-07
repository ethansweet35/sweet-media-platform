"use client";

import { useState } from "react";
import Link from "next/link";

interface CipherBlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

/** Cipher Billing blog index hero — navy / accent aligned with marketing pages */
export default function CipherBlogHero({ searchQuery, onSearchChange }: CipherBlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#101E3F]">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#166C96]/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#166C96]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1140px] px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
        <div className="mb-8 flex items-center gap-2">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white/80"
          >
            Home
          </Link>
          <span className="text-white/25">/</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#166C96]">Blog</span>
        </div>

        <div className="max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#166C96]">
            Insights &amp; updates
          </span>

          <h1 className="font-[var(--font-heading)] mt-6 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1] text-white">
            Behavioral health billing{" "}
            <span className="text-[#166C96]">insights</span>
          </h1>

          <p className="mb-10 mt-6 max-w-2xl text-base font-light leading-relaxed text-white/75 md:text-lg">
            Revenue cycle management trends, compliance guidance, and practical articles from the Cipher Billing team.
          </p>

          <div
            className={`flex max-w-xl items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-sm transition-all duration-200 ${
              isFocused ? "border-[#166C96]/55 bg-white/10" : "border-white/15 bg-white/5"
            }`}
          >
            <i className="ri-search-line text-lg text-white/45" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20"
                aria-label="Clear search"
              >
                <i className="ri-close-line text-xs" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
