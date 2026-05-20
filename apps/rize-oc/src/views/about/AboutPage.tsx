"use client";

import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_STANDARD_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import {
  CinematicHeroGrid,
  HERO_COPY_BLOCK,
  HERO_LEAD,
  PAGE_GRID,
} from "@/components/ui/PageHeroShell";
import { cn } from "@/lib/cn";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const missionPillars = [
  {
    numeral: "I",
    icon: "ri-brain-line",
    title: "Mind",
    body:
      "Evidence-based psychotherapy, psychiatric care, and trauma processing — EMDR, CBT, DBT — delivered by clinicians who treat the root causes of addiction and mental health challenges, not just the symptoms.",
  },
  {
    numeral: "II",
    icon: "ri-heart-pulse-line",
    title: "Body",
    body:
      "Medical detox, medication-assisted treatment, and physician-supervised withdrawal protocols that prioritize safety, comfort, and neurological restoration — the physical foundation every lasting recovery is built on.",
  },
  {
    numeral: "III",
    icon: "ri-seedling-line",
    title: "Spirit",
    body:
      "Somatic therapy, mindfulness, art and movement practices, and the grounding power of California's coastal environment — restoration that reaches the dimensions of healing no clinical protocol alone can fully address.",
  },
];

const stats = [
  { value: "2010", label: "Year Founded" },
  { value: "1,400+", label: "Lives Transformed" },
  { value: "98%", label: "Client Satisfaction Score" },
  { value: "24/7", label: "Medical Coverage" },
];

const differentiators = [
  {
    icon: "ri-award-line",
    title: "Premium, Evidence-Based Care",
    body:
      "We refuse the false trade-off between luxury and clinical rigor. Rize delivers Joint Commission–accredited, evidence-based treatment in an environment of genuine comfort and dignity.",
  },
  {
    icon: "ri-stethoscope-line",
    title: "Physician-Led Medical Team",
    body:
      "Our board-certified addiction medicine physicians lead every treatment plan. Dual diagnosis, complex withdrawal, and co-occurring conditions are managed by specialists — not delegated to junior staff.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Individualized Treatment",
    body:
      "There is no standard protocol here. Every client receives a personalized clinical plan built from a comprehensive biopsychosocial assessment — updated dynamically as their recovery evolves.",
  },
  {
    icon: "ri-map-pin-2-line",
    title: "California Coastal Setting",
    body:
      "Our Orange County location offers more than a beautiful backdrop. Research consistently shows that natural environments, sunlight, and proximity to nature meaningfully improve treatment outcomes.",
  },
  {
    icon: "ri-team-line",
    title: "Continuity of Care",
    body:
      "We design treatment that does not end at discharge. Aftercare planning, alumni networks, and long-term support structures are built into every client's experience from day one.",
  },
];

const leadershipRoles = [
  {
    icon: "ri-stethoscope-line",
    role: "Medical Director",
    description: "Board-certified addiction medicine physician with 20+ years clinical practice.",
  },
  {
    icon: "ri-mental-health-line",
    role: "Clinical Director",
    description: "Licensed psychologist specializing in trauma, EMDR, and dual-diagnosis care.",
  },
  {
    icon: "ri-leaf-line",
    role: "Holistic Programming Lead",
    description: "Certified in somatic therapy, yoga, and art-based therapeutic modalities.",
  },
  {
    icon: "ri-parent-line",
    role: "Family Services Director",
    description: "Dedicated family systems specialist guiding loved ones throughout the recovery journey.",
  },
];

/* ─────────────────────────────────────────────────── Component ─────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">

      {/* ①  Hero — Full-Bleed Cinematic ─────────────────────────────────── */}
      <CinematicHeroSection
        minHeight="min-h-[90vh]"
        contentClassName="justify-start"
        media={
          <>
            <Image
              src={`${BASE}/about_hero01.jpg`}
              alt="Premium Rize OC treatment facility in Orange County California surrounded by California coastal landscaping"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  CINEMATIC_STANDARD_HERO_GRADIENT,
              }}
            />
          </>
        }
      >
        <CinematicHeroGrid>
          <div className={HERO_COPY_BLOCK}>
            <Eyebrow colorClass="text-accent">About Rize Recovery</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(52px, 6vw, 96px)", lineHeight: 0.93 }}
            >
              Where Healing<br />
              <em className="italic text-white/60">Happens.</em>
            </h1>
            <p className={cn(HERO_LEAD, "text-[17px] text-white/85 mb-10")}>
              <AutoLinkedTextClient>{"Orange County's premier destination for evidence-based addiction and mental health treatment — where cutting-edge clinical care meets the serenity of California's coast."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/admissions" variant="accent" size="md">
                Start Your Journey
              </Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949) 461-2620
              </Button>
            </div>
          </div>

          {/* Stat strip anchored at bottom-right */}
          <div className="mt-14 grid w-full grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 lg:max-w-[52rem] lg:ml-auto">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-ink/60 px-6 py-5 backdrop-blur-sm text-center">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-white"
                  style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
                ><AutoLinkedTextClient>{value}</AutoLinkedTextClient></p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65"><AutoLinkedTextClient>{label}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </CinematicHeroGrid>
      </CinematicHeroSection>

      {/* ②  Founding Story ───────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-white" py="py-[100px]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">

          {/* Left — pull-quote + image */}
          <div className="flex flex-col gap-10">
            <div className="border-l-2 border-accent pl-8">
              <p
                className="font-[family-name:var(--font-display)] font-normal text-ink leading-snug"
                style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}
              >
                <AutoLinkedTextClient>{"\"A place where cutting-edge medical care meets the serenity of California's coast.\""}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <AutoLinkedTextClient>{"— Rize Recovery Founders"}</AutoLinkedTextClient>
              </p>
            </div>

            <div className="relative h-[420px] lg:h-[520px] overflow-hidden">
              <Image
                src={`${BASE}/about_therapy01.jpg`}
                alt="Warm sunlit therapy room interior at Rize OC treatment center overlooking a private garden"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Corner accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: "linear-gradient(to top, rgba(44,48,46,0.6), transparent)" }}
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  <AutoLinkedTextClient>{"Our Orange County Facility"}</AutoLinkedTextClient>
                </p>
              </div>
            </div>
          </div>

          {/* Right — narrative */}
          <div className="flex flex-col justify-center gap-7 lg:pt-4">
            <div>
              <Eyebrow colorClass="text-accent">Our Story</Eyebrow>
              <SectionHeader as="h2" className="mt-3">
                Founded on a Gap<br />
                <span className="font-normal italic text-muted">Worth Closing</span>
              </SectionHeader>
            </div>

            <p className="text-[15px] leading-[1.85] text-ink/70">
              <AutoLinkedTextClient>{"Rize Recovery was founded by a team of addiction medicine specialists and recovery advocates who recognized a critical gap in the treatment landscape: the absence of truly premium, evidence-based care that treats the whole person — mind, body, and spirit."}</AutoLinkedTextClient>
            </p>
            <p className="text-[15px] leading-[1.85] text-ink/70">
              <AutoLinkedTextClient>{"Our founders drew from their own experiences in recovery and decades of clinical practice to create a treatment center that would offer more than traditional rehab. They envisioned a place where cutting-edge medical care meets the serenity of California's coast, where evidence-based therapies are delivered in an environment of genuine luxury and respect."}</AutoLinkedTextClient>
            </p>
            <p className="text-[15px] leading-[1.85] text-ink/70">
              <AutoLinkedTextClient>{"Located in Orange County, California, Rize opened its doors with a singular mission: to provide treatment that honors the dignity of every individual while delivering measurable, lasting results. We understand that seeking help is an act of courage — and we've created an environment where that courage is met with compassion, expertise, and unwavering support."}</AutoLinkedTextClient>
            </p>
            <p className="text-[15px] leading-[1.85] text-ink/70">
              Today, Rize stands as Orange County&apos;s premier destination for individuals and families seeking transformative recovery care — a place where healing happens not despite luxury, but <em>because of it</em>.
            </p>

            <div className="mt-2">
              <Button href="/admissions" variant="accent" size="sm">
                Begin Your Recovery <i className="ri-arrow-right-line ml-2 text-xs" />
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ③  Mission Pillars — ink bg ────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <Eyebrow colorClass="text-accent">Our Philosophy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
              style={{ fontSize: "clamp(34px, 3.6vw, 56px)", lineHeight: 1.05 }}
            >
              Treating the Whole Person —
              <br />
              <em className="italic text-white/60">Mind, Body &amp; Spirit</em>
            </h2>
            <p className="mt-5 text-[15px] font-light text-white/75 leading-relaxed">
              <AutoLinkedTextClient>{"Recovery is not a single event. It is the cumulative restoration of every dimension of a human life. Our clinical model is built around this truth."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/8 overflow-hidden">
            {missionPillars.map(({ numeral, icon, title, body }) => (
              <div key={title} className="bg-ink px-10 py-12 flex flex-col gap-6 relative">
                {/* Large background numeral */}
                <span
                  className="absolute top-6 right-8 font-[family-name:var(--font-display)] font-normal text-white/5 select-none pointer-events-none"
                  style={{ fontSize: "clamp(80px, 8vw, 120px)", lineHeight: 1 }}
                  aria-hidden
                >
                  {numeral}
                </span>
                <div className="flex items-center gap-4 relative z-10">
                  <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-12 h-12 text-xl" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">{title}</span>
                </div>
                <p className="text-[15px] font-light leading-[1.8] text-white/80 relative z-10"><AutoLinkedTextClient>{body}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④  The Rize Difference ─────────────────────────────────────────── */}
      <SectionWrapper bg="bg-[#F8F4ED]" py="py-[100px]">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Eyebrow colorClass="text-accent">Why Rize</Eyebrow>
          <SectionHeader as="h2" className="mt-3">
            What Sets Us Apart
          </SectionHeader>
          <p className="mt-5 text-[15px] text-ink/65 leading-relaxed">
            <AutoLinkedTextClient>{"Many treatment centers claim to offer premium care. Rize is one of the few that can demonstrate it at every level of the clinical experience."}</AutoLinkedTextClient>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map(({ icon, title, body }, idx) => (
            <div
              key={title}
              className={`flex flex-col gap-5 p-8 border border-warm/20 bg-white ${
                idx === differentiators.length - 1 && differentiators.length % 3 === 2
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-10 h-10 text-lg shrink-0" />
                <h3 className="font-semibold text-ink text-[15px] leading-tight mt-2">{title}</h3>
              </div>
              <p className="text-[14px] text-ink/65 leading-relaxed"><AutoLinkedTextClient>{body}</AutoLinkedTextClient></p>
            </div>
          ))}
          {/* Sixth cell — CTA card */}
          <div
            className="flex flex-col justify-between p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--color-ink) 0%, #3a3f3c 100%)",
            }}
          >
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-accent/10" />
            <div className="relative z-10 flex flex-col gap-5 h-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Verify Coverage</p>
              <p
                className="font-[family-name:var(--font-display)] font-normal text-white leading-tight"
                style={{ fontSize: "clamp(22px, 2vw, 30px)" }}
              >
                <AutoLinkedTextClient>{"Most Insurance Plans Accepted"}</AutoLinkedTextClient>
              </p>
              <p className="text-[13px] font-light text-white/75 leading-relaxed">
                <AutoLinkedTextClient>{"Our admissions team verifies your benefits within hours. Same-day assessments available."}</AutoLinkedTextClient>
              </p>
              <div className="mt-auto">
                <Button href="/admissions" variant="accent" size="sm">
                  Verify Benefits <i className="ri-arrow-right-line ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ⑤  Clinical Leadership ─────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(196,137,90,0.07)_0%,transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

            {/* Left — narrative intro */}
            <div>
              <Eyebrow colorClass="text-accent">Our Team</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
                style={{ fontSize: "clamp(32px, 3.4vw, 52px)", lineHeight: 1.08 }}
              >
                Clinicians Who&apos;ve<br />
                <em className="italic text-white/60">Lived the Work</em>
              </h2>
              <p className="mt-6 text-[15px] font-light text-white/80 leading-[1.85]">
                <AutoLinkedTextClient>{"Our clinical team is led by board-certified addiction medicine physicians, licensed psychologists, and certified therapists who bring both deep expertise and lived understanding to the work of recovery."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 text-[15px] font-light text-white/80 leading-[1.85]">
                <AutoLinkedTextClient>{"Many of our staff members are themselves in long-term recovery — they bring an irreplaceable dimension of human understanding to every client interaction. This is not just a job for our team. It is a calling."}</AutoLinkedTextClient>
              </p>
              <div className="mt-8">
                <Button href="/admissions" variant="outline-white" size="sm">
                  Meet Our Team <i className="ri-arrow-right-line ml-2 text-xs" />
                </Button>
              </div>
            </div>

            {/* Right — leadership role cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {leadershipRoles.map(({ icon, role, description }) => (
                <div
                  key={role}
                  className="flex flex-col gap-4 p-6 border border-white/8 bg-white/5"
                >
                  <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-10 h-10 text-lg" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent"><AutoLinkedTextClient>{role}</AutoLinkedTextClient></p>
                    <p className="mt-2 text-[13px] font-light text-white/75 leading-relaxed"><AutoLinkedTextClient>{description}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⑥  Accreditations strip ────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑦  CTA Banner ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[100px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 text-center">
          <Eyebrow colorClass="text-accent">Take the First Step</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mx-auto"
            style={{ fontSize: "clamp(36px, 4vw, 64px)", lineHeight: 1.05, maxWidth: "700px" }}
          >
            Your Recovery Begins
            <br />
              <em className="italic text-white/65">With a Single Call</em>
            </h2>
            <p className="mt-6 text-[16px] font-light text-white/80 leading-relaxed max-w-[500px] mx-auto">
            <AutoLinkedTextClient>{"Speak confidentially with our admissions team — no commitment required. We answer every call, every hour of the day."}</AutoLinkedTextClient>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/admissions" variant="accent" size="lg">
              Start Admissions Process
            </Button>
            <Button href="tel:9494612620" variant="outline-white" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: "ri-lock-line",           text: "100% Confidential" },
              { icon: "ri-time-line",           text: "Same-Day Response" },
              { icon: "ri-shield-check-line",   text: "No Obligation" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
