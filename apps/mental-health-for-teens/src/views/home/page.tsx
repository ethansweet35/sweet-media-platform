'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Design tokens ─────────────────────────────────── */
const DARK  = '#1C3A5C';
const WARM  = '#C47F6A';
const COOL  = '#6B9EB5';
const SAGE  = '#87A892';
const SAND  = '#EAE4D6';
const BG    = '#F5F1EB';
const BODY  = '#3D5268';
const LIGHT = '#F5F1EB';

/* ─── Data ──────────────────────────────────────────── */
const marqueeItems = [
  'Ages 12–17', 'Virtual IOP & OP', 'Insurance Accepted',
  'All of California', 'Evidence-Based Care', 'Family-Inclusive',
  'Start Within 72 Hours', 'CBT · DBT · EMDR',
];

const programs = [
  {
    abbr: 'Virtual IOP',
    name: 'Intensive Outpatient Program',
    color: WARM,
    icon: 'ri-mental-health-line',
    label: 'Most Intensive',
    desc: 'For teens who need more than weekly therapy — without the disruption of residential treatment. Multiple sessions per week with individual, group, and family therapy woven together.',
    includes: ['3–5 days per week', 'Group + individual + family sessions', 'CBT, DBT, EMDR & somatic therapies', 'Peer community with other teens'],
    href: '/levels-of-care',
  },
  {
    abbr: 'Virtual OP',
    name: 'Outpatient Program',
    color: COOL,
    icon: 'ri-calendar-check-line',
    label: 'Flexible Support',
    desc: 'Structured ongoing care for teens stepping down from IOP or who need more than a weekly appointment but haven\'t yet reached IOP intensity.',
    includes: ['1–2 sessions per week', 'Individual & family therapy', 'Smooth transition from IOP', 'Continuous skill development'],
    href: '/levels-of-care',
  },
];

const signs = [
  'Withdrawing from friends and family',
  'Declining grades or refusing school',
  'Persistent sadness, irritability, or rage',
  'Sleep problems or constant exhaustion',
  'Anxiety that disrupts everyday life',
  'Self-critical or hopeless thinking',
  'Risky or self-destructive behavior',
  'Trauma responses or emotional shutdown',
];

const steps = [
  { n: '1', title: 'Reach Out', body: 'Call or message us — no commitment needed. Our intake team listens to what your teen is going through and answers every question honestly.' },
  { n: '2', title: 'Clinical Assessment', body: 'A licensed clinician speaks with you and your teen to understand the full picture and determine the right level of care.' },
  { n: '3', title: 'Begin Care', body: 'We build a personalized plan together. Most families go from first call to first session in 24–72 hours.' },
];

const conditions = [
  'Anxiety & Panic', 'Depression', 'Trauma & PTSD',
  'OCD', 'ADHD & ADD', 'Eating Disorders',
  'Bipolar Disorder', 'Schizoaffective Disorder', 'Insomnia',
];

const testimonials = [
  {
    quote: 'After months of watching our daughter struggle, we finally found something that actually works. The team cares about her as a whole person — not just the diagnosis.',
    name: 'Jennifer M.', role: 'Parent of a 15-year-old',
  },
  {
    quote: 'We tried two therapists before this. The difference with an IOP is real structure and real momentum. My son made more progress in 6 weeks than in an entire year.',
    name: 'David R.', role: 'Parent of a 16-year-old',
  },
  {
    quote: 'I was skeptical about virtual care. Now I see it was actually an advantage — my daughter practiced everything in the same environment where she actually lives.',
    name: 'Sandra K.', role: 'Parent of a 14-year-old',
  },
];

/* ─── Navbar height constant for consistent offsetting ─ */
// utility bar ~36px + main bar 64px = 100px
const NAV_H = 100;

export default function HomePage() {
  const [activeT, setActiveT] = useState(0);
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <main style={{ background: BG }}>

      {/* ════════════════════════════════════════════════
          1. HERO  —  editorial split layout
      ════════════════════════════════════════════════ */}
      <section
        style={{
          background: BG,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: `calc(100vh - ${NAV_H}px)`,
          marginTop: NAV_H,
        }}
        className="grid-cols-1 lg:!grid-cols-[1fr_1fr]"
      >
        {/* Left — content */}
        <div className="flex flex-col justify-center gap-8 px-8 md:px-14 lg:px-20 py-20">

          <div
            className="self-start flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest"
            style={{ background: `${COOL}18`, color: COOL }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: COOL }}></span>
            Now Accepting Clients
          </div>

          <div>
            <h1
              className="leading-[1.07] tracking-tight"
              style={{ fontSize: 'clamp(38px, 5vw, 64px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              Your teen deserves<br />
              more than a weekly<br />
              <span style={{ color: WARM, fontStyle: 'italic' }}>therapy session.</span>
            </h1>
          </div>

          <p className="text-[15px] font-light leading-[1.85] max-w-[440px]" style={{ color: BODY }}>
            Mental Health For Teens provides virtual intensive outpatient care for adolescents ages 12–17 — a clinically proven alternative that delivers the depth and structure weekly therapy alone can't provide.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white transition-all duration-250"
              style={{ background: DARK }}
              onMouseEnter={e => (e.currentTarget.style.background = WARM)}
              onMouseLeave={e => (e.currentTarget.style.background = DARK)}
            >
              Start the Conversation
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              href="/levels-of-care"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-medium border transition-all duration-250"
              style={{ borderColor: `${DARK}28`, color: DARK }}
            >
              See Our Programs
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 pt-4 border-t" style={{ borderColor: `${DARK}10` }}>
            {[['72 hrs', 'avg. to first session'], ['Ages 12–17', 'teen-specific care'], ['California', 'statewide virtual']].map(([top, bot], i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK, fontSize: '17px' }}>{top}</span>
                <span className="text-xs font-light" style={{ color: BODY, opacity: 0.7 }}>{bot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — contained image */}
        <div
          className="relative hidden lg:block"
          style={{ borderBottomLeftRadius: '4rem', overflow: 'hidden' }}
        >
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg"
            alt="Teen and mother overlooking the San Diego coast"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle left blend */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 10%)` }} />
        </div>

        {/* Mobile: full-width image strip */}
        <div className="relative lg:hidden h-72 col-span-1" style={{ overflow: 'hidden' }}>
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg"
            alt="Teen and mother overlooking the San Diego coast"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. MARQUEE — scrolling trust strip
      ════════════════════════════════════════════════ */}
      <div style={{ background: DARK, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="marquee-track flex items-center py-3.5" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 flex-shrink-0">
              <span className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap" style={{ color: 'rgba(245,241,235,0.6)' }}>
                {item}
              </span>
              <span style={{ color: 'rgba(245,241,235,0.2)', fontSize: '10px' }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          3. PROGRAMS — clean two-column cards
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Levels of Care</p>
              <h2
                className="leading-[1.1]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                The right level of support<br />for where your teen is today.
              </h2>
            </div>
            <Link
              href="/levels-of-care"
              className="whitespace-nowrap flex-shrink-0 text-[11px] uppercase tracking-widest font-medium cursor-pointer transition-colors duration-200"
              style={{ color: BODY }}
              onMouseEnter={e => (e.currentTarget.style.color = DARK)}
              onMouseLeave={e => (e.currentTarget.style.color = BODY)}
            >
              Compare programs →
            </Link>
          </div>

          {/* Program cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="flex flex-col rounded-3xl overflow-hidden"
                style={{ background: SAND }}
              >
                {/* Accent header bar */}
                <div className="px-8 py-5 flex items-center justify-between" style={{ background: prog.color }}>
                  <div className="flex items-center gap-3">
                    <i className={`${prog.icon} text-white text-xl`}></i>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-medium text-white/70">{prog.label}</p>
                      <p className="text-sm font-semibold text-white leading-tight">{prog.abbr}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-8 flex flex-col gap-6 flex-1">
                  <div>
                    <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                      {prog.name}
                    </h3>
                    <p className="text-sm font-light leading-[1.85]" style={{ color: BODY }}>{prog.desc}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {prog.includes.map((item, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <i className="ri-check-line text-sm flex-shrink-0" style={{ color: prog.color }}></i>
                        <span className="text-sm font-light" style={{ color: BODY }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={prog.href}
                    className="mt-auto self-start inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                    style={{ color: prog.color }}
                  >
                    Learn More <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Image bar with insurance note */}
          <div className="mt-6 relative rounded-3xl overflow-hidden h-60">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_programs01.jpg"
              alt="Teen in a virtual therapy session"
              fill
              className="object-cover object-center"
            />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${DARK}CC 0%, ${DARK}55 50%, transparent 100%)` }} />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="max-w-sm flex flex-col gap-4">
                <p className="text-white text-base font-light leading-relaxed">
                  Most major insurance plans accepted — we verify your benefits before you make any commitment.
                </p>
                <Link
                  href="/admissions"
                  className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white cursor-pointer transition-all duration-200"
                  style={{ background: WARM }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Verify Insurance →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          4. WHO WE HELP  +  HOW IT WORKS
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Signs column */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>For Parents</p>
              <h2
                className="leading-[1.12] mb-5"
                style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Is your teen struggling<br />to get through the day?
              </h2>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                If you've tried weekly therapy and aren't seeing enough progress — or if things feel too urgent to wait — you're not alone, and there are better options available.
              </p>
            </div>

            {/* Signs list */}
            <div className="flex flex-col" style={{ borderTop: `1px solid ${DARK}12` }}>
              {signs.map((sign, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: `1px solid ${DARK}10` }}
                >
                  <span
                    className="text-sm font-bold w-6 flex-shrink-0 text-right"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${WARM}70` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-light" style={{ color: BODY }}>{sign}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl" style={{ background: BG }}>
              <p className="text-sm font-light leading-relaxed mb-4" style={{ color: BODY }}>
                You don't need a formal diagnosis to reach out. If something feels wrong, that's reason enough to call. Our team will help you make sense of what you're seeing.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                style={{ color: WARM }}
              >
                Talk to Our Team →
              </Link>
            </div>
          </div>

          {/* How it works column */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Getting Started</p>
              <h2
                className="leading-[1.12]"
                style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                From first call<br />to first session.
              </h2>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-6 rounded-2xl"
                  style={{ background: BG }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                    style={{ background: COOL, fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {step.n}
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h4 className="font-semibold text-base" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                      {step.title}
                    </h4>
                    <p className="text-sm font-light leading-[1.8]" style={{ color: BODY }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white cursor-pointer transition-all duration-200 mt-2"
              style={{ background: DARK }}
              onMouseEnter={e => (e.currentTarget.style.background = WARM)}
              onMouseLeave={e => (e.currentTarget.style.background = DARK)}
            >
              Start the Conversation
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. CONDITIONS
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">

            <div className="flex flex-col gap-5">
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>Specializations</p>
              <h2
                className="leading-[1.1]"
                style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Conditions we treat in teens.
              </h2>
              <p className="text-sm font-light leading-[1.85]" style={{ color: BODY }}>
                Our clinicians are trained in how each of these conditions presents specifically in adolescents — and the most effective approaches for this age group.
              </p>
              <Link
                href="/what-we-treat"
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-all duration-200 border"
                style={{ borderColor: `${DARK}22`, color: DARK }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = DARK;
                  (e.currentTarget as HTMLElement).style.color = LIGHT;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = DARK;
                }}
              >
                What We Treat →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {conditions.map((c, i) => {
                const accent = [WARM, COOL, SAGE][i % 3];
                return (
                  <Link
                    href="/what-we-treat"
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 group"
                    style={{ background: SAND }}
                    onMouseEnter={e => (e.currentTarget.style.background = DARK)}
                    onMouseLeave={e => (e.currentTarget.style.background = SAND)}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }}></span>
                    <span className="text-sm font-medium leading-tight" style={{ color: DARK }}>
                      {c}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          6. TESTIMONIALS
      ════════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-center">

          {/* Photo */}
          <div className="relative h-72 lg:h-96 rounded-3xl overflow-hidden flex-shrink-0">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_testimonial01.jpg"
              alt="Parent testimonial"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Quote */}
          <div className="flex flex-col gap-6">
            <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>From Our Families</p>

            {/* Testimonial display */}
            <div className="relative" style={{ minHeight: '200px' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-5 absolute inset-0 transition-all duration-500"
                  style={{ opacity: activeT === i ? 1 : 0, pointerEvents: activeT === i ? 'auto' : 'none' }}
                >
                  <i className="ri-double-quotes-l text-4xl" style={{ color: `${WARM}30` }}></i>
                  <p
                    className="font-serif italic leading-[1.6]"
                    style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: DARK }}>— {t.name}</p>
                    <p className="text-xs font-light mt-0.5" style={{ color: BODY }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot nav */}
            <div className="flex gap-2 mt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveT(i)}
                  className="h-1.5 rounded-full cursor-pointer transition-all duration-300"
                  style={{ width: activeT === i ? '28px' : '8px', background: activeT === i ? WARM : `${DARK}20` }}
                />
              ))}
            </div>

            {/* Insurance note */}
            <div className="p-6 rounded-2xl mt-2" style={{ background: BG }}>
              <p className="text-sm font-light leading-relaxed" style={{ color: BODY }}>
                <span className="font-semibold" style={{ color: DARK }}>Insurance accepted.</span> We work with most major insurance providers and verify your teen's benefits before any commitment.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200 mt-3"
                style={{ color: COOL }}
              >
                Verify Benefits →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          7. CTA
      ════════════════════════════════════════════════ */}
      <section style={{ background: DARK }}>

        {/* Coastal image strip */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_cta01.jpg"
            alt="Teen walking along the coast at golden hour"
            fill
            className="object-cover object-[center_35%]"
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${DARK} 100%)` }} />
        </div>

        {/* CTA content */}
        <div className="py-20 px-6 md:px-12 flex flex-col items-center text-center gap-8">
          <div className="max-w-2xl flex flex-col items-center gap-6">
            <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Take the First Step</p>
            <h2
              className="text-white leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Your teen's story doesn't<br />have to stay this hard.
            </h2>
            <p className="text-[15px] font-light leading-[1.85] max-w-lg" style={{ color: 'rgba(245,241,235,0.65)' }}>
              A free, no-pressure consultation is the only first step. Our intake team will listen, answer every question honestly, and help you understand what's possible — with no commitment required.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white transition-all duration-250"
              style={{ background: WARM }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Free Consultation
              <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href="tel:+16190000000"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-medium text-white border transition-all duration-250"
              style={{ borderColor: 'rgba(245,241,235,0.22)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.22)')}
            >
              <i className="ri-phone-line"></i>(619) 000-0000
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {['No diagnosis required to reach out', 'Insurance verified before you commit', 'Most teens start within 72 hours'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <i className="ri-check-line text-sm" style={{ color: SAGE }}></i>
                <span className="text-sm font-light" style={{ color: 'rgba(245,241,235,0.55)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
