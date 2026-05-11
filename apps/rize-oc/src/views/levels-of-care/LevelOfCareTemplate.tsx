import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import type { LevelOfCareData } from "./types";

const levelsOfCare = [
  { label: "Detox",   href: "/drug-alcohol-detox" },
  { label: "PHP",     href: "/partial-hospitalization-program-orange-county" },
  { label: "IOP",     href: "/iop-program-orange-county" },
  { label: "OP",      href: "/outpatient-program" },
  { label: "Virtual", href: "/virtual-outpatient-program" },
];

export default function LevelOfCareTemplate({ data }: { data: LevelOfCareData }) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper py="py-0" className="grid lg:grid-cols-[1fr_520px] min-h-[560px] items-stretch gap-0">
          {/* Left — copy */}
          <div className="flex flex-col justify-center py-[80px] pr-0 lg:pr-16">
            <Eyebrow colorClass="text-accent" className="mb-5">{data.eyebrow}</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05 }}
            >
              {data.heading}
            </h1>
            <div className="mt-5 mb-6 w-12 h-[2px] bg-accent" />
            <p className="text-[15px] font-light leading-relaxed text-white/65 max-w-lg">
              {data.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#verify" variant="accent" size="sm">
                Verify Insurance
              </Button>
              <Button href="tel:9494612620" variant="outline-white" size="sm">
                <i className="ri-phone-line mr-2" /> (949)-461-2620
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
              {data.stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-[family-name:var(--font-display)] text-3xl font-normal text-white">{value}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block">
            <Image
              src={data.heroImage}
              alt={data.heroImageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-ink/20" />
          </div>
        </SectionWrapper>
      </section>

      {/* ── Continuum breadcrumb ─────────────────────────────────────────── */}
      <div className="bg-ink border-t border-white/5">
        <div className="mx-auto max-w-[1300px] w-full px-6 py-4 flex items-center gap-0 overflow-x-auto">
          {levelsOfCare.map((lvl, i) => {
            const isActive = lvl.href === `/${data.heading.toLowerCase().replace(/\s+/g, "-")}` ||
              (data.prevLevel?.href === levelsOfCare[i - 1]?.href && !data.prevLevel) ||
              lvl.label === levelsOfCare.find(l =>
                l.href === (data.prevLevel ? data.nextLevel?.href : data.nextLevel?.href)
              )?.label;
            return (
              <div key={lvl.href} className="flex items-center shrink-0">
                <Link
                  href={lvl.href}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] px-4 py-1.5 transition-colors text-white/40 hover:text-white/80"
                >
                  {lvl.label}
                </Link>
                {i < levelsOfCare.length - 1 && (
                  <span className="text-white/15 text-sm">→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Program Overview ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          {/* Left — description */}
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Program Overview</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              {data.overviewTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {data.overviewBody.map((para, i) => (
                <p key={i} className="text-[15px] font-light leading-relaxed text-ink/65">{para}</p>
              ))}
            </div>
          </div>

          {/* Right — feature grid */}
          <div className="flex flex-col gap-4 lg:mt-2">
            {data.overviewFeatures.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 border border-warm p-5">
                <IconCircle icon={icon} variant="accent-subtle" size="sm" className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[18px] font-normal text-ink leading-snug">{title}</p>
                  <p className="mt-1 text-sm font-light text-ink/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ── What To Expect ────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="What To Expect"
            heading={data.expectTitle}
            body={data.expectBody}
            align="left"
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.expectSteps.map(({ num, title, desc }) => (
              <div key={num} className="bg-white border border-warm p-7 flex flex-col">
                <span className="font-[family-name:var(--font-display)] text-[56px] italic font-normal leading-none text-ink/10 mb-3">
                  {num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/60 flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ── Who Is A Candidate ────────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <Eyebrow colorClass="text-accent" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              {data.candidacyTitle}
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-white/60 mb-8">
              {data.candidacyBody}
            </p>
            <Button href="tel:9494612620" variant="accent" size="sm">
              Speak With Admissions
            </Button>
          </div>

          <div className="flex flex-col gap-3 lg:mt-2">
            {data.candidacyItems.map(({ label }, i) => (
              <div key={i} className="flex items-center gap-4 border border-white/10 px-6 py-4">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <p className="text-[15px] font-light text-white/75">{label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ── Insurance Verify CTA ─────────────────────────────────────────── */}
      <section id="verify" className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Insurance & Payment</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Most Insurance Plans Accepted
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              We work directly with your insurance provider to verify coverage and minimize out-of-pocket expenses. Our admissions team handles the entire process—free, confidential, and with no obligation.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Aetna", "Cigna", "Anthem", "United", "Blue Cross", "+ More"].map((c) => (
                <span key={c} className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink border border-warm px-4 py-2">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Quick form */}
          <div className="bg-white border border-warm p-8">
            <div className="flex items-center gap-3 mb-6">
              <IconCircle icon="ri-shield-check-line" variant="ink" size="sm" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">Free Verification</p>
                <p className="text-xs text-ink/45 mt-0.5">Results within 24 hours</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {["Full Name", "Phone Number", "Insurance Provider"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  className="w-full border border-warm bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none transition-colors"
                />
              ))}
              <button
                type="submit"
                className="w-full bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-ink/85 transition-colors flex items-center justify-center gap-2"
              >
                Verify Coverage <i className="ri-arrow-right-line" />
              </button>
            </div>
            <p className="mt-4 text-xs text-ink/40 leading-relaxed">
              HIPAA compliant. Your information is strictly confidential.
            </p>
          </div>
        </SectionWrapper>
      </section>

      {/* ── Navigation between levels ─────────────────────────────────────── */}
      {(data.prevLevel || data.nextLevel) && (
        <div className="bg-white border-t border-warm">
          <div className="mx-auto max-w-[1300px] w-full px-6 py-8 flex items-center justify-between">
            {data.prevLevel ? (
              <Link
                href={data.prevLevel.href}
                className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50 hover:text-accent transition-colors"
              >
                <i className="ri-arrow-left-line" /> {data.prevLevel.label}
              </Link>
            ) : <div />}
            {data.nextLevel ? (
              <Link
                href={data.nextLevel.href}
                className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50 hover:text-accent transition-colors"
              >
                {data.nextLevel.label} <i className="ri-arrow-right-line" />
              </Link>
            ) : <div />}
          </div>
        </div>
      )}
    </>
  );
}
