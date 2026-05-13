"use client";

import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const cities = [
  {
    name: "Irvine",
    slug: "irvine",
    image: "irvine_hero01.jpg",
    imageAlt: "Aerial view of Irvine California with palm-lined boulevards and mountains",
    driveTime: "~15 min",
    description:
      "Orange County's tech and professional hub. Flexible IOP and outpatient programs designed around demanding careers.",
    highlights: ["Tech & professional community", "Flexible scheduling", "Virtual IOP available"],
  },
  {
    name: "Santa Ana",
    slug: "santa-ana",
    image: "santa-ana_hero01.jpg",
    imageAlt: "Downtown Santa Ana California at golden hour",
    driveTime: "~10 min",
    description:
      "The heart of Orange County. Compassionate, culturally sensitive care for the county's most diverse community.",
    highlights: ["Bilingual admissions support", "All insurance types welcomed", "Same-day assessments"],
  },
  {
    name: "Laguna Beach",
    slug: "laguna-beach",
    image: "laguna-beach_hero01.jpg",
    imageAlt: "Dramatic coastal cliffs and turquoise ocean in Laguna Beach California",
    driveTime: "~20 min",
    description:
      "An affluent coastal community where discretion matters. Premium, confidential care for high-functioning individuals.",
    highlights: ["Complete confidentiality", "High-functioning professionals", "Alcohol & prescription misuse"],
  },
  {
    name: "Lake Forest",
    slug: "lake-forest",
    image: "lake-forest_hero01.jpg",
    imageAlt: "South OC suburban neighborhood with Saddleback Mountains backdrop",
    driveTime: "~20 min",
    description:
      "South OC's family-centered community. Treatment built around family stability and continuity of care.",
    highlights: ["Family integration programs", "Full continuum of care", "South OC proximity"],
  },
  {
    name: "Mission Viejo",
    slug: "mission-viejo",
    image: "mission-viejo_hero01.jpg",
    imageAlt: "Lake Mission Viejo with peaceful suburban neighborhoods and mountains",
    driveTime: "~25 min",
    description:
      "One of California's safest planned communities. Private, family-inclusive care that respects community ties.",
    highlights: ["Family-first approach", "Private admissions", "Step-down aftercare"],
  },
  {
    name: "Costa Mesa",
    slug: "costa-mesa",
    image: "costa-mesa_hero01.jpg",
    imageAlt: "Aerial golden-hour view of Costa Mesa California near Newport Beach",
    driveTime: "~10 min",
    description:
      "Minutes from Newport Beach. Fast admissions, flexible programs, and dual-diagnosis care for a dynamic community.",
    highlights: ["Closest to Newport Beach", "Stimulant & alcohol specialists", "Same-day admission possible"],
  },
];

const reasons = [
  { icon: "ri-award-line",          title: "Joint Commission Accredited",   desc: "Gold-standard clinical accreditation across all programs and all locations." },
  { icon: "ri-stethoscope-line",    title: "Physician-Led Care",            desc: "Board-certified addiction medicine physicians lead every client's treatment plan." },
  { icon: "ri-shield-check-line",   title: "Insurance Verified Same Day",   desc: "We contact your insurer directly and confirm your benefits within hours — free." },
  { icon: "ri-map-pin-2-line",      title: "Central OC Location",           desc: "One facility, serving all of Orange County — within 25 minutes of every city listed." },
  { icon: "ri-user-heart-line",     title: "Individualized Treatment",      desc: "No standard protocols. Every plan is built from a full biopsychosocial assessment." },
  { icon: "ri-time-line",           title: "24/7 Admissions",               desc: "Our team answers every call, every hour — same-day admissions frequently available." },
];

export default function ServiceAreasHubPage() {
  return (
    <main className="min-h-screen">

      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[72vh] flex flex-col justify-end">
        <Image
          src={`${BASE}/service-areas-hub_hero01.jpg`}
          alt="Aerial panoramic view of Orange County California coastline and inland communities at sunset"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,48,46,0.40) 0%, rgba(44,48,46,0.18) 30%, rgba(44,48,46,0.60) 65%, rgba(44,48,46,0.97) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 lg:px-10 pb-20 pt-40">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-white/25 text-xs">/</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">Service Areas</span>
          </div>

          <div className="max-w-[700px]">
            <Eyebrow colorClass="text-accent">Orange County, California</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(44px, 5.5vw, 80px)", lineHeight: 0.95 }}
            >
              Serving All of
              <br />
              <em className="italic text-white/55">Orange County</em>
            </h1>
            <p className="text-[16px] font-light leading-relaxed text-white/80 max-w-[520px] mb-10">
              Rize OC provides premium addiction and mental health treatment to communities across Orange County — one facility, one exceptional standard of care, within 25 minutes of everywhere listed below.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="tel:9494612620" variant="accent" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> Call (949) 461-2620
              </Button>
              <Button href="/verify-insurance" variant="outline-white" size="md">
                Verify My Insurance
              </Button>
            </div>
          </div>

          {/* City count strip */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
            {[
              { icon: "ri-map-pin-2-line",     text: "6 Communities Served" },
              { icon: "ri-time-line",           text: "Within 25 Minutes" },
              { icon: "ri-shield-check-line",   text: "Most PPOs Accepted" },
              { icon: "ri-lock-line",           text: "100% Confidential" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ②  City Cards Grid ──────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper py="py-[100px]">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <Eyebrow colorClass="text-ink/45">Service Areas</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
              style={{ fontSize: "clamp(28px, 3.2vw, 46px)", lineHeight: 1.08 }}
            >
              Find Treatment Near You
            </h2>
            <p className="mt-4 text-[15px] font-light text-ink/60 leading-relaxed">
              Select your city below to see programs, insurance information, and answers to questions specific to your community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map(({ name, slug, image, imageAlt, driveTime, description, highlights }) => (
              <Link
                key={slug}
                href={`/service-areas/${slug}`}
                className="group bg-white border border-warm overflow-hidden flex flex-col hover:border-accent/30 hover:shadow-md transition-all"
              >
                {/* City image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`${BASE}/${image}`}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(44,48,46,0.7) 0%, transparent 60%)" }}
                  />
                  <div className="absolute bottom-4 left-5 flex items-end justify-between w-[calc(100%-2.5rem)]">
                    <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-white leading-none">
                      {name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent bg-ink/60 px-2.5 py-1 backdrop-blur-sm">
                      {driveTime}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[14px] font-light text-ink/65 leading-relaxed mb-5">{description}</p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5">
                        <i className="ri-check-line text-accent text-sm shrink-0" />
                        <span className="text-[12px] font-medium text-ink/70">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-warm flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">Orange County, CA</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent flex items-center gap-1.5 group-hover:gap-3 transition-all">
                      View Page <i className="ri-arrow-right-line" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Don't see your city */}
          <div className="mt-12 bg-white border border-warm p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <IconCircle icon="ri-map-pin-add-line" colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-lg shrink-0" />
              <div>
                <p className="font-semibold text-ink text-[15px]">Don&apos;t see your city?</p>
                <p className="text-[14px] font-light text-ink/60 mt-1 leading-relaxed">
                  Rize OC serves patients from across all of Orange County and beyond. If your city isn&apos;t listed, we still welcome your call — our admissions team serves the entire region.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Button href="tel:9494612620" variant="accent" size="sm">
                <i className="ri-phone-line mr-2 text-xs" /> (949) 461-2620
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Why One Facility Serves All of OC ───────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

            {/* Left — narrative */}
            <div>
              <Eyebrow colorClass="text-accent">One Standard. Every Community.</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.08 }}
              >
                Why Orange County
                <br />
                <em className="italic text-muted font-normal">Chooses Rize OC</em>
              </h2>
              <div className="mt-6 flex flex-col gap-5">
                <p className="text-[15px] leading-[1.85] text-ink/70">
                  Rize OC is a single, centrally located Orange County facility — which means every client, regardless of which city they come from, receives the same Joint Commission–accredited, physician-led level of care.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink/70">
                  We do not operate satellite locations with reduced staffing. We do not offer different program quality based on geography. Every client who walks through our doors receives the full clinical team, the full continuum of care, and the full Rize experience.
                </p>
                <p className="text-[15px] leading-[1.85] text-ink/70">
                  From Irvine to Laguna Beach, Santa Ana to Mission Viejo — the standard does not change.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/about" variant="accent" size="sm">
                  About Rize OC <i className="ri-arrow-right-line ml-2 text-xs" />
                </Button>
              </div>
            </div>

            {/* Right — reasons grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3 p-5 border border-soft bg-cream-tile">
                  <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-9 h-9 text-base" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink leading-snug">{title}</p>
                    <p className="text-[12px] font-light text-ink/55 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Accreditations ──────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑤  CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Serving All of Orange County</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.05, maxWidth: "680px" }}
          >
            Recovery Starts With
            <br />
            <em className="italic text-white/60">A Single Conversation</em>
          </h2>
          <p className="mt-6 text-[15px] font-light text-white/65 max-w-lg mx-auto leading-relaxed">
            Wherever you are in Orange County — our admissions team is available 24 hours a day for a free, confidential conversation. No pressure. No obligation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <Button href="/verify-insurance" variant="outline-white" size="lg">
              Verify My Insurance
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Same-Day Admissions", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

    </main>
  );
}
