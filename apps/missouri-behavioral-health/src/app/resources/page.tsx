import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const fallback: Metadata = {
  title: "Recovery Resources | Missouri Behavioral Health",
  description:
    "Mental health and addiction recovery resources for Missouri. Crisis lines, treatment guides, condition information, and educational articles from Missouri Behavioral Health.",
  alternates: { canonical: "/resources" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/resources", fallback);
}

const CRISIS_LINES = [
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988 — free, confidential, 24/7",
    href: "tel:988",
    icon: "ri-24-hours-line",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741",
    href: "sms:741741",
    icon: "ri-message-3-line",
  },
  {
    name: "SAMHSA National Helpline",
    detail: "1-800-662-4357 — treatment referral & information",
    href: "tel:18006624357",
    icon: "ri-government-line",
  },
  {
    name: "Emergency",
    detail: "Call 911 if you or someone else is in immediate danger",
    href: "tel:911",
    icon: "ri-alarm-warning-line",
  },
];

const GUIDES = [
  {
    title: "Insurance & Treatment Guide",
    desc: "Understand coverage, levels of care, and how to pay for treatment.",
    href: "/treatment-guide",
    icon: "ri-file-list-3-line",
  },
  {
    title: "Levels of Care",
    desc: "Compare PHP, IOP, outpatient, and sober living to find the right fit.",
    href: "/levels-of-care-missouri",
    icon: "ri-stairs-line",
  },
  {
    title: "Verify Your Insurance",
    desc: "Confidentially check your benefits in about two minutes.",
    href: "/verify-insurance",
    icon: "ri-shield-check-line",
  },
];

const CONDITIONS = [
  { label: "Anxiety", href: "/anxiety-therapist-springfield-mo-3" },
  { label: "Depression", href: "/depression-therapist-springfield-mo" },
  { label: "Bipolar Disorder", href: "/bipolar-treatment-centers-in-missouri-2-2" },
  { label: "PTSD & Trauma", href: "/ptsd-counseling-springfield-mo" },
  { label: "OCD", href: "/ocd-treatment-in-missouri" },
  { label: "Alcohol Use", href: "/alcohol-rehab-center-in-missouri" },
  { label: "Opioid Use", href: "/drug-rehab-in-springfield-mo" },
  { label: "Mental Health Treatment", href: "/mental-health-treatment-missouri" },
];

export default function ResourcesPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="bg-mbh-forest-deep py-16 text-white lg:py-20">
        <div className={CONTAINER}>
          <nav
            className="mb-6 flex items-center gap-2 font-body text-[11px] text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <span className="text-white/60">Resources</span>
          </nav>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-sage" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
              Recovery Resources
            </span>
          </div>
          <h1
            className="max-w-3xl font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Support, guidance, and answers.
          </h1>
          <p className="mt-5 max-w-xl font-body text-[1.0625rem] leading-relaxed text-white/65">
            Whether you&apos;re seeking help for yourself or someone you love, these resources can help
            you understand your options and take the next step.
          </p>
        </div>
      </section>

      {/* Crisis lines */}
      <section className="bg-white py-[72px]">
        <div className={CONTAINER}>
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="font-body text-sm font-semibold text-red-800">
              <i className="ri-alarm-warning-line mr-1.5" aria-hidden />
              If you are in immediate danger, call 911. For emotional crisis support, call or text 988
              anytime.
            </p>
          </div>
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Crisis Support
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              24/7 crisis &amp; helplines.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CRISIS_LINES.map((line) => (
              <a
                key={line.name}
                href={line.href}
                className="group flex items-start gap-4 rounded-2xl border border-mbh-forest/10 bg-cream p-5 transition hover:border-mbh-green/30"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${line.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-mbh-forest transition group-hover:text-mbh-green">
                    {line.name}
                  </p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{line.detail}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-cream-alt py-[72px]">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Guides &amp; Tools
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Plan your path to treatment.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {GUIDES.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group flex flex-col rounded-2xl border border-mbh-forest/8 bg-white p-7 transition hover:border-mbh-green/30 hover:shadow-md hover:shadow-mbh-forest/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${guide.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-mbh-forest">
                  {guide.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{guide.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-mbh-green">
                  Learn more
                  <i className="ri-arrow-right-line transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions + blog */}
      <section className="bg-white py-[72px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Learn About Conditions
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {CONDITIONS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/12 bg-cream px-5 py-2.5 font-body text-sm font-medium text-mbh-ink transition hover:border-mbh-green hover:bg-mbh-green hover:text-white"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-mbh-forest p-8 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <i className="ri-article-line text-2xl text-mbh-sage" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">From our blog</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/65">
                Practical, clinician-reviewed articles on recovery, mental health, and supporting a
                loved one through treatment.
              </p>
              <Link
                href="/blog"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-mbh-green px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
              >
                Read the blog
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-mbh-forest/10 bg-cream py-16 text-center">
        <div className={CONTAINER}>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
            Ready to talk?
          </p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold text-mbh-forest">
            Our team is here 24/7 to help you find your next step.
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
