import Link from "next/link";
import DeferredHeroVideo from "@/components/home/DeferredHeroVideo";
import {
  HERO_POSTER_URL,
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
} from "@/lib/heroVideo";

const EYEBROW = "Welcome to Sullivan Recovery";
const HEADLINE = "Drug & Alcohol Detox In Mission Viejo";
const BODY =
  "Are you ready to reclaim your life? Start your journey with our dedicated team of compassionate professionals in Orange County. Expert medical detox with a foundation in nature and wellness.";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden py-[100px]">
      <div className="absolute inset-0 z-0">
        {/*
          Poster paints immediately as LCP (direct Supabase WebP, no next/image).
          Video loads after idle via DeferredHeroVideo and crossfades in.
        */}
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
            "linear-gradient(to right, rgba(30,31,27,0.95) 0%, rgba(44,57,40,0.7) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="sr-container relative z-10 w-full">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4C9B5]">
            <span className="h-2 w-2 rounded-full bg-[#8FA882]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4C9B5]">{EYEBROW}</span>
          </div>

          <h1
            className="mb-6 text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-cormorant), Georgia, 'Times New Roman', serif" }}
          >
            {HEADLINE}
          </h1>

          <p
            className="mb-10 text-base leading-relaxed text-[#EDE8DF] md:text-lg"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {BODY}
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#8FA882] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#7A9674]"
            >
              Get Help Today
            </Link>
            <Link
              href="tel:9495550100"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
