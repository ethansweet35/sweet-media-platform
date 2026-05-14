import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServiceGrid from "@/components/sections/ServiceGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import type { LocationConfig } from "@/data/locations";
import { LOCATION_FAQS } from "@/data/faqs";

export default function LocationLanding({ config }: { config: LocationConfig }) {
  const regionLabel =
    config.type === "city"
      ? `${config.displayName}, ${config.parentRegion ?? ""}`.trim().replace(/,$/, "")
      : config.displayName;

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow={config.heroEyebrow ?? `Serving ${regionLabel}`}
        headline={
          config.heroHeadline ?? `Addiction Interventions in ${regionLabel}`
        }
        body={
          config.heroBody ??
          `Family-centered, on-site interventions in ${regionLabel}. We help families break the cycle of denial and guide loved ones into the right treatment.`
        }
        image={config.heroImage}
        imageAlt={config.heroImageAlt}
      />

      <TrustStrip />

      {/* Local context block */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">
            Local, on-site help
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            We come to you in {regionLabel}.
          </h2>
          <div className="mt-6 grid gap-6 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            <p>
              Addiction Interventions has guided more than 1,500 families through
              the most difficult moment of their lives. Our certified
              interventionists travel to {regionLabel} to lead the conversation
              you cannot have alone — and to coordinate placement into a
              treatment program built for what your loved one actually needs.
            </p>
            <p>
              {config.type === "city"
                ? `We know the ${config.parentRegion ?? ""} treatment landscape well, and we will be honest about whether the right care is local or out-of-state. Sometimes removing your loved one from familiar triggers is the most loving thing a family can do.`
                : `We work across every major metro and rural community in ${config.displayName}. Our interventionists are typically on the ground within 24–48 hours, and same-day mobilisation is available for active crises.`}
            </p>
          </div>
        </div>
      </section>

      <ProcessSteps
        eyebrow={`How we work in ${regionLabel}`}
        title="A clear, structured path forward."
        subtitle={`From the first private call to the moment your loved one accepts treatment — and through the months of recovery that follow — every step is mapped out before we sit down together.`}
      />

      <ServiceGrid
        eyebrow="Available in this region"
        title="Every kind of intervention you might need."
        subtitle={`Our team in ${regionLabel} handles the full range of intervention services — from substance use and mental health to crisis, family, executive, and dual-diagnosis cases.`}
      />

      <FaqAccordion
        title={`${regionLabel} intervention questions, answered.`}
        faqs={LOCATION_FAQS(regionLabel)}
      />

      <BottomCta
        title={`Ready to act in ${regionLabel}?`}
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
      />
    </main>
  );
}
