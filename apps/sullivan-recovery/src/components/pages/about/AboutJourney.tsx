import Link from "next/link";
import AboutSectionHeader from "./AboutSectionHeader";

const STEPS = [
  {
    num: "01",
    phase: "Reach Out",
    title: "A conversation, not a sales pitch",
    desc: "Call, text, or message us anytime. Our admissions team listens first — then explains options clearly.",
    icon: "ri-phone-line",
  },
  {
    num: "02",
    phase: "Assessment",
    title: "Clinical evaluation & insurance",
    desc: "We review your history, verify benefits, and recommend the right level of care — often same-day.",
    icon: "ri-file-search-line",
  },
  {
    num: "03",
    phase: "Admissions",
    title: "Welcome to Sullivan Recovery",
    desc: "Private intake, orientation, and immediate connection with your care team in Mission Viejo.",
    icon: "ri-door-open-line",
  },
  {
    num: "04",
    phase: "Treatment",
    title: "Detox, therapy & holistic care",
    desc: "Medical supervision, individualized therapy, and experiential programs under one coordinated plan.",
    icon: "ri-heart-2-line",
  },
  {
    num: "05",
    phase: "Aftercare",
    title: "Your journey continues",
    desc: "Discharge planning, alumni support, and resources so progress lasts long after you leave.",
    icon: "ri-compass-3-line",
  },
];

export default function AboutJourney() {
  return (
    <section className="relative overflow-hidden bg-[var(--sr-moss)] py-[100px] text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--sr-fern)]/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[var(--sr-sage)]/10 blur-2xl" />

      <div className="sr-container relative z-10">
        <AboutSectionHeader
          variant="stacked"
          tone="dark"
          eyebrow="Your Journey, Your Success"
          title={
            <>
              From first contact to{" "}
              <span className="italic text-[var(--sr-sage)]">lasting recovery</span>
            </>
          }
        />

        <ol className="border-t border-b border-white/15">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="grid grid-cols-1 gap-4 border-b border-white/10 py-8 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-10 md:gap-8"
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 bg-white/5 text-lg text-[var(--sr-sage)]">
                  <i className={step.icon} aria-hidden />
                </span>
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 sm:hidden"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Step {step.num}
                </span>
              </div>

              <div className="min-w-0 sm:pr-4">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--sr-sage)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {step.phase}
                  </p>
                  <span
                    className="hidden text-3xl font-light tabular-nums text-white/15 sm:block"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                    aria-hidden
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="mb-2 text-xl font-light text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-2xl text-[14px] leading-[1.75] text-white/70"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-12">
          <Link
            href="/admissions-process/"
            className="inline-flex items-center justify-center gap-2 bg-[var(--sr-sage)] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-charcoal)] transition hover:bg-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Admissions Process
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
          <Link
            href="/contact-us/"
            className="inline-flex items-center justify-center gap-2 border border-white/35 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:border-white/70 hover:bg-white/10"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
