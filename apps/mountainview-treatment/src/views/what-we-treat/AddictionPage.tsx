import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion, { type Faq } from "@/views/levels-of-care/FaqAccordion";
import { SITE } from "@/lib/site";

export type WithdrawalSection = {
  headline: string;
  intro: string;
  isMedical: boolean;          // shows a medical-disclaimer banner when true
  timeline: { phase: string; duration: string; symptoms: string[] }[];
  note: string;                // bottom callout copy
};

export type ComorbiditiesSection = {
  headline: string;
  intro: string;
  items: { icon: string; title: string; body: string }[];
  closingNote: string;
};

export type AddictionPageProps = {
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  heroBody: string;
  // What is it
  whatHeadline: string;
  whatBody: string[];
  // Signs section
  signsHeadline: string;
  signsIntro: string;
  signs: { label: string; desc: string }[];
  // Optional: withdrawal & detox (white bg, between Signs and Approach)
  withdrawal?: WithdrawalSection;
  // Treatment approach
  approachHeadline: string;
  approachBody: string;
  approaches: { icon: string; title: string; body: string }[];
  // Optional: co-occurring conditions (cream bg, between Approach and LoC)
  comorbidities?: ComorbiditiesSection;
  // Levels of care
  locBody: string;
  // Why MVT
  whyPoints: { icon: string; title: string; body: string }[];
  faqs: Faq[];
};

const LOC_ITEMS = [
  { num: "01", title: "Partial Hospitalization Program (PHP)", href: "/levels-of-care/partial-hospitalization-program/", body: "Intensive daytime programming 5–6 hours per day while you return to supportive housing each evening. Ideal as a first step when full residential treatment isn't required." },
  { num: "02", title: "Intensive Outpatient Program (IOP)", href: "/levels-of-care/intensive-outpatient-program/", body: "Approximately 9–12 structured hours per week, designed for individuals stepping down from PHP or whose lives allow continued work, school, or family engagement." },
  { num: "03", title: "Outpatient Program (OP)", href: "/levels-of-care/outpatient-program/", body: "Flexible individual and group therapy scheduled around your routine — a critical long-term support structure for sustained recovery." },
];

export default function AddictionPage(p: AddictionPageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-[85vh] flex-col justify-end overflow-hidden text-white lg:min-h-[760px]">
        <Image
          src={p.heroImage}
          alt={p.heroAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "linear-gradient(to top, #0a100d 0%, #0a100dec 42%, #0a100d55 68%, transparent 100%)" }}
        />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            {p.eyebrow}
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[68px] lg:text-[84px]">
            {p.headline}{" "}
            <span className="italic text-[var(--mvt-teal-light)]">{p.headlineItalic}</span>
          </h1>
          <p className="mt-6 max-w-lg text-[16px] leading-7 text-white/70">{p.heroBody}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill text-[15px]" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2.5 border border-white/40 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10"
            >
              Verify Insurance
              <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-8">
            {[
              { icon: "ri-map-pin-2-line", label: "Seattle, Washington" },
              { icon: "ri-time-line", label: "Same-Day Admissions" },
              { icon: "ri-shield-check-line", label: "Insurance Accepted" },
              { icon: "ri-lock-2-line", label: "Confidential Care" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[12px] font-medium text-white/60">
                <i className={`${icon} text-[var(--mvt-teal-light)] text-[14px]`} aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Is It ── */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          {/* Top row: label left, headline right */}
          <div className="grid items-end gap-8 lg:grid-cols-[200px_1fr]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)] lg:pb-2">
              Understanding<br />Addiction
            </p>
            <h2 className="font-heading text-[38px] leading-[1.0] tracking-tight sm:text-[52px] lg:text-[62px]">
              {p.whatHeadline}
            </h2>
          </div>

          {/* Rule */}
          <div className="mt-10 h-px w-full bg-black/8" />

          {/* Lede paragraph — full width, larger text */}
          <p className="mt-8 border-l-2 border-[var(--mvt-teal)] pl-6 text-[17px] leading-[1.8] text-[var(--mvt-ink)] lg:max-w-[80%]">
            {p.whatBody[0]}
          </p>

          {/* Remaining paragraphs in 2-col grid */}
          {p.whatBody.length > 1 && (
            <div className="mt-6 grid gap-x-14 gap-y-5 sm:grid-cols-2">
              {p.whatBody.slice(1).map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.75] text-[var(--mvt-text)]">{para}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Signs & Symptoms ── */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Warning Signs
          </p>
          <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
            {p.signsHeadline}
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--mvt-text)]">{p.signsIntro}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.signs.map((sign, i) => (
              <div key={sign.label} className="flex items-start gap-5 border border-black/8 bg-white p-7">
                <span className="shrink-0 font-heading text-[32px] leading-none text-[var(--mvt-teal)]/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--mvt-ink)]">{sign.label}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-[var(--mvt-text)]">{sign.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Withdrawal & Detox ── */}
      {p.withdrawal && (
        <section className="bg-white text-[var(--mvt-ink)]">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
              Withdrawal & Detox
            </p>
            <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
              {p.withdrawal.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[var(--mvt-text)]">
              {p.withdrawal.intro}
            </p>

            {p.withdrawal.isMedical && (
              <div className="mt-8 flex items-start gap-4 border border-[var(--mvt-teal)]/25 bg-[var(--mvt-teal)]/5 p-5">
                <i className="ri-alert-line mt-0.5 shrink-0 text-xl text-[var(--mvt-teal)]" aria-hidden="true" />
                <p className="text-[13px] leading-[1.65] text-[var(--mvt-ink)]">
                  <strong className="font-semibold">Medical supervision required.</strong> Withdrawal from this substance can be medically serious. Never attempt to stop abruptly without clinical guidance. Our admissions team can help arrange a safe transition.
                </p>
              </div>
            )}

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {p.withdrawal.timeline.map((phase, i) => (
                <div key={phase.phase} className="relative border border-black/8 bg-[var(--mvt-cream)] p-8">
                  <span className="font-heading text-[56px] font-light leading-none text-[var(--mvt-teal)]/12 select-none absolute top-4 right-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-teal)]">
                    {phase.duration}
                  </p>
                  <p className="mt-2 font-heading text-[22px] leading-tight text-[var(--mvt-ink)]">
                    {phase.phase}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {phase.symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] leading-[1.6] text-[var(--mvt-text)]">
                        <i className="ri-checkbox-blank-circle-fill mt-1.5 shrink-0 text-[5px] text-[var(--mvt-teal)]" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-4 border-l-2 border-[var(--mvt-teal)] bg-[var(--mvt-cream)] px-6 py-5">
              <p className="text-[14px] leading-[1.65] text-[var(--mvt-ink)]">{p.withdrawal.note}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Treatment Approach ── */}
      <section className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">
                Our Approach
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] text-white sm:text-[50px]">
                {p.approachHeadline}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-white/70">{p.approachBody}</p>
              <a
                href={SITE.phone.href}
                className="mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-teal)] hover:text-white"
              >
                <i className="ri-phone-fill" aria-hidden="true" />
                {SITE.phone.display}
              </a>
            </div>
            <div className="space-y-4">
              {p.approaches.map((item) => (
                <div key={item.title} className="flex items-start gap-6 border border-white/10 bg-white/5 p-7">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--mvt-teal-light)]/30 text-[var(--mvt-teal-light)]">
                    <i className={`${item.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-[13px] leading-[1.65] text-white/70">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Co-Occurring Conditions ── */}
      {p.comorbidities && (
        <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
              <div className="lg:sticky lg:top-24">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                  <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                  Dual Diagnosis
                </p>
                <h2 className="mt-5 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[48px]">
                  {p.comorbidities.headline}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                  {p.comorbidities.intro}
                </p>
                <p className="mt-6 border-l-2 border-[var(--mvt-teal)] pl-5 text-[13px] leading-[1.65] text-[var(--mvt-muted)]">
                  {p.comorbidities.closingNote}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
                {p.comorbidities.items.map((item) => (
                  <div key={item.title} className="border border-black/8 bg-white p-7">
                    <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                      <i className={`${item.icon} text-xl`} aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-[14px] font-semibold text-[var(--mvt-ink)]">{item.title}</p>
                    <p className="mt-2 text-[13px] leading-[1.6] text-[var(--mvt-text)]">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Levels of Care ── */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Programs at Mountain View
          </p>
          <div className="mt-5 grid gap-2 lg:grid-cols-[1fr_auto]">
            <h2 className="font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
              Levels of Care <span className="italic">Available</span>
            </h2>
            <div className="hidden lg:flex lg:items-end lg:pb-2">
              <p className="max-w-xs text-[13px] leading-5 text-[var(--mvt-muted)]">{p.locBody}</p>
            </div>
          </div>
          <div className="mt-12 space-y-4">
            {LOC_ITEMS.map((loc) => (
              <Link
                key={loc.num}
                href={loc.href}
                className="group flex items-start gap-6 border border-black/8 bg-white p-8 transition hover:border-[var(--mvt-teal)]/40 hover:shadow-md"
              >
                <span className="shrink-0 font-heading text-[48px] font-light leading-none text-[var(--mvt-teal)]/20">
                  {loc.num}
                </span>
                <div className="flex-1 pt-1">
                  <p className="text-[15px] font-semibold text-[var(--mvt-ink)]">{loc.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[var(--mvt-text)]">{loc.body}</p>
                </div>
                <i className="ri-arrow-right-line mt-2 shrink-0 text-[var(--mvt-teal)]/40 transition group-hover:translate-x-1 group-hover:text-[var(--mvt-teal)]" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Mountain View ── */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
              Why Mountain View Treatment
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            </p>
            <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
              A Different Kind of <span className="italic">Recovery</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.whyPoints.map((item) => (
              <div key={item.title} className="border border-black/8 bg-white p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                  <i className={`${item.icon} text-2xl`} aria-hidden="true" />
                </span>
                <p className="mt-5 text-[14px] font-semibold text-[var(--mvt-ink)]">{item.title}</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-[var(--mvt-text)]">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2.5 border border-[var(--mvt-ink)]/25 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:border-[var(--mvt-ink)]"
            >
              Verify Insurance
              <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FaqAccordion
        eyebrow="Common Questions"
        headline={<>Frequently Asked <span className="italic">Questions</span></>}
        faqs={p.faqs}
      />

      <FinancialConcierge />
    </>
  );
}
