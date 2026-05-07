'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';
import HeroContactForm from '@/views/home/components/HeroContactForm';

const ACCENT = '#8FA489';
const WARM = '#C8795A';
const GOLD = '#DDA15E';

const cbtApplications = [
  {
    icon: 'ri-mental-health-line',
    name: 'Anxiety & Panic',
    tag: 'Most Common Use',
    tagColor: WARM,
    desc: 'CBT is one of the most validated treatments for anxiety disorders. You learn to identify the thought patterns that fuel worry and panic, and practice replacing them with more grounded, realistic perspectives.',
  },
  {
    icon: 'ri-cloud-line',
    name: 'Depression',
    tag: 'Mood & Motivation',
    tagColor: GOLD,
    desc: 'Depression often involves distorted thinking — catastrophizing, all-or-nothing thinking, and negative self-talk. CBT breaks that cycle by challenging those beliefs and building behavioral activation patterns that restore energy and meaning.',
  },
  {
    icon: 'ri-heart-2-line',
    name: 'Eating Disorders & Body Image',
    tag: 'Specialized Adaptation',
    tagColor: ACCENT,
    desc: 'CBT-E (Enhanced CBT) is the leading evidence-based model for eating disorders. It targets the overvaluation of shape and weight, restrictive rules, and the cognitive maintaining factors behind disordered patterns.',
  },
  {
    icon: 'ri-brain-line',
    name: 'Trauma & PTSD',
    tag: 'Trauma-Focused',
    tagColor: '#6B7D67',
    desc: 'Trauma-Focused CBT helps you process traumatic memories in a structured, safe way — addressing the avoidance, distorted beliefs, and emotional patterns that keep trauma responses active long after the event.',
  },
];

const thoughtPatterns = [
  'Catastrophizing — assuming the worst will happen',
  'All-or-nothing thinking — seeing situations in black and white',
  'Mind reading — believing you know what others think',
  'Emotional reasoning — treating feelings as facts',
  'Personalization — blaming yourself for things outside your control',
  'Filtering — focusing exclusively on negatives while discounting positives',
  'Should statements — rigid rules about how you or others must behave',
  'Overgeneralization — drawing broad conclusions from a single event',
];

const isRightFor = [
  'Anxiety, panic attacks, or persistent worry that affects your daily life',
  'Depression, low mood, or difficulty finding motivation',
  'Eating concerns or a difficult relationship with your body',
  'Trauma history that still shapes how you think and feel today',
  'Perfectionism or self-critical thinking patterns',
  'Stress from major life transitions — work, relationships, motherhood',
  'A desire to understand your thoughts, not just manage your symptoms',
  'Looking for structured, skills-based work alongside deeper therapeutic processing',
];

const cbtProcess = [
  {
    step: '01',
    label: 'Assessment & Goal Setting',
    desc: 'We begin with a clinical assessment to understand your presenting concerns, history, and specific goals. CBT is structured around clear, collaborative objectives — so you always know what you are working toward.',
  },
  {
    step: '02',
    label: 'Thought Monitoring & Pattern Recognition',
    desc: 'You learn to catch the automatic thoughts that arise in difficult situations and track how they connect to your emotions and behaviors. Awareness is the first step to change.',
  },
  {
    step: '03',
    label: 'Cognitive Restructuring',
    desc: 'With your therapist, you examine the evidence for and against those thoughts and develop more balanced, flexible ways of interpreting your experiences — without toxic positivity.',
  },
  {
    step: '04',
    label: 'Behavioral Experiments & Skills Practice',
    desc: 'Change happens between sessions too. You practice new behaviors, test predictions, and build skills like distress tolerance, behavioral activation, and problem-solving in real life.',
  },
  {
    step: '05',
    label: 'Relapse Prevention & Long-Term Tools',
    desc: 'As therapy progresses, we build a plan for maintaining your gains and recognizing early warning signs. The skills you learn in CBT are yours to keep.',
  },
];

const techniques = [
  { name: 'Cognitive Restructuring', icon: 'ri-brain-line' },
  { name: 'Thought Records', icon: 'ri-file-list-3-line' },
  { name: 'Behavioral Activation', icon: 'ri-walk-line' },
  { name: 'Exposure Therapy', icon: 'ri-shield-line' },
  { name: 'Problem-Solving Training', icon: 'ri-lightbulb-line' },
  { name: 'Socratic Questioning', icon: 'ri-question-line' },
  { name: 'Mindfulness Integration', icon: 'ri-focus-3-line' },
  { name: 'Behavioral Experiments', icon: 'ri-flask-line' },
  { name: 'Skills Generalization', icon: 'ri-leaf-line' },
];

const carePillars = [
  {
    icon: 'ri-tools-line',
    title: 'Concrete & Skills-Based',
    desc: 'CBT gives you real tools to use between sessions — not just insights to sit with. Thought records, behavioral experiments, and structured practices create change you can feel.',
  },
  {
    icon: 'ri-bar-chart-grouped-line',
    title: 'Evidence-Based',
    desc: 'CBT has decades of clinical research behind it. It is one of the most rigorously studied therapeutic approaches for anxiety, depression, trauma, and eating disorders.',
  },
  {
    icon: 'ri-user-heart-line',
    title: 'Women-Centered Delivery',
    desc: 'We apply CBT through a gender-responsive lens — accounting for the relational, social, and identity pressures that shape how women think, feel, and respond to distress.',
  },
  {
    icon: 'ri-links-line',
    title: 'Integrated with Other Modalities',
    desc: 'CBT rarely works alone at Inner Peak. We blend it with DBT skills, somatic approaches, ACT, and EMDR when clinically appropriate for a fuller, more personalized plan.',
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'How is CBT different from just talking about my problems?',
    a: 'CBT is structured, skill-focused, and change-oriented. Rather than open-ended exploration, it targets specific thought and behavior patterns with measurable techniques. Many clients find it both insightful and practical.',
  },
  {
    q: 'How long does CBT typically take?',
    a: 'Traditional CBT courses run 12–20 sessions, though this varies based on the complexity of your concerns. At Inner Peak, we integrate CBT into an individualized treatment plan that adapts as you progress.',
  },
  {
    q: 'Is CBT effective for trauma?',
    a: 'Yes — Trauma-Focused CBT (TF-CBT) is one of the most evidence-supported trauma treatment models. It is adapted for trauma presentations and carefully paced to prioritize safety and stabilization first.',
  },
  {
    q: 'Will I have homework?',
    a: 'CBT often involves between-session practice — thought records, behavioral experiments, or tracking exercises. Your therapist will guide you on what is realistic and helpful for you specifically.',
  },
  {
    q: 'Can CBT be done virtually?',
    a: 'Absolutely. Virtual CBT is well-studied and highly effective. Many women find that doing CBT in their own home environment helps with real-world skill transfer and day-to-day application.',
  },
  {
    q: "What if CBT doesn't feel like the right fit for me?",
    a: "Not every modality is right for every person. If CBT isn't resonating, your therapist will discuss alternatives like DBT, EMDR, ACT, or somatic approaches — often within the same treatment relationship.",
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

export default function CbtPage() {
  return (
    <main className="bg-[#FAF8F5]">

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_cbt_hero01.jpg"
            alt="Woman in a Colorado home having a virtual CBT therapy session on a laptop with mountain views"
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
                { label: 'Cognitive Behavioral Therapy' },
              ]}
              light
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                  Evidence-Based Therapy
                </span>
                <h1
                  className="font-serif text-[#FAF8F5] leading-[1.1]"
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  Cognitive<br />
                  Behavioral<br />
                  Therapy
                </h1>
                <p className="text-[#FAF8F5]/65 font-light leading-[1.85] text-base max-w-md">
                  CBT helps you understand the connection between your thoughts, feelings, and behaviors —
                  and teaches practical skills to change the patterns keeping you stuck. Fully virtual,
                  clinically grounded, and designed for real life.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: WARM, color: '#FAF8F5' }}
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
                    { icon: 'ri-award-line', label: 'Evidence-Based' },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2 text-[#FAF8F5]/50">
                      <i className={`${b.icon} text-sm`} style={{ color: ACCENT }} />
                      <span className="text-[11px] font-light tracking-wide">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <HeroContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS CBT ─── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              What It Is
            </span>
            <p className="font-serif text-[#2C3B2E] mt-6 leading-[1.7]" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
              CBT is built on a simple but profound idea: the way you think shapes how you feel,
              and how you feel shapes what you do. Change the pattern, and you change the experience.
              It is practical, structured, and one of the most researched therapies in existence.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-5">
            {[
              { num: '50+', unit: 'years', label: 'of clinical research backing', icon: 'ri-bar-chart-2-line' },
              { num: '1st', unit: 'line', label: 'treatment for anxiety & depression', icon: 'ri-award-line' },
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
                <p className="text-xs text-[#3A4A3C]/45 font-light mt-2 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 rounded-2xl p-8"
            style={{ backgroundColor: `${ACCENT}0D`, borderLeft: `3px solid ${ACCENT}` }}
          >
            <p className="font-serif italic text-[#2C3B2E] text-lg leading-relaxed">
              &quot;CBT doesn&apos;t ask you to think positive. It asks you to think accurately —
              and then helps you act in ways that align with who you actually want to be.&quot;
            </p>
            <p className="text-xs text-[#3A4A3C]/45 mt-4 uppercase tracking-widest font-light">
              — The core philosophy of CBT at Inner Peak Colorado
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONDITIONS WE TREAT ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
              Applications
            </span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              What CBT is used<br />
              <em className="text-[#C8795A]">to treat.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              CBT is among the most clinically validated treatments across a wide range of mental health conditions. We tailor the approach to your specific presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cbtApplications.map((item, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${item.tagColor}15` }}
                  >
                    <i className={`${item.icon} text-lg`} style={{ color: item.tagColor }}></i>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${item.tagColor}15`, color: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-xl">{item.name}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THOUGHT PATTERNS ─── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-7">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Cognitive Distortions
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                The thought patterns<br />
                CBT is designed<br />
                <em className="text-[#C8795A]">to interrupt.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                Cognitive distortions are habitual ways of thinking that feel completely true but consistently skew toward the negative. They are not character flaws — they are patterns the brain develops, often as protection. CBT gives you the tools to recognize and rewrite them.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-px" style={{ backgroundColor: ACCENT }}></div>
                <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  Patterns are learned — and they can be unlearned
                </span>
              </div>
            </div>

            <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-4">
              {thoughtPatterns.map((pattern, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-checkbox-blank-circle-line text-xs" style={{ color: ACCENT }}></i>
                  </div>
                  <span className="text-sm text-[#3A4A3C]/70 font-light leading-snug">{pattern}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IS IT RIGHT FOR YOU ─── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_cbt_overview01.jpg"
              alt="Woman journaling in a warm Colorado home as part of CBT between-session practice"
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
              CBT may be a good fit if…
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
      <section className="w-full bg-[#2C3B2E] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: GOLD }}>
              Our Approach
            </span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              CBT delivered with<br />
              warmth, precision,<br />
              <em style={{ color: ACCENT }}>and real-world focus.</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {carePillars.map((pillar, i) => (
                <div key={i} className="bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 transition-colors duration-300 rounded-xl p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: `${ACCENT}25` }}>
                    <i className={`${pillar.icon} text-sm`} style={{ color: ACCENT }}></i>
                  </div>
                  <h3 className="font-serif text-[#FAF8F5] text-sm">{pillar.title}</h3>
                  <p className="text-[#F0ECE1]/55 font-light text-xs leading-[1.8]">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-72 lg:h-auto overflow-hidden order-1 lg:order-2">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_cbt_cta01.jpg"
              alt="Woman looking out at Colorado mountains, representing clarity and forward progress after CBT"
              fill
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#2C3B2E]/60 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ─── CBT PROCESS ─── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                The CBT Process
              </span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
                What CBT treatment<br />
                <em className="text-[#C8795A]">actually looks like.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">
                CBT is structured but not rigid. Each phase builds on the last, moving from awareness to active skill use to lasting change.
              </p>
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-7 flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: ACCENT }}>
                  Most clients begin within
                </p>
                <p className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                  24–72 hours
                </p>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                  From first call to first session, depending on clinical fit and scheduling.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {cbtProcess.map((item, i) => (
                <div key={i} className="group flex gap-6 pb-10 last:pb-0">
                  <div className="flex flex-col items-center gap-0 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {item.step}
                    </div>
                    {i < cbtProcess.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${ACCENT}30`, minHeight: '40px' }}></div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-4">
                    <h3 className="font-serif text-[#2C3B2E] text-base group-hover:text-[#C8795A] transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECHNIQUES ─── */}
      <section className="w-full bg-[#F0ECE1] py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex flex-col gap-5 lg:col-span-1">
              <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: ACCENT }}>
                Techniques
              </span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                CBT tools used<br />
                <em className="text-[#C8795A]">in your sessions.</em>
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.85]">
                Your therapist draws from the full CBT toolkit, selecting and adapting techniques based on your presentation and goals.
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
              {techniques.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-[#FAF8F5] rounded-full px-5 py-3 hover:bg-[#2C3B2E] group transition-all duration-300 cursor-default"
                >
                  <i className={`${t.icon} text-sm transition-colors duration-300`} style={{ color: ACCENT }}></i>
                  <span className="text-xs font-medium text-[#2C3B2E] group-hover:text-[#FAF8F5] transition-colors duration-300 whitespace-nowrap">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
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
            Your thoughts can change.<br />
            So can your life.
          </h2>
          <p className="text-[#FAF8F5]/60 font-light leading-[1.85] mb-10 text-base">
            A free, confidential consultation is the first step. Our clinical team will help you
            understand whether CBT is right for you and how quickly you can begin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] transition-all duration-300 hover:opacity-85"
              style={{ backgroundColor: WARM }}
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
