"use client";

import Link from "next/link";
import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const SCHEDULE_CTA = "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";
const cx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

// ── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { icon: "ri-sparkling-2-line", label: "Clearer skin in 6–8 Weeks", value: "92%" },
  { icon: "ri-capsule-line", label: "Medication starting", value: "$199/Mo" },
  { icon: "ri-stethoscope-line", label: "Initial consultation", value: "$300" },
];

const consultationIncludes = [
  "Focused specialty review",
  "Lab analysis included",
  "Targeted treatment approach",
  "Follow-up protocol",
];

type Treatment = {
  name: string;
  form: string;
  badge: string;
  badgeBg: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  group: "skin" | "hair";
};

const treatments: Treatment[] = [
  // Skin Support
  {
    name: "Isotretinoin",
    form: "Oral Capsule",
    badge: "Acne Treatment",
    badgeBg: "bg-[#C67B5C] text-white",
    price: "$199 / per month",
    description:
      "A Retinoid that reduces sebum production, prevents pore clogging, and delivers lasting acne clearance. Prescribed when other treatments fail, isotretinoin targets the four primary acne causes simultaneously.",
    features: [
      "Long-lasting acne clearance in 85% of patients",
      "Reduces sebum production by up to 90%",
      "Prevents scarring from severe cystic acne",
      "Treats back, chest, and facial acne simultaneously",
    ],
    href: "/isotretinoin/",
    group: "skin",
  },
  {
    name: "Tretinoin",
    form: "Topical Cream",
    badge: "Retinoid Therapy",
    badgeBg: "bg-[#C67B5C] text-white",
    price: "$199 / per month",
    description:
      "A prescription-strength vitamin A derivative that accelerates cell turnover, stimulates collagen production, and unclogs pores. Considered the most clinically validated anti-aging topical available.",
    features: [
      "Fades hyperpigmentation and evens skin tone",
      "Treats comedonal and inflammatory acne",
      "Improves skin texture and pore appearance",
      "Prevents photoaging when used consistently",
    ],
    href: "/tretinoin/",
    group: "skin",
  },
  {
    name: "Skin Care Routine",
    form: "Prescription-based Protocol",
    badge: "Protocol",
    badgeBg: "bg-[#2B81AA] text-white",
    price: "$199 / per month",
    description:
      "Skincare protocol designed by dermatology-trained physicians. Combines prescription actives (tretinoin, hydroquinone, azelaic acid) with pharmaceutical-grade cleansers, moisturizers, and SPF.",
    features: [
      "Customized to your skin type and concerns",
      "Prescription and medical-grade products",
      "Addresses acne, aging, and pigmentation",
      "Eliminates guesswork with physician oversight",
    ],
    href: "/skin-care-routine/",
    group: "skin",
  },
  // Hair Support
  {
    name: "Finasteride",
    form: "Oral Capsule",
    badge: "DHT Blocker",
    badgeBg: "bg-[#C67B5C] text-white",
    price: "$199 / per month",
    description:
      "5-alpha reductase inhibitors that block the conversion of testosterone to DHT, the hormone responsible for male pattern hair loss. Finasteride is an effective oral treatment for androgenetic alopecia.",
    features: [
      "Stops hair loss progression in 90% of men",
      "Regrows hair in 65% of users within 2 years",
      "Preserves existing hair density long-term",
      "Once-daily oral tablet (no topical application)",
    ],
    href: "/finasteride/",
    group: "hair",
  },
  {
    name: "Minoxidil",
    form: "Tablet / Topical",
    badge: "Growth Stimulator",
    badgeBg: "bg-[#2B81AA] text-white",
    price: "$199 / per month",
    description:
      "A vasodilator that prolongs the anagen (growth) phase of the hair cycle and increases blood flow to follicles. Available as topical foam/solution or low-dose oral tablet for enhanced systemic delivery.",
    features: [
      "Increases hair density and diameter",
      "Visible results typically within 4–6 months",
      "Works synergistically with finasteride/dutasteride",
      "Clinically proven to regrow hair in men and women",
    ],
    href: "/minoxidil/",
    group: "hair",
  },
  {
    name: "Red Light Laser Cap",
    form: "Light-Based Therapy",
    badge: "LLLT Device",
    badgeBg: "bg-[#3d4c36] text-white",
    price: "$199 / per month",
    description:
      "A medical-grade laser cap that uses low-level light therapy (LLLT) to stimulate mitochondria in hair follicles, improving cellular energy and promoting hair growth.",
    features: [
      "Drug-free and non-invasive hair restoration",
      "FDA-cleared for safety and effectiveness",
      "Increases hair density and thickness",
      "Reduces scalp inflammation",
    ],
    href: "/red-light-laser-cap/",
    group: "hair",
  },
];

const groups: { id: "skin" | "hair"; label: string; subtitle: string }[] = [
  { id: "skin", label: "Skin Support", subtitle: "Acne, anti-aging, and medical-grade skincare" },
  { id: "hair", label: "Hair Support", subtitle: "Hair loss prevention and regrowth therapies" },
];

const processSteps = [
  { icon: "ri-questionnaire-line", title: "Answer Questions", duration: "2 minutes", description: "Quick intake, no guessing. Our secure medical questionnaire covers your history, symptoms, and goals." },
  { icon: "ri-calendar-check-line", title: "Book Your Time", duration: "24 hours", description: "Video visit on your schedule. Licensed physician reviews your case and schedules a personalized consultation." },
  { icon: "ri-truck-line", title: "Get Your Plan", duration: "2–3 Days", description: "Prescriptions shipped discreetly. Custom treatment plan with meds delivered to your door in discreet packaging." },
  { icon: "ri-line-chart-line", title: "Track Progress", duration: "Ongoing", description: "24/7 messaging with your care team and unlimited prescription adjustments." },
];

const benefits = [
  { icon: "ri-microscope-line", title: "Evidence-based formulations", description: "Every treatment we prescribe is backed by clinical trials and decades of dermatology research — not marketing claims." },
  { icon: "ri-user-heart-line", title: "Physician-monitored care", description: "Your treatment plan adjusts based on your skin's and hair's response. Regular check-ins catch issues before they become problems." },
  { icon: "ri-focus-3-line", title: "Root cause approach", description: "We address the underlying hormonal, inflammatory, or cellular cause of your skin and hair concerns — not just symptoms." },
];

const faqs = [
  { q: "How is prescription skincare different from over-the-counter products?", a: "Prescription formulations like tretinoin and isotretinoin contain active concentrations not available over-the-counter, backed by decades of clinical evidence. OTC retinols are typically 10–40x weaker than prescription tretinoin. Prescription products require physician oversight because they work at a level that produces real, measurable changes — which also means they need proper guidance." },
  { q: "Am I a candidate for isotretinoin?", a: "Isotretinoin is typically prescribed for moderate-to-severe acne, acne that hasn't responded to other treatments, or acne that's causing scarring. It requires a physician consultation, baseline bloodwork, and regular monitoring. Women of childbearing potential must be enrolled in the iPLEDGE program due to birth defect risks." },
  { q: "What's the difference between topical and oral minoxidil?", a: "Topical minoxidil (foam/solution) is applied directly to the scalp and has minimal systemic absorption. Oral (low-dose) minoxidil works systemically and often produces stronger, more consistent results — including benefits for hair on the entire scalp. Oral minoxidil has gained significant clinical support for being more effective than topical for many patients." },
  { q: "Can I combine skin and hair treatments?", a: "Yes. Many patients run both a skin protocol (tretinoin or isotretinoin) and a hair protocol (finasteride + minoxidil) simultaneously. Your physician will review your full medication list and health history to ensure compatibility and create an integrated treatment plan." },
  { q: "How long before I see results?", a: "Skin improvements from tretinoin typically become visible at 8–12 weeks, with full collagen remodeling effects at 6 months. Isotretinoin produces significant acne clearance within 4–5 months. Hair treatments typically show visible density improvements at 4–6 months — hair growth is slow, and patience is essential for accurate assessment." },
  { q: "Is this covered by insurance?", a: "Our program is self-pay and not billed to insurance. We believe transparent, predictable pricing is better than insurance complexity. Some patients use HSA/FSA funds. Your provider can supply documentation for insurance reimbursement attempts." },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <i className="ri-check-line mt-0.5 shrink-0 text-[#C67B5C]" aria-hidden />
      <span className="text-sm text-[#3A3A3A]">{text}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E2D9] last:border-0">
      <button className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="font-serif text-[1.05rem] text-[#2A2A2A]">{q}</span>
        <i className={`ri-arrow-down-s-line shrink-0 text-xl text-[#C67B5C] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[#555]"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>}
    </div>
  );
}

function TreatmentCard({ t }: { t: Treatment }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E8E2D9]">
      {/* Header: icon + name + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C67B5C]/12 text-[#C67B5C]">
            <i className="ri-sparkling-2-line text-base" aria-hidden />
          </span>
          <div>
            <p className="font-serif text-xl text-[#2A2A2A]"><AutoLinkedTextClient>{t.name}</AutoLinkedTextClient></p>
            <p className="text-[0.7rem] text-[#888]"><AutoLinkedTextClient>{t.form}</AutoLinkedTextClient></p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[0.62rem] font-semibold ${t.badgeBg}`}>
          {t.badge}
        </span>
      </div>

      {/* Price */}
      <div className="mt-5 border-b border-[#E8E2D9] pb-4">
        <p className="font-serif text-xl font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{t.price}</AutoLinkedTextClient></p>
        <p className="text-[0.65rem] italic text-[#aaa]">*Based On Dosing*</p>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-[#555]"><AutoLinkedTextClient>{t.description}</AutoLinkedTextClient></p>

      {/* Features */}
      <ul className="mt-5 flex-1 space-y-2">
        {t.features.map((f) => <CheckItem key={f} text={f} />)}
      </ul>

      {/* CTA */}
      <Link
        href={t.href}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FAF7F4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5640] ring-1 ring-[#E8E2D9] transition hover:bg-[#F0EBE4]"
      >
        <i className="ri-arrow-right-line" aria-hidden />
        View Details
      </Link>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function SkinHairPage() {
  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] pb-16 pt-12 md:pb-20 md:pt-16">
        <div className={cx}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">

            {/* Left */}
            <div className="pt-2">
              <nav className="mb-4 text-xs text-[#888]">
                <Link href="/" className="hover:text-[#C67B5C]">Home</Link>
                <span className="mx-2">-</span>
                <span>Skin &amp; Hair</span>
              </nav>
              <h1 className="font-serif text-4xl leading-[1.1] text-[#2A2A2A] md:text-5xl lg:text-[3.2rem]">
                Skin &amp; Hair<br />
                <span className="text-[#C67B5C]">Treatments</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">
                <AutoLinkedTextClient>{"Physician-prescribed treatments for acne, anti-aging, hair loss, and medical-grade\n                skincare. Click any treatment for detailed information."}</AutoLinkedTextClient>
              </p>

              {/* Stats */}
              <div className="mt-8 space-y-4 border-t border-[#E8E2D9] pt-6">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <i className={`${s.icon} text-base text-[#C67B5C]`} aria-hidden />
                      <span className="text-sm text-[#555]">{s.label}</span>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
                  </div>
                ))}
              </div>

              <a
                href={SCHEDULE_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#B86B4E]"
              >
                Start Evaluation
              </a>
            </div>

            {/* Right — Specialized Consultation card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#E8E2D9]">
              <div className="px-8 pt-7 pb-5 text-center">
                <p className="font-serif text-xl text-[#2A2A2A]"><AutoLinkedTextClient>{"Specialized Consultation"}</AutoLinkedTextClient></p>
                <p className="mt-1 text-sm text-[#888]"><AutoLinkedTextClient>{"Skin, Hair, Wellness, Labs, Galleri"}</AutoLinkedTextClient></p>
              </div>
              <div className="mx-6 grid grid-cols-2 divide-x divide-[#E8E2D9] rounded-xl bg-[#FAF7F4] py-5 ring-1 ring-[#E8E2D9]">
                <div className="px-6 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">First Visit</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#C67B5C]">$300</p>
                </div>
                <div className="px-6 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">Follow-Up</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#C67B5C]">$150</p>
                </div>
              </div>
              <div className="px-8 pt-5 pb-7">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  <AutoLinkedTextClient>{"What&apos;s Included:"}</AutoLinkedTextClient>
                </p>
                <ul className="space-y-2.5">
                  {consultationIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <i className="ri-check-line shrink-0 text-[#C67B5C]" aria-hidden />
                      <span className="text-sm text-[#3A3A3A]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Treatment Groups ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="space-y-16">
            {groups.map((group) => (
              <div key={group.id}>
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2rem]">{group.label}</h2>
                  <p className="mt-1 text-sm text-[#888]"><AutoLinkedTextClient>{group.subtitle}</AutoLinkedTextClient></p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {treatments.filter((t) => t.group === group.id).map((t) => (
                    <TreatmentCard key={t.name} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simple Process ────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Simple Process
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              From click to care in days, not weeks.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              <AutoLinkedTextClient>{"No waiting rooms. No insurance hassles. 94% of patients start treatment within 48 hours."}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                    <i className={`${step.icon} text-lg`} aria-hidden />
                  </span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C67B5C]">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-[#2A2A2A]">
                  <span className="mr-1.5 text-sm font-bold text-[#DDD]">0{i + 1}</span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#666]"><AutoLinkedTextClient>{step.description}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why evidence-based care matters ─────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Not cosmetic. <span className="text-[#C67B5C]">Clinical.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              <AutoLinkedTextClient>{"Prescription skincare and hair treatments work at concentrations and mechanisms that\n              over-the-counter products simply cannot match. Our physicians prescribe what the\n              evidence actually supports — nothing more, nothing less."}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl bg-[#FAF7F4] p-7 ring-1 ring-[#E8E2D9]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                  <i className={`${b.icon} text-xl`} aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-lg text-[#2A2A2A]">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555]"><AutoLinkedTextClient>{b.description}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
                Common Questions
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
                Everything you need to know about skin &amp; hair care
              </h2>
            </div>
            <div className="mt-10 rounded-3xl bg-white px-8 py-2 shadow-sm ring-1 ring-[#E8E2D9]">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
