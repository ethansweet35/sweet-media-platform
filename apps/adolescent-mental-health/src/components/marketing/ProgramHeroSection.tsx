import Image from "next/image";
import Link from "next/link";
import { CONTAINER, SITE } from "@/lib/site";

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

      <div className="relative z-10 mt-auto w-full px-6 pb-16 pt-24 lg:px-10 lg:pb-20">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-12`}>
          <div className="min-w-0">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>

            <h1
              className="max-w-3xl text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {headline}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/65">{body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-xl transition hover:bg-white/90"
              >
                <i className="ri-phone-fill text-base"></i>
                Free Consultation — {SITE.phone.display}
              </a>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/8"
              >
                {secondaryCta.label}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
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
