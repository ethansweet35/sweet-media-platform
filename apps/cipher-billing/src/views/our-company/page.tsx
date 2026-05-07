import Image from "next/image";

import CompanyFaqAccordion from "./components/CompanyFaqAccordion";
import OurCompanyLeadSection from "./components/OurCompanyLeadSection";

/** Backgrounds and assets from Elementor `post-151` + migration HTML (cipherbilling.com/our-company/) */
const IMG_HERO =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T145809.503.png";
const IMG_PARTNERSHIP =
  "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T165213.080.png";

const leadership = [
  {
    name: "Simon Jozani",
    role: "Chief Visionary Officer",
    image:
      "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T172559.159.png",
  },
  {
    name: "Ian Roy",
    role: "Chief Strategy Officer",
    image:
      "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T180045.019.png",
  },
  {
    name: "Yasmine Elkady",
    role: "Chief Operating Officer",
    image:
      "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T180259.929.png",
  },
  {
    name: "Laura McMillan",
    role: "Chief Revenue Officer",
    image:
      "https://cipherbilling.com/wp-content/uploads/2026/04/Untitled-design-2026-04-09T180555.091.png",
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

function IconTools({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
      />
    </svg>
  );
}

function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
      />
    </svg>
  );
}

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
                our clients, working closely with you and your team to understand your business&apos;s unique needs and
                goals. We operate with the end in mind, optimizing your billing process to increase revenue so you can
                focus on your patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Higher-Level Partnership — two columns (text + icon boxes | image) */}
      <section className="bg-[#101E3F]">
        <div className="mx-auto grid max-w-[1140px] gap-12 px-5 py-[100px] md:grid-cols-2 md:items-center md:gap-[50px]">
          <div className="max-w-xl md:justify-self-start">
            <h2 className="font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.5rem] md:leading-tight">
              A Higher-Level Partnership
            </h2>
            <p className="mt-6 text-sm leading-[1.42] text-white/85 md:text-base">
              Our job is to deliver an unparalleled experience to
              <br />
              our clients. A Higher-Level Partnership means we go above and beyond to ensure maximum reimbursement for
              our clients and leave no stone unturned in pursuing successful claims. You can expect a simple, transparent
              service when you choose Cipher as your billing partner.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-white"
                  aria-hidden
                >
                  <IconTools className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-[var(--font-body)] text-base font-semibold text-white md:text-lg">
                    Relentless Determination
                  </h3>
                  <p className="mt-2 text-sm leading-[1.42] text-white/80">
                    Escalating to insurance commissioners when necessary to ensure you are fairly reimbursed.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-white"
                  aria-hidden
                >
                  <IconCheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-[var(--font-body)] text-base font-semibold text-white md:text-lg">
                    Compliance-First Culture
                  </h3>
                  <p className="mt-2 text-sm leading-[1.42] text-white/80">
                    Utilization review teams that ensure your documentation is audit-ready and protected.
                  </p>
                </div>
              </div>
            </div>
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
      </section>

      {/* Leadership Excellence — portrait cards (Elementor background images) */}
      <section className="bg-[#101E3F] pb-20 pt-0 md:pb-[80px]">
        <div className="mx-auto max-w-[1140px] px-5">
          <h2 className="text-center font-[var(--font-heading)] text-3xl font-medium text-white md:text-[2.5rem]">
            Leadership Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 md:text-xs">
            Deep expertise in the complexities of Behavioral Health RCM.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="relative flex min-h-[454px] flex-col justify-end overflow-hidden rounded-sm p-6 text-white"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${person.image})` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0) 23%, #101E3F 100%)",
                  }}
                />
                <div className="relative">
                  <p className="font-marcellus text-xl font-medium text-white md:text-2xl">{person.name}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95">
                    {person.role}
                  </p>
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
            Everything you need to know about partnering with Cipher Billing for your revenue cycle management.
          </p>
          <CompanyFaqAccordion items={companyFaqs} />
        </div>
      </section>

      <OurCompanyLeadSection />
    </main>
  );
}
