import Image from "next/image";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import CompanyFaqAccordion from "./components/CompanyFaqAccordion";
import OurCompanyLeadSection from "./components/OurCompanyLeadSection";

/** Backgrounds and assets from Elementor `post-151` + migration HTML (cipherbilling.com/our-company/) */
const IMG_HERO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T145809.503.png";
const IMG_PARTNERSHIP =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T165213.080.png";

/** Five partnership pillars — verbatim from live cipherbilling.com/our-company/ */
const partnershipPillars = [
  {
    icon: "ri-hand-heart-line",
    title: "High-Touch",
    body:
      "Provide a high-touch partnership with full visibility into your data, regular touchpoints, and proactive compliance support that protects your facility and your revenue.",
  },
  {
    icon: "ri-team-line",
    title: "Our People",
    body:
      "Seasoned revenue cycle experts who take personal ownership of protecting and growing your revenue.",
  },
  {
    icon: "ri-shake-hands-line",
    title: "True Partnership",
    body:
      "We operate as an extension of your leadership team\u2014not an outsourced service.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Compliance Confidence",
    body:
      "Proactive standards and oversight that help safeguard your organization through audits, payor changes, and denials.",
  },
  {
    icon: "ri-line-chart-line",
    title: "Measurable Financial Impact",
    body:
      "Consistent, transparent results that improve cash flow, reimbursement rates, and long-term stability.",
  },
];

const leadership = [
  {
    name: "Simon Jozani",
    role: "Chief Visionary Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/team_simon.jpg",
  },
  {
    name: "Ian Roy",
    role: "Chief Strategy Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/team_ian.jpg",
  },
  {
    name: "Yasmine Elkady",
    role: "Chief Operating Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180259.929.png",
  },
  {
    name: "Laura McMillan",
    role: "Chief Revenue Officer",
    image:
      "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T180555.091.png",
  },
];

const companyFaqs = [
  {
    q: "How long does the transition to Cipher Billing typically take?",
    a: 'Most facilities are fully onboarded and operational within 14 to 30 days. Our team prioritizes a "zero-gap" transition, ensuring that your current revenue cycle remains active while we integrate our proprietary analytics and compliance checks into your workflow.',
  },
  {
    q: "Do I need to switch my current EHR or EMR system?",
    a: "No. We are EHR-agnostic and have deep expertise in the industry's leading platforms, including Kipu, Avea, Sunwave, and ZenCharts. We work within your existing ecosystem to optimize your data flow without forcing your clinical team to learn a new software.",
  },
  {
    q: 'How does your "Advocacy" approach differ from standard billing?',
    a:
      'Standard vendors simply "push" claims; we advocate for them. This means our team actively monitors "medical necessity" trends and escalates cases to insurance commissioners when necessary. We don\u2019t just accept a denial—we fight to ensure you are fairly reimbursed for the level of care provided.',
  },
  {
    q: "Which levels of care do you specialize in?",
    a: "Cipher Billing is built specifically for the complexities of behavioral health. We specialize in the entire continuum of care, including Residential Treatment (RTC), Partial Hospitalization (PHP), Intensive Outpatient (IOP), and high-volume Private/Group Practices.",
  },
  {
    q: "How do you ensure my facility is ready for an audit?",
    a: "Compliance is at our core. We perform prospective audits on your documentation before it is ever submitted. By identifying deficiencies in clinical notes or authorization cycles early, we ensure your facility maintains 100% audit readiness and protected revenue.",
  },
];

export default function OurCompanyPage() {
  return (
    <main className="bg-[#101E3F] text-white">
      {/* Hero — bg image + gradient overlay (Elementor container 8b896d4) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* linear-gradient(270deg, #0B1A2E9C 0%, #101E3F 100%) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(270deg, rgba(11, 26, 46, 0.61) 0%, #101E3F 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-[1140px] px-5 py-[100px]">
          <div className="flex max-w-3xl flex-col gap-0">
            <div className="flex items-center gap-4">
              <span className="h-px w-[8%] min-w-[48px] bg-white/80" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Our Company</p>
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl md:leading-[1.1]">
              Cipher Billing
            </h1>
            <div className="mt-4 max-w-2xl border-l-[3px] border-white/90 pl-8 pt-4 text-sm leading-[1.42] text-white/90 md:text-base">
              <p>
                We take pride in having a seamless partnership with
                <br />
                our clients, working closely with you and your team to understand your business's unique needs and
                goals. We operate with the end in mind, optimizing your billing process to increase revenue so you can
                focus on your patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Higher-Level Partnership — verbatim copy from live cipherbilling.com/our-company/ */}
      <section className="bg-[#101E3F]">
        <div className="mx-auto grid max-w-[1140px] gap-12 px-5 py-[100px] md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-[50px]">
          <div className="max-w-xl md:justify-self-start">
            <h2 className="font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.5rem] md:leading-tight">
              A Higher-Level Partnership
            </h2>
            <p className="mt-6 text-sm leading-[1.42] text-white/85 md:text-base">
              <AutoLinkedText>{"Cipher Billing was founded in California with a mission to provide high-touch, compliant billing solutions that protect behavioral health providers and strengthen revenue. Over the years, we've grown into a knowledgeable team with deep expertise, yet our reputation has been built entirely through referrals and networking. This reflects the trust, results, and long-term satisfaction we continue to earn from every partner we serve."}</AutoLinkedText>
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[500px] md:mx-0 md:justify-self-end">
            <Image
              src={IMG_PARTNERSHIP}
              alt="Cipher Billing clinical team collaborating"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1140px] px-5 pb-[100px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {partnershipPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex h-full flex-col border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-white"
                  aria-hidden
                >
                  <i className={`${pillar.icon} text-lg leading-none`} />
                </div>
                <h3 className="mt-5 font-[var(--font-body)] text-base font-semibold text-white md:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.42] text-white/80">
                  <AutoLinkedText>{pillar.body}</AutoLinkedText>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Excellence — portrait cards (Elementor background images) */}
      <section className="bg-[#101E3F] pb-20 pt-0 md:pb-[80px]">
        <div className="mx-auto max-w-[1140px] px-5">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.5rem]">
            Leadership Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 md:text-xs">
            <AutoLinkedText>{"Deep expertise in the complexities of Behavioral Health RCM."}</AutoLinkedText>
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm"
              >
                <Image
                  src={person.image}
                  alt={`${person.name} — Cipher Billing`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px"
                  className="object-cover object-top"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, transparent 40%, rgba(16,30,63,0.7) 70%, #101E3F 100%)",
                  }}
                />
                <div className="relative p-5 text-white">
                  <p className="font-marcellus text-xl font-medium text-white md:text-2xl"><AutoLinkedText>{person.name}</AutoLinkedText></p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95"><AutoLinkedText>{person.role}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — nested accordion (Elementor), centered heading */}
      <section className="bg-[#101E3F] pb-20 md:pb-[80px]">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-medium md:text-[2.5rem]">
            Frequently Asked <span className="text-[#246D92]">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-[1.42] text-white/85 md:text-base">
            <AutoLinkedText>{"Everything you need to know about partnering with Cipher Billing for your revenue cycle management."}</AutoLinkedText>
          </p>
          <CompanyFaqAccordion items={companyFaqs} />
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}
