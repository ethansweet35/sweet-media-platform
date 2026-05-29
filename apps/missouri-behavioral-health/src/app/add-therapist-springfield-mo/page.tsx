import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "ADD Treatment & Therapy in Springfield, MO | Missouri Behavioral Health",
  description:
    "Attention-deficit disorder (ADD) evaluation and therapy in Springfield, MO. CBT, skills coaching, and psychiatric care for adults. PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/add-therapist-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/add-therapist-springfield-mo", fallback);
}

const SIGNS = [
  "Difficulty sustaining attention on tasks, reading, or conversations",
  "Frequently losing track of details, deadlines, or belongings",
  "Trouble organizing tasks and managing time",
  "Easily distracted and mentally 'foggy' or forgetful",
  "Avoiding tasks that require sustained mental effort",
  "Starting many projects but struggling to finish them",
  "Feelings of underachievement, frustration, or low self-esteem",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Intensive support when ADD co-occurs with depression, anxiety, or substance use that disrupts daily functioning." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "Structured group and individual therapy with executive-function skills coaching." },
  { icon: "ri-calendar-check-line", label: "Outpatient Therapy", desc: "Weekly individual therapy and psychiatric care for attention and focus challenges." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Telehealth assessment and therapy available across Missouri." },
];

const APPROACH = [
  { icon: "ri-focus-3-line", label: "Skills & Executive-Function Coaching", desc: "Practical strategies for organization, planning, and follow-through that make daily life manageable." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Addresses the negative thought patterns and self-criticism that often accompany attention difficulties." },
  { icon: "ri-medicine-bottle-line", label: "Psychiatric Evaluation", desc: "Comprehensive assessment and, when appropriate, medication management by our psychiatric team." },
  { icon: "ri-mental-health-line", label: "Co-occurring Treatment", desc: "ADD frequently overlaps with anxiety and depression — we treat them together for better outcomes." },
  { icon: "ri-group-line", label: "Group Support", desc: "Connect with others who understand the daily realities of attention challenges." },
  { icon: "ri-leaf-line", label: "Lifestyle & Wellness", desc: "Sleep, movement, and mindfulness routines that meaningfully improve focus and regulation." },
];

const FAQS = [
  { q: "What is the difference between ADD and ADHD?", a: "ADD is an older term often used to describe attention difficulties without significant hyperactivity. Clinically, it falls under ADHD — Predominantly Inattentive Presentation. The treatment approach focuses on attention, organization, and follow-through." },
  { q: "Can adults be diagnosed with ADD?", a: "Yes. Many adults live for years with undiagnosed attention difficulties, often blaming themselves for struggles with focus or organization. A proper evaluation can be life-changing and opens the door to effective treatment." },
  { q: "Do I have to take medication?", a: "No. Medication is one option, not a requirement. Many people benefit from therapy and skills coaching alone, or in combination with medication. We build a plan around your preferences and goals." },
  { q: "Does ADD co-occur with other conditions?", a: "Often, yes. Anxiety, depression, and substance use commonly co-occur with attention disorders. Treating them together produces the best results, which is a core strength of our integrated program." },
  { q: "Does insurance cover ADD treatment?", a: "Yes — ADD/ADHD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health, and verify your benefits at no cost before your first session." },
];

export default function AddTreatmentPage() {
  return (
    <MentalHealthPageLayout
      conditionName="ADD"
      heroHeading="ADD Treatment in Missouri"
      heroSubcopy="Compassionate, evidence-based care for attention-deficit disorder in Springfield, MO — combining therapy, executive-function coaching, and psychiatric support for adults."
      stats={[
        { value: "Adults", label: "Specialized adult attention care" },
        { value: "CBT", label: "Evidence-based therapy" },
        { value: "PHP + IOP", label: "Programs for co-occurring needs" },
      ]}
      currentPath="/add-therapist-springfield-mo"
    >
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Overview</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                ADD treatment at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Attention-deficit disorder is far more than occasional distraction. For many adults, it means years of struggling with focus, organization, and follow-through — often accompanied by frustration and self-blame that erode confidence.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                With the right evaluation and support, the picture changes. We combine therapy, practical skills coaching, and psychiatric care to help you work with your brain instead of against it.
              </p>
              <div className="mt-8 flex gap-3">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover">
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white">
                  Verify insurance
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_IMAGES.therapyGroup} alt="ADD therapy session in Springfield, Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Focus</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Skills-Based Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Signs & Symptoms</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of ADD.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Inattentive-type symptoms are easy to miss because they&apos;re quiet. If these patterns sound familiar and persist across settings, an evaluation can help.
              </p>
              <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">Talk to our team</a>
            </div>
            <ul className="space-y-3">
              {SIGNS.map((s) => (
                <li key={s} className="flex items-start gap-4 rounded-2xl border border-white/6 bg-white/4 px-5 py-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                    <i className="ri-check-line text-[10px] text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm leading-relaxed text-white/75">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">ADD programs at MBH.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <div key={p.label} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mbh-forest/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${p.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{p.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat ADD.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((a) => (
              <div key={a.label} className="flex items-start gap-4 rounded-2xl border border-mbh-forest/8 bg-cream p-5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${a.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{a.label}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-mbh-body">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">ADD treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                ADD/ADHD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session at no cost.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  <i className="ri-shield-check-line" aria-hidden /> Check my coverage
                </Link>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((c) => (
                <div key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">Common questions.</h2>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline">
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>
    </MentalHealthPageLayout>
  );
}
