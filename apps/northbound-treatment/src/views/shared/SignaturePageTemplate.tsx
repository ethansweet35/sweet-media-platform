/**
 * SignaturePageTemplate
 *
 * Editorial, full-bleed layout for Northbound's Signature Service pages.
 * Design language: cinematic hero → pull quote → split "what is it" →
 * experience/feature grid → dark evidence strip → editorial split → related services → CTA.
 */
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/* ─── Public types ─────────────────────────────────────────────────────── */

export type SignatureFeature = {
  /** Card title */
  title: string;
  /** Short label — shown as the accent sub-heading */
  focus: string;
  /** Body copy */
  description: string;
  /** Full Supabase URL. Pass null for a solid-color tile. */
  image: string | null;
  imageAlt?: string;
  /** Small pill label */
  tag: string;
  /** Remix Icon class, e.g. "ri-leaf-line" */
  tagIcon: string;
  /**
   * Only for solid-color tiles (image === null).
   * "terracotta" | "navy" | "agave"  — defaults to "navy"
   */
  accent?: "terracotta" | "navy" | "agave";
};

export type SignatureRelated = {
  name: string;
  href: string;
  tag: string;
  icon: string;
};

export type SignaturePageData = {
  /* Hero */
  heroImage: string;
  heroImageAlt: string;
  /** e.g. "Wolf-Assisted Therapy" */
  serviceName: string;
  /** The word inside `serviceName` to italicize in terracotta */
  heroItalicWord: string;
  heroBody: string;

  /* Pull quote */
  pullQuote: string;
  pullQuoteItalicPart?: string;
  pullQuoteBody: string;

  /* What is it — split section */
  whatItIsEyebrow: string;
  whatItIsHeadline: string;
  whatItIsHeadlineItalic: string;
  whatItIsBody: string[];
  whatItIsChecklist: string[];
  whatItIsImage: string;
  whatItIsImageAlt: string;
  whatItIsFloatingHeadline: string;

  /* Feature grid */
  featuresEyebrow: string;
  featuresHeadline: string;
  featuresHeadlineItalic: string;
  featuresIntro: string;
  features: SignatureFeature[];

  /* Evidence / science — navy dark section */
  evidenceEyebrow: string;
  evidenceHeadline: string;
  evidenceHeadlineItalic: string;
  evidenceBody: string;
  evidencePoints: { icon: string; title: string; body: string }[];
  stats: { value: string; label: string }[];

  /* Editorial split — bottom light section */
  closingEyebrow: string;
  closingHeadline: string;
  closingHeadlineItalic: string;
  closingBody: string[];
  closingQuote: string;
  closingQuoteAttribution: string;
  closingImage: string;
  closingImageAlt: string;
  closingPrimaryCta: { label: string; href: string };
  closingSecondaryCta: { label: string; href: string };

  /* Related services */
  relatedServices: SignatureRelated[];

  /* CTA banner */
  ctaHeadline: string;
  ctaBody: string;
};

/* ─── Template ─────────────────────────────────────────────────────────── */

export default function SignaturePageTemplate({ data }: { data: SignaturePageData }) {
  /* Split heroItalicWord out of serviceName for the headline */
  const heroNameParts = data.serviceName.split(new RegExp(`(${data.heroItalicWord})`, "i"));

  return (
    <>
      {/* ══ 1. CINEMATIC HERO ══════════════════════════════════════════════ */}
      <section className="relative flex min-h-[82vh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/80" />
        </div>

        {/* Eyebrow */}
        <div className="relative z-10 pt-28 lg:pt-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedText>{"Signature Services — Northbound Treatment"}</AutoLinkedText>
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-1 flex-col justify-end pb-14 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="mb-8 h-px w-16 bg-terracotta" />
              <h1 className="font-heading text-6xl font-bold leading-none text-white md:text-7xl lg:text-8xl">
                {heroNameParts.map((part, i) =>
                  part.toLowerCase() === data.heroItalicWord.toLowerCase() ? (
                    <span key={i} className="italic text-terracotta-light">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"><AutoLinkedText>{data.heroBody}</AutoLinkedText></p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/admissions/"
                  className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-light"
                >
                  Begin Your Journey
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  <i className="ri-phone-line" />
                  (866) 311-0003
                </Link>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-8 bg-white/30" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. PULL QUOTE ═════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="mx-auto w-full max-w-5xl px-6 text-center lg:px-10">
          <div className="mx-auto mb-6 h-px w-12 bg-terracotta" />
          <blockquote className="font-heading text-3xl font-bold leading-snug text-navy md:text-4xl lg:text-5xl">
            {data.pullQuoteItalicPart ? (
              <>
                {data.pullQuote.split(data.pullQuoteItalicPart)[0]}
                <span className="italic text-terracotta">{data.pullQuoteItalicPart}</span>
                {data.pullQuote.split(data.pullQuoteItalicPart)[1]}
              </>
            ) : (
              data.pullQuote
            )}
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-espresso/70"><AutoLinkedText>{data.pullQuoteBody}</AutoLinkedText></p>
          <div className="mx-auto mt-6 h-px w-12 bg-terracotta" />
        </div>
      </section>

      {/* ══ 3. WHAT IS IT — SPLIT SECTION ════════════════════════════════ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={data.whatItIsImage}
                  alt={data.whatItIsImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 bg-navy px-6 py-5 shadow-xl lg:-right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                  Evidence-Based
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-white"><AutoLinkedText>{data.whatItIsFloatingHeadline}</AutoLinkedText></p>
              </div>
              <div className="absolute -left-4 -top-4 h-20 w-20 border-l-2 border-t-2 border-terracotta/40" />
            </div>

            {/* Text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedText>{data.whatItIsEyebrow}</AutoLinkedText></p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
                {data.whatItIsHeadline}
                <br />
                <span className="italic text-terracotta">{data.whatItIsHeadlineItalic}</span>
              </h2>
              {data.whatItIsBody.map((para, i) => (
                <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} leading-relaxed text-espresso/80`}><AutoLinkedText>{para}</AutoLinkedText></p>
              ))}
              <ul className="mt-8 space-y-4">
                {data.whatItIsChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta text-white">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <span className="text-sm leading-relaxed text-espresso/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. FEATURE GRID ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedText>{data.featuresEyebrow}</AutoLinkedText></p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
              {data.featuresHeadline}{" "}
              <span className="italic text-terracotta">{data.featuresHeadlineItalic}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-espresso/70"><AutoLinkedText>{data.featuresIntro}</AutoLinkedText></p>
          </div>
          <FeatureGrid features={data.features} />
        </div>
      </section>

      {/* ══ 5. EVIDENCE — NAVY ═══════════════════════════════════════════ */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedText>{data.evidenceEyebrow}</AutoLinkedText></p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
              {data.evidenceHeadline}{" "}
              <span className="italic text-terracotta-light">{data.evidenceHeadlineItalic}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60"><AutoLinkedText>{data.evidenceBody}</AutoLinkedText></p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.evidencePoints.map((pt) => (
              <div key={pt.title} className="border border-white/10 p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-terracotta/20">
                  <i className={`${pt.icon} text-lg text-terracotta`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{pt.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60"><AutoLinkedText>{pt.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {data.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-5xl font-bold text-terracotta"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. EDITORIAL SPLIT — CLOSING ═════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta"><AutoLinkedText>{data.closingEyebrow}</AutoLinkedText></p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
                {data.closingHeadline}{" "}
                <span className="italic text-terracotta">{data.closingHeadlineItalic}</span>
              </h2>
              {data.closingBody.map((para, i) => (
                <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} leading-relaxed text-espresso/80`}><AutoLinkedText>{para}</AutoLinkedText></p>
              ))}
              <div className="mt-8 border-l-2 border-terracotta pl-5">
                <p className="font-heading text-lg font-bold italic text-navy">
                  "{data.closingQuote}"
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                  — {data.closingQuoteAttribution}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={data.closingPrimaryCta.href}
                  className="inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-light"
                >
                  {data.closingPrimaryCta.label}
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  href={data.closingSecondaryCta.href}
                  className="inline-flex items-center gap-2 border border-terracotta/30 px-7 py-3.5 text-sm font-semibold text-terracotta transition hover:border-terracotta hover:bg-terracotta/5"
                >
                  {data.closingSecondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={data.closingImage}
                  alt={data.closingImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b-2 border-l-2 border-terracotta/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. RELATED SIGNATURE SERVICES ════════════════════════════════ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              Continue Exploring
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-navy md:text-4xl">
              Other <span className="italic text-terracotta">Signature Services</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.relatedServices.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group block border border-sand-dark bg-white p-8 transition hover:border-terracotta/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-terracotta/10 transition group-hover:bg-terracotta/20">
                  <i className={`${svc.icon} text-lg text-terracotta`} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40"><AutoLinkedText>{svc.tag}</AutoLinkedText></p>
                <h3 className="font-heading mt-2 text-lg font-bold text-navy">{svc.name}</h3>
                <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-terracotta">
                  Learn more{" "}
                  <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. CTA BANNER ════════════════════════════════════════════════ */}
      <CtaBanner
        headline={data.ctaHeadline}
        body={data.ctaBody}
        primaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
        secondaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
      />
    </>
  );
}

/* ─── Feature Grid ─────────────────────────────────────────────────────── */

function FeatureGrid({ features }: { features: SignatureFeature[] }) {
  const row1 = features.slice(0, 2);
  const row2mid = features.slice(2, 3);
  const row2sides = features.slice(3, 5);
  const row3 = features.slice(5);

  return (
    <div className="space-y-4">
      {/* Row 1: two equal large cards */}
      {row1.length > 0 && (
        <div className={`grid gap-4 ${row1.length === 1 ? "" : "sm:grid-cols-2"}`}>
          {row1.map((f) => (
            <FeatureCard key={f.title} feature={f} tall />
          ))}
        </div>
      )}
      {/* Row 2: one + two */}
      {(row2mid.length > 0 || row2sides.length > 0) && (
        <div className="grid gap-4 lg:grid-cols-3">
          {row2mid.map((f) => (
            <div key={f.title} className="lg:col-span-1">
              <FeatureCard feature={f} tall={false} />
            </div>
          ))}
          {row2sides.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {row2sides.map((f) => (
                <FeatureCard key={f.title} feature={f} tall={false} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Row 3: remaining */}
      {row3.length > 0 && (
        <div className={`grid gap-4 ${row3.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {row3.map((f) => (
            <FeatureCard key={f.title} feature={f} tall={false} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureCard({ feature: f, tall }: { feature: SignatureFeature; tall: boolean }) {
  const height = tall ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]";

  if (f.image) {
    return (
      <div className={`group relative overflow-hidden bg-navy-light ${height}`}>
        <Image
          src={f.image}
          alt={f.imageAlt ?? f.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          <div className="mb-2 inline-flex items-center gap-1.5 self-start bg-terracotta/90 px-3 py-1">
            <i className={`${f.tagIcon} text-xs text-white`} />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {f.tag}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white lg:text-2xl">{f.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta-light"><AutoLinkedText>{f.focus}</AutoLinkedText></p>
          <p className="mt-2 text-sm leading-relaxed text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><AutoLinkedText>{f.description}</AutoLinkedText></p>
        </div>
      </div>
    );
  }

  const bgMap: Record<string, string> = {
    terracotta: "bg-terracotta",
    navy: "bg-navy",
    agave: "bg-agave",
  };
  const bg = bgMap[f.accent ?? "navy"] ?? "bg-navy";

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden ${height} ${bg} p-6 lg:p-8`}
    >
      <i
        className={`${f.tagIcon} pointer-events-none absolute -right-4 -top-4 text-9xl text-white/5`}
      />
      <div className="inline-flex items-center gap-1.5 self-start bg-white/15 px-3 py-1">
        <i className={`${f.tagIcon} text-xs text-white`} />
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
          {f.tag}
        </span>
      </div>
      <div>
        <h3 className="font-heading text-xl font-bold text-white lg:text-2xl">{f.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/60"><AutoLinkedText>{f.focus}</AutoLinkedText></p>
        <p className="mt-3 text-sm leading-relaxed text-white/75"><AutoLinkedText>{f.description}</AutoLinkedText></p>
      </div>
    </div>
  );
}
