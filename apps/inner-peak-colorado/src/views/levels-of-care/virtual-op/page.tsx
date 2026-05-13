'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#6B7D67';

const included = [
  { icon: 'ri-user-heart-line', label: 'Weekly Individual Therapy', desc: '50-minute sessions with your licensed clinician' },
  { icon: 'ri-group-line', label: 'Monthly Group Sessions', desc: 'Women-only peer support and processing groups' },
  { icon: 'ri-medicine-bottle-line', label: 'Psychiatric Medication Management', desc: 'Ongoing monitoring and adjustment as needed' },
  { icon: 'ri-seedling-line', label: 'Wellness & Lifestyle Check-Ins', desc: 'Holistic support for sleep, movement, and nutrition' },
  { icon: 'ri-calendar-event-line', label: 'Community Events & Workshops', desc: 'Monthly skill-building and connection events' },
  { icon: 'ri-shield-check-line', label: 'Relapse Prevention Support', desc: 'Ongoing planning and check-ins as life evolves' },
  { icon: 'ri-community-line', label: 'Alumni Network Access', desc: 'Lifetime access to peer community and events' },
  { icon: 'ri-phone-line', label: 'Crisis Support As Needed', desc: 'Access to your clinical team between sessions' },
];

const whoItsFor = [
  {
    icon: 'ri-road-map-line',
    title: 'Women Stepping Down from IOP',
    desc: 'Transitioning from a higher level of care into standard outpatient is one of the most critical — and underserved — moments in recovery. We provide the clinical continuity that makes step-down successful.',
  },
  {
    icon: 'ri-seedling-line',
    title: 'Women Beginning Their Healing',
    desc: 'For women with lower-acuity symptoms who are ready to begin therapy without intensive weekly programming, standard outpatient provides the right amount of support to start healing safely.',
  },
  {
    icon: 'ri-refresh-line',
    title: 'Women Maintaining Long-Term Recovery',
    desc: 'Recovery doesn\'t end when acute treatment does. Ongoing outpatient care provides the structure, accountability, and therapeutic relationship that sustains wellness years into recovery.',
  },
  {
    icon: 'ri-briefcase-line',
    title: 'Women With Demanding Schedules',
    desc: 'Standard outpatient fits 1–2 sessions per week into any schedule — including full-time careers, caregiving, and family responsibilities. Flexible morning, afternoon, and evening slots are available.',
  },
];

const carePillars = [
  {
    icon: 'ri-user-heart-line',
    title: 'Continuity of Care',
    desc: 'Your outpatient therapist knows your history. Whether you\'re stepping down from IOP or starting fresh, your treatment plan reflects where you are and where you\'re going.',
  },
  {
    icon: 'ri-home-heart-line',
    title: 'Heal at Home',
    desc: 'All outpatient sessions are fully virtual. No commute, no schedule disruption, no one in your life needs to know you\'re in therapy. The privacy of your own space is part of the treatment.',
  },
  {
    icon: 'ri-links-line',
    title: 'Integrated Care',
    desc: 'Depression, anxiety, trauma, eating concerns, and substance use are all treated together. Your outpatient plan addresses the full picture of your wellbeing, not just one diagnosis.',
  },
  {
    icon: 'ri-compass-3-line',
    title: 'Flexible & Responsive',
    desc: 'Life changes. If your needs intensify, we can step you back up to IOP. If things stabilize, we can adjust session frequency. Your level of care always matches where you actually are.',
  },
];

const journey = [
  {
    step: '01',
    label: 'Free Clinical Assessment',
    desc: 'A licensed clinician listens to your story and establishes the right level of care. If outpatient is the right fit — or the right next step — we build your plan from there.',
  },
  {
    step: '02',
    label: 'Insurance Verification',
    desc: 'We verify your benefits before you commit to anything. Mental health outpatient therapy is covered by most major insurance plans, and we handle the verification on your behalf.',
  },
  {
    step: '03',
    label: 'Match With Your Therapist',
    desc: 'You\'re matched with a licensed therapist whose clinical expertise aligns with your specific needs — not just whoever is available. The therapeutic relationship matters deeply to us.',
  },
  {
    step: '04',
    label: 'First Session & Goal Setting',
    desc: 'Your first session focuses on building rapport and collaboratively establishing your treatment goals. There\'s no pressure to cover everything at once — we work at your pace.',
  },
  {
    step: '05',
    label: 'Ongoing Weekly Sessions',
    desc: 'Regular individual therapy sessions, monthly group access, and psychiatric support when needed — all adapted as your circumstances and goals evolve over time.',
  },
];

const therapies = [
  { name: 'Cognitive Behavioral Therapy (CBT)', icon: 'ri-brain-line' },
  { name: 'EMDR', icon: 'ri-eye-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Narrative Therapy', icon: 'ri-book-open-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
  { name: 'Motivational Interviewing', icon: 'ri-compass-3-line' },
];

const faqs = [
  {
    q: 'What is the difference between standard outpatient and IOP?',
    a: 'Intensive Outpatient Programs (IOP) involve 3 days per week of structured programming — group therapy, individual therapy, and skills training. Standard outpatient is 1–2 sessions per week, typically individual therapy and less frequent group access. IOP is appropriate for acute or more complex clinical presentations; outpatient is the right fit for lower-acuity needs, ongoing maintenance, or as a step-down from IOP.',
  },
  {
    q: 'How do I know if standard outpatient is enough for what I\'m experiencing?',
    a: 'A free clinical assessment from our team is the most reliable way to answer this question. We evaluate your symptom severity, history, support system, and goals — then recommend the level of care that best fits your situation. We will always be honest with you if we think a more intensive level of care would serve you better.',
  },
  {
    q: 'How long does outpatient therapy typically last?',
    a: 'Standard outpatient has no fixed endpoint. Some women engage for 3–6 months as part of a step-down; others continue for years as part of an ongoing wellness practice. Your therapist will regularly review your progress with you and adjust the plan accordingly.',
  },
  {
    q: 'Can I combine outpatient therapy with other types of treatment?',
    a: 'Yes. Many women in our outpatient program also receive psychiatric medication management, participate in community wellness events, or access peer support through our alumni network. Your outpatient plan can be as comprehensive or as focused as your needs require.',
  },
  {
    q: 'What happens if I need a higher level of care while in outpatient?',
    a: 'We monitor closely and stay in active communication with you between sessions. If your symptoms intensify, we can rapidly step you up to IOP — often within 24–72 hours. Your continuity of care is protected because your team already knows your history.',
  },
];

export default function VirtualOpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_op_hero01.jpg"
            alt="Virtual standard outpatient therapy for women at Inner Peak Colorado"
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
                { label: 'Virtual OP' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
                  Standard Outpatient Program
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Consistent support that<br />
                  sustains the life<br />
                  <em style={{ color: '#DDA15E' }}>you&apos;re building.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Standard outpatient provides the ongoing clinical support that maintains and deepens recovery — whether you&apos;re stepping down from IOP, beginning your healing journey, or investing in your long-term mental health. Flexible, virtual, and designed around your real life."}</AutoLinkedTextClient>
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
            { value: '1–2×', label: 'Sessions Per Week', color: ACCENT },
            { value: '50 min', label: 'Per Session', color: '#DDA15E' },
            { value: 'Ongoing', label: 'Flexible Duration', color: '#C8795A' },
            { value: '100%', label: 'Virtual & Private', color: '#8FA489' },
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
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              What Is Virtual OP
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Recovery isn&apos;t a finish line.<br />
              Outpatient is how you<br />
              <em className="text-[#C8795A]">stay grounded in it.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Standard outpatient therapy is 1–2 sessions per week — flexible, virtual, and designed to support women at any point in their recovery journey. It is the appropriate level of care for women beginning therapy with lower-acuity needs, women stepping down from IOP, or women investing in long-term mental health maintenance."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Unlike generic outpatient therapy, our program is fully integrated. Your individual therapist, psychiatrist (when needed), and group facilitator communicate and collaborate on your care — so nothing falls between the cracks."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Ongoing · Women-only · Colorado
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_op_overview01.jpg"
                alt="Woman journaling and reflecting during virtual outpatient therapy at Inner Peak Colorado"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"&quot;Virtual outpatient has been my anchor. Even two years into recovery, having that weekly session keeps me grounded and growing.&quot;"}</AutoLinkedTextClient>
              </p>
              <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#DDA15E' }}>
                — Outpatient Client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Who It&apos;s For
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Outpatient meets you<br />
              <em className="text-[#C8795A]">wherever you are.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"Standard outpatient is the right level of care for a wide range of women and a wide range of circumstances."}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whoItsFor.map((item, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-5">
                <div className="w-11 h-11 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: ACCENT }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-xl">{item.title}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
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
              Comprehensive support —<br />
              <em className="text-[#C8795A]">without the intensity of IOP.</em>
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

          <div className="mt-8 bg-[#2C3B2E] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[#F0ECE1]/80 font-light text-base leading-relaxed max-w-2xl">
              <AutoLinkedTextClient>{"Need more structure right now? Our IOP runs three days per week and provides a higher level of clinical support. We&apos;ll help you choose the right level at your assessment."}</AutoLinkedTextClient>
            </p>
            <Link
              href="/levels-of-care/virtual-iop"
              className="whitespace-nowrap cursor-pointer flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Learn About IOP
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="w-full bg-[#2C3B2E] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="relative h-72 lg:h-auto overflow-hidden">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_op_approach01.jpg"
              alt="Virtual individual therapy session for outpatient clients at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>
          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Our OP Approach
            </span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Flexible care that<br />
              never loses sight of<br />
              <em style={{ color: ACCENT }}>the whole person.</em>
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
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Getting Started
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                From first call to<br />
                <em className="text-[#C8795A]">first session.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Beginning outpatient therapy is a straightforward process. We handle the logistics — insurance, scheduling, therapist matching — so you can focus on showing up."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  <AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient>
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"From first call to first session. No wait lists. No barriers. Just care."}</AutoLinkedTextClient>
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
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Modalities
              </span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                Therapies used in<br />
                <em className="text-[#C8795A]">standard outpatient.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"Every modality is selected based on your specific clinical needs and goals — not a one-size-fits-all protocol."}</AutoLinkedTextClient>
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
                  <i className={`${therapy.icon} text-sm transition-colors duration-300`} style={{ color: ACCENT }}></i>
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
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>
              Common Questions
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Questions about virtual outpatient
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/loc_op_cta01.jpg"
              alt="Woman walking in Colorado mountains representing sustained recovery through outpatient care"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Begin Outpatient Today
            </span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              Healing is not a moment.<br />
              It&apos;s a practice —<br />
              <em style={{ color: ACCENT }}>we&apos;ll be there for it.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free, confidential assessment is the first step. Our clinical team will listen, assess, and help you understand whether outpatient is the right fit — and if so, get you started within 72 hours."}</AutoLinkedTextClient>
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
              {['Flexible 1–2 sessions per week', 'Insurance verified before you begin', 'Women-only · Colorado · Fully virtual'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-sm" style={{ color: ACCENT }}></i>
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
