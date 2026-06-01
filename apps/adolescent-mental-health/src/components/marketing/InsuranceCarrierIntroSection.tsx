import Image from "next/image";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { AmhButton } from "@/components/marketing";
import type { InsuranceCarrierConfig } from "@/lib/insurance-carrier-pages";
import { CONTAINER, SITE } from "@/lib/site";
import { SECTION_PY } from "./tokens";

type InsuranceCarrierIntroSectionProps = {
  carrierName: string;
  logoSrc: string;
  intro: InsuranceCarrierConfig["intro"];
  covered: InsuranceCarrierConfig["covered"];
};

function BenefitsSnapshot({
  carrierName,
  logoSrc,
  covered,
}: {
  carrierName: string;
  logoSrc: string;
  covered: InsuranceCarrierConfig["covered"];
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-border">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-white px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Benefits snapshot</p>
          <p className="mt-0.5 text-sm font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
            Adolescent Virtual IOP
          </p>
        </div>
        <Image
          src={logoSrc}
          alt={`${carrierName} logo`}
          width={96}
          height={32}
          className="h-7 w-auto object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-dashed border-border bg-surface-muted/50 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Service setting</p>
          <p className="mt-1 text-sm font-semibold text-ink">Telehealth · Home</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Eligible ages</p>
          <p className="mt-1 text-sm font-semibold text-ink">{SITE.ages}</p>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">{covered.eyebrow}</p>
        <h3 className="mt-2 text-xl font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
          {covered.title}
        </h3>

        <ul className="mt-6 divide-y divide-border/70">
          {covered.items.map((item) => (
            <li key={item} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <i className="ri-check-line text-xs" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-body">{item}</p>
              </div>
              <span className="hidden shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent sm:inline">
                Verify
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-xs leading-6 text-body">
          Final coverage depends on your specific {carrierName} plan, medical necessity, and in-network status.
          Admissions provides a written summary before enrollment.
        </p>
      </div>
    </div>
  );
}

export default function InsuranceCarrierIntroSection({
  carrierName,
  logoSrc,
  intro,
  covered,
}: InsuranceCarrierIntroSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-surface px-6 ${SECTION_PY} lg:px-10`}>
      <div className="pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.35]" />

      <div className={`${CONTAINER} relative`}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-14 xl:gap-20">
          <div className="relative min-w-0">
            <p
              aria-hidden
              className="pointer-events-none absolute -left-2 top-6 select-none text-[clamp(4.5rem,14vw,9rem)] font-bold leading-none tracking-tight text-accent/[0.07]"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              {carrierName}
            </p>

            <div className="relative">
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{intro.eyebrow}</p>
              </div>

              <h2
                className="max-w-2xl text-4xl font-bold leading-[1.08] text-ink md:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                {intro.title}
              </h2>

              <div className="mt-10 max-w-2xl space-y-6">
                {intro.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={
                      index === 0
                        ? "text-base leading-8 text-ink md:text-lg md:leading-9"
                        : "border-l-2 border-accent/25 pl-5 text-sm leading-8 text-body"
                    }
                  >
                    <AutoLinkedText>{paragraph}</AutoLinkedText>
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <AmhButton href="/contact" icon="ri-arrow-right-line">
                  Verify {carrierName} benefits
                </AmhButton>
                <AmhButton href="/virtual-iop-for-teens" variant="secondary" icon="ri-arrow-right-line">
                  Virtual IOP overview
                </AmhButton>
              </div>
            </div>
          </div>

          <div>
            <BenefitsSnapshot carrierName={carrierName} logoSrc={logoSrc} covered={covered} />
          </div>
        </div>
      </div>
    </section>
  );
}
