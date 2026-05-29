import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "BPD Treatment in Missouri | Missouri Behavioral Health",
  description:
    "Borderline personality disorder (BPD) treatment in Springfield, MO. DBT-informed therapy, emotion-regulation skills, and psychiatric care. PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/bpd-treatment-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/bpd-treatment-missouri", fallback);
}

const SIGNS = [
  "Intense, rapidly shifting emotions that feel difficult to control",
  "A deep fear of abandonment and frantic efforts to avoid it",
  "Unstable, intense relationships that swing between idealization and disappointment",
  "An unstable or shifting sense of self and identity",
  "Impulsive behaviors — spending, substance use, risky decisions",
  "Chronic feelings of emptiness",
  "Recurrent self-harm, suicidal thoughts, or threats",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Intensive daily DBT-informed programming for those in acute distress or crisis." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "Structured skills groups and individual therapy several days per week." },
  { icon: "ri-calendar-check-line", label: "Outpatient Therapy", desc: "Ongoing individual DBT-informed therapy and skills practice." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Telehealth therapy and skills groups available across Missouri." },
];

const APPROACH = [
  { icon: "ri-scales-3-line", label: "Dialectical Behavior Therapy (DBT)", desc: "The gold-standard treatment for BPD — building skills in mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness." },
  { icon: "ri-heart-line", label: "Emotion Regulation Skills", desc: "Practical tools to understand, name, and ride out intense emotions without acting on harmful urges." },
  { icon: "ri-shield-cross-line", label: "Distress Tolerance & Safety", desc: "Crisis-survival skills and collaborative safety planning to navigate the hardest moments." },
  { icon: "ri-group-line", label: "Skills Groups", desc: "Structured group practice of DBT skills, plus peer support that reduces isolation and shame." },
  { icon: "ri-mental-health-line", label: "Co-occurring Treatment", desc: "We treat the depression, anxiety, trauma, and substance use that often accompany BPD." },
  { icon: "ri-home-heart-line", label: "Family & Relationships", desc: "Helps loved ones understand BPD and rebuild healthier, more stable connections." },
];

const FAQS = [
  { q: "Is BPD treatable?", a: "Yes — and this is important to hear: borderline personality disorder is highly treatable. With evidence-based care like DBT, the majority of people experience significant, lasting improvement and many achieve full remission of symptoms over time." },
  { q: "What is DBT and why is it used for BPD?", a: "Dialectical Behavior Therapy (DBT) was developed specifically for BPD. It teaches four core skill sets — mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness — that directly target the emotional intensity and impulsivity at the heart of BPD." },
  { q: "How is BPD different from bipolar disorder?", a: "They're often confused but are distinct. Bipolar disorder involves mood episodes lasting days to weeks. BPD involves rapid emotional shifts (often within hours) usually triggered by interpersonal events, along with identity and relationship instability. Accurate diagnosis guides effective treatment." },
  { q: "Does BPD co-occur with other conditions?", a: "Frequently. Depression, anxiety, PTSD, and substance use disorders commonly co-occur with BPD. Our integrated program treats these together, which improves outcomes and reduces relapse." },
  { q: "Does insurance cover BPD treatment?", a: "Yes — BPD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health, and verify your benefits at no cost before your first session." },
];

export default function BpdTreatmentPage() {
  return (
    <MentalHealthPageLayout
      conditionName="BPD"
      heroHeading="BPD Treatment in Missouri"
      heroSubcopy="Compassionate, DBT-informed treatment for borderline personality disorder in Springfield, MO — building the skills to regulate emotions, steady relationships, and reclaim stability."
      stats={[
        { value: "DBT", label: "Gold-standard BPD therapy" },
        { value: "Highly", label: "Treatable with the right care" },
        { value: "PHP + IOP", label: "Intensive programs available" },
      ]}
      currentPath="/bpd-treatment-missouri"
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
                BPD treatment at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Borderline personality disorder is one of the most misunderstood — and most stigmatized — mental health conditions. At its core, BPD is a disorder of emotional intensity: feelings come on fast and strong, relationships feel fragile, and the sense of self can feel unstable.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The good news is that BPD responds remarkably well to treatment. Through DBT-informed care, our team helps you build the skills to steady your emotions and your life.
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
              <img src={SITE_IMAGES.therapyGroup} alt="BPD therapy and DBT skills group in Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">DBT</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of BPD.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                A diagnosis involves a pattern of several of these features over time. If this resonates, a compassionate evaluation is the first step toward relief.
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">BPD programs at MBH.</h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat BPD.</h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">BPD treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                BPD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session at no cost.
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
