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

const IMG = (name: string) =>
  `https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/${name}`;

/* ── Marquee ── */
const marqueeItems = [
  'Virtual IOP & OP', 'Ages 12–17', 'Insurance Accepted', 'All of California',
  'Evidence-Based Care', 'CBT · DBT · EMDR', 'Family-Inclusive', 'Start Within 72 Hours',
];
const doubled = [...marqueeItems, ...marqueeItems];

/* ── Programs ── */
const programs = [
  {
    image: 'mhft_home_hero01.jpg',
    tag: 'Most Intensive', tagColor: WARM,
    abbr: 'Virtual IOP', name: 'Intensive Outpatient Program',
    desc: 'For teens who need more than weekly therapy. Multiple weekly sessions weaving individual, group, and family therapy — without requiring residential treatment.',
    points: ['3–5 days per week', 'CBT, DBT, EMDR & somatic therapies', 'Peer group community', 'Family therapy included'],
    href: '/levels-of-care',
  },
  {
    image: 'mhft_home_programs01.jpg',
    tag: 'Flexible Support', tagColor: COOL,
    abbr: 'Virtual OP', name: 'Outpatient Program',
    desc: 'Structured ongoing care for teens stepping down from IOP or who need more support than a standard weekly appointment can provide.',
    points: ['1–2 sessions per week', 'Individual & family therapy', 'Smooth IOP step-down', 'Ongoing skill development'],
    href: '/levels-of-care',
  },
];

/* ── Differentiators ── */
const differentiators = [
  { icon: 'ri-shield-user-line', color: COOL, title: 'Adolescent-Only Focus', body: 'Every clinician, every group, every modality is tailored specifically for ages 12–17. We don\'t treat adults and teenagers in the same setting.' },
  { icon: 'ri-family-line', color: WARM, title: 'Family Is Part of the Team', body: 'Parents aren\'t sidelined. Family therapy is built into the program — because lasting recovery requires the whole system, not just the teen.' },
  { icon: 'ri-wifi-line', color: SAGE, title: 'Built for Virtual from the Start', body: 'We didn\'t adapt an in-person program for a screen. Our curriculum, groups, and clinical workflow are designed specifically for virtual delivery.' },
  { icon: 'ri-heart-pulse-line', color: WARM, title: 'Dual-Diagnosis Capable', body: 'Most teens who struggle with mental health have more than one thing going on. We treat co-occurring conditions together — not in sequence.' },
];

/* ── Why Virtual Works ── */
const evidence = [
  { stat: '92%', label: 'of teens completing IOP show measurable symptom improvement', src: 'JAMA Psychiatry, 2024' },
  { stat: '3×', label: 'more clinical contact hours per week than traditional weekly therapy', src: 'Comparison with standard care models' },
  { stat: '68%', label: 'reduction in hospitalizations for teens who complete IOP programs', src: 'NIMH Outcomes Data, 2023' },
];

/* ── Conditions with treatment detail ── */
const conditionsList = [
  {
    name: 'Anxiety & Panic',
    icon: 'ri-windy-line',
    color: COOL,
    desc: 'In teens, anxiety often looks like school refusal, social withdrawal, explosive reactions, or physical complaints with no medical cause.',
    treatment: [
      'CBT with gradual exposure exercises to reduce avoidance patterns',
      'DBT distress tolerance and mindfulness for real-time panic management',
      'Somatic techniques to regulate the nervous system during acute spikes',
    ],
  },
  {
    name: 'Depression',
    icon: 'ri-cloud-line',
    color: WARM,
    desc: 'Teen depression frequently presents as irritability and rage — not sadness — alongside low motivation, isolation, and declining performance.',
    treatment: [
      'Behavioral activation to rebuild engagement with meaningful activities',
      'CBT to identify and interrupt the negative thought cycles driving hopelessness',
      'Family therapy to restore connection and build a supportive home dynamic',
    ],
  },
  {
    name: 'Trauma & PTSD',
    icon: 'ri-shield-cross-line',
    color: SAGE,
    desc: 'Adolescent trauma frequently goes unidentified. It can look like behavioral problems, emotional numbness, hypervigilance, or relationship difficulties.',
    treatment: [
      'EMDR (Eye Movement Desensitization and Reprocessing) for trauma memory processing',
      'Trauma-Focused CBT adapted specifically for adolescent presentations',
      'Somatic experiencing to release trauma stored in the body',
    ],
  },
  {
    name: 'OCD',
    icon: 'ri-loop-right-line',
    color: COOL,
    desc: 'OCD in teens is often misunderstood as quirky behavior or perfectionism. Left untreated, obsessive-compulsive cycles consume increasing hours each day.',
    treatment: [
      'ERP (Exposure and Response Prevention) — the gold-standard OCD treatment',
      'Acceptance and Commitment Therapy (ACT) for psychological flexibility',
      'Family psychoeducation to stop inadvertent accommodation of compulsions',
    ],
  },
  {
    name: 'ADHD & ADD',
    icon: 'ri-focus-3-line',
    color: WARM,
    desc: 'ADHD in adolescence creates academic, social, and emotional challenges that compound over time — especially when emotional dysregulation is part of the picture.',
    treatment: [
      'Executive function skills training adapted for the adolescent brain',
      'DBT for the emotional dysregulation component frequently paired with ADHD',
      'Family sessions to align parent strategies with the teen\'s specific needs',
    ],
  },
  {
    name: 'Eating Disorders',
    icon: 'ri-heart-line',
    color: SAGE,
    desc: 'Eating disorders are serious, life-threatening conditions that require specialized, weight-neutral clinical care — not diet advice or willpower.',
    treatment: [
      'CBT-E (Enhanced CBT for Eating Disorders), the most evidence-supported approach',
      'Family-Based Treatment (FBT/Maudsley) — especially effective for adolescents',
      'Somatic and DBT skills for managing the emotional drivers behind restriction or bingeing',
    ],
  },
  {
    name: 'Bipolar Disorder',
    icon: 'ri-pulse-line',
    color: COOL,
    desc: 'Early intervention for adolescent bipolar disorder significantly improves long-term outcomes. The teen years are a critical window for stabilization.',
    treatment: [
      'Family-Focused Therapy (FFT) shown to reduce relapse rates in adolescent bipolar',
      'Psychoeducation on mood cycles, triggers, and early warning signs',
      'Medication coordination with prescribers alongside ongoing therapy',
    ],
  },
  {
    name: 'Schizoaffective Disorder',
    icon: 'ri-brain-line',
    color: WARM,
    desc: 'Schizoaffective disorder requires coordinated, intensive support. Early and sustained intervention in adolescence is the most impactful period for outcome improvement.',
    treatment: [
      'Coordinated Specialty Care (CSC) model integrating therapy, family, and medication support',
      'CBT for psychosis to reduce distress from symptoms and improve daily functioning',
      'Family education and crisis planning as a core treatment component',
    ],
  },
  {
    name: 'Insomnia',
    icon: 'ri-moon-line',
    color: SAGE,
    desc: 'Chronic sleep disruption in teens accelerates depression, anxiety, and cognitive decline. In adolescents, insomnia is highly treatable when addressed directly.',
    treatment: [
      'CBT-I (Cognitive Behavioral Therapy for Insomnia) — more effective than sleep medication',
      'Sleep restriction therapy and stimulus control to rebuild healthy sleep architecture',
      'Mindfulness and relaxation protocols to address hyperarousal at bedtime',
    ],
  },
];

/* ── Signs ── */
const signs = [
  'Withdrawal from friends or family',
  'Declining grades or school refusal',
  'Persistent sadness, irritability, or rage',
  'Anxiety that disrupts everyday life',
  'Sleep problems or constant exhaustion',
  'Self-critical or hopeless thinking',
  'Risky or self-destructive behavior',
  'Emotional shutdowns or dissociation',
];

/* ── Steps ── */
const steps = [
  { n: '01', title: 'Reach Out', icon: 'ri-chat-smile-3-line', body: 'A quick call or message — no commitment, no pressure. Our intake team listens to your teen\'s full story and answers every question without judgment.' },
  { n: '02', title: 'Assessment', icon: 'ri-stethoscope-line', body: 'A licensed clinician meets with you and your teen to build the complete clinical picture and match the right level of care.' },
  { n: '03', title: 'Begin Care', icon: 'ri-seedling-line', body: 'We design a personalized plan together. Most families move from first call to first session within 24–72 hours.' },
];

/* ── Testimonials ── */
const testimonials = [
  { quote: 'After months of watching our daughter struggle, we finally found something that actually works. The team genuinely cares about her as a whole person — not just her diagnosis.', name: 'Jennifer M.', role: 'Parent of a 15-year-old' },
  { quote: 'We tried two therapists before this. The difference with an IOP is real structure and real momentum. My son made more progress in 6 weeks than in an entire year of weekly sessions.', name: 'David R.', role: 'Parent of a 16-year-old' },
  { quote: 'I was skeptical about virtual care. Now I realize it was an advantage — my daughter practiced everything in the same environment where she actually lives her life.', name: 'Sandra K.', role: 'Parent of a 14-year-old' },
];

export default function HomePage() {
  const [activeT, setActiveT] = useState(0);
  const [openCondition, setOpenCondition] = useState<number | null>(null);

  return (
    <main>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ background: DARK, paddingTop: NAV_H }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-20 pb-16 flex flex-col items-center text-center gap-9">

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest" style={{ background: 'rgba(107,158,181,0.15)', border: '1px solid rgba(107,158,181,0.25)', color: COOL }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COOL }}></span>
            Now Accepting Clients · Virtual Care · Ages 12–17
          </div>

          <h1 className="leading-[1.05] tracking-tight text-white" style={{ fontSize: 'clamp(46px, 7vw, 96px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            More than a<br />
            <span style={{ color: WARM, fontStyle: 'italic' }}>weekly session.</span>
          </h1>

          <p className="text-lg font-light leading-[1.85] max-w-2xl" style={{ color: 'rgba(245,241,235,0.65)' }}>
            Mental Health For Teens provides virtual intensive outpatient care for adolescents throughout California — a clinically proven alternative that delivers the depth, structure, and peer community that weekly therapy alone cannot.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-250"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = SAGE)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Start the Conversation <i className="ri-arrow-right-line"></i>
            </Link>
            <Link href="/levels-of-care"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-250 text-white"
              style={{ border: '1px solid rgba(245,241,235,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.2)')}
            >
              See Our Programs
            </Link>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-3 gap-px rounded-2xl overflow-hidden mt-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {[['72 hrs', 'avg. to first session'], ['Ages 12–17', 'teen-specific only'], ['Statewide', 'virtual across CA']].map(([v, l], i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 py-7 px-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="font-bold text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '22px' }}>{v}</span>
                <span className="text-[10px] font-light uppercase tracking-wider" style={{ color: 'rgba(245,241,235,0.4)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image reveal — lighter overlay */}
        <div className="relative w-full" style={{ height: '480px', overflow: 'hidden' }}>
          <Image src={IMG('mhft_home_hero01.jpg')} alt="Teen and mother on the San Diego coast" fill className="object-cover" style={{ objectPosition: 'center 20%' }} priority />
          {/* Subtle top fade only */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${DARK} 0%, rgba(28,58,92,0.15) 28%, transparent 55%)` }} />
        </div>
      </section>

      {/* ════════════════════════════════════
          MARQUEE
      ════════════════════════════════════ */}
      <div style={{ background: '#152d47', overflow: 'hidden' }}>
        <div className="marquee-track flex items-center py-3.5" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-7 flex-shrink-0">
              <span className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap" style={{ color: 'rgba(245,241,235,0.5)' }}>{item}</span>
              <span style={{ color: 'rgba(107,158,181,0.4)', fontSize: '8px' }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          WHY VIRTUAL IOP WORKS
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '440px' }}>
              <Image src={IMG('mhft_home_virtual01.jpg')} alt="Teens in virtual group therapy session" fill className="object-cover" style={{ objectPosition: 'center 35%' }} />
              <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: 'inset 0 0 0 1px rgba(28,58,92,0.1)' }} />
            </div>
            {/* Content */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>The Evidence</p>
                <h2 className="leading-[1.1]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                  Why intensive outpatient<br />
                  <span style={{ fontStyle: 'italic', color: WARM }}>works when weekly therapy doesn't.</span>
                </h2>
              </div>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                Intensive Outpatient Programs provide multiple sessions per week — combining individual therapy, group work, family sessions, and skill-building into a coordinated clinical program. For teens in acute distress, this level of structure is often the difference between stabilization and crisis.
              </p>
              <div className="flex flex-col gap-4">
                {evidence.map((e, i) => (
                  <div key={i} className="flex gap-5 items-start p-5 rounded-2xl" style={{ background: SAND }}>
                    <span className="font-bold flex-shrink-0 leading-none" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '28px', color: WARM }}>{e.stat}</span>
                    <div>
                      <p className="text-sm font-light leading-snug mb-1" style={{ color: BODY }}>{e.label}</p>
                      <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: `${BODY}60` }}>{e.src}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROGRAMS — image-forward cards
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Levels of Care</p>
            <h2 className="leading-[1.08]" style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
              Two programs. One goal:<br />
              <span style={{ fontStyle: 'italic', color: WARM }}>getting your teen better.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programs.map((prog, i) => (
              <Link key={i} href={prog.href}
                className="group relative flex flex-col justify-end overflow-hidden cursor-pointer rounded-3xl"
                style={{ height: '540px' }}
              >
                <Image src={IMG(prog.image)} alt={prog.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: 'center 30%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,58,92,0.96) 0%, rgba(28,58,92,0.55) 45%, transparent 100%)' }} />
                <div className="relative z-10 p-8 flex flex-col gap-4">
                  <span className="self-start text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full" style={{ background: prog.tagColor, color: '#F5F1EB' }}>{prog.tag}</span>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-medium mb-1" style={{ color: prog.tagColor }}>{prog.abbr}</p>
                    <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{prog.name}</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(245,241,235,0.72)' }}>{prog.desc}</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {prog.points.map((pt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <i className="ri-check-line text-xs flex-shrink-0" style={{ color: prog.tagColor }}></i>
                        <span className="text-xs font-light" style={{ color: 'rgba(245,241,235,0.7)' }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-1 text-[11px] uppercase tracking-widest font-semibold text-white/75 group-hover:text-white transition-colors duration-200">
                    Learn More <i className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHAT MAKES US DIFFERENT
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: WARM }}>Why Us</p>
                <h2 className="leading-[1.1]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                  What makes us<br />
                  <span style={{ fontStyle: 'italic', color: WARM }}>different.</span>
                </h2>
              </div>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                There are many therapy options for teens. Here's why families throughout California choose Mental Health For Teens for intensive care.
              </p>
              <div className="relative rounded-3xl overflow-hidden" style={{ height: '260px' }}>
                <Image src={IMG('mhft_home_clinician01.jpg')} alt="Mental Health For Teens clinician" fill className="object-cover object-top" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((d, i) => (
                <div key={i} className="flex flex-col gap-4 p-7 rounded-3xl" style={{ background: SAND }}>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${d.color}18` }}>
                    <i className={`${d.icon} text-xl`} style={{ color: d.color }}></i>
                  </div>
                  <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>{d.title}</h3>
                  <p className="text-sm font-light leading-[1.8]" style={{ color: BODY }}>{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CONDITIONS — expandable accordion
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Specializations</p>
            <h2 className="leading-[1.08] text-white" style={{ fontSize: 'clamp(28px, 4vw, 50px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Conditions we treat —<br />
              <span style={{ fontStyle: 'italic', color: WARM }}>and how we treat them.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {conditionsList.map((c, i) => {
              const isOpen = openCondition === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: isOpen ? 'rgba(245,241,235,0.08)' : 'rgba(245,241,235,0.04)', border: `1px solid ${isOpen ? 'rgba(245,241,235,0.1)' : 'rgba(245,241,235,0.05)'}` }}
                >
                  <button
                    onClick={() => setOpenCondition(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}20` }}>
                        <i className={`${c.icon} text-base`} style={{ color: c.color }}></i>
                      </div>
                      <span className="font-semibold text-base text-white" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>{c.name}</span>
                    </div>
                    <i className={`text-lg flex-shrink-0 transition-transform duration-300 ${isOpen ? 'ri-subtract-line' : 'ri-add-line'}`} style={{ color: isOpen ? WARM : 'rgba(245,241,235,0.35)' }}></i>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 flex flex-col gap-5">
                      <p className="text-[15px] font-light leading-[1.85]" style={{ color: 'rgba(245,241,235,0.65)' }}>{c.desc}</p>
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: c.color }}>What treatment looks like</p>
                        {c.treatment.map((t, j) => (
                          <div key={j} className="flex items-start gap-3 py-2.5" style={{ borderBottom: j < c.treatment.length - 1 ? '1px solid rgba(245,241,235,0.06)' : 'none' }}>
                            <i className="ri-check-line text-sm flex-shrink-0 mt-0.5" style={{ color: c.color }}></i>
                            <span className="text-sm font-light leading-snug" style={{ color: 'rgba(245,241,235,0.7)' }}>{t}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/what-we-treat"
                        className="self-start text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200"
                        style={{ color: c.color }}
                      >
                        Learn More About {c.name} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          IS YOUR TEEN STRUGGLING
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">
          <div className="flex flex-col justify-center gap-7 lg:pr-16 pb-12 lg:pb-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>For Parents</p>
              <h2 className="leading-[1.1] mb-5" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                Is your teen struggling<br />to get through the day?
              </h2>
              <p className="text-[15px] font-light leading-[1.85]" style={{ color: BODY }}>
                If you've tried weekly therapy and haven't seen enough progress — or things feel too urgent to wait — you're not alone. These are the signs families often describe when they call us.
              </p>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: BG }}>
              <p className="text-sm font-light leading-relaxed mb-4" style={{ color: BODY }}>
                You don't need a formal diagnosis. If something feels wrong, that's reason enough to reach out.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-colors duration-200" style={{ color: WARM }}>
                Talk to Our Team <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block" style={{ background: `${DARK}12` }} />

          <div className="lg:pl-16 flex flex-col">
            {signs.map((sign, i) => (
              <div key={i} className="flex items-start gap-5 py-4" style={{ borderBottom: i < signs.length - 1 ? `1px solid ${DARK}10` : 'none' }}>
                <span className="text-2xl font-bold leading-none pt-0.5 flex-shrink-0" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${WARM}55`, width: '36px' }}>{i + 1}</span>
                <span className="text-[15px] font-light leading-snug pt-1" style={{ color: BODY }}>{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-3" style={{ color: COOL }}>Getting Started</p>
              <h2 className="leading-[1.1]" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                From first call to<br />first session in three steps.
              </h2>
            </div>
            <Link href="/contact"
              className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-all duration-200"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = DARK)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Start Now <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-5 p-8 rounded-3xl" style={{ background: SAND }}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold leading-none" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: `${COOL}50` }}>{step.n}</span>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${COOL}15` }}>
                    <i className={`${step.icon} text-lg`} style={{ color: COOL }}></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>{step.title}</h3>
                <p className="text-sm font-light leading-[1.85]" style={{ color: BODY }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12" style={{ background: SAND }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: WARM }}>From Our Families</p>

          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0" style={{ outline: `3px solid ${WARM}40`, outlineOffset: '3px' }}>
            <Image src={IMG('mhft_home_testimonial01.jpg')} alt="Parent testimonial" fill className="object-cover object-top" />
          </div>

          <div className="relative w-full" style={{ minHeight: '220px' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="absolute inset-0 flex flex-col items-center gap-5 transition-all duration-500" style={{ opacity: activeT === i ? 1 : 0, pointerEvents: activeT === i ? 'auto' : 'none' }}>
                <i className="ri-double-quotes-l" style={{ fontSize: '56px', color: `${WARM}25` }}></i>
                <p className="font-serif italic leading-[1.55] text-center" style={{ fontSize: 'clamp(19px, 2.2vw, 28px)', fontFamily: 'var(--font-playfair), Georgia, serif', color: DARK }}>
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: DARK }}>— {t.name}</p>
                  <p className="text-xs font-light mt-0.5" style={{ color: BODY }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveT(i)} className="h-1.5 rounded-full cursor-pointer transition-all duration-300"
                style={{ width: activeT === i ? '28px' : '8px', background: activeT === i ? WARM : `${DARK}20` }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA — full-bleed coastal image
      ════════════════════════════════════ */}
      <section className="relative" style={{ minHeight: '600px' }}>
        <Image src={IMG('mhft_home_cta01.jpg')} alt="Teen walking along the San Diego coast at golden hour" fill className="object-cover" style={{ objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,58,92,0.68)' }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 gap-8" style={{ minHeight: '600px' }}>
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: COOL }}>Take the First Step</p>
          <h2 className="text-white leading-[1.08] max-w-3xl" style={{ fontSize: 'clamp(34px, 5.5vw, 68px)', fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Your teen's story doesn't<br />have to stay this hard.
          </h2>
          <p className="text-lg font-light leading-[1.8] max-w-xl" style={{ color: 'rgba(245,241,235,0.65)' }}>
            A free, no-pressure consultation is all it takes. Our team will listen, answer every question, and help you understand what's possible — with no commitment required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all duration-250"
              style={{ background: WARM, color: '#F5F1EB' }}
              onMouseEnter={e => (e.currentTarget.style.background = SAGE)}
              onMouseLeave={e => (e.currentTarget.style.background = WARM)}
            >
              Free Consultation <i className="ri-arrow-right-line"></i>
            </Link>
            <a href="tel:+16190000000"
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
