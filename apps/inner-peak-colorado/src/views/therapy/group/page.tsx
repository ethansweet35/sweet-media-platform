'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import HeroContactForm from '@/views/home/components/HeroContactForm';

const ACCENT = '#8FA489';

const pillars = [
  {
    num: '01',
    icon: 'ri-group-line',
    title: 'Women-Only, Always',
    desc: 'Every group session is exclusively for women. The level of honesty, vulnerability, and connection that emerges in a women-only space consistently accelerates healing in ways mixed groups cannot replicate.',
  },
  {
    num: '02',
    icon: 'ri-community-line',
    title: 'You Are Not Alone in This',
    desc: 'Group therapy dismantles the isolation that mental health struggles thrive on. Hearing your experience reflected in another woman\'s words is one of the most powerful therapeutic forces there is.',
  },
  {
    num: '03',
    icon: 'ri-book-open-line',
    title: 'Skill-Building, Not Just Sharing',
    desc: 'Our groups combine process work with structured psychoeducation — you leave each session with concrete skills to manage mood, regulate emotion, and navigate relationships.',
  },
];

const sessionAgenda = [
  {
    label: 'Opening',
    duration: '~10 min',
    icon: 'ri-emotion-line',
    desc: 'Grounding practice and brief check-ins from each group member.',
  },
  {
    label: 'Facilitated Work',
    duration: '~50 min',
    icon: 'ri-discuss-line',
    desc: 'Process group, skills practice, or psychoeducation led by your licensed facilitator.',
  },
  {
    label: 'Reflection',
    duration: '~15 min',
    icon: 'ri-feedback-line',
    desc: 'What are you taking away? What landed? Group members share insights.',
  },
  {
    label: 'Closing',
    duration: '~10 min',
    icon: 'ri-leaf-line',
    desc: 'A brief grounding ritual and connection check before logging off.',
  },
];

const groupTypes = [
  {
    icon: 'ri-mental-health-line',
    title: 'Process Groups',
    desc: 'Unstructured space for women to share what\'s alive for them. The facilitator guides the group toward insight and healing through shared reflection.',
  },
  {
    icon: 'ri-scales-3-line',
    title: 'DBT Skills Groups',
    desc: 'Structured sessions teaching emotional regulation, distress tolerance, mindfulness, and interpersonal effectiveness skills.',
  },
  {
    icon: 'ri-book-2-line',
    title: 'Psychoeducation Groups',
    desc: 'Evidence-based education on how mental health conditions develop, how they show up in the body, and what sustains recovery.',
  },
  {
    icon: 'ri-seedling-line',
    title: 'Wellness & Somatic Groups',
    desc: 'Mindfulness, movement, breathwork, and body-based practices that complement clinical therapy and build nervous system resilience.',
  },
];

const isRightFor = [
  'Feeling isolated or like no one truly understands what you\'re going through',
  'Wanting community as part of your healing — not just a therapist',
  'In a Virtual IOP or OP program where group therapy is a core component',
  'Wanting to practice interpersonal skills in a real, supported environment',
  'Looking for accountability and consistency in your recovery',
  'Benefiting from hearing diverse perspectives on shared struggles',
  'Ready to both give and receive support from other women',
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'How many women are in each group?',
    a: 'Our groups typically have 4–8 members to ensure everyone has space to be heard. We intentionally keep groups small.',
  },
  {
    q: 'Is everything shared in group kept confidential?',
    a: 'Confidentiality is a cornerstone of group therapy. Group members agree to strict confidentiality guidelines at the start of every group. Your therapist facilitates and upholds these boundaries.',
  },
  {
    q: 'Can I be in group therapy without individual therapy?',
    a: 'Group therapy is available as part of our Virtual IOP and OP programs, which include both individual and group components. We do not typically offer standalone group therapy without an individual component at this time.',
  },
  {
    q: 'Will I have to share if I\'m not ready?',
    a: 'You are never obligated to share. You can observe, listen, and absorb — and join in when you\'re ready. Many women find that just witnessing others is deeply therapeutic.',
  },
  {
    q: 'What if I don\'t connect with the group dynamic?',
    a: 'We monitor group cohesion closely. If a particular group isn\'t the right fit for you, we work with you to find one that is — or supplement with additional individual sessions.',
  },
  {
    q: 'Are groups scheduled at consistent times?',
    a: 'Yes. Group sessions run on a consistent weekly schedule so you can build rhythm and routine into your recovery. All sessions are fully virtual and accessible anywhere in Colorado.',
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
        <p className="text-sm text-[#3A4A3C]/65 font-light leading-[1.85] pb-5 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function GroupTherapyPage() {
  return (
    <main className="bg-[#FAF8F5]">

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_grp_hero01.jpg"
            alt="Woman in a Colorado home attending a virtual women-only group therapy session on her laptop with Colorado mountains visible"
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
                { label: 'Group Therapy' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mt-8">
              {/* Left: content */}
              <div className="flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Shared Healing
                </span>
                <h1
                  className="font-serif text-[#FAF8F5] leading-[1.1]"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  Group<br />
                  Therapy
                </h1>
                <p className="text-[#FAF8F5]/65 font-light leading-[1.85] text-base max-w-md">
                  A women-only space where shared experience becomes a source of strength. Fully virtual,
                  clinician-led, and built on the radical power of being truly understood by others.
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
                    { icon: 'ri-women-line', label: 'Women Only' },
                    { icon: 'ri-computer-line', label: 'Fully Virtual' },
                    { icon: 'ri-group-line', label: '4–8 Members' },
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
              The Power of Group
            </span>
            <p className="font-serif text-[#2C3B2E] mt-6 leading-[1.7]" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              There is something that happens when a woman hears her own story told by another woman —
              a recognition so deep it bypasses logic. Group therapy creates that. Repeatedly, reliably,
              and in ways that one-on-one work cannot fully replicate.
            </p>
          </div>

          {/* Stat highlights */}
          <div className="mt-14 grid grid-cols-3 gap-5">
            {[
              { num: '4–8', unit: 'women', label: 'per group cohort', icon: 'ri-group-line' },
              { num: '90', unit: 'min', label: 'per group session', icon: 'ri-time-line' },
              { num: '3×', unit: 'weekly', label: 'group meetings per week', icon: 'ri-calendar-check-line' },
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
                <p className="text-xs text-[#3A4A3C]/45 font-light mt-2 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div
            className="mt-12 rounded-2xl p-8"
            style={{ backgroundColor: `${ACCENT}12`, borderLeft: `3px solid ${ACCENT}` }}
          >
            <p className="font-serif italic text-[#2C3B2E] text-lg leading-relaxed">
              "The group became the first place I realized I wasn't broken. I was just carrying too much alone."
            </p>
            <p className="text-xs text-[#3A4A3C]/45 mt-4 uppercase tracking-widest font-light">
              — Reflecting the experience of many women in our program
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
              What makes our group therapy<br className="hidden md:block" /> different
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
                  style={{ backgroundColor: `${ACCENT}18` }}
                >
                  <i className={`${p.icon} text-lg`} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg mb-3 relative z-10">{p.title}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85] relative z-10">{p.desc}</p>
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
              What a 90-minute group looks like
            </h2>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:grid grid-cols-4 gap-0 relative">
            <div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
              style={{ backgroundColor: `${ACCENT}35` }}
            />
            {sessionAgenda.map((step, i) => (
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
                <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden flex flex-col gap-6">
            {sessionAgenda.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ backgroundColor: '#FAF8F5', borderColor: `${ACCENT}45` }}
                  >
                    <i className={`${step.icon} text-base`} style={{ color: ACCENT }} />
                  </div>
                  {i < sessionAgenda.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}25` }} />
                  )}
                </div>
                <div className="pb-6">
                  <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                    {step.duration}
                  </span>
                  <h4 className="font-serif text-[#2C3B2E] text-base mt-0.5 mb-1">{step.label}</h4>
                  <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GROUP TYPES ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              What We Offer
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 leading-[1.15]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              Types of group therapy available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupTypes.map((g, i) => (
              <div
                key={i}
                className="bg-[#FAF8F5] rounded-2xl p-7 flex gap-5"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${ACCENT}18` }}
                >
                  <i className={`${g.icon} text-lg`} style={{ color: ACCENT }} />
                </div>
                <div>
                  <h3 className="font-serif text-[#2C3B2E] text-base mb-2">{g.title}</h3>
                  <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IS IT RIGHT FOR YOU + image ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Is It Right for You?
            </span>
            <h2
              className="font-serif text-[#2C3B2E] mt-3 mb-8 leading-[1.2]"
              style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
            >
              Group therapy may be<br className="hidden md:block" /> the right fit if…
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

          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_grp_feature01.jpg"
              alt="Virtual group therapy session showing four women connected through video, representing the women-only group therapy program at Inner Peak Colorado"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY AS MEDICINE ─── */}
      <section className="w-full bg-[#2C3B2E] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-14 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_grp_cta01.jpg"
              alt="Two women talking warmly together in a Colorado outdoor setting, representing the community and connection formed through group therapy"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Content */}
          <div className="max-w-lg">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Community as Medicine
            </span>
            <h3
              className="font-serif text-[#FAF8F5] mt-4 mb-5 leading-[1.2]"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
            >
              The connections formed here often outlast the program
            </h3>
            <p className="text-[#FAF8F5]/60 font-light leading-[1.85] text-base mb-8">
              Women in our groups frequently describe their cohort as the first community where they
              felt fully known. The shared experience of healing together creates bonds that many
              maintain long after completing the program.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {['Process Groups', 'DBT Skills', 'Psychoeducation', 'Somatic Wellness'].map((m) => (
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
              Find Your Group
              <i className="ri-arrow-right-line" />
            </Link>
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
            Ready to Join?
          </span>
          <h2
            className="font-serif text-[#FAF8F5] mt-4 mb-6 leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)' }}
          >
            Find your group.<br />Find your people.
          </h2>
          <p className="text-[#FAF8F5]/60 font-light leading-[1.85] mb-10 text-base">
            Group therapy at Inner Peak Colorado is available as part of our Virtual IOP and
            Virtual OP programs. An initial assessment helps us match you with the right group and level of care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-85 text-[#FAF8F5]"
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
              { icon: 'ri-time-line', label: 'Weekly Sessions' },
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
