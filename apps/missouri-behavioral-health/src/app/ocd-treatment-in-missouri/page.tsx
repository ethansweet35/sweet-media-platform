import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "OCD Treatment in Missouri | Missouri Behavioral Health",
  description:
    "OCD treatment in Springfield, MO. ERP therapy, CBT, and evidence-based care for obsessive-compulsive disorder. PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/ocd-treatment-in-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ocd-treatment-in-missouri", fallback);
}

const SIGNS = [
  "Persistent, intrusive thoughts or images that cause significant anxiety (obsessions)",
  "Repetitive behaviors or mental acts performed to neutralize anxiety (compulsions)",
  "Rituals that take more than one hour per day or significantly disrupt daily functioning",
  "Recognition that obsessions and compulsions are irrational, but inability to stop",
  "Distress when unable to complete compulsions — anxiety that the 'right' feeling won't come",
  "Avoidance of situations that trigger obsessions",
  "The content of obsessions shifts or escalates over time",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Intensive daily ERP and CBT programming for OCD with significant symptom burden — 5–7 days/week." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours/week of structured ERP group and individual therapy for OCD alongside daily responsibilities." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly individual ERP therapy for clients with OCD in a stable home environment." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "ERP-based OCD treatment via secure telehealth — accessible across Missouri." },
];

const APPROACH = [
  { icon: "ri-shield-line", label: "Exposure & Response Prevention (ERP)", desc: "The gold standard for OCD — gradual, systematic exposure to feared situations while resisting compulsive responses, reducing their power over time." },
  { icon: "ri-brain-line", label: "Cognitive Restructuring", desc: "Addresses the catastrophic beliefs and misinterpretations of intrusive thoughts that fuel the obsessional cycle." },
  { icon: "ri-heart-line", label: "Acceptance & Commitment Therapy", desc: "Builds psychological flexibility — helping clients observe intrusive thoughts without being fused with or controlled by them." },
  { icon: "ri-medicine-bottle-line", label: "Medication Management", desc: "SSRIs are the first-line pharmacological treatment for OCD. Our psychiatric team evaluates and manages medication when appropriate." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Structured OCD-specific group work — sharing exposure hierarchies, processing shame, and building accountability." },
  { icon: "ri-mental-health-line", label: "Mindfulness-Based Skills", desc: "Mindfulness practices help clients observe intrusive thoughts as mental events rather than true threats, reducing their emotional grip." },
];

const FAQS = [
  { q: "What is OCD?", a: "Obsessive-compulsive disorder (OCD) is a chronic mental health condition characterized by obsessions (unwanted, intrusive thoughts, images, or urges) and compulsions (repetitive behaviors or mental acts performed to reduce the anxiety they cause). OCD exists on a spectrum of severity and can significantly impair quality of life." },
  { q: "What is ERP and why is it used for OCD?", a: "Exposure and Response Prevention (ERP) is the most effective treatment for OCD. It involves gradually facing the situations that trigger obsessions while refraining from the compulsive responses. Over time, this teaches the brain that anxiety naturally decreases without compulsions — and that feared outcomes don't actually occur." },
  { q: "Does OCD get better without treatment?", a: "OCD typically does not resolve on its own and tends to worsen over time if untreated. The obsessional cycle can spread to new domains and compulsions can become more elaborate and time-consuming. Early, effective treatment with ERP and/or medication dramatically improves outcomes." },
  { q: "Can OCD co-occur with other conditions?", a: "Yes — OCD frequently co-occurs with depression, anxiety disorders, PTSD, and in some cases substance use disorders. Treating OCD alongside any co-occurring conditions simultaneously in integrated care produces the best outcomes." },
  { q: "Does insurance cover OCD treatment?", a: "Yes — OCD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified at no cost before your first session." },
];

export default function OcdPage() {
  return (
    <MentalHealthPageLayout
      conditionName="OCD"
      heroHeading="OCD Treatment in Missouri"
      heroSubcopy="Evidence-based OCD treatment using Exposure and Response Prevention (ERP), CBT, and ACT — helping adults in Springfield, MO break the obsessional cycle and reclaim their lives."
      stats={[
        { value: "2–3%", label: "of adults have OCD" },
        { value: "ERP", label: "Gold-standard OCD therapy" },
        { value: "PHP + IOP", label: "Intensive programs available" },
      ]}
      currentPath="/ocd-treatment-in-missouri"
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
                OCD treatment at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Obsessive-compulsive disorder is widely misunderstood as a personality quirk or preference for order. In reality, OCD is a serious and often debilitating condition in which the brain becomes trapped in a cycle of intrusive thoughts and compulsive rituals that can consume hours of each day.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                With the right treatment — primarily Exposure and Response Prevention (ERP) — the majority of people with OCD achieve significant symptom reduction. Our therapists are trained in ERP and deliver it within a compassionate, non-judgmental therapeutic relationship.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="OCD therapy session Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">ERP</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Evidence-based</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of OCD.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                OCD can look very different from person to person. The common thread is not the content of obsessions — it is the cycle of intrusive thoughts, anxiety, compulsion, and temporary relief.
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">OCD programs at MBH.</h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat OCD.</h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">OCD treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                OCD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session at no cost.
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
