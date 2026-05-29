import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";

const fallback: Metadata = {
  title: "Addiction Treatment in Missouri | Missouri Behavioral Health",
  description:
    "Missouri Behavioral Health provides evidence-based addiction treatment including PHP, IOP, and outpatient programs for alcohol, opioids, meth, and more. Call 24/7.",
  alternates: { canonical: "/missouri-addiction-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/missouri-addiction-treatment", fallback);
}

const SUBSTANCES = [
  { label: "Alcohol", desc: "Sobriety strategies, trigger management & relapse prevention.", href: "/alcohol-rehab-center-in-missouri", icon: "ri-goblet-line" },
  { label: "Benzodiazepine", desc: "Safe medically supervised detox and recovery support.", href: "/benzodiazepine-detox-in-missouri", icon: "ri-capsule-line" },
  { label: "Cocaine", desc: "Break free from stimulant dependence with evidence-based care.", href: "/cocaine-detox-in-missouri", icon: "ri-test-tube-line" },
  { label: "Fentanyl", desc: "Expert MAT and therapy in a safe, structured environment.", href: "/fentanyl-rehab-springfield-mo", icon: "ri-syringe-line" },
  { label: "Heroin", desc: "Comprehensive opioid recovery with medication-assisted treatment.", href: "/heroin-rehab-springfield-mo", icon: "ri-heart-pulse-line" },
  { label: "Meth", desc: "Manage intense cravings and rebuild stability for lasting recovery.", href: "/meth-rehab-springfield-mo", icon: "ri-fire-line" },
  { label: "Opioids", desc: "Address the root causes of opioid dependence for sustainable recovery.", href: "/drug-rehab-in-springfield-mo", icon: "ri-medicine-bottle-line" },
];

const STATS = [
  { value: "380,000+", label: "Missouri residents face addiction yearly" },
  { value: "24/7", label: "Admissions team availability" },
  { value: "3 Levels", label: "PHP · IOP · Outpatient" },
];

const PROCESS = [
  { num: "01", title: "Medical Assessment", body: "A full psychiatric and medical evaluation to identify the safest detox and treatment approach for your specific situation." },
  { num: "02", title: "Stabilization & Detox", body: "Medical oversight through withdrawal, with MAT options to reduce discomfort and prevent complications." },
  { num: "03", title: "Active Therapy", body: "Individual, group, and family sessions using CBT, DBT, and motivational interviewing to address root causes." },
  { num: "04", title: "Relapse Prevention", body: "Real-world skill-building, trigger management, and community connection to support life-long sobriety." },
];

const FAQS = [
  { q: "What types of addiction does Missouri Behavioral Health treat?", a: "We treat a wide range of addictions including alcohol, opioids, benzodiazepines, fentanyl, heroin, cocaine, and methamphetamine. We also address co-occurring mental health disorders through integrated dual diagnosis treatment." },
  { q: "How long does outpatient addiction treatment usually last?", a: "Length varies by individual need. Many clients participate for several weeks to a few months, while others benefit from ongoing counseling and relapse prevention support. We build a timeline based on your specific history and goals." },
  { q: "Does Missouri Behavioral Health offer medication-assisted treatment (MAT)?", a: "Yes. We offer MAT using approved medications for individuals recovering from opioid dependence. MAT reduces cravings, stabilizes brain chemistry, and improves long-term sobriety outcomes when combined with therapy." },
  { q: "Can family members participate in the recovery process?", a: "Absolutely. Family involvement strengthens communication and rebuilds trust. Through family therapy and educational sessions, loved ones learn how to support recovery while developing healthy boundaries." },
  { q: "What insurance does Missouri Behavioral Health accept?", a: "We accept most private health insurance including Aetna, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Our team verifies benefits at no cost before treatment begins." },
];

export default function AddictionHubPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mbh-forest-deep pb-0 pt-28 lg:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 65% 10%, rgba(85,167,70,0.1) 0%, transparent 70%)" }}
        />
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Addiction Treatment · Missouri
              </span>
            </div>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Addiction treatment<br className="hidden sm:block" /> in Missouri.
            </h1>
            <p className="mt-5 font-body text-base leading-relaxed text-white/60 max-w-xl">
              Missouri Behavioral Health provides evidence-based, individualized addiction treatment — from medical detox through long-term outpatient care — for residents across Missouri.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/20 transition hover:bg-mbh-green-hover">
                <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
              </a>
              <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/8">
                Verify insurance
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 divide-x divide-white/8 border-t border-white/8 pt-8 pb-10">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 first:pl-0 last:pr-0 sm:px-8">
                <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-white">{s.value}</p>
                <p className="mt-1 font-body text-[11px] leading-snug text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Substances grid ──────────────────────────────────────────── */}
      <section className="bg-white py-[100px]" id="substances">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">What We Treat</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Substances we specialize in treating.
            </h2>
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-mbh-body">
              Each substance requires a different clinical approach. Our team has deep expertise across all major substance use disorders — often with co-occurring mental health conditions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SUBSTANCES.map((sub) => (
              <Link
                key={sub.label}
                href={sub.href}
                className="group flex flex-col gap-4 rounded-2xl border border-mbh-forest/8 bg-cream p-6 transition-all hover:border-mbh-green/30 hover:bg-mbh-green/3 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10 transition-colors group-hover:bg-mbh-green/15">
                  <i className={`${sub.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[1rem] font-semibold text-mbh-forest">{sub.label}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-mbh-body">{sub.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-green opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatment process ─────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Our Process</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
              The treatment process at MBH.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.num} className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-6">
                <span className="font-body text-[11px] font-bold tabular-nums text-mbh-sage/50">{step.num}</span>
                <p className="font-display text-[1rem] font-semibold text-white">{step.title}</p>
                <p className="font-body text-sm leading-relaxed text-white/50">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + photo ─────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Why Choose Us</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Missouri's trusted addiction treatment center.
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-mbh-body">
                Missouri Behavioral Health stands out as one of the most trusted treatment centers in the state, offering comprehensive care that addresses every layer of addiction and mental health. Our approach blends psychology, behavioral therapy, and medical support — ensuring each patient receives well-rounded, evidence-based care.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                We specialize in treating dual diagnosis cases where substance abuse and mental health disorders occur together — including bipolar disorder, anxiety, depression, and PTSD. Our integrated model allows patients to receive therapy, psychiatric medication management, and supportive services under one roof.
              </p>
              <ul className="mt-6 space-y-3">
                {["Evidence-based, individualized treatment plans", "Licensed clinicians, counselors & medical staff", "PHP, IOP, outpatient & virtual programs", "Dual diagnosis specialty care", "Most private insurance accepted"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                      <i className="ri-check-line text-[10px] text-mbh-green" aria-hidden />
                    </span>
                    <span className="font-body text-sm leading-relaxed text-mbh-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_IMAGES.therapyGroup} alt="Missouri Behavioral Health group therapy session" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.3) 0%, transparent 50%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Get Help Now</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">Admission coordinators are available 24/7.</h2>
              <p className="mt-2 font-body text-sm text-white/50">Confidential · HIPAA-compliant · Same-day admissions available</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint">
                <i className="ri-phone-fill" aria-hidden /> Call Now — {PHONE_DISPLAY}
              </a>
              <Link href="/verify-insurance" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                Verify insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
