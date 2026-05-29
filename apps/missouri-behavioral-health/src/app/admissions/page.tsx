import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Admissions | Missouri Behavioral Health",
  description:
    "Starting treatment at Missouri Behavioral Health is simple. Learn about our admissions process, insurance verification, and what to expect. Call 417-771-5305 — available 24/7.",
  alternates: { canonical: "/admissions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions", fallback);
}

const STEPS = [
  {
    icon: "ri-phone-line",
    title: "Reach out",
    desc: "Call us or submit a form. A caring admissions coordinator answers your questions — confidentially and without judgment.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Verify insurance",
    desc: "We confirm your benefits and explain your coverage in plain language, so there are no financial surprises.",
  },
  {
    icon: "ri-clipboard-line",
    title: "Clinical assessment",
    desc: "A licensed clinician completes a brief assessment to understand your history, needs, and goals for treatment.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Begin treatment",
    desc: "We build your personalized plan and schedule your start date — often the same day for those who need it.",
  },
];

const WHAT_TO_BRING = [
  "A photo ID and your insurance card",
  "A list of current medications and dosages",
  "Names and contact info for current providers (if any)",
  "Comfortable clothing for longer program days",
  "Any questions you'd like your care team to answer",
];

const FAQS = [
  {
    q: "How quickly can I start treatment?",
    a: "For many clients, admission can happen the same day or within 24–48 hours. Our coordinators are available 24/7 to move quickly when you're ready.",
  },
  {
    q: "Will my insurance cover treatment?",
    a: "Most major private insurance plans cover mental health and substance use treatment. We verify your specific benefits before admission, at no cost to you.",
  },
  {
    q: "Is the process confidential?",
    a: "Completely. Every conversation and record is protected by HIPAA. Nothing is shared without your written consent.",
  },
  {
    q: "What if I'm not sure I need treatment?",
    a: "That's okay. A no-obligation conversation with our team can help you understand your options. There's no pressure — just clear, compassionate guidance.",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${SITE_IMAGES.aboutHeroLandscape}')` }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(18,46,24,0.97) 35%, rgba(18,46,24,0.7) 100%)",
          }}
        />
        <div className={`${CONTAINER} relative py-16 lg:py-24`}>
          <nav
            className="mb-6 flex items-center gap-2 font-body text-[11px] text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <span className="text-white/60">Admissions</span>
          </nav>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-sage" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
              Getting Started
            </span>
          </div>
          <h1
            className="max-w-3xl font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Starting treatment is easier than you think.
          </h1>
          <p className="mt-5 max-w-xl font-body text-[1.0625rem] leading-relaxed text-white/65">
            Taking the first step is the hardest part. Our admissions team handles the rest — from
            insurance to scheduling — so you can focus on getting well.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white shadow-xl shadow-black/30 transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden />
              Call 24/7 — {PHONE_DISPLAY}
            </a>
            <Link
              href="/verify-insurance"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
            >
              <i className="ri-shield-check-line" aria-hidden />
              Verify insurance
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-[88px]">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Admissions Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Four steps from first call to first session.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-mbh-forest/8 bg-cream p-7">
                <span className="font-display text-4xl font-bold text-mbh-green/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${step.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-mbh-forest">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring + insurance */}
      <section className="bg-cream-alt py-[88px]">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What to Bring
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Come prepared, but don&apos;t worry.
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
              Here&apos;s a short checklist for your first day. If you&apos;re missing something,
              we&apos;ll help you sort it out — it won&apos;t delay your care.
            </p>
            <ul className="mt-6 space-y-3">
              {WHAT_TO_BRING.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                    <i className="ri-check-line text-[10px] text-mbh-green" aria-hidden />
                  </span>
                  <span className="font-body text-sm leading-relaxed text-mbh-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-mbh-forest/10 bg-white p-8 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mbh-green/10">
              <i className="ri-shield-check-line text-2xl text-mbh-green" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-mbh-forest">
              Insurance &amp; payment
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-mbh-body">
              We&apos;re in-network with most major carriers including Aetna, Anthem, Blue Cross Blue
              Shield, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. We verify your benefits before
              admission so you know your costs up front.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
              >
                Verify my insurance
              </Link>
              <Link
                href="/levels-of-care-missouri"
                className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-6 py-3 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
              >
                Explore levels of care
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-[88px]">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Common admissions questions.
            </h2>
            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline"
            >
              {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
            </a>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-mbh-forest/8 bg-cream p-6">
                <h3 className="font-display text-base font-semibold text-mbh-forest">{faq.q}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
