import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Meth Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Methamphetamine addiction treatment in Springfield, MO. Evidence-based behavioral therapy, PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/meth-rehab-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/meth-rehab-springfield-mo", fallback);
}

const SIGNS = [
  "Staying awake for days at a time, followed by extended 'crashes'",
  "Dramatic weight loss and poor nutrition",
  "Severe dental deterioration ('meth mouth')",
  "Paranoia, hallucinations, or psychotic behavior during or after use",
  "Picking at skin, open sores from repetitive scratching",
  "Financial problems due to spending on meth",
  "Withdrawal depression and inability to feel pleasure when not using",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "5–7 days per week of intensive programming — provides the structure and frequency needed to stabilize the severe mood dysregulation meth causes.",
  },
  {
    icon: "ri-brain-line",
    label: "Cognitive Behavioral Therapy",
    desc: "The Matrix Model and CBT are gold-standard approaches for meth treatment — addressing craving triggers, distorted thinking, and behavioral patterns.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours weekly — balancing clinical intensity with the real-world engagement that sustains long-term recovery.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Complete outpatient care delivered online for clients across Missouri who prefer to receive care from home.",
  },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "The Matrix Model", desc: "A structured behavioral approach specifically developed for stimulant use disorders, combining CBT, group therapy, and family education." },
  { icon: "ri-heart-line", label: "Contingency Management", desc: "Positive reinforcement for drug-free test results that builds momentum and rewards the early behavioral changes that make recovery durable." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Peer-based recovery community that reduces the shame and isolation that often sustains meth use and builds accountability." },
  { icon: "ri-mental-health-line", label: "Psychosis Management", desc: "Meth-induced psychosis can be severe. Our psychiatric team provides assessment and treatment to stabilize mental status during early recovery." },
  { icon: "ri-run-line", label: "Exercise & Wellness", desc: "Physical activity has strong evidence for reducing meth cravings and restoring the dopamine function that meth severely depletes." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Methamphetamine use frequently destroys trust and family relationships. We work to rebuild communication and healthy dynamics." },
];

const FAQS = [
  { q: "What makes meth addiction different to treat?", a: "Unlike opioids, there are no FDA-approved medications to treat methamphetamine use disorder (though research is ongoing). Treatment relies primarily on behavioral approaches — which are highly effective when delivered with the right frequency and intensity." },
  { q: "What is meth withdrawal like?", a: "Meth withdrawal is primarily psychological rather than physically dangerous. The 'crash' after extended meth use involves intense fatigue, depression, hypersomnia, and powerful cravings. The acute phase typically lasts 1–2 weeks; psychological symptoms (mood dysregulation, anhedonia) can persist for months." },
  { q: "Does meth cause permanent brain damage?", a: "Long-term meth use causes significant neurological changes — particularly in dopamine systems. The encouraging news is that research shows substantial recovery of brain function with extended abstinence, particularly with regular exercise. Recovery of cognitive function is achievable." },
  { q: "How long does meth addiction treatment take?", a: "Most effective meth treatment involves extended engagement — PHP for 4–8 weeks, followed by IOP and ongoing outpatient support. The longer the active treatment engagement, the better the long-term outcomes." },
  { q: "Does insurance cover meth rehab?", a: "Yes — stimulant use disorder treatment is covered under most private insurance plans. We verify your benefits before admission at no cost." },
];

export default function MethPage() {
  return (
    <SubstancePageLayout
      substanceName="Meth Rehab"
      heroHeading="Meth Rehab in Springfield, MO"
      heroSubcopy="Evidence-based methamphetamine addiction treatment using the Matrix Model, CBT, and comprehensive behavioral therapy — in Springfield, MO and statewide virtually."
      stats={[
        { value: "1.6M", label: "Americans with meth use disorder" },
        { value: "Matrix", label: "Model — gold standard for meth treatment" },
        { value: "Dual", label: "Diagnosis treatment for meth-induced psychosis" },
      ]}
      currentPath="/meth-rehab-springfield-mo"
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
                Methamphetamine addiction treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Methamphetamine use disorder is a severe stimulant addiction that profoundly disrupts brain chemistry, physical health, and mental functioning. Missouri has been significantly affected by the meth epidemic — and Missouri Behavioral Health provides specialized treatment tailored to the unique challenges of stimulant addiction.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                We use the Matrix Model — a structured, evidence-based approach developed specifically for stimulant use disorders — combined with psychiatric support for the mood and psychosis symptoms that often accompany meth use.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Meth addiction treatment group therapy Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Matrix</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Model Treatment</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs of meth addiction.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Methamphetamine produces some of the most visible physical and behavioral signs of any substance. If you recognize these, professional treatment is essential.
              </p>
              <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                Talk to our team
              </a>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Meth treatment programs at MBH.
            </h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              How we treat meth addiction.
            </h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Meth treatment is covered.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Stimulant use disorder treatment is covered under most private insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. No-cost benefit verification before admission.
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
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((carrier) => (
                <div key={carrier} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{carrier}</span>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Common questions.
              </h2>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline">
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>

    </SubstancePageLayout>
  );
}
