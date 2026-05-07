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
    <section className="relative w-full bg-[#101E3F]">
      {/* Top rule */}
      <div className="w-full h-1 bg-[#166C96]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Home
          </Link>
          <span className="text-white/20 text-xs">›</span>
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[#166C96]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Resource Hub
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-[#166C96]" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-[#166C96] font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Cipher Billing · Resource Hub
              </span>
            </div>

            <h1
              className="text-[#F8FAFC] leading-[1.05]"
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "clamp(36px, 5vw, 68px)",
              }}
            >
              Billing intelligence
              <br />
              <span className="text-[#166C96]">built for behavioral health.</span>
            </h1>

            <p
              className="text-white/55 text-sm md:text-base leading-[1.85] mt-6 max-w-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Coding guides, reimbursement rate tables, compliance updates, and RCM strategy — written by billers who specialize in mental health and substance use treatment.
            </p>
          </div>

          {/* Search */}
          <div className="lg:mb-1">
            <p
              className="text-[9px] tracking-[0.35em] uppercase text-white/30 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Search articles
            </p>
            <div
              className={`flex items-center gap-3 border px-4 py-3 bg-white/5 transition-all duration-200 ${
                isFocused ? "border-[#166C96] bg-white/8" : "border-white/15"
              }`}
              style={{ minWidth: "300px" }}
            >
              <i className="ri-search-line text-white/35 text-base flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="e.g. CPT 90837, prior auth..."
                className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/25 focus:outline-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  aria-label="Clear"
                >
                  <i className="ri-close-line text-sm" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 max-w-sm">
          {[
            { val: "25+", label: "Articles" },
            { val: "10+", label: "CPT guides" },
            { val: "50", label: "States covered" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "'Marcellus', serif" }}
              >
                {s.val}
              </p>
              <p
                className="text-[10px] tracking-[0.2em] uppercase text-white/35 mt-0.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
