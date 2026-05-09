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
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_why-choose-us_hero01.jpg"
        imageAlt="Professional interventionist in a counseling office setting"
      />

      <TrustStrip />

      {/* Intro prose */}
      <section className="bg-[#F5F3E7] py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="brand-eyebrow mb-3 text-[#8FAC87]">Our Philosophy</p>
          <h2 className="font-heading mb-5 text-3xl font-bold leading-tight text-[#1A1A17] md:text-4xl">
            What we actually believe about <span className="italic text-[#507969]">interventions and recovery</span>
          </h2>
          <div className="grid gap-5 text-base leading-relaxed text-[#4B4B4B] md:grid-cols-2">
            <p>
              Most intervention services operate on a transactional model: a family calls in distress, a professional shows up for a few hours, the loved one is placed in a program, and the service disappears. That model produces short-term placements that often don&apos;t hold. Addiction and mental health disorders are not single-day problems, and the family dynamics that fuel them don&apos;t resolve the moment someone accepts treatment.
            </p>
            <p>
              We built Addiction Interventions around a different belief: that lasting recovery requires the entire family system to change, not just the person in treatment. That means we invest in preparing every family member before the intervention day, we stay engaged through every transition in the treatment process, and we are available to families in the months that follow — because the hardest moments often come after placement, not before it.
            </p>
            <p>
              We also believe in radical transparency about treatment quality. We have no financial relationships with treatment centres that would bias our referrals. When we recommend a programme, it is because we believe it is clinically appropriate for that specific person — not because a referral fee is attached to the placement. Families deserve honest counsel, especially when the stakes are this high.
            </p>
            <p>
              Our interventionists are certified, credentialed, and experienced across every substance class and major mental health condition. We have worked in all 50 states, with families from every background and income level, in situations ranging from early-stage concern to active medical crisis. Whatever you are facing, we have almost certainly faced something similar — and we know what works.
            </p>
          </div>
        </div>
      </section>

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
