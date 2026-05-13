'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#8FA489';

const bipolarTypes = [
  {
    icon: 'ri-scales-3-line',
    name: 'Bipolar I Disorder',
    tag: 'Manic Episodes',
    tagColor: '#C8795A',
    desc: 'Defined by at least one manic episode — a period of unusually elevated or irritable mood that may include impulsivity, decreased need for sleep, grandiosity, and behavior that carries serious real-world consequences. Depressive episodes also occur and can be severe.',
  },
  {
    icon: 'ri-road-map-line',
    name: 'Bipolar II Disorder',
    tag: 'Hypomania & Depression',
    tagColor: '#DDA15E',
    desc: 'Characterized by cycles of hypomanic episodes — less intense than full mania, but still disruptive — and significant depressive episodes. Often misdiagnosed as unipolar depression because the hypomanic phase can feel normal or even productive. Specialized assessment matters.',
  },
  {
    icon: 'ri-refresh-line',
    name: 'Cyclothymic Disorder',
    tag: 'Mood Cycling',
    tagColor: ACCENT,
    desc: 'A chronic pattern of mood fluctuations that are less severe than full bipolar episodes but persistent over two or more years. The emotional instability can significantly affect relationships, work performance, and sense of identity, even when individual episodes appear mild.',
  },
  {
    icon: 'ri-links-line',
    name: 'Bipolar with Co-Occurring Conditions',
    tag: 'Dual Diagnosis',
    tagColor: '#6B7D67',
    desc: 'Bipolar disorder frequently co-occurs with anxiety, PTSD, substance use, ADHD, and eating disorders. Women with bipolar disorder are particularly vulnerable to co-occurring anxiety and eating disorder diagnoses. Integrated dual-diagnosis treatment is essential for genuine recovery.',
  },
];

const moodSigns = [
  'Periods of unusually high energy, decreased need for sleep',
  'Impulsive decisions with serious consequences',
  'Racing thoughts, rapid speech, or feeling "wired"',
  'Elevated or irritable mood lasting days at a time',
  'Feeling invincible, overly confident, or grandiose',
  'Severe depression — hopelessness, emptiness, withdrawal',
  'Mood shifts that feel extreme compared to your circumstances',
  'Difficulty maintaining stable relationships or employment',
];

const physicalSigns = [
  'Sleep disruptions tied to mood state — too little or too much',
  'Dramatic energy fluctuations without medical cause',
  'Changes in appetite and eating patterns across mood phases',
  'Physical agitation or slowing during mood episodes',
  'Difficulty concentrating or sustaining attention',
  'Fatigue that persists even during depressive periods',
  'History of misdiagnosis as unipolar depression',
  'Substance use that increases during mood episodes',
];

const carePillars = [
  {
    icon: 'ri-scales-3-line',
    title: 'Mood Stabilization First',
    desc: 'Stable mood is the foundation of everything. We work with your existing treatment team — including prescribers — to support medication adherence, monitor mood patterns, and reduce episode frequency and severity.',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Women-Centered Care',
    desc: 'Hormonal cycles, reproductive transitions, and gender-specific stressors all interact with bipolar disorder in clinically significant ways. Our treatment is informed by that complexity, not blind to it.',
  },
  {
    icon: 'ri-book-open-line',
    title: 'Psychoeducation & Self-Knowledge',
    desc: 'Understanding your condition — your individual warning signs, triggers, and cycle patterns — is one of the most powerful treatment tools available. We make you the expert on your own experience.',
  },
  {
    icon: 'ri-links-line',
    title: 'Integrated Dual Diagnosis',
    desc: 'We treat co-occurring anxiety, trauma, eating disorders, and substance use alongside your bipolar disorder. Treating only one layer of a multi-layered condition rarely produces durable recovery.',
  },
];

const healingPath = [
  {
    step: '01',
    label: 'Comprehensive Diagnostic Assessment',
    desc: 'Bipolar disorder is frequently misdiagnosed or underdiagnosed, especially in women. We conduct a thorough evaluation of your mood history, episode patterns, current symptoms, and treatment history to ensure you have an accurate clinical picture.',
  },
  {
    step: '02',
    label: 'Stabilization & Psychoeducation',
    desc: 'Early treatment focuses on mood stabilization and helping you understand your condition — including your personal warning signs, triggers, and what makes your episodes better or worse. Knowledge reduces fear and increases agency.',
  },
  {
    step: '03',
    label: 'Therapy for Mood Regulation',
    desc: 'Using CBT, DBT, and Interpersonal and Social Rhythm Therapy (IPSRT), we help you build practical daily structures, regulate your emotional responses, and reduce the impact of stressors that can trigger mood episodes.',
  },
  {
    step: '04',
    label: 'Trauma & Co-Occurring Care',
    desc: 'If trauma, anxiety, or substance use co-occur with your bipolar diagnosis, we treat them simultaneously — not sequentially. Integrated care produces stronger, more lasting outcomes than treating conditions in isolation.',
  },
  {
    step: '05',
    label: 'Relapse Prevention & Long-Term Wellness',
    desc: 'Bipolar disorder is a lifelong condition, and treatment is most effective when it extends beyond acute episodes. We help you build sustainable structures for monitoring mood, maintaining routines, and navigating life\'s inevitable disruptions.',
  },
];

const therapies = [
  { name: 'Cognitive Behavioral Therapy (CBT)', icon: 'ri-brain-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'Interpersonal & Social Rhythm Therapy', icon: 'ri-calendar-check-line' },
  { name: 'Psychoeducation', icon: 'ri-lightbulb-line' },
  { name: 'EMDR for Trauma', icon: 'ri-eye-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Mindfulness-Based Interventions', icon: 'ri-focus-3-line' },
  { name: 'Group Therapy', icon: 'ri-group-line' },
  { name: 'Family Therapy', icon: 'ri-home-heart-line' },
];

const faqs = [
  {
    q: 'How is bipolar disorder treated without medication?',
    a: 'Psychotherapy is a well-established, evidence-based component of bipolar treatment. CBT, DBT, and IPSRT all have robust research support for reducing episode frequency and severity, improving daily functioning, and strengthening long-term wellness. For women who are already working with a prescriber, therapy is a critical adjunct. For those not on medication, a thorough clinical assessment informs what the most appropriate treatment pathway is.',
  },
  {
    q: 'I was diagnosed with depression but I think it might be bipolar. What should I do?',
    a: 'Bipolar II, in particular, is frequently misdiagnosed as unipolar depression because the hypomanic phases are often overlooked or feel normal. If you\'ve ever experienced periods of unusually elevated energy, reduced need for sleep, impulsive behavior, or racing thoughts — especially followed by depression — a comprehensive diagnostic assessment is warranted. Our intake team can help you understand what you\'re experiencing.',
  },
  {
    q: 'Do hormones affect bipolar disorder in women?',
    a: 'Yes, significantly. Reproductive hormonal changes — menstrual cycles, perimenopause, pregnancy, and the postpartum period — can alter mood episode patterns in women with bipolar disorder. Many women notice their cycles trigger or intensify episodes. Our clinicians are trained to account for these interactions in your treatment plan.',
  },
  {
    q: 'Can I manage bipolar disorder through an outpatient program?',
    a: 'Many women with bipolar disorder receive effective, life-changing care in IOP and outpatient settings. The right level of care depends on your current mood stability, safety, and functional level. Our clinical team will assess where you are and recommend the most appropriate level — and step you up or down as your needs change.',
  },
  {
    q: 'Will I have bipolar disorder forever?',
    a: 'Bipolar disorder is a lifelong condition that does not have a cure, but it is highly manageable with the right treatment. Many women with bipolar disorder go on to live full, meaningful, stable lives — maintaining careers, relationships, and wellbeing. Early, sustained treatment is the strongest predictor of long-term quality of life.',
  },
];

export default function BipolarDisorderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">
      {/* HERO */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_bpd_hero01.jpg"
            alt="Bipolar disorder treatment for women at Inner Peak Colorado"
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
                { label: 'Bipolar Disorder' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Bipolar Disorder
                </span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Your moods do not<br />
                  define you. Learning<br />
                  <em style={{ color: '#DDA15E' }}>to live with them can.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Bipolar disorder is not a personality flaw or a lack of willpower. It is a complex, treatable mood condition. At Inner Peak Colorado, we provide evidence-based bipolar disorder treatment for women — combining therapy, psychoeducation, and integrated care to support long-term stability and quality of life."}</AutoLinkedTextClient>
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
              Understanding Bipolar Disorder
            </span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              This is not a character flaw.<br />
              It is a condition with<br />
              <em className="text-[#C8795A]">a path forward.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Bipolar disorder affects approximately 2.8% of adults in the U.S. — and women experience the condition differently than men. Women with bipolar disorder are more likely to have rapid cycling, mixed episodes, and co-occurring anxiety or eating disorders. They are also more likely to be initially misdiagnosed, often with depression alone, delaying access to appropriate treatment for years."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"With the right combination of therapy, psychoeducation, and integrated care, women with bipolar disorder can build stable, meaningful lives. Our virtual IOP and outpatient programs provide that level of support — designed specifically for women in Colorado — without requiring hospitalization or putting your daily life on hold."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Comprehensive bipolar care for women in Colorado
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_bpd_overview01.jpg"
                alt="Woman building stability and self-awareness during bipolar disorder treatment"
                fill
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"&quot;I spent years being told I was just moody or dramatic. When I finally got the right diagnosis and the right treatment, my whole life changed. Stability isn&apos;t boring — it&apos;s freedom.&quot;"}</AutoLinkedTextClient>
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
              Bipolar Presentations
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Not all bipolar disorder<br />
              <em className="text-[#C8795A]">looks the same.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"We treat the full spectrum of bipolar presentations with individualized care plans shaped around your history, current symptoms, and goals."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bipolarTypes.map((type, i) => (
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
              Signs that mood cycling<br />
              <em className="text-[#C8795A]">may need clinical attention.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-2xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"These signs don&apos;t automatically mean bipolar disorder — but if several feel familiar and are affecting your life, a clinical assessment can bring clarity."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}20` }}>
                  <i className="ri-mental-health-line text-sm" style={{ color: ACCENT }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Mood & Behavioral Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {moodSigns.map((sign, i) => (
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
                <h3 className="font-serif text-[#2C3B2E] text-lg">Physical & Functional Signs</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {physicalSigns.map((sign, i) => (
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
              <AutoLinkedTextClient>{"Bipolar disorder responds significantly better to early, consistent treatment. A free, confidential assessment is the first step toward understanding what you&apos;re experiencing."}</AutoLinkedTextClient>
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_bpd_approach01.jpg"
              alt="Bipolar disorder therapy session at Inner Peak Colorado"
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
              Care that honors complexity<br />
              and builds toward<br />
              <em style={{ color: ACCENT }}>lasting stability.</em>
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
                What bipolar disorder<br />
                <em className="text-[#C8795A]">treatment can look like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Recovery from bipolar disorder is not about eliminating all emotion. It&apos;s about building the insight, tools, and support structures that let you live fully — even with a condition that will require ongoing attention."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  <AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient>
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"From first call to first session. Our team moves quickly to support you when you&apos;re ready."}</AutoLinkedTextClient>
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
                <em className="text-[#C8795A]">bipolar disorder care.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"We integrate modalities with the strongest evidence base for bipolar disorder — including specialized approaches for mood regulation, daily structure, and trauma."}</AutoLinkedTextClient>
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
              Questions about bipolar disorder treatment
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
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_bpd_cta01.jpg"
              alt="Woman at peace in Colorado mountains after bipolar disorder treatment"
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
              Stability is not<br />
              the absence of feeling —<br />
              <em style={{ color: ACCENT }}>it&apos;s learning to live fully.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free, confidential assessment is the first step. Our clinical team will listen to your full story and help you understand what kind of care can give you the most stable, meaningful, and sustainable life possible."}</AutoLinkedTextClient>
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
              {['Comprehensive bipolar-informed clinical care', 'Women-specific, gender-responsive treatment', 'Insurance verification before you begin'].map((item, i) => (
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
