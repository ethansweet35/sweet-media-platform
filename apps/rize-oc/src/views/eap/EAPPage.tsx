"use client";

import Image from "next/image";
import Link from "next/link";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_STANDARD_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import {
  CinematicHeroGrid,
  HERO_COPY_BLOCK,
  HERO_LEAD,
} from "@/components/ui/PageHeroShell";
import { cn } from "@/lib/cn";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import InsuranceForm from "@/views/home/components/InsuranceForm";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const howItWorks = [
  {
    step: "01",
    icon: "ri-customer-service-2-line",
    title: "Employee Contacts EAP",
    desc: "The employee reaches out to their company's EAP provider — often a toll-free line or online portal — for an initial assessment and referral. This step is separate from Rize and completely confidential from the employer.",
  },
  {
    step: "02",
    icon: "ri-file-list-3-line",
    title: "EAP Issues a Referral",
    desc: "The EAP counselor conducts a brief clinical screen and issues an authorization or referral to a treatment provider. Rize OC is recognized by most major EAP networks.",
  },
  {
    step: "03",
    icon: "ri-phone-line",
    title: "Rize OC Admissions Connects",
    desc: "Once a referral is received — or when an employee calls Rize directly — our admissions team coordinates with the EAP, verifies all benefits, and handles the paperwork. The employee focuses on one thing: getting well.",
  },
  {
    step: "04",
    icon: "ri-shield-check-line",
    title: "Treatment Begins",
    desc: "The employee enters the appropriate level of care — detox, PHP, IOP, or outpatient — with full EAP and insurance coordination in place. Clinical updates go to the EAP only with written consent.",
  },
];

const employerBenefits = [
  {
    icon: "ri-bar-chart-line",
    title: "Reduced Absenteeism",
    desc: "Untreated addiction and mental health disorders are among the leading drivers of missed work days. Treatment that works reduces that burden at the organizational level.",
  },
  {
    icon: "ri-shield-star-line",
    title: "Liability Protection",
    desc: "Employers who provide access to EAP-connected treatment programs demonstrate duty of care — reducing exposure in workplace incident and safety contexts.",
  },
  {
    icon: "ri-team-line",
    title: "Workforce Retention",
    desc: "Employees who successfully complete treatment and return to work show significantly higher long-term tenure. Recovery-supported employees become loyal, high-performing team members.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Healthier Culture",
    desc: "Organizations that actively support employee wellbeing see measurable improvements in morale, engagement, and peer culture — benefits that extend well beyond the individual in treatment.",
  },
];

const employeeRights = [
  "Your employer is never told you contacted an EAP for substance use or mental health treatment.",
  "Your participation in treatment is protected by HIPAA and cannot be shared without your explicit written consent.",
  "EAP sessions and referrals are typically free of charge to the employee, regardless of insurance status.",
  "Job protection may be available under the Family and Medical Leave Act (FMLA) for qualifying employees seeking treatment.",
  "Your participation in an EAP is voluntary — there is no obligation to continue past the initial assessment.",
];

const eapNetworks = [
  "Aetna Resources for Living",
  "Cigna EAP",
  "Optum / UHC EAP",
  "Magellan Health",
  "ComPsych GuidanceResources",
  "Anthem EAP",
  "Spring Health",
  "Lyra Health",
  "LifeWorks (Morneau Shepell)",
  "First Stop Health",
];

const faqs = [
  {
    q: "Does my employer know if I use my EAP for addiction treatment?",
    a: "No. EAP usage is completely confidential. Your employer receives only aggregate, anonymized utilization data — never individual names or reasons for contact. Rize OC additionally protects all client information under HIPAA and 42 CFR Part 2, which provides special federal protections for substance use disorder records.",
  },
  {
    q: "How many EAP sessions does my plan cover for treatment?",
    a: "Most EAPs cover a limited number of short-term counseling sessions (typically 3–8). For addiction treatment — which typically requires a longer clinical episode — the EAP will issue a referral to a treatment program like Rize OC, where your regular health insurance takes over. Our team verifies both your EAP and insurance benefits simultaneously.",
  },
  {
    q: "Can I use my EAP if I don't have other health insurance?",
    a: "Possibly, depending on your employer's EAP plan. Many EAPs can fund a short course of treatment directly, or connect you to community and state resources. Our admissions team can help navigate what's available regardless of your insurance situation.",
  },
  {
    q: "What if my employer referred me to treatment — am I required to go?",
    a: "In many cases, a supervisor or HR may suggest — but not require — that an employee seek treatment. In some safety-sensitive roles, a formal Substance Abuse Professional (SAP) evaluation may be required by federal regulation. Our admissions team is experienced in SAP-referred cases and can guide you through the process.",
  },
  {
    q: "Is my job protected while I'm in treatment?",
    a: "Employees who qualify under the Family and Medical Leave Act (FMLA) may be eligible for up to 12 weeks of job-protected unpaid leave for addiction treatment. Additionally, the Americans with Disabilities Act (ADA) may provide protections for employees in recovery. We recommend consulting with your HR department or an employment attorney for specifics.",
  },
  {
    q: "Does Rize OC work directly with HR departments or EAP coordinators?",
    a: "Yes. With the employee's written consent, our clinical team can coordinate with EAP case managers and HR on return-to-work plans, fitness-for-duty assessments, and aftercare compliance monitoring. We are experienced in both voluntary and employer-referred treatment situations.",
  },
];

export default function EAPPage() {
  return (
    <main className="min-h-screen">

      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        minHeight="min-h-[75vh]"
        contentClassName="justify-start"
        media={
          <>
            <Image
          src={`${BASE}/eap_hero01.jpg`}
          alt="A compassionate EAP counselor meeting with an employee in a warm, professional office setting"
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
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors">
              Home
            </Link>
            <span className="text-white/25 text-xs">/</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">Employee Assistance Programs</span>
          </div>

          <div className={HERO_COPY_BLOCK}>
            <Eyebrow colorClass="text-accent">For Employees &amp; Employers</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(44px, 5.5vw, 82px)", lineHeight: 0.95 }}
            >
              Employee Assistance
              <br />
              <em className="italic text-white/55">Programs (EAPs)</em>
            </h1>
            <p className={cn(HERO_LEAD, "mb-10")}>
              <AutoLinkedTextClient>{"Your EAP benefit may cover addiction and mental health treatment at Rize OC — with complete confidentiality from your employer. Our team handles all coordination at no cost to you."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="tel:9494612620" variant="accent" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> Call (949) 461-2620
              </Button>
              <a
                href="#eap-form"
                className="inline-flex items-center border border-white/30 text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
              >
                Check My Benefits
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { icon: "ri-lock-line",           text: "Employer Never Notified" },
              { icon: "ri-shield-check-line",   text: "HIPAA + 42 CFR Part 2" },
              { icon: "ri-time-line",           text: "Same-Day Coordination" },
              { icon: "ri-checkbox-circle-line",text: "Most EAPs Accepted" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </CinematicHeroGrid>
      </CinematicHeroSection>

      {/* ②  What Is an EAP ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow colorClass="text-accent">Understanding Your Benefit</Eyebrow>
                <h2
                  className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                  style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.08 }}
                >
                  What Is an EAP —
                  <br />
                  <em className="italic text-muted font-normal">And What Does It Cover?</em>
                </h2>
              </div>
              <p className="text-[15px] leading-[1.85] text-ink/70">
                <AutoLinkedTextClient>{"An Employee Assistance Program (EAP) is a confidential benefit offered by most mid-to-large employers that provides employees and their families with access to mental health counseling, substance use treatment referrals, financial and legal consultation, and other support services — at little or no cost to the employee."}</AutoLinkedTextClient>
              </p>
              <p className="text-[15px] leading-[1.85] text-ink/70">
                <AutoLinkedTextClient>{"EAPs are administered by third-party organizations, completely independent of your employer. Your company pays for the benefit but receives no information about how individual employees use it. What you share with your EAP counselor stays with your EAP counselor."}</AutoLinkedTextClient>
              </p>
              <p className="text-[15px] leading-[1.85] text-ink/70">
                <AutoLinkedTextClient>{"For addiction and mental health treatment, EAPs typically fund an initial assessment and short-term counseling, then coordinate a referral to a treatment provider — like Rize OC — where your health insurance takes over. Rize works directly with your EAP case manager to make this transition seamless."}</AutoLinkedTextClient>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "ri-mental-health-line",   title: "Mental Health Counseling",   desc: "Short-term therapy for anxiety, depression, stress, grief, and relationship challenges." },
                { icon: "ri-goblet-line",           title: "Substance Use Referrals",    desc: "Clinical assessment and referral to inpatient or outpatient treatment programs." },
                { icon: "ri-parent-line",           title: "Family Support",             desc: "Coverage often extends to dependents — spouses and children of enrolled employees." },
                { icon: "ri-scales-3-line",           title: "Financial & Legal Aid",   desc: "Many EAPs include consultations with financial advisors and legal professionals." },
                { icon: "ri-suitcase-line",          title: "Work-Life Services",         desc: "Childcare referrals, eldercare resources, and wellness program coordination." },
                { icon: "ri-24-hours-line",         title: "Crisis Intervention",        desc: "24/7 crisis hotlines and emergency mental health support for acute situations." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3 p-5 border border-soft bg-cream-tile">
                  <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-9 h-9 text-base" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink leading-snug"><AutoLinkedTextClient>{title}</AutoLinkedTextClient></p>
                    <p className="text-[12px] font-light text-ink/55 mt-1 leading-relaxed"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ③  How It Works ─────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden py-[100px]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <Eyebrow colorClass="text-accent">The Process</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
              style={{ fontSize: "clamp(28px, 3.2vw, 46px)", lineHeight: 1.05 }}
            >
              How EAP Treatment Works
              <br />
              <em className="italic text-white/55">Step by Step</em>
            </h2>
            <p className="mt-5 text-[15px] font-light text-white/70 leading-relaxed">
              <AutoLinkedTextClient>{"We coordinate with your EAP from first call to first day of treatment — so you don't have to navigate the system alone."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/8 overflow-hidden">
            {howItWorks.map(({ step, icon, title, desc }) => (
              <div key={step} className="bg-ink px-8 py-10 flex flex-col gap-5 relative">
                <span
                  className="absolute top-6 right-6 font-[family-name:var(--font-display)] font-normal text-white/5 select-none pointer-events-none"
                  style={{ fontSize: "clamp(60px, 6vw, 88px)", lineHeight: 1 }}
                  aria-hidden
                >
                  {step}
                </span>
                <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-11 h-11 text-xl relative z-10" />
                <div className="relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-2">Step {step}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white mb-3 leading-snug">{title}</h3>
                  <p className="text-[13px] font-light text-white/65 leading-relaxed"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-4 flex-1">
              <i className="ri-information-line text-accent text-xl shrink-0 mt-0.5" />
              <p className="text-[14px] font-light text-white/70 leading-relaxed">
                <span className="text-white font-medium">Don&apos;t have an EAP referral yet?</span>{" "}
                You can also contact Rize directly. We will help determine whether your EAP or health insurance — or both — can be used, and handle all coordination on your behalf.
              </p>
            </div>
            <a
              href="tel:9494612620"
              className="shrink-0 flex items-center gap-2 text-accent text-[11px] font-medium uppercase tracking-[0.2em] whitespace-nowrap hover:gap-3 transition-all"
            >
              <i className="ri-phone-line" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ④  Employee Rights ──────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">

            <div>
              <Eyebrow colorClass="text-accent">Know Your Rights</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.08 }}
              >
                Your Privacy Is
                <br />
                <em className="italic text-muted font-normal">Protected By Law</em>
              </h2>
              <p className="mt-5 text-[15px] font-light text-ink/65 leading-relaxed mb-8">
                <AutoLinkedTextClient>{"Many employees hesitate to use their EAP benefit out of fear that their employer will find out. Understanding your legal protections can make the difference between getting help and suffering in silence."}</AutoLinkedTextClient>
              </p>
              <ul className="flex flex-col gap-4">
                {employeeRights.map((right, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <p className="text-[14px] font-light text-ink/70 leading-relaxed"><AutoLinkedTextClient>{right}</AutoLinkedTextClient></p>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <Eyebrow colorClass="text-ink/45">For HR &amp; Employers</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4 mb-6"
                style={{ fontSize: "clamp(24px, 2.5vw, 36px)", lineHeight: 1.1 }}
              >
                Why Employers Partner
                <br />
                <em className="italic text-muted font-normal">With Rize OC</em>
              </h2>
              <div className="flex flex-col gap-4">
                {employerBenefits.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 bg-white border border-soft p-5">
                    <IconCircle icon={icon} colorClass="bg-accent/10 text-accent" size="w-9 h-9 text-base shrink-0" />
                    <div>
                      <p className="text-[14px] font-semibold text-ink"><AutoLinkedTextClient>{title}</AutoLinkedTextClient></p>
                      <p className="text-[13px] font-light text-ink/60 mt-1 leading-relaxed"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-ink p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-2"><AutoLinkedTextClient>{"HR & EAP Coordinators"}</AutoLinkedTextClient></p>
                <p className="text-[14px] font-light text-white/75 leading-relaxed mb-4">
                  <AutoLinkedTextClient>{"Rize OC works directly with EAP case managers and HR on referrals, return-to-work plans, and compliance monitoring — with employee consent."}</AutoLinkedTextClient>
                </p>
                <a
                  href="tel:9494612620"
                  className="inline-flex items-center gap-2 text-accent text-[11px] font-medium uppercase tracking-[0.2em] hover:gap-3 transition-all"
                >
                  <i className="ri-phone-line" /> Contact Our EAP Liaison
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  EAP Networks ─────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[80px]">
          <div className="text-center mb-10">
            <Eyebrow colorClass="text-ink/45">EAP Networks</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
              style={{ fontSize: "clamp(24px, 2.8vw, 38px)", lineHeight: 1.08 }}
            >
              EAP Providers We Work With
            </h2>
            <p className="mt-4 text-[14px] font-light text-ink/55 max-w-xl mx-auto">
              <AutoLinkedTextClient>{"Rize OC coordinates with all major EAP networks. Don't see yours? Contact us — we work with most providers."}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {eapNetworks.map((name) => (
              <div key={name} className="border border-soft bg-cream-tile px-4 py-4 text-center">
                <i className="ri-building-line text-accent text-lg mb-2 block" />
                <p className="text-[12px] font-medium text-ink leading-snug"><AutoLinkedTextClient>{name}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Verify / Contact Form ────────────────────────────────────────── */}
      <section id="eap-form" className="bg-cream-alt scroll-mt-24">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-start">
            <div className="px-0 lg:pr-16 pb-10 lg:pb-0">
              <Eyebrow colorClass="text-accent" className="mb-4">Get Started Today</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
                style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.08 }}
              >
                We Handle the
                <br />
                <em className="italic text-muted font-normal">EAP Coordination For You</em>
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
                <AutoLinkedTextClient>{"Submit the form and our admissions team will contact your EAP provider, verify your insurance benefits, and walk you through exactly what is covered — completely free, and with no obligation to continue."}</AutoLinkedTextClient>
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "ri-customer-service-2-line", title: "We call your EAP",          desc: "Our team contacts your EAP provider directly and coordinates the referral" },
                  { icon: "ri-shield-check-line",       title: "Benefits verified same day", desc: "We confirm both EAP and insurance coverage within hours" },
                  { icon: "ri-calendar-check-line",     title: "Same-day admission possible", desc: "When criteria are met, treatment can begin the same day" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <IconCircle icon={icon} colorClass="bg-accent/15 text-accent" size="w-8 h-8 text-sm shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-ink"><AutoLinkedTextClient>{title}</AutoLinkedTextClient></p>
                      <p className="text-[13px] font-light text-ink/55 mt-0.5"><AutoLinkedTextClient>{desc}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10">
              <div className="flex items-center gap-3 mb-6">
                <IconCircle icon="ri-briefcase-4-line" variant="ink" size="sm" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink"><AutoLinkedTextClient>{"EAP & Insurance Verification"}</AutoLinkedTextClient></p>
                  <p className="text-xs text-ink/45 mt-0.5"><AutoLinkedTextClient>{"Confidential · No cost · No obligation"}</AutoLinkedTextClient></p>
                </div>
              </div>
              <InsuranceForm showNotesField />
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper py="py-[100px]">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16 xl:gap-24">
            <div className="lg:sticky lg:top-28 self-start">
              <Eyebrow colorClass="text-accent">Common Questions</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink mt-4"
                style={{ fontSize: "clamp(24px, 2.6vw, 38px)", lineHeight: 1.1 }}
              >
                EAP Questions,
                <br />
                <em className="italic text-muted">Answered Clearly.</em>
              </h2>
              <p className="mt-5 text-[14px] font-light text-ink/60 leading-relaxed">
                <AutoLinkedTextClient>{"Still unsure about your EAP benefit? Our admissions team answers these questions every day — call anytime."}</AutoLinkedTextClient>
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <Button href="tel:9494612620" variant="accent" size="sm">
                  <i className="ri-phone-line mr-2 text-xs" /> (949) 461-2620
                </Button>
                <Button href="/verify-insurance" variant="outline-ink" size="sm">
                  Verify My Insurance <i className="ri-arrow-right-line ml-2 text-xs" />
                </Button>
              </div>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  Accreditations ──────────────────────────────────────────────── */}
      <AccreditationsBar />

      {/* ⑨  CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[100px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 text-center">
          <Eyebrow colorClass="text-accent">Your EAP Benefit Is Waiting</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mx-auto"
            style={{ fontSize: "clamp(30px, 4vw, 58px)", lineHeight: 1.05, maxWidth: "680px" }}
          >
            You May Already Have
            <br />
            <em className="italic text-white/60">Coverage You Don&apos;t Know About</em>
          </h2>
          <p className="mt-6 text-[16px] font-light text-white/75 leading-relaxed max-w-[500px] mx-auto">
            <AutoLinkedTextClient>{"Most employees never use their EAP benefit — often because they don't know it exists. One call to our team is all it takes to find out what you have."}</AutoLinkedTextClient>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
            <a
              href="#eap-form"
              className="inline-flex items-center border border-white/30 text-white px-10 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              Verify My Benefits
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: "ri-lock-line",           text: "Employer Never Notified" },
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
