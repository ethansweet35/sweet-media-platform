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
  hero: `${BASE}/facility/seattle/1.webp`,
  neighborhood: `${BASE}/facility/seattle/3.webp`,
  nature: `${BASE}/nbt_sea_nature01.jpg`,
};

const services = [
  {
    icon: "ri-search-eye-line",
    name: "Initial Screening & Assessment",
    desc: "A thorough biopsychosocial evaluation by an LCSW or equivalent clinician — reviewing substance history, mental health, family dynamics, and living environment using ASAM Criteria to determine the right level of care.",
  },
  {
    icon: "ri-mental-health-line",
    name: "Dual Diagnosis Assessment",
    desc: "Co-occurring conditions like depression, anxiety, and PTSD are assessed alongside addiction. Our dual diagnosis care addresses both simultaneously for a complete recovery.",
  },
  {
    icon: "ri-file-list-3-line",
    name: "Evidence-Based Treatment Planning",
    desc: "Assessment results feed directly into a personalized treatment plan using ASAM dimensions — from withdrawal risk to recovery environment — recommending the right intensity of care.",
  },
  {
    icon: "ri-family-line",
    name: "Family Assessment",
    desc: "We evaluate family dynamics, communication patterns, codependency, and trauma history. Family-inclusive planning supports both the client's recovery and the family's own healing.",
  },
  {
    icon: "ri-shield-user-line",
    name: "Alternative Sentencing",
    desc: "Our Seattle office assists individuals seeking alternatives to incarceration. Community service, probation, house arrest, and rehabilitation programs — focused on accountability and recovery.",
  },
  {
    icon: "ri-group-line",
    name: "Alumni Association",
    desc: "The Northbound Alumni Association Seattle chapter hosts weekly meetings, monthly adventure outings, quarterly celebrations, and ongoing volunteer work — a lifelong recovery community.",
  },
];

const treatmentPrograms = [
  { icon: "ri-first-aid-kit-line", name: "Medical Detox", location: "Garden Grove, CA", desc: "Washington clients travel to our fully licensed medical detox center at The Grove in Garden Grove, Orange County." },
  { icon: "ri-home-heart-line", name: "Residential Treatment", location: "Garden Grove, CA", desc: "30–90 day inpatient programs with daily therapy, holistic activities, and 24/7 clinical support at our Garden Grove campus." },
  { icon: "ri-hospital-line", name: "Partial Hospitalization (PHP)", location: "Newport Beach, CA", desc: "Structured day-treatment at our Newport Beach campus for step-down from residential care at Garden Grove." },
];

const therapies = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavioral Therapy (DBT)",
  "Acceptance & Commitment Therapy (ACT)",
  "Motivational Interviewing (MI)",
  "Solution Focused Therapy (SFT)",
  "Trauma-Informed Therapy",
  "EMDR",
  "Individual, group & family therapy",
  "Holistic therapies",
];

const alumniActivities = [
  "Weekly Meetings",
  "Family Support Program",
  "Monthly Adventure Outings",
  "Quarterly Birthday Celebrations",
  "Ongoing Volunteer Work",
];

const faqs = [
  {
    q: "Do you have a physical treatment facility in Seattle?",
    a: "Yes. Our Seattle office is located in the Lower Queen Anne (Uptown) neighborhood at 2120 1st Ave N, Unit 313 — near the Space Needle and Puget Sound. It serves as an assessment and community hub. For detox, residential treatment, and PHP, Washington clients travel to our Orange County campuses.",
  },
  {
    q: "Why do Seattle clients travel to California for residential treatment?",
    a: "Our medically licensed detox and residential facilities are in Garden Grove, California. PHP is offered at our Newport Beach campus. The Southern California environment — coastal weather, access to beaches, and a strong recovery culture — is itself a therapeutic asset. More than half of Northbound's clients historically travel from out of state.",
  },
  {
    q: "What is the drug crisis like in Washington / Seattle?",
    a: "Washington is facing a serious crisis. In 2022, 2,706 Washington residents died from drug overdose — a rate of 32.6 per 100,000, more than double from a decade prior. King County alone saw 1,312 overdose deaths in 2023, a 16% increase from 2022. Northbound is committed to serving Washington residents with the highest level of clinical care available.",
  },
  {
    q: "What is alternative sentencing?",
    a: "Our Seattle office helps individuals seeking alternatives to incarceration — including community service, probation, conditional sentences, house arrest, and rehabilitation programs. The focus is on rehabilitation, accountability, and community reintegration rather than punitive measures.",
  },
  {
    q: "Do you accept insurance for Seattle/Washington clients?",
    a: "Yes. We are in-network with 15+ major carriers. Our team will verify your benefits and navigate your coverage quickly and confidentially. Call us 24/7 at (866) 311-0003 to get started.",
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

export default function SeattlePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={`${heroLocationSection} bg-navy`}>
        <Image
          src={IMAGES.hero}
          alt="Seattle cityscape at dawn — Space Needle, Puget Sound, and Mount Rainier — Northbound Treatment Seattle location"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent" />

        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">Seattle, WA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedTextClient>{"Seattle, Washington — Lower Queen Anne / Uptown"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Addiction Treatment{" "}
              <span className="italic text-terracotta">in Seattle</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              <AutoLinkedTextClient>{"Northbound's Seattle hub serves Washington state residents with clinical assessments, family support, alumni programming, and alternative sentencing services — connecting Pacific Northwest clients to Northbound's California treatment campuses and ongoing alumni support."}</AutoLinkedTextClient>
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "2120 1st Ave N, Unit 313, Seattle, WA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "Detox, Residential & PHP in CA" },
                { icon: "ri-shield-check-line", label: "Insurance Verification Available" },
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta"><AutoLinkedTextClient>{"Seattle Assessment & Support Hub"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Your Gateway to{" "}
                <span className="italic text-terracotta">Recovery</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Our Seattle services center is located in the vibrant Lower Queen Anne (Uptown) neighborhood — a walkable community of historic houses and boutique shops, right on Puget Sound and steps from the Space Needle. It's an inspiring, community-rooted setting for taking the first steps toward recovery."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Seattle clients begin with a comprehensive clinical assessment at our local office. For those requiring medically supervised detox or residential treatment, we facilitate a smooth transition to our fully licensed Orange County facilities — where the Southern California environment becomes part of the healing. Clients then step down through PHP and alumni support to complete their continuum of care."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 rounded-2xl border border-sand-dark bg-sand p-6">
                <p className="text-sm font-semibold text-navy">The Seattle Crisis</p>
                <p className="mt-2 text-sm leading-relaxed text-espresso/80">
                  <AutoLinkedTextClient>{"King County saw 1,312 suspected and confirmed overdose deaths in 2023 — a 16% increase from 2022, and more than double the 2019 figure. Washington state's overdose rate of 32.6 per 100,000 is more than double what it was a decade ago. Northbound is here to help."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image src={IMAGES.neighborhood} alt="Lower Queen Anne neighborhood in Seattle — historic brownstones, tree-lined streets near Northbound's Seattle office" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 shadow-xl">
                <p className="font-heading text-2xl font-bold text-white">CA Care</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-terracotta">From Seattle Intake</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TREATMENT PATHWAY ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">The Seattle Pathway</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">Full Continuum for Washington Clients</h2>
            <p className="mt-4 text-espresso/80">
              <AutoLinkedTextClient>{"Seattle residents access Northbound's full treatment continuum — from local assessment to California residential care and back again."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {treatmentPrograms.map((p, i) => (
              <div key={p.name} className={`rounded-3xl p-8 ${i === 0 ? "bg-navy" : "bg-white ring-1 ring-sand-dark"}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-terracotta/20" : "bg-sand"}`}>
                  <i className={`${p.icon} text-xl ${i === 0 ? "text-terracotta" : "text-navy"}`}></i>
                </div>
                <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-white/10 text-white/80" : "bg-sand text-muted"}`}>
                  <i className="ri-map-pin-line text-[10px]"></i> {p.location}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${i === 0 ? "text-white" : "text-navy"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-espresso/80"}`}><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Seattle Services</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">What We Offer in Seattle</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/20 text-terracotta mb-3">
                  <i className={`${s.icon} text-lg`}></i>
                </span>
                <h3 className="font-semibold text-white mb-2">{s.name}</h3>
                <p className="text-sm leading-relaxed text-white/65"><AutoLinkedTextClient>{s.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THERAPIES + NATURE ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Clinical Modalities</p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Therapies Proven to{" "}
                <span className="italic text-terracotta">Work</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Whether you receive care in Seattle or at one of our California campuses, the same evidence-based clinical approach applies — personalized to your specific history, substance, and co-occurring conditions."}</AutoLinkedTextClient>
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {therapies.map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm text-espresso">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-sand p-6">
                <p className="text-sm font-semibold text-navy mb-2"><AutoLinkedTextClient>{"Alumni Association — Seattle Chapter"}</AutoLinkedTextClient></p>
                <div className="space-y-2">
                  {alumniActivities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-espresso/80">
                      <i className="ri-checkbox-circle-line text-terracotta text-sm"></i>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image src={IMAGES.nature} alt="Group walking through Pacific Northwest old-growth forest — nature therapy in recovery at Northbound Seattle" fill className="object-cover" />
              </div>
              <div className="absolute -top-5 -right-5 rounded-2xl bg-terracotta px-5 py-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-white"><AutoLinkedTextClient>{"Pacific Northwest Recovery"}</AutoLinkedTextClient></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-sand py-20 lg:py-28">
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

      {/* ─── INSURANCE ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Insurance</p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">We Verify Your Benefits — Free & Confidential</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-espresso/80"><AutoLinkedTextClient>{"In-network with 15+ major carriers. Washington clients are covered for treatment at our California campuses under most PPO plans."}</AutoLinkedTextClient></p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-muted">
            {["Aetna", "Anthem BCBS", "Cigna", "Tricare", "MHN", "Multiplan", "Beacon", "ComPsych", "First Health"].map((ins) => (
              <span key={ins} className="rounded-full bg-sand px-4 py-2 ring-1 ring-sand-dark">{ins}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/insurance/" className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light">
              Verify My Insurance
            </Link>
            <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/50">
              <i className="ri-phone-line"></i> (866) 311-0003
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FACILITY GALLERY ─── */}
      <FacilityGallery
        facility="seattle"
        locationLabel="Seattle"
        eyebrow="Inside the Hub"
        heading="A Closer Look at Seattle"
        italicWord="Seattle"
        intro="Our Lower Queen Anne support hub blends Pacific Northwest calm with the convenience of urban Seattle — a welcoming space for assessments, case management, and ongoing care."
      />

      <CtaBanner
        headline="Washington Residents: Help Is Available Now"
        body="Our admissions team is available 24/7. We'll assess your needs, verify your insurance, and connect you with the right level of care — whether that's our Seattle hub or California campuses."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
