"use client";

import Image from "next/image";
import { heroContentPad, heroLocationSection } from "@/lib/heroSpacing";
import Link from "next/link";
import { useState } from "react";
import CtaBanner from "@/views/shared/CtaBanner";
import FacilityGallery from "@/views/shared/FacilityGallery";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const IMAGES = {
  hero: `${BASE}/facility/sandiego/1.webp`,
  office: `${BASE}/facility/sandiego/3.webp`,
  group: `${BASE}/facility/sandiego/6.webp`,
};

const programs = [
  {
    icon: "ri-wifi-line",
    name: "Virtual IOP (HomeBound)",
    duration: "Flexible",
    desc: "Northbound's virtual intensive outpatient program for California residents — the same clinical quality without the commute.",
  },
  {
    icon: "ri-map-pin-2-line",
    name: "Regional Outreach",
    duration: "Ongoing",
    desc: "Local intake support, family coordination, and admissions guidance connecting San Diego County clients to Northbound's California treatment campuses.",
  },
  {
    icon: "ri-mental-health-line",
    name: "Dual Diagnosis",
    duration: "Integrated",
    desc: "Co-occurring mental health conditions are treated alongside addiction — depression, anxiety, PTSD, and more — using CBT, DBT, EMDR, and other evidence-based approaches.",
  },
];

const faqs = [
  {
    q: "Does the San Diego location offer detox or residential care?",
    a: "Our La Jolla office supports virtual IOP and regional outreach. For medically supervised detox and residential treatment, clients are admitted to our Garden Grove campus. PHP is offered at our Newport Beach campus.",
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
    q: "Can I start treatment in San Diego without going through detox?",
    a: "In some cases, yes. If you've already completed detox or don't require medical withdrawal management, you may be able to begin directly in virtual IOP or continue care after PHP at Newport Beach. An intake specialist will assess your clinical needs and recommend the right starting point.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-4 py-5 text-left">
        <span className="font-semibold text-navy leading-snug">{q}</span>
        <span className={`mt-0.5 shrink-0 text-terracotta transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <i className="ri-add-line text-xl"></i>
        </span>
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-espresso/80"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>}
    </div>
  );
}

export default function SanDiegoPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={`${heroLocationSection} bg-navy`}>
        <Image
          src={IMAGES.hero}
          alt="La Jolla California coastline — dramatic cliffs and turquoise Pacific Ocean near Northbound Treatment San Diego"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">San Diego / La Jolla, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedTextClient>{"La Jolla, California — San Diego County"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug Rehab in{" "}
              <span className="italic text-terracotta">San Diego</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              <AutoLinkedTextClient>{"Northbound's La Jolla office supports virtual IOP and regional outreach — set in one of California's most beautiful coastal neighborhoods, with 7 miles of cliffs, coves, and surf-swept beaches surrounding you."}</AutoLinkedTextClient>
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "7924 Ivanhoe Ave, Suite 7, La Jolla, CA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "Virtual IOP & Regional Support" },
                { icon: "ri-computer-line", label: "Telehealth Available" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-white/75">
                  <i className={`${f.icon} text-terracotta`}></i>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-terracotta-light">
                <i className="ri-phone-fill"></i> Call (866) 311-0003
              </Link>
              <Link href="/insurance/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta"><AutoLinkedTextClient>{"La Jolla Outpatient Center"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Recovery Set in{" "}
                <span className="italic text-terracotta">La Jolla</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Our San Diego location sits in the heart of La Jolla Village — surrounded by 7 miles of sun-kissed beaches, dramatic sandstone cliffs, scenic coastal trails, and a vibrant recovery community. It's a setting that makes showing up to treatment feel like showing up to a better life."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"This location specializes in virtual IOP (HomeBound) and regional support. Detox and residential treatment are provided at our Garden Grove campus; PHP is at Newport Beach. Collegebound® and Careerbound® are available exclusively during residential treatment at Garden Grove."}</AutoLinkedTextClient>
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image src={IMAGES.office} alt="One-on-one therapy session at Northbound's La Jolla San Diego outpatient center with ocean view" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 shadow-xl">
                <p className="font-heading text-2xl font-bold text-white">Garden Grove</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-terracotta"><AutoLinkedTextClient>{"Residential Campus"}</AutoLinkedTextClient></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Treatment Options</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">Programs at San Diego</h2>
            <p className="mt-4 text-espresso/80"><AutoLinkedTextClient>{"Flexible, clinically rigorous care that fits your life — not the other way around."}</AutoLinkedTextClient></p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <div key={p.name} className={`rounded-3xl p-8 ${i === 0 ? "bg-navy text-white" : "bg-white ring-1 ring-sand-dark"}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-terracotta/20" : "bg-sand"}`}>
                  <i className={`${p.icon} text-xl ${i === 0 ? "text-terracotta" : "text-navy"}`}></i>
                </div>
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-white/10 text-white/80" : "bg-sand text-muted"}`}>
                  {p.duration}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${i === 0 ? "text-white" : "text-navy"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-espresso/80"}`}><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta"><AutoLinkedTextClient>{"Community & Connection"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                The Power of{" "}
                <span className="italic text-terracotta">Peer Recovery</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Group therapy at our La Jolla location brings together people who understand what you're going through. Led by licensed clinicians, these sessions build communication skills, reduce shame, and create real accountability — without judgment."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
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
                  <div key={d.label} className="flex items-center gap-3 text-sm text-espresso/80">
                    <i className={`${d.icon} text-base text-terracotta`}></i>
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
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
            <div className="lg:col-span-1">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta"><AutoLinkedTextClient>{"The Need in San Diego"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-3xl font-bold text-white">Recovery Resources for Southern California</h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm leading-relaxed text-white/75">
                <AutoLinkedTextClient>{"California has one of the highest rates of substance use disorder in the nation — approximately 8% of residents meet addiction criteria, yet only 10% seek professional help. In San Diego County, methamphetamine and opioid use remain significant public health challenges."}</AutoLinkedTextClient>
              </p>
              <p className="text-sm leading-relaxed text-white/75">
                <AutoLinkedTextClient>{"Northbound's La Jolla center extends quality, evidence-based care to San Diego County residents who may not be able to travel to Orange County for residential treatment — and provides a critical step-down destination for those completing higher levels of care."}</AutoLinkedTextClient>
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-light">
                  <i className="ri-phone-fill"></i> Call Now — (866) 311-0003
                </Link>
                <Link href="/insurance/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Common Questions</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-[#E5E7EB] rounded-3xl bg-white ring-1 ring-sand-dark px-8">
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
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
