'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#C8795A';

const included = [
  { icon: 'ri-user-heart-line', label: 'Individual Therapy', desc: '1× per week with your licensed therapist' },
  { icon: 'ri-group-line', label: 'Group Therapy', desc: '3× per week in a women-only cohort' },
  { icon: 'ri-medicine-bottle-line', label: 'Psychiatric Check-Ins', desc: 'Medication management and monitoring' },
  { icon: 'ri-scales-3-line', label: 'DBT Skills Groups', desc: 'Emotional regulation, distress tolerance, interpersonal effectiveness' },
  { icon: 'ri-seedling-line', label: 'Holistic Wellness Sessions', desc: 'Mindfulness, somatic work, and movement' },
  { icon: 'ri-shield-check-line', label: 'Relapse Prevention Planning', desc: 'Personalized safety and recovery planning' },
  { icon: 'ri-phone-line', label: 'Between-Session Support', desc: 'On-call crisis and check-in access' },
  { icon: 'ri-community-line', label: 'Alumni Community Access', desc: 'Ongoing peer connection post-graduation' },
];

const weekStructure = [
  {
    day: 'Monday',
    color: ACCENT,
    sessions: ['Group Therapy — DBT Skills (90 min)', 'Individual Therapy (50 min, alternating weeks)'],
  },
  {
    day: 'Wednesday',
    color: '#DDA15E',
    sessions: ['Group Therapy — Process Group (90 min)', 'Holistic Wellness Session (60 min)'],
  },
  {
    day: 'Friday',
    color: '#8FA489',
    sessions: ['Group Therapy — Psychoeducation (90 min)', 'Psychiatric Check-In (as scheduled)'],
  },
];

const carePillars = [
  {
    icon: 'ri-computer-line',
    title: 'Fully Virtual & HIPAA-Secure',
    desc: 'All sessions take place on a secure, HIPAA-compliant platform. No commute, no waiting room, no one in your community needs to know. Just you, your therapist, and your group.',
  },
  {
    icon: 'ri-group-line',
    title: 'Women-Only Cohorts',
    desc: 'Every group session is women-only. The depth of honesty, connection, and safety that emerges in a women-only space consistently accelerates recovery in ways mixed groups cannot replicate.',
  },
  {
    icon: 'ri-links-line',
    title: 'Dual-Diagnosis Capable',
    desc: 'We treat mental health conditions and substance use together — never as separate problems. Co-occurring depression, anxiety, trauma, and eating disorders are fully integrated into your IOP plan.',
  },
  {
    icon: 'ri-brain-line',
    title: 'Evidence-Based Modalities',
    desc: 'DBT, CBT, EMDR, ACT, and somatic experiencing are all available within the IOP program — selected based on your specific clinical presentation and goals.',
  },
];

const journey = [
  {
    step: '01',
    label: 'Free Clinical Assessment',
    desc: 'A licensed clinician listens to your full story — your history, current symptoms, and what matters most to you. We establish the right level of care and match you with the right clinical team.',
  },
  {
    step: '02',
    label: 'Insurance Verification',
    desc: 'We verify your benefits and walk you through your coverage before you commit to anything. Most insurance plans cover IOP — and many women pay very little out of pocket.',
  },
  {
    step: '03',
    label: 'Onboarding & Tech Setup',
    desc: 'We walk you through the secure platform, introduce you to your therapist and group, and make sure you feel comfortable before day one. No technical experience needed.',
  },
  {
    step: '04',
    label: 'Week One: Orientation',
    desc: 'Your first week is focused on settling in, building trust with your cohort, and establishing your personal treatment goals. There is no pressure to move faster than your body allows.',
  },
  {
    step: '05',
    label: 'Active Treatment Phase',
    desc: 'Over 6–12 weeks, you engage in individual therapy, group sessions, and skills programming — with your plan adjusted throughout based on your progress and evolving needs.',
  },
  {
    step: '06',
    label: 'Step-Down & Alumni Support',
    desc: 'As IOP ends, we transition you to outpatient or alumni programming so your recovery has continuity. Graduation from IOP is a beginning, not an ending.',
  },
];

const therapies = [
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Cognitive Behavioral Therapy (CBT)', icon: 'ri-brain-line' },
  { name: 'EMDR', icon: 'ri-eye-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Motivational Interviewing', icon: 'ri-compass-3-line' },
  { name: 'Group Process Therapy', icon: 'ri-group-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
];

const faqs = [
  {
    q: 'What exactly happens during a virtual IOP session?',
    a: 'Sessions are live and interactive — not pre-recorded. Group therapy sessions bring together 6–10 women in a facilitated virtual room, where you engage in skills training, processing, and peer support led by a licensed therapist. Individual sessions are private one-on-one conversations with your assigned clinician.',
  },
  {
    q: 'Is virtual IOP as effective as attending in person?',
    a: 'Yes. A growing body of research shows virtual IOP produces outcomes equivalent to in-person programs across a range of diagnoses. For many women, the reduced barriers — no commute, no childcare logistics, privacy at home — actually improve attendance and engagement, which directly correlates with better outcomes.',
  },
  {
    q: 'What if I can\'t make a scheduled session?',
    a: 'We understand that life happens. Our clinical team works with you on scheduling flexibility when possible, and we have make-up protocols for occasional missed sessions. Consistent attendance is important for progress, and your therapist will help you navigate any barriers to showing up.',
  },
  {
    q: 'How long does virtual IOP typically last?',
    a: 'Most women complete IOP in 6–12 weeks, depending on clinical progress, the complexity of their diagnosis, and their personal goals. Some women benefit from extending their time in IOP; others step down to outpatient sooner. Your care plan is never one-size-fits-all.',
  },
  {
    q: 'Can I continue working while in virtual IOP?',
    a: 'Yes — and that is often the point. Many women in our IOP continue working full-time or part-time. We offer morning, afternoon, and evening session slots designed around women\'s schedules. A free assessment will help us find a schedule that works for your life.',
  },
  {
    q: 'What happens after I complete IOP?',
    a: 'Completing IOP is a milestone, not the finish line. Most women transition to our standard outpatient program, which provides continued individual therapy, monthly groups, and alumni community access. We plan the step-down together well in advance so the transition feels supported.',
  },
];

export default function VirtualIopPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_iop_hero01.jpg"
            alt="Virtual Intensive Outpatient Program for women at Inner Peak Colorado"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/90 via-[#2C3B2E]/65 to-[#2C3B2E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/75 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'Virtual Outpatient', path: '/levels-of-care' },
                { label: 'Virtual IOP' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
                  Intensive Outpatient Program
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  The depth of intensive<br />
                  treatment — from<br />
                  <em style={{ color: '#DDA15E' }}>wherever you are.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Our virtual IOP delivers structured, evidence-based mental health and addiction treatment three days a week — without asking you to leave your home, your job, or your family. The same clinical depth. None of the barriers."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                  >
                    Get a Free Assessment
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <a
                    href="tel:+17197338556"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
                  >
                    <i className="ri-phone-line"></i>
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="w-full bg-[#2C3B2E] py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '3×', label: 'Sessions Per Week', color: ACCENT },
            { value: '3 hrs', label: 'Per Session', color: '#DDA15E' },
            { value: '6–12', label: 'Week Program', color: '#8FA489' },
            { value: '100%', label: 'Virtual & Secure', color: '#6B7D67' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <p className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: s.color }}><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
              <p className="text-[10px] uppercase tracking-widest text-[#F0ECE1]/45 font-light"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#8FA489' }}>
              What Is Virtual IOP
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Structured support that<br />
              fits inside your life —<br />
              <em className="text-[#C8795A]">not the other way around.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Intensive Outpatient Programs (IOP) provide a higher level of clinical structure than traditional weekly therapy, while still allowing you to live at home. Our virtual IOP meets three days per week for three hours per session — delivering individual therapy, women-only group therapy, psychiatric support, and skills-based programming through a secure, HIPAA-compliant platform."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"IOP is designed for women who need more than once-a-week therapy but don&apos;t require 24-hour residential support. It is the right level of care for acute symptoms, recent discharge from a higher level of care, or any time your life demands a more intensive period of healing."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: '#8FA489' }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: '#8FA489' }}>
                Evidence-based · Women-only · Colorado
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_iop_overview01.jpg"
                alt="Woman attending virtual IOP group therapy at Inner Peak Colorado"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: '#8FA489' }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"&quot;As a single mom, I couldn&apos;t disappear into treatment. Virtual IOP let me show up for my healing and my daughter at the same time.&quot;"}</AutoLinkedTextClient>
              </p>
              <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#DDA15E' }}>
                — IOP Graduate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#8FA489' }}>
              Sample Weekly Schedule
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Three days. Nine hours.<br />
              <em className="text-[#C8795A]">Life-changing work.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-lg mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"Exact scheduling is personalized during intake. Morning, afternoon, and evening slots are available to fit your existing commitments."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {weekStructure.map((day, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${day.color}18` }}>
                    <i className="ri-calendar-line text-sm" style={{ color: day.color }}></i>
                  </div>
                  <h3 className="font-serif text-[#2C3B2E] text-lg">{day.day}</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {day.sessions.map((session, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: day.color }}></div>
                      <span className="text-sm text-[#3A4A3C]/65 font-light leading-snug">{session}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Included in Your Program
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Everything you need<br />
              <em className="text-[#C8795A]">is already included.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {included.map((item, i) => (
              <div key={i} className="bg-[#F0ECE1] rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-6 flex flex-col gap-4 hover:bg-[#EAE5D8] transition-colors duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: ACCENT }}></i>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-[#2C3B2E] text-sm font-semibold">{item.label}</h3>
                  <p className="text-xs text-[#3A4A3C]/60 font-light leading-snug"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="w-full bg-[#2C3B2E] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="relative h-72 lg:h-auto overflow-hidden">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_iop_approach01.jpg"
              alt="Women-only virtual group therapy session in IOP at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>
          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Our IOP Approach
            </span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Intensive. Connected.<br />
              Grounded in evidence —<br />
              <em style={{ color: '#8FA489' }}>built around you.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {carePillars.map((pillar, i) => (
                <div key={i} className="bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 transition-colors duration-300 rounded-xl p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}25` }}>
                    <i className={`${pillar.icon} text-sm`} style={{ color: ACCENT }}></i>
                  </div>
                  <h3 className="font-serif text-[#FAF8F5] text-sm">{pillar.title}</h3>
                  <p className="text-[#F0ECE1]/55 font-light text-xs leading-[1.8]"><AutoLinkedTextClient>{pillar.desc}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#8FA489' }}>
                Your IOP Journey
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                What to expect from<br />
                <em className="text-[#C8795A]">call to graduation.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"We&apos;ve made starting treatment as simple and low-barrier as possible. Most women are in their first session within 24–72 hours of their initial call."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#8FA489' }}>
                  <AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient>
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"From first call to first session. Insurance verified before you begin."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              {journey.map((item, i) => (
                <div key={i} className="group flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {item.step}
                    </div>
                    {i < journey.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}30`, minHeight: '40px' }}></div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-4">
                    <h3 className="font-serif text-[#2C3B2E] text-base group-hover:text-[#C8795A] transition-colors duration-300">{item.label}</h3>
                    <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THERAPIES */}
      <section className="w-full bg-[#F0ECE1] py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-5 lg:col-span-1">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#8FA489' }}>
                Modalities
              </span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                Therapies used in<br />
                <em className="text-[#C8795A]">our IOP.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"We combine the most rigorously tested therapeutic modalities with individualized care planning for each woman in our program."}</AutoLinkedTextClient>
              </p>
              <Link
                href="/therapy"
                className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2C3B2E]/30 text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
              >
                Explore All Therapies
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div className="lg:col-span-2 flex flex-wrap gap-3">
              {therapies.map((therapy, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-[#FAF8F5] rounded-full px-5 py-3 hover:bg-[#2C3B2E] group transition-all duration-300 cursor-default"
                >
                  <i className={`${therapy.icon} text-sm transition-colors duration-300`} style={{ color: '#8FA489' }}></i>
                  <span className="text-xs font-medium text-[#2C3B2E] group-hover:text-[#FAF8F5] transition-colors duration-300 whitespace-nowrap">
                    {therapy.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Common Questions
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Questions about virtual IOP
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-[#2C3B2E]' : 'bg-[#F0ECE1]'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full cursor-pointer flex items-center justify-between p-6 text-left">
                  <span className={`font-serif text-base pr-4 ${openFaq === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}>{faq.q}</span>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className={`text-sm ${openFaq === i ? 'ri-subtract-line text-[#DDA15E]' : 'ri-add-line text-[#3A4A3C]/40'}`}></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.9]"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_iop_cta01.jpg"
              alt="Woman completing virtual IOP session at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Begin IOP Today
            </span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              Structured healing that<br />
              works around your life —<br />
              <em style={{ color: '#8FA489' }}>not against it.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free clinical assessment is the first step. Our team will verify your benefits, match you with the right clinician, and have you in your first session within 72 hours."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Free Consultation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
              >
                <i className="ri-phone-line"></i>
                Call Us Now
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {['Women-only cohorts · 3 days/week', 'Insurance verified before you begin', 'Start within 24–72 hours of your call'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-sm" style={{ color: '#8FA489' }}></i>
                  <span className="text-[#F0ECE1]/65 text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
