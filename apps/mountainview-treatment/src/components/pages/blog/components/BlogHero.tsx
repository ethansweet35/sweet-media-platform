"use client";

import { useState } from "react";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function BlogHero({ searchQuery, onSearchChange }: BlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[var(--mvt-ink)]">
      {/* Abstract mountain contour lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1280 520"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Far ridge — outermost contour */}
        <path
          d="M-60 480 C80 460 160 340 260 300 C340 268 390 290 460 260 C540 228 580 180 660 150 C740 120 790 140 860 110 C930 82 980 60 1060 75 C1140 90 1200 120 1340 100 L1340 600 L-60 600 Z"
          fill="none"
          stroke="#7FB5B5"
          strokeWidth="0.8"
          opacity="0.08"
        />
        {/* Second ridge */}
        <path
          d="M-60 500 C60 475 140 370 240 330 C320 298 380 315 450 285 C530 252 575 205 650 172 C725 140 778 158 848 128 C918 98 972 78 1052 90 C1132 102 1195 135 1340 115 L1340 600 L-60 600 Z"
          fill="none"
          stroke="#7FB5B5"
          strokeWidth="0.8"
          opacity="0.07"
        />
        {/* Third ridge — peak emphasis */}
        <path
          d="M-60 520 C100 492 200 395 310 355 C395 322 440 342 510 310 C598 272 645 222 730 192 C808 164 855 180 935 148 C1010 118 1065 96 1145 108 C1215 118 1265 148 1340 132 L1340 600 L-60 600 Z"
          fill="none"
          stroke="#7FB5B5"
          strokeWidth="1.2"
          opacity="0.09"
        />
        {/* Foreground ridge — filled silhouette */}
        <path
          d="M-60 540 C40 515 120 430 220 395 C305 364 360 382 440 350 C530 314 590 262 685 232 C768 204 820 222 908 190 C990 160 1050 138 1140 150 C1220 160 1278 192 1340 178 L1340 600 L-60 600 Z"
          fill="#043341"
          fillOpacity="0.18"
          stroke="#7FB5B5"
          strokeWidth="1"
          opacity="0.12"
        />
        {/* Deepest foreground — darker fill */}
        <path
          d="M-60 560 C50 538 140 465 245 430 C335 400 395 418 475 386 C570 350 630 295 730 265 C815 238 870 255 960 222 C1042 192 1102 170 1190 182 C1262 192 1295 218 1340 208 L1340 600 L-60 600 Z"
          fill="#043341"
          fillOpacity="0.28"
          stroke="none"
        />
      </svg>

      {/* Soft glow orbs */}
      <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[var(--mvt-teal)]/14 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-64 w-64 rounded-full bg-[var(--mvt-teal-light)]/8 blur-[60px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-[var(--mvt-teal-light)]/6 blur-[50px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-16 pt-36 lg:px-12 lg:pb-24 lg:pt-44">
        {/* Eyebrow */}
        <p className="mvt-eyebrow-light mb-5 text-xs tracking-[0.2em]">
          MOUNTAIN VIEW TREATMENT JOURNAL
        </p>

        <div className="max-w-3xl">
          <h1 className="font-heading text-[48px] font-bold leading-[1.05] tracking-tight text-white sm:text-[60px] lg:text-[80px]">
            Guidance for the
            <br />
            <span className="text-[var(--mvt-teal-light)]">journey home.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-[1.85] text-white/65 lg:text-lg">
            Mental health, addiction recovery, trauma-informed care, and wellness resources from the Mountain View Treatment clinical team.
          </p>

          {/* Search */}
          <div
            className={`mt-10 flex max-w-lg items-center gap-3 rounded-full border bg-white/8 px-5 py-3.5 backdrop-blur-sm transition-all duration-200 ${
              isFocused
                ? "border-[var(--mvt-teal-light)]/50 bg-white/12"
                : "border-white/15"
            }`}
          >
            <i className="ri-search-line text-lg text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20"
                aria-label="Clear search"
              >
                <i className="ri-close-line text-xs" />
              </button>
            )}
          </div>

          {/* Topic tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Addiction Recovery", "Mental Health", "Trauma", "Wellness", "Family"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3.5 py-1 text-xs font-medium text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="h-10 bg-gradient-to-b from-[var(--mvt-ink)] to-white" />
    </section>
  );
}
