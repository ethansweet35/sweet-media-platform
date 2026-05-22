"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type CarouselSlide = {
  src: string;
  alt: string;
};

interface FacilityPhotoCarouselProps {
  slides: CarouselSlide[];
  /** Accessible label for the carousel region */
  ariaLabel?: string;
  className?: string;
}

/**
 * Horizontally scrollable facility photo carousel with prev/next controls,
 * dot indicators, and scroll-snap. Used for location intro split sections.
 */
export default function FacilityPhotoCarousel({
  slides,
  ariaLabel = "Facility photo gallery",
  className = "",
}: FacilityPhotoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || slides.length === 0) return;
    const next = ((index % slides.length) + slides.length) % slides.length;
    const slideWidth = track.clientWidth;
    track.scrollTo({ left: slideWidth * next, behavior: "smooth" });
    setActive(next);
  }, [slides.length]);

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

  return (
    <div className={`relative ${className}`} aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto rounded-3xl shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={slide.src} className="relative h-full w-full shrink-0 snap-center snap-always">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-white"
            aria-label="Previous photo"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-white"
            aria-label="Next photo"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-terracotta" : "w-2 bg-white/80 hover:bg-white"
                }`}
                aria-label={`Go to photo ${i + 1} of ${slides.length}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
