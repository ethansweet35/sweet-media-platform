"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CtaBanner from "@/views/shared/CtaBanner";
import FacilityGallery from "@/views/shared/FacilityGallery";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const IMAGES = {
  hero: `${BASE}/nbt_sd_hero01.jpg`,
  office: `${BASE}/nbt_sd_office01.jpg`,
  group: `${BASE}/nbt_sd_group01.jpg`,
};

const programs = [
  {
    icon: "ri-hospital-line",
    name: "Partial Hospitalization (PHP)",
    duration: "4–8 hrs/day",
    desc: "Intensive day-treatment with on-site counseling, psychoeducation, and support groups. The most structured option at our La Jolla location.",
  },
  {
    icon: "ri-calendar-check-line",
    name: "Intensive Outpatient (IOP)",
    duration: "9+ hrs/week",
    desc: "Flexible scheduling for clients stepping down from residential or needing intensive support while living at home. Includes coaching, case management, and group therapy.",
  },
  {
    icon: "ri-community-line",
    name: "Outpatient Treatment",
    duration: "Flexible",
    desc: "For those further along in recovery. Ongoing individual and group therapy, vocational and academic support, and drug testing as part of sustained accountability.",
  },
  {
    icon: "ri-computer-line",
    name: "Telehealth IOP",
    duration: "Flexible",
    desc: "Virtual outpatient services for California residents who prefer or require remote access — the same clinical quality without the commute.",
  },
  {
    icon: "ri-mental-health-line",
    name: "Dual Diagnosis",
    duration: "Integrated",
    desc: "Co-occurring mental health conditions are treated alongside addiction — depression, anxiety, PTSD, and more — using CBT, DBT, EMDR, and other evidence-based approaches.",
  },
  {
    icon: "ri-briefcase-4-line",
    name: "Careerbound® Program",
    duration: "During treatment",
    desc: "Vocational support and career reintegration resources built into the recovery process — helping clients plan their professional future from within treatment.",
  },
];

const faqs = [
  {
    q: "Does the San Diego location offer detox or residential care?",
    a: "Our La Jolla location focuses on outpatient levels of care — PHP, IOP, and standard outpatient — as well as telehealth. For medically supervised detox and residential treatment, we refer clients to our Garden Grove or Newport Beach campuses, then welcome them back to San Diego for step-down care.",
  },
  {
    q: "What is the address?",
    a: "We're located at 7924 Ivanhoe Ave, Suite 7, La Jolla, CA 92037 — in the heart of the La Jolla Village, steps from the coast.",
  },
  {
    q: "Do you accept insurance in San Diego?",
    a: "Yes. We are in-network with 15+ major carriers including Aetna, Anthem/BCBS, Cigna, Tricare, MHN, and more. Our team verifies your benefits quickly and confidentially at no cost to you.",
  },
  {
    q: "What is the Careerbound® program?",
    a: "Careerbound® is a specialized track for clients who want to reintegrate into a career or education while in treatment. It includes vocational guidance, academic support, goal-setting, and professional skills development — all within the recovery framework.",
  },
  {
    q: "Can I start treatment in San Diego without going through detox?",
    a: "In some cases, yes. If you've already completed detox or don't require medical withdrawal management, you may be able to begin directly in our PHP or IOP program. An intake specialist will assess your clinical needs and recommend the right starting point.",
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
      {open && <p className="pb-5 text-sm leading-relaxed text-[#4B5563]"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>}
    </div>
  );
}

export default function SanDiegoPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-[#0B1F3A]">
        <Image
          src={IMAGES.hero}
          alt="La Jolla California coastline — dramatic cliffs and turquoise Pacific Ocean near Northbound Treatment San Diego"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">San Diego / La Jolla, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#E8622A]">
              <AutoLinkedTextClient>{"La Jolla, California — San Diego County"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug Rehab in{" "}
              <span className="italic text-[#E8622A]">San Diego</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              <AutoLinkedTextClient>{"Northbound&apos;s La Jolla center offers boutique outpatient and transitional programming — set in one of California&apos;s most beautiful coastal neighborhoods, with 7 miles of cliffs, coves, and surf-swept beaches surrounding you."}</AutoLinkedTextClient>
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "7924 Ivanhoe Ave, Suite 7, La Jolla, CA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "PHP, IOP & Outpatient" },
                { icon: "ri-computer-line", label: "Telehealth Available" },
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]"><AutoLinkedTextClient>{"La Jolla Outpatient Center"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">
                Recovery Set in{" "}
                <span className="italic text-[#E8622A]">La Jolla</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B5563]">
                <AutoLinkedTextClient>{"Our San Diego location sits in the heart of La Jolla Village — surrounded by 7 miles of sun-kissed beaches, dramatic sandstone cliffs, scenic coastal trails, and a vibrant recovery community. It&apos;s a setting that makes showing up to treatment feel like showing up to a better life."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                <AutoLinkedTextClient>{"This location specializes in outpatient care: PHP, IOP, standard outpatient, and telehealth. It&apos;s ideal for clients stepping down from our Garden Grove or Newport Beach residential programs, those beginning recovery from a stable living situation, or anyone who needs intensive support without leaving home."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                <AutoLinkedTextClient>{"The Careerbound® resource center is available at this location — helping clients build career and educational plans as part of a recovery process that prepares them for a full life beyond treatment."}</AutoLinkedTextClient>
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image src={IMAGES.office} alt="One-on-one therapy session at Northbound's La Jolla San Diego outpatient center with ocean view" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[#0B1F3A] px-6 py-5 shadow-xl">
                <p className="font-heading text-2xl font-bold text-white">Careerbound®</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-[#E8622A]"><AutoLinkedTextClient>{"Career Reintegration Program"}</AutoLinkedTextClient></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-[#F5F7FF] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]">Treatment Options</p>
            <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">Programs at San Diego</h2>
            <p className="mt-4 text-[#4B5563]"><AutoLinkedTextClient>{"Flexible, clinically rigorous care that fits your life — not the other way around."}</AutoLinkedTextClient></p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <div key={p.name} className={`rounded-3xl p-8 ${i === 0 ? "bg-[#0B1F3A] text-white" : "bg-white ring-1 ring-[#E5E7EB]"}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-[#E8622A]/20" : "bg-[#F5F7FF]"}`}>
                  <i className={`${p.icon} text-xl ${i === 0 ? "text-[#E8622A]" : "text-[#0B1F3A]"}`}></i>
                </div>
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-white/10 text-white/80" : "bg-[#F5F7FF] text-[#6B7280]"}`}>
                  {p.duration}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${i === 0 ? "text-white" : "text-[#0B1F3A]"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-[#4B5563]"}`}><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GROUP / COMMUNITY ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]"><AutoLinkedTextClient>{"Community & Connection"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-[#0B1F3A] md:text-5xl">
                The Power of{" "}
                <span className="italic text-[#E8622A]">Peer Recovery</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                <AutoLinkedTextClient>{"Group therapy at our La Jolla location brings together people who understand what you&apos;re going through. Led by licensed clinicians, these sessions build communication skills, reduce shame, and create real accountability — without judgment."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#4B5563]">
                <AutoLinkedTextClient>{"San Diego has one of the strongest sober communities in California, and our outpatient programming is integrated with local Alcoholics Anonymous, Narcotics Anonymous, Al-Anon, and SMART Recovery groups to give you a foundation that extends well beyond our walls."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { icon: "ri-group-line", label: "Evidence-based group therapy" },
                  { icon: "ri-user-heart-line", label: "Individual one-on-one sessions" },
                  { icon: "ri-family-line", label: "Family therapy integration" },
                  { icon: "ri-map-pin-2-line", label: "Strong local sober community" },
                  { icon: "ri-water-flash-line", label: "7 miles of coastal trails for wellness" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3 text-sm text-[#4B5563]">
                    <i className={`${d.icon} text-base text-[#E8622A]`}></i>
                    <span>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src={IMAGES.group} alt="Recovery group therapy session at Northbound San Diego — diverse adults in supportive circle" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SD CONTEXT ─── */}
      <section className="bg-[#0B1F3A] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
            <div className="lg:col-span-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#E8622A]"><AutoLinkedTextClient>{"The Need in San Diego"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-3xl font-bold text-white">Recovery Resources for Southern California</h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm leading-relaxed text-white/75">
                <AutoLinkedTextClient>{"California has one of the highest rates of substance use disorder in the nation — approximately 8% of residents meet addiction criteria, yet only 10% seek professional help. In San Diego County, methamphetamine and opioid use remain significant public health challenges."}</AutoLinkedTextClient>
              </p>
              <p className="text-sm leading-relaxed text-white/75">
                <AutoLinkedTextClient>{"Northbound&apos;s La Jolla center extends quality, evidence-based care to San Diego County residents who may not be able to travel to Orange County for residential treatment — and provides a critical step-down destination for those completing higher levels of care."}</AutoLinkedTextClient>
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full bg-[#E8622A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4531d]">
                  <i className="ri-phone-fill"></i> Call Now — (866) 311-0003
                </Link>
                <Link href="/admissions/insurance-coverage/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Verify Insurance
                </Link>
              </div>
            </div>
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

      {/* ─── FACILITY GALLERY ─── */}
      <FacilityGallery
        facility="sandiego"
        locationLabel="San Diego"
        eyebrow="Inside the Facility"
        heading="A Closer Look at San Diego"
        italicWord="San Diego"
        intro="Take a tour through our San Diego center — a calm, supportive setting in La Jolla designed for healing, with art and music therapy spaces, comfortable rooms, and dorm-style houses."
      />

      <CtaBanner
        headline="Start Treatment in San Diego"
        body="Our admissions team is available 24/7. Whether you're stepping down from residential or starting your recovery journey, we'll help you find the right path forward."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/admissions/insurance-coverage/" }}
      />
    </>
  );
}
