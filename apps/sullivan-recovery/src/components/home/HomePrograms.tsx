"use client";

import Image from "next/image";
import LandingOptionalLink from "@/components/landing/LandingOptionalLink";

const BASE = "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images";

const PROGRAMS = [
  {
    img: `${BASE}/sr_prog_detox_v2.jpg`,
    num: "01",
    title: "Medical Detox",
    desc: "24/7 monitored detox with medication support to safely clear substances while managing withdrawal with compassion.",
    href: "/programs/detox/",
  },
  {
    img: `${BASE}/sr_prog_residential.jpg`,
    num: "02",
    title: "Residential Treatment",
    desc: "Round-the-clock care within a private, home-like setting — structured support from morning to night.",
    href: "/programs/residential-treatment/",
  },
  {
    img: `${BASE}/sr_prog_therapy.jpg`,
    num: "03",
    title: "Addiction Therapy",
    desc: "CBT, DBT, motivational therapy, and group sessions led by licensed clinicians who understand the path.",
    href: "/programs/therapies/",
  },
  {
    img: `${BASE}/sr_prog_dual.jpg`,
    num: "04",
    title: "Dual Diagnosis",
    desc: "Simultaneous treatment for co-occurring mental health disorders and substance use — because they're inseparable.",
    href: "/programs/personalized-care/",
  },
  {
    img: `${BASE}/sr_prog_aftercare.jpg`,
    num: "05",
    title: "Aftercare",
    desc: "A long-term plan built around your life — support groups, continued therapy, and a community to lean on.",
    href: "/programs/aftercare/",
  },
];

export default function HomePrograms() {
  return (
    <section className="bg-[var(--sr-moss)] py-[100px]">
      <div className="sr-container">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Programs
            </p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Every step of <br />
              <span className="italic text-[var(--sr-sage)]">the journey</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end md:pb-2">
            <p
              className="max-w-xs text-sm leading-relaxed text-white/60 md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              From medically supervised detox to long-term aftercare —
              we walk alongside you at every stage of recovery.
            </p>
            <LandingOptionalLink
              href="/programs/"
              className="inline-flex items-center gap-2 border border-[var(--sr-sage)]/40 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white/5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              View All Programs
              <i className="ri-arrow-right-line" />
            </LandingOptionalLink>
          </div>
        </div>

        {/* Mosaic grid: wide hero card on top, 4 equal cards below */}
        <div className="flex flex-col gap-3">

          {/* Row 1: full-width hero card */}
          <LandingOptionalLink href={PROGRAMS[0].href} className="group relative w-full overflow-hidden" style={{ minHeight: 380 }}>
            <Image src={PROGRAMS[0].img} alt={PROGRAMS[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--sr-charcoal)]/80 via-[var(--sr-charcoal)]/30 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-between">
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >{PROGRAMS[0].num}</span>
              <div className="max-w-lg">
                <h3
                  className="mb-3 text-[clamp(2rem,4vw,3.25rem)] font-light leading-tight text-white"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >{PROGRAMS[0].title}</h3>
                <p
                  className="text-sm leading-relaxed text-white/70"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >{PROGRAMS[0].desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-sage)] transition-colors duration-200 group-hover:text-white"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Learn More <i className="ri-arrow-right-line" />
                </div>
              </div>
            </div>
          </LandingOptionalLink>

          {/* Row 2: 4 equal cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.slice(1).map((prog) => (
              <LandingOptionalLink key={prog.num} href={prog.href} className="group relative overflow-hidden" style={{ minHeight: 300 }}>
                <Image src={prog.img} alt={prog.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/90 via-[var(--sr-charcoal)]/20 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >{prog.num}</span>
                  <div>
                    <h3
                      className="mb-2 text-2xl font-light text-white"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >{prog.title}</h3>
                    <p
                      className="text-xs leading-relaxed text-white/65 line-clamp-3"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >{prog.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-sage)] group-hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Learn More <i className="ri-arrow-right-line text-xs" />
                    </div>
                  </div>
                </div>
              </LandingOptionalLink>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
