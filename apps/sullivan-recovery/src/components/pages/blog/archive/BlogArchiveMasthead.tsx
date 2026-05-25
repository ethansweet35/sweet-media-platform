"use client";

import Link from "next/link";

type BlogArchiveMastheadProps = {
  articleCount?: number;
};

export default function BlogArchiveMasthead({ articleCount }: BlogArchiveMastheadProps) {
  return (
    <header className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)]">
      <div className="sr-container py-8 md:py-10">
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-[12px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-[var(--sr-muted)] transition hover:text-[var(--sr-fern)]"
          >
            Home
          </Link>
          <span className="text-[var(--sr-sand)]" aria-hidden>
            /
          </span>
          <span className="font-medium text-[var(--sr-fern)]">Insights</span>
        </nav>

        <div className="max-w-3xl">
          <p className="sr-eyebrow mb-3">The Recovery Journal</p>
          <h1
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Stories &amp; guidance for{" "}
            <span className="italic text-[var(--sr-fern)]">the road ahead</span>
          </h1>
          <p
            className="mt-4 text-[15px] leading-[1.8] text-[var(--sr-body)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Expert perspectives on detox, recovery, and mental health from Sullivan Recovery
            in Mission Viejo.
          </p>
        </div>
      </div>

      {/* Compact stats strip — not a tall side panel */}
      <div className="border-t border-[var(--sr-sand)] bg-[var(--sr-moss)]">
        <div className="sr-container py-5 md:py-6">
          <ul
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <li className="flex items-baseline gap-3">
              <span
                className="text-3xl font-light tabular-nums text-white md:text-4xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {articleCount ?? "—"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/55">
                Published articles
              </span>
            </li>
            <li className="hidden h-8 w-px bg-white/15 sm:block" aria-hidden />
            <li className="text-[12px] leading-relaxed text-white/70">
              <span className="block text-[10px] uppercase tracking-[0.14em] text-[var(--sr-sage)]">
                Sullivan Recovery · Orange County
              </span>
              Detox &amp; recovery · Mission Viejo focus
            </li>
            <li>
              <Link
                href="/programs/detox/drugs/"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--sr-sage)] transition hover:text-white"
              >
                Drug detox program
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
