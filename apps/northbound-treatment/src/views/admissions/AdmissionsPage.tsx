import Link from "next/link";
import CtaBanner from "@/views/shared/CtaBanner";
import AdmissionsHero from "./AdmissionsHero";
import FaqAccordion from "./FaqAccordion";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/* ─── Data ──────────────────────────────────────────────────── */

const STEPS = [
  {
    number: "01",
    title: "Get In Touch",
    icon: "ri-phone-line",
    body: "Upon calling Northbound, you will be connected with an Admissions Representative who will conduct a pre-admission assessment to get to know you, your history and identify your specific needs. These needs could include any limitations that require special attention and co-occurring disorders that will need to be addressed when creating a plan of action.",
  },
  {
    number: "02",
    title: "Insurance Verification",
    icon: "ri-shield-check-line",
    body: "After getting to know you, we will begin the insurance verification process. After we receive your insurance policy information, if any, we will conduct a preliminary check to review the details of your insurance plan's coverage and answer any questions you may have. Once your benefits have been confirmed, or another form of payment has been established, we will create an individualized, comprehensive treatment plan customized to your needs based on your financial situation.",
  },
  {
    number: "03",
    title: "Travel Coordination",
    icon: "ri-map-pin-2-line",
    body: "Whether you are local or traveling from outside the area, our travel coordination team will assist you in making arrangements to get to our facilities. More than half of patients at Northbound Treatment Center travel to our treatment facilities from another state because of our team's expertise in treating many forms of addiction.",
  },
  {
    number: "04",
    title: "Arrive at Northbound",
    icon: "ri-home-heart-line",
    body: "When you first arrive at Northbound, you will be assigned a Care Coordinator to help you throughout the evaluation process. During that time, your Care Coordinator is available to answer all of your questions as you meet with doctors, clinicians, and other treatment specialists to review your medical history, perform health assessments, and solidify your customized treatment plan.",
  },
  {
    number: "05",
    title: "Start Your Recovery",
    icon: "ri-heart-pulse-line",
    body: "Once you and your treatment team decide on your plan of action, you will have the option of meeting with other treatment specialists who are experienced and trained in recommending activities to support you on your journey to recovery. For example, attending our yoga classes to provide relaxation techniques or other recreational activities to help alleviate anxiety, discomfort, or any other symptoms you may be experiencing.",
  },
];

const WHAT_TO_BRING = [
  {
    icon: "ri-t-shirt-line",
    title: "Clothing",
    body: "Pack comfortable clothes, plenty of socks and underwear, sneakers, and shower shoes.",
  },
  {
    icon: "ri-drop-line",
    title: "Toiletries",
    body: "Everyday toiletries such as hair products, toothpaste, and a toothbrush.",
  },
  {
    icon: "ri-capsule-line",
    title: "Medications",
    body: "Our team will store your prescription medications and distribute them to you as needed.",
  },
  {
    icon: "ri-image-line",
    title: "Photos",
    body: "Bring photos of loved ones as a reminder of those rooting for you.",
  },
  {
    icon: "ri-file-text-line",
    title: "Documents",
    body: "A form of ID (e.g., driver's license, passport), your insurance card and prescription card.",
  },
  {
    icon: "ri-contacts-line",
    title: "Contact List",
    body: "An emergency contact list to use when you don't have access to a cell phone.",
  },
  {
    icon: "ri-book-open-line",
    title: "Downtime Items",
    body: "Books, knitting materials, notebooks, cameras, etc., to use during downtime.",
  },
  {
    icon: "ri-sun-line",
    title: "A Positive Attitude",
    body: "It's important to remain positive throughout this journey. We are here for you every step of the way.",
  },
];

const STATS = [
  { value: "97%+", label: "Program Completion Rate" },
  { value: "10,000+", label: "Individuals Served" },
  { value: "97%", label: "of Patients Recommend Us" },
];

const INSURANCE_PROVIDERS = [
  "Aetna", "Anthem", "BlueCross BlueShield", "Cigna",
  "Health Net", "Magellan", "MHN", "TriCare",
  "Compsych", "First Health", "GEHA", "Premera Blue Cross",
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function AdmissionsPage() {
  return (
    <>
      {/* 1 — Hero with form */}
      <AdmissionsHero />

      {/* 2 — Intro (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Text column */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                The Process
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Our Admissions Process{" "}
                <span className="italic text-terracotta">is Simple</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"Whether you're seeking help for yourself or for someone you love, you\n                are likely experiencing one of the most challenging times in your\n                life. From the beginning of your admissions process, through\n                rehabilitation treatment and sobriety aftercare, we will work through\n                every step with you or your family."}</AutoLinkedText>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"Our admissions staff know just how to make the enrollment process as\n                stress-free as possible. You've already made one of the toughest\n                choices by acknowledging it's time to reach out for help with\n                addiction and mental health issues. Let Northbound Treatment help you\n                navigate and manage the rest."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
                >
                  <i className="ri-phone-line" />
                  Call Now — Free Assessment
                </a>
                <Link
                  href="/insurance/"
                  className="inline-flex items-center gap-2 border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy/5"
                >
                  Verify Insurance
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>

            {/* Step preview column */}
            <div className="flex flex-col gap-0 divide-y divide-sand-dark">
              {STEPS.map((step) => (
                <div key={step.number} className="flex items-center gap-5 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-xs font-bold text-white">
                    {step.number}
                  </span>
                  <div className="flex items-center gap-3">
                    <i className={`${step.icon} text-terracotta`} />
                    <span className="font-heading text-base font-bold text-navy">
                      {step.title}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40">
                  <AutoLinkedText>{"Available 24 hours · 7 days a week"}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Process Steps Detail (navy) */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        {/* Decorative accents */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-light/50" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-terracotta/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              Step by Step
            </p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              What Happens{" "}
              <span className="italic text-terracotta">Next</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`relative border border-white/10 bg-white/5 p-8 transition hover:bg-white/8 ${
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Step number */}
                <span className="font-heading text-5xl font-bold leading-none text-white/10">
                  {step.number}
                </span>
                {/* Icon */}
                <div className="mt-4 flex h-12 w-12 items-center justify-center bg-terracotta/20">
                  <i className={`${step.icon} text-xl text-terracotta`} />
                </div>
                <h3 className="font-heading mt-4 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65"><AutoLinkedText>{step.body}</AutoLinkedText></p>
                <a
                  href="tel:8663110003"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta transition hover:text-terracotta-light"
                >
                  Start Today
                  <i className="ri-arrow-right-line" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — What to Bring (slate) */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              <AutoLinkedText>{"Preparing for Arrival"}</AutoLinkedText>
            </p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              What to{" "}
              <span className="italic text-terracotta">Bring</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-espresso/70">
              <AutoLinkedText>{"Drug rehab is a huge step on the road to recovery. Spending time in a\n              rehab facility will be challenging but the reward is well worth the\n              hard work. To increase your comfort during your stay, we recommend\n              bringing the following items."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-sand-dark bg-sand-dark sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_TO_BRING.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col gap-4 p-8 ${
                  i % 2 === 0 ? "bg-white" : "bg-sand"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center bg-navy/5">
                  <i className={`${item.icon} text-xl text-navy`} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/65"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Insurance (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left: copy */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Coverage
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Low to No{" "}
                <span className="italic text-terracotta">Out-of-Pocket</span>{" "}
                Costs
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-espresso/40">
                <AutoLinkedText>{"We Are A Preferred Provider for Most Insurance Plans"}</AutoLinkedText>
              </p>
              <p className="mt-5 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"Northbound is a preferred in-network provider with most major\n                insurance companies and over 15 insurance contracts, giving you a\n                wide net of coverage. We put mission before margin, ensuring you\n                receive the best care at an affordable cost for you or a loved one."}</AutoLinkedText>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"Our team works directly with your insurance provider to minimize\n                financial stress and ensure you can access the care you need. This\n                approach helps make addiction treatment affordable and accessible,\n                so you can focus on your health and healing."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/insurance/"
                  className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
                >
                  Verify Insurance Now
                  <i className="ri-arrow-right-line" />
                </Link>
                <a
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-navy"
                >
                  <i className="ri-phone-line" />
                  (866) 311-0003
                </a>
              </div>
              <p className="mt-5 text-xs text-espresso/40">
                <AutoLinkedText>{"We are unable at this time to accept Medicare or Medicaid plans.\n                We do offer affordable self-pay and financing options."}</AutoLinkedText>
              </p>
            </div>

            {/* Right: insurance provider grid */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40">
                <AutoLinkedText>{"Accepted Insurance Plans"}</AutoLinkedText>
              </p>
              <div className="grid grid-cols-3 gap-px overflow-hidden border border-sand-dark bg-sand-dark">
                {INSURANCE_PROVIDERS.map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-center bg-white px-4 py-5"
                  >
                    <span className="text-center text-xs font-semibold text-navy/70">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-espresso/40">
                <AutoLinkedText>{"+ USAMCO, ILWU, NYSHIP, Beacon Health & more"}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Stats + Testimonial (navy) */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-terracotta/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-navy px-6 py-10 text-center">
                <p className="font-heading text-4xl font-bold text-white md:text-5xl"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-terracotta"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <i className="ri-double-quotes-l text-4xl text-terracotta/40" />
            <blockquote className="font-heading mt-4 text-xl font-bold italic text-white md:text-2xl">
              Two years later, I still receive calls checking in on me. Northbound
              genuinely cares. This is a place you can trust.
            </blockquote>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              <AutoLinkedText>{"— Kristen F., Alumni"}</AutoLinkedText>
            </p>
          </div>

          {/* Trust bar */}
          <div className="mt-14 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-10">
            {[
              { icon: "ri-shield-star-line", text: "DHCS Licensed #300661CP" },
              { icon: "ri-award-line", text: "38+ Years in Operation" },
              { icon: "ri-time-line", text: "24/7 Admissions Support" },
              { icon: "ri-secure-payment-line", text: "Insurance Accepted" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-xs font-semibold text-white/50"
              >
                <i className={`${item.icon} text-sm text-terracotta`} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — FAQ (slate) */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            {/* Left label */}
            <div className="lg:pt-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Common Questions
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Northbound{" "}
                <span className="italic text-terracotta">FAQ</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"We understand that this can be a confusing time and there are many\n                questions to be answered. Entering addiction treatment is a new\n                experience for many people, and every rehab is different."}</AutoLinkedText>
              </p>
              <a
                href="tel:8663110003"
                className="mt-8 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
              >
                <i className="ri-phone-line" />
                Speak with Admissions
              </a>
            </div>

            {/* Right: accordion */}
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* 8 — CTA Banner */}
      <CtaBanner
        eyebrow="We Are Here for You"
        headline="Ready to Start Your Recovery Journey?"
        body="Our admissions team is available around the clock. One call is all it takes to begin — confidential, compassionate, and no-pressure."
        primaryCta={{ label: "Get Help Now", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
