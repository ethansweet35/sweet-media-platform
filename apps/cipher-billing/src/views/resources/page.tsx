import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/** Aligns with live Resources submenu at cipherbilling.com (order + intent). */
const resourceLinks = [
  {
    href: "/behavioral-health-reimbursement-rates-by-state",
    title: "Behavioral Health Reimbursements By State",
    description: "Medicare benchmarks, regional tiers, and state-specific reimbursement intelligence.",
    icon: "ri-map-pin-line",
  },
  {
    href: "/behavioral-health-coding-guide",
    title: "Behavioral Health Billing Codes",
    description: "How CPT, HCPCS, and ICD-10 codes apply to behavioral health and addiction treatment billing.",
    icon: "ri-book-open-line",
  },
  {
    href: "/blog",
    title: "Blogs",
    description: "Articles on behavioral health billing, compliance, and revenue cycle management.",
    icon: "ri-article-line",
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Answers to common questions about outsourcing billing and partnering with Cipher.",
    icon: "ri-question-line",
  },
] as const;

export default function ResourcesHubPage() {
  return (
    <main className="bg-white text-slate-800">
      <section className="relative overflow-hidden bg-[#101E3F] px-5 py-[50px] md:py-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101E3F] via-[#101E3F] to-[#0d1833]" aria-hidden />
        <div className="relative mx-auto max-w-[1140px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-[8%] min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Resources</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-[var(--font-heading)] text-4xl font-medium leading-[1.1] text-white md:text-5xl">
            Guides, FAQs &amp; <span className="text-[#166C96]">insights</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            <AutoLinkedText>{"Explore Cipher Billing&apos;s library of behavioral health billing resources—from coding references to\n            state-level reimbursement intelligence."}</AutoLinkedText>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1140px] px-5 py-[50px] md:py-[80px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {resourceLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-sm border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:border-[#166C96]/40 hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#166C96] text-[#166C96] transition-colors group-hover:bg-[#166C96] group-hover:text-white"
                aria-hidden
              >
                <i className={`${item.icon} text-xl`} />
              </span>
              <h2 className="mt-6 font-[var(--font-heading)] text-xl font-medium text-[#101E3F] group-hover:text-[#166C96]">
                {item.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600"><AutoLinkedText>{item.description}</AutoLinkedText></p>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#166C96]">
                View
                <i className="ri-arrow-right-line text-base" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}
