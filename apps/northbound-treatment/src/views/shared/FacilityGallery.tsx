"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/facility";

export type FacilityKey = "newport" | "grove" | "sandiego" | "seattle";

const COUNTS: Record<FacilityKey, number> = {
  newport: 11,
  grove: 16,
  sandiego: 9,
  seattle: 5,
};

export function getFacilityImages(key: FacilityKey): string[] {
  const count = COUNTS[key];
  return Array.from({ length: count }, (_, i) => `${BASE}/${key}/${i + 1}.webp`);
}

interface FacilityGalleryProps {
  facility: FacilityKey;
  /** Inline label used in alt text — e.g. "Newport Beach" */
  locationLabel: string;
  /** Eyebrow text above the section heading */
  eyebrow?: string;
  /** Section heading; supports a single italic word via `italicWord` */
  heading?: string;
  italicWord?: string;
  /** Optional intro paragraph */
  intro?: string;
  /** Restrict initial display count (rest hidden behind "Show More"). Default: show all */
  initialCount?: number;
  /** Background variant — "white" (default) or "navy" for dark sections */
  variant?: "white" | "navy";
  /** Override accent color (defaults to terracotta-style #E8622A used across location pages) */
  accentColor?: string;
  /** Override navy color (used for dark text / dark variant background) */
  navyColor?: string;
}

/**
 * Reusable facility photo gallery with lightbox + keyboard navigation.
 *
 * Pulls the appropriate set of facility images from Supabase based on the
 * `facility` key. Used on each location page (Newport Beach, Garden Grove,
 * San Diego, Seattle) and the shared Locations index page.
 */
export default function FacilityGallery({
  facility,
  locationLabel,
  eyebrow = "Inside the Facility",
  heading,
  italicWord,
  intro,
  initialCount,
  variant = "white",
  accentColor = "#E8622A",
  navyColor = "#0B1F3A",
}: FacilityGalleryProps) {
  const all = getFacilityImages(facility);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const visibleCount = expanded || !initialCount ? all.length : Math.min(initialCount, all.length);
  const visible = all.slice(0, visibleCount);
  const canExpand = !!initialCount && all.length > initialCount && !expanded;

  // Keyboard nav for the lightbox
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % all.length));
      else if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? 0 : (i - 1 + all.length) % all.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, all.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const isDark = variant === "navy";
  const headingColor = isDark ? "text-white" : "";
  const introColor = isDark ? "text-white/70" : "text-[#4B5563]";

  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: isDark ? navyColor : "#FFFFFF" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {(eyebrow || heading || intro) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && (
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`font-heading text-4xl font-bold md:text-5xl ${headingColor}`}
                style={!isDark ? { color: navyColor } : undefined}
              >
                {italicWord ? renderHeadingWithItalic(heading, italicWord, accentColor) : heading}
              </h2>
            )}
            {intro && (
              <p className={`mt-4 text-base leading-relaxed ${introColor}`}>{intro}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {visible.map((src, i) => {
            // Visual rhythm — make every 7th tile span 2 columns/rows on lg
            const featured = i % 7 === 0 && i !== 0;
            return (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl bg-[#0B1F3A]/5 shadow-sm transition-shadow hover:shadow-xl ${
                  featured ? "lg:col-span-2 lg:row-span-2" : ""
                } aspect-[4/3]`}
                aria-label={`View larger photo ${i + 1} of ${locationLabel} facility`}
              >
                <Image
                  src={src}
                  alt={`${locationLabel} facility — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span
                  className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: navyColor }}
                  aria-hidden="true"
                >
                  <i className="ri-search-2-line"></i>
                </span>
              </button>
            );
          })}
        </div>

        {canExpand && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              View All {all.length} Photos
              <i className="ri-arrow-down-line"></i>
            </button>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${locationLabel} facility photo viewer`}
        >
          <button
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
            aria-label="Close photo viewer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          <button
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? 0 : (i - 1 + all.length) % all.length));
            }}
            aria-label="Previous photo"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>

          <button
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? 0 : (i + 1) % all.length));
            }}
            aria-label="Next photo"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={all[active]}
              alt={`${locationLabel} facility — photo ${active + 1} of ${all.length}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {active + 1} / {all.length} — {locationLabel}
          </p>
        </div>
      )}
    </section>
  );
}

function renderHeadingWithItalic(heading: string, italicWord: string, accent: string) {
  const idx = heading.toLowerCase().indexOf(italicWord.toLowerCase());
  if (idx === -1) return heading;
  const before = heading.slice(0, idx);
  const word = heading.slice(idx, idx + italicWord.length);
  const after = heading.slice(idx + italicWord.length);
  return (
    <>
      {before}
      <span className="italic" style={{ color: accent }}>
        {word}
      </span>
      {after}
    </>
  );
}
