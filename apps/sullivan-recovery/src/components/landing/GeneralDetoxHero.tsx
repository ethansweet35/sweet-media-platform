"use client";

import DeferredHeroVideo from "@/components/home/DeferredHeroVideo";
import LandingHeroForm from "@/components/landing/LandingHeroForm";
import CallNowLink from "@/components/ui/CallNowLink";
import {
  HERO_POSTER_URL,
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
} from "@/lib/heroVideo";

const HERO_HIGHLIGHTS = [
  { icon: "ri-heart-pulse-line", text: "24/7 medically supervised detox" },
  { icon: "ri-time-line", text: "Same-day admissions available" },
  { icon: "ri-shield-check-line", text: "Most major insurance accepted" },
  { icon: "ri-leaf-line", text: "Holistic care on a private campus" },
] as const;

export default function GeneralDetoxHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden py-28 md:py-32"
    >
      <div className="absolute inset-0 z-0 bg-[#1E1F1B]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER_URL}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-right md:object-center"
          aria-hidden
        />
        <DeferredHeroVideo
          mobileSrc={HERO_VIDEO_MOBILE}
          desktopSrc={HERO_VIDEO_DESKTOP}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(30,31,27,0.88) 0%, rgba(44,57,40,0.55) 50%, rgba(30,31,27,0.35) 100%)",
        }}
      />

      <div className="sr-container relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div
              className="mb-4 flex flex-wrap items-center gap-1 text-[#D4C9B5]"
              aria-label="Rated 5 out of 5 stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="ri-star-fill text-sm text-[#C9A227]" aria-hidden />
              ))}
              <span
                className="ml-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                5 Star Rated Detox &amp; Recovery Center
              </span>
            </div>

            <h1
              className="mb-6 text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.08] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              California&apos;s Most Comfortable Drug &amp; Alcohol Detox Center
            </h1>

            <p
              className="mb-8 max-w-xl text-base leading-relaxed text-[#EDE8DF] md:text-lg"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Say goodbye to the agony of withdrawal. Our serene, healing environment blends
              holistic care with medically supervised detox — so you can rest, stabilize, and
              step into residential treatment on the same Mission Viejo campus.
            </p>

            <CallNowLink
              withPrefixOnDesktop
              className="mb-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#8FA882] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#7A9674]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />

            <ul className="flex max-w-xl flex-col gap-4">
              {[0, 2].map((rowStart) => (
                <li
                  key={rowStart}
                  className="grid list-none grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr] sm:items-center sm:gap-x-10"
                >
                  {HERO_HIGHLIGHTS.slice(rowStart, rowStart + 2).map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8FA882]/25 text-[#8FA882]">
                        <i className={`${item.icon} text-base`} aria-hidden />
                      </span>
                      <span
                        className="min-w-0 text-sm leading-tight text-[#EDE8DF]/95"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <LandingHeroForm />
        </div>
      </div>
    </section>
  );
}
