'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import HeroContactForm from '@/views/home/components/HeroContactForm';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const ACCENT = '#DDA15E';

const pillars = [
  {
    num: '01',
    icon: 'ri-heart-2-line',
    title: 'Repair Without Blame',
    desc: 'Family therapy is not about assigning fault. It\'s about helping each person understand their role in the dynamic and learning new ways to show up for each other.',
  },
  {
    num: '02',
    icon: 'ri-chat-voice-line',
    title: 'Communication That Actually Works',
    desc: 'Most families in crisis have communication patterns that accidentally make things worse. We teach concrete tools that break those cycles and replace them with something sustainable.',
  },
  {
    num: '03',
    icon: 'ri-links-line',
    title: 'Integrated with Your Care',
    desc: 'Family sessions are coordinated with your individual therapist so the work is cohesive. Your family is given context for your treatment without disclosing what belongs only in your private sessions.',
  },
];

const sessionFlow = [
  {
    label: 'Orientation',
    duration: '~10 min',
    icon: 'ri-compass-3-line',
    desc: 'The therapist sets a brief agenda and checks in with each person present.',
  },
  {
    label: 'Exploration',
    duration: '~25 min',
    icon: 'ri-search-eye-line',
    desc: 'Understanding the specific dynamic, concern, or pattern that needs attention today.',
  },
  {
    label: 'Skill Practice',
    duration: '~15 min',
    icon: 'ri-tools-line',
    desc: 'Practicing a communication or relational skill together in real time with the therapist.',
  },
  {
    label: 'Planning',
    duration: '~10 min',
    icon: 'ri-road-map-line',
    desc: 'Agreements, intentions, and any follow-up actions for the family before the next session.',
  },
];

const whoParticipates = [
  {
    icon: 'ri-parent-line',
    role: 'Parents & Caregivers',
    desc: 'Understanding how to support a loved one in treatment without enabling or inadvertently adding pressure.',
  },
  {
    icon: 'ri-user-heart-line',
    role: 'Partners & Spouses',
    desc: 'Processing the relational impact of mental health struggles and rebuilding connection and trust.',
  },
  {
    icon: 'ri-team-line',
    role: 'Adult Siblings',
    desc: 'Working through long-standing family dynamics that may be contributing to your mental health.',
  },
  {
    icon: 'ri-user-smile-line',
    role: 'Adult Children',
    desc: 'Repairing the relationship between you and your parent(s) as part of your own recovery.',
  },
];

const isRightFor = [
  'Family relationships that have been strained by your mental health struggles',
  'A loved one who wants to support you but doesn\'t know how',
  'Communication patterns that feel stuck, explosive, or distant',
  'A history of conflict that gets in the way of genuine connection',
  'A family member who may be inadvertently enabling unhealthy patterns',
  'Wanting to help your family understand your experience in a guided setting',
  'Rebuilding trust after treatment has created distance',
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'Does my family member have to attend every session?',
    a: 'No. Family sessions are scheduled strategically — your therapist will help determine when and how often family involvement is clinically appropriate.',
  },
  {
    q: 'What if my family member is resistant to participating?',
    a: 'Resistance is very common. We offer psychoeducation sessions for hesitant family members to help them understand the value before committing to full participation.',
  },
  {
    q: 'Will my private therapy content be shared with my family?',
    a: 'Absolutely not. What you share in individual sessions stays there. Your family therapist (who may be the same clinician) maintains a clear distinction between what\'s shared in family sessions versus private ones.',
  },
  {
    q: 'Is family therapy available for long-distance family members?',
    a: 'Yes. All sessions are virtual, so family members anywhere in the US can participate. No travel is required.',
  },
  {
    q: 'Do we need to have a crisis to benefit from family therapy?',
    a: 'Not at all. Many families use these sessions to build understanding, improve communication, and strengthen relationships proactively — before things reach a breaking point.',
  },
  {
    q: 'Is family therapy covered by insurance?',
    a: 'Coverage varies by plan. We verify your benefits in advance and are transparent about any out-of-pocket costs. Many plans do cover family therapy as part of a mental health treatment program.',
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

export default function FamilyTherapyPage() {
  return (
    <main className="bg-[#FAF8F5]">

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_fam_hero01.jpg"
            alt="Mother and adult daughter sitting close together in a warmly lit Colorado home, representing the healing of family relationships through therapy"
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
                { label: 'Family Therapy' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mt-8">
              {/* Left: content */}
              <div className="flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Relational Healing
                </span>
                <h1
                  className="font-serif text-[#FAF8F5] leading-[1.1]"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  Family<br />
                  Therapy
                </h1>
                <p className="text-[#FAF8F5]/65 font-light leading-[1.85] text-base max-w-md">
                  <AutoLinkedTextClient>{"Healing rarely happens in isolation. Family therapy creates a guided space to repair\n                  relationships, improve communication, and help the people who love you become allies\n                  in your recovery — not obstacles."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-90 text-[#FAF8F5]"
                    style={{ backgroundColor: ACCENT }}
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
                    { icon: 'ri-global-line', label: 'Any Location' },
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
              Why Family
            </span>
            <p className="font-serif text-[#2C3B2E] mt-6 leading-[1.7]" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              <AutoLinkedTextClient>{"Mental health doesn't happen in a vacuum. Your recovery is shaped by the relationships\n              around you — and those relationships are also shaped by your recovery. Family therapy\n              addresses both at once."}</AutoLinkedTextClient>
            </p>
          </div>

          {/* Stat highlights */}
          <div className="mt-14 grid grid-cols-3 gap-5">
            {[
              { num: '60', unit: 'min', label: 'per family session', icon: 'ri-time-line' },
              { num: '100%', unit: 'virtual', label: 'family joins from anywhere', icon: 'ri-global-line' },
              { num: 'Zero', unit: 'judgment', label: 'blame-free environment', icon: 'ri-heart-line' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 text-center border"
                style={{ backgroundColor: `${ACCENT}07`, borderColor: `${ACCENT}20` }}
              >
                <i className={`${s.icon} text-xl mb-3 block`} style={{ color: ACCENT }} />
                <div className="font-serif text-[#2C3B2E] leading-none" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
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
            style={{ backgroundColor: `${ACCENT}10`, borderLeft: `3px solid ${ACCENT}` }}
          >
            <p className="font-serif italic text-[#2C3B2E] text-lg leading-relaxed">
              <AutoLinkedTextClient>{"\"The goal isn't a perfect family. It's a family that knows how to be imperfect together —\n              with honesty, care, and repair.\""}</AutoLinkedTextClient>
            </p>
            <p className="text-xs text-[#3A4A3C]/45 mt-4 uppercase tracking-widest font-light">
              <AutoLinkedTextClient>{"— The guiding principle behind our family therapy approach"}</AutoLinkedTextClient>
            </p>
          </div>
        </div>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Our Approach
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            >
              What makes family therapy<br className="hidden md:block" /> effective here
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.num} className="bg-[#FAF8F5] rounded-2xl p-8 relative overflow-hidden">
                <span
                  className="absolute top-4 right-6 font-serif font-bold leading-none select-none"
                  style={{ fontSize: '88px', color: `${ACCENT}0E` }}
                >
                  {p.num}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: `${ACCENT}18` }}
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
              What a 60-minute family session looks like
            </h2>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            <div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{ backgroundColor: `${ACCENT}35` }}
            />
            {sessionFlow.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center px-4 relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 mb-5 border-2"
                  style={{ backgroundColor: '#FAF8F5', borderColor: `${ACCENT}45` }}
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
            {sessionFlow.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ backgroundColor: '#FAF8F5', borderColor: `${ACCENT}45` }}
                  >
                    <i className={`${step.icon} text-base`} style={{ color: ACCENT }} />
                  </div>
                  {i < sessionFlow.length - 1 && (
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

      {/* ─── WHO PARTICIPATES ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Who Can Join
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              Family therapy is open to your<br className="hidden md:block" /> closest relationships
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whoParticipates.map((w, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-2xl p-7 flex gap-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${ACCENT}18` }}
                >
                  <i className={`${w.icon} text-lg`} style={{ color: ACCENT }} />
                </div>
                <div>
                  <h3 className="font-serif text-[#2C3B2E] text-base mb-2">{w.role}</h3>
                  <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]"><AutoLinkedTextClient>{w.desc}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IS IT RIGHT FOR YOU + image ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_fam_feature01.jpg"
              alt="Woman in a virtual therapy session that includes a family member on screen, representing the connected and healing nature of family therapy at Inner Peak Colorado"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Is It Right for You?
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 mb-8 leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
            >
              Family therapy may be the right<br className="hidden md:block" /> next step if…
            </h2>
            <ul className="flex flex-col gap-3">
              {isRightFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${ACCENT}20` }}
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

      {/* ─── THE BIGGER PICTURE ─── */}
      <section className="w-full bg-[#2C3B2E] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-14 items-center">
          {/* Content */}
          <div className="max-w-lg">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              The Bigger Picture
            </span>
            <h3
              className="font-serif text-[#FAF8F5] mt-4 mb-5 leading-[1.2]"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
            >
              Your recovery changes your relationships — we help those relationships catch up
            </h3>
            <p className="text-[#FAF8F5]/60 font-light leading-[1.85] text-base mb-8">
              <AutoLinkedTextClient>{"As you grow in treatment, the people around you may struggle to understand or keep pace.\n              Family therapy creates the space for that growth to happen together — with a skilled\n              clinician holding the room so every voice is heard."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Family Systems', 'EFT', 'Communication Skills', 'Psychoeducation'].map((m) => (
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-85 text-[#2C3B2E]"
              style={{ backgroundColor: ACCENT }}
            >
              Start the Conversation
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_fam_cta01.jpg"
              alt="Mother and daughter walking together on a Colorado mountain trail at golden hour, representing restored family relationships through therapy"
              fill
              className="object-cover object-center"
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
            Healing your relationships<br />starts with one session
          </h2>
          <p className="text-[#FAF8F5]/60 font-light leading-[1.85] mb-10 text-base">
            <AutoLinkedTextClient>{"Family therapy can begin as soon as you're enrolled in care. Your therapist will recommend\n            the right timing and frequency based on where you are in treatment."}</AutoLinkedTextClient>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-85 text-[#2C3B2E]"
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
              { icon: 'ri-global-line', label: 'Family from Anywhere' },
              { icon: 'ri-time-line', label: 'Flexible Scheduling' },
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
