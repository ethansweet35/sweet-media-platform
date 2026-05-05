'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ── Brand tokens ── */
const DARK  = '#1C3A5C';
const WARM  = '#C47F6A';
const COOL  = '#6B9EB5';
const SAGE  = '#87A892';
const SAND  = '#EAE4D6';
const BG    = '#F5F1EB';
const MUTED = '#5C7A8E';

/* ── Data ── */
const marqueeItems = [
  { icon: 'ri-user-heart-line',    label: 'Ages 12–17' },
  { icon: 'ri-wifi-line',          label: 'Fully Virtual' },
  { icon: 'ri-shield-check-line',  label: 'Insurance Accepted' },
  { icon: 'ri-map-pin-2-line',     label: 'All of California' },
  { icon: 'ri-microscope-line',    label: 'Evidence-Based' },
  { icon: 'ri-heart-pulse-line',   label: 'Virtual IOP & OP' },
  { icon: 'ri-time-line',          label: 'Start Within 72 Hours' },
  { icon: 'ri-group-line',         label: 'Family-Inclusive' },
];

const programs = [
  {
    abbr: 'Virtual IOP',
    name: 'Intensive Outpatient Program',
    tagColor: WARM,
    icon: 'ri-mental-health-line',
    intensity: 'Most Intensive',
    desc: 'For teens who need more than weekly therapy — without disrupting school or home life. Multiple sessions per week combining individual, group, and family modalities.',
    specs: [
      { icon: 'ri-calendar-2-line', text: '3–5 days per week' },
      { icon: 'ri-group-line',      text: 'Peer group + individual + family' },
      { icon: 'ri-brain-line',      text: 'CBT, DBT, EMDR & somatic' },
      { icon: 'ri-home-heart-line', text: 'From home, on their schedule' },
    ],
    href: '/levels-of-care',
  },
  {
    abbr: 'Virtual OP',
    name: 'Outpatient Program',
    tagColor: COOL,
    icon: 'ri-calendar-check-line',
    intensity: 'Flexible Support',
    desc: 'Ongoing, structured care for teens stepping down from IOP or who need more than a standard weekly appointment.',
    specs: [
      { icon: 'ri-calendar-2-line', text: '1–2 sessions per week' },
      { icon: 'ri-user-line',       text: 'Individual & family therapy' },
      { icon: 'ri-arrow-down-line', text: 'Smooth step-down from IOP' },
      { icon: 'ri-refresh-line',    text: 'Continuous skill development' },
    ],
    href: '/levels-of-care',
  },
];

const signs = [
  'Withdrawal from friends and family',
  'Declining grades or school refusal',
  'Persistent sadness, irritability, or rage',
  'Sleep problems or chronic exhaustion',
  'Anxiety that disrupts daily life',
  'Self-critical or hopeless thinking',
  'Risky behaviors or emotional volatility',
  'Trauma responses or dissociation',
];

const steps = [
  { n: '01', title: 'Reach out', body: 'A call or quick message. No commitment. Our intake team listens without judgment and helps you understand what your teen needs.' },
  { n: '02', title: 'Assessment', body: 'A licensed clinician speaks with you and your teen to build the full picture and determine the right level of care.' },
  { n: '03', title: 'Begin care', body: 'A personalized treatment plan is built together. Most families go from first call to first session within 24–72 hours.' },
];

const conditions = [
  { label: 'Anxiety & Panic',    color: COOL },
  { label: 'Depression',         color: WARM },
  { label: 'Trauma & PTSD',      color: SAGE },
  { label: 'OCD',                color: COOL },
  { label: 'ADHD & ADD',         color: WARM },
  { label: 'Eating Disorders',   color: SAGE },
  { label: 'Bipolar Disorder',   color: COOL },
  { label: 'Schizoaffective',    color: WARM },
  { label: 'Insomnia',           color: SAGE },
];

const testimonials = [
  {
    quote: 'After months of watching our daughter struggle, we finally found something that actually works. The team cares about her as a person — not just her diagnosis.',
    name: 'Jennifer M.',
    role: 'Parent of a 15-year-old',
  },
  {
    quote: 'We tried two different therapists before this. The difference with an IOP is real structure and real momentum. My son made more progress in 6 weeks than in an entire year.',
    name: 'David R.',
    role: 'Parent of a 16-year-old',
  },
  {
    quote: 'I was skeptical about virtual care. Now I see it was actually an advantage — my daughter practiced everything she was learning in the same environment where she actually lives.',
    name: 'Sandra K.',
    role: 'Parent of a 14-year-old',
  },
];

export default function HomePage() {
  const [activeT, setActiveT] = useState(0);
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <main style={{ background: BG }}>

      {/* ────────────────────────────────────────────────
          HERO — editorial split: content left / image right
      ──────────────────────────────────────────────── */}
      <section
        className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] overflow-hidden"
        style={{ background: BG }}
      >
        {/* Left: content */}
        <div className="flex flex-col justify-center gap-8 px-8 md:px-14 lg:px-20 pt-40 pb-16 lg:py-0">
          {/* Badge */}
          <div
            className="self-start flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-medium uppercase tracking-widest"
            style={{ background: `${COOL}18`, color: COOL }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COOL }}></span>
            Accepting New Clients · San Diego, CA
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-1">
            <h1
              className="leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              Your teen deserves<br />
              more than a<br />
            </h1>
            <h1
              className="leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: WARM, fontStyle: 'italic' }}
            >
              weekly session.
            </h1>
          </div>

          <p className="text-base font-light leading-[1.9] max-w-md" style={{ color: MUTED }}>
            Mental Health For Teens offers virtual intensive outpatient care — a clinically proven
            alternative to traditional therapy that provides the structure and depth adolescents
            actually need to heal.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white transition-all duration-300"
              style={{ background: DARK }}
              onMouseEnter={e => (e.currentTarget.style.background = WARM)}
              onMouseLeave={e => (e.currentTarget.style.background = DARK)}
            >
              Start the Conversation
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              href="/levels-of-care"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-medium border transition-all duration-300"
              style={{ borderColor: `${DARK}30`, color: DARK }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = DARK;
                (e.currentTarget as HTMLElement).style.color = '#F5F1EB';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = DARK;
              }}
            >
              How It Works
            </Link>
          </div>

          {/* Quick stats row */}
          <div className="flex gap-8 pt-2 border-t" style={{ borderColor: `${DARK}12` }}>
            {[['72 hrs', 'to first session'], ['Ages', '12–17'], ['All of', 'California']].map(([top, bot], i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-serif font-bold text-lg" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>{top}</span>
                <span className="text-xs font-light" style={{ color: MUTED }}>{bot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image — contained, artistic crop */}
        <div
          className="relative h-72 lg:h-auto overflow-hidden"
          style={{ borderRadius: '0 0 0 5rem' }}
        >
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg"
            alt="Teen and mother overlooking the San Diego coast"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
          {/* Subtle left-edge blend into bg */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{ background: `linear-gradient(to right, ${BG} 0%, transparent 12%)` }}
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          MARQUEE — scrolling trust strip
      ──────────────────────────────────────────────── */}
      <div style={{ background: DARK, overflow: 'hidden' }}>
        <div className="flex items-center py-4 marquee-track" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-8 flex-shrink-0">
              <i className={`${item.icon} text-sm`} style={{ color: COOL }}></i>
              <span className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap" style={{ color: 'rgba(245,241,235,0.65)' }}>
                {item.label}
              </span>
              <span className="text-xs" style={{ color: 'rgba(245,241,235,0.2)' }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          BOLD STATEMENT — coral background
      ──────────────────────────────────────────────── */}
      <section className="w-full py-28 px-8 md:px-16 text-center" style={{ background: WARM }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-7 items-center">
          <i className="ri-double-quotes-l text-5xl" style={{ color: 'rgba(245,241,235,0.3)' }}></i>
          <p
            className="font-serif italic leading-[1.35] text-white"
            style={{ fontSize: 'clamp(26px, 4vw, 52px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Traditional weekly therapy has its place. For teens who are truly struggling, it is rarely enough.
          </p>
          <div className="w-12 h-px" style={{ background: 'rgba(245,241,235,0.4)' }}></div>
          <p className="text-base font-light leading-relaxed max-w-xl" style={{ color: 'rgba(245,241,235,0.8)' }}>
            Our intensive programs provide the clinical depth, peer connection, and structured support
            that actually creates lasting change — without residential treatment or disrupting school.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
            style={{ color: 'rgba(245,241,235,0.9)' }}
          >
            Our Mission
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          PROGRAMS — two cards with embedded visual
      ──────────────────────────────────────────────── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Levels of Care</p>
              <h2
                className="leading-[1.1]"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                The right level of support<br />for where your teen is.
              </h2>
            </div>
            <Link
              href="/levels-of-care"
              className="whitespace-nowrap flex-shrink-0 cursor-pointer inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-medium transition-colors duration-300"
              style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = DARK)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              Compare programs
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {programs.map((prog, i) => (
              <Link
                key={i}
                href={prog.href}
                className="group flex flex-col gap-0 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{ background: SAND }}
              >
                {/* Card top bar */}
                <div className="flex items-center justify-between px-8 py-5" style={{ background: prog.tagColor }}>
                  <div className="flex items-center gap-3">
                    <i className={`${prog.icon} text-xl text-white`}></i>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-medium text-white/70">{prog.intensity}</p>
                      <p className="text-sm font-semibold text-white">{prog.abbr}</p>
                    </div>
                  </div>
                  <i className="ri-arrow-right-up-line text-white/60 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                </div>

                {/* Card body */}
                <div className="flex flex-col gap-6 p-8">
                  <div>
                    <h3
                      className="text-xl mb-3"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
                    >
                      {prog.name}
                    </h3>
                    <p className="text-sm font-light leading-[1.85]" style={{ color: MUTED }}>{prog.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {prog.specs.map((s, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${prog.tagColor}18` }}>
                          <i className={`${s.icon} text-xs`} style={{ color: prog.tagColor }}></i>
                        </div>
                        <span className="text-sm font-light" style={{ color: MUTED }}>{s.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Programs image bar */}
          <div className="mt-5 relative rounded-3xl overflow-hidden h-64">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_programs01.jpg"
              alt="Teen in a virtual therapy session at home"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${DARK}80 0%, transparent 55%)` }} />
            <div className="absolute inset-0 flex items-center px-10">
              <div className="max-w-sm flex flex-col gap-4">
                <p className="text-white font-light text-base leading-relaxed">
                  Insurance accepted — we verify your teen's benefits before you make any commitment.
                </p>
                <Link
                  href="/admissions"
                  className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer text-white"
                  style={{ background: 'rgba(245,241,235,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(245,241,235,0.25)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = WARM)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,241,235,0.15)')}
                >
                  Verify Insurance
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          WHO WE HELP — signs + image
      ──────────────────────────────────────────────── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>For Parents</p>
              <h2
                className="leading-[1.1]"
                style={{ fontSize: 'clamp(28px, 3.8vw, 46px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Is your teen struggling<br />to get through the day?
              </h2>
              <p className="text-base font-light leading-[1.9]" style={{ color: MUTED }}>
                If you've tried weekly therapy and aren't seeing enough progress — or if things feel too urgent to wait — you're not alone.
              </p>
            </div>

            {/* Signs as numbered rows */}
            <div className="flex flex-col">
              {signs.map((sign, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 py-4 transition-colors duration-200"
                  style={{ borderBottom: `1px solid ${DARK}10` }}
                >
                  <span
                    className="font-serif font-bold text-lg flex-shrink-0 w-8 text-right"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${WARM}60` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-light leading-snug" style={{ color: MUTED }}>{sign}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: BG }}
            >
              <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>
                You don't need a diagnosis to reach out. If something feels wrong, that's enough reason to call. Our team will help you make sense of what you're seeing.
              </p>
              <Link
                href="/contact"
                className="self-start inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer"
                style={{ color: WARM }}
              >
                Talk to Our Team
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          {/* HOW IT WORKS — embedded in right column */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ background: DARK }}
            >
              <div className="p-8 flex flex-col gap-2">
                <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Getting Started</p>
                <h3
                  className="text-white"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  From first call to first session in three steps.
                </h3>
              </div>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="px-8 py-6 flex gap-5 items-start"
                  style={{ borderTop: '1px solid rgba(245,241,235,0.08)' }}
                >
                  <span
                    className="font-serif font-bold text-3xl flex-shrink-0 leading-none"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${COOL}50` }}
                  >
                    {step.n}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4
                      className="font-serif text-white text-base"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-sm font-light leading-[1.8]" style={{ color: 'rgba(245,241,235,0.55)' }}>{step.body}</p>
                  </div>
                </div>
              ))}
              <div className="px-8 py-6" style={{ borderTop: '1px solid rgba(245,241,235,0.08)' }}>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white cursor-pointer transition-all duration-300"
                  style={{ background: WARM }}
                  onMouseEnter={e => (e.currentTarget.style.background = COOL)}
                  onMouseLeave={e => (e.currentTarget.style.background = WARM)}
                >
                  Start the Conversation
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          CONDITIONS — staggered dot grid
      ──────────────────────────────────────────────── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-start">
            <div className="flex flex-col gap-5 lg:max-w-xs">
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>Specializations</p>
              <h2
                className="leading-[1.1]"
                style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Conditions we specialize in.
              </h2>
              <p className="text-sm font-light leading-[1.85]" style={{ color: MUTED }}>
                Our clinicians specialize in adolescent-specific presentations of each condition and the unique ways they show up during the teen years.
              </p>
              <Link
                href="/what-we-treat"
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold border cursor-pointer transition-all duration-300"
                style={{ borderColor: `${DARK}25`, color: DARK }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = DARK;
                  (e.currentTarget as HTMLElement).style.color = '#F5F1EB';
                  (e.currentTarget as HTMLElement).style.borderColor = DARK;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = DARK;
                  (e.currentTarget as HTMLElement).style.borderColor = `${DARK}25`;
                }}
              >
                What We Treat
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {conditions.map((c, i) => (
                <Link
                  href="/what-we-treat"
                  key={i}
                  className="group flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300"
                  style={{ background: SAND }}
                  onMouseEnter={e => (e.currentTarget.style.background = DARK)}
                  onMouseLeave={e => (e.currentTarget.style.background = SAND)}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-300"
                    style={{ background: c.color }}
                  ></span>
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: DARK }}
                    ref={el => {
                      if (!el) return;
                      el.parentElement?.addEventListener('mouseenter', () => (el.style.color = '#F5F1EB'));
                      el.parentElement?.addEventListener('mouseleave', () => (el.style.color = DARK));
                    }}
                  >
                    {c.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          TESTIMONIALS — large centered quote
      ──────────────────────────────────────────────── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: SAND }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-center">
            {/* Portrait */}
            <div className="relative h-64 lg:h-80 rounded-3xl overflow-hidden flex-shrink-0">
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_testimonial01.jpg"
                alt="Parent testimonial"
                fill
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Quote */}
            <div className="flex flex-col gap-6">
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>From Our Families</p>

              <div className="relative min-h-[180px]">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-5 transition-all duration-500 absolute inset-0"
                    style={{ opacity: activeT === i ? 1 : 0, pointerEvents: activeT === i ? 'auto' : 'none' }}
                  >
                    <i className="ri-double-quotes-l text-4xl" style={{ color: `${WARM}35` }}></i>
                    <p
                      className="font-serif italic leading-[1.6]"
                      style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
                    >
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: DARK }}>— {t.name}</p>
                      <p className="text-xs font-light" style={{ color: MUTED }}>{t.role}</p>
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
                    style={{
                      width: activeT === i ? '28px' : '8px',
                      background: activeT === i ? WARM : `${DARK}20`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          CTA — full width, wave top, centered
      ──────────────────────────────────────────────── */}
      <section style={{ background: DARK, position: 'relative' }}>
        {/* Wave from sandy section */}
        <div className="w-full overflow-hidden leading-none" style={{ marginTop: '-1px' }}>
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,0 L0,0 Z"
              fill={SAND}
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 flex flex-col items-center gap-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Take the First Step</p>
          <h2
            className="text-white leading-[1.1]"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Your teen's story doesn't<br />
            have to stay this hard.
          </h2>
          <p className="text-base font-light leading-relaxed max-w-lg" style={{ color: 'rgba(245,241,235,0.65)' }}>
            A free, no-pressure consultation is the only first step. Our intake team will listen, answer your questions honestly, and help you understand what's possible — with no commitment required.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white transition-all duration-300"
              style={{ background: WARM }}
              onMouseEnter={e => (e.currentTarget.style.background = COOL)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Free Consultation
              <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href="tel:+16190000000"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-medium text-white border transition-all duration-300"
              style={{ borderColor: 'rgba(245,241,235,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.2)')}
            >
              <i className="ri-phone-line"></i>
              (619) 000-0000
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
            {['No diagnosis required to reach out', 'Insurance verified before you commit', 'Most teens start within 72 hours'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <i className="ri-check-line text-sm" style={{ color: SAGE }}></i>
                <span className="text-sm font-light" style={{ color: 'rgba(245,241,235,0.55)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coastal image bottom strip */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_cta01.jpg"
            alt="Teen walking on a coastal path at golden hour"
            fill
            className="w-full h-full object-cover object-[center_40%]"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${DARK} 0%, transparent 40%)` }} />
        </div>
      </section>

    </main>
  );
}
