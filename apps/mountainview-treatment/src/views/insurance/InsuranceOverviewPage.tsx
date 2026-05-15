import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const CARRIERS = [
  {
    name: "Aetna",
    href: "/admissions/insurance/aetna/",
    desc: "One of the largest U.S. carriers. In-network coverage for PHP, IOP, and outpatient care.",
    stat: "39M+",
    statLabel: "members nationwide",
    icon: "ri-heart-pulse-line",
  },
  {
    name: "Anthem",
    href: "/admissions/insurance/anthem/",
    desc: "Anthem Blue Cross Blue Shield — the largest for-profit BCBS plan, covering 14 states.",
    stat: "14",
    statLabel: "states covered",
    icon: "ri-shield-cross-line",
  },
  {
    name: "Cigna",
    href: "/admissions/insurance/cigna/",
    desc: "Cigna Healthcare with Evernorth managing behavioral health authorization.",
    stat: "Evernorth",
    statLabel: "behavioral health",
    icon: "ri-first-aid-kit-line",
  },
  {
    name: "TRICARE",
    href: "/admissions/insurance/tricare/",
    desc: "DoD health program for active duty, National Guard, Reserve, retirees, and their families.",
    stat: "9.6M",
    statLabel: "beneficiaries",
    icon: "ri-medal-2-line",
  },
  {
    name: "UnitedHealthcare",
    href: "/admissions/insurance/uhc/",
    desc: "The largest U.S. health insurer with Optum Behavioral Health managing authorizations.",
    stat: "50M+",
    statLabel: "members served",
    icon: "ri-hospital-line",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Contact Our Team",
    body: "Call or submit your information online. Our admissions concierge is available 24/7.",
  },
  {
    num: "02",
    icon: "ri-file-list-3-line",
    title: "Provide Policy Info",
    body: "Share your insurance card details through our 100% HIPAA-compliant intake process.",
  },
  {
    num: "03",
    icon: "ri-search-eye-line",
    title: "We Verify Benefits",
    body: "Our financial advocates contact your carrier directly to uncover the full extent of your coverage.",
  },
  {
    num: "04",
    icon: "ri-check-double-line",
    title: "Clear Breakdown",
    body: "Within 1–2 hours we present a transparent, commitment-free breakdown of your benefits.",
  },
];

const WHY_ITEMS = [
  {
    icon: "ri-coins-line",
    title: "Lower Out-of-Pocket Costs",
    body: "In-network care means lower deductibles, reduced coinsurance rates, and a lower out-of-pocket maximum than out-of-network care.",
  },
  {
    icon: "ri-thumb-up-line",
    title: "Streamlined Authorization",
    body: "Our utilization review team manages pre-authorization and concurrent reviews directly with your carrier — you don't navigate that alone.",
  },
  {
    icon: "ri-lock-2-line",
    title: "No Balance Billing",
    body: "As a network provider we accept the insurer's allowable charge as payment in full. You pay only your applicable cost-share, never a surprise bill.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Same-Day Admissions",
    body: "Benefits verification typically completes within hours. If coverage is confirmed, same-day or next-day admission is frequently possible.",
  },
];

export default function InsuranceOverviewPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="bg-[var(--mvt-ink)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-24 lg:px-12 lg:pb-20 lg:pt-28">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            Admissions
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="font-heading text-[54px] leading-[1.0] tracking-tight text-white sm:text-[72px] lg:text-[90px]">
                Insurance <span className="italic">Coverage</span>
              </h1>
              <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/65">
                Mountain View Treatment works directly with most major PPO insurance carriers to
                maximize your benefits, minimize out-of-pocket expenses, and ensure that financial
                barriers never stand between you and recovery.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 lg:pb-1">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center justify-center gap-3 bg-[var(--mvt-teal)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill text-[14px]" aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <Link
                href="/admissions/"
                className="inline-flex items-center justify-center gap-2 border border-white/35 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white"
              >
                Verify Benefits Online
                <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Quick trust strip */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-8">
            {[
              { icon: "ri-shield-check-line", label: "In-Network with Major PPO Plans" },
              { icon: "ri-file-check-line", label: "Free Benefits Verification" },
              { icon: "ri-time-line", label: "Results Within 1–2 Hours" },
              { icon: "ri-lock-2-line", label: "HIPAA Compliant" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-[12px] font-medium text-white/50">
                <i className={`${icon} text-[var(--mvt-teal-light)] text-[14px]`} aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Carrier Cards ── */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Accepted Insurance Carriers
          </p>
          <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
            Carriers We <span className="italic">Work With</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--mvt-text)]">
            We are an in-network provider with the following major insurance carriers. Select your
            plan below for detailed coverage information, plan types, and what to expect from the
            verification process.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARRIERS.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="group flex flex-col justify-between border border-black/8 bg-white p-8 transition hover:border-[var(--mvt-teal)]/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)] transition group-hover:bg-[var(--mvt-teal)] group-hover:text-white">
                      <i className={`${c.icon} text-2xl`} aria-hidden="true" />
                    </span>
                    <div className="text-right">
                      <p className="font-heading text-[28px] leading-none text-[var(--mvt-ink)]">{c.stat}</p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-muted)]">{c.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="mt-6 font-heading text-[26px] leading-tight">{c.name}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[var(--mvt-text)]">{c.desc}</p>
                </div>
                <div className="mt-7 flex items-center gap-2 border-t border-black/8 pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)] transition group-hover:gap-3">
                  View Coverage Details
                  <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
                </div>
              </Link>
            ))}

            {/* "Don't see your plan" card */}
            <div className="flex flex-col justify-between border border-dashed border-black/15 bg-transparent p-8">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-muted)]">
                  <i className="ri-question-line text-2xl" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-[26px] leading-tight text-[var(--mvt-ink)]">
                  Don&apos;t See Your Plan?
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-[var(--mvt-text)]">
                  We work with many additional PPO plans beyond those listed here. Contact our
                  admissions team and we will verify your specific coverage at no cost.
                </p>
              </div>
              <a
                href={SITE.phone.href}
                className="mt-7 flex items-center gap-2 border-t border-black/8 pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)] transition hover:gap-3"
              >
                <i className="ri-phone-line text-xs" aria-hidden="true" />
                {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why In-Network Matters ── */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
            {/* Left — headline */}
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                In-Network Advantage
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
                Why In-Network <span className="italic">Matters</span>
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-[var(--mvt-text)]">
                Being in-network with your insurance carrier is not just administrative — it
                directly affects what you pay, how smoothly care is authorized, and whether
                financial concerns ever interrupt your treatment.
              </p>
              <a
                href={SITE.phone.href}
                className="mt-8 inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill" aria-hidden="true" />
                Verify Your Benefits
              </a>
            </div>

            {/* Right — 4 benefit items */}
            <div className="space-y-0 divide-y divide-black/8 border-y border-black/8">
              {WHY_ITEMS.map((item) => (
                <div key={item.title} className="flex items-start gap-6 py-6">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                    <i className={`${item.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--mvt-ink)]">{item.title}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.65] text-[var(--mvt-text)]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Verification Process ── */}
      <section className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">
              How It Works
            </p>
            <h2 className="mt-5 max-w-2xl font-heading text-[38px] leading-tight text-white sm:text-[50px]">
              The Benefits Verification <span className="italic">Process</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65">
              From your first call to a clear picture of your coverage — typically within 1–2 hours,
              always at no cost and with no obligation.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col gap-6 bg-white/5 p-8">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-[var(--mvt-teal-light)]/30 text-[var(--mvt-teal-light)]">
                    <i className={`${step.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-[40px] leading-none text-white/10">{step.num}</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-white/65">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-teal)] hover:text-white"
            >
              <i className="ri-phone-fill text-[14px]" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 border border-white/30 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white"
            >
              Submit Online
              <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </>
  );
}
