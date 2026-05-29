"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import FacilityPhotoCarousel from "@/components/home/FacilityPhotoCarousel";
import { FACILITY_GALLERY_SLIDES } from "@/data/facilityGallery";
import { CONTAINER, FACILITY_ADDRESS, SITE_IMAGES, SITE_VIDEOS } from "@/data/site";

const HIGHLIGHTS = [
  {
    icon: "ri-home-heart-line",
    title: "Comfortable recovery spaces",
    body: "Warm, residential-style common areas designed to help you feel safe and supported.",
  },
  {
    icon: "ri-group-line",
    title: "Group & clinical rooms",
    body: "Dedicated spaces for therapy groups, individual sessions, and psychiatric care.",
  },
  {
    icon: "ri-map-pin-2-line",
    title: "Springfield campus",
    body: FACILITY_ADDRESS,
  },
] as const;

/**
 * Tour Our Facility — live homepage section with facility walkthrough video.
 */
export default function HomeFacilityTour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    void el.play();
    setIsPlaying(true);
  }, []);

  return (
    <section className="overflow-hidden bg-white py-[100px]" aria-labelledby="facility-tour-heading">
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Video column */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-mbh-forest-deep shadow-2xl shadow-mbh-forest/15 ring-1 ring-mbh-forest/10">
              <div className="relative aspect-[16/10] w-full">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  poster={SITE_IMAGES.facilityCampus}
                  playsInline
                  controls={isPlaying}
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => {
                    if (videoRef.current?.paused) setIsPlaying(false);
                  }}
                  onEnded={() => setIsPlaying(false)}
                  aria-label="Tour of Missouri Behavioral Health treatment facility"
                >
                  <source src={SITE_VIDEOS.facilityTour} type="video/mp4" />
                </video>

                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-mbh-forest-deep/35 transition hover:bg-mbh-forest-deep/45"
                    aria-label="Play facility tour video"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-mbh-forest shadow-xl transition hover:scale-105">
                      <i className="ri-play-fill text-3xl pl-1" aria-hidden />
                    </span>
                    <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      Watch facility tour
                    </span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Decorative offset frame */}
            <div
              className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-2xl border border-mbh-green/25 lg:block"
              aria-hidden
            />
          </div>

          {/* Copy column */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Our Campus
              </span>
            </div>

            <h2
              id="facility-tour-heading"
              className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest"
            >
              Tour our{" "}
              <span className="italic font-medium text-mbh-green">facility</span>
            </h2>

            <p className="mt-6 font-body text-base leading-relaxed text-mbh-body">
              Our clean, modern treatment centers offer a safe and comfortable environment for
              recovery — designed for calm, connection, and clinical excellence. Press play to walk
              through our Springfield campus.
            </p>

            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/12 text-mbh-forest">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-mbh-forest">{item.title}</p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-mbh-forest px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-forest-deep"
              >
                Learn about our campus
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
              <Link
                href="/levels-of-care-missouri"
                className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
              >
                View levels of care
              </Link>
            </div>
          </div>
        </div>

        {/* Facility photo gallery */}
        <div className="mt-14 border-t border-mbh-forest/10 pt-14">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-mbh-green">
                Photo gallery
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-mbh-forest sm:text-2xl">
                Inside our Springfield campus
              </h3>
            </div>
            <p className="max-w-md font-body text-sm text-mbh-body">
              {FACILITY_GALLERY_SLIDES.length} photos from our Springfield campus — swipe or use the
              arrows to browse.
            </p>
          </div>
          <FacilityPhotoCarousel slides={FACILITY_GALLERY_SLIDES} />
        </div>
      </div>
    </section>
  );
}
