import CompanyFaqAccordion, {
  type FaqItem,
} from "@/views/our-company/components/CompanyFaqAccordion";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import OurCompanyLeadSection from "@/views/our-company/components/OurCompanyLeadSection";

/** Elementor post-639 — migration HTML (fewer items than long-form WP marketing copy elsewhere). */
const faqItems: FaqItem[] = [
  {
    q: "Why should I outsource medical billing?",
    a: (
      <>
        <p>
          <AutoLinkedText>{"Outsourcing medical billing frees up your time and resources so you can focus on what matters most: caring for\n          your patients. Cipher Billing goes beyond the basics by delivering:"}</AutoLinkedText>
        </p>
        <ul>
          <li>Informed admissions support, so you only accept patients who are right for your practice.</li>
          <li>After-hours representatives who provide the data you need, when you need it.</li>
          <li>Compliance expertise that ensures your billing stays accurate and audit-ready.</li>
          <li>Proactive claims management reduces denials and speeds up reimbursements.</li>
        </ul>
        <p><AutoLinkedText>{"The result is less administrative stress, faster days to first payment, and more reliable revenue."}</AutoLinkedText></p>
      </>
    ),
  },
  {
    q: "What makes Cipher Billing different from other billing companies?",
    a: (
      <>
        <p><AutoLinkedText>{"Cipher Billing combines deep expertise with a personal touch. Here's how we stand apart:"}</AutoLinkedText></p>
        <ul>
          <li>
            <strong>Dedicated Experience Executive:</strong> Works directly with your admissions and clinical teams to
            guide real-time decisions.
          </li>
          <li>
            <strong>Comprehensive onboarding:</strong> Before you start, we conduct full audits (compliance, utilization
            review, accounts receivable, and payments) and deliver a detailed report with a clear plan to improve your
            revenue cycle.
          </li>
          <li>
            <strong>Proven process:</strong> Every step is designed to produce the following—ensure compliance is met and
            maximize your reimbursements which leads to your peace of mind.
          </li>
          <li>
            <strong>Clinical partnership:</strong> We work hand in hand with your clinicians to maximize authorizations
            and support treatment goals.
          </li>
          <li>
            <strong>Proprietary analytics:</strong> Identifies pre-payment and post-payment opportunities to renegotiate
            finalized claims, sometimes resulting in up to <strong>70% additional reimbursement</strong>.
          </li>
        </ul>
        <p><AutoLinkedText>{"We don't just manage your billing—we actively strengthen your practice's financial foundation."}</AutoLinkedText></p>
      </>
    ),
  },
  {
    q: "How do I know if Cipher Billing is the right fit for my practice?",
    a: (
      <ul>
        <li>
          Cipher Billing is ideal for practices seeking more than just a vendor. If you value transparency, proactive
          communication, and a hands-on partner who will actively optimize your revenue cycle, we're a strong fit.
        </li>
        <li>
          We'll evaluate your current billing processes during onboarding and give you a clear plan for improvement,
          so you'll know exactly where we can add value before we begin.
        </li>
      </ul>
    ),
  },
  {
    q: "How does Cipher Billing handle insurance claims from start to finish?",
    a: (
      <>
        <p>
          <AutoLinkedText>{"With our end-to-end process, your claims are monitored at every stage, giving you confidence that nothing is\n          overlooked and every dollar is pursued."}</AutoLinkedText>
        </p>
        <ul>
          <li>
            <strong>Informed Admissions:</strong> We help you admit the right patients with accurate VOBs and policy
            reimbursement data.
          </li>
          <li>
            <strong>Submission &amp; Compliance:</strong> Every claim is checked by our charges team for billing and
            coding accuracy prior to submission and our compliance team conducts focused, as-needed claim and medical
            record reviews to support audits and maintain high standards.
          </li>
          <li>
            <strong>Tracking &amp; Follow-Up:</strong> Claims are monitored closely, and any denials are addressed
            immediately.
          </li>
          <li>
            <strong>Pre and Post Negotiations:</strong> Proprietary analytics allow us to challenge finalized claims for
            additional reimbursement.
          </li>
        </ul>
        <p><AutoLinkedText>{"This process results in faster first day payment, stronger compliance, and predictable revenue."}</AutoLinkedText></p>
      </>
    ),
  },
  {
    q: "How does Cipher Billing measure success for your clients?",
    a: (
      <>
        <p><AutoLinkedText>{"We measure success by more than collections. It's about peace of mind and long-term stability. Our clients see:"}</AutoLinkedText></p>
        <ul>
          <li>Higher reimbursements (sometimes up to 70% more through post-negotiation).</li>
          <li>Days to first payment (30 day average turnaround).</li>
          <li>Comprehensive, accurate VOBs, and a smoother revenue cycle for confident admission decisions.</li>
          <li>Seamless compliance with payor guidelines, even during audits.</li>
          <li>Improved authorization outcomes by partnering with clinical teams.</li>
          <li>Reduced administrative burden so providers can focus on patient care.</li>
        </ul>
        <p>
          <AutoLinkedText>{"Success for us means protecting your revenue cycle, giving you clarity, and ensuring you get paid what you\n          deserve without compromise."}</AutoLinkedText>
        </p>
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="bg-[#101E3F] text-white">
      <section className="pb-12 pt-16 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[900px] px-6">
          <h1 className="text-center font-[var(--font-heading)] text-3xl font-medium md:text-[2.5rem]">
            Frequently Asked <span className="text-[#246D92]">Questions</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-[1.42] text-white/85 md:text-base">
            <AutoLinkedText>{"Everything you need to know about partnering with Cipher Billing for your revenue cycle management."}</AutoLinkedText>
          </p>
          <CompanyFaqAccordion items={faqItems} showNumbers={false} />
        </div>
      </section>
      <OurCompanyLeadSection />
    </main>
  );
}
