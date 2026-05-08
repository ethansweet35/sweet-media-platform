import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { DEFAULT_FAQS } from "@/data/faqs";
import { SERVICE_BY_SLUG, type ServiceConfig } from "@/data/services";
import type { ConditionConfig } from "@/data/conditions";

export default function ConditionLanding({ config }: { config: ConditionConfig }) {
  const recommended = (config.recommendedServices || [])
    .map((slug) => SERVICE_BY_SLUG.get(slug))
    .filter((s): s is ServiceConfig => Boolean(s))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow={config.heroEyebrow ?? "Mental Health Support"}
        headline={config.heroHeadline}
        body={config.heroBody}
      />

      <TrustStrip />

      {/* What it is */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">
            Understanding the Condition
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            {config.whatItIsTitle ?? `What ${config.shortName.toLowerCase()} actually looks like`}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            {config.whatItIsBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why act + warning signs (split layout) */}
      <section className="border-t border-[var(--color-divider)] bg-[var(--color-cream)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div>
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              Why It Matters
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              {config.whyActTitle ?? "Why your family cannot wait this out"}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
              {config.whyActBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-[var(--color-divider)] bg-white p-7">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              {config.signsTitle ?? "Warning signs"}
            </p>
            <ul className="mt-4 grid gap-3">
              {config.signs.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-sm leading-6 text-[var(--color-ink)]"
                >
                  <i className="ri-checkbox-circle-line mt-0.5 text-lg text-[var(--color-sage-deep)]"></i>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* How we help */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">Our Approach</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            {config.howWeHelpTitle ?? `How we help families address ${config.shortName.toLowerCase()}`}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            {config.howWeHelpBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps
        eyebrow="Our Process"
        title="A clear, family-centred path forward."
        subtitle="Every intervention follows the same proven structure — adapted to the condition, the family, and the urgency of the situation."
      />

      {recommended.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                Recommended Intervention Types
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
                The intervention services that fit this situation.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {recommended.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-divider)] bg-white p-7 transition hover:border-[var(--color-sage)] hover:shadow-md"
                >
                  {rel.navIcon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                      <i className={`text-2xl ${rel.navIcon}`}></i>
                    </div>
                  )}
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {rel.displayName}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                    {rel.heroBody.slice(0, 140)}
                    {rel.heroBody.length > 140 ? "…" : ""}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-sage-deep)] group-hover:gap-2 transition-all">
                    Learn more
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqAccordion
        title={`${config.shortName} intervention questions, answered.`}
        faqs={config.faqs ?? DEFAULT_FAQS}
      />

      <BottomCta
        title={`Ready to talk about your loved one's ${config.shortName.toLowerCase()}?`}
        body="Your first call is free, confidential, and judgment-free. We listen first — then tell you exactly what comes next."
      />
    </main>
  );
}
