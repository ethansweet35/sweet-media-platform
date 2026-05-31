import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Benzodiazepine Detox in Missouri | Missouri Behavioral Health",
  description:
    "Safe, medically supervised benzodiazepine detox and addiction treatment in Missouri. Evidence-based taper protocols, PHP, and IOP. Call 24/7.",
  alternates: { canonical: "/benzodiazepine-detox-in-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/benzodiazepine-detox-in-missouri", fallback);
}

const SIGNS = [
  "Needing to take benzos more often or at higher doses to feel the same effect",
  "Anxiety, insomnia, or panic attacks when not taking the medication",
  "Obtaining prescriptions from multiple doctors ('doctor shopping')",
  "Using benzos prescribed for another person",
  "Inability to stop despite wanting to and repeated failed attempts",
  "Neglecting responsibilities at work, school, or home due to benzo use",
  "Continued use despite awareness of physical or psychological harm",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Medically Supervised Detox",
    desc: "Benzo withdrawal carries significant medical risk. Our team oversees a careful tapering protocol to minimize seizure risk and manage withdrawal safely.",
  },
  {
    icon: "ri-community-line",
    label: "Partial Hospitalization (PHP)",
    desc: "5–7 days per week of intensive structured programming — ideal for those stepping down from detox who still need high-frequency support.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours per week of group and individual therapy, allowing patients to maintain work and family life during treatment.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Complete outpatient care delivered online for clients across Missouri who cannot travel to our Springfield campus.",
  },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "Taper Protocol Management", desc: "Gradual dose reduction under physician supervision to minimize severe withdrawal symptoms and prevent seizures." },
  { icon: "ri-heart-line", label: "Cognitive Behavioral Therapy", desc: "Addresses the anxiety, panic, and sleep disorders that often originally drove benzo prescribing." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Structured peer support that builds accountability and reduces the shame and isolation often associated with prescription dependency." },
  { icon: "ri-mental-health-line", label: "Anxiety & Sleep Management", desc: "Teaches non-pharmacological techniques for managing anxiety and insomnia — reducing the core triggers for benzo use." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Helps loved ones understand the nature of benzo dependency and rebuild communication and trust." },
  { icon: "ri-medicine-bottle-line", label: "Psychiatric Support", desc: "Co-occurring mood and anxiety disorders are addressed by our psychiatric team alongside addiction treatment." },
];

const FAQS = [
  { q: "Is benzodiazepine withdrawal dangerous?", a: "Yes — benzo withdrawal is medically serious and can cause life-threatening seizures. It is strongly advised that anyone dependent on benzodiazepines not attempt to stop 'cold turkey' without medical supervision. Our team uses a carefully managed taper protocol to reduce risk." },
  { q: "How long does benzo detox take?", a: "Detox duration varies significantly by the specific benzo, dosage, and length of use. Short-acting benzos (Xanax, Ativan) can produce withdrawal within hours; long-acting benzos (Valium, Klonopin) may take days to manifest. Full stabilization commonly takes 2–4 weeks, with residual symptoms possible for longer." },
  { q: "Can I become addicted to a prescribed benzo?", a: "Yes. Benzodiazepines are effective short-term medications for anxiety and sleep disorders, but physical dependence can develop within weeks of daily use — regardless of whether the prescription is taken as directed." },
  { q: "Does insurance cover benzo detox?", a: "Most private health plans cover medically necessary detox and subsequent addiction treatment. We verify your benefits at no cost before treatment begins." },
  { q: "What happens after benzo detox?", a: "Detox is only the beginning. We transition clients from detox into PHP or IOP programming to address the psychological and behavioral dimensions of dependency and build lasting coping skills." },
];

export default function BenzoPage() {
  return (
    <SubstancePageLayout
      substanceName="Benzodiazepine Detox"
      heroHeading="Benzodiazepine Detox in Missouri"
      heroSubcopy="Medically supervised benzo detox with carefully managed taper protocols, followed by evidence-based treatment for prescription dependency — in Springfield, MO."
      stats={[
        { value: "12%", label: "of Americans use benzos annually" },
        { value: "24/7", label: "Medical oversight during detox" },
        { value: "Safe", label: "Taper protocols prevent seizure risk" },
      ]}
      currentPath="/benzodiazepine-detox-in-missouri"
    >

      {/* Overview */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Overview</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                What is benzodiazepine addiction?
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Benzodiazepines — including Xanax, Ativan, Valium, and Klonopin — are among the most widely prescribed medications in America. While effective for short-term anxiety and sleep management, they carry a high potential for physical dependence and addiction, even when taken exactly as prescribed.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Benzo addiction treatment requires specialized medical expertise because stopping abruptly can trigger dangerous — even life-threatening — withdrawal symptoms. Our team provides a medically supervised detox followed by comprehensive behavioral treatment.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Therapy session for benzodiazepine addiction" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Safe</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Medical Detox</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Signs & Symptoms</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs of benzodiazepine dependency.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Prescription dependency can be difficult to recognize because it often begins with a legitimate medical prescription. These signs may indicate a problem has developed.
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

      {/* Programs */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Benzo treatment programs at MBH.
              </h2>
            </div>
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

      {/* Approach */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              How we treat benzo dependency.
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

      {/* Insurance */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Most insurance covers benzo detox.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Medically necessary detox and addiction treatment are typically covered by private insurance. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified at no cost before admission.
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

      {/* FAQ */}
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
