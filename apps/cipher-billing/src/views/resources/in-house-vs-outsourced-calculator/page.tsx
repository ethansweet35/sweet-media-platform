import Calculator from "./components/Calculator";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";
import CompanyFaqAccordion, {
  type FaqItem,
} from "@/views/our-company/components/CompanyFaqAccordion";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqItems: FaqItem[] = [
  {
    q: "Why is the true cost higher than just salaries?",
    a: (
      <p>
        Salaries are the visible line item. The hidden costs are what catch operators off guard. When a claim is denied and never collected — typically 40% of denied behavioral health claims — that&rsquo;s lost revenue that doesn&rsquo;t show up in payroll. When cash sits in accounts receivable for 55 days instead of 30, the cost of capital compounds quietly. Add software licenses, clearinghouse fees, manager time, training, turnover, and desk costs — and the true all-in cost of in-house billing is routinely 30–40% higher than what the P&amp;L shows.
      </p>
    ),
  },
  {
    q: "What if my facility is very small?",
    a: (
      <p>
        Smaller facilities often feel the cost pressure most acutely. With a low claim volume, fixed overhead costs — software, clearinghouse, at least one full-time biller — represent a larger share of collections. Many small behavioral health practices find that outsourcing makes financial sense at as few as 50–75 monthly claims. The calculator reflects this: if your volume is low, compare the cost-per-claim outputs closely.
      </p>
    ),
  },
  {
    q: "Are these numbers specific to behavioral health?",
    a: (
      <p>
        Yes. The default values — denial rates, A/R days, biller salaries, clearinghouse costs — are calibrated to behavioral health billing specifically: detox, residential, PHP, IOP, outpatient mental health. General medical billing benchmarks don&rsquo;t apply here. Behavioral health has structurally higher denial rates, more complex utilization review requirements, and payer-specific quirks that drive up cost and stretch out A/R days.
      </p>
    ),
  },
  {
    q: "How accurate is this estimate?",
    a: (
      <p>
        It&rsquo;s a directional estimate based on industry medians, not a quote. Accuracy depends entirely on how precisely you&rsquo;ve filled in your inputs. The methodology below is fully transparent — you can review every assumption. For a precise comparison based on your actual claim mix, payer panel, and denial history, a free revenue audit will give you real numbers specific to your facility.
      </p>
    ),
  },
];

// ─── Methodology data ─────────────────────────────────────────────────────────

const methodologyItems = [
  {
    title: "True Cost of Denials",
    content:
      "Denied claims × average claim value × 40%. The 40% factor represents the industry average for behavioral health denials that are never collected — either because the appeal deadline passes, clinical documentation is insufficient, or the follow-up cost exceeds the recovery value. Source: HFMA Denial Management benchmarks for behavioral health.",
  },
  {
    title: "Cost of A/R Aging — Opportunity Cost",
    content:
      "A/R balance × cost of capital (8%) × (days in A/R ÷ 365). Your A/R balance represents cash that belongs to your facility but is sitting in the payer's hands. We value the delay at 8% annually — a conservative cost-of-capital assumption for behavioral health operators. Every day you reduce your A/R days is a direct cash-flow improvement.",
  },
  {
    title: "Outsourced Fee Assumption — 6.5% of Collections",
    content:
      "This is the industry midpoint for full-service behavioral health RCM outsourcing covering VOB, submission, denial management, appeals, and reporting. Vendor fees range from 5–9% depending on volume, specialty mix, and scope. Adjust the comparison by changing the inputs to reflect your negotiated rate.",
  },
  {
    title: "Outsourced Denial Rate — 4%",
    content:
      "Cipher's stated denial rate performance target for behavioral health claims. This compares to an industry in-house median of 12–18%. The gap is driven by VOB accuracy at admission, pre-submission audits, and systematic utilization review documentation that most in-house teams underinvest in.",
  },
  {
    title: "Outsourced A/R Days — 30 Days",
    content:
      "Cipher's average days-to-first-payment benchmark. The national in-house median for behavioral health is 45–65 days. Faster A/R cycles directly improve operating cash flow and reduce the opportunity cost of capital sitting in the payer pipeline.",
  },
  {
    title: "Benefits & Payroll Tax Load",
    content:
      "Applied as a percentage of base salary to estimate total employer cost per biller. Includes FICA (7.65%), health insurance, dental, vision, paid time off, and any 401(k) match. A 28% load is a conservative estimate for behavioral health billing staff in the western U.S. Adjust based on your actual benefit package.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InHouseCalculatorPage() {
  return (
    <main className="bg-[#F5F7FA] text-[#0D1833]">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0D1833] py-16 md:py-24">
        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
            Billing Cost Calculator
          </p>
          <h1 className="mt-4 max-w-3xl font-[var(--font-heading)] text-4xl font-medium leading-[1.1] text-white md:text-5xl">
            What Is In-House Billing{" "}
            <span className="text-[#AAB3B9]">Actually</span> Costing You?
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-[1.6] text-white/65 md:text-[15px]">
            Most behavioral health facilities underestimate the true cost of in-house billing by 30–40%. They count salaries. They miss software, clearinghouse fees, the 40% of denied claims that never get collected, and the capital tied up in 55-day A/R cycles. This calculator adds it all up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { icon: "ri-time-line", label: "Updates in real-time" },
              { icon: "ri-shield-check-line", label: "Transparent methodology" },
              { icon: "ri-bar-chart-2-line", label: "Behavioral health benchmarks" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <i className={`${item.icon} text-sm text-[#166C96]`} />
                <span className="text-[11px] font-medium text-white/55">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────────────── */}
      <section className="pb-4 pt-12 md:pb-6 md:pt-16">
        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          {/* Mobile padding note */}
          <p className="mb-6 text-[11px] leading-relaxed text-[#8a9299] lg:hidden">
            Fill in your numbers below. Results appear after the inputs.
          </p>
          <Calculator />
        </div>
      </section>

      {/* ── Inline CTA strip ──────────────────────────────────────────── */}
      <section className="border-y border-[#e2e8f0] bg-white py-10">
        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#0D1833]">
                These numbers are based on industry averages.
              </p>
              <p className="mt-1 text-sm text-[#4a5565]">
                Get a precise quote based on your facility&rsquo;s actual claim mix.
              </p>
            </div>
            <a
              href="/contact-us?source=cost-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded bg-[#166C96] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#145a82]"
            >
              Schedule a Free Revenue Audit <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1140px] px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
              Transparency
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium text-[#0D1833] md:text-[2.2rem]">
              How We Calculate This
            </h2>
            <p className="mt-4 text-sm leading-[1.6] text-[#4a5565]">
              Every assumption is documented below. If your CFO disagrees with a benchmark, adjust the inputs — or call us and we&rsquo;ll walk through it together.
            </p>
          </div>

          <div className="mt-10 grid gap-3">
            {methodologyItems.map((item) => (
              <details
                key={item.title}
                className="group overflow-hidden rounded-lg border border-[#e2e8f0] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-[var(--font-heading)] text-base font-medium text-[#0D1833]">
                  <span>{item.title}</span>
                  <span className="shrink-0 pl-4">
                    <i className="ri-add-line text-lg text-[#166C96] group-open:hidden" />
                    <i className="ri-subtract-line hidden text-lg text-[#166C96] group-open:block" />
                  </span>
                </summary>
                <div className="border-t border-[#f1f5f9] px-5 pb-5 pt-4 text-sm leading-[1.7] text-[#4a5565]">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0D1833] py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
            Common Questions
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.2rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <CompanyFaqAccordion items={faqItems} showNumbers={false} />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA / Lead Form ─────────────────────────────────────── */}
      <OurCompanyLeadSection />
    </main>
  );
}
