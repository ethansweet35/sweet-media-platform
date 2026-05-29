import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Heroin Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Heroin addiction treatment in Springfield, MO. Medical detox, MAT, PHP, IOP, and outpatient programs. Evidence-based opioid use disorder care. Call 24/7.",
  alternates: { canonical: "/heroin-rehab-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/heroin-rehab-springfield-mo", fallback);
}

const SIGNS = [
  "Using heroin to feel 'normal' or to avoid withdrawal symptoms",
  "Needing escalating doses to achieve the desired effect",
  "Severe withdrawal — bone pain, nausea, vomiting — when not using",
  "Neglecting hygiene, nutrition, and basic self-care",
  "Secretive behavior, missing valuables, financial desperation",
  "Abscesses, track marks, or other physical signs of injection use",
  "Prior overdose or naloxone (Narcan) use",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Medical Detox",
    desc: "Physician-supervised heroin detox with evidence-based comfort medications — safely managing the acute withdrawal phase before transitioning to active treatment.",
  },
  {
    icon: "ri-medicine-bottle-line",
    label: "Medication-Assisted Treatment",
    desc: "Buprenorphine and naltrexone significantly reduce cravings, prevent relapse, and dramatically lower overdose mortality risk during and after treatment.",
  },
  {
    icon: "ri-community-line",
    label: "Partial Hospitalization (PHP)",
    desc: "5–7 days per week of structured, intensive programming for clients who need frequent clinical contact and a high degree of daily structure.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours per week — the balance of clinical intensity and real-world responsibility that sustains most people in longer-term recovery.",
  },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "Medication-Assisted Treatment (MAT)", desc: "The evidence is clear — MAT with buprenorphine or naltrexone reduces overdose mortality by up to 50%. We provide and manage MAT as part of a comprehensive treatment plan." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Restructures the thought patterns, beliefs about drug use, and emotional triggers that drive heroin-seeking behavior." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Peer-based recovery is foundational to opioid treatment — building community, reducing shame, and holding each person accountable." },
  { icon: "ri-mental-health-line", label: "Trauma-Informed Care", desc: "Unresolved trauma is a primary driver of opioid use disorder. We address underlying trauma alongside addiction as part of integrated treatment." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Heroin addiction devastates families. We engage loved ones in the recovery process — providing education, rebuilding trust, and healing relational damage." },
  { icon: "ri-shield-check-line", label: "Aftercare & Relapse Prevention", desc: "Discharge planning, ongoing MAT management, and community resource connections ensure support continues long after formal treatment ends." },
];

const FAQS = [
  { q: "What is heroin withdrawal like?", a: "Heroin withdrawal typically begins 6–12 hours after the last dose and peaks at 36–48 hours. Symptoms include severe muscle aches, abdominal cramping, nausea, vomiting, insomnia, anxiety, and intense cravings. While rarely life-threatening for otherwise healthy adults, it is extremely uncomfortable and medically managed detox dramatically improves both safety and treatment retention." },
  { q: "Does MAT work for heroin addiction?", a: "MAT is among the most effective treatments we have for opioid use disorder. Research consistently shows buprenorphine reduces overdose mortality, decreases illicit drug use, improves treatment retention, and supports long-term recovery outcomes. It is not 'trading one addiction for another' — it is evidence-based medicine." },
  { q: "How long does heroin treatment take?", a: "Recovery is a long-term process. Most clients progress through detox into PHP and IOP over 3–6 months of structured programming, followed by ongoing outpatient support and MAT management. Duration is individualized based on clinical progress." },
  { q: "Is heroin addiction treatable?", a: "Absolutely — heroin addiction is a treatable medical condition. With the right combination of medical support, behavioral therapy, MAT, and sustained engagement with recovery, many people achieve long-term sobriety." },
  { q: "Does insurance cover heroin rehab?", a: "Yes. Opioid use disorder treatment is a covered benefit under most private insurance plans and the ACA. We verify your benefits before admission at no cost." },
];

export default function HeroinPage() {
  return (
    <SubstancePageLayout
      substanceName="Heroin Rehab"
      heroHeading="Heroin Rehab in Springfield, MO"
      heroSubcopy="Comprehensive heroin addiction treatment — medical detox, MAT, behavioral therapy, and long-term recovery support. Same-day admissions available in Springfield, Missouri."
      stats={[
        { value: "50%", label: "Reduction in overdose mortality with MAT" },
        { value: "Same Day", label: "Admissions available" },
        { value: "Full", label: "Continuum of care from detox to outpatient" },
      ]}
      currentPath="/heroin-rehab-springfield-mo"
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
                Heroin addiction treatment in Missouri.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Heroin use disorder is a severe, chronic condition that responds strongly to evidence-based treatment. Missouri Behavioral Health provides a full continuum of care — from medically supervised detox through medication-assisted treatment, intensive outpatient programming, and long-term recovery support.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                We treat heroin addiction as a medical condition — not a moral failure. Our approach is clinical, compassionate, and built on the best available evidence for opioid use disorder recovery.
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
              <img src={SITE_IMAGES.therapyGroup} alt="Heroin addiction treatment group therapy Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">MAT</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs of heroin dependency.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Heroin dependence develops rapidly. The earlier treatment begins, the better the outcome. These signs indicate professional help is needed.
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
              Heroin treatment programs at MBH.
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
              How we treat heroin addiction.
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
                Heroin treatment is covered.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Opioid use disorder treatment is a federally required covered benefit. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. We verify your benefits before admission — at no cost to you.
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
