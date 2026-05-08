import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";

const PILLARS = [
  {
    icon: "ri-heart-line",
    title: "Compassion First",
    body:
      "Every intervention starts with empathy — for the person struggling and for the family that has carried the weight for too long. Shame and confrontation rarely work; understanding and structure do.",
  },
  {
    icon: "ri-group-line",
    title: "The Whole Family",
    body:
      "Addiction is a family disease. Our process resets the entire family system, not just the person who is using. Real recovery happens when everyone heals together.",
  },
  {
    icon: "ri-route-line",
    title: "Beyond Day One",
    body:
      "Most intervention services end the moment your loved one accepts treatment. We stay engaged through detox, residential, outpatient, and long after — because that's where lasting recovery is built.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Honest Recommendations",
    body:
      "We only place loved ones in treatment programs we'd send our own family to. We have no financial relationships that compromise our recommendations — period.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="About Addiction Interventions"
        headline="Walking beside families through the hardest moment of their lives."
        body="Built by people who have lived this. Trusted by more than 1,500 families nationwide."
      />

      <TrustStrip />

      {/* Mission */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">
            Our Mission
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            We exist for the families who have tried everything.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            You've read the books. You've tried tough love. You've tried
            unconditional support. You've waited for rock bottom — and watched
            it move further out of reach. We are here for the moment you decide
            you are done waiting.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            Our job is not to fix your loved one. Our job is to give your family
            a clear path forward — and to walk it with you, every step of the
            way.
          </p>
        </div>
      </section>

      {/* David Gates */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <div className="rounded-3xl border border-[var(--color-divider)] bg-white p-8">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                Lead Interventionist & Co-Founder
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
                David Gates
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                CIP, ICAADC
              </p>
              <Link
                href="/david-gates"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sage-deep)] hover:text-[var(--color-ink)]"
              >
                Read David's full bio
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div>
              <p className="text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
                David has personally led more than 1,500 interventions across
                the United States. He approaches every situation with the same
                belief that has shaped our work from the beginning: families
                already have the love and the desire — what they're missing is
                the structure, the language, and the courage to say the things
                that need to be said.
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
                His work focuses on the entire family system. He believes
                interventions fail not because the addicted loved one refuses
                help, but because the family hasn't done the parallel work
                needed to support real change. That belief shapes how we
                prepare every family that calls us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              How We Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Four principles that shape every intervention.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[var(--color-divider)] bg-white p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                  <i className={`text-2xl ${p.icon}`}></i>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">
            Accredited & Trusted
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Held to the highest standards of clinical care.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            Addiction Interventions is accredited by The Joint Commission — the
            nation's oldest and most prestigious healthcare accreditor. The
            Joint Commission's Gold Seal is awarded only to organisations that
            meet rigorous standards of safety, quality, and continuous
            improvement.
          </p>
        </div>
      </section>

      <BottomCta
        title="Ready to talk?"
        body="Your first call is free, confidential, and judgment-free. Whether you call today or six months from now — we'll be here when you're ready."
      />
    </main>
  );
}
