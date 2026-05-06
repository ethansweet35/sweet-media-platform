import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Image from 'next/image';
import Link from 'next/link';

const fallbackMetadata: Metadata = {
  title: 'Mental Health For Teens | Teen Therapy & Outpatient Programs in Colorado',
  description:
    'Specialized mental health treatment for teenagers ages 12–18. Individual therapy, group therapy, IOP, and family therapy in Colorado. Free consultation available.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

const IMAGES = {
  hero: '/images/mhft-hero-art-premium.png',
  aurora: '/images/mhft-art-texture-aurora.png',
  testimonial: '/images/mhft-testimonial-art.png',
  services: 'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-services.png',
  about: 'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-about.png',
} as const;

const trustItems = ['Most Major Insurance Accepted', 'HIPAA-Compliant Care', 'Licensed Clinical Team', 'Same-Week Admissions'];

const services = [
  {
    title: 'Individual Therapy',
    description: 'One-on-one sessions that help teens build emotional regulation, self-worth, and coping skills.',
  },
  {
    title: 'Intensive Outpatient Program',
    description: 'Structured, evidence-based support for teens who need more than weekly therapy.',
  },
  {
    title: 'Family Integration',
    description: 'Guided sessions for healthier communication and practical support at home.',
  },
];

const prismPillars = [
  {
    title: 'Stabilize',
    description: 'Create immediate emotional safety and reduce overwhelm for your teen and family.',
  },
  {
    title: 'Clarify',
    description: 'Understand what is driving symptoms, school stress, withdrawal, or mood changes.',
  },
  {
    title: 'Reconnect',
    description: 'Strengthen communication and help your teen feel supported instead of managed.',
  },
  {
    title: 'Sustain',
    description: 'Build practical skills and a continuing plan for life outside treatment.',
  },
];

const conditions = ['Anxiety and panic symptoms', 'Depression and mood instability', 'School refusal and social withdrawal', 'Trauma-related symptoms'];

const steps = [
  {
    title: 'Confidential Call',
    description: 'Talk with our admissions specialist and share your family\'s needs.',
  },
  {
    title: 'Insurance Verification',
    description: 'We verify benefits and explain costs clearly before enrollment.',
  },
  {
    title: 'Clinical Assessment',
    description: 'A licensed clinician recommends a care path tailored to your teen.',
  },
  {
    title: 'Start Care Quickly',
    description: 'Most families begin treatment within days, not weeks.',
  },
];

const testimonials = [
  {
    quote:
      'The first phone call gave us immediate relief. Their team was calm, clear, and handled insurance without making us chase paperwork.',
    attribution: 'Parent of 15-year-old client',
  },
  {
    quote:
      'My daughter felt respected from day one. The clinicians were warm and skilled, and the program helped our family reconnect.',
    attribution: 'Parent of 14-year-old client',
  },
];

const faqs = [
  {
    question: 'Do you accept insurance?',
    answer: 'Yes. We work with most major plans and verify eligibility before treatment starts.',
  },
  {
    question: 'How quickly can my teen start?',
    answer: 'Most families complete intake and begin care within 3-5 business days.',
  },
  {
    question: 'What age range do you treat?',
    answer: 'We provide outpatient mental health support for teens ages 12-18.',
  },
];

type IconName = 'spark' | 'shield' | 'path' | 'heart';
const textureLayerClass = 'absolute inset-0';

function DuotoneIcon({ name }: { name: IconName }) {
  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
        <path d="M12 2 4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3Z" className="fill-deep-indigo/25" />
        <path d="M12 2 4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3Z" className="stroke-intelligence-blue fill-none" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === 'path') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
        <circle cx="6" cy="6" r="3" className="fill-petal-pink/65" />
        <circle cx="18" cy="18" r="3" className="fill-cyan-glow/60" />
        <path d="M8.5 7.5c4 0 7 3 7 7" className="stroke-intelligence-blue fill-none" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
        <path d="M12 20.6 4.8 13.9a4.8 4.8 0 0 1 6.8-6.8L12 8l.4-.9a4.8 4.8 0 1 1 6.8 6.8L12 20.6Z" className="fill-petal-pink/55" />
        <path d="m12 20.6-7.2-6.7a4.8 4.8 0 0 1 6.8-6.8L12 8l.4-.9a4.8 4.8 0 1 1 6.8 6.8L12 20.6Z" className="stroke-intelligence-blue fill-none" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <circle cx="12" cy="12" r="8" className="fill-subtle-lavender/70" />
      <path d="m12 7 1.5 3.2 3.5.4-2.6 2.4.7 3.6L12 14.8l-3.1 1.8.7-3.6L7 10.6l3.5-.4L12 7Z" className="stroke-intelligence-blue fill-none" strokeWidth="1.4" />
    </svg>
  );
}

function SoftTexture({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <div className={`${textureLayerClass} rounded-[inherit] bg-[radial-gradient(110%_130%_at_12%_8%,rgba(255,215,240,0.45)_0%,rgba(255,255,255,0)_58%)]`} />
      <div className={`${textureLayerClass} rounded-[inherit] bg-[radial-gradient(120%_120%_at_85%_25%,rgba(153,255,249,0.32)_0%,rgba(255,255,255,0)_62%)]`} />
      <div className={`${textureLayerClass} rounded-[inherit] bg-[linear-gradient(130deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_48%)]`} />
    </div>
  );
}

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-intelligence-blue">
      <span className="h-2 w-2 rounded-full bg-[linear-gradient(135deg,#328efa,#e2ddfd)]" aria-hidden />
      {label}
    </p>
  );
}

function PrismMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M32 5 58 20v28L32 63 6 48V20L32 5Z" className="fill-canvas-white/16 stroke-canvas-white/45" strokeWidth="1.2" />
      <path d="M32 5v58M6 20l26 15 26-15M6 48l26-13 26 13" className="stroke-cyan-glow/70" strokeWidth="1.1" />
      <path d="M32 5 58 48 32 35 6 48 32 5Z" className="fill-[rgba(255,215,240,0.22)]" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative isolate min-h-screen pt-32 pb-16 md:pt-40">
        <div className="absolute inset-0 -z-20">
          <Image src={IMAGES.hero} alt="Teen and caregiver with clinician in a calming treatment environment" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,13,32,0.72)_0%,rgba(14,17,35,0.44)_45%,rgba(14,17,35,0.08)_100%)]" />
        </div>
        <div className="absolute inset-0 -z-10 premium-grain opacity-25" />
        <div className="absolute left-0 top-0 -z-10 h-full w-[58%] bg-[radial-gradient(80%_70%_at_22%_35%,rgba(153,255,249,0.2),transparent_62%)]" />

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end xl:px-14">
          <div className="flex flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-canvas-white/24 bg-canvas-white/10 px-4 py-2 backdrop-blur-sm">
            <PrismMark className="h-6 w-6" />
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-canvas-white/80">The Prism Path for Teen Mental Health</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-balance text-canvas-white text-[clamp(2.2rem,5.4vw,4.8rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
              When your teen is struggling,
              <br />
              <span className="bg-[linear-gradient(120deg,#ffd7f0_0%,#e2ddfd_45%,#99fff9_100%)] bg-clip-text text-transparent">the next step should feel clear.</span>
            </h1>
            <p className="max-w-2xl text-pretty text-[15px] leading-7 text-canvas-white/80 md:text-[17px] md:leading-8">
              A warm, elevated outpatient experience for families navigating teen anxiety, depression, school withdrawal, and emotional overwhelm. We pair licensed
              clinical care with a concierge admissions process that makes the first step easier.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:+17197338556"
              className="inline-flex items-center gap-2 rounded-xl bg-canvas-white px-6 py-3 text-sm font-semibold text-midnight-ink shadow-[0_16px_36px_-18px_rgba(0,0,0,0.55)]"
            >
              Call Now
            </a>
            <Link
              href="/admissions#inquiry-form"
              className="inline-flex items-center gap-2 rounded-xl border border-canvas-white/35 bg-canvas-white/10 px-6 py-3 text-sm font-semibold text-canvas-white backdrop-blur-sm hover:bg-canvas-white/15"
            >
              Verify Insurance
            </Link>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-3 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item} className="glass-luxe rounded-xl px-4 py-3">
                <span className="text-sm text-canvas-white/85">{item}</span>
              </div>
            ))}
          </div>
          </div>

          <article className="glass-luxe hidden rounded-[30px] p-6 text-canvas-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.7)] xl:block">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-canvas-white/70">Prism Intake Signature</p>
              <PrismMark className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">A calmer way to move from crisis questions to a real plan.</h2>
            <p className="mt-4 text-[15px] leading-7 text-canvas-white/82">
              No maze of forms. No pressure. Just a private call, transparent insurance help, and a clinical recommendation your family can understand.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-canvas-white/30 bg-canvas-white/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-canvas-white/65">Average Intake</p>
                <p className="mt-1 text-xl font-semibold">72 Hrs</p>
              </div>
              <div className="rounded-xl border border-canvas-white/30 bg-canvas-white/10 p-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-canvas-white/65">Insurance Help</p>
                <p className="mt-1 text-xl font-semibold">Included</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-black/5 bg-whisper-gray/55 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 md:px-10 xl:px-14">
          {['Prism Path Method', 'Evidence-Based Treatment', 'Family-Centered Approach', 'Private and Confidential'].map((item) => (
            <p key={item} className="text-[12px] font-medium uppercase tracking-[0.22em] text-muted-ash">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-24">
        <Image src={IMAGES.aurora} alt="" fill className="-z-20 object-cover opacity-80" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-canvas-white/42 backdrop-blur-[1px]" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 xl:px-14">
          <div className="mb-10 max-w-3xl space-y-4">
            <Eyebrow label="The Theme" />
            <h2 className="text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight tracking-[-0.03em] text-midnight-ink">
              The Prism Path: turning overwhelm into a clearer spectrum of care.
            </h2>
            <p className="max-w-2xl text-[16px] leading-8 text-surface-charcoal/75">
              This homepage now uses a custom prism-and-aurora visual system: soft light, glass layers, and calm color transitions that feel hopeful without
              becoming playful or clinical.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {prismPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="group relative min-h-[220px] overflow-hidden rounded-[28px] border border-canvas-white/65 bg-canvas-white/58 p-6 shadow-[0_24px_70px_-46px_rgba(46,36,96,0.8)] backdrop-blur-md"
              >
                <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(153,255,249,0.44),transparent_68%)]" aria-hidden />
                <div className="mb-8 flex items-center justify-between">
                  <PrismMark className="h-10 w-10 drop-shadow-sm" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-ash">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em] text-midnight-ink">{pillar.title}</h3>
                <p className="text-[15px] leading-7 text-muted-ash">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 xl:grid-cols-[1fr_1.08fr] xl:items-center xl:px-14">
          <div className="space-y-6">
            <Eyebrow label="Services Snapshot" />
            <h2 className="text-balance text-[clamp(1.9rem,3.8vw,3.2rem)] font-semibold leading-tight tracking-[-0.02em] text-midnight-ink">
              Structured Support That Feels Human, Not Clinical.
            </h2>
            <p className="max-w-xl text-[16px] leading-7 text-muted-ash">
              Our care model blends clinical excellence with warmth, so your teen receives meaningful treatment in an environment that feels safe and respectful.
            </p>

            <div className="space-y-4">
              {services.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-black/7 bg-canvas-white p-5 shadow-[0_12px_30px_-24px_rgba(17,17,17,0.55)] before:mb-4 before:block before:h-px before:w-14 before:bg-[linear-gradient(90deg,#328efa,#e2ddfd)] before:content-['']"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="grid h-9 w-9 place-content-center rounded-xl bg-whisper-gray">
                      <DuotoneIcon name={index === 0 ? 'heart' : index === 1 ? 'path' : 'shield'} />
                    </div>
                    <h3 className="text-[18px] font-semibold text-midnight-ink">{item.title}</h3>
                  </div>
                  <p className="text-[15px] leading-7 text-muted-ash">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative h-[540px] overflow-hidden rounded-[34px] border border-black/7 bg-whisper-gray shadow-[0_34px_90px_-58px_rgba(46,36,96,0.9)]">
            <Image src={IMAGES.aurora} alt="" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 50vw" />
            <SoftTexture className="absolute inset-0" />
            <div className="absolute inset-x-8 bottom-8 rounded-[24px] border border-canvas-white/60 bg-canvas-white/64 p-6 backdrop-blur-md">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-intelligence-blue">Care Spectrum</p>
              <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-midnight-ink">
                Therapy, family support, and structured outpatient care under one visual system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-whisper-gray/50 py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 premium-grain opacity-[0.08]" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-2 xl:px-14">
          <div className="space-y-4">
            <Eyebrow label="What We Treat" />
            <h2 className="text-balance text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-midnight-ink">
              Focused Support for the Challenges Teens Face Right Now.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {conditions.map((condition) => (
              <div key={condition} className="rounded-2xl border border-black/8 bg-canvas-white p-5">
                <div className="mb-3 grid h-8 w-8 place-content-center rounded-lg bg-whisper-gray">
                  <DuotoneIcon name="spark" />
                </div>
                <p className="text-[15px] leading-6 text-midnight-ink">{condition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fcfbff_100%)] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 xl:px-14">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <Eyebrow label="How It Works" />
              <h2 className="text-balance text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold tracking-[-0.02em] text-midnight-ink">A Clear Path From First Call to First Breakthrough.</h2>
            </div>
            <Link href="/admissions" className="inline-flex items-center rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-midnight-ink hover:bg-whisper-gray">
              View Admissions Details
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-black/7 bg-canvas-white p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-intelligence-blue">Step {index + 1}</p>
                <h3 className="mb-2 text-[18px] font-semibold text-midnight-ink">{step.title}</h3>
                <p className="text-[15px] leading-7 text-muted-ash">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4fb] py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr] xl:px-14">
          <div className="relative min-h-[320px] overflow-hidden rounded-[34px] border border-black/8 shadow-[0_34px_90px_-58px_rgba(46,36,96,0.9)] lg:min-h-full">
            <Image src={IMAGES.testimonial} alt="Caregiver offering support to a teen in a calm, hopeful environment" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 46vw" />
            <SoftTexture className="absolute inset-0" />
          </div>
          <div>
          <div className="mb-10 max-w-3xl space-y-3">
            <Eyebrow label="Family Outcomes" />
            <h2 className="text-balance text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold tracking-[-0.02em] text-midnight-ink">Families Describe a Process That Feels Respectful, Skilled, and Grounded.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote key={item.attribution} className="rounded-3xl border border-black/8 bg-canvas-white/90 p-7 shadow-[0_12px_36px_-28px_rgba(17,17,17,0.6)] backdrop-blur">
                <p className="mb-6 text-[17px] leading-8 text-midnight-ink">&ldquo;{item.quote}&rdquo;</p>
                <cite className="text-[13px] font-medium not-italic text-muted-ash">{item.attribution}</cite>
              </blockquote>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:px-14">
          <div className="relative h-[420px] overflow-hidden rounded-[30px] border border-black/8">
            <Image src={IMAGES.about} alt="Licensed teen clinicians in a warm and modern therapy setting" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 55vw" />
            <SoftTexture className="absolute inset-0" />
          </div>
          <div className="space-y-5">
            <Eyebrow label="Clinician Team" />
            <h2 className="text-balance text-[clamp(1.8rem,3.2vw,2.7rem)] font-semibold tracking-[-0.02em] text-midnight-ink">Licensed Professionals With Deep Adolescent Expertise.</h2>
            <p className="text-[16px] leading-8 text-muted-ash">
              Our multidisciplinary team includes licensed therapists and adolescent mental health specialists who partner with families through every phase of care.
            </p>
            <Link href="/about" className="inline-flex items-center rounded-xl bg-midnight-ink px-5 py-3 text-sm font-semibold text-canvas-white hover:bg-surface-charcoal">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-whisper-gray/55 py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="mb-9 space-y-3 text-center">
            <Eyebrow label="FAQ" />
            <h2 className="text-balance text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold tracking-[-0.02em] text-midnight-ink">Questions Families Ask Before Getting Started.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-black/8 bg-canvas-white p-5 open:shadow-[0_10px_24px_-20px_rgba(0,0,0,0.5)]">
                <summary className="cursor-pointer list-none text-[16px] font-semibold text-midnight-ink">{item.question}</summary>
                <p className="pt-3 text-[15px] leading-7 text-muted-ash">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-24">
        <Image src={IMAGES.aurora} alt="" fill className="-z-20 object-cover opacity-80" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-canvas-white/48" aria-hidden />
        <div className="absolute inset-0 premium-grain opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="glass-luxe rounded-[34px] border border-black/8 p-8 text-center shadow-[0_30px_60px_-38px_rgba(17,17,17,0.5)] md:p-12">
            <Eyebrow label="Next Step" />
            <h2 className="mx-auto max-w-3xl text-balance text-[clamp(2rem,3.7vw,3rem)] font-semibold leading-tight tracking-[-0.02em] text-midnight-ink">
              Start With a Private Conversation and a Clear Plan for Your Teen.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-muted-ash">
              Speak with our admissions team today. We will answer questions, verify insurance, and help your family decide on the right next step with zero pressure.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="tel:+17197338556" className="rounded-xl bg-midnight-ink px-6 py-3 text-sm font-semibold text-canvas-white hover:bg-surface-charcoal">
                Call Now: (719) 733-8556
              </a>
              <Link href="/admissions#inquiry-form" className="rounded-xl border border-black/10 bg-canvas-white px-6 py-3 text-sm font-semibold text-midnight-ink hover:bg-whisper-gray">
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
