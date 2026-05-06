'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';

const ACCENT = '#8FA489';

const traumaTypes = [
  {
    icon: 'ri-flashlight-line',
    name: 'Acute PTSD',
    tag: 'Single-Event Trauma',
    tagColor: '#C8795A',
    desc: 'Trauma symptoms after a specific event such as an assault, accident, medical crisis, or sudden loss. You may feel constantly on edge, emotionally numb, or trapped in repeating memories that never seem to settle.',
  },
  {
    icon: 'ri-stack-line',
    name: 'Complex PTSD (C-PTSD)',
    tag: 'Relational Trauma',
    tagColor: '#DDA15E',
    desc: 'When trauma happens repeatedly over time, often in relationships where safety was supposed to exist. C-PTSD can impact identity, trust, boundaries, and emotional regulation in profound ways.',
  },
  {
    icon: 'ri-home-heart-line',
    name: 'Developmental Trauma',
    tag: 'Early-Life Wounds',
    tagColor: ACCENT,
    desc: 'Early environments marked by neglect, instability, or emotional harm can shape the nervous system and relationship patterns into adulthood. Healing means rebuilding safety from the inside out.',
  },
  {
    icon: 'ri-shield-cross-line',
    name: 'Co-Occurring Trauma',
    tag: 'Dual Diagnosis',
    tagColor: '#6B7D67',
    desc: 'Trauma often overlaps with anxiety, depression, substance use, eating disorders, and dissociation. We treat these together so your care addresses root causes, not just surface symptoms.',
  },
];

const emotionalSigns = [
  'Intrusive memories, nightmares, or flashbacks',
  'Feeling emotionally numb, detached, or distant',
  'Persistent anxiety, fear, or hypervigilance',
  'Intense shame, guilt, or self-blame',
  'Irritability, anger outbursts, or emotional overwhelm',
  'Difficulty trusting others or feeling safe in relationships',
  'Avoidance of reminders, places, or conversations',
  'Feeling stuck in survival mode even when life seems "fine"',
];

const bodySigns = [
  'Sleep disruption or frequent waking',
  'Racing heart, panic, or chest tightness',
  'Digestive distress and appetite changes',
  'Chronic fatigue or burnout',
  'Muscle tension, headaches, or body pain',
  'Difficulty concentrating or memory gaps',
  'Startle response and heightened sensitivity to noise',
  'Using substances or compulsive behaviors to self-soothe',
];

const carePillars = [
  {
    icon: 'ri-shield-check-line',
    title: 'Safety First',
    desc: 'We never force disclosure or push pace. Treatment starts with stabilization, nervous system safety, and practical tools so healing feels possible and grounded.',
  },
  {
    icon: 'ri-body-scan-line',
    title: 'Nervous System Healing',
    desc: 'Trauma lives in both mind and body. We integrate somatic interventions that help your body relearn regulation, trust, and present-moment safety.',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Women-Centered Care',
    desc: 'Women experience trauma in specific social and relational contexts. Our clinicians deliver trauma treatment through a gender-responsive, culturally aware lens.',
  },
  {
    icon: 'ri-links-line',
    title: 'Integrated Dual Diagnosis',
    desc: 'If trauma overlaps with anxiety, depression, eating concerns, or substance use, your plan addresses all of it together for stronger long-term outcomes.',
  },
];

const healingPath = [
  {
    step: '01',
    label: 'Confidential Clinical Assessment',
    desc: 'You meet with a licensed clinician to explore your history, symptoms, and current needs. We listen deeply and identify what level of care best supports you right now.',
  },
  {
    step: '02',
    label: 'Stabilization & Grounding',
    desc: 'Before trauma processing, we build concrete regulation skills. You learn how to reduce overwhelm, reconnect to your body, and create daily safety anchors.',
  },
  {
    step: '03',
    label: 'Trauma Processing Therapy',
    desc: 'Using evidence-based methods like EMDR, trauma-focused CBT, and narrative work, we help you process traumatic memory in a structured, compassionate way.',
  },
  {
    step: '04',
    label: 'Relational Repair & Identity Work',
    desc: 'Trauma can impact boundaries, attachment, and self-worth. We focus on rebuilding trust in yourself and strengthening healthy, sustainable relationship patterns.',
  },
  {
    step: '05',
    label: 'Ongoing Recovery Planning',
    desc: 'As symptoms decrease, we create a relapse-prevention and support plan so your healing remains durable in work, family, and everyday life.',
  },
];

const therapies = [
  { name: 'EMDR', icon: 'ri-eye-line' },
  { name: 'Trauma-Focused CBT', icon: 'ri-brain-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Narrative Therapy', icon: 'ri-book-open-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
  { name: 'Group Therapy', icon: 'ri-group-line' },
  { name: 'Family Therapy', icon: 'ri-home-heart-line' },
];

const faqs = [
  {
    q: 'How do I know if what I am experiencing is trauma, not just stress?',
    a: 'If your nervous system feels constantly activated, if memories feel intrusive, or if fear and avoidance are shaping your daily life, it may be trauma-related. You do not need to self-diagnose first. A confidential assessment can help clarify what is happening.',
  },
  {
    q: 'Do I have to talk about every traumatic event in detail?',
    a: 'No. Trauma treatment should never feel forced. We move at your pace and prioritize safety, stabilization, and choice throughout care. You remain in control of what is shared and when.',
  },
  {
    q: 'Can virtual treatment actually help with PTSD and trauma?',
    a: 'Yes. Many women do trauma work effectively in virtual settings, especially when treatment includes structured regulation skills and strong therapeutic rapport. Healing in your own environment can also support real-world integration.',
  },
  {
    q: 'What if I also struggle with anxiety, depression, or substance use?',
    a: 'That is very common. Our dual-diagnosis model is designed to treat trauma and co-occurring conditions together, which leads to more sustainable progress than treating each issue in isolation.',
  },
  {
    q: 'How quickly can I begin treatment?',
    a: 'Most women can begin quickly after the initial assessment. We work to reduce barriers so you can start care as soon as clinically appropriate.',
  },
];

export default function PtsdAndTraumaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ptsd_hero01.jpg"
            alt="PTSD and trauma treatment for women at Inner Peak Colorado"
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
                { label: 'PTSD & Trauma' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  PTSD & Trauma
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Trauma changed how<br />
                  your body learned<br />
                  <em style={{ color: '#DDA15E' }}>to survive.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  PTSD and trauma responses are not signs of weakness. They are intelligent survival adaptations. At Inner Peak Colorado, we help women move from constant survival mode toward safety, stability, and lasting recovery.
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
              Understanding Trauma
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              You are not broken.<br />
              Your nervous system is<br />
              <em className="text-[#C8795A]">trying to protect you.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              Trauma can change how your brain and body interpret safety. That can look like panic, shutdown, dissociation, insomnia, emotional numbness, or feeling stuck in high alert. These patterns are treatable, and healing is possible.
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              Our trauma-informed model helps you rebuild a felt sense of safety while addressing the memories and beliefs that keep you trapped in old survival responses.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Trauma care across virtual outpatient levels
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ptsd_overview01.jpg"
                alt="Woman beginning trauma recovery"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                &quot;For years I thought I was just too anxious to function. Trauma treatment helped me understand my body was protecting me, and taught me how to feel safe again.&quot;
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
              Trauma Presentations
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Different histories,<br />
              <em className="text-[#C8795A]">one path toward healing.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              We treat PTSD and trauma in all forms, with care plans shaped around your lived experience, symptom profile, and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {traumaTypes.map((type, i) => (
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
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{type.desc}</p>
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
              Trauma can shape both<br />
              <em className="text-[#C8795A]">mind and body.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-2xl mx-auto leading-relaxed">
              Symptoms can look different for every woman. If these patterns feel familiar, support can help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}20` }}>
                  <i className="ri-mental-health-line text-sm" style={{ color: ACCENT }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Emotional & Behavioral Signs</h3>
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
                  <i className="ri-heart-pulse-line text-sm text-[#C8795A]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Nervous System & Body Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {bodySigns.map((sign, i) => (
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
              You do not need to wait for symptoms to get worse. Early trauma support can reduce long-term suffering and help you feel like yourself again.
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ptsd_approach01.jpg"
              alt="Trauma-informed treatment approach at Inner Peak Colorado"
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
              Trauma-informed care<br />
              that balances structure<br />
              <em style={{ color: ACCENT }}>and compassion.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {carePillars.map((pillar, i) => (
                <div key={i} className="bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 transition-colors duration-300 rounded-xl p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}25` }}>
                    <i className={`${pillar.icon} text-sm`} style={{ color: ACCENT }}></i>
                  </div>
                  <h3 className="font-serif text-[#FAF8F5] text-sm">{pillar.title}</h3>
                  <p className="text-[#F0ECE1]/55 font-light text-xs leading-[1.8]">{pillar.desc}</p>
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
                What trauma treatment<br />
                <em className="text-[#C8795A]">can look like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                Healing does not happen all at once. We use a phased model that builds safety, processes trauma carefully, and supports long-term recovery.
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  Most women begin within
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24-72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  From first call to first session, depending on clinical fit and scheduling.
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
                    <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{item.desc}</p>
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
                <em className="text-[#C8795A]">trauma treatment.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                We combine evidence-based trauma modalities with individualized clinical planning for each woman.
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
              Questions about PTSD and trauma treatment
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
                    <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.9]">{faq.a}</p>
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ptsd_cta01.jpg"
              alt="Begin trauma recovery at Inner Peak Colorado"
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
              You deserve to feel<br />
              safe in your body<br />
              <em style={{ color: ACCENT }}>and in your life.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              A free, confidential consultation is the first step. Our clinical team will help you understand what kind of trauma support is right for you and how to begin safely.
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
              {['Trauma-informed clinicians', 'Women-centered evidence-based care', 'Insurance verification before you begin'].map((item, i) => (
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
