import Eyebrow from "@/components/ui/Eyebrow";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";
import { AutoLinkedText } from "@sweetmedia/blog-core";

export interface ConditionClinicalOverviewProps {
  overviewTitle: string;
  overviewCol1: string[];
  overviewCol2: string[];
  nextStepCopy: string;
}

const CARE_HIGHLIGHTS = [
  { icon: "ri-stethoscope-line", point: "Board-certified psychiatrists embedded at every level of care" },
  { icon: "ri-shield-check-line", point: "Joint Commission accredited · DHCS licensed facility" },
  { icon: "ri-user-heart-line", point: "True dual-diagnosis integration — addiction and mental health together" },
  { icon: "ri-time-line", point: "Same-day admissions · 24/7 clinical support" },
] as const;

const HEADING_STYLE = { fontSize: "clamp(34px, 3.6vw, 52px)", lineHeight: 1.05 } as const;

/**
 * Clinical Overview section for condition pages.
 * Clean prose column + balanced sidebar, modeled after the Detox "What Is Detox?" pattern.
 * Single reading flow on the left, trust + CTA stacked on the right.
 */
export default function ConditionClinicalOverview({
  overviewTitle,
  overviewCol1,
  overviewCol2,
  nextStepCopy,
}: ConditionClinicalOverviewProps) {
  const paragraphs = [...overviewCol1, ...overviewCol2];

  return (
    <section className="bg-white">
      <SectionWrapper className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-14 lg:gap-16 items-start">
        {/* Left — flowing clinical narrative */}
        <div className="flex flex-col">
          <Eyebrow colorClass="text-ink/45" className="mb-4">
            Clinical Overview
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink mb-8"
            style={HEADING_STYLE}
          >
            {overviewTitle}
          </h2>

          <div className="flex flex-col gap-5 text-[15px] font-light leading-relaxed text-ink/65">
            {paragraphs.map((para, i) => (
              <p key={i}>
                <AutoLinkedText>{para}</AutoLinkedText>
              </p>
            ))}
          </div>

          {/* Subtle treatment emphasis — keeps the eye moving without a second column */}
          <div className="mt-9 border-l-2 border-accent pl-6 text-[14px] font-light italic text-ink/60">
            <AutoLinkedText>
              Recovery is possible. Our integrated approach addresses the neurobiological, psychological, and behavioral dimensions of the condition together.
            </AutoLinkedText>
          </div>
        </div>

        {/* Right — Detox-style sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--rize-nav-offset)+1.25rem)]">
          {/* Trust / Why Rize OC */}
          <div className="bg-ink p-7 lg:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
              Why Rize OC
            </p>
            <ul className="flex flex-col gap-5">
              {CARE_HIGHLIGHTS.map(({ icon, point }) => (
                <li key={point} className="flex items-start gap-3">
                  <i className={cn(icon, "text-accent text-base shrink-0 mt-0.5")} aria-hidden />
                  <p className="text-sm font-light leading-[1.65] text-white/65">
                    <AutoLinkedText>{point}</AutoLinkedText>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Step CTA */}
          <div className="border border-warm bg-cream-tile p-7 lg:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/50 mb-4">
              Next Step
            </p>
            <p className="text-[15px] font-light leading-[1.7] text-ink/70">
              <AutoLinkedText>{nextStepCopy}</AutoLinkedText>
            </p>
            <a
              href="tel:9494612620"
              className="mt-5 inline-flex items-center gap-2.5 rounded-sm bg-accent px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-105"
            >
              <i className="ri-phone-fill text-sm" aria-hidden />
              (949) 461-2620
            </a>
            <p className="mt-4 text-[11px] font-light leading-relaxed text-ink/45">
              <AutoLinkedText>Free, confidential assessment · Available 24/7</AutoLinkedText>
            </p>
          </div>
        </aside>
      </SectionWrapper>
    </section>
  );
}
