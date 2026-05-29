import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Xanax Addiction & Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Xanax (alprazolam) addiction treatment in Springfield, MO. Medically supervised benzodiazepine taper guidance, therapy, PHP, IOP, and outpatient care. Call 24/7.",
  alternates: { canonical: "/xanax-rehab-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/xanax-rehab-springfield-mo", fallback);
}

const SIGNS = [
  "Needing higher doses of Xanax to feel the same effect (tolerance)",
  "Taking Xanax more often or longer than prescribed",
  "Anxiety, insomnia, or panic that returns or worsens between doses",
  "Using Xanax with alcohol or other substances to amplify effects",
  "Difficulty stopping despite wanting to cut back",
  "Memory problems, drowsiness, or slurred speech",
  "Withdrawal symptoms — tremors, agitation, sweating — when a dose is missed",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Daily structured care with close monitoring — important because benzodiazepine withdrawal can be medically serious." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours weekly of therapy and skills training while living at home." },
  { icon: "ri-calendar-check-line", label: "Outpatient Program", desc: "Step-down care with continued counseling and taper support." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Full outpatient programming delivered online across Missouri." },
];

const APPROACH = [
  { icon: "ri-shield-cross-line", label: "Medically Supervised Taper", desc: "Stopping Xanax abruptly can be dangerous. We coordinate a gradual, supervised taper to keep withdrawal safe." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Treats the underlying anxiety that often drives benzodiazepine use, building healthier coping skills." },
  { icon: "ri-mental-health-line", label: "Anxiety & Panic Treatment", desc: "We address the root anxiety disorder so you don't need Xanax to feel safe." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Shared experience reduces shame and builds accountability in recovery." },
  { icon: "ri-leaf-line", label: "Holistic Skills", desc: "Mindfulness, breathwork, and sleep support help regulate the nervous system without medication." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Helps loved ones understand benzodiazepine dependence and support recovery." },
];

const FAQS = [
  { q: "Is Xanax withdrawal dangerous?", a: "Yes — benzodiazepine withdrawal can be medically serious and, in severe cases, life-threatening (including seizures). Xanax should never be stopped abruptly. A medically supervised taper is the safest approach, and our team coordinates this as part of your care." },
  { q: "Why is Xanax so addictive?", a: "Xanax (alprazolam) is short-acting and fast-acting, which makes its effects — and its rebound anxiety — especially pronounced. The brain quickly adapts, so tolerance and dependence can develop even when taken as prescribed." },
  { q: "Can I treat my anxiety without Xanax?", a: "Absolutely. Evidence-based therapies like CBT, along with non-addictive medications when appropriate, effectively treat anxiety and panic. Our goal is to resolve the underlying anxiety so you no longer rely on Xanax." },
  { q: "How long does benzodiazepine treatment take?", a: "Tapers are individualized and can take weeks to months depending on the dose and duration of use. Treatment then continues with therapy and aftercare to maintain recovery." },
  { q: "Does insurance cover Xanax addiction treatment?", a: "Yes — most private insurance plans cover benzodiazepine treatment. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health, and verify your benefits before admission." },
];

export default function XanaxRehabPage() {
  return (
    <SubstancePageLayout
      substanceName="Xanax"
      heroHeading="Xanax Addiction Treatment in Missouri"
      heroSubcopy="Safe, medically informed Xanax and benzodiazepine recovery in Springfield, MO — combining supervised tapering, anxiety treatment, and evidence-based therapy."
      stats={[
        { value: "Taper", label: "Medically supervised benzodiazepine taper" },
        { value: "PHP + IOP", label: "Multiple levels of care available" },
        { value: "Dual", label: "Anxiety & co-occurring disorder care" },
      ]}
      currentPath="/xanax-rehab-springfield-mo"
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
                Treating Xanax dependence safely.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Xanax is one of the most commonly prescribed — and most commonly misused — benzodiazepines. Because it works quickly and wears off fast, dependence can develop before you realize it, and rebound anxiety can make stopping feel impossible.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                We provide a safe, structured path off Xanax through medically supervised tapering and treatment of the underlying anxiety — so recovery lasts.
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
              <img src={SITE_IMAGES.therapyGroup} alt="Xanax addiction therapy in Springfield, Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Safe</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Supervised Taper</p>
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
                Signs of Xanax dependence.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Benzodiazepine dependence can develop even with a legitimate prescription. Recognizing the signs early makes treatment safer and more effective.
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
              Xanax recovery programs at MBH.
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
              How we treat Xanax addiction.
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
                Coverage for Xanax treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Benzodiazepine treatment is a covered benefit under most private health insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before admission at no cost to you.
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
