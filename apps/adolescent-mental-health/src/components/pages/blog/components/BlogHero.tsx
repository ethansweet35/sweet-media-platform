"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BLOG_CONTAINER,
  BLOG_HEADING,
  BLOG_HERO_PAD,
} from "@/components/pages/blog/blogTokens";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  topicOptions: string[];
}

const TOPIC_ICONS: Record<string, string> = {
  "Virtual IOP": "ri-computer-line",
  Anxiety: "ri-heart-pulse-line",
  Depression: "ri-emotion-sad-line",
  "School Avoidance": "ri-school-line",
  "Family Support": "ri-group-line",
  "Mental Health": "ri-heart-pulse-line",
  "Teen Therapy": "ri-user-heart-line",
};

function topicIcon(label: string) {
  return TOPIC_ICONS[label] ?? "ri-bookmark-line";
}

export default function BlogHero({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  topicOptions,
}: BlogHeroProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[90px]" />

      <div className={`relative px-6 lg:px-10 ${BLOG_HERO_PAD}`}>
        <div className={BLOG_CONTAINER}>
          <div className="mb-6 flex items-center gap-2">
            <Link
              href="/"
              className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 transition hover:text-white/70"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Blog</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Parent resources</p>

              <h1
                className="mt-3 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
                style={BLOG_HEADING}
              >
                Guidance for{" "}
                <span className="text-accent">teen mental health</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                Evidence-based articles on Virtual IOP, adolescent therapy, school avoidance, anxiety, depression, and
                supporting your family through care.
              </p>

              <div
                className={`mt-8 flex max-w-xl items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-sm transition-all duration-200 ${
                  isFocused
                    ? "border-accent/50 bg-white/10 ring-2 ring-accent/20"
                    : "border-white/15 bg-white/5"
                }`}
              >
                <i className="ri-search-line text-lg text-white/40" aria-hidden />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search articles..."
                  aria-label="Search blog articles"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                    aria-label="Clear search"
                  >
                    <i className="ri-close-line text-xs" aria-hidden />
                  </button>
                ) : null}
              </div>

              {topicOptions.length > 0 ? (
                <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-0.5 lg:hidden">
                  {["All", ...topicOptions].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        onSearchChange("");
                        onCategoryChange(label);
                      }}
                      className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
                        activeCategory === label
                          ? "bg-accent text-white"
                          : "border border-white/15 bg-white/5 text-white/70"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {topicOptions.length > 0 ? (
              <div className="hidden lg:block lg:pt-1">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                  Browse by topic
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {topicOptions.map((topic) => {
                    const selected = activeCategory === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          onSearchChange("");
                          onCategoryChange(topic);
                        }}
                        className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left transition ${
                          selected
                            ? "border-accent/40 bg-accent/15 text-white"
                            : "border-white/10 bg-white/5 text-white/70 hover:border-accent/30 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                            selected ? "bg-accent text-white" : "bg-white/10 text-accent"
                          }`}
                        >
                          <i className={`${topicIcon(topic)} text-sm`} aria-hidden />
                        </span>
                        <span className="text-sm font-semibold leading-tight">{topic}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
