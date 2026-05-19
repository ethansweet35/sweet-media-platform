"use client";

import { heroSectionPad } from "@/lib/heroSpacing";
import { useState } from "react";
import Link from "next/link";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className={`relative overflow-hidden bg-[#3a6697] ${heroSectionPad}`}>
      {/* Architectural corner accents */}
      <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-white/10" />
      <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-white/10" />

      {/* Terracotta glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e97a52]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#e97a52]/5 blur-3xl" />

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
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#e97a52]">Journal</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* Left — headline */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e97a52]">
              Northbound Treatment Journal
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Recovery <span className="italic text-[#e97a52]">Insights</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              Clinical guidance on addiction, mental health, trauma, and the path to lasting recovery — from the Northbound Treatment team.
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
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search articles…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="flex h-6 w-6 items-center justify-center bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Clear search"
                >
                  <i className="ri-close-line text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* Right — trust strip */}
          <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-4">
            {[
              { value: "38+", label: "Years of expertise" },
              { value: "10k+", label: "Lives changed" },
              { value: ">97%", label: "Abstinence rate" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p className="font-heading text-3xl font-bold text-[#e97a52]">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e97a52] via-[#3a6697] to-[#e97a52]/30" />
    </section>
  );
}
