"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FacilityGallerySlide } from "@/data/facilityGallery";

interface FacilityPhotoCarouselProps {
  slides: FacilityGallerySlide[];
  ariaLabel?: string;
  className?: string;
}

/**
 * Facility photo carousel — scroll-snap track, arrows, dots, and thumbnail strip.
 */
export default function FacilityPhotoCarousel({
  slides,
  ariaLabel = "Facility photo gallery",
  className = "",
}: FacilityPhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || slides.length === 0) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      const slideWidth = track.clientWidth;
      track.scrollTo({ left: slideWidth * next, behavior: "smooth" });
      setActive(next);
    },
    [slides.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideWidth = track.clientWidth;
      if (!slideWidth) return;
      setActive(Math.round(track.scrollLeft / slideWidth));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (slides.length === 0) return null;

  const slide = slides[active];

  return (
    <div className={className}>
      <div className="relative" aria-roledescription="carousel" aria-label={ariaLabel}>
        <div
          ref={trackRef}
          className="flex aspect-[16/9] snap-x snap-mandatory overflow-x-auto rounded-2xl bg-mbh-forest/5 shadow-xl shadow-mbh-forest/10 ring-1 ring-mbh-forest/10 [scrollbar-width:none] sm:aspect-[21/9] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((item, i) => (
            <div
              key={item.src}
              className="relative h-full w-full shrink-0 snap-center snap-always"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority={i === 0}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-mbh-forest-deep/85 via-mbh-forest-deep/25 to-transparent px-6 pb-5 pt-20"
                aria-hidden
              >
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-mbh-sage">
                  {item.caption}
                </p>
                <p className="mt-1 font-body text-xs text-white/70">
                  {i + 1} of {slides.length}
                </p>
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-mbh-forest shadow-lg transition hover:bg-white"
              aria-label="Previous photo"
            >
              <i className="ri-arrow-left-s-line text-xl" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-mbh-forest shadow-lg transition hover:bg-white"
              aria-label="Next photo"
            >
              <i className="ri-arrow-right-s-line text-xl" aria-hidden />
            </button>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-7 bg-mbh-green" : "w-2 bg-white/75 hover:bg-white"
                  }`}
                  aria-label={`Go to photo ${i + 1}: ${item.caption}`}
                  aria-current={i === active ? "true" : undefined}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Facility photo thumbnails"
        >
          {slides.map((item, i) => (
            <button
              key={`thumb-${item.src}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`View ${item.caption}`}
              onClick={() => scrollToIndex(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-28 ${
                i === active
                  ? "ring-mbh-green shadow-md"
                  : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
                aria-hidden
              />
            </button>
          ))}
        </div>
      ) : null}

      {slide ? (
        <p className="mt-3 text-center font-body text-sm text-mbh-body/80 sm:text-left">
          <span className="font-semibold text-mbh-forest">{slide.caption}</span>
          <span className="text-mbh-body/50"> · Springfield, MO</span>
        </p>
      ) : null}
    </div>
  );
}
