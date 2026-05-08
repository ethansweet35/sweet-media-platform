import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { SERVICES, type ServiceConfig } from "@/data/services";
import { DEFAULT_FAQS } from "@/data/faqs";

type CategoryGroup = {
  key: ServiceConfig["category"];
  label: string;
  description: string;
  services: ServiceConfig[];
};

const CATEGORY_ORDER: { key: ServiceConfig["category"]; label: string; description: string }[] = [
  {
    key: "substance",
    label: "Substance Use Interventions",
    description:
      "Targeted, substance-specific interventions for alcohol and drug dependence — from prescription opioids to street drugs.",
  },
  {
    key: "mental-health",
    label: "Mental Health Interventions",
    description:
      "When the crisis is depression, anxiety, OCD, or another psychiatric condition — interventions that lead with compassion, not consequences.",
  },
  {
    key: "specialty",
    label: "Specialty Interventions",
    description:
      "Specific situations require specific approaches. Crisis cases, executives, teens, and dual diagnosis each get a tailored plan.",
  },
  {
    key: "family",
    label: "Family-Centred Interventions",
    description:
      "Reset the entire family system — not just the person who is using. Stop enabling, set boundaries, and restore healthy roles.",
  },
  {
    key: "method",
    label: "Intervention Methodologies",
    description:
      "We are trained in multiple intervention models. Your interventionist will recommend the one that fits your loved one and your family.",
  },
];

function groupServices(): CategoryGroup[] {
  return CATEGORY_ORDER.map((cat) => ({
    ...cat,
    services: SERVICES.filter((s) => s.category === cat.key),
  })).filter((g) => g.services.length > 0);
}

export default function InterventionServicesPage() {
  const groups = groupServices();

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Who We Are"
        headline="Intervention Services"
        body="For more than two decades we have helped families confront addiction and mental health crises with skill, compassion, and a clear plan. Browse the full range of interventions we provide — and call us when you are ready to act."
      />

      <TrustStrip />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">How Family Interventions Work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Often initiated by a loved one or friend, addiction interventions are designed to help someone realise they have a problem, they need help, and they are not alone.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            <p>
              Most families come to us after years of trying to help in ways that quietly enabled the problem. We help you see those patterns clearly, set boundaries that hold, and move your loved one into the right level of care — quickly and without breaking the relationship.
            </p>
            <p>
              Whether the situation involves alcohol, drugs, a co-occurring mental health condition, or a complex family dynamic, we have a structured intervention process that has been used successfully with more than 1,500 families.
            </p>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <section
          key={group.key}
          className="border-t border-[var(--color-divider)] bg-white"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                {group.label}
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
                {group.description}
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.services.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${svc.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-divider)] bg-white p-7 transition hover:border-[var(--color-sage)] hover:shadow-md"
                >
                  {svc.navIcon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                      <i className={`text-2xl ${svc.navIcon}`}></i>
                    </div>
                  )}
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {svc.displayName}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                    {svc.heroBody.split(".")[0]}.
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
      ))}

      <ProcessSteps
        title="A clear, family-centred process — from first call to long-term recovery."
        subtitle="Every intervention we run follows the same proven structure, customised to the substance, the situation, and the family."
      />

      <FaqAccordion
        title="Common questions about our intervention services"
        faqs={DEFAULT_FAQS}
      />

      <BottomCta />
    </main>
  );
}
