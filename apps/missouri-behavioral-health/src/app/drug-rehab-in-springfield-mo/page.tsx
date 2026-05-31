import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Drug Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Comprehensive drug rehab and opioid addiction treatment in Springfield, MO. PHP, IOP, MAT, and outpatient programs. Evidence-based care for opioid use disorder. Call 24/7.",
  alternates: { canonical: "/drug-rehab-in-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-rehab-in-springfield-mo", fallback);
}

const SIGNS = [
  "Feeling unable to function without opioids or other prescription drugs",
  "Needing increasing amounts to prevent withdrawal or achieve the same effect",
  "Doctor shopping or obtaining prescriptions beyond your own",
  "Using drugs in ways beyond what is prescribed (crushing, injecting)",
  "Spending excessive time and money obtaining and using drugs",
  "Neglecting work, family, and health due to drug use",
  "Continued use despite overdose, hospitalizations, or legal consequences",
];

const PROGRAMS = [
  {
    icon: "ri-medicine-bottle-line",
    label: "Medication-Assisted Treatment",
    desc: "FDA-approved medications for opioid use disorder that reduce cravings, prevent withdrawal, and dramatically lower overdose risk when combined with behavioral therapy.",
  },
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "5–7 days per week of intensive structured programming — the highest level of outpatient care, ideal for those transitioning from detox or needing close clinical support.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours of weekly group and individual therapy flexible enough to work around employment and family obligations.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Full outpatient programming delivered online — accessible across Missouri without needing to travel to Springfield.",
  },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "MAT for Opioid Use Disorder", desc: "Buprenorphine and naltrexone are the evidence-based standard for opioid treatment. We provide and manage MAT as a core component of recovery plans." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Addresses the thought distortions and emotional triggers that drive compulsive drug use — building healthier coping strategies." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Shared recovery community with structured peer accountability — one of the most powerful elements of long-term sobriety." },
  { icon: "ri-mental-health-line", label: "Co-occurring Disorder Treatment", desc: "Anxiety, depression, PTSD, and chronic pain are common underlying drivers of drug use. Treating both simultaneously is essential." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Drug addiction affects every member of the family. We engage loved ones as recovery partners — healing the relational damage addiction causes." },
  { icon: "ri-shield-check-line", label: "Relapse Prevention Planning", desc: "Every client leaves with a detailed relapse prevention plan — including trigger identification, warning sign recognition, and a clear response protocol." },
];

const FAQS = [
  { q: "What drugs do you treat at MBH?", a: "We treat all major substance use disorders, including opioids (heroin, fentanyl, prescription painkillers), alcohol, benzodiazepines, cocaine, methamphetamine, and other stimulants. We also address poly-substance use and co-occurring mental health conditions." },
  { q: "What is medication-assisted treatment (MAT)?", a: "MAT uses FDA-approved medications — primarily buprenorphine (Suboxone) or naltrexone (Vivitrol) for opioids — in combination with behavioral therapy. It is not 'trading one addiction for another' — it is evidence-based medicine that dramatically reduces overdose mortality and improves long-term outcomes." },
  { q: "Do I need to be in crisis to start treatment?", a: "No. Treatment is more effective when it begins before a crisis — before legal problems, job loss, or an overdose. If you are concerned about your drug use, now is the right time to reach out." },
  { q: "Does insurance cover drug rehab?", a: "Yes — substance use disorder treatment is a covered benefit under the ACA and most private insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon, Carelon, GEHA, and Cox Health. We verify benefits at no cost before you begin." },
  { q: "What happens after I complete a program?", a: "Discharge planning begins well before your program ends. We build an individualized aftercare plan that includes community resources, ongoing MAT management if applicable, support group referrals, and a relapse response protocol." },
];

export default function DrugRehabPage() {
  return (
    <SubstancePageLayout
      substanceName="Drug Rehab"
      heroHeading="Drug Rehab in Springfield, MO"
      heroSubcopy="Comprehensive drug rehabilitation and opioid use disorder treatment — medication-assisted treatment, intensive outpatient programs, and evidence-based care across Missouri."
      stats={[
        { value: "All", label: "Major substance use disorders treated" },
        { value: "MAT", label: "FDA-approved medications available" },
        { value: "24/7", label: "Same-day admissions available" },
      ]}
      currentPath="/drug-rehab-in-springfield-mo"
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
                Comprehensive drug rehab in Missouri.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Missouri Behavioral Health provides a full continuum of drug rehabilitation services — from medically supervised detox through PHP, IOP, and outpatient care. We treat opioids, stimulants, alcohol, prescription drug dependency, and co-occurring mental health conditions.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                We believe addiction is a medical condition, not a moral failure. Our clinical approach is evidence-based, trauma-informed, and individualized — because no two people's addiction or recovery looks the same.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Drug rehab group therapy Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">24/7</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Admissions</p>
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
                Signs of drug dependency.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Drug dependency can affect anyone. These signs suggest that professional treatment may be needed.
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
              Drug rehab programs at MBH.
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
              How we treat drug addiction.
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
                Drug rehab is covered by insurance.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Substance use disorder treatment is a covered essential benefit under the ACA. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. No-cost benefit verification before you begin.
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
