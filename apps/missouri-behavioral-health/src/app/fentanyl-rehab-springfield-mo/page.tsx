import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Fentanyl Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Fentanyl addiction treatment in Springfield, MO. Medically supervised detox, MAT, PHP, IOP, and outpatient. Evidence-based care for opioid use disorder. Call 24/7.",
  alternates: { canonical: "/fentanyl-rehab-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/fentanyl-rehab-springfield-mo", fallback);
}

const SIGNS = [
  "Feeling unable to function normally without fentanyl",
  "Needing increasingly higher doses to achieve the same effect",
  "Severe withdrawal — sweating, muscle aches, vomiting — between doses",
  "Using fentanyl in ways other than prescribed (snorting, injecting)",
  "Obtaining fentanyl illicitly through counterfeit pills or street sources",
  "Isolating from family and friends to hide fentanyl use",
  "Continued use despite knowing the life-threatening risks",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Medically Supervised Detox",
    desc: "Fentanyl withdrawal is intense and can be dangerous. Our physicians manage the detox process using evidence-based protocols to keep patients safe and as comfortable as possible.",
  },
  {
    icon: "ri-medicine-bottle-line",
    label: "Medication-Assisted Treatment (MAT)",
    desc: "FDA-approved medications (buprenorphine, naltrexone) reduce cravings and withdrawal, dramatically improving long-term recovery outcomes when combined with therapy.",
  },
  {
    icon: "ri-community-line",
    label: "Partial Hospitalization (PHP)",
    desc: "High-frequency programming for those transitioning from detox or needing intensive structured support — 5 to 7 days per week.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours of weekly therapy, flexible enough to fit around work and family obligations while maintaining clinical intensity.",
  },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "Medication-Assisted Treatment", desc: "Buprenorphine and naltrexone are the gold standard for opioid use disorder — significantly reducing mortality risk and improving treatment retention." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Addresses the thinking patterns and emotional triggers that sustain fentanyl use, replacing them with healthier coping strategies." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Peer support from others who understand opioid addiction is a powerful recovery tool — building community and accountability." },
  { icon: "ri-mental-health-line", label: "Co-occurring Disorder Treatment", desc: "Chronic pain, PTSD, depression, and anxiety frequently underlie fentanyl use — our team treats the whole clinical picture." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Opioid addiction profoundly impacts family systems. We engage loved ones as active partners in the recovery process." },
  { icon: "ri-shield-check-line", label: "Relapse Prevention", desc: "A detailed relapse prevention plan — including how to respond to urges, warning signs, and what to do if relapse occurs — is built with every client." },
];

const FAQS = [
  { q: "Why is fentanyl so dangerous?", a: "Fentanyl is 50–100 times more potent than morphine. Illicitly manufactured fentanyl is frequently pressed into counterfeit pills indistinguishable from legitimate medications, making even a single use potentially fatal. Physical dependence develops rapidly with regular exposure." },
  { q: "What is MAT and should I use it?", a: "Medication-Assisted Treatment (MAT) uses FDA-approved medications (most commonly buprenorphine/Suboxone or naltrexone/Vivitrol) alongside behavioral therapy. Research consistently shows MAT significantly reduces overdose deaths, improves treatment retention, and supports long-term recovery. We discuss the options during assessment to determine the right fit." },
  { q: "Can I recover from fentanyl addiction?", a: "Yes — recovery from fentanyl addiction is absolutely possible with the right combination of medical support, behavioral therapy, and ongoing care. Many people achieve lasting recovery. Early intervention improves outcomes." },
  { q: "Does insurance cover fentanyl addiction treatment?", a: "Yes — opioid use disorder treatment, including MAT, is a covered benefit under the Mental Health Parity and Addiction Equity Act. We verify your benefits before admission at no cost." },
  { q: "What should I do if someone is overdosing on fentanyl?", a: "Call 911 immediately. If naloxone (Narcan) is available, administer it. Missouri's Good Samaritan law provides limited legal protection when calling for overdose help. After an overdose, admission into a treatment program is the most critical next step." },
];

export default function FentanylPage() {
  return (
    <SubstancePageLayout
      substanceName="Fentanyl Rehab"
      heroHeading="Fentanyl Rehab in Springfield, MO"
      heroSubcopy="Life-saving fentanyl addiction treatment — medically supervised detox, medication-assisted treatment, and evidence-based behavioral therapy in Springfield, Missouri."
      stats={[
        { value: "100×", label: "More potent than morphine" },
        { value: "MAT", label: "FDA-approved medications available" },
        { value: "24/7", label: "Emergency admissions available" },
      ]}
      currentPath="/fentanyl-rehab-springfield-mo"
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
                The fentanyl crisis in Missouri.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Fentanyl is now the leading cause of overdose death in Missouri and across the United States. Illicitly manufactured fentanyl — frequently pressed into counterfeit prescription pills — has made opioid use dramatically more dangerous. A dose as small as 2 milligrams can be lethal.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Effective fentanyl treatment requires medically supervised detox, evidence-based MAT, and comprehensive behavioral programming. Missouri Behavioral Health provides all three — with same-day admission available for those in crisis.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Fentanyl addiction treatment in Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Same Day</p>
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
                Signs of fentanyl dependency.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Fentanyl dependence can develop extremely quickly. If you recognize any of these signs, call us immediately.
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
              Fentanyl treatment programs at MBH.
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
              How we treat fentanyl addiction.
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
                Fentanyl treatment is covered.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Opioid use disorder treatment — including MAT — is a federally mandated covered benefit. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Same-day benefit verification available.
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
