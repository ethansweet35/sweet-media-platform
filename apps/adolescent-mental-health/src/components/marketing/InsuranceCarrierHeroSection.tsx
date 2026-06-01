import Image from "next/image";
import Link from "next/link";
import { CONTAINER, HERO_PHONE_BTN, HERO_SECONDARY_BTN, SITE } from "@/lib/site";

export type InsuranceCarrierHeroStat = {
  icon: string;
  label: string;
  value: string;
  unit: string;
};

export type InsuranceCarrierHeroCheck = {
  label: string;
};

type InsuranceCarrierHeroSectionProps = {
  eyebrow: string;
  carrierName: string;
  headlineAccent: string;
  body: string;
  logoSrc: string;
  imageSrc: string;
  imageAlt: string;
  verifyHref?: string;
  stats?: InsuranceCarrierHeroStat[];
  checks?: InsuranceCarrierHeroCheck[];
};

const defaultStats: InsuranceCarrierHeroStat[] = [
  { icon: "ri-money-dollar-circle-line", label: "Benefits review", value: "Free", unit: "no obligation" },
  { icon: "ri-time-line", label: "Verification", value: "24–48", unit: "hours" },
  { icon: "ri-user-heart-line", label: "Eligible ages", value: SITE.ages, unit: "teens" },
];

const defaultChecks: InsuranceCarrierHeroCheck[] = [
  { label: "Virtual IOP coverage" },
  { label: "Copays & deductibles" },
  { label: "Pre-authorization needs" },
  { label: "Estimated out-of-pocket" },
];

export default function InsuranceCarrierHeroSection({
  eyebrow,
  carrierName,
  headlineAccent,
  body,
  logoSrc,
  imageSrc,
  imageAlt,
  verifyHref = "/contact",
  stats = defaultStats,
  checks = defaultChecks,
}: InsuranceCarrierHeroSectionProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-dark">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.07]" />

        <div className="relative grid lg:min-h-[560px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:py-14 xl:pl-[max(2.5rem,calc((100vw-var(--width-content-px)*1px)/2+2.5rem))]">
            <div className={`${CONTAINER} w-full xl:max-w-none xl:px-0`}>
              <div className="mb-6 inline-flex w-full max-w-md flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm sm:mb-8 sm:w-fit sm:gap-4 sm:px-5">
                <Image
                  src={logoSrc}
                  alt={`${carrierName} insurance logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
                <span className="hidden h-8 w-px bg-white/15 sm:block" aria-hidden />
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 sm:block">
                  In-network verification
                </span>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>

              <h1
                className="mt-4 max-w-xl text-3xl font-bold leading-[1.08] text-white sm:mt-5 sm:text-4xl lg:text-[3.25rem]"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                <span className="text-accent">{headlineAccent}</span> for teen Virtual IOP
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:mt-6 sm:leading-8">{body}</p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                <Link href={verifyHref} className={`${HERO_PHONE_BTN} px-6 text-center sm:px-8`}>
                  Verify my {carrierName} benefits
                  <i className="ri-arrow-right-line text-accent" aria-hidden />
                </Link>
                <a href={SITE.phone.href} className={HERO_SECONDARY_BTN}>
                  <i className="ri-phone-fill text-accent" aria-hidden />
                  {SITE.phone.display}
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <i className={`${stat.icon} text-accent text-sm`} aria-hidden />
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{stat.label}</p>
                    </div>
                    <p className="mt-2 font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                      <span className="text-xl">{stat.value}</span>
                      <span className="ml-1.5 text-xs font-semibold text-white/50">{stat.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent lg:bg-gradient-to-r lg:from-dark lg:via-dark/35 lg:to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[min(100%,320px)] lg:bottom-10 lg:right-8">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-2xl backdrop-blur-md">
                <div className="border-b border-border/60 bg-surface px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                        Benefits check
                      </p>
                      <p className="mt-1 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                        What we verify for you
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <i className="ri-file-search-line text-lg" aria-hidden />
                    </span>
                  </div>
                </div>
                <ul className="divide-y divide-border/60 px-5 py-1">
                  {checks.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 py-3.5 text-sm text-body">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <i className="ri-check-line text-xs" aria-hidden />
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/60 bg-surface-muted/80 px-5 py-3.5">
                  <p className="text-xs leading-6 text-body">
                    Network status varies by plan — admissions confirms your specific {carrierName} policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface px-6 py-5 lg:px-10">
        <div className={`${CONTAINER} flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-body sm:gap-x-8 sm:text-sm`}>
          {[
            { icon: "ri-shield-check-line", label: "HIPAA compliant" },
            { icon: "ri-video-chat-line", label: "Telehealth IOP" },
            { icon: "ri-file-shield-2-line", label: "Pre-auth support" },
            { icon: "ri-heart-pulse-line", label: "Most major plans" },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-2">
              <i className={`${item.icon} text-accent`} aria-hidden />
              {item.label}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
