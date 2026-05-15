import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion, { type Faq } from "@/views/levels-of-care/FaqAccordion";
import { SITE } from "@/lib/site";

export type InsurancePageProps = {
  carrier: string;
  slug: string;
  heroImage: string;
  headline: string;
  heroBody: string;
  aboutBody: string;
  memberStat: string;        // e.g. "39M+", "50M+", "9.6M"
  memberStatLabel: string;   // e.g. "Members served nationwide"
  planTypes: { label: string; desc: string }[];
  parityBody: string;
  necessityBody: string;
  levelsOfCare: { title: string; body: string }[];
  outOfPocket: { label: string; desc: string }[];
  oonNote: string;
  preAuthBody: string;
  concurrentBody: string;
  privacyBody: string;
  privacyNote?: string;
  vobIntro: string;
  vobBullets: string[];
  faqs: Faq[];
};

export default function InsurancePage(p: InsurancePageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-[85vh] flex-col justify-end overflow-hidden text-white lg:min-h-[760px]">
        <Image
          src={p.heroImage}
          alt={`Mountain View Treatment accepts ${p.carrier} insurance`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        {/* Gradient: transparent top → dark bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to top, #213729 0%, #213729cc 40%, #21372940 70%, transparent 100%)",
          }}
        />

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24">
          {/* Breadcrumb eyebrow */}
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            Admissions &nbsp;/&nbsp; Insurance
          </p>

          {/* Headline */}
          <h1 className="mt-6 max-w-3xl font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[68px] lg:text-[84px]">
            {p.headline}
          </h1>

          <p className="mt-6 max-w-lg text-[16px] leading-7 text-white/70">{p.heroBody}</p>

          {/* CTAs */}
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
              Verify Benefits
              <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-8">
            {[
              { icon: "ri-shield-check-line", label: "In-Network Provider" },
              { icon: "ri-file-check-line", label: "Free Benefits Verification" },
              { icon: "ri-time-line", label: "Same-Day Admissions" },
              { icon: "ri-lock-2-line", label: "HIPAA Compliant" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[12px] font-medium text-white/60">
                <i className={`${icon} text-[var(--mvt-teal-light)] text-[14px]`} aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Anchor strip ── */}
      <div className="bg-[var(--mvt-ink)] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Quick navigation
          </p>
          <nav className="flex flex-wrap gap-6">
            {[
              ["About " + p.carrier, "#about"],
              ["Coverage", "#coverage"],
              ["Levels of Care", "#levels"],
              ["Your Costs", "#costs"],
              ["Verify Benefits", "#verify"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">

            {/* Left — about text */}
            <div className="lg:pr-16">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                About {p.carrier}
              </p>
              <h2 className="mt-5 font-heading text-[40px] leading-[1.05] tracking-tight sm:text-[52px]">
                About <span className="italic">{p.carrier}</span>
              </h2>
              <p className="mt-6 text-[15px] leading-[1.75] text-[var(--mvt-text)]">{p.aboutBody}</p>

              {/* Large pull stat */}
              <div className="mt-10 border-l-2 border-[var(--mvt-teal)] pl-6">
                <p className="font-heading text-[54px] leading-none text-[var(--mvt-ink)]">{p.memberStat}</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-muted)]">
                  {p.memberStatLabel}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div aria-hidden="true" className="hidden bg-black/8 lg:block" />

            {/* Right — plan types */}
            <div className="lg:pl-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-muted)]">
                {p.carrier} Plan Types
              </p>
              <div className="mt-5 space-y-0 divide-y divide-black/8">
                {p.planTypes.map((pt, i) => (
                  <div key={pt.label} className="flex items-start gap-5 py-5">
                    <span className="mt-0.5 shrink-0 font-heading text-[28px] leading-none text-[var(--mvt-teal)]/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--mvt-ink)]">{pt.label}</p>
                      <p className="mt-0.5 text-[13px] leading-5 text-[var(--mvt-muted)]">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Coverage Works ── */}
      <section id="coverage" className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">
              How {p.carrier} Covers Behavioral Health Treatment
            </p>
            <h2 className="mt-5 max-w-2xl font-heading text-[38px] leading-tight text-white sm:text-[50px]">
              Federal Law Protects Your <span className="italic">Coverage Rights</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: "ri-scales-3-line",
                title: "Mental Health Parity",
                body: p.parityBody,
                accent: "ri-government-line",
                tag: "Parity Act 2008",
              },
              {
                icon: "ri-stethoscope-line",
                title: "Medical Necessity",
                body: p.necessityBody,
                accent: "ri-clipboard-line",
                tag: "ASAM Criteria",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="relative overflow-hidden border border-white/10 bg-white/5 p-10 backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 text-[120px] leading-none text-white/[0.03]">
                  <i className={card.accent} aria-hidden="true" />
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center border border-[var(--mvt-teal-light)]/30 text-[var(--mvt-teal-light)]">
                  <i className={`${card.icon} text-2xl`} aria-hidden="true" />
                </span>
                <div className="mt-2 inline-block rounded-full bg-[var(--mvt-teal-light)]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-teal-light)]">
                  {card.tag}
                </div>
                <h3 className="mt-5 font-heading text-[26px] leading-tight text-white">{card.title}</h3>
                <p className="mt-4 text-[14px] leading-[1.7] text-white/70">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Levels of Care ── */}
      <section id="levels" className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-start">
            {/* Sticky left label */}
            <div className="lg:sticky lg:top-24">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                Levels of Care Covered
              </p>
              <h2 className="mt-5 font-heading text-[40px] leading-[1.05] tracking-tight sm:text-[52px]">
                What {p.carrier}{" "}
                <span className="italic">Covers</span> at Mountain View
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                {p.carrier} plans generally provide coverage across our full continuum of care when
                medically necessary. Our admissions team works directly with {p.carrier} to secure
                appropriate levels of care for each individual.
              </p>
              <a
                href={SITE.phone.href}
                className="mt-8 inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill" aria-hidden="true" />
                Speak With Admissions
              </a>
            </div>

            {/* Right — care cards */}
            <div className="space-y-4">
              {p.levelsOfCare.map((loc, i) => (
                <article
                  key={loc.title}
                  className="flex items-start gap-6 border border-black/8 bg-white p-8 transition hover:border-[var(--mvt-teal)]/40 hover:shadow-md"
                >
                  <span className="shrink-0 font-heading text-[48px] font-light leading-none text-[var(--mvt-teal)]/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[15px] font-semibold text-[var(--mvt-ink)]">{loc.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-[var(--mvt-text)]">{loc.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Understanding Your Costs ── */}
      <section id="costs" className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Understanding Out-of-Pocket Costs
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
            <h2 className="font-heading text-[40px] leading-[1.05] tracking-tight sm:text-[52px]">
              Your Cost-Sharing, <span className="italic">Explained</span>
            </h2>
            <div className="hidden sm:flex sm:items-end sm:pb-2">
              <p className="max-w-xs text-[13px] leading-5 text-[var(--mvt-muted)]">{p.oonNote}</p>
            </div>
          </div>

          {/* 4 cost terms — large editorial cards */}
          <div className="mt-12 grid gap-px overflow-hidden border border-black/8 sm:grid-cols-2 lg:grid-cols-4">
            {p.outOfPocket.map((item) => (
              <div key={item.label} className="bg-white p-8">
                <i className="ri-coins-line text-[32px] text-[var(--mvt-teal)]/40" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-[22px] leading-tight">{item.label}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-[var(--mvt-text)]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Pre-auth + Privacy two-col */}
          <div className="mt-12 grid gap-8 border-t border-black/8 pt-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                <i className="ri-file-text-line text-xl" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-[28px] leading-tight">
                Pre-Authorization &amp; Concurrent Review
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[var(--mvt-text)]">{p.preAuthBody}</p>
              <p className="mt-3 text-[14px] leading-[1.7] text-[var(--mvt-text)]">{p.concurrentBody}</p>
            </div>
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                <i className="ri-lock-2-line text-xl" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-[28px] leading-tight">
                Privacy &amp; Confidentiality
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[var(--mvt-text)]">{p.privacyBody}</p>
              {p.privacyNote && (
                <p className="mt-3 text-[14px] leading-[1.7] text-[var(--mvt-text)]">{p.privacyNote}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Verifying Benefits — full-width dark CTA ── */}
      <section id="verify" className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">

          {/* Top row */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">
                No-Cost Benefits Verification
              </p>
              <h2 className="mt-5 font-heading text-[42px] leading-[1.0] text-white sm:text-[56px]">
                Verifying {p.carrier} Benefits{" "}
                <span className="italic">at Mountain View</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-white/70">{p.vobIntro}</p>
            </div>

            {/* Carrier in-network callout */}
            <div className="border border-white/10 bg-white/5 p-8">
              <i className="ri-shield-check-line text-[52px] text-[var(--mvt-teal-light)]" aria-hidden="true" />
              <p className="mt-4 font-heading text-[26px] leading-tight text-white">
                {p.carrier} In-Network
              </p>
              <p className="mt-3 text-[14px] leading-[1.65] text-white/65">
                As an in-network provider, Mountain View Treatment offers lower deductibles, reduced
                coinsurance, and a lower out-of-pocket maximum for {p.carrier} members.
              </p>
              <div className="mt-7 space-y-2.5">
                {["No-cost benefits verification", "Same-day admissions available", "Concurrent review managed by our team"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px] text-white/65">
                    <i className="ri-check-line text-[var(--mvt-teal-light)]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bullets + CTA bottom row */}
          <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-teal-light)]">
                Verification confirms:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.vobBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-line mt-0.5 shrink-0 text-[var(--mvt-teal-light)] text-[16px]" aria-hidden="true" />
                    <span className="text-[13px] leading-5 text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12px] text-white/40">
                There is no cost or obligation associated with a benefits verification.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center justify-center gap-3 bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-teal)] hover:text-white"
              >
                <i className="ri-phone-fill text-[14px]" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <Link
                href="/admissions/"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white"
              >
                Submit Online
                <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
              </Link>
            </div>
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
