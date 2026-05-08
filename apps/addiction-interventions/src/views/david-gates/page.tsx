import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";

const CREDENTIALS = [
  {
    icon: "ri-award-line",
    label: "Certified Intervention Professional (CIP)",
  },
  {
    icon: "ri-medal-line",
    label: "Internationally Certified Advanced Alcohol & Drug Counselor (ICAADC)",
  },
  {
    icon: "ri-shield-check-line",
    label: "Trained in ARISE®, Johnson Model, and Systemic Family Intervention",
  },
  {
    icon: "ri-heart-line",
    label: "Person in long-term recovery — over two decades",
  },
];

const HIGHLIGHTS = [
  {
    stat: "1,500+",
    label: "Families personally guided through intervention",
  },
  {
    stat: "20+",
    label: "Years working in addiction treatment and recovery",
  },
  {
    stat: "50",
    label: "States served — interventions coordinated nationwide",
  },
];

export default function DavidGatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Lead Interventionist & Co-Founder"
        headline="David Allen Gates"
        body="Over 5,000 families supported. More than two decades of front-line intervention experience. A practitioner who has walked the road himself."
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_david-gates_hero01.jpg"
        imageAlt="David Allen Gates, certified addiction interventionist"
        showTrustLine={false}
      />

      <TrustStrip />

      {/* Bio */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">About David</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Two decades of leadership in addiction recovery.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            <p>
              David Allen Gates has more than 20 years of experience managing and directing nationally recognised addiction treatment programs. He has trained intervention specialists, treatment center clinicians, and family coaches across the United States — and he has personally led more than 1,500 interventions for families in crisis.
            </p>
            <p>
              David's approach is built on a single conviction: families already have the love and the desire to help. What they are missing is the structure, the language, and the courage to say the things that most need to be said. His role is to provide that scaffolding — and to walk alongside the family until their loved one is safely in recovery.
            </p>
            <p>
              He is in long-term recovery himself, which informs every conversation he has with the families who call. He knows what it is to be the person on the other side of the intervention table. He knows what it takes to choose recovery, to keep choosing it, and to rebuild a life worth living.
            </p>
            <p>
              David has worked in residential treatment, dual-diagnosis programs, executive recovery, and adolescent treatment — giving him the rare ability to match a family's specific situation to the right level of care. He maintains personal relationships with vetted treatment programs nationwide and never recommends a placement his own family would not be welcomed into.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-[var(--color-divider)] bg-[var(--color-cream)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-[var(--color-divider)] bg-white p-7 text-center"
              >
                <p className="text-5xl font-semibold tracking-tight text-[var(--color-sage-deep)] md:text-6xl">
                  {h.stat}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">Credentials</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Trained, certified, and in long-term recovery.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {CREDENTIALS.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 rounded-2xl border border-[var(--color-divider)] bg-white p-6"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                  <i className={`text-2xl ${c.icon}`}></i>
                </div>
                <p className="text-base leading-6 text-[var(--color-ink)]">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy pull-quote */}
      <section className="border-t border-[var(--color-divider)] bg-[var(--color-cream)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">Philosophy</p>
          <blockquote className="mt-6 text-2xl font-medium leading-9 text-[var(--color-ink)] md:text-3xl md:leading-[1.4]">
            &ldquo;Recovery is not the moment a loved one walks into treatment. It is the years of healing that follow — for them, and for the family that loves them.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            David Gates · Lead Interventionist
          </p>
        </div>
      </section>

      {/* Read more */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            Want to read more about how we work as a team?
          </p>
          <Link
            href="/about-us"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sage-deep)] hover:text-[var(--color-ink)]"
          >
            Read about Addiction Interventions
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      <BottomCta
        title="Ready to talk with David?"
        body="Your first call is free, confidential, and judgment-free. David personally returns calls from families in crisis — usually within the hour."
      />
    </main>
  );
}
