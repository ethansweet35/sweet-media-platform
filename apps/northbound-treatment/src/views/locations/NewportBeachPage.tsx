"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CtaBanner from "@/views/shared/CtaBanner";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const IMAGES = {
  hero: `${BASE}/nbt_nb_hero01.jpg`,
  interior: `${BASE}/nbt_nb_interior01.jpg`,
  beach: `${BASE}/nbt_nb_beach01.jpg`,
  garden: `${BASE}/nbt_nb_garden01.jpg`,
};

const programs = [
  {
    icon: "ri-first-aid-kit-line",
    name: "Medical Detox",
    duration: "7–10 days",
    desc: "24/7 medically supervised withdrawal management. Our clinical team safely stabilizes your body with medication management so you can begin the healing process with clarity and comfort.",
    highlight: true,
  },
  {
    icon: "ri-home-heart-line",
    name: "Residential Treatment",
    duration: "30–90 days",
    desc: "Gender-specific, around-the-clock inpatient care across seven integrated buildings. Daily individual therapy, group sessions, 12-step immersion, family programming, and holistic activities.",
    highlight: false,
  },
  {
    icon: "ri-hospital-line",
    name: "Partial Hospitalization (PHP)",
    duration: "4–8 hrs/day",
    desc: "Structured day-treatment with on-site counseling, psychoeducation, and support groups. Ideal as a step-down from residential or as a primary program for those who can't commit to full inpatient.",
    highlight: false,
  },
  {
    icon: "ri-calendar-check-line",
    name: "Intensive Outpatient (IOP)",
    duration: "9+ hrs/week",
    desc: "Intensive clinical support while you live at home. Includes individual coaching, goal setting, online case management, and on-site and off-site programming.",
    highlight: false,
  },
  {
    icon: "ri-community-line",
    name: "Outpatient Treatment",
    duration: "Flexible",
    desc: "For those transitioning from higher levels of care. Ongoing individual and group therapy, therapeutic toxicology, vocational and academic support, and relapse prevention.",
    highlight: false,
  },
  {
    icon: "ri-user-heart-line",
    name: "Aftercare & Alumni",
    duration: "Ongoing",
    desc: "Recovery doesn't end at discharge. Northbound's alumni program includes weekly meetings, BBQs, sober living referrals, and a lifelong support community.",
    highlight: false,
  },
];

const campusFeatures = [
  { icon: "ri-building-2-line", label: "7 Integrated Buildings", desc: "Detox, residential homes (men & women), sober living, and a modern clinical hub" },
  { icon: "ri-leaf-line", label: "Peaceful Gardens", desc: "Meditation gardens, outdoor yoga spaces, and nature-rich common areas" },
  { icon: "ri-music-line", label: "Music Rooms", desc: "Creative expression as part of holistic, experiential healing" },
  { icon: "ri-run-line", label: "On-Site Gym", desc: "Daily fitness access for all residents" },
  { icon: "ri-sun-line", label: "Beach Access", desc: "Surfing twice per week; regular beach bonfires and coastal outings" },
  { icon: "ri-heart-3-line", label: "Sober Living Homes", desc: "Comfortable transitional housing on-campus for step-down support" },
];

const faqs = [
  {
    q: "What types of addiction do you treat at Newport Beach?",
    a: "We treat alcohol addiction, opioids, prescription drugs, cocaine, methamphetamine, benzodiazepines, and all substance use disorders — including dual diagnosis care for co-occurring conditions like depression, anxiety, PTSD, and bipolar disorder.",
  },
  {
    q: "How does the gender-specific program work?",
    a: "Our Newport Beach campus has separate residential homes for men and women, with gender-specific group sessions and peer communities. This environment fosters deeper trust, reduces distractions, and creates a more focused clinical experience.",
  },
  {
    q: "How long is the Newport Beach program?",
    a: "Residential programs typically run 30–90 days depending on clinical need. Many clients transition through multiple levels of care — detox, residential, PHP, IOP — which can extend total treatment time. A specialist will work with you to design the right plan.",
  },
  {
    q: "Do you offer a family program?",
    a: "Yes. Our 4-day intensive family program is integrated into residential treatment. Family therapy, psychoeducation, and communication skill-building are central to our model — because lasting recovery involves the whole family system.",
  },
  {
    q: "Do you accept insurance at Newport Beach?",
    a: "Yes. We are in-network with 15+ major carriers including Aetna, Anthem/BCBS, Cigna, Tricare, MHN, Multiplan, and more. Our team verifies your benefits quickly and confidentially — at no cost to you.",
  },
  {
    q: "What should I bring?",
    a: "Pack comfortable clothing, toiletries, any prescribed medications, a contact list, personal documents (ID, insurance card), and a few items for downtime — a journal, photos, or books. Most importantly, bring a willingness to be open. The rest, we provide.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-4 py-5 text-left">
        <span className="font-semibold text-[#0B1F3A] leading-snug">{q}</span>
        <span className={`mt-0.5 shrink-0 text-[#E8622A] transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <i className="ri-add-line text-xl"></i>
        </span>
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-[#4B5563]">{a}</p>}
    </div>
  );
}

export default function NewportBeachPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[#0B1F3A]">
        <Image
          src={IMAGES.hero}
          alt="Newport Beach California coastline — aerial view of pristine Pacific beaches near Northbound Treatment"
          fill
          className="object-cover object-center opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">Newport Beach, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E8622A]">
              Newport Beach, California — Orange County
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug & Alcohol{" "}
              <span className="italic text-[#E8622A]">Rehab</span>{" "}
              in Newport Beach
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Northbound&apos;s Newport Beach campus is our flagship multi-building treatment center — nestled in one of Southern California&apos;s most stunning coastal communities, 42 miles of pristine Pacific beach as your backdrop for healing.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "3822 Campus Dr, Suite 200, Newport Beach, CA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "30–90 Day Programs" },
                { icon: "ri-building-2-line", label: "7 Integrated Buildings" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-white/75">
                  <i className={`${f.icon} text-[#E8622A]`}></i>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full bg-[#E8622A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d4531d]">
                <i className="ri-phone-fill"></i> Call (866) 311-0003
              </Link>
              <Link href="/admissions/insurance-coverage/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                Verify My Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">Our Flagship Campus</p>
              <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">
                Why Newport Beach is{" "}
                <span className="italic text-[#E8622A]">Ideal for Recovery</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B5563]">
                Situated between San Diego to the south and Los Angeles to the north, Newport Beach offers some of the most stunning landscapes in all of California. Reminiscent of the Mediterranean — 42 miles of pristine beaches, natural beauty, and a casually sophisticated coastal vibe — it&apos;s a setting purpose-built for healing.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                Our Newport Beach campus spans seven integrated buildings in close proximity to the beach and nature preserves. Each space — from gender-specific residential homes to our modern clinical hub — is well-appointed, private, and designed to reduce stress while maximizing focus on recovery.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                Interacting with the outside world is part of treatment here: surf sessions twice per week, trips to Sequoia National Park, grocery outings, and community barbecues. Real life, practiced safely.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { stat: "7", label: "Campus Buildings" },
                  { stat: "42mi", label: "Of Nearby Beaches" },
                  { stat: "38+", label: "Years Experience" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-[#F5F7FF] p-5 text-center">
                    <p className="font-heading text-3xl font-bold text-[#0B1F3A]">{s.stat}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image src={IMAGES.interior} alt="Serene residential room at Northbound's Newport Beach campus — warm, home-like recovery environment" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[#0B1F3A] px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">Gender-Specific</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-[#E8622A]">Men&apos;s & Women&apos;s Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAMPUS FEATURES ─── */}
      <section className="bg-[#0B1F3A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">The Campus</p>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Life at<br /><span className="italic text-[#E8622A]">Newport Beach</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                Our Newport Beach campus is built around the belief that beautiful environments accelerate healing. Every amenity, every space, every scheduled activity is designed with your recovery in mind.
              </p>
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={IMAGES.garden} alt="Peaceful healing garden at Northbound Newport Beach — lavender, stone paths, meditation seating" fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {campusFeatures.map((f) => (
                <div key={f.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8622A]/20 text-[#E8622A] mb-3">
                    <i className={`${f.icon} text-lg`}></i>
                  </span>
                  <p className="font-semibold text-white">{f.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEACH ACTIVITIES ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src={IMAGES.beach} alt="Clients surfing and celebrating on Newport Beach — outdoor recovery activities at Northbound" fill className="object-cover" />
              </div>
              <div className="absolute -top-5 -right-5 rounded-2xl bg-[#E8622A] px-5 py-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-white">Surfing 2x Per Week</p>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">The InVivo® Difference</p>
              <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">
                Recovery That <span className="italic text-[#E8622A]">Lives</span> in the Real World
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                At Northbound, recovery isn&apos;t confined to four walls. Our InVivo® model puts clients in real-world situations — with clinical support — so the skills they build in treatment translate directly to life after discharge.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                In Newport Beach, that means surfing in the Pacific, trips to the grocery store, Sequoia excursions, and community barbecues. These aren&apos;t just activities — they&apos;re training for a full, sober life.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Surfing twice per week",
                  "Sequoia National Park trips",
                  "Community barbecues",
                  "Beach bonfires",
                  "Yoga & meditation gardens",
                  "Music rooms",
                  "On-site gym",
                  "Grocery & life skills outings",
                ].map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8622A]/10 text-[#E8622A]">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm font-medium text-[#374151]">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-[#F5F7FF] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">Levels of Care</p>
            <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">Programs at Newport Beach</h2>
            <p className="mt-4 text-[#4B5563]">A full continuum from detox through alumni support — all under one clinical team.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.name} className={`rounded-3xl p-8 ${p.highlight ? "bg-[#0B1F3A] text-white" : "bg-white ring-1 ring-[#E5E7EB]"}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${p.highlight ? "bg-[#E8622A]/20" : "bg-[#F5F7FF]"}`}>
                  <i className={`${p.icon} text-xl ${p.highlight ? "text-[#E8622A]" : "text-[#0B1F3A]"}`}></i>
                </div>
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${p.highlight ? "bg-white/10 text-white/80" : "bg-[#F5F7FF] text-[#6B7280]"}`}>
                  {p.duration}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${p.highlight ? "text-white" : "text-[#0B1F3A]"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${p.highlight ? "text-white/75" : "text-[#4B5563]"}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">Common Questions</p>
            <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-[#E5E7EB] rounded-3xl bg-white ring-1 ring-[#E5E7EB] px-8">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ─── INSURANCE ─── */}
      <section className="bg-[#F5F7FF] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">Insurance</p>
          <h2 className="font-heading text-3xl font-bold text-[#0B1F3A] md:text-4xl">We Verify Your Benefits — Free & Confidential</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#4B5563]">
            In-network with 15+ major carriers. Our team handles verification so you can focus on getting help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-[#6B7280]">
            {["Aetna", "Anthem BCBS", "Cigna", "Tricare", "MHN", "Multiplan", "Beacon", "ComPsych", "First Health"].map((ins) => (
              <span key={ins} className="rounded-full bg-white px-4 py-2 ring-1 ring-[#E5E7EB]">{ins}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admissions/insurance-coverage/" className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#16305e]">
              Verify My Insurance
            </Link>
            <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A]/20 px-7 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#0B1F3A]/50">
              <i className="ri-phone-line"></i> (866) 311-0003
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Start Treatment at Newport Beach"
        body="Our admissions team is available 24/7. We'll verify your insurance, answer your questions, and walk you through every step — no pressure, no cost."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/admissions/insurance-coverage/" }}
      />
    </>
  );
}
