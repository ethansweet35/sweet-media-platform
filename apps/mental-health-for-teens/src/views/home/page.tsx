'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const DARK = '#1C3A5C';
const WARM = '#C47F6A';
const COOL = '#6B9EB5';
const SAGE = '#87A892';
const SURFACE = '#EAE4D6';
const MUTED = '#5C7A8E';

const trustPills = [
  { icon: 'ri-user-heart-line', label: 'Ages 12–17' },
  { icon: 'ri-wifi-line', label: 'Fully Virtual' },
  { icon: 'ri-shield-check-line', label: 'Insurance Accepted' },
  { icon: 'ri-map-pin-2-line', label: 'All of California' },
  { icon: 'ri-microscope-line', label: 'Evidence-Based Care' },
  { icon: 'ri-heart-pulse-line', label: 'Virtual IOP & OP' },
];

const stats = [
  { value: '9+', label: 'Hours of support per week in IOP' },
  { value: '5', label: 'Therapy modalities used simultaneously' },
  { value: '72hrs', label: 'Average time from call to first session' },
];

const programs = [
  {
    tag: 'Most Intensive',
    tagColor: WARM,
    name: 'Virtual Intensive Outpatient',
    abbr: 'Virtual IOP',
    icon: 'ri-mental-health-line',
    desc: 'For teens who need more than weekly therapy — without the disruption of residential treatment. Multiple sessions per week combining individual, group, and family therapy.',
    details: ['3–5 days per week', 'Group + individual + family therapy', 'CBT, DBT, EMDR & more', 'Peer connection with other teens'],
    href: '/levels-of-care',
  },
  {
    tag: 'Flexible Support',
    tagColor: COOL,
    name: 'Virtual Outpatient',
    abbr: 'Virtual OP',
    icon: 'ri-calendar-check-line',
    desc: 'Ongoing, flexible care for teens stepping down from IOP or who need structured support beyond a weekly therapy appointment.',
    details: ['1–2 sessions per week', 'Individual & family therapy', 'Continued skill building', 'Smooth transition from IOP'],
    href: '/levels-of-care',
  },
];

const signs = [
  'Withdrawing from friends and family',
  'Declining grades or school refusal',
  'Persistent sadness, irritability, or anger',
  'Sleep problems or constant exhaustion',
  'Anxiety that interferes with daily life',
  'Self-critical thoughts or low self-worth',
  'Risky behaviors or emotional outbursts',
  'Trauma responses or dissociation',
];

const steps = [
  {
    num: '01',
    title: 'Reach out — no commitment needed',
    desc: 'A quick call or message is all it takes. Our intake team will listen to what your teen is going through and answer your questions honestly — no pressure, no obligation.',
  },
  {
    num: '02',
    title: 'Free clinical assessment',
    desc: 'A licensed clinician speaks with you and your teen to understand the full picture — what they\'re struggling with, what\'s been tried before, and what level of care will actually help.',
  },
  {
    num: '03',
    title: 'Start care — usually within days',
    desc: 'Once we\'ve built a personalized plan together, your teen starts their program. Most families go from first call to first session within 24–72 hours.',
  },
];

const conditions = [
  { label: 'Anxiety & Panic', icon: 'ri-mental-health-line' },
  { label: 'Depression', icon: 'ri-cloud-line' },
  { label: 'Trauma & PTSD', icon: 'ri-shield-cross-line' },
  { label: 'OCD', icon: 'ri-loop-right-line' },
  { label: 'ADHD & ADD', icon: 'ri-focus-3-line' },
  { label: 'Eating Disorders', icon: 'ri-heart-line' },
  { label: 'Bipolar Disorder', icon: 'ri-pulse-line' },
  { label: 'Schizoaffective', icon: 'ri-brain-line' },
  { label: 'Insomnia', icon: 'ri-moon-line' },
];

const testimonials = [
  {
    quote: 'After months of watching our daughter struggle, we finally feel like we found something that actually works. The team genuinely cares — not just about her symptoms, but about her as a person.',
    name: 'Jennifer M.',
    detail: 'Parent of a 15-year-old',
  },
  {
    quote: 'We tried two different therapists before this. The difference with an IOP is that there\'s real structure and real momentum. My son made more progress in 6 weeks than in the prior year.',
    name: 'David R.',
    detail: 'Parent of a 16-year-old',
  },
  {
    quote: 'I was skeptical about virtual care at first. Now I see it was actually an advantage — my daughter could practice everything she was learning in the same environment she lives in every day.',
    name: 'Sandra K.',
    detail: 'Parent of a 14-year-old',
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main style={{ background: '#F5F1EB' }}>

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[680px] md:min-h-[760px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg"
            alt="Teen and mother overlooking the San Diego coast"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C3A5C]/90 via-[#1C3A5C]/55 to-[#1C3A5C]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A5C]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 pt-44">
          <div className="max-w-2xl flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px" style={{ background: COOL }}></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>
                Virtual Mental Health Care · San Diego, CA
              </span>
            </div>
            <h1
              className="text-[#F5F1EB] leading-[1.08]"
              style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Your teen deserves<br />
              more than a<br />
              <em style={{ color: '#C47F6A' }}>weekly session.</em>
            </h1>
            <p className="text-[#F5F1EB]/72 font-light text-base md:text-lg leading-[1.9] max-w-lg">
              Mental Health For Teens offers virtual intensive outpatient care for adolescents — a clinically proven alternative to traditional therapy that provides real structure, real support, and real results.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300"
                style={{ background: WARM, color: '#F5F1EB' }}
                onMouseEnter={e => (e.currentTarget.style.background = DARK)}
                onMouseLeave={e => (e.currentTarget.style.background = WARM)}
              >
                Start the Conversation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link
                href="/levels-of-care"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium border border-[#F5F1EB]/35 text-[#F5F1EB] hover:border-[#F5F1EB] transition-all duration-300"
              >
                How It Works
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST PILLS ── */}
      <section style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {trustPills.map((p, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <i className={`${p.icon} text-sm`} style={{ color: COOL }}></i>
                <span className="text-[11px] uppercase tracking-widest font-medium text-[#F5F1EB]/65">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / INTRO ── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: '#F5F1EB' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>Our Approach</span>
            <h2
              className="leading-[1.12]"
              style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              A fundamentally<br />
              different approach<br />
              <em style={{ color: WARM }}>to teen mental health.</em>
            </h2>
            <p className="font-light text-base leading-[1.95]" style={{ color: MUTED }}>
              Traditional weekly therapy has its place. But for teens struggling with anxiety, depression, trauma, or more complex challenges, one session a week often isn't enough to create lasting change. Our intensive programs provide the clinical depth, peer community, and structured support that actually moves the needle.
            </p>
            <p className="font-light text-base leading-[1.95]" style={{ color: MUTED }}>
              We built Mental Health For Teens because adolescent mental health demands a specialized approach — one that takes teens seriously, includes families in the process, and delivers results that hold beyond the end of the program.
            </p>
            <Link
              href="/about"
              className="self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer"
              style={{ color: COOL }}
            >
              Our Story & Mission
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-6 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-7"
                style={{ background: i === 1 ? DARK : SURFACE }}
              >
                <span
                  className="font-serif font-bold flex-shrink-0"
                  style={{
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    color: i === 1 ? COOL : WARM,
                  }}
                >
                  {s.value}
                </span>
                <p
                  className="font-light text-sm leading-snug"
                  style={{ color: i === 1 ? '#F5F1EB/70' : MUTED }}
                >
                  <span style={{ color: i === 1 ? 'rgba(245,241,235,0.7)' : MUTED }}>{s.label}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: SURFACE }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Levels of Care</span>
            <h2
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              The right level of support<br />
              <em style={{ color: WARM }}>for where your teen is.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <div
                key={i}
                className="group relative flex flex-col gap-6 rounded-[2rem_0.75rem_2rem_0.75rem] p-9 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#F5F1EB' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ background: `${prog.tagColor}18` }}
                  >
                    <i className={`${prog.icon} text-lg`} style={{ color: prog.tagColor }}></i>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                    style={{ background: `${prog.tagColor}15`, color: prog.tagColor }}
                  >
                    {prog.tag}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: prog.tagColor }}>{prog.abbr}</p>
                  <h3
                    className="leading-snug"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
                  >
                    {prog.name}
                  </h3>
                </div>

                <p className="font-light text-sm leading-[1.85]" style={{ color: MUTED }}>{prog.desc}</p>

                <div className="grid grid-cols-1 gap-2.5">
                  {prog.details.map((d, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <i className="ri-check-line text-xs" style={{ color: SAGE }}></i>
                      <span className="text-sm font-light" style={{ color: MUTED }}>{d}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={prog.href}
                  className="self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer group-hover:gap-3"
                  style={{ color: prog.tagColor }}
                >
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[0.75rem_2rem_0.75rem_2rem] overflow-hidden">
            <div className="relative h-72 md:h-80">
              <Image
                src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_programs01.jpg"
                alt="Teen in a virtual therapy session"
                fill
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(28,58,92,0.75) 0%, rgba(28,58,92,0.2) 60%, transparent 100%)' }} />
              <div className="absolute inset-0 flex items-center px-10 md:px-14">
                <div className="max-w-md flex flex-col gap-4">
                  <p
                    className="text-[#F5F1EB] font-serif italic leading-[1.4]"
                    style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    "Care that fits into your teen's life — not the other way around."
                  </p>
                  <Link
                    href="/admissions"
                    className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-300 cursor-pointer"
                    style={{ background: WARM, color: '#F5F1EB' }}
                  >
                    Check Insurance
                    <i className="ri-arrow-right-line text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: '#F5F1EB' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>For Families</span>
            <h2
              className="leading-[1.12]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              Is your teen struggling<br />
              <em style={{ color: WARM }}>to get through the day?</em>
            </h2>
            <p className="font-light text-base leading-[1.95]" style={{ color: MUTED }}>
              As a parent, watching your teen struggle is one of the hardest things you'll face. If you've tried weekly therapy and aren't seeing enough progress — or if things feel too urgent to wait — you're not alone, and there are better options available.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {signs.map((sign, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-checkbox-blank-circle-fill text-[7px]" style={{ color: COOL }}></i>
                  </div>
                  <span className="text-sm font-light leading-snug" style={{ color: MUTED }}>{sign}</span>
                </div>
              ))}
            </div>

            <div
              className="rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-6 flex flex-col gap-3"
              style={{ background: SURFACE }}
            >
              <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>
                You don't need to be certain your teen has a diagnosis. If something feels wrong, that's enough reason to reach out. Our intake team will help you make sense of what you're seeing.
              </p>
              <Link
                href="/contact"
                className="self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer"
                style={{ color: WARM }}
              >
                Talk to Our Team
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          {/* How it works */}
          <div className="flex flex-col gap-2">
            <div
              className="rounded-[0.75rem_2rem_0.75rem_2rem] p-8 mb-4 flex flex-col gap-3"
              style={{ background: DARK }}
            >
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Getting Started</span>
              <h3
                className="text-[#F5F1EB] leading-snug"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                How it works
              </h3>
            </div>
            {steps.map((step, i) => (
              <div
                key={i}
                className="group flex gap-5 p-6 rounded-xl transition-all duration-300 hover:shadow-sm"
                style={{ background: i % 2 === 0 ? SURFACE : '#F5F1EB' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 font-serif font-bold text-sm text-[#F5F1EB] transition-all duration-300 group-hover:scale-110"
                  style={{ background: COOL, fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {step.num}
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h4 className="font-serif text-base" style={{ color: DARK, fontFamily: 'var(--font-playfair), Georgia, serif' }}>{step.title}</h4>
                  <p className="text-sm font-light leading-[1.85]" style={{ color: MUTED }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section className="w-full py-20 px-8 md:px-16" style={{ background: SURFACE }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>Specializations</span>
              <h2
                className="leading-[1.12]"
                style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Conditions we<br />
                <em style={{ color: WARM }}>specialize in.</em>
              </h2>
              <p className="text-sm font-light leading-[1.85]" style={{ color: MUTED }}>
                Our clinicians are trained in adolescent-specific presentations of each of these conditions and the unique ways they show up during the teen years.
              </p>
              <Link
                href="/what-we-treat"
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-medium border transition-all duration-300 cursor-pointer"
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
                What We Treat
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div className="lg:col-span-2 flex flex-wrap gap-3">
              {conditions.map((c, i) => (
                <Link
                  href="/what-we-treat"
                  key={i}
                  className="group flex items-center gap-2.5 rounded-full px-5 py-3 transition-all duration-300 cursor-pointer"
                  style={{ background: '#F5F1EB' }}
                  onMouseEnter={e => (e.currentTarget.style.background = DARK)}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F5F1EB')}
                >
                  <i
                    className={`${c.icon} text-sm transition-colors duration-300`}
                    style={{ color: COOL }}
                  ></i>
                  <span
                    className="text-xs font-medium whitespace-nowrap transition-colors duration-300"
                    style={{ color: DARK }}
                  >
                    {c.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="w-full py-24 px-8 md:px-16" style={{ background: '#F5F1EB' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden h-[420px] md:h-[500px]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_testimonial01.jpg"
              alt="Parent who found hope through Mental Health For Teens"
              fill
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(28,58,92,0.6) 0%, transparent 60%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: COOL }}>From Our Families</p>
              <p className="text-[#F5F1EB] font-serif text-lg" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                What parents say
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>Testimonials</span>
            <div className="relative min-h-[220px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-5 transition-all duration-500 ${activeTestimonial === i ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                >
                  <i className="ri-double-quotes-l text-3xl" style={{ color: `${COOL}50` }}></i>
                  <p
                    className="font-serif italic leading-[1.65] text-lg"
                    style={{ color: DARK, fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium" style={{ color: DARK }}>— {t.name}</span>
                    <span className="text-xs font-light" style={{ color: MUTED }}>{t.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: activeTestimonial === i ? '32px' : '8px',
                    background: activeTestimonial === i ? WARM : `${DARK}25`,
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div
              className="rounded-[0.75rem_2rem_0.75rem_2rem] p-6 flex flex-col gap-3 mt-2"
              style={{ background: SURFACE }}
            >
              <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: SAGE }}>
                Insurance accepted
              </p>
              <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>
                We work with most major insurance providers and will verify your teen's benefits before you commit to anything. There are no surprises.
              </p>
              <Link
                href="/admissions"
                className="self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer"
                style={{ color: COOL }}
              >
                Verify Insurance
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-[500px]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_cta01.jpg"
              alt="Teen walking on a coastal path at golden hour"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: 'rgba(28,58,92,0.45)' }}
            />
          </div>
          <div
            className="flex flex-col justify-center gap-7 px-10 md:px-14 py-16"
            style={{ background: DARK }}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Take the First Step</span>
            <h2
              className="text-[#F5F1EB] leading-[1.12]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Your teen's story<br />
              doesn't have to<br />
              <em style={{ color: WARM }}>stay this hard.</em>
            </h2>
            <p className="font-light text-base leading-relaxed" style={{ color: 'rgba(245,241,235,0.65)' }}>
              A free, no-pressure consultation is the only first step. Our intake team will listen to your situation, answer your questions, and help you understand what's possible — without any commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300"
                style={{ background: WARM, color: '#F5F1EB' }}
                onMouseEnter={e => (e.currentTarget.style.background = COOL)}
                onMouseLeave={e => (e.currentTarget.style.background = WARM)}
              >
                Free Consultation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+16190000000"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border text-xs uppercase tracking-widest font-medium transition-all duration-300"
                style={{ borderColor: 'rgba(245,241,235,0.25)', color: '#F5F1EB' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.25)')}
              >
                <i className="ri-phone-line"></i>
                (619) 000-0000
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              {[
                'No diagnosis required to reach out',
                'Insurance verified before you begin',
                'Most teens start within 72 hours',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-line text-sm" style={{ color: SAGE }}></i>
                  <span className="text-sm font-light" style={{ color: 'rgba(245,241,235,0.6)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
