'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import HeroContactForm from '@/views/home/components/HeroContactForm';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#C8795A';

const pillars = [
  {
    num: '01',
    icon: 'ri-user-heart-line',
    title: 'Fully Tailored to You',
    desc: 'Your treatment plan is built around your clinical history, personal goals, and lived experience — not a template. Every session adapts as you evolve.',
  },
  {
    num: '02',
    icon: 'ri-lock-password-line',
    title: 'Confidential & Judgment-Free',
    desc: 'Individual therapy is the one space where you can be entirely unfiltered. Nothing shared in your sessions leaves your care team without your consent.',
  },
  {
    num: '03',
    icon: 'ri-brain-line',
    title: 'Evidence-Based Modalities',
    desc: 'Your therapist draws from CBT, DBT, EMDR, ACT, and somatic approaches — selecting what fits your specific presentation, adjusting as you progress.',
  },
];

const sessionSteps = [
  {
    label: 'Check-In',
    duration: '~5 min',
    icon: 'ri-emotion-line',
    desc: 'How are you feeling right now? What\'s come up since last session?',
  },
  {
    label: 'Core Work',
    duration: '~30 min',
    icon: 'ri-focus-3-line',
    desc: 'Deep therapeutic exploration — processing, skill-building, or trauma work.',
  },
  {
    label: 'Integration',
    duration: '~10 min',
    icon: 'ri-leaf-line',
    desc: 'Grounding what was processed and connecting insights to daily life.',
  },
  {
    label: 'Closing',
    duration: '~5 min',
    icon: 'ri-anchor-line',
    desc: 'A plan for the week ahead and any between-session supports you may need.',
  },
];

const isRightFor = [
  'Anxiety, panic, or persistent worry disrupting daily life',
  'Depression, low mood, or difficulty finding meaning',
  'Trauma history affecting relationships or emotional regulation',
  'Eating or body image concerns you haven\'t been able to address alone',
  'Life transitions — career, relationships, motherhood, identity',
  'A sense that something is wrong but you can\'t quite name it',
  'A desire to understand yourself more deeply',
  'Wanting a private, dedicated space outside of group therapy',
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'How often will I meet with my therapist?',
    a: 'Most clients begin with one 50-minute session per week. Frequency may adjust based on your clinical needs and goals as treatment progresses.',
  },
  {
    q: 'Is individual therapy available on its own, or only within a program?',
    a: 'Individual therapy is available as a standalone service and as a core component of our Virtual IOP and Virtual OP programs. We\'ll recommend the right level of care during your initial assessment.',
  },
  {
    q: 'Will my therapist coordinate with other providers?',
    a: 'Yes, with your consent. Your therapist can coordinate with psychiatrists, dietitians, and other members of your care team to ensure a fully integrated approach.',
  },
  {
    q: 'Do you accept insurance for individual therapy?',
    a: 'We verify your benefits prior to your first session and walk you through your coverage. Many plans cover virtual therapy at little or no out-of-pocket cost.',
  },
  {
    q: 'What if I don\'t connect with my assigned therapist?',
    a: 'We take therapeutic fit seriously. If you feel your therapist isn\'t the right match, we will reassign you — no awkward conversations required.',
  },
  {
    q: 'Can I do individual therapy alongside group therapy?',
    a: 'Absolutely. Individual and group therapy complement each other naturally — individual sessions provide depth and privacy; group sessions provide community and shared perspective.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2C3B2E]/10">
      <button
        className="w-full text-left flex items-start justify-between gap-4 py-5 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-serif text-[#2C3B2E] text-sm leading-relaxed pr-4">{q}</span>
        <i className={`ri-${open ? 'subtract' : 'add'}-line text-lg flex-shrink-0 mt-0.5`} style={{ color: ACCENT }} />
      </button>
      {open && (
        <p className="text-sm text-[#3A4A3C]/65 font-light leading-[1.85] pb-5 pr-8"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>
      )}
    </div>
  );
}

export default function IndividualTherapyPage() {
  return (
    <main className="bg-[#FAF8F5]">

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_ind_hero01.jpg"
            alt="Woman in a serene Colorado home engaging in a virtual individual therapy session with mountains in the background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/95 via-[#2C3B2E]/75 to-[#2C3B2E]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C3B2E]/25 via-transparent to-[#2C3B2E]/20" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pt-28 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'Therapy', path: '/therapy' },
                { label: 'Individual Therapy' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mt-8">
              {/* Left: content */}
              <div className="flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  One-on-One Care
                </span>
                <h1
                  className="font-serif text-[#FAF8F5] leading-[1.1]"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  Individual<br />
                  Therapy
                </h1>
                <p className="text-[#FAF8F5]/65 font-light leading-[1.85] text-base max-w-md">
                  <AutoLinkedTextClient>{"A private, protected space between you and your licensed therapist. Completely virtual,\n                  exclusively yours — designed for the complexity of a woman's inner life."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: ACCENT, color: '#FAF8F5' }}
                  >
                    Get Started
                    <i className="ri-arrow-right-line" />
                  </Link>
                  <a
                    href="tel:+17197338556"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5]/80 text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-all duration-300"
                  >
                    <i className="ri-phone-line" />
                    719-733-8556
                  </a>
                </div>
                <div className="flex flex-wrap gap-5 pt-2">
                  {[
                    { icon: 'ri-computer-line', label: 'Fully Virtual' },
                    { icon: 'ri-women-line', label: 'Women Only' },
                    { icon: 'ri-shield-check-line', label: 'HIPAA Secure' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2 text-[#FAF8F5]/50">
                      <i className={`${b.icon} text-sm`} style={{ color: ACCENT }} />
                      <span className="text-[11px] font-light tracking-wide">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: contact form */}
              <div className="hidden md:block">
                <HeroContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL INTRO ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              What It Is
            </span>
            <p className="font-serif text-[#2C3B2E] mt-6 leading-[1.7]" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              <AutoLinkedTextClient>{"Individual therapy is structured, intentional, and clinical — but it doesn't feel that way.\n              It feels like finally being heard. Like having a guide who knows your full story and\n              helps you make meaning of it, one session at a time."}</AutoLinkedTextClient>
            </p>
          </div>

          {/* Stat highlights */}
          <div className="mt-14 grid grid-cols-3 gap-5">
            {[
              { num: '50', unit: 'min', label: 'per session', icon: 'ri-time-line' },
              { num: '1×', unit: 'weekly', label: 'consistent cadence', icon: 'ri-calendar-check-line' },
              { num: '72', unit: 'hrs', label: 'avg. time to first session', icon: 'ri-rocket-line' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 text-center border"
                style={{ backgroundColor: `${ACCENT}07`, borderColor: `${ACCENT}20` }}
              >
                <i className={`${s.icon} text-xl mb-3 block`} style={{ color: ACCENT }} />
                <div className="font-serif text-[#2C3B2E] leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                  {s.num}
                  <span className="text-sm font-light ml-1 opacity-50">{s.unit}</span>
                </div>
                <p className="text-xs text-[#3A4A3C]/45 font-light mt-2 leading-relaxed"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div
            className="mt-12 rounded-2xl p-8"
            style={{ backgroundColor: `${ACCENT}0D`, borderLeft: `3px solid ${ACCENT}` }}
          >
            <p className="font-serif italic text-[#2C3B2E] text-lg leading-relaxed">
              <AutoLinkedTextClient>{"\"The most healing thing is not the technique. It's the relationship — the experience of\n              being fully known and not abandoned.\""}</AutoLinkedTextClient>
            </p>
            <p className="text-xs text-[#3A4A3C]/45 mt-4 uppercase tracking-widest font-light">
              <AutoLinkedTextClient>{"— The foundation of our individual therapy approach"}</AutoLinkedTextClient>
            </p>
          </div>
        </div>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Why It Works
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            >
              What makes Inner Peak individual<br className="hidden md:block" /> therapy different
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.num} className="bg-[#FAF8F5] rounded-2xl p-8 relative overflow-hidden">
                <span
                  className="absolute top-4 right-6 font-serif font-bold leading-none select-none"
                  style={{ fontSize: '88px', color: `${ACCENT}0F` }}
                >
                  {p.num}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  <i className={`${p.icon} text-lg`} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg mb-3 relative z-10">{p.title}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85] relative z-10"><AutoLinkedTextClient>{p.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SESSION FLOW ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Inside a Session
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              What 50 minutes looks like
            </h2>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            <div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{ backgroundColor: `${ACCENT}30` }}
            />
            {sessionSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 mb-5 border-2"
                  style={{ backgroundColor: '#FAF8F5', borderColor: `${ACCENT}40` }}
                >
                  <i className={`${step.icon} text-xl`} style={{ color: ACCENT }} />
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.25em] font-medium mb-1"
                  style={{ color: ACCENT }}
                >
                  {step.duration}
                </span>
                <h4 className="font-serif text-[#2C3B2E] text-base mb-2">{step.label}</h4>
                <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed"><AutoLinkedTextClient>{step.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col gap-6">
            {sessionSteps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ backgroundColor: '#FAF8F5', borderColor: `${ACCENT}40` }}
                  >
                    <i className={`${step.icon} text-base`} style={{ color: ACCENT }} />
                  </div>
                  {i < sessionSteps.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}25` }} />
                  )}
                </div>
                <div className="pb-6">
                  <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                    {step.duration}
                  </span>
                  <h4 className="font-serif text-[#2C3B2E] text-base mt-0.5 mb-1">{step.label}</h4>
                  <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed"><AutoLinkedTextClient>{step.desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IS IT RIGHT FOR YOU ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_ind_feature01.jpg"
              alt="Compassionate therapist visible on a virtual therapy session, warm and present — representing the one-on-one connection of individual therapy"
              fill
              className="object-cover"
            />
          </div>

          {/* Checklist */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Is It Right for You?
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 mb-8 leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
            >
              Individual therapy may be<br className="hidden md:block" /> a good fit if…
            </h2>
            <ul className="flex flex-col gap-3">
              {isRightFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${ACCENT}18` }}
                  >
                    <i className="ri-check-line text-[10px]" style={{ color: ACCENT }} />
                  </span>
                  <span className="text-sm text-[#3A4A3C]/70 font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/admissions"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: '#2C3B2E' }}
            >
              Start Your Assessment
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── OUR APPROACH ─── */}
      <section className="w-full bg-[#2C3B2E] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-14 items-center">
          {/* Content */}
          <div className="max-w-lg">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Our Approach
            </span>
            <h3
              className="font-serif text-[#FAF8F5] mt-4 mb-5 leading-[1.2]"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
            >
              Relational, trauma-informed, and always collaborative
            </h3>
            <p className="text-[#FAF8F5]/60 font-light leading-[1.85] text-base mb-8">
              <AutoLinkedTextClient>{"We believe healing happens in relationship. Your therapist brings clinical expertise and\n              genuine presence — and you always remain the expert on your own experience. Sessions are\n              never one-size-fits-all; they adapt to what you need that week."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['CBT', 'DBT', 'EMDR', 'ACT', 'Somatic Experiencing'].map((m) => (
                <span
                  key={m}
                  className="px-4 py-2 rounded-full text-xs uppercase tracking-wider border"
                  style={{ borderColor: `${ACCENT}45`, color: `${ACCENT}` }}
                >
                  {m}
                </span>
              ))}
            </div>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: ACCENT }}
            >
              Begin Your Journey
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_ind_cta01.jpg"
              alt="Woman sitting peacefully in a Colorado home after an individual therapy session, looking calm and resolved"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Questions
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
            >
              Frequently asked
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            <div>
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
            <div>
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="w-full bg-[#2C3B2E] py-20 px-8 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
            Ready to Begin?
          </span>
          <h2
            className="font-serif text-[#FAF8F5] mt-4 mb-6 leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)' }}
          >
            Your first session is closer than you think
          </h2>
          <p className="text-[#FAF8F5]/60 font-light leading-[1.85] mb-10 text-base">
            <AutoLinkedTextClient>{"Call us, complete our online form, or request an insurance verification. We respond same day\n            and can typically schedule your first session within 72 hours."}</AutoLinkedTextClient>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: ACCENT }}
            >
              Start Admissions
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/25 text-[#FAF8F5]/75 text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5]/50 hover:text-[#FAF8F5] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 pt-10 border-t border-[#FAF8F5]/10">
            {[
              { icon: 'ri-map-pin-line', label: 'Colorado Only' },
              { icon: 'ri-time-line', label: '72-Hour Start' },
              { icon: 'ri-shield-check-line', label: 'Insurance Accepted' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-[#FAF8F5]/40">
                <i className={`${b.icon} text-xs`} style={{ color: ACCENT }} />
                <span className="text-xs font-light tracking-wide">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
