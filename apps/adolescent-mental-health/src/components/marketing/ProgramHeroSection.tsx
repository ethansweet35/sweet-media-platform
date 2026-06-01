import Image from "next/image";
import Link from "next/link";
import { CONTAINER, HERO_CTA_ROW_LEFT, HERO_PHONE_BTN, HERO_SECONDARY_BTN, SITE } from "@/lib/site";

export type ProgramHeroStat = {
  icon: string;
  label: string;
  value: string;
  unit: string;
};

export type ProgramHeroTrustItem = {
  icon: string;
  label: string;
};

type ProgramHeroSectionProps = {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  imageSrc: string;
  imageAlt: string;
  stats: ProgramHeroStat[];
  trustItems: ProgramHeroTrustItem[];
  imageClassName?: string;
  secondaryCta?: { href: string; label: string };
};

export default function ProgramHeroSection({
  eyebrow,
  headline,
  body,
  imageSrc,
  imageAlt,
  stats,
  trustItems,
  imageClassName = "object-cover object-[center_35%]",
  secondaryCta = { href: "/admissions", label: "Start online intake" },
}: ProgramHeroSectionProps) {
  return (
    <section className="relative flex min-h-[90vh] flex-col overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={imageClassName}
        priority
        quality={90}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 lg:from-black/70 lg:via-black/20 lg:to-transparent" />

      <div className="relative z-10 mt-auto w-full px-6 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:px-10 lg:pb-20">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-12`}>
          <div className="min-w-0">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-accent sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
              {eyebrow}
            </p>

            <h1
              className="max-w-3xl text-3xl font-bold leading-[1.08] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {headline}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:mt-6 sm:leading-8">{body}</p>

            <div className={HERO_CTA_ROW_LEFT + " mt-8 sm:mt-9"}>
              <a href={SITE.phone.href} className={HERO_PHONE_BTN}>
                <i className="ri-phone-fill text-base"></i>
                <span className="sm:hidden">Call for Free Consultation</span>
                <span className="hidden sm:inline">Free Consultation — {SITE.phone.display}</span>
              </a>
              <Link href={secondaryCta.href} className={HERO_SECONDARY_BTN}>
                {secondaryCta.label}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:mt-10 sm:gap-x-7 sm:gap-y-3">
              {trustItems.map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-xs font-semibold text-white/50">
                  <i className={`${item.icon} text-accent text-sm`} aria-hidden />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div
            className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md lg:mb-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 px-5 py-5 sm:px-6 ${index > 0 ? "border-t border-white/10" : ""}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <i className={`${stat.icon} text-lg`} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
                  <p className="mt-0.5 font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                    <span className="text-2xl">{stat.value}</span>
                    <span className="ml-1.5 text-sm font-semibold text-white/55">{stat.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
