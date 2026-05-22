"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { heroInnerWrap, heroViewportSection } from "@/lib/heroSpacing";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_faqs_hero01.jpg";

/* ─── FAQ data grouped by category ─────────────────────────── */

const FAQ_CATEGORIES = [
  {
    id: "preparing",
    label: "Preparing for Treatment",
    icon: "ri-luggage-cart-line",
    faqs: [
      {
        q: "What should I bring when starting treatment at Northbound?",
        a: "We recommend bringing comfortable clothing, basic toiletries, important documents, and any approved medications. Our admissions team provides a full packing list so you feel prepared and supported. See our full packing guide on the Admissions page.",
      },
      {
        q: "Can my family be involved in the treatment process?",
        a: "Yes. Family involvement is an important part of healing, and we offer structured opportunities for communication, education, therapy, and any other needed support throughout your stay. We offer dedicated family therapy sessions and education workshops.",
      },
      {
        q: "How long does the admissions process take?",
        a: "Admissions can often be completed the same day. Once we confirm clinical fit and insurance, we guide you through every step so you can enter the needed care program as smoothly as possible.",
      },
      {
        q: "Will I have a private room?",
        a: "Room setups vary by location, but all environments are designed to be safe, comfortable, and supportive of recovery. Our admissions team will ensure you have all the necessary details prior to choosing Northbound.",
      },
      {
        q: "What happens on my first day?",
        a: "You'll meet with our clinical and medical team for assessments, settle into your living space, and receive an orientation to help you feel grounded and at ease. A dedicated Care Coordinator will be assigned to guide you through the evaluation process.",
      },
    ],
  },
  {
    id: "clinical",
    label: "Our Clinical Expertise",
    icon: "ri-stethoscope-line",
    faqs: [
      {
        q: "Who provides care at Northbound Treatment Centers?",
        a: "Treatment is led by licensed therapists, clinicians, medical providers, and addiction specialists with deep experience in substance use and mental health disorders. Our leadership team has more than 200 years of combined behavioral healthcare expertise.",
      },
      {
        q: "Do you treat co-occurring mental health conditions?",
        a: "Yes. Our integrated dual-diagnosis care addresses both substance use and mental health concerns simultaneously for more sustainable recovery outcomes. We treat anxiety, depression, PTSD, bipolar disorder, OCD, and more.",
      },
      {
        q: "How is treatment individualized?",
        a: "Each client receives a personalized plan based on clinical assessments, history, goals, and progress. Treatment evolves as your needs change, with a 2:1 staff-to-client ratio ensuring close, personalized attention throughout.",
      },
      {
        q: "What therapeutic approaches do you use?",
        a: "We use evidence-based practices such as CBT, DBT, trauma-informed care, EMDR, medication-assisted treatment (MAT), art therapy, music therapy, yoga, and experiential therapies. Our approach combines clinical rigor with holistic healing.",
      },
      {
        q: "Is medical support available during treatment?",
        a: "Yes. Our medical team — including our double board-certified Medical Director in Psychiatry and Addiction Medicine — oversees detox, medication management, and ongoing health monitoring throughout your stay.",
      },
    ],
  },
  {
    id: "programs",
    label: "Treatment Programs",
    icon: "ri-heart-pulse-line",
    faqs: [
      {
        q: "What levels of care does Northbound offer?",
        a: "We offer a full continuum: medically supervised detox, residential treatment, partial hospitalization (PHP), virtual IOP (HomeBound telehealth for CA & WA), and long-term aftercare and alumni support. Northbound does not offer standalone in-person IOP or sober living programs.",
      },
      {
        q: "How do I know which program is right for me?",
        a: "Our admissions and clinical teams assess your history, symptoms, and goals to recommend the most appropriate level of care. There is no pressure — we want to find the right fit, even if that means another program.",
      },
      {
        q: "Do you provide mental health–only treatment?",
        a: "Yes. We support clients experiencing mental health challenges with or without substance use disorders. Our dual-diagnosis program is designed to treat both simultaneously for more lasting outcomes.",
      },
      {
        q: "How long do treatment programs typically last?",
        a: "Length varies by level of care and individual needs. Many clients complete 30, 60, or 90-day programs. We tailor timelines to support your recovery progress rather than a fixed schedule.",
      },
      {
        q: "Are life skills or career-oriented programs available?",
        a: "Yes. Our Collegebound® and Careerbound® programs support life skills, academic progress, and career development as part of long-term recovery — especially designed for young adults navigating education and career while in treatment.",
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance & Cost",
    icon: "ri-secure-payment-line",
    faqs: [
      {
        q: "Does Northbound accept my insurance?",
        a: "We work with most major insurance providers including Aetna, Anthem, BlueCross BlueShield, Cigna, Health Net, Magellan, MHN, TriCare, Compsych, GEHA, Premera Blue Cross, and more. Our admissions team can verify your benefits quickly and at no cost.",
      },
      {
        q: "What if my insurance doesn't cover everything?",
        a: "If there are gaps in coverage, we discuss payment options and help you understand all costs before entering treatment. We put mission before margin — we will always work to find a solution.",
      },
      {
        q: "Do you offer self-pay options?",
        a: "Yes. Flexible self-pay arrangements are available for clients without insurance or with limited coverage. We are unable at this time to accept Medicare or Medicaid plans.",
      },
      {
        q: "Will insurance cover detox or residential treatment?",
        a: "Coverage depends on your plan and medical necessity. Our team handles verification and explains what your benefits include — fully and clearly — before you make any decisions.",
      },
      {
        q: "Can I get an estimate before I begin treatment?",
        a: "Absolutely. We provide clear, upfront cost and coverage information so you can make an informed decision. Our team is transparent about costs from the very first call.",
      },
    ],
  },
];

/* ─── Page ─────────────────────────────────────────────────── */

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState("preparing");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const active = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* 1 — Hero */}
      <section className={heroViewportSection}>
        <Image src={HERO} alt="Northbound Treatment welcoming common area" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />

        <div className={heroInnerWrap}>
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
            <Link href="/" className="transition hover:text-terracotta">Home</Link>
            <i className="ri-arrow-right-s-line" />
            <Link href="/admissions/" className="transition hover:text-terracotta">Admissions</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-white/70">FAQ</span>
          </nav>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Common Questions</p>
          <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="italic text-terracotta">Questions</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
            <AutoLinkedTextClient>{"We understand that entering addiction treatment is a new experience and there are many questions to be answered. Here are answers to the questions we hear most often."}</AutoLinkedTextClient>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="tel:8663110003" className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light">
              <i className="ri-phone-line" />
              Speak With Admissions
            </a>
            <Link href="/admissions/" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Start Admissions
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — FAQ with sidebar nav (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">

            {/* Sidebar — category nav */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-espresso/40">
                Browse by Topic
              </p>
              <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-sand-dark">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setActiveCategory(cat.id); setOpenIndex(0); }}
                    className={`flex items-center gap-3 px-4 py-4 text-left text-sm font-semibold transition ${
                      activeCategory === cat.id
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-sand"
                    }`}
                  >
                    <i className={`${cat.icon} text-base ${activeCategory === cat.id ? "text-terracotta" : "text-terracotta/70"}`} />
                    {cat.label}
                  </button>
                ))}
              </nav>

              {/* CTA card below sidebar */}
              <div className="mt-8 hidden border border-sand-dark bg-sand p-6 lg:block">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta"><AutoLinkedTextClient>{"Still Have Questions?"}</AutoLinkedTextClient></p>
                <p className="font-heading text-lg font-bold text-navy"><AutoLinkedTextClient>{"Talk to a Real Person"}</AutoLinkedTextClient></p>
                <p className="mt-2 text-xs leading-relaxed text-espresso/60">
                  <AutoLinkedTextClient>{"Our admissions team is available 24/7 and happy to answer any question — no obligation."}</AutoLinkedTextClient>
                </p>
                <a
                  href="tel:8663110003"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-navy py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-terracotta"
                >
                  <i className="ri-phone-line" />
                  (866) 311-0003
                </a>
              </div>
            </div>

            {/* Main content — accordion */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-navy">
                  <i className={`${active.icon} text-base text-terracotta`} />
                </div>
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  {active.label}
                </h2>
              </div>

              <div className="divide-y divide-sand-dark">
                {active.faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-heading text-base font-bold text-navy md:text-lg">
                        {faq.q}
                      </span>
                      <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-sand-dark text-navy transition-transform duration-300 ${openIndex === i ? "rotate-45 border-terracotta bg-terracotta text-white" : ""}`}>
                        <i className="ri-add-line text-sm" />
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96 pb-6" : "max-h-0"}`}>
                      <p className="text-sm leading-relaxed text-espresso/70"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-10 border border-sand-dark bg-sand p-6 lg:hidden">
                <p className="font-heading text-lg font-bold text-navy"><AutoLinkedTextClient>{"Still Have Questions?"}</AutoLinkedTextClient></p>
                <p className="mt-1 text-sm text-espresso/60"><AutoLinkedTextClient>{"Speak with our admissions team 24/7."}</AutoLinkedTextClient></p>
                <a href="tel:8663110003" className="mt-4 inline-flex items-center gap-2 bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta">
                  <i className="ri-phone-line" />
                  (866) 311-0003
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Trust strip (navy) */}
      <section className="bg-navy py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { icon: "ri-shield-star-line", text: "DHCS Licensed #300661CP" },
              { icon: "ri-award-line", text: "38+ Years of Experience" },
              { icon: "ri-time-line", text: "24/7 Admissions Line" },
              { icon: "ri-secure-payment-line", text: "Insurance Accepted" },
              { icon: "ri-map-pin-2-line", text: "Orange County & Seattle" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs font-semibold text-white/50">
                <i className={`${item.icon} text-sm text-terracotta`} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — CTA Banner */}
      <CtaBanner
        eyebrow="We're Here to Help"
        headline="Ready to Take the First Step?"
        body="Our admissions team is available around the clock — confidential, compassionate, and no-pressure."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Start Admissions", href: "/admissions/" }}
      />
    </>
  );
}
