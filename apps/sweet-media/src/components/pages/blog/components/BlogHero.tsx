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
    <section className="relative w-full overflow-hidden" style={{ background: "#0A1F44" }}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft glow orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative max-w-screen-xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8 justify-center lg:justify-start">
          <Link href="/" className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">
            Home
          </Link>
          <i className="ri-arrow-right-s-line text-white/25 text-[9px]"></i>
          <span className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-widest uppercase text-white/60">Blog</span>
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="w-10 h-px bg-white/30" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-semibold">
              Insights &amp; Strategy
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6 text-center lg:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Sweet Media{" "}
            <em className="italic" style={{ color: "#7B9FD4" }}>
              Journal
            </em>
          </h1>

          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0 mb-10">
            Data-driven insights, compliance updates, and proven strategies for behavioral health marketing leaders.
          </p>

          {/* Search bar */}
          <div className={`max-w-lg mx-auto lg:mx-0 flex items-center gap-3 bg-white/10 backdrop-blur-sm border rounded-xl px-4 py-3 transition-all duration-200 ${isFocused ? "border-white/30 bg-white/15" : "border-white/10"}`}>
            <i className="ri-search-line text-white/40 text-lg"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles, topics, or authors..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/50 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
