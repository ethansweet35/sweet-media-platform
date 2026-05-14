"use client";

import { useEffect, useState } from "react";

export type HomeTestimonial = {
  quote: string;
  attribution: string;
};

/**
 * Auto-rotating testimonial block — matches the carousel on cipherbilling.com
 * homepage. Rotates every 5 seconds with manual dot controls.
 */
export default function HomeTestimonialRotator({
  testimonials,
  intervalMs = 5000,
}: {
  testimonials: readonly HomeTestimonial[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [testimonials.length, intervalMs]);

  const active = testimonials[index] ?? testimonials[0];
  if (!active) return null;

  return (
    <div>
      <blockquote className="border-none p-0">
        <p
          key={active.attribution}
          className="font-[var(--font-body)] text-sm italic leading-[1.35] text-white/95 md:text-[15px]"
        >
          &ldquo;{active.quote}&rdquo;
        </p>
        <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96]">
          {active.attribution.toUpperCase()}
        </footer>
      </blockquote>

      {testimonials.length > 1 ? (
        <div className="mt-4 flex gap-2" aria-label="Testimonial slides">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-8 rounded-full transition-colors ${
                i === index ? "bg-[#166C96]" : "bg-white/25 hover:bg-white/40"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
