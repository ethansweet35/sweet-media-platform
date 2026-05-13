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
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#DDA15E]">
            Resources
          </span>
        </div>

        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.35em] text-[#DDA15E] font-medium">
            Simple Health Journal
          </span>

          <h1
            className="font-serif text-[#F8FAFC] leading-[1.08] mt-6 mb-6"
            style={{ fontSize: "clamp(42px, 6vw, 78px)" }}
          >
            Thoughtful guidance for{" "}
            <em className="text-[#DDA15E]">healing at home.</em>
          </h1>

          <p className="text-[#E2E8F0]/70 font-light text-base md:text-lg leading-[1.9] max-w-2xl mb-10">
            Mental health, addiction recovery, trauma-informed care, and wellness resources from the Simple Health team.
          </p>

          <div
            className={`max-w-xl flex items-center gap-3 bg-[#F8FAFC]/10 backdrop-blur-sm border rounded-full px-5 py-3 transition-all duration-200 ${
              isFocused ? "border-[#DDA15E]/50 bg-[#F8FAFC]/15" : "border-[#F8FAFC]/15"
            }`}
          >
            <i className="ri-search-line text-[#E2E8F0]/45 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder:text-[#E2E8F0]/35 focus:outline-none"
            />
            {searchQuery && (
              <button
              onClick={() => onSearchChange("")}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F8FAFC]/10 hover:bg-[#F8FAFC]/20 text-[#E2E8F0]/60 transition-colors cursor-pointer"
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
