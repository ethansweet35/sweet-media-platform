'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#8FA489';

const imposterTypes = [
  {
    icon: 'ri-trophy-line',
    name: 'The Perfectionist',
    tag: 'High Standards',
    tagColor: '#C8795A',
    desc: 'You set impossibly high goals and feel like a failure the moment you fall short — even when your work is objectively excellent. Every mistake reinforces your secret belief that you are not as capable as others think. Therapy helps you separate high standards from self-worth.',
  },
  {
    icon: 'ri-user-star-line',
    name: 'The Expert',
    tag: 'Knowledge Anxiety',
    tagColor: '#DDA15E',
    desc: 'You believe you need to know everything before you can legitimately claim competence in your field. Gaps in your knowledge feel like evidence of fraud rather than normal human limitation. You over-prepare, fear being "found out," and struggle to own your genuine expertise.',
  },
  {
    icon: 'ri-flashlight-fill',
    name: 'The Superwoman',
    tag: 'Overachievement',
    tagColor: ACCENT,
    desc: 'You push yourself to work harder than everyone around you to mask what you believe is underlying inadequacy. When you achieve something, you credit hard work or luck — never ability. The bar keeps moving, and rest feels dangerous because stopping means the mask comes off.',
  },
  {
    icon: 'ri-compass-3-line',
    name: 'The Soloist',
    tag: 'Self-Reliance',
    tagColor: '#6B7D67',
    desc: 'Asking for help feels like proof that you don\'t belong. You work alone, avoid collaboration, and turn down mentorship because needing support confirms your fear that you\'re not truly qualified. Real strength, you\'ve been taught, should look effortless and independent.',
  },
];

const emotionalSigns = [
  'Attributing success to luck, timing, or others — not yourself',
  'Persistent fear of being "found out" or exposed as a fraud',
  'Difficulty internalizing praise or positive feedback',
  'Overworking to compensate for perceived inadequacy',
  'Comparing yourself unfavorably to everyone around you',
  'Dismissing accomplishments as soon as they\'re achieved',
  'Self-doubt that intensifies after promotions or recognition',
  'Feeling unworthy of the position, role, or opportunity you have earned',
];

const behavioralSigns = [
  'Over-preparing for situations where you feel unqualified',
  'Avoiding visibility, leadership roles, or public recognition',
  'Procrastinating due to fear that your work won\'t be good enough',
  'Difficulty saying no — driven by fear of being seen as inadequate',
  'Sabotaging opportunities before they expose your "limits"',
  'Feeling paralyzed when asked to demonstrate your expertise',
  'Chronic perfectionism that blocks completion of work',
  'Dismissing your own ideas until someone else validates them',
];

const carePillars = [
  {
    icon: 'ri-brain-line',
    title: 'Cognitive Restructuring',
    desc: 'We identify the core beliefs driving your imposter experience — beliefs about worthiness, achievement, and identity — and build more accurate, compassionate alternatives that hold up under scrutiny.',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Women-Centered Context',
    desc: 'Imposter syndrome disproportionately affects high-achieving women, shaped by real systemic pressures, gender dynamics, and cultural messaging. We treat it in that context — not as a personal flaw to fix.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Identity & Self-Worth Work',
    desc: 'Lasting recovery from imposter syndrome requires separating your value from your performance. We help you build an identity that is stable, self-authored, and not dependent on external validation.',
  },
  {
    icon: 'ri-links-line',
    title: 'Co-Occurring Care',
    desc: 'Imposter syndrome rarely travels alone. Anxiety, perfectionism, depression, and burnout frequently co-occur. Our integrated approach addresses the full picture so recovery is durable.',
  },
];

const healingPath = [
  {
    step: '01',
    label: 'Clinical Assessment',
    desc: 'We start with a comprehensive evaluation of your history, patterns, and the specific ways imposter syndrome is affecting your work, relationships, and wellbeing. You don\'t need to have the "right" diagnosis — just your real experience.',
  },
  {
    step: '02',
    label: 'Naming and Normalizing',
    desc: 'One of the most powerful early interventions is simply naming what\'s happening. You are not broken or uniquely defective. Imposter syndrome is a documented psychological pattern that responds well to the right support.',
  },
  {
    step: '03',
    label: 'Cognitive Behavioral Work',
    desc: 'Using CBT, we identify the automatic thoughts that reinforce imposter beliefs and practice replacing them with more accurate, evidence-based perspectives. Over time, your internal narrative changes at a structural level.',
  },
  {
    step: '04',
    label: 'Values Clarification & Identity',
    desc: 'ACT helps you build a values-based identity that is not contingent on performance or approval. You learn what actually matters to you — separate from what you\'ve been told you should achieve.',
  },
  {
    step: '05',
    label: 'Integration & Ongoing Confidence',
    desc: 'We develop strategies for high-stakes situations — new roles, promotions, public visibility — and build sustainable practices for self-compassion and authentic confidence that extend long after treatment ends.',
  },
];

const therapies = [
  { name: 'Cognitive Behavioral Therapy (CBT)', icon: 'ri-brain-line' },
  { name: 'Acceptance & Commitment Therapy (ACT)', icon: 'ri-heart-line' },
  { name: 'Internal Family Systems (IFS)', icon: 'ri-user-heart-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Narrative Therapy', icon: 'ri-book-open-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
  { name: 'Group Therapy', icon: 'ri-group-line' },
  { name: 'Psychoeducation', icon: 'ri-lightbulb-line' },
];

const faqs = [
  {
    q: 'Is imposter syndrome a clinical diagnosis?',
    a: 'Imposter syndrome is not a formal DSM diagnosis, but it is a well-documented psychological pattern that causes significant distress and impairs functioning for millions of high-achieving women. It commonly co-occurs with anxiety, depression, and perfectionism — and it responds very well to evidence-based therapy.',
  },
  {
    q: 'I\'ve been successful my whole life. Why would I need therapy for this?',
    a: 'External success and internal suffering coexist all the time. In fact, high achievement is often a compensation strategy for deep self-doubt. The fact that your performance looks polished on the outside doesn\'t mean the internal experience is sustainable or healthy. Therapy isn\'t only for people who appear to be struggling — it\'s for anyone whose inner life is causing them significant pain.',
  },
  {
    q: 'Does imposter syndrome affect women differently than men?',
    a: 'Research consistently shows that imposter syndrome disproportionately affects women — particularly in high-achievement environments where women are underrepresented. Real systemic factors — bias, higher performance expectations, fewer role models, and the constant negotiation of gender dynamics at work — contribute to its development and persistence in ways that deserve a gender-informed treatment approach.',
  },
  {
    q: 'What if my imposter feelings are partly accurate? What if I really am underqualified?',
    a: 'This is one of the most common and important questions. Therapy isn\'t about convincing yourself you\'re more capable than you are — it\'s about accurately evaluating your abilities rather than distorting them downward. We do that work carefully, distinguishing genuine learning edges from self-distorting imposter patterns. Real growth requires accurate self-knowledge, not false positivity.',
  },
  {
    q: 'Can virtual treatment work for something this psychological?',
    a: 'Yes — and for many women, the privacy and flexibility of virtual care actually makes it easier to do this work honestly. Imposter syndrome often involves shame around asking for help. Being in your own environment, at a time that works for your life, can lower that barrier significantly.',
  },
];

export default function ImposterSyndromePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_imp_hero01.jpg"
            alt="High-achieving woman navigating imposter syndrome treatment at Inner Peak Colorado"
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
                { label: 'What We Treat', path: '/what-we-treat' },
                { label: 'Imposter Syndrome' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Imposter Syndrome
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  You built something real.<br />
                  It&apos;s time to believe<br />
                  <em style={{ color: '#DDA15E' }}>you deserve it.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Imposter syndrome makes high-achieving women feel like they are living on borrowed time — always one mistake away from being exposed. At Inner Peak Colorado, we help you build an identity grounded in reality, not self-distortion."}</AutoLinkedTextClient>
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

      {/* CONDITION OVERVIEW */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Understanding Imposter Syndrome
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Your resume is real.<br />
              The voice that says it&apos;s not<br />
              <em className="text-[#C8795A]">is what needs treating.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Imposter syndrome is the persistent, internalized belief that you are not as competent as others perceive you — and that you will eventually be exposed as a fraud. It is not a sign of low intelligence or poor self-awareness. In fact, it is most common among high-achieving, self-aware women who have spent years trying to prove something that doesn&apos;t need proving."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Studies show that up to 70% of people experience imposter phenomenon at some point — and women in high-pressure professional, academic, and caregiving roles in Colorado and beyond are disproportionately affected. The chronic anxiety, overwork, and self-diminishment it produces take a serious toll on mental health, relationships, and quality of life."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Evidence-based treatment for high-achieving women
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_imp_overview01.jpg"
                alt="Woman journaling and reflecting during imposter syndrome recovery"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"&quot;I had a career most people would envy — and I spent every day terrified they&apos;d realize I didn&apos;t belong. Therapy helped me see that the fraud wasn&apos;t me. It was the story I&apos;d been telling myself for decades.&quot;"}</AutoLinkedTextClient>
              </p>
              <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#DDA15E' }}>
                — Program Graduate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES WE TREAT */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Imposter Profiles
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Which version of imposter<br />
              <em className="text-[#C8795A]">syndrome are you living?</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"Imposter syndrome shows up differently in different women. All of them are real. All of them are treatable."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {imposterTypes.map((type, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${type.tagColor}15` }}>
                    <i className={`${type.icon} text-lg`} style={{ color: type.tagColor }}></i>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${type.tagColor}15`, color: type.tagColor }}
                  >
                    {type.tag}
                  </span>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-xl">{type.name}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{type.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>
              Recognition
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Signs imposter syndrome<br />
              <em className="text-[#C8795A]">is running your life.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-2xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"You don&apos;t need to relate to every item. If these patterns are showing up consistently, support can help you change them."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}20` }}>
                  <i className="ri-mental-health-line text-sm" style={{ color: ACCENT }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Emotional & Cognitive Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {emotionalSigns.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-blank-circle-line text-xs" style={{ color: ACCENT }}></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/70 font-light leading-snug">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0ECE1] rounded-[0.75rem_2rem_0.75rem_2rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: '#C8795A20' }}>
                  <i className="ri-settings-line text-sm text-[#C8795A]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Behavioral Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {behavioralSigns.map((sign, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-blank-circle-line text-xs text-[#C8795A]"></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/70 font-light leading-snug">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#2C3B2E] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[#F0ECE1]/80 font-light text-base leading-relaxed max-w-2xl">
              <AutoLinkedTextClient>{"Imposter syndrome is not a phase or a quirk. Left unaddressed, it drives burnout, chronic anxiety, and a career lived below your potential. You deserve support — and treatment works."}</AutoLinkedTextClient>
            </p>
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Speak with Our Team
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_imp_approach01.jpg"
              alt="Therapy session for imposter syndrome at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>

          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Our Approach
            </span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Building identity that<br />
              doesn&apos;t collapse when<br />
              <em style={{ color: ACCENT }}>someone believes in you.</em>
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

      {/* HEALING JOURNEY */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Your Healing Path
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                What treating imposter<br />
                <em className="text-[#C8795A]">syndrome looks like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Recovery from imposter syndrome is not about becoming arrogant or inflating your self-image. It&apos;s about seeing yourself clearly — and discovering that you were always enough."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  <AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient>
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"From first call to first session. Flexible virtual scheduling designed for women with demanding lives."}</AutoLinkedTextClient>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {healingPath.map((item, i) => (
                <div key={i} className="group flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {item.step}
                    </div>
                    {i < healingPath.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}30`, minHeight: '40px' }}></div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-4">
                    <h3 className="font-serif text-[#2C3B2E] text-base group-hover:text-[#C8795A] transition-colors duration-300">
                      {item.label}
                    </h3>
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
                <em className="text-[#C8795A]">imposter syndrome care.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"Each modality is selected based on what the research shows most effectively addresses the cognitive, emotional, and identity roots of imposter syndrome."}</AutoLinkedTextClient>
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
              Questions about imposter syndrome treatment
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_imp_cta01.jpg"
              alt="Woman standing confidently in Colorado mountains after imposter syndrome recovery"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>
              Start Healing
            </span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              You&apos;ve earned your place.<br />
              Now it&apos;s time to<br />
              <em style={{ color: ACCENT }}>stop apologizing for it.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free, confidential consultation is the first step. Our clinical team will listen without judgment and help you understand what kind of support can help you build a more grounded, confident, and sustainable sense of self."}</AutoLinkedTextClient>
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
              {['Women-centered evidence-based treatment', 'Virtual care across Colorado', 'Insurance verification before you begin'].map((item, i) => (
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
