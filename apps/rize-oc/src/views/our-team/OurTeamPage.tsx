"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const WP = "https://rizeoc.com/wp-content/uploads";

/* ─── Team data ──────────────────────────────────────────────────────────── */

type Department = "Leadership" | "Clinical" | "Admissions" | "Operations";

interface TeamMember {
  name: string;
  title: string;
  department: Department;
  photo: string;
  bio?: string;
}

const team: TeamMember[] = [
  /* ── Leadership ─────────────────────────────────────────────────────── */
  {
    name: "Levi Sweet",
    title: "COO",
    department: "Leadership",
    photo: `${WP}/2026/04/Screenshot-2026-04-28-at-1.13.24-PM.png`,
  },
  {
    name: "Chandra Medina",
    title: "Clinical Director, LMFT",
    department: "Leadership",
    photo: `${WP}/2025/07/Chandra.png`,
    bio: "Chandra is passionate about helping individuals overcome their deepest battles and break the self-destructive cycles that come with mental health struggles and addiction. She brings over 10 years in the mental health and SUD treatment field, specializing in trauma, addiction, and brain health. Her approach includes inner child work, DBT skills coaching, neuroscience-based interventions, and CBT.",
  },
  {
    name: "Karynne Witkin",
    title: "Director of Community Outreach",
    department: "Leadership",
    photo: `${WP}/2024/04/karynne-rize.png`,
    bio: "Karynne has worked in the behavioral healthcare field for over six years. A Florida State University alumna and master's degree candidate at Harvard Extension School in I/O Psychology, she comes from a family with personal experience of addiction and is driven to help individuals find the treatment that best fits their needs.",
  },
  {
    name: "Robert Howey",
    title: "Director of Operations",
    department: "Leadership",
    photo: `${WP}/2026/04/IMG_2432-scaled-e1777407330821.jpg`,
  },
  {
    name: "Patrick Smith",
    title: "Program Director",
    department: "Leadership",
    photo: `${WP}/2026/04/IMG_2444-scaled-e1775666120932.jpg`,
  },

  /* ── Clinical ───────────────────────────────────────────────────────── */
  {
    name: "Annalise Poe",
    title: "Lead Therapist, LMFT",
    department: "Clinical",
    photo: `${WP}/2026/04/IMG_2451-scaled-e1775665226303.jpg`,
  },
  {
    name: "Kate Hendrix",
    title: "Therapist, MS, LMFT",
    department: "Clinical",
    photo: `${WP}/2023/08/Kate-Hendrix.jpg`,
    bio: "Kate is a trauma-informed therapist who works from an integrative approach. She specializes in helping individuals develop greater confidence and overcome experiences of anxiety, self-doubt, and trauma — often working with students, professionals, and ambitious individuals seeking to unlock their fullest potential.",
  },
  {
    name: "Taylor Ramsey",
    title: "Therapist, MS, LMFT",
    department: "Clinical",
    photo: `${WP}/2023/08/Taylor-Ramsey.jpg`,
    bio: "Taylor works from an integrative, humanistic approach — utilizing a nonjudgmental and empathetic stance. Trained in multiple trauma-informed modalities, she specializes in trauma survivors, interpersonal relationship issues, anxiety disorders, and substance misuse.",
  },
  {
    name: "Helen Riccobono",
    title: "Therapist, LMFT",
    department: "Clinical",
    photo: `${WP}/2025/07/Helen.png`,
  },
  {
    name: "Cat Shaw (Schueler)",
    title: "Therapist, MS, LMFT",
    department: "Clinical",
    photo: `${WP}/2023/08/cat.jpg`,
    bio: "Cat is a Licensed Marriage and Family Therapist with over 10 years of group facilitation experience. She leads process-oriented groups at Rize OC covering healthy communication, boundaries, codependency, values, CBT, DBT, self-esteem, and relationships.",
  },
  {
    name: "Tina Sammadi",
    title: "Therapist, MS, LMFT",
    department: "Clinical",
    photo: `${WP}/2023/08/Tina-Sammadi.jpg`,
    bio: "Tina is a licensed therapist with over a decade of experience in addiction, substance abuse, and mood disorders. She draws from multiple theoretical frameworks to create a safe, non-judgmental space — helping clients uncover unhealthy patterns, work through unresolved trauma, and build skills for lasting emotional wellbeing.",
  },
  {
    name: "Christine Little",
    title: "Therapist, AMFT",
    department: "Clinical",
    photo: `${WP}/2026/04/IMG_2461-scaled-e1777407425555.jpg`,
  },
  {
    name: "Wesley Tameifona",
    title: "Therapist, AMFT",
    department: "Clinical",
    photo: `${WP}/2026/04/IMG_2498-scaled-e1777407441659.jpg`,
  },

  /* ── Admissions ─────────────────────────────────────────────────────── */
  {
    name: "Brandon Payne",
    title: "Director of Admissions",
    department: "Admissions",
    photo: `${WP}/2025/07/Brandon.png`,
  },
  {
    name: "Gino Buffardi",
    title: "Admissions Coordinator",
    department: "Admissions",
    photo: `${WP}/2026/04/IMG_2486-scaled-e1777407373703.jpg`,
  },
  {
    name: "Shawna Phillips",
    title: "Admissions",
    department: "Admissions",
    photo: `${WP}/2026/04/IMG_2473-scaled-e1775666685187.jpg`,
  },
  {
    name: "Marisa Clifton",
    title: "Admissions Specialist",
    department: "Admissions",
    photo: `${WP}/2024/05/Untitled-design-42.png`,
  },

  /* ── Operations ─────────────────────────────────────────────────────── */
  {
    name: "Christopher Elliott",
    title: "Operations Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2443-scaled-e1775667084919.jpg`,
  },
  {
    name: "James Dorsey",
    title: "Virtual Operations Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2494-scaled-e1777407354915.jpg`,
  },
  {
    name: "Ashley Becker",
    title: "Human Resources",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2448-scaled-e1775666762241.jpg`,
  },
  {
    name: "Sable Rivera",
    title: "Lead Case Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2470-scaled-e1777407389362.jpg`,
  },
  {
    name: "Chris Williams",
    title: "Case Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2436-scaled-e1775665807682.jpg`,
  },
  {
    name: "Louis Odom",
    title: "Case Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2491-scaled-e1775667052554.jpg`,
  },
  {
    name: "Sara Higgins",
    title: "Case Manager",
    department: "Operations",
    photo: `${WP}/2026/04/IMG_2467-scaled-e1777407403820.jpg`,
  },
];

const departments: Department[] = ["Leadership", "Clinical", "Admissions", "Operations"];

const deptMeta: Record<Department, { icon: string; desc: string }> = {
  Leadership:  { icon: "ri-award-line",          desc: "Executive and clinical leadership driving the Rize OC vision." },
  Clinical:    { icon: "ri-mental-health-line",   desc: "Licensed therapists and clinicians delivering evidence-based care." },
  Admissions:  { icon: "ri-phone-line",           desc: "Our compassionate intake team — your first point of contact." },
  Operations:  { icon: "ri-settings-3-line",      desc: "The team behind seamless day-to-day care coordination." },
};

/* ─── Member portrait ─────────────────────────────────────────────────────── */

function MemberPortrait({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Circle photo */}
      <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden ring-4 ring-[#EBEBEB] bg-[#F2F2F2] shrink-0 transition-shadow duration-300 group-hover:ring-accent/40 group-hover:shadow-lg">
        <Image
          src={member.photo}
          alt={`${member.name} — ${member.title} at Rize OC`}
          fill
          className="object-cover object-top"
          sizes="160px"
        />
      </div>

      {/* Name + title */}
      <h3 className="mt-4 text-[15px] font-semibold text-ink leading-snug">{member.name}</h3>
      <p className="mt-0.5 text-[12px] font-medium text-ink/45 leading-snug"><AutoLinkedTextClient>{member.title}</AutoLinkedTextClient></p>

    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function OurTeamPage() {
  const [activeDept, setActiveDept] = useState<Department | "All">("All");

  const filtered = activeDept === "All"
    ? team
    : team.filter((m) => m.department === activeDept);

  return (
    <main className="min-h-screen">

      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">Home</Link>
            <span className="text-white/25 text-xs">/</span>
            <Link href="/about" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">About Rize</Link>
            <span className="text-white/25 text-xs">/</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">Our Team</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <div>
              <Eyebrow colorClass="text-accent">The People Behind the Care</Eyebrow>
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
                style={{ fontSize: "clamp(44px, 5vw, 78px)", lineHeight: 0.95 }}
              >
                Meet the
                <br />
                <em className="italic text-white/55">Rize OC Team</em>
              </h1>
              <p className="mt-6 text-[16px] font-light leading-relaxed text-white/75 max-w-[480px]">
                <AutoLinkedTextClient>{"Our team of board-certified physicians, licensed therapists, and recovery specialists share one commitment: helping every client build a life worth living."}</AutoLinkedTextClient>
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="tel:9494612620" variant="accent" size="md">
                  <i className="ri-phone-line mr-2 text-sm" /> (949) 461-2620
                </Button>
                <Button href="/admissions" variant="outline-white" size="md">
                  Start Admissions
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/8 border border-white/8 overflow-hidden">
              {[
                { value: `${team.length}+`,  label: "Team Members" },
                { value: "3:1",              label: "Client-to-Staff Ratio" },
                { value: "10+",              label: "Licensed Clinicians" },
                { value: "24/7",             label: "Care & Support" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-ink px-8 py-8 text-center">
                  <p
                    className="font-[family-name:var(--font-display)] font-normal text-white"
                    style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1 }}
                  ><AutoLinkedTextClient>{value}</AutoLinkedTextClient></p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"><AutoLinkedTextClient>{label}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ②  Department tabs + portrait grid ───────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-14">
            {(["All", ...departments] as const).map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] border transition-colors ${
                  activeDept === dept
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink/60 border-[#E8E8E8] hover:border-ink/30 hover:text-ink"
                }`}
              >
                {dept === "All" ? `All Team (${team.length})` : `${dept} (${team.filter(m => m.department === dept).length})`}
              </button>
            ))}
          </div>

          {/* Department header when filtered */}
          {activeDept !== "All" && (
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-[#EBEBEB]">
              <i className={`${deptMeta[activeDept].icon} text-accent text-2xl`} />
              <div>
                <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-ink leading-none"><AutoLinkedTextClient>{activeDept}</AutoLinkedTextClient></p>
                <p className="text-[13px] font-light text-ink/55 mt-1">{deptMeta[activeDept].desc}</p>
              </div>
            </div>
          )}

          {/* Portrait grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-6 gap-y-12">
            {filtered.map((member) => (
              <MemberPortrait key={member.name} member={member} />
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ③  Join the team ────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[80px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <div>
              <Eyebrow colorClass="text-accent">Join Rize OC</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.08 }}
              >
                Careers in
                <br />
                <em className="italic text-muted font-normal">Behavioral Healthcare</em>
              </h2>
              <p className="mt-5 text-[15px] font-light text-ink/65 leading-relaxed">
                <AutoLinkedTextClient>{"Rize OC is always looking for exceptional clinicians, counselors, and support staff who share our commitment to evidence-based, compassionate care. If you are passionate about the work of recovery, we would love to hear from you."}</AutoLinkedTextClient>
              </p>
              <div className="mt-7">
                <Button href="tel:9494612620" variant="accent" size="sm">
                  <i className="ri-mail-send-line mr-2 text-xs" /> Contact Our HR Team
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "ri-stethoscope-line",  title: "Licensed Therapists",    desc: "LMFT, LCSW, MFT, and AMFT positions in IOP and PHP settings." },
                { icon: "ri-nurse-line",         title: "Medical Staff",          desc: "Nursing, MAT coordination, and medical support roles." },
                { icon: "ri-customer-service-2-line", title: "Admissions",       desc: "Compassionate intake coordinators and outreach specialists." },
                { icon: "ri-settings-3-line",    title: "Operations",             desc: "Case management, administration, and support services." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3 p-5 border border-soft bg-cream-tile">
                  <i className={`${icon} text-accent text-xl`} />
                  <div>
                    <p className="text-[13px] font-semibold text-ink"><AutoLinkedTextClient>{title}</AutoLinkedTextClient></p>
                    <p className="text-[12px] font-light text-ink/55 mt-1 leading-relaxed"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
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
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">Ready to Meet the Team?</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05, maxWidth: "640px" }}
          >
            Your Recovery Team Is
            <br />
            <em className="italic text-white/60">Waiting to Meet You</em>
          </h2>
          <p className="mt-6 text-[15px] font-light text-white/65 max-w-lg mx-auto leading-relaxed">
            <AutoLinkedTextClient>{"Speak with our admissions team today — free, confidential, and with no obligation."}</AutoLinkedTextClient>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <Button href="/admissions" variant="outline-white" size="lg">
              Start Admissions
            </Button>
          </div>
        </SectionWrapper>
      </section>

    </main>
  );
}
