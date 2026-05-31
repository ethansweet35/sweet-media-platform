"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { heroContentPad, heroLocationSection } from "@/lib/heroSpacing";
import { ORANGE_COUNTY_IMAGES } from "@/views/home/assets";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const whyChoose = [
  {
    icon: "ri-history-line",
    title: "Decades of Trusted Care in Southern California",
    body: "Northbound was founded in 1988 and has been trusted across Southern California for 38+ years. Roughly one third of our staff are alumni in recovery, so at our rehab center you are met with people who have stood exactly where you stand. More than 10,000 lives have been transformed through our addiction treatment programs.",
  },
  {
    icon: "ri-stethoscope-line",
    title: "Physician-Led Clinical Excellence",
    body: "Our addiction treatment is overseen by a double board-certified Medical Director in Psychiatry and Addiction Medicine. This physician-led model means clinical excellence and medical supervision are woven through every phase of recovery, from withdrawal management to aftercare. That standard is what protects your safety and supports sustainable, lasting recovery.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Accredited and In-Network",
    body: "Northbound is accredited by The Joint Commission, LegitScript certified, and a NAATP member, and is licensed by the California Department of Health Care Services (#300661CP). As an in-network preferred provider with 15+ insurance providers, our treatment facilities remove the financial barriers that keep people from the addiction treatment they deserve.",
  },
];

const programs = [
  {
    icon: "ri-first-aid-kit-line",
    name: "Medically Supervised Detox",
    href: "/programs/detox/",
    desc: "Round-the-clock medical supervision and medication assisted treatment to ease withdrawal safely — the foundation for longer-term addiction treatment.",
  },
  {
    icon: "ri-home-heart-line",
    name: "Residential Treatment Program",
    href: "/programs/residential-treatment-center/",
    desc: "Structured, home-like sanctuary with individual therapy, group therapy, trauma resolution, and Careerbound® and Collegebound® programming.",
  },
  {
    icon: "ri-hospital-line",
    name: "Partial Hospitalization Program (PHP)",
    href: "/programs/partial-hospitalization-program/",
    desc: "Robust daytime clinical programming at our Newport Beach campus — 5 to 6 days per week of structured support.",
  },
  {
    icon: "ri-calendar-schedule-line",
    name: "Intensive Outpatient & Outpatient Rehab",
    href: "/programs/intensive-outpatient-treatment/",
    desc: "Flexible treatment including virtual outpatient (HomeBound) — the same clinical team online for clients balancing school, careers, and home.",
  },
  {
    icon: "ri-heart-line",
    name: "Aftercare Planning & Sober Living Support",
    href: "/programs/aftercare/",
    desc: "Relapse-prevention strategies, alumni meetings, and guidance on sober living to reinforce sustainable recovery in your community.",
  },
];

const therapies = [
  { icon: "ri-brain-line", name: "Cognitive Behavioral Therapy (CBT)", desc: "Identify and reshape unhealthy thought patterns that fuel substance use." },
  { icon: "ri-emotion-line", name: "Dialectical Behavior Therapy (DBT)", desc: "Build emotional regulation, distress tolerance, and mindfulness." },
  { icon: "ri-eye-line", name: "EMDR", desc: "Safely rewire how the brain stores traumatic memories." },
  { icon: "ri-user-heart-line", name: "Individual & Group Therapy", desc: "One-on-one work with master's-level clinicians plus community accountability." },
  { icon: "ri-group-line", name: "Family Therapy", desc: "Rebuild trust, establish healthy boundaries, and heal the family unit." },
];

const mentalHealthConditions = [
  "Anxiety",
  "Depression",
  "Bipolar disorder",
  "PTSD",
  "OCD",
  "ADHD",
  "Other co-occurring mental health conditions",
];

const substances = [
  "Heroin & opioids",
  "Prescription drugs",
  "Cocaine & crack",
  "Methamphetamine",
  "Benzodiazepines",
  "Stimulants",
  "Alcohol",
  "Polysubstance dependency",
];

const faqs = [
  {
    q: "How long do addicts have to stay in rehab?",
    a: "There is no fixed legal requirement. Most addiction treatment programs run 30, 60, or 90 days, and research consistently shows that staying engaged for at least 90 days — across residential and outpatient levels — is associated with better long term recovery outcomes. Northbound personalizes every length of stay to clinical need.",
  },
  {
    q: "How long can a person stay in drug rehab?",
    a: "A person can stay in rehab as long as it is clinically beneficial. Many clients move through the full continuum — detox, a residential program, a partial hospitalization program, and then an outpatient program — over several months, stepping down gradually as they stabilize.",
  },
  {
    q: "How much is it to go to drug rehab?",
    a: "The cost depends on the program and your coverage. With in-network insurance, out-of-pocket costs for addiction treatment are often modest. Our admissions team provides a clear, confidential estimate after a quick benefits check.",
  },
  {
    q: "Where in Orange County is Northbound located?",
    a: "Northbound operates two Orange County, CA campuses: The Grove in Garden Grove for medically supervised care and residential treatment, and our Newport Beach campus for the partial hospitalization program and outpatient care.",
  },
];

const ocCommunities = [
  "Huntington Beach",
  "Irvine",
  "Santa Ana",
  "Anaheim",
  "Costa Mesa",
  "Newport Beach",
  "Fullerton",
  "Mission Viejo",
  "Laguna Beach",
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold leading-snug text-navy">{q}</span>
        <span className={`mt-0.5 shrink-0 text-terracotta transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <i className="ri-add-line text-xl"></i>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-espresso/80">
          <AutoLinkedTextClient>{a}</AutoLinkedTextClient>
        </p>
      )}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  headline,
  italicWord,
  body,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  headline: string;
  italicWord?: string;
  body?: string;
  dark?: boolean;
  center?: boolean;
}) {
  const parts = italicWord ? headline.split(italicWord) : null;
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-terracotta`}>{eyebrow}</p>
      <h2 className={`font-heading text-4xl font-bold md:text-5xl ${dark ? "text-white" : "text-navy"}`}>
        {parts && parts.length === 2 ? (
          <>
            {parts[0]}
            <span className={`italic ${dark ? "text-terracotta-light" : "text-terracotta"}`}>{italicWord}</span>
            {parts[1]}
          </>
        ) : (
          headline
        )}
      </h2>
      {body && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/75" : "text-espresso/80"}`}>
          <AutoLinkedTextClient>{body}</AutoLinkedTextClient>
        </p>
      )}
    </div>
  );
}

export default function OrangeCountyPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className={`${heroLocationSection} bg-navy`}>
        <Image
          src={ORANGE_COUNTY_IMAGES.hero}
          alt="Aerial view of the Orange County California coastline at golden hour — Northbound drug rehab serving Southern California"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

        <div className={`relative z-10 ${CONTAINER} ${heroContentPad}`}>
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="transition hover:text-white/80">
              Home
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/locations/" className="transition hover:text-white/80">
              Locations
            </Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white/70">Orange County, CA</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedTextClient>{"Orange County, California"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Drug Rehab in{" "}
              <span className="italic text-terracotta">Orange County</span>, CA
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              <AutoLinkedTextClient>
                {
                  "For more than 38 years, Northbound Treatment Services has been the drug rehab Orange County families turn to — medically supervised detox, residential treatment, PHP, and outpatient care without leaving Orange County to heal."
                }
              </AutoLinkedTextClient>
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-fill"></i> Call (866) 311-0003
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

      {/* ─── INTRO ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5 text-base leading-relaxed text-espresso/80">
              <p>
                <AutoLinkedTextClient>
                  {
                    "For more than 38 years, Northbound Treatment Services has been the drug rehab Orange County families turn to when drug and alcohol addiction takes hold. Our Orange County drug rehab centers in Garden Grove and Newport Beach deliver the full continuum of addiction treatment — from detox through residential treatment, a partial hospitalization program, outpatient care, and long-term aftercare planning — without anyone having to leave Orange County, CA to heal."
                  }
                </AutoLinkedTextClient>
              </p>
              <p>
                <AutoLinkedTextClient>
                  {
                    "Choosing the right rehab center is one of the most important decisions you will ever make. Orange County addiction treatment should never feel like an assembly line. At Northbound, every treatment program is built around your story, your needs, and a clear path toward lasting recovery. With a 2:1 staff-to-client ratio, evidence based therapies, and a leadership team carrying more than 200 years of combined experience, our treatment center pairs clinical excellence with genuine compassion."
                  }
                </AutoLinkedTextClient>
              </p>
              <p>
                <AutoLinkedTextClient>
                  {
                    "This guide explains how addiction treatment works in Orange County, what each level of care involves, how to pay for it, and how to begin your recovery journey toward a healthier life."
                  }
                </AutoLinkedTextClient>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={ORANGE_COUNTY_IMAGES.intro}
                alt="Calm coastal clinical setting in Orange County — Northbound addiction treatment environment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Why Northbound"
            headline="Why Choose Northbound for Drug Rehab in Orange County"
            italicWord="Orange County"
            center
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whyChoose.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-8 ring-1 ring-sand-dark">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-navy">
                  <i className={`${item.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/80">
                  <AutoLinkedTextClient>{item.body}</AutoLinkedTextClient>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UNDERSTANDING OC TREATMENT ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Addiction Treatment in OC"
            headline="Understanding Addiction Treatment in Orange County"
            italicWord="Orange County"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy">How Many Treatment Centers Are in Orange County?</h3>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>
                  {
                    "Orange County is home to 184 substance use treatment centers, with even more treatment facilities located within 25 miles of its cities, giving residents a wide range of options for addiction treatment. These treatment centers include inpatient rehab, outpatient care, and medically supervised detox, catering to different needs and preferences. Many of these centers use evidence based therapies such as Cognitive Behavioral Therapy and Dialectical Behavior Therapy to support recovery from substance abuse."
                  }
                </AutoLinkedTextClient>
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy">Choosing the Best Rehab for Your Needs</h3>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>
                  {
                    "With so many treatment centers available, finding the right program for your situation comes down to clinical fit. Look for accredited programs that offer a true continuum of care, treat co-occurring mental health disorders alongside drug addiction, and personalize every treatment program. Northbound checks each of those boxes for Orange County addiction treatment, which is why families across the region choose our rehab center."
                  }
                </AutoLinkedTextClient>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAMPUSES ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Our Campuses"
            headline="Our Orange County Drug Rehab Centers"
            italicWord="Orange County"
            body="Your environment shapes your healing. Our Orange County treatment centers are designed as restorative, sun-drenched sanctuaries — close enough to keep you connected to family and work, far enough to focus fully on the recovery journey."
            dark
            center
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Link
              href="/locations/california/garden-grove/"
              className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={ORANGE_COUNTY_IMAGES.groveCampus}
                  alt="The Grove — Northbound's Garden Grove Orange County campus for detox and residential treatment"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-white">The Grove — Garden Grove</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  <AutoLinkedTextClient>
                    {
                      "Nestled in the heart of Orange County, CA, The Grove is our hub for detox, residential treatment, and virtual outpatient care. The campus features a 24/7 medical detox wing, a fitness center, and expansive recreation grounds that support a healthy lifestyle throughout the recovery process."
                    }
                  </AutoLinkedTextClient>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                  Tour Garden Grove <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </Link>

            <Link
              href="/locations/california/newport-beach/"
              className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={ORANGE_COUNTY_IMAGES.newportCampus}
                  alt="Northbound's Newport Beach Orange County campus — partial hospitalization program near the Pacific coast"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-white">The Newport Beach Campus</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  <AutoLinkedTextClient>
                    {
                      "Located just steps from the coastline, our Newport Beach campus is home to Northbound's partial hospitalization program. This calm, coastal setting offers ocean-view meditation spaces — a supportive environment where clients transition from intensive care toward independence."
                    }
                  </AutoLinkedTextClient>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                  Tour Newport Beach <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-heading text-xl font-bold text-white">Orange County Communities We Serve</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              <AutoLinkedTextClient>
                {
                  "While our treatment facilities sit in Garden Grove and Newport Beach, we serve clients from across Orange County, CA, including Huntington Beach, Irvine, Santa Ana, Anaheim, and Costa Mesa. Wherever in Orange County you call home, we can help you begin treatment quickly."
                }
              </AutoLinkedTextClient>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {ocCommunities.map((city) => (
                <span key={city} className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Levels of Care"
            headline="Our Addiction Treatment Programs and Levels of Care"
            body="Recovery is a journey through decreasing levels of structure. Northbound offers every step of that continuum, and these treatment options let clients transition smoothly between levels as their needs change. The same trusted team stays beside you the whole way."
            center
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="rounded-3xl bg-white p-8 ring-1 ring-sand-dark transition hover:ring-terracotta/30"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-navy">
                  <i className={`${p.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/80">
                  <AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient>
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracotta">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DUAL DIAGNOSIS ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Dual Diagnosis"
            headline="Dual Diagnosis Treatment for Co-Occurring Disorders"
            body="Drug and alcohol addiction rarely travels alone. Our dual diagnosis treatment addresses substance use disorders and co-occurring mental health disorders at the same time, because treating one without the other simply postpones relapse. Integrated mental health treatment is woven through every treatment program we offer."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl bg-sand p-8">
              <h3 className="font-heading text-xl font-bold text-navy">Mental Health Disorders We Treat</h3>
              <p className="mt-3 text-sm text-espresso/80">
                <AutoLinkedTextClient>
                  Our psychiatric professionals treat anxiety, depression, bipolar disorder, PTSD, OCD, ADHD, and other
                  mental health conditions alongside addiction. Treating co-occurring mental health conditions concurrently
                  resolves the underlying trauma that often drives substance use.
                </AutoLinkedTextClient>
              </p>
              <ul className="mt-5 grid gap-2">
                {mentalHealthConditions.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-espresso">
                    <i className="ri-check-line text-terracotta"></i>
                    {c}
                  </li>
                ))}
              </ul>
              <Link href="/treatment/dual-diagnosis/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline">
                Dual diagnosis programs <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div className="rounded-3xl bg-sand p-8">
              <h3 className="font-heading text-xl font-bold text-navy">Substance Use Disorders We Treat</h3>
              <p className="mt-3 text-sm text-espresso/80">
                <AutoLinkedTextClient>
                  Northbound provides alcohol rehab and substance abuse treatment for alcohol, substance, and polysubstance
                  dependency — including heroin and opioids, prescription drugs, cocaine, methamphetamine, benzodiazepines,
                  and stimulants. Our alcohol addiction treatment and broader substance abuse care use proven protocols to
                  manage withdrawal and address the behavioral roots of drug addiction and substance use disorders.
                </AutoLinkedTextClient>
              </p>
              <ul className="mt-5 grid gap-2">
                {substances.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-espresso">
                    <i className="ri-check-line text-terracotta"></i>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THERAPIES ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Clinical Care"
            headline="Evidence-Based Therapies at Our Treatment Center"
            body="Healing is not a guessing game. Northbound combines rigorously researched, evidence based therapies into a custom blueprint for each client, and this evidence based treatment is the engine of sustainable recovery."
            dark
            center
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {therapies.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/20 text-terracotta">
                  <i className={`${t.icon} text-lg`}></i>
                </span>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  <AutoLinkedTextClient>{t.desc}</AutoLinkedTextClient>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOLISTIC ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Whole-Person Healing"
                headline="Holistic and Experiential Therapy"
                body="Because no two paths are identical, Northbound integrates holistic and experiential approaches that reconnect mind, body, and spirit and support personal growth alongside clinical care."
              />
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy">Surf Therapy and Coastal Adventure Programming</h3>
                  <p className="mt-3 text-sm leading-relaxed text-espresso/80">
                    <AutoLinkedTextClient>
                      {
                        "Southern California's coastline has made experiential approaches like surf therapy a meaningful part of Orange County recovery culture. Northbound channels that ethos through adventure therapy and coastal outdoor programming near the ocean — the same restorative connection to nature that surf therapy is known for, allowing clients to rebuild confidence and resilience in a supportive environment."
                      }
                    </AutoLinkedTextClient>
                  </p>
                  <Link href="/adventure-therapy-program/" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline">
                    Adventure therapy <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy">Signature Holistic Services</h3>
                  <p className="mt-3 text-sm leading-relaxed text-espresso/80">
                    <AutoLinkedTextClient>
                      Our signature services include wolf-assisted therapy, a spiritual track with breathwork and
                      meditation, art therapy, and sound-bath healing — holistic tools that regulate the nervous system and
                      reinforce a healthier life in recovery.
                    </AutoLinkedTextClient>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link href="/wolf-assisted-therapy/" className="text-sm font-semibold text-terracotta hover:underline">
                      Wolf therapy
                    </Link>
                    <Link href="/spiritual-track/" className="text-sm font-semibold text-terracotta hover:underline">
                      Spiritual track
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={ORANGE_COUNTY_IMAGES.holistic}
                alt="Coastal experiential recovery programming in Orange County — outdoor healing near the Pacific"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DETOX EXPLAINED ─── */}
      <section className="bg-sand py-16 lg:py-20">
        <div className={`${CONTAINER} max-w-4xl`}>
          <SectionHeading
            eyebrow="Detox"
            headline="The Detox and Withdrawal Management Process Explained"
            center
          />
          <p className="mt-6 text-center text-base leading-relaxed text-espresso/80">
            <AutoLinkedTextClient>
              Withdrawal management is the supervised foundation of most addiction treatment, and it begins with a
              thorough assessment of each client&apos;s history and health. During detox, our clinical team monitors vital signs
              around the clock and uses medication assisted treatment to ease symptoms. Because the detox process can carry
              real medical risk, this medical supervision protects clients and prepares them for the deeper therapeutic work
              ahead in a residential program or partial hospitalization program.
            </AutoLinkedTextClient>
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/programs/detox/"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Medically Supervised Detox <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INSURANCE ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow="Insurance & Cost"
            headline="Paying for Addiction Treatment in Orange County"
            italicWord="Orange County"
            center
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-10">
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy">Does Insurance Cover Rehab?</h3>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>
                  Many Orange County treatment centers accept health insurance plans covering both inpatient and outpatient
                  drug and alcohol treatment. In Orange County, 160 substance use treatment centers accept private health
                  insurance, while 8 accept Medicare and 21 accept Medicaid. Coverage varies by provider and plan, which
                  affects what services are covered.
                </AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>
                  Northbound is an in-network preferred provider with 15+ insurance providers including Aetna, Anthem, Blue
                  Cross Blue Shield, Cigna, ComPsych, Beacon Health, First Health, MHN, and TriCare. Our admissions team
                  verifies your benefits for free and confidentially. TriCare coverage also extends our alcohol rehab and drug
                  treatment to veterans and military personnel.
                </AutoLinkedTextClient>
              </p>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-navy">How Much Is Drug Rehab in California?</h3>
              <p className="mt-4 text-sm leading-relaxed text-espresso/80">
                <AutoLinkedTextClient>
                  The cost of a drug rehab in California varies widely based on the level of care, length of stay, and
                  amenities. A medically supervised detox and a residential program cost more than outpatient care because
                  they include 24/7 care and housing. For most clients, the real question is not the sticker price — it is
                  what their insurance covers. Because Northbound is in-network with most major insurance providers, many
                  clients pay only a fraction of the cost out of pocket. Verifying your benefits is the fastest way to learn
                  exactly how much it is to go to rehab for your situation.
                </AutoLinkedTextClient>
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-semibold text-muted">
            {["Aetna", "Anthem BCBS", "Cigna", "Tricare", "MHN", "Beacon", "ComPsych", "First Health"].map((ins) => (
              <span key={ins} className="rounded-full bg-sand px-4 py-2 ring-1 ring-sand-dark">
                {ins}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Verify My Insurance
            </Link>
            <Link href="tel:8663110003" className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/50">
              <i className="ri-phone-line"></i> (866) 311-0003
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="FAQ"
            headline="Frequently Asked Questions About Orange County Addiction Treatment"
            italicWord="Orange County"
            center
          />
          <div className="mt-10 divide-y divide-[#E5E7EB] rounded-3xl bg-white px-8 ring-1 ring-sand-dark">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-navy py-16">
        <div className={`${CONTAINER} max-w-3xl text-center`}>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Start Your Recovery Journey Today</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            <AutoLinkedTextClient>
              Help is available 24/7, and your call is completely confidential. Whether you need detox, a residential
              treatment program, alcohol rehab, or flexible outpatient care, Northbound will help you find the right addiction
              treatment and begin your recovery journey toward a healthier, substance-free life free from alcohol and drug
              addiction, with the tools for lasting recovery.
            </AutoLinkedTextClient>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="tel:8663110003"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill"></i> Call (866) 311-0003
            </Link>
            <Link
              href="/insurance/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Verify Insurance Online
            </Link>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-white/50">
            Northbound Treatment Services is licensed by the California State Department of Health Care Services (License
            #300661CP) and accredited by The Joint Commission. If you are experiencing a medical emergency or crisis, call
            988 or 911. This page is for informational purposes and is not a substitute for professional medical advice.
          </p>
        </div>
      </section>

      <CtaBanner
        headline="Drug Rehab in Orange County — We're Here 24/7"
        body="Speak with our admissions team, verify insurance at no cost, and take the first step toward treatment at The Grove or our Newport Beach campus."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
      />
    </>
  );
}
