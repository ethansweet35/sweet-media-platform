'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const NAV_H = 72;

const DARK  = '#1C3A5C';
const WARM  = '#C47F6A';
const COOL  = '#6B9EB5';
const SAGE  = '#87A892';
const SAND  = '#EAE4D6';
const BG    = '#F5F1EB';
const BODY  = '#3D5268';

const doubled = [
  'Virtual IOP & OP', 'Ages 12–17', 'Insurance Accepted', 'All of California',
  'Evidence-Based Care', 'CBT · DBT · EMDR', 'Family-Inclusive', 'Start Within 72 Hours',
  'Virtual IOP & OP', 'Ages 12–17', 'Insurance Accepted', 'All of California',
  'Evidence-Based Care', 'CBT · DBT · EMDR', 'Family-Inclusive', 'Start Within 72 Hours',
];

const signs = [
  'Withdrawal from friends or family',
  'Declining grades or school refusal',
  'Persistent sadness, irritability, or rage',
  'Anxiety that disrupts daily life',
  'Sleep problems or chronic exhaustion',
  'Self-critical or hopeless thinking',
  'Risky or self-destructive behavior',
  'Trauma responses or emotional shutdown',
];

const steps = [
  { n: '01', title: 'Reach Out', body: 'A quick call or message — no commitment, no pressure. Our intake team listens to your teen\'s full situation and answers every question honestly.' },
  { n: '02', title: 'Assessment', body: 'A licensed clinician meets with you and your teen to build the complete picture and recommend the right level of care.' },
  { n: '03', title: 'Begin Care', body: 'We design a personalized treatment plan together. Most families move from first call to first session in 24–72 hours.' },
];

const conditions = [
  ['Anxiety & Panic', 'Depression', 'Trauma & PTSD', 'Eating Disorders'],
  ['OCD', 'ADHD & ADD', 'Bipolar Disorder', 'Schizoaffective Disorder'],
  ['Insomnia', 'Self-Harm', 'Grief & Loss', 'Life Transitions'],
];

const testimonials = [
  { quote: 'After months of watching our daughter struggle, we finally found something that actually works. The team genuinely cares about her as a person — not just her diagnosis.', name: 'Jennifer M.', role: 'Parent of a 15-year-old' },
  { quote: 'We tried two therapists before this. The difference with an IOP is real structure and real momentum. My son made more progress in 6 weeks than in an entire year of weekly sessions.', name: 'David R.', role: 'Parent of a 16-year-old' },
  { quote: 'I was skeptical about virtual care. Now I realize it was actually an advantage — my daughter practiced everything she learned in the same environment where she actually lives.', name: 'Sandra K.', role: 'Parent of a 14-year-old' },
];

export default function HomePage() {
  const [activeT, setActiveT] = useState(0);

  return (
    <main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — dark navy, centered statement
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ background: DARK, paddingTop: NAV_H }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-12 flex flex-col items-center text-center gap-8">

          {/* Badge */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest"
            style={{ background: 'rgba(107,158,181,0.15)', border: '1px solid rgba(107,158,181,0.3)', color: COOL }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: COOL }}></span>
            Virtual Care · San Diego, CA · Ages 12–17
          </div>

          {/* Headline */}
          <h1
            className="leading-[1.06] tracking-tight text-white"
            style={{ fontSize: 'clamp(42px, 6.5vw, 88px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            More than a<br />
            weekly session.
          </h1>

          {/* Subtext */}
          <p className="text-lg font-light leading-[1.8] max-w-xl" style={{ color: 'rgba(245,241,235,0.65)' }}>
            Mental Health For Teens offers virtual intensive outpatient care for adolescents — a clinically proven alternative that delivers the depth and structure weekly therapy alone cannot provide.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-250"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = SAGE)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Start the Conversation
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              href="/levels-of-care"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-250 text-white"
              style={{ border: '1px solid rgba(245,241,235,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.2)')}
            >
              See Our Programs
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="w-full grid grid-cols-3 gap-px rounded-2xl overflow-hidden mt-4"
            style={{ background: 'rgba(245,241,235,0.06)' }}
          >
            {[['72 hrs', 'average to first session'], ['Ages 12–17', 'teen-specific care'], ['Statewide', 'virtual across California']].map(([val, label], i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-6 px-4" style={{ background: 'rgba(245,241,235,0.04)' }}>
                <span className="font-bold text-white text-xl" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{val}</span>
                <span className="text-[11px] font-light uppercase tracking-wider" style={{ color: 'rgba(245,241,235,0.45)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width image reveal */}
        <div className="relative w-full" style={{ height: '420px', overflow: 'hidden' }}>
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg"
            alt="Teen and mother overlooking the San Diego coast at golden hour"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 25%' }}
            priority
          />
          {/* Fade from dark above */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${DARK} 0%, transparent 35%)` }} />
          {/* Dark vignette on sides */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,58,92,0.4) 0%, transparent 20%, transparent 80%, rgba(28,58,92,0.4) 100%)' }} />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MARQUEE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div style={{ background: '#152d47', overflow: 'hidden', borderBottom: '1px solid rgba(245,241,235,0.05)' }}>
        <div className="marquee-track flex items-center py-3" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-7 flex-shrink-0">
              <span className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap" style={{ color: 'rgba(245,241,235,0.5)' }}>{item}</span>
              <span style={{ color: 'rgba(107,158,181,0.4)', fontSize: '8px' }}>●</span>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROGRAMS — image-forward full-bleed cards
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Levels of Care</p>
            <h2
              className="leading-[1.08]"
              style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
            >
              Two programs. One goal:<br />
              <span style={{ fontStyle: 'italic', color: WARM }}>getting your teen better.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* IOP card */}
            {[
              {
                image: 'mhft_home_hero01.jpg',
                tag: 'Most Intensive',
                tagColor: WARM,
                abbr: 'Virtual IOP',
                name: 'Intensive Outpatient Program',
                desc: 'For teens who need more than weekly therapy. Multiple weekly sessions combining individual, group, and family therapy — without residential disruption.',
                points: ['3–5 days per week', 'CBT, DBT, EMDR & more', 'Group peer community', 'Family therapy included'],
                href: '/levels-of-care',
              },
              {
                image: 'mhft_home_programs01.jpg',
                tag: 'Flexible Support',
                tagColor: COOL,
                abbr: 'Virtual OP',
                name: 'Outpatient Program',
                desc: 'Structured ongoing care for teens stepping down from IOP or who need more support than a standard weekly appointment.',
                points: ['1–2 sessions per week', 'Individual & family therapy', 'Smooth IOP step-down', 'Ongoing skill building'],
                href: '/levels-of-care',
              },
            ].map((prog, i) => (
              <Link
                key={i}
                href={prog.href}
                className="group relative flex flex-col justify-end overflow-hidden cursor-pointer rounded-3xl"
                style={{ height: '520px' }}
              >
                <Image
                  src={`https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/${prog.image}`}
                  alt={prog.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: 'center 30%' }}
                />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,58,92,0.95) 0%, rgba(28,58,92,0.5) 50%, transparent 100%)' }} />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col gap-4">
                  <span
                    className="self-start text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: prog.tagColor, color: '#F5F1EB' }}
                  >
                    {prog.tag}
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-medium mb-1" style={{ color: prog.tagColor }}>{prog.abbr}</p>
                    <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{prog.name}</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(245,241,235,0.7)' }}>{prog.desc}</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {prog.points.map((pt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <i className="ri-check-line text-xs flex-shrink-0" style={{ color: prog.tagColor }}></i>
                        <span className="text-xs font-light text-white/70">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-[11px] uppercase tracking-widest font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
                    Learn More <i className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          IS YOUR TEEN STRUGGLING — signs
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">

          {/* Left: heading */}
          <div className="flex flex-col justify-center gap-7 lg:pr-16 pb-12 lg:pb-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-4" style={{ color: COOL }}>For Parents</p>
              <h2
                className="leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(28px, 3.8vw, 46px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
              >
                Is your teen struggling<br />to get through the day?
              </h2>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                If you've tried weekly therapy and haven't seen enough progress — or if things feel too urgent to wait — you're not alone. These are the signs families often describe when they first call us.
              </p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: BG }}>
              <p className="text-sm font-light leading-relaxed mb-4" style={{ color: BODY }}>
                You don't need a formal diagnosis. If something feels wrong, that's enough reason to reach out.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                style={{ color: WARM }}
              >
                Talk to Our Team <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block" style={{ background: `${DARK}12` }} />

          {/* Right: signs list */}
          <div className="lg:pl-16">
            <div className="flex flex-col">
              {signs.map((sign, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 py-4"
                  style={{ borderBottom: i < signs.length - 1 ? `1px solid ${DARK}10` : 'none' }}
                >
                  <span
                    className="text-2xl font-bold leading-none pt-0.5 flex-shrink-0"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${WARM}50`, width: '36px' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[15px] font-light leading-snug pt-1" style={{ color: BODY }}>{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS — horizontal on dark bg
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 md:px-12" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Getting Started</p>
              <h2
                className="leading-[1.1] text-white"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                From first call to<br />first session in three steps.
              </h2>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-all duration-200"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = COOL)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Start Now <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col gap-5 p-8 rounded-3xl"
                style={{ background: 'rgba(245,241,235,0.05)', border: '1px solid rgba(245,241,235,0.07)' }}
              >
                <span
                  className="text-5xl font-bold leading-none"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: COOL, opacity: 0.6 }}
                >
                  {step.n}
                </span>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-[1.85]" style={{ color: 'rgba(245,241,235,0.55)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CONDITIONS — clean elegant columns
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: WARM }}>What We Treat</p>
                <h2
                  className="leading-[1.1]"
                  style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
                >
                  Specialized adolescent care across a full range of conditions.
                </h2>
              </div>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                Our clinicians are trained specifically in how each of these conditions presents in teenagers — and the most effective approaches for this age group.
              </p>
              <Link
                href="/what-we-treat"
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold border cursor-pointer transition-all duration-200"
                style={{ borderColor: `${DARK}20`, color: DARK }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = DARK;
                  (e.currentTarget as HTMLElement).style.color = '#F5F1EB';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = DARK;
                }}
              >
                Full Conditions List <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Three-column condition list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-0">
              {conditions.map((col, ci) => (
                <div key={ci} className="flex flex-col">
                  {col.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-3.5"
                      style={{ borderBottom: `1px solid ${DARK}10` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: [WARM, COOL, SAGE][ci] }}
                      ></span>
                      <span className="text-[15px] font-light" style={{ color: BODY }}>{c}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TESTIMONIALS — big centered quote
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">

          <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>From Our Families</p>

          {/* Photo row */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2" style={{ ringColor: WARM }}>
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_testimonial01.jpg"
              alt="Parent testimonial"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Rotating quote */}
          <div className="relative w-full" style={{ minHeight: '160px' }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center gap-5 transition-all duration-500"
                style={{ opacity: activeT === i ? 1 : 0, pointerEvents: activeT === i ? 'auto' : 'none' }}
              >
                <i className="ri-double-quotes-l" style={{ fontSize: '48px', color: `${WARM}30` }}></i>
                <p
                  className="font-serif italic leading-[1.55] text-center"
                  style={{ fontSize: 'clamp(19px, 2.2vw, 28px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}
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
          <div className="flex gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveT(i)}
                className="h-1.5 rounded-full cursor-pointer transition-all duration-300"
                style={{ width: activeT === i ? '28px' : '8px', background: activeT === i ? WARM : `${DARK}20` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA — full-bleed coastal image
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative" style={{ minHeight: '560px' }}>
        <Image
          src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_cta01.jpg"
          alt="Teen walking along the San Diego coast at golden hour"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,58,92,0.72)' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 py-28 gap-8" style={{ minHeight: '560px' }}>
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Take the First Step</p>
          <h2
            className="text-white leading-[1.1] max-w-3xl"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Your teen's story doesn't<br />have to stay this hard.
          </h2>
          <p className="text-lg font-light leading-[1.8] max-w-xl" style={{ color: 'rgba(245,241,235,0.65)' }}>
            A free, no-pressure consultation is the only first step. Our intake team will listen and help you understand what's possible — with no commitment required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-250"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = SAGE)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Free Consultation <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href="tel:+16190000000"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-medium text-white border transition-all duration-250"
              style={{ borderColor: 'rgba(245,241,235,0.25)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.25)')}
            >
              <i className="ri-phone-line"></i> (619) 000-0000
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-2">
            {['No diagnosis required', 'Insurance verified upfront', 'Start within 72 hours'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <i className="ri-check-line text-sm" style={{ color: SAGE }}></i>
                <span className="text-sm font-light" style={{ color: 'rgba(245,241,235,0.6)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
