import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Cognitive Behavioral Therapy (CBT) in Springfield, MO | Missouri Behavioral Health",
  description:
    "CBT at Missouri Behavioral Health — evidence-based therapy that restructures the automatic thoughts driving addiction and mental health symptoms. Serving Springfield, MO and statewide via telehealth.",
  alternates: { canonical: "/cognitive-behavioral-therapy-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/cognitive-behavioral-therapy-springfield-mo",
    fallback
  );
}

const STEPS = [
  {
    num: "01",
    label: "Assessment & case conceptualization",
    desc: "Your therapist builds a detailed picture of the specific thoughts, feelings, and behaviors maintaining your addiction or mental health symptoms — creating a shared map for treatment.",
  },
  {
    num: "02",
    label: "Thought monitoring & journaling",
    desc: "You learn to identify automatic negative thoughts as they happen — catching the split-second cognitive events that typically precede cravings, avoidance, or emotional distress.",
  },
  {
    num: "03",
    label: "Cognitive restructuring",
    desc: "With your therapist's guidance, distorted thoughts are examined, challenged, and replaced with more accurate, balanced perspectives — breaking the thought-feeling-behavior cycle.",
  },
  {
    num: "04",
    label: "Behavioral experiments & skill transfer",
    desc: "Real-world tests of new beliefs, exposure to avoided situations, and between-session practice consolidate the cognitive shifts into lasting behavioral change.",
  },
];

const CONDITIONS = [
  "Addiction & substance use disorders",
  "Anxiety disorders & panic attacks",
  "Major depression",
  "PTSD & trauma responses",
  "OCD",
  "Bipolar disorder",
  "Eating disorders",
  "Chronic pain & stress-related illness",
];

const INSURERS = [
  "Aetna",
  "Anthem Blue Cross",
  "Blue Cross Blue Shield",
  "Cigna",
  "Beacon Health",
  "Carelon",
  "GEHA",
  "Cox Health",
];

const FAQS = [
  {
    q: "What is CBT?",
    a: "Cognitive Behavioral Therapy (CBT) is a structured, evidence-based psychotherapy that targets the relationship between thoughts, feelings, and behaviors. The core principle is that distorted or unhelpful thinking patterns drive emotional distress and problematic behavior — and that by identifying and changing those thought patterns, you can change how you feel and act. CBT is typically short-term, skills-focused, and highly collaborative between client and therapist.",
  },
  {
    q: "How is CBT used in addiction treatment?",
    a: "In addiction treatment, CBT helps clients identify the specific triggers, thought patterns, and high-risk situations that lead to substance use. Techniques include craving coping strategies, relapse prevention planning, thought restructuring around use-justifying beliefs, and behavioral experiments that test the accuracy of thoughts like 'I need a drink to relax' or 'I can't cope without using.' CBT is particularly effective when combined with other modalities like DBT and group therapy.",
  },
  {
    q: "How many CBT sessions does it take?",
    a: "CBT is typically delivered over 12–20 sessions for standalone treatment, but within an intensive treatment setting like PHP or IOP, CBT is woven throughout the program over weeks of daily or near-daily contact. Progress is assessed regularly, and your therapist adjusts the focus as you build skills and insight. Most clients experience meaningful change within 8–12 sessions of dedicated CBT work.",
  },
  {
    q: "Does insurance cover CBT?",
    a: "Yes — CBT is one of the most widely covered forms of psychotherapy. All major insurance plans, including Medicaid and Medicare, cover CBT under mental health and substance use disorder benefits. Missouri Behavioral Health verifies your specific benefits before treatment begins so there are no surprises about your coverage or out-of-pocket costs.",
  },
  {
    q: "Is CBT available via telehealth at MBH?",
    a: "Yes. CBT sessions at Missouri Behavioral Health are available both in-person at our Springfield, MO facility and via secure telehealth statewide. Telehealth CBT is especially convenient for clients who are managing work or family schedules, or who are located outside of Springfield. Research consistently shows that CBT delivered via telehealth produces outcomes equivalent to in-person delivery.",
  },
];

export default function CBTPage() {
  return (
    <TherapyPageLayout
      therapyName="Cognitive Behavioral Therapy"
      abbr="CBT"
      currentPath="/cognitive-behavioral-therapy-springfield-mo"
      tagline="Restructure the thoughts that drive addictive behavior and emotional distress."
      heroBody="CBT is the most extensively researched therapy in behavioral health. At Missouri Behavioral Health, it forms the clinical backbone of treatment across every level of care — teaching you to identify, challenge, and reframe the automatic thoughts that fuel addiction and mental health symptoms."
      heroImage={`${SUPABASE}/mbh_therapy_cbt_hero01.jpg`}
      heroImageAlt="CBT individual therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-calendar-line", label: "Frequency", value: "Individual + Group" },
        { icon: "ri-video-chat-line", label: "Format", value: "In-person & telehealth" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP · Outpatient" },
        { icon: "ri-medal-line", label: "Evidence base", value: "Gold-standard, research-backed" },
      ]}
    >
      {/* ── What is CBT ────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Foundation
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                What is CBT?
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                CBT is built on a deceptively simple insight: the way you think about a situation
                determines how you feel about it — and how you feel determines what you do. In
                addiction and mental health, distorted automatic thoughts operate in milliseconds,
                below conscious awareness, hijacking emotional responses before the rational mind
                can intervene.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The{" "}
                <strong className="font-semibold text-mbh-forest">cognitive triangle</strong> — the
                relationship between thoughts, feelings, and behaviors — is the core model. Change
                one vertex and the others shift. CBT teaches you to interrupt that cycle at the
                thought level, replacing distorted thinking with more accurate, workable
                perspectives.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                At Missouri Behavioral Health, CBT is not just a session add-on — it is the
                clinical framework that informs individual therapy, group psychoeducation, relapse
                prevention planning, and skill-building across every level of care.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;Between stimulus and response there is a space. In that space is our power
                  to choose our response. In our response lies our growth and freedom.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Viktor Frankl, foundational influence on CBT theory
                </cite>
              </blockquote>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/8 lg:sticky lg:top-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_IMAGES.facilityInterior}
                alt="Individual therapy room at Missouri Behavioral Health"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "center" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(18,46,24,0.35) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">50+ years</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">
                  Of research evidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How CBT works at MBH ───────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              How CBT works at MBH.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              CBT at Missouri Behavioral Health follows a structured, four-phase process designed to
              build insight and skills progressively — from understanding to action.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-white p-7 shadow-sm"
              >
                <span className="font-display text-4xl font-bold text-mbh-green/20">
                  {step.num}
                </span>
                <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                  {step.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What CBT treats ────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Applications
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What CBT treats at MBH.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              CBT's flexibility makes it effective across a wide spectrum of conditions — and
              particularly powerful when multiple diagnoses co-occur alongside addiction.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CONDITIONS.map((cond) => (
              <div
                key={cond}
                className="flex items-center gap-3 rounded-2xl border border-mbh-forest/8 bg-cream px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mbh-green/10">
                  <i className="ri-check-line text-xs text-mbh-green" aria-hidden />
                </span>
                <span className="font-body text-sm font-medium text-mbh-forest">{cond}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Coverage
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Insurance typically covers CBT.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                CBT is covered by most major insurance plans under mental health and substance use
                disorder benefits. We verify your specific benefits before treatment starts — at no
                cost to you — so you know exactly what to expect before your first session.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-sm transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-shield-check-line" aria-hidden /> Verify my coverage
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
                >
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INSURERS.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2.5 rounded-xl border border-mbh-forest/10 bg-white px-4 py-3"
                >
                  <i className="ri-check-line text-mbh-green text-sm" aria-hidden />
                  <span className="font-body text-sm text-mbh-forest/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>
    </TherapyPageLayout>
  );
}
