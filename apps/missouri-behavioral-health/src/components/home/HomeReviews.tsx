"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CONTAINER } from "@/data/site";
import {
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_SUMMARY,
  GOOGLE_REVIEWS_URL,
  type GoogleReview,
} from "@/data/googleReviews";

function StarRow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-mbh-green ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="ri-star-fill text-sm" />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="h-full rounded-2xl border border-mbh-forest/10 bg-white p-5 shadow-sm ring-1 ring-mbh-forest/5 sm:p-6">
      <StarRow className="mb-3" />
      <blockquote className="font-body text-[0.9375rem] leading-relaxed text-mbh-body">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <footer className="mt-4 border-t border-mbh-forest/8 pt-3">
        <cite className="not-italic">
          <p className="font-display text-base font-semibold text-mbh-forest">{review.name}</p>
          <p className="mt-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-mbh-body/55">
            Google review
          </p>
        </cite>
      </footer>
    </article>
  );
}

export default function HomeReviews() {
  const [active, setActive] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSlidesPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(GOOGLE_REVIEWS.length / slidesPerView));

  useEffect(() => {
    setActive((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  const goToPage = useCallback(
    (page: number) => {
      setActive(((page % pageCount) + pageCount) % pageCount);
    },
    [pageCount],
  );

  const visibleReviews = GOOGLE_REVIEWS.slice(
    active * slidesPerView,
    active * slidesPerView + slidesPerView,
  );

  return (
    <section className="border-b border-mbh-forest/10 bg-cream py-16 lg:py-20" aria-labelledby="home-reviews-heading">
      <div className={CONTAINER}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Patient reviews
              </span>
            </div>
            <h2
              id="home-reviews-heading"
              className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest"
            >
              Trusted by families across{" "}
              <span className="italic font-medium text-mbh-green">Missouri.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 rounded-2xl border border-mbh-forest/10 bg-white px-6 py-5 shadow-sm sm:items-end sm:text-right">
            <p className="font-display text-2xl font-semibold uppercase tracking-wide text-mbh-forest">
              {GOOGLE_REVIEWS_SUMMARY.label}
            </p>
            <StarRow />
            <p className="font-body text-sm text-mbh-body">
              <span className="font-semibold text-mbh-forest">
                {GOOGLE_REVIEWS_SUMMARY.ratingValue.toFixed(1)}
              </span>{" "}
              · Based on{" "}
              <span className="font-semibold text-mbh-forest">
                {GOOGLE_REVIEWS_SUMMARY.reviewCount} Google reviews
              </span>
            </p>
            <Link
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-xs font-semibold text-mbh-forest transition hover:text-mbh-green"
            >
              <i className="ri-google-fill text-base" aria-hidden />
              Read all on Google
              <i className="ri-arrow-right-up-line text-sm" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            key={active}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Google reviews"
            aria-live="polite"
          >
            {visibleReviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>

          {pageCount > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goToPage(active - 1)}
                className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-mbh-forest shadow-lg ring-1 ring-mbh-forest/10 transition hover:bg-cream sm:flex lg:-left-5"
                aria-label="Previous reviews"
              >
                <i className="ri-arrow-left-s-line text-xl" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goToPage(active + 1)}
                className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-mbh-forest shadow-lg ring-1 ring-mbh-forest/10 transition hover:bg-cream sm:flex lg:-right-5"
                aria-label="Next reviews"
              >
                <i className="ri-arrow-right-s-line text-xl" aria-hidden />
              </button>

              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToPage(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-7 bg-mbh-green" : "w-2 bg-mbh-forest/20 hover:bg-mbh-forest/35"
                    }`}
                    aria-label={`Reviews page ${i + 1}`}
                    aria-current={i === active ? "true" : undefined}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
