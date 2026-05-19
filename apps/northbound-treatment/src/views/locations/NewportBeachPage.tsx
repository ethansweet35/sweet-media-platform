"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CtaBanner from "@/views/shared/CtaBanner";
import FacilityGallery from "@/views/shared/FacilityGallery";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

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
        <span className="font-semibold text-navy leading-snug">{q}</span>
        <span className={`mt-0.5 shrink-0 text-terracotta transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <i className="ri-add-line text-xl"></i>
        </span>
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-espresso/80"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>}
    </div>
  );
}

export default function NewportBeachPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden bg-navy">
        <Image
          src={IMAGES.hero}
          alt="Newport Beach California coastline — aerial view of pristine Pacific beaches near Northbound Treatment"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.18 }}
          priority
        />
        {/* solid dark layer */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(58,102,151,0.6)", zIndex: 1 }} />
        {/* gradient darkens the bottom half where the text sits */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #3a6697 0%, rgba(58,102,151,0.65) 45%, transparent 100%)",
            zIndex: 2,
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10" style={{ zIndex: 10 }}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="hover:text-white/80 transition">Locations</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">Newport Beach, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedTextClient>{"Newport Beach, California — Orange County"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug & Alcohol{" "}
              <span className="italic text-terracotta">Rehab</span>{" "}
              in Newport Beach
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              <AutoLinkedTextClient>{"Northbound's Newport Beach campus is our flagship multi-building treatment center — nestled in one of Southern California's most stunning coastal communities, 42 miles of pristine Pacific beach as your backdrop for healing."}</AutoLinkedTextClient>
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-8">
              {[
                { icon: "ri-map-pin-2-line", label: "3822 Campus Dr, Suite 200, Newport Beach, CA" },
                { icon: "ri-user-line", label: "Ages 18+" },
                { icon: "ri-calendar-line", label: "30–90 Day Programs" },
                { icon: "ri-building-2-line", label: "7 Integrated Buildings" },
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Our Flagship Campus</p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Why Newport Beach is{" "}
                <span className="italic text-terracotta">Ideal for Recovery</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Situated between San Diego to the south and Los Angeles to the north, Newport Beach offers some of the most stunning landscapes in all of California. Reminiscent of the Mediterranean — 42 miles of pristine beaches, natural beauty, and a casually sophisticated coastal vibe — it's a setting purpose-built for healing."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Our Newport Beach campus spans seven integrated buildings in close proximity to the beach and nature preserves. Each space — from gender-specific residential homes to our modern clinical hub — is well-appointed, private, and designed to reduce stress while maximizing focus on recovery."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"Interacting with the outside world is part of treatment here: surf sessions twice per week, trips to Sequoia National Park, grocery outings, and community barbecues. Real life, practiced safely."}</AutoLinkedTextClient>
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { stat: "7", label: "Campus Buildings" },
                  { stat: "42mi", label: "Of Nearby Beaches" },
                  { stat: "38+", label: "Years Experience" },
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
                <Image src={IMAGES.interior} alt="Serene residential room at Northbound's Newport Beach campus — warm, home-like recovery environment" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">Gender-Specific</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-terracotta"><AutoLinkedTextClient>{"Men's & Women's Programs"}</AutoLinkedTextClient></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAMPUS FEATURES ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">The Campus</p>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Life at<br /><span className="italic text-terracotta">Newport Beach</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70">
                <AutoLinkedTextClient>{"Our Newport Beach campus is built around the belief that beautiful environments accelerate healing. Every amenity, every space, every scheduled activity is designed with your recovery in mind."}</AutoLinkedTextClient>
              </p>
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={IMAGES.garden} alt="Peaceful healing garden at Northbound Newport Beach — lavender, stone paths, meditation seating" fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {campusFeatures.map((f) => (
                <div key={f.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/20 text-terracotta mb-3">
                    <i className={`${f.icon} text-lg`}></i>
                  </span>
                  <p className="font-semibold text-white"><AutoLinkedTextClient>{f.label}</AutoLinkedTextClient></p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65"><AutoLinkedTextClient>{f.desc}</AutoLinkedTextClient></p>
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
              <div className="absolute -top-5 -right-5 rounded-2xl bg-terracotta px-5 py-4 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-white">Surfing 2x Per Week</p>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta"><AutoLinkedTextClient>{"The InVivo® Difference"}</AutoLinkedTextClient></p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
                Recovery That <span className="italic text-terracotta">Lives</span> in the Real World
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"At Northbound, recovery isn't confined to four walls. Our InVivo® model puts clients in real-world situations — with clinical support — so the skills they build in treatment translate directly to life after discharge."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>{"In Newport Beach, that means surfing in the Pacific, trips to the grocery store, Sequoia excursions, and community barbecues. These aren't just activities — they're training for a full, sober life."}</AutoLinkedTextClient>
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
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm font-medium text-espresso">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Levels of Care</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">Programs at Newport Beach</h2>
            <p className="mt-4 text-espresso/80"><AutoLinkedTextClient>{"A full continuum from detox through alumni support — all under one clinical team."}</AutoLinkedTextClient></p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.name} className={`rounded-3xl p-8 ${p.highlight ? "bg-navy text-white" : "bg-white ring-1 ring-sand-dark"}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${p.highlight ? "bg-terracotta/20" : "bg-sand"}`}>
                  <i className={`${p.icon} text-xl ${p.highlight ? "text-terracotta" : "text-navy"}`}></i>
                </div>
                <div className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${p.highlight ? "bg-white/10 text-white/80" : "bg-sand text-muted"}`}>
                  {p.duration}
                </div>
                <h3 className={`mt-3 font-heading text-xl font-bold ${p.highlight ? "text-white" : "text-navy"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${p.highlight ? "text-white/75" : "text-espresso/80"}`}><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
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

      {/* ─── INSURANCE ─── */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">Insurance</p>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">We Verify Your Benefits — Free & Confidential</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-espresso/80">
            <AutoLinkedTextClient>{"In-network with 15+ major carriers. Our team handles verification so you can focus on getting help."}</AutoLinkedTextClient>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold text-muted">
            {["Aetna", "Anthem BCBS", "Cigna", "Tricare", "MHN", "Multiplan", "Beacon", "ComPsych", "First Health"].map((ins) => (
              <span key={ins} className="rounded-full bg-white px-4 py-2 ring-1 ring-sand-dark">{ins}</span>
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
        facility="newport"
        locationLabel="Newport Beach"
        eyebrow="Inside the Campus"
        heading="A Closer Look at Newport Beach"
        italicWord="Newport"
        intro="Take a tour through our flagship coastal campus — seven integrated buildings, gender-specific homes, healing gardens, and modern clinical spaces just minutes from the Pacific."
      />

      <CtaBanner
        headline="Start Treatment at Newport Beach"
        body="Our admissions team is available 24/7. We'll verify your insurance, answer your questions, and walk you through every step — no pressure, no cost."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
