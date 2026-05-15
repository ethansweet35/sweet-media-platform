import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import PageHero from "@/components/feature/PageHero";
import ComparisonTable from "@/views/levels-of-care/ComparisonTable";

type Program = {
  slug: string;
  name: string;
  abbreviation: string;
  tagline: string;
  body: string;
  hours: string;
  days: string;
  href: string;
  bullets: string[];
};

const PROGRAMS: Program[] = [
  {
    slug: "php",
    name: "Partial Hospitalization Program",
    abbreviation: "PHP",
    tagline: "Highest Intensity Outpatient Care",
    body:
      "Our most intensive outpatient program — clinical care that bridges the gap between inpatient and outpatient treatment, with same-day medical and psychiatric services.",
    hours: "25-30 hrs / week",
    days: "5-6 days / week",
    href: "/levels-of-care/partial-hospitalization-program/",
    bullets: [
      "Same-day psychiatric care",
      "Daily individual & group therapy",
      "Step-down from inpatient",
    ],
  },
  {
    slug: "iop",
    name: "Intensive Outpatient Program",
    abbreviation: "IOP",
    tagline: "Structured Flexibility",
    body:
      "A flexible, evidence-based program with morning, afternoon, and evening tracks so you can keep working, parenting, or attending school while you heal.",
    hours: "9-12 hrs / week",
    days: "3-5 days / week",
    href: "/levels-of-care/intensive-outpatient-program/",
    bullets: [
      "Morning / afternoon / evening tracks",
      "Hybrid in-person + telehealth",
      "Ideal for working professionals",
    ],
  },
  {
    slug: "op",
    name: "Outpatient Program",
    abbreviation: "OP",
    tagline: "Continued Recovery Support",
    body:
      "The lightest level of structured care — weekly therapy, group support, and relapse prevention built around a full life. Ideal for stable recovery and aftercare.",
    hours: "1-3 hrs / week",
    days: "1-2 days / week",
    href: "/levels-of-care/outpatient-program/",
    bullets: [
      "Weekly group therapy",
      "Aftercare & alumni programming",
      "Insurance accepted",
    ],
  },
];

export default function LevelsOfCareIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="A Continuum of Care"
        headline="Levels of Care at Mountain View."
        body="Whether you need intensive daily structure or weekly support, our continuum-of-care model meets you where you are — and adapts as recovery evolves."
      />

      {/* Program cards */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PROGRAMS.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col bg-[var(--mvt-cream)] p-8 shadow-sm ring-1 ring-black/5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-teal)]">
                  {p.tagline}
                </p>
                <h2 className="mt-3 font-heading text-[28px] leading-tight text-[var(--mvt-ink)] sm:text-[32px]">
                  {p.name}
                  <span className="block text-[var(--mvt-muted)] sm:inline sm:text-inherit">
                    {" "}
                    <span className="italic text-[var(--mvt-teal)]">({p.abbreviation})</span>
                  </span>
                </h2>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-black/10 py-4 text-[12px]">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[var(--mvt-muted)]">
                      Hours
                    </dt>
                    <dd className="mt-1 font-heading text-[20px] text-[var(--mvt-ink)]">
                      {p.hours}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[var(--mvt-muted)]">
                      Days
                    </dt>
                    <dd className="mt-1 font-heading text-[20px] text-[var(--mvt-ink)]">
                      {p.days}
                    </dd>
                  </div>
                </dl>

                <p className="mt-5 text-[14px] leading-6 text-[var(--mvt-text)]">
                  {p.body}
                </p>

                <ul className="mt-5 space-y-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[13px] leading-6 text-[var(--mvt-text)]"
                    >
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--mvt-teal)] text-white">
                        <i className="ri-check-line text-[10px]" aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={p.href}
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] underline underline-offset-4 hover:text-[var(--mvt-teal)]"
                >
                  Explore {p.abbreviation}
                  <i className="ri-arrow-right-line text-base" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable
        highlight="php"
        eyebrow="Compare Programs"
        headline={
          <>
            How Our <span className="italic">Levels of Care</span> Compare
          </>
        }
      />

      <FinancialConcierge />
    </>
  );
}
