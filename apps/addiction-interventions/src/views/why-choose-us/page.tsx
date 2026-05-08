import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";

const COMPARE = [
  {
    them: "Books a single 90-minute intervention session.",
    us: "Engages with the family from day one through long-term recovery.",
  },
  {
    them: "Reads from a script.",
    us: "Listens to your specific situation, then designs the intervention around it.",
  },
  {
    them: "Hands you a list of treatment centres.",
    us: "Personally vets every program and only recommends ones we'd send our own family to.",
  },
  {
    them: "Disappears after your loved one accepts treatment.",
    us: "Stays engaged through detox, residential, outpatient, and long-term recovery.",
  },
  {
    them: "Charges premium rates for celebrity-style 'reality TV' interventions.",
    us: "Quotes honest, transparent pricing on the first call. Often less than one month of continued addiction.",
  },
  {
    them: "Treats only the addicted person.",
    us: "Treats the entire family system — because addiction never lives in just one person.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: "ri-trophy-line",
    title: "1,500+ families helped",
    body:
      "Two decades of frontline experience across all 50 states. We have seen — and successfully navigated — almost every situation a family can face.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Joint Commission accredited",
    body:
      "We meet the same rigorous safety, quality, and continuous-improvement standards as the nation's leading hospital systems.",
  },
  {
    icon: "ri-time-line",
    title: "24/7 mobilisation",
    body:
      "Most families have a certified interventionist on the ground within 24–48 hours. For active crises, we move the same day.",
  },
  {
    icon: "ri-team-line",
    title: "Family-system focus",
    body:
      "Real recovery happens when the whole family heals — not just the person using. Our process resets the entire system.",
  },
  {
    icon: "ri-route-line",
    title: "Active beyond day one",
    body:
      "Most providers vanish after placement. We stay engaged through every transition — detox, residential, outpatient, and beyond.",
  },
  {
    icon: "ri-handshake-line",
    title: "No pay-to-play referrals",
    body:
      "We have no financial relationships with treatment centres that would bias our recommendations. You get our honest opinion, every time.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Why Families Choose Us"
        headline="The intervention you actually need — not the one you saw on TV."
        body="A different methodology, a different definition of success, and a team that stays with you long after day one."
      />

      <TrustStrip />

      {/* Differentiators */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              What Sets Us Apart
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Six reasons families pick up the phone — and stay.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-[var(--color-divider)] bg-white p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                  <i className={`text-2xl ${d.icon}`}></i>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              How We're Different
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Most intervention services vs. Addiction Interventions.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--color-divider)] bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b border-[var(--color-divider)] bg-white p-6 md:border-b-0 md:border-r">
                <p className="brand-eyebrow text-[var(--color-ink-muted)]">
                  Most providers
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-ink-muted)]">
                  The traditional model
                </h3>
              </div>
              <div className="bg-[var(--color-cream)] p-6">
                <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                  Addiction Interventions
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                  How we actually work
                </h3>
              </div>
            </div>
            <div className="divide-y divide-[var(--color-divider)]">
              {COMPARE.map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-b border-[var(--color-divider)] p-6 text-sm leading-6 text-[var(--color-ink-muted)] md:border-b-0 md:border-r">
                    <i className="ri-close-circle-line mr-2 text-base text-[var(--color-ink-muted)]"></i>
                    {row.them}
                  </div>
                  <div className="bg-white/60 p-6 text-sm leading-6 text-[var(--color-ink)]">
                    <i className="ri-checkbox-circle-line mr-2 text-base text-[var(--color-sage-deep)]"></i>
                    {row.us}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BottomCta
        title="Choose a team that stays."
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what we'd do if it were our family."
      />
    </main>
  );
}
