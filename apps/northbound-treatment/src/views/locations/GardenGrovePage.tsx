"use client";

import Image from "next/image";
import { heroContentPad, heroLocationSection } from "@/lib/heroSpacing";
import Link from "next/link";
import { useState } from "react";
import { GARDEN_GROVE_IMAGES } from "@/views/home/assets";
import CtaBanner from "@/views/shared/CtaBanner";
import FacilityGallery from "@/views/shared/FacilityGallery";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const therapyServices = [
  { icon: "ri-mental-health-line", label: "Dual Diagnosis Treatment" },
  { icon: "ri-heart-pulse-line", label: "Trauma-Informed Care" },
  { icon: "ri-user-heart-line", label: "Individual Therapy" },
  { icon: "ri-team-line", label: "Group Counseling" },
  { icon: "ri-family-line", label: "Family Therapy" },
  { icon: "ri-book-open-line", label: "Psychoeducational Lectures" },
  { icon: "ri-leaf-line", label: "12-Step Immersion" },
  { icon: "ri-shield-check-line", label: "Daily Nursing Attention" },
  { icon: "ri-star-line", label: "Alumni Weekly Meetings" },
];

const amenities = [
  { icon: "ri-restaurant-line", label: "Chef-Curated Meals", desc: "On-site chefs prepare three nutritious, chef-curated meals daily" },
  { icon: "ri-home-heart-line", label: "Comfortable Rooms", desc: "Residential spaces designed for rest and recovery" },
  { icon: "ri-tv-line", label: "Smart TVs In-Room", desc: "All major streaming apps included" },
  { icon: "ri-fire-line", label: "On-Site Fire Pit", desc: "Nightly community gathering space" },
  { icon: "ri-run-line", label: "On-Site Gym", desc: "Daily fitness access for all residents" },
  { icon: "ri-compass-line", label: "Walking Labyrinth", desc: "Meditative outdoor walking path" },
];

const activities = [
  "Instructor-led yoga on turf court",
  "Volleyball on padded turf court",
  "Guided meditation sessions",
  "Beach bonfires in Orange County",
  "Experiential group activities",
  "Weekly alumni BBQs & meetings",
];

const programs = [
  {
    icon: "ri-first-aid-kit-line",
    name: "Medical Detox",
    duration: "5–10 days",
    desc: "24/7 medically supervised withdrawal management with medication-assisted treatment to safely stabilize the body before deeper clinical work begins.",
  },
  {
    icon: "ri-home-heart-line",
    name: "Residential Treatment",
    duration: "28–90 days",
    desc: "Immersive, around-the-clock inpatient care at The Grove — our Garden Grove flagship. Full clinical programming, therapy, and community support daily.",
  },
  {
    icon: "ri-hospital-line",
    name: "Partial Hospitalization (PHP)",
    duration: "4–8 hrs/day",
    desc: "Structured day-treatment for those stepping down from residential or who need intensive support without overnight stays.",
  },
  {
    icon: "ri-wifi-line",
    name: "Virtual IOP (HomeBound)",
    duration: "Flexible",
    desc: "Northbound's only outpatient intensive level of care — delivered via secure telehealth for California and Washington residents.",
  },
];

const faqs = [
  {
    q: "What types of addiction do you treat at Garden Grove?",
    a: "We treat alcohol, opioids, cocaine, methamphetamine, benzodiazepines, prescription drugs, and all forms of substance use disorders. Our programs include dual diagnosis care for co-occurring mental health conditions like depression, anxiety, PTSD, and bipolar disorder.",
  },
  {
    q: "How long does treatment last?",
    a: "Program length varies by individual need. Our most common options are 30-day short-term intensive care, 30–90 day in-depth residential programs, and extended aftercare including virtual IOP and alumni support. A specialist will help determine the right fit.",
  },
  {
    q: "Do you offer medically supervised detox at Garden Grove?",
    a: "Yes. The Grove is our primary detox and residential hub. Our medical team — including psychiatrists, nurse practitioners, and registered nurses — provides 24/7 monitored detox with medication management to ensure your safety and comfort throughout withdrawal.",
  },
  {
    q: "What does a typical day look like?",
    a: "Days are structured with individual therapy, group sessions, psychoeducational lectures, meals, and experiential activities like yoga, meditation, and exercise. Evenings often include 12-step meetings, alumni gatherings, or peer community time at the fire pit.",
  },
  {
    q: "Do you accept insurance at Garden Grove?",
    a: "Yes. We are in-network with 15+ major carriers including Aetna, Anthem/BCBS, Cigna, Tricare, MHN, Multiplan, and more. Our admissions team will verify your benefits quickly and confidentially — at no cost or obligation.",
  },
  {
    q: "What happens after I leave the Garden Grove facility?",
    a: "We provide comprehensive aftercare planning: virtual IOP step-down, ongoing alumni support groups (weekly meetings and BBQs), and relapse-prevention strategies. Recovery is lifelong — and so is our support.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-navy leading-snug">{q}</span>
        <span className={`mt-0.5 shrink-0 text-terracotta transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <i className="ri-add-line text-xl"></i>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-espresso/80"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>
      )}
    </div>
  );
}

export default function GardenGrovePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={`${heroLocationSection} bg-navy`}>
        <Image
          src={GARDEN_GROVE_IMAGES.exterior}
          alt="Northbound Treatment – The Grove, Garden Grove California rehab facility exterior at golden hour"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          {/* breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">Garden Grove, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedTextClient>{"Garden Grove, California — Orange County"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug & Alcohol{" "}
              <span className="italic text-terracotta">Rehab</span>{" "}
              in Garden Grove
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Northbound&apos;s Garden Grove campus — known as <strong className="text-white">The Grove</strong> — is our flagship residential and detox facility. Located in the heart of Orange County, it&apos;s where thousands of lives have been rebuilt since 1988.
            </p>

            {/* quick facts strip */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "9842 13th St, Garden Grove, CA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "28–90 Day Programs" },
                { icon: "ri-heart-pulse-line", label: "Detox + Residential" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-white/75">
                  <i className={`${f.icon} text-terracotta`}></i>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-fill"></i>
                Call (866) 311-0003
              </Link>
              <Link
                href="/insurance/"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Verify My Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE GROVE INTRO ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
                <AutoLinkedTextClient>{"Our Flagship Location"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Welcome to{" "}
                <span className="italic text-terracotta">The Grove</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/80">
                When we founded our Garden Grove facility, we wanted to pay homage to the history of sprawling orange groves that once populated this city. The name <em>The Grove</em> was established as a symbol of hope — a place where we plant the seeds of recovery.
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Garden Grove sits in Orange County, just one mile from the famed Disneyland Resort and 20 minutes from some of California's most iconic beaches. The city's vibrant diversity and deep community spirit make it an ideal backdrop for healing — connected enough to feel alive, peaceful enough to focus on what matters."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"As a two-phased residential treatment center, The Grove offers medically supervised detox followed by full residential care — all under one roof, staffed 24 hours a day."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { stat: "38+", label: "Years Operating" },
                  { stat: "2:1", label: "Staff-to-Client Ratio" },
                  { stat: "24/7", label: "Medical Support" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-sand p-5 text-center">
                    <p className="font-heading text-3xl font-bold text-navy"><AutoLinkedTextClient>{s.stat}</AutoLinkedTextClient></p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={GARDEN_GROVE_IMAGES.interior}
                  alt="Comfortable communal lounge at The Grove — Northbound's Garden Grove residential treatment facility"
                  fill
                  className="object-cover"
                />
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">38+</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-terracotta">Years of Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
              Levels of Care
            </p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Programs at Garden Grove
            </h2>
            <p className="mt-4 text-espresso/80">
              <AutoLinkedTextClient>{"Every client enters The Grove with a unique story. We offer a full continuum of care — from the first day of detox to long after discharge."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 ${i === 0 ? "bg-navy text-white lg:col-span-1" : "bg-white ring-1 ring-sand-dark"}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "bg-terracotta/20" : "bg-sand"}`}
                >
                  <i className={`${p.icon} text-xl ${i === 0 ? "text-terracotta" : "text-navy"}`}></i>
                </div>
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-white/10 text-white/80" : "bg-sand text-muted"}`}>
                  {p.duration}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${i === 0 ? "text-white" : "text-navy"}`}>
                  {p.name}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-espresso/80"}`}><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Not sure which level is right for you?{" "}
            <Link href="tel:8663110003" className="font-semibold text-navy underline-offset-4 hover:underline">
              Speak with an admissions specialist — (866) 311-0003
            </Link>
          </p>
        </div>
      </section>

      {/* ─── ACTIVITIES + IMAGE SPLIT ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={GARDEN_GROVE_IMAGES.activities}
                  alt="Group yoga class on the lawn at Northbound's Garden Grove rehab — wellness in recovery"
                  fill
                  className="object-cover"
                />
              </div>
              {/* community tag */}
              <div className="absolute -top-5 -right-5 rounded-2xl bg-terracotta px-5 py-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-white"><AutoLinkedTextClient>{"Community & Wellness"}</AutoLinkedTextClient></p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
                <AutoLinkedTextClient>{"Services, Amenities & Activities"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Life at The Grove
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Recovery isn't just about stopping substance use — it's about rebuilding a life worth living. At The Grove, every day is designed to restore your body, mind, and sense of self."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activities.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                      <i className="ri-check-line text-sm"></i>
                    </span>
                    <span className="text-sm font-medium text-espresso">{a}</span>
                  </div>
                ))}
              </div>

              {/* amenity cards */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenities.slice(0, 6).map((am) => (
                  <div key={am.label} className="rounded-2xl bg-sand p-4">
                    <i className={`${am.icon} mb-2 text-lg text-navy`}></i>
                    <p className="text-xs font-bold text-navy"><AutoLinkedTextClient>{am.label}</AutoLinkedTextClient></p>
                    <p className="mt-0.5 text-[10px] leading-snug text-muted"><AutoLinkedTextClient>{am.desc}</AutoLinkedTextClient></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THERAPY SERVICES ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
                Clinical Care
              </p>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Therapy at<br />
                <span className="italic text-terracotta">The Grove</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                <AutoLinkedTextClient>{"Our multidisciplinary team — including MDs, PhDs, LMFTs, LCSWs, and CADCs — delivers evidence-based and holistic care tailored to your specific needs and history."}</AutoLinkedTextClient>
              </p>
              <Link
                href="tel:8663110003"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-fill"></i>
                (866) 311-0003
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {therapyServices.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-terracotta/20 text-terracotta">
                    <i className={`${s.icon} text-base`}></i>
                  </span>
                  <span className="text-sm font-medium leading-tight text-white">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── OC COMMUNITY CONTEXT ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
                <AutoLinkedTextClient>{"Location & Community"}</AutoLinkedTextClient>
              </p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Rooted in{" "}
                <span className="italic text-terracotta">Orange County</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Garden Grove is one of Orange County's most vibrant and diverse cities. Home to the bustling Little Saigon and Koreatown commercial districts, it reflects a deep hometown spirit and progressive energy — an ideal environment for people from all walks of life to find common ground in recovery."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Our location puts you one mile from Disneyland Resort and 20 minutes from some of California's most beautiful beaches — available for structured beach bonfire outings and coastal therapy experiences that are unique to Southern California treatment."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: "ri-map-pin-2-line", label: "9842 13th St, Garden Grove, CA 92844" },
                  { icon: "ri-phone-line", label: "(866) 311-0003 — 24/7 Admissions Line" },
                  { icon: "ri-time-line", label: "Same-Day Admissions Available" },
                  { icon: "ri-shield-check-line", label: "DHCS Licensed · NAATP Member" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3 text-sm text-espresso/80">
                    <i className={`${d.icon} text-base text-terracotta`}></i>
                    <span>{d.label}</span>
                  </div>
                ))}
              </div>

              {/* OC context stat */}
              <div className="mt-8 rounded-2xl border border-sand-dark bg-sand p-6">
                <p className="text-sm font-semibold text-navy"><AutoLinkedTextClient>{"Orange County Context"}</AutoLinkedTextClient></p>
                <p className="mt-2 text-sm leading-relaxed text-espresso/80">
                  <AutoLinkedTextClient>{"Drug and alcohol-related mortality in Orange County has risen since 2012, with a 45% increase in opioid-involved deaths from 2019 to 2020. Northbound has been part of the recovery solution in this community for over 38 years."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={GARDEN_GROVE_IMAGES.community}
                  alt="Aerial view of Garden Grove, Orange County California at dusk — Northbound's home community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
              Real Stories
            </p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Hear From Our Clients
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="ri-star-fill text-terracotta text-lg"></i>
              ))}
              <span className="ml-2 text-sm text-muted">4.6/5 · 224+ Google Reviews</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Don M.",
                quote:
                  "Northbound was one of the best decisions I've ever made. Every single staff member was amazing and really made me feel like part of a new family. My 7-day stay turned to 30 by my decision — and I'd go straight back to Northbound without hesitation.",
              },
              {
                name: "Hugo M.",
                quote:
                  "Today, 95 days later, I have my family back. My business is thriving. But more importantly, my relationship with God has been restored. Northbound was a major part of that transformation. To anyone struggling: I wholeheartedly recommend Northbound.",
              },
              {
                name: "Charlie H.",
                quote:
                  "I showed up a broken man — homeless, going through a divorce. Through the staff and connections at Northbound I realized I am not alone. They stood behind me and helped me even after I left. THEY CARE. Go, be open and humble. They changed my life.",
              },
              {
                name: "Tynell D.",
                quote:
                  "The beds were soft and clean. Plenty of food. The staff were all super kind. Their medical staff is top-notch. If you give it a chance — just one chance — you'll see that they are an extended FAMILY to everyone who crosses their doors.",
              },
              {
                name: "Joshua G.",
                quote:
                  "This place literally saved my life. The case workers, therapists, doctors, and med staff are totally outcome-driven and it works. Many of the people I met here will be my friends for life.",
              },
              {
                name: "Megan H.",
                quote:
                  "Northbound was the best decision I have ever made in my entire life. It truly saved my life and helped me learn to love myself again. They gave me footing to soar forward.",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-sand-dark">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-terracotta text-sm"></i>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-espresso">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 text-xs font-bold text-navy"><AutoLinkedTextClient>{t.name}</AutoLinkedTextClient></p>
                <p className="text-[10px] text-muted/70"><AutoLinkedTextClient>{"Northbound Garden Grove Alumni"}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">
              Common Questions
            </p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-[#E5E7EB] rounded-3xl bg-white ring-1 ring-sand-dark px-8">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSURANCE ─── */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Insurance</p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">We Verify Your Benefits — Free & Confidential</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-espresso/80">
            <AutoLinkedTextClient>{"We work with 15+ major carriers including Aetna, Anthem/BCBS, Cigna, Tricare, MHN, and more. Our admissions team handles the verification process so you can focus on getting help."}</AutoLinkedTextClient>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-semibold text-muted">
            {["Aetna", "Anthem BCBS", "Cigna", "Tricare", "MHN", "Multiplan", "Beacon", "ComPsych", "First Health"].map((ins) => (
              <span key={ins} className="rounded-full bg-white px-4 py-2 ring-1 ring-sand-dark">{ins}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Verify My Insurance
            </Link>
            <Link
              href="tel:8663110003"
              className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/50"
            >
              <i className="ri-phone-line"></i>
              (866) 311-0003
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREAS ─── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted/70">
            <AutoLinkedTextClient>{"Serving All of Southern California Including:"}</AutoLinkedTextClient>
          </p>
          <p className="text-sm leading-relaxed text-muted">
            <AutoLinkedTextClient>{"Aliso Viejo · Anaheim · Brea · Buena Park · Costa Mesa · Cypress · Dana Point · Fountain Valley · Fullerton · Huntington Beach · La Jolla · La Habra · La Palma · Laguna Beach · Laguna Hills · Laguna Niguel · Lake Forest · Los Alamitos · Mission Viejo · Newport Beach · Orange County · Placentia · Santa Ana · San Clemente · San Diego · Seal Beach · Stanton · Tustin · Villa Park · Westminster · Yorba Linda"}</AutoLinkedTextClient>
          </p>
        </div>
      </section>

      {/* ─── FACILITY GALLERY ─── */}
      <FacilityGallery
        facility="grove"
        locationLabel="Garden Grove"
        eyebrow="Inside The Grove"
        heading="A Closer Look at Garden Grove"
        italicWord="Garden"
        intro="Step inside our Garden Grove campus — comfortable residential living, a chef's kitchen, an on-site gym, fire pit, volleyball court, and the homelike spaces where real recovery takes root."
      />

      <CtaBanner
        headline="Ready to Start at The Grove?"
        body="Our admissions team is available 24/7. We'll verify your insurance, answer your questions, and help you take the first step — with no pressure and no cost."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
