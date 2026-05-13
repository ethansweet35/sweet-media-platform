'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#8FA489';

const types = [
  {
    icon: 'ri-subtract-line',
    name: 'Anorexia Nervosa',
    tag: 'Restriction',
    tagColor: '#C8795A',
    desc: 'Characterized by persistent restriction of food intake, an intense fear of weight gain, and a distorted relationship with body image. Anorexia has the highest mortality rate of any psychiatric condition — and with the right support, full recovery is possible.',
  },
  {
    icon: 'ri-refresh-line',
    name: 'Bulimia Nervosa',
    tag: 'Binge-Purge',
    tagColor: '#DDA15E',
    desc: 'A cycle of binge eating followed by purging behaviors — vomiting, laxatives, or excessive exercise. Often hidden and accompanied by deep shame. Our approach creates a judgment-free space where women can finally be honest about what they\'re experiencing.',
  },
  {
    icon: 'ri-heart-pulse-line',
    name: 'Binge Eating Disorder',
    tag: 'Compulsive Eating',
    tagColor: ACCENT,
    desc: 'The most common eating disorder — marked by recurrent episodes of eating large amounts of food rapidly, often without hunger, followed by shame and distress. BED is a medical condition, not a character flaw, and it responds very well to compassionate, evidence-based treatment.',
  },
  {
    icon: 'ri-focus-3-line',
    name: 'ARFID & Other Specified',
    tag: 'Varied Presentations',
    tagColor: '#6B7D67',
    desc: 'Avoidant/Restrictive Food Intake Disorder and other specified feeding and eating disorders (OSFED) don\'t always fit neatly into traditional categories — but they cause real suffering. We meet every woman where she is, regardless of how her relationship with food presents.',
  },
];

const emotionalSigns = [
  'Preoccupation with weight, food, or body image',
  'Intense fear of weight gain or "feeling fat"',
  'Rigid rules or rituals around eating',
  'Eating alone or avoiding meals with others',
  'Feeling out of control around food',
  'Mood changes after eating',
  'Distorted perception of body size or shape',
  'Using food (or restriction) to manage emotions',
];

const physicalSigns = [
  'Dramatic weight fluctuations',
  'Fatigue or difficulty concentrating',
  'Feeling cold even in warm environments',
  'Hair thinning or loss',
  'Gastrointestinal discomfort',
  'Irregular or absent menstrual cycles',
  'Dental erosion or frequent sore throat',
  'Swollen cheeks or jaw (from purging)',
];

const approachPillars = [
  {
    icon: 'ri-scales-3-line',
    title: 'Weight-Neutral Care',
    desc: 'We never use weight as a measure of health or progress. Our entire model is built around Health at Every Size (HAES) principles — your worth is not determined by your body.',
  },
  {
    icon: 'ri-shield-cross-line',
    title: 'Trauma-Informed',
    desc: 'Eating disorders and trauma are deeply intertwined. We treat the root — not just the symptoms — using EMDR, somatic experiencing, and trauma-focused CBT tailored for eating disorder recovery.',
  },
  {
    icon: 'ri-heart-line',
    title: 'Body-Positive & Non-Shaming',
    desc: 'There is no judgment here — about what you\'ve done, how you look, or how long you\'ve struggled. Our clinicians are trained to create a space where honesty and vulnerability feel safe.',
  },
  {
    icon: 'ri-group-line',
    title: 'Women-Only Community',
    desc: 'Eating disorders often carry enormous shame. Healing in a women-only space — where every woman understands the unique pressures women face around body and beauty — accelerates recovery.',
  },
];

const timeline = [
  {
    step: '01',
    label: 'Free Clinical Assessment',
    desc: 'A licensed clinician listens to your full story — your history with food, your body, your experiences — without judgment. We assess where you are and what level of care will serve you best.',
  },
  {
    step: '02',
    label: 'Personalized Treatment Plan',
    desc: 'We build a plan that integrates individual therapy, group support, and holistic care — calibrated to your specific presentation, trauma history, and recovery goals.',
  },
  {
    step: '03',
    label: 'Individual & Group Therapy',
    desc: 'Weekly individual sessions go deep into the roots of your relationship with food and your body. Group therapy connects you with women who truly understand — building community that sustains recovery.',
  },
  {
    step: '04',
    label: 'Nutritional & Somatic Support',
    desc: 'We coordinate with registered dietitians who specialize in eating disorder recovery — and weave body-based therapies throughout to help you rebuild a safe, trusting relationship with your body.',
  },
  {
    step: '05',
    label: 'Ongoing Recovery & Alumni Care',
    desc: 'Recovery is not a finish line. Our alumni community, step-down support, and continued outpatient care ensure you never face the journey alone — even after formal treatment ends.',
  },
];

const therapies = [
  { name: 'CBT for Eating Disorders (CBT-E)', icon: 'ri-brain-line' },
  { name: 'Dialectical Behavior Therapy (DBT)', icon: 'ri-scales-3-line' },
  { name: 'EMDR', icon: 'ri-eye-line' },
  { name: 'Somatic Experiencing', icon: 'ri-body-scan-line' },
  { name: 'Acceptance & Commitment Therapy', icon: 'ri-heart-line' },
  { name: 'Trauma-Focused CBT', icon: 'ri-shield-cross-line' },
  { name: 'Group Therapy', icon: 'ri-group-line' },
  { name: 'Family Therapy', icon: 'ri-home-heart-line' },
  { name: 'Nutritional Counseling', icon: 'ri-leaf-line' },
  { name: 'Mindfulness & Meditation', icon: 'ri-focus-3-line' },
];

const faqs = [
  {
    q: 'Do I need to be at a certain weight to receive treatment?',
    a: 'Absolutely not. We do not use weight as a criterion for admission or progress. Eating disorders exist at every body size, and suffering at any weight is valid and deserving of care. Our weight-neutral model means your body is never a measure of your worthiness for treatment.',
  },
  {
    q: 'Is virtual treatment effective for eating disorders?',
    a: 'Research supports virtual treatment as effective for eating disorders, particularly for IOP and outpatient levels of care. For many women, the ability to heal from the privacy of their own home — and to practice new behaviors in the environment where they actually live — enhances rather than limits the therapeutic process.',
  },
  {
    q: 'What if I\'m not sure I have an eating disorder?',
    a: 'You don\'t need a formal diagnosis to reach out. If your relationship with food, eating, or your body is causing you distress — regardless of how it presents — that is reason enough to talk to someone. Our intake team will listen without judgment and help you understand what you\'re experiencing.',
  },
  {
    q: 'Do you treat co-occurring conditions like depression or trauma alongside eating disorders?',
    a: 'Yes — and this integrated approach is essential. Eating disorders rarely exist in isolation. Depression, anxiety, PTSD, and substance use commonly co-occur, and we treat all of these together through our dual-diagnosis model. Treating only the eating disorder without addressing the underlying conditions rarely produces lasting recovery.',
  },
  {
    q: 'How do you involve family members in treatment?',
    a: 'Family involvement can be a powerful support for recovery. We offer family therapy sessions and a family education program to help loved ones understand eating disorders, communicate more effectively, and build a home environment that supports recovery. Family participation is optional and always guided by what feels right for each woman.',
  },
];

export default function EatingDisordersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[620px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ed_hero01.jpg"
              alt="Eating disorder treatment for women at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/90 via-[#2C3B2E]/60 to-[#2C3B2E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'What We Treat', path: '/what-we-treat' },
                { label: 'Eating Disorders' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>Eating Disorders</span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  Your relationship<br />
                  with your body<br />
                  <em style={{ color: '#DDA15E' }}>deserves to heal.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"Eating disorders are complex, serious, and deeply personal — shaped by trauma, culture, and the unique pressures women face. At Inner Peak Colorado, we offer compassionate, weight-neutral care that treats the whole person, not just the behaviors."}</AutoLinkedTextClient>
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

      {/* ── CONDITION OVERVIEW ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>Understanding Eating Disorders</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              More than a struggle<br />
              with food —<br />
              <em className="text-[#C8795A]">a struggle with self.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Eating disorders are not about vanity or willpower. They are serious mental health conditions — often rooted in trauma, attachment wounds, perfectionism, and the crushing weight of living in a world that constantly tells women their bodies are wrong. For many women, controlling food becomes a way of managing overwhelming emotions, coping with pain, or feeling safe in an unsafe world."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Recovery is not about eating \"normally.\" It's about healing your relationship with yourself — your body, your emotions, and your sense of worth. That kind of healing is possible, and it happens every day in our program."}</AutoLinkedTextClient>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
              <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                Treated across all levels of virtual outpatient care
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ed_overview01.jpg"
                alt="Woman in recovery from eating disorder"
                fill
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="bg-[#2C3B2E] rounded-[0.75rem_2rem_0.75rem_2rem] p-7 flex flex-col gap-3">
              <i className="ri-double-quotes-l text-2xl" style={{ color: ACCENT }}></i>
              <p className="font-serif text-[#FAF8F5] text-base leading-[1.7] italic">
                <AutoLinkedTextClient>{"\"I had been struggling for fifteen years before I found a program that didn't make me feel broken. For the first time, I felt like my body wasn't the enemy.\""}</AutoLinkedTextClient>
              </p>
              <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#DDA15E' }}>— Program Graduate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES WE TREAT ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>Types We Treat</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              Every presentation,<br />
              <em className="text-[#C8795A]">every woman.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"Eating disorders look different for every woman. We treat the full spectrum — with the same depth of compassion and clinical rigor regardless of how your experience presents."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {types.map((type, i) => (
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

      {/* ── SIGNS & SYMPTOMS ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>Recognition</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              You may be struggling<br />
              <em className="text-[#C8795A]">if you recognize this.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-2xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"These signs don't mean something is wrong with you — they mean part of you has been trying to survive. If any of these feel familiar, you deserve support."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emotional & Behavioral */}
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

            {/* Physical */}
            <div className="bg-[#F0ECE1] rounded-[0.75rem_2rem_0.75rem_2rem] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: '#C8795A20' }}>
                  <i className="ri-heart-pulse-line text-sm text-[#C8795A]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">Physical Signs</h3>
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
              <AutoLinkedTextClient>{"You don't need to check every box. If any part of this resonates, that's enough reason to reach out. A free, confidential conversation costs nothing."}</AutoLinkedTextClient>
            </p>
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Talk to Someone
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="w-full bg-[#2C3B2E] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="relative h-72 lg:h-auto overflow-hidden">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ed_approach01.jpg"
              alt="Our approach to eating disorder treatment"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>

          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>Our Approach</span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Healing your relationship<br />
              with your body —<br />
              <em style={{ color: ACCENT }}>from the inside out.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {approachPillars.map((pillar, i) => (
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

      {/* ── WHAT TREATMENT LOOKS LIKE ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>Your Journey</span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                What treatment<br />
                <em className="text-[#C8795A]">actually looks like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"We know that starting treatment can feel daunting — especially when you've been struggling alone for a long time. Here's what you can expect, step by step, from your first call to lasting recovery."}</AutoLinkedTextClient>
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}><AutoLinkedTextClient>{"Most women begin within"}</AutoLinkedTextClient></p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>24–72 hours</p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed"><AutoLinkedTextClient>{"From your first call to your first session. We make starting as simple and low-barrier as possible."}</AutoLinkedTextClient></p>
              </div>
            </div>

            <div className="flex flex-col">
              {timeline.map((item, i) => (
                <div key={i} className="group flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {item.step}
                    </div>
                    {i < timeline.length - 1 && (
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

      {/* ── THERAPIES USED ── */}
      <section className="w-full bg-[#F0ECE1] py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-5 lg:col-span-1">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>Modalities</span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                Therapies used in<br />
                <em className="text-[#C8795A]">eating disorder care.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                <AutoLinkedTextClient>{"Every modality we use has been selected for its proven effectiveness with eating disorders and the trauma that underlies them."}</AutoLinkedTextClient>
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
                  <span className="text-xs font-medium text-[#2C3B2E] group-hover:text-[#FAF8F5] transition-colors duration-300 whitespace-nowrap">{therapy.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#C8795A' }}>Common Questions</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Questions about eating disorder treatment
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-[#2C3B2E]' : 'bg-[#F0ECE1]'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full cursor-pointer flex items-center justify-between p-6 text-left"
                >
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

      {/* ── CTA ── */}
      <section className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_ed_cta01.jpg"
              alt="Begin eating disorder recovery at Inner Peak Colorado"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#DDA15E' }}>Begin Your Recovery</span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              You've carried this<br />
              long enough.<br />
              <em style={{ color: ACCENT }}>Let us carry it with you.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"A free, confidential consultation is the only first step. No judgment, no pressure, no commitment required. Our clinical team will listen to your story and help you understand what recovery could look like for you."}</AutoLinkedTextClient>
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
              {['No weight requirements for admission', 'Weight-neutral, non-shaming care', 'Insurance verification before you begin'].map((item, i) => (
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
