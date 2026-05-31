import Link from "next/link";
import Image from "next/image";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
export interface TherapyFact {
  icon: string;
  label: string;
  value: string;
}

type ModalityHeroProps = {
  variant: "modality";
  therapyName: string;
  abbr: string;
  tagline: string;
  heroBody: string;
  heroImage: string;
  heroImageAlt: string;
  facts: TherapyFact[];
};

type HubHeroProps = {
  variant: "hub";
  heroImage: string;
  heroImageAlt: string;
};

export type TherapyModalityHeroProps = ModalityHeroProps | HubHeroProps;

function HeroBreadcrumb({ endLabel }: { endLabel: string }) {
  return (
    <nav
      className="mb-6 flex flex-wrap items-center gap-2 font-body text-[11px] text-mbh-body/45 lg:mb-8"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="transition hover:text-mbh-forest">
        Home
      </Link>
      <i className="ri-arrow-right-s-line" aria-hidden />
      {endLabel !== "Therapy Types" ? (
        <>
          <Link href="/services" className="transition hover:text-mbh-forest">
            Therapy Types
          </Link>
          <i className="ri-arrow-right-s-line" aria-hidden />
        </>
      ) : null}
      <span className="text-mbh-body/65">{endLabel}</span>
    </nav>
  );
}

/** Quiet spec list in the copy column — not a floating overlay card */
function ModalityFactsStrip({ facts }: { facts: TherapyFact[] }) {
  return (
    <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-mbh-forest/10 pt-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
      {facts.map((f) => (
        <div key={f.label} className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-mbh-forest/8">
            <i className={`${f.icon} text-base text-mbh-green`} aria-hidden />
          </span>
          <div className="min-w-0">
            <dt className="font-body text-[9px] font-bold uppercase tracking-[0.16em] text-mbh-body/45">
              {f.label}
            </dt>
            <dd className="mt-0.5 font-display text-[13px] font-semibold leading-snug text-mbh-forest">
              {f.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function HeroCtas() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={PHONE_HREF}
        className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover"
      >
        <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
      </a>
      <Link
        href="/verify-insurance"
        className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
      >
        <i className="ri-shield-check-line" aria-hidden /> Verify Insurance
      </Link>
    </div>
  );
}

function ArchPortrait({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl shadow-mbh-forest/20 ring-1 ring-mbh-forest/10"
        style={{ borderRadius: "3rem 3rem 1rem 3rem" }}
      >
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mbh-forest-deep/55 via-transparent to-mbh-mint/10"
        />
        {badge ? (
          <div className="absolute left-5 top-5 z-10 sm:left-6 sm:top-6">{badge}</div>
        ) : null}
      </div>
    </div>
  );
}

export default function TherapyModalityHero(props: TherapyModalityHeroProps) {
  const isHub = props.variant === "hub";

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Clinical grid + left spine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30, 80, 39, 0.11) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-mbh-green via-mbh-forest to-mbh-forest-deep lg:w-1.5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-mbh-mint/25 blur-3xl"
      />

      <div className={`${CONTAINER} relative`}>
        <div className="grid min-h-0 gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20 xl:gap-14 xl:py-24">
          {/* Copy column */}
          <div className="relative z-10 flex flex-col justify-center lg:col-span-5 xl:col-span-5">
            <HeroBreadcrumb endLabel={isHub ? "Therapy Types" : props.abbr} />

            {isHub ? (
              <>
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-mbh-forest/12 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-mbh-green" aria-hidden />
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-forest">
                    Clinical Services · Springfield, MO
                  </span>
                </div>
                <h1
                  className="font-display font-semibold leading-[1.02] tracking-[-0.03em] text-mbh-forest"
                  style={{ fontSize: "clamp(2.35rem, 5vw, 3.75rem)" }}
                >
                  Evidence-based therapy for lasting recovery.
                </h1>
                <p className="mt-5 max-w-lg font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                  Missouri Behavioral Health offers a full spectrum of clinical therapies — from CBT and DBT
                  to EMDR, family systems, group process, and holistic modalities. Each is delivered by
                  licensed clinicians as part of your individualized treatment plan.
                </p>
                <div className="mt-10 grid grid-cols-3 divide-x divide-mbh-forest/10 border-y border-mbh-forest/10 py-6">
                  {[
                    { value: "9+", label: "Therapy modalities" },
                    { value: "Licensed", label: "Missouri clinicians" },
                    { value: "In-Person", label: "& statewide virtual" },
                  ].map((s) => (
                    <div key={s.label} className="px-3 text-center first:pl-0 last:pr-0">
                      <p className="font-display text-[clamp(1.25rem,2vw,1.65rem)] font-semibold text-mbh-forest">
                        {s.value}
                      </p>
                      <p className="mt-0.5 font-body text-[10px] uppercase tracking-[0.16em] text-mbh-body/50">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <HeroCtas />
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-2xl bg-mbh-forest font-display text-lg font-bold tracking-tight text-white shadow-lg shadow-mbh-forest/25">
                    {props.abbr}
                  </span>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-green">
                      Clinical modality
                    </p>
                    <p className="mt-0.5 font-body text-xs text-mbh-body/70">
                      Springfield, MO · In-person &amp; telehealth
                    </p>
                  </div>
                </div>

                <h1
                  className="font-display font-semibold leading-[1.02] tracking-[-0.03em] text-mbh-forest"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
                >
                  {props.therapyName}
                </h1>
                <p className="mt-3 font-display text-lg font-medium italic text-mbh-green/90 sm:text-xl">
                  {props.tagline}
                </p>
                <p className="mt-5 max-w-lg font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                  {props.heroBody}
                </p>
                <ModalityFactsStrip facts={props.facts} />
                <div className="mt-8">
                  <HeroCtas />
                </div>
              </>
            )}
          </div>

          {/* Visual column */}
          <div className="relative lg:col-span-7 xl:col-span-7">
            {!isHub ? (
              <p
                aria-hidden
                className="pointer-events-none absolute -right-2 top-0 z-0 hidden select-none font-display font-bold leading-none tracking-tighter text-mbh-green/[0.07] lg:block"
                style={{ fontSize: "clamp(6rem, 16vw, 11rem)" }}
              >
                {props.abbr}
              </p>
            ) : (
              <p
                aria-hidden
                className="pointer-events-none absolute right-0 top-4 z-0 hidden select-none font-display font-bold leading-[0.85] tracking-tighter text-mbh-green/[0.06] lg:block"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
              >
                <span className="block">Therapy</span>
                <span className="block pl-8">Types</span>
              </p>
            )}

            <div className="relative z-10 flex flex-col gap-8 lg:pt-6">
              <ArchPortrait
                src={props.heroImage}
                alt={props.heroImageAlt}
                badge={
                  !isHub ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-mbh-forest/85 px-3.5 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                      <i className="ri-mental-health-line text-mbh-mint" aria-hidden />
                      {props.abbr} · MBH
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-mbh-forest/85 px-3.5 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                      <i className="ri-stethoscope-line text-mbh-mint" aria-hidden />
                      Licensed clinicians
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
