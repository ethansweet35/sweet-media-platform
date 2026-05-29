import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "PTSD Counseling in Springfield, MO | Missouri Behavioral Health",
  description:
    "Trauma-informed PTSD treatment in Springfield, MO. EMDR, trauma-focused CBT, and evidence-based care for post-traumatic stress disorder. PHP, IOP, outpatient. Call 24/7.",
  alternates: { canonical: "/ptsd-counseling-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ptsd-counseling-springfield-mo", fallback);
}

const SIGNS = [
  "Intrusive memories, flashbacks, or nightmares of the traumatic event",
  "Intense emotional or physical distress when reminded of the trauma",
  "Persistent avoidance of thoughts, feelings, people, or places related to the trauma",
  "Negative changes in beliefs and feelings — guilt, shame, detachment, emotional numbness",
  "Hypervigilance — feeling constantly on guard, easily startled, or unable to relax",
  "Sleep disturbances — difficulty falling asleep, staying asleep, or restful rest",
  "Irritability, angry outbursts, or reckless behavior",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Intensive daily structure for PTSD with significant symptom burden — 5–7 days/week with close clinical oversight." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours/week of trauma-focused group and individual therapy alongside daily responsibilities." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly individual EMDR and trauma-focused therapy for stable clients in a safe home environment." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Trauma-focused therapy via secure telehealth — accessible across Missouri for those who prefer care from home." },
];

const APPROACH = [
  { icon: "ri-eye-line", label: "EMDR Therapy", desc: "Eye Movement Desensitization and Reprocessing is one of the most effective evidence-based treatments for PTSD — helping the brain reprocess traumatic memories." },
  { icon: "ri-brain-line", label: "Trauma-Focused CBT (TF-CBT)", desc: "Cognitive restructuring of trauma-related beliefs, gradual exposure, and behavioral skills to reduce PTSD symptoms." },
  { icon: "ri-body-line", label: "Somatic Approaches", desc: "Body-based techniques address the physiological manifestations of trauma that remain stored in the nervous system beyond cognitive processing." },
  { icon: "ri-group-line", label: "Trauma-Informed Group Therapy", desc: "Structured peer support with others who understand trauma — reducing shame and isolation while building community." },
  { icon: "ri-mental-health-line", label: "Mindfulness & Grounding", desc: "Present-moment awareness and grounding techniques manage dissociation, hypervigilance, and flashback responses." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "PTSD significantly impacts relationships. We engage family members to build understanding, reduce secondary traumatization, and strengthen support." },
];

const FAQS = [
  { q: "What causes PTSD?", a: "PTSD can develop after any traumatic experience — combat, sexual assault, childhood abuse, accidents, natural disasters, sudden loss, or witnessing violence. Not everyone who experiences trauma develops PTSD; risk factors include prior trauma, lack of support, and the severity and duration of the traumatic event." },
  { q: "What is EMDR and how does it work?", a: "EMDR (Eye Movement Desensitization and Reprocessing) uses bilateral stimulation — typically eye movements — while recalling traumatic memories. This appears to help the brain process and integrate memories that have become 'stuck' in a traumatic state, reducing their emotional charge. It is recognized by the APA, VA, and WHO as an effective PTSD treatment." },
  { q: "Can PTSD be fully treated?", a: "Many people with PTSD achieve significant symptom reduction or full remission with evidence-based treatment. EMDR and trauma-focused CBT have strong evidence for producing meaningful, lasting improvement. Early treatment and sustained engagement improve outcomes." },
  { q: "Can I have PTSD and a substance use disorder?", a: "Yes — PTSD and substance use disorders frequently co-occur. Many people use alcohol or drugs to manage intrusive symptoms, nightmares, or emotional numbing. Treating both simultaneously in integrated care produces significantly better outcomes." },
  { q: "Does insurance cover PTSD treatment?", a: "Yes — PTSD is a covered mental health condition under the ACA and mental health parity laws. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session." },
];

export default function PtsdPage() {
  return (
    <MentalHealthPageLayout
      conditionName="PTSD"
      heroHeading="PTSD Counseling in Springfield, MO"
      heroSubcopy="Trauma-informed PTSD treatment — EMDR, trauma-focused CBT, somatic therapy, and evidence-based care for post-traumatic stress disorder in Springfield, Missouri."
      stats={[
        { value: "70%", label: "of adults experience trauma in their lifetime" },
        { value: "EMDR", label: "WHO-endorsed PTSD therapy" },
        { value: "Integrated", label: "Co-occurring disorder treatment available" },
      ]}
      currentPath="/ptsd-counseling-springfield-mo"
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
                PTSD treatment at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Post-traumatic stress disorder develops when traumatic experiences are not fully processed by the brain — leaving memories, emotions, and physical responses stuck in a state of acute stress. PTSD is not a sign of weakness; it is the brain's survival mechanism working in a context where survival is no longer threatened.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Our trauma-informed clinical team uses EMDR, trauma-focused CBT, somatic approaches, and group therapy to help clients process and integrate traumatic experiences — restoring safety, functioning, and connection.
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
              <img src={SITE_IMAGES.therapyGroup} alt="PTSD therapy session Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">EMDR</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Available</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of PTSD.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                PTSD symptoms typically appear within 3 months of a traumatic event, though they can surface years later. They must persist for more than one month and cause significant distress or functional impairment.
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">PTSD programs at MBH.</h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat PTSD.</h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">PTSD treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                PTSD and trauma-related disorders are covered mental health benefits. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified at no cost before your first appointment.
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
