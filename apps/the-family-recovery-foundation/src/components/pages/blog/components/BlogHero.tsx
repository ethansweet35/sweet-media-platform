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
    <section className="relative overflow-hidden bg-deep-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-tfrf-blue/85 to-sky-blue/35" />
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-sky-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-powder-blue/20 blur-3xl" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-24">
        <nav className="mb-6 flex items-center gap-2 text-[12px] font-body font-semibold uppercase tracking-[0.18em] text-pure-white/60">
          <Link href="/" className="transition-colors hover:text-pure-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-sky-blue">Resources</span>
        </nav>

        <div className="max-w-3xl">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
            The Family Recovery Foundation Journal
          </p>
          <h1 className="text-[clamp(36px,5vw,64px)] font-display text-pure-white leading-[1.08] mb-6">
            Thoughtful guidance for{" "}
            <em className="italic text-powder-blue">healing at home</em>
          </h1>
          <p className="text-body-l font-body text-pure-white/85 leading-relaxed max-w-2xl mb-10">
            Mental health, addiction recovery, and family-centered resources from The Family Recovery
            Foundation team.
          </p>

          <div
            className={`flex max-w-xl items-center gap-3 rounded-full border px-5 py-3 transition-all duration-200 ${
              isFocused
                ? "border-sky-blue/60 bg-pure-white/15"
                : "border-pure-white/20 bg-pure-white/10"
            }`}
          >
            <i className="ri-search-line text-lg text-pure-white/50" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-body-s font-body text-pure-white placeholder:text-pure-white/40 focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-pure-white/15 text-pure-white/70 transition-colors hover:bg-pure-white/25"
                aria-label="Clear search"
              >
                <i className="ri-close-line text-sm" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
