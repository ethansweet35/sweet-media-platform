import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Dialectical Behavior Therapy (DBT) in Springfield, MO | Missouri Behavioral Health",
  description:
    "DBT at Missouri Behavioral Health — four core skill modules for addiction, trauma, and emotional dysregulation. Serving Springfield, MO and statewide via telehealth.",
  alternates: { canonical: "/dialectical-behavioral-therapy-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/dialectical-behavioral-therapy-springfield-mo",
    fallback
  );
}

const MODULES = [
  {
    icon: "ri-focus-3-line",
    label: "Mindfulness",
    desc: "The foundation of all DBT skills. Mindfulness teaches you to observe your thoughts and emotions without judgment, creating the space to choose responses rather than react automatically. In addiction recovery, this is the first line of defense against impulsive substance use.",
  },
  {
    icon: "ri-fire-line",
    label: "Distress Tolerance",
    desc: "Crisis survival strategies that help you get through moments of intense emotional pain without making things worse. Techniques like TIPP, ACCEPTS, and self-soothe skills give you a toolkit for riding out cravings and emotional crises without resorting to substances.",
  },
  {
    icon: "ri-heart-pulse-line",
    label: "Emotional Regulation",
    desc: "Skills for understanding, labeling, and changing intense emotions before they spiral into destructive behavior. Emotion regulation is central to addiction recovery — most relapse is emotion-driven, not purely craving-driven.",
  },
  {
    icon: "ri-discuss-line",
    label: "Interpersonal Effectiveness",
    desc: "Structured communication skills for asking for what you need, maintaining relationships under stress, and setting boundaries without damaging connections. Many clients report this as the module that transforms their relationships most visibly.",
  },
];

const CONDITIONS = [
  {
    label: "Borderline Personality Disorder",
    desc: "DBT was originally developed for BPD and remains the gold-standard treatment for the intense emotional dysregulation that characterizes this diagnosis.",
  },
  {
    label: "PTSD & complex trauma",
    desc: "The distress tolerance and mindfulness modules directly address the hyperreactivity and avoidance that define trauma responses.",
  },
  {
    label: "Addiction with emotional dysregulation",
    desc: "For clients whose substance use is driven by emotional flooding, boredom, or intolerance of discomfort, DBT skills are directly protective against relapse.",
  },
  {
    label: "Self-harm history",
    desc: "DBT reduces self-harming behavior by giving clients functional alternatives for managing overwhelming emotional states.",
  },
  {
    label: "Intense mood swings",
    desc: "Whether from bipolar disorder, cyclothymia, or emotionally unstable patterns, DBT's regulation skills create more stable emotional baselines.",
  },
  {
    label: "Relationship difficulties",
    desc: "The interpersonal effectiveness module is particularly transformative for clients whose relationships have been severely damaged by addiction or emotional dysregulation.",
  },
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
    q: "What is DBT?",
    a: "Dialectical Behavior Therapy (DBT) is a comprehensive cognitive-behavioral treatment developed by Dr. Marsha Linehan. The term 'dialectical' refers to the core balance DBT strikes: accepting yourself as you are while simultaneously working to change the behaviors that are making your life unworkable. It is structured around four skill modules — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — delivered through individual therapy, skills groups, and between-session coaching.",
  },
  {
    q: "How is DBT different from CBT?",
    a: "CBT focuses primarily on changing distorted thoughts and beliefs. DBT builds on that foundation but adds a critical layer of acceptance — the recognition that change without validation creates resistance, especially for clients with intense emotional histories. DBT also places much greater emphasis on skills training (taught in structured group settings), distress tolerance for crisis moments, and interpersonal relationship skills. CBT is the engine of change; DBT adds the fuel of acceptance and the structure of skills groups.",
  },
  {
    q: "Do I need a BPD diagnosis to participate in DBT?",
    a: "Absolutely not. DBT is highly effective for anyone with emotional dysregulation, trauma history, addiction, self-harm, or relationship difficulties — regardless of diagnosis. At Missouri Behavioral Health, DBT skills are integrated throughout PHP and IOP for clients across a wide range of diagnoses because the skills themselves are broadly applicable to the challenges of early recovery.",
  },
  {
    q: "How long does DBT treatment last?",
    a: "Standard outpatient DBT typically runs 6–12 months to complete all four skill modules. Within an intensive treatment context like PHP or IOP at MBH, DBT skills are concentrated and delivered over weeks of daily contact rather than months. Many clients continue with outpatient DBT skills groups after completing PHP or IOP to maintain and deepen their skill practice over time.",
  },
  {
    q: "Does insurance cover DBT?",
    a: "Yes. DBT is a recognized evidence-based treatment and is covered by most major insurance plans under mental health and substance use disorder benefits. Missouri Behavioral Health verifies your benefits before treatment begins at no cost to you, so you understand your coverage before your first session.",
  },
];

export default function DBTPage() {
  return (
    <TherapyPageLayout
      therapyName="Dialectical Behavior Therapy"
      abbr="DBT"
      currentPath="/dialectical-behavioral-therapy-springfield-mo"
      tagline="Build the four core skills that make lasting recovery possible."
      heroBody="DBT was originally developed for borderline personality disorder and has become one of the most effective treatments for addiction, trauma, and emotional dysregulation. Its four skill modules — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — address the root-level deficits that drive relapse."
      heroImage={`${SUPABASE}/mbh_therapy_dbt_hero01.jpg`}
      heroImageAlt="DBT skills group therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-group-line", label: "Format", value: "Skills group + individual" },
        { icon: "ri-book-open-line", label: "Modules", value: "4 core skill sets" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP · Outpatient" },
        { icon: "ri-brain-line", label: "Developed for", value: "BPD, trauma, addiction" },
      ]}
    >
      {/* ── Four DBT Modules ───────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Four Modules
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              The four DBT skill modules.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              DBT's power comes from four interconnected skill sets — each targeting a different
              dimension of the emotional and behavioral dysregulation that underlies addiction and
              mental health disorders.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {MODULES.map((mod) => (
              <div
                key={mod.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${mod.icon} text-2xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-mbh-forest">{mod.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DBT at MBH — what to expect ───────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  What to Expect
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                DBT at MBH — what the process looks like.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                DBT at Missouri Behavioral Health is fully structured — individual therapy, group
                skills training, and between-session support are all coordinated as a single
                treatment system. Here is what a typical DBT treatment experience involves.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "ri-user-heart-line",
                  label: "Individual DBT session",
                  desc: "Weekly one-on-one sessions with your DBT therapist focus on applying skills to the specific situations in your life — reviewing diary cards, identifying target behaviors, and problem-solving barriers to skill use.",
                },
                {
                  icon: "ri-group-line",
                  label: "DBT skills group",
                  desc: "A structured, classroom-style group (not a process group) where skills are taught systematically — one module at a time, with homework practice between sessions. Groups typically meet weekly for 2–2.5 hours.",
                },
                {
                  icon: "ri-pencil-line",
                  label: "Between-session homework",
                  desc: "DBT is a skills-based model — learning happens between sessions. Diary cards track emotions, behaviors, and skill use daily. Homework assignments apply module skills to real-life situations before the next group.",
                },
                {
                  icon: "ri-phone-line",
                  label: "Phone coaching availability",
                  desc: "In standard DBT, clients can contact their individual therapist between sessions for brief crisis coaching — applying skills in the moment rather than waiting until the next scheduled session.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-mbh-forest/8 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                    <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                      {item.label}
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who DBT helps most ─────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Who It Helps
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Who DBT helps most.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              DBT was designed for people who feel emotions more intensely than others — and whose
              behavioral responses to those emotions are causing serious harm to their lives.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((cond) => (
              <div
                key={cond.label}
                className="flex flex-col gap-3 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className="ri-check-line text-base text-mbh-green" aria-hidden />
                </span>
                <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                  {cond.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{cond.desc}</p>
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
                Insurance typically covers DBT.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                DBT is recognized as an evidence-based treatment and is covered by most major
                insurance plans under mental health and substance use disorder benefits. We verify
                your benefits before treatment begins — at no cost to you.
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
