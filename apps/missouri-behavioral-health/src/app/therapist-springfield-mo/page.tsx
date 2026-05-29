import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Therapists in Springfield, MO | Missouri Behavioral Health",
  description:
    "Licensed, experienced therapists at Missouri Behavioral Health — LPC, LCSW, and certified clinicians specializing in CBT, DBT, EMDR, trauma, and dual-diagnosis addiction treatment. Springfield, MO.",
  alternates: { canonical: "/therapist-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapist-springfield-mo", fallback);
}

const DIFFERENTIATORS = [
  {
    icon: "ri-award-line",
    label: "Always licensed",
    desc: "Every therapist at MBH holds active Missouri state licensure — LPC (Licensed Professional Counselor) or LCSW (Licensed Clinical Social Worker). We do not use unlicensed interns or supervised-only clinicians as primary therapists.",
  },
  {
    icon: "ri-focus-3-line",
    label: "Modality-specialized",
    desc: "Each therapist is trained and competent in 2–3 specific evidence-based modalities — CBT, DBT, EMDR, family systems, or trauma-focused approaches — rather than claiming to practice 'everything.' Depth matters more than breadth.",
  },
  {
    icon: "ri-team-line",
    label: "Integrated clinical team",
    desc: "Your therapist communicates regularly with your psychiatrist, case manager, and group facilitators — treatment decisions are made collaboratively, not in siloed individual sessions that are disconnected from the rest of your care.",
  },
  {
    icon: "ri-arrow-up-down-line",
    label: "Continuity across levels",
    desc: "When clinically appropriate and logistically possible, we keep the same primary therapist with you as you step down from PHP to IOP to outpatient. Continuity of therapeutic relationship significantly improves outcomes.",
  },
];

const SPECIALIZATIONS = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)", href: "/cognitive-behavioral-therapy-springfield-mo" },
  { icon: "ri-heart-pulse-line", label: "Dialectical Behavior Therapy (DBT)", href: "/dialectical-behavioral-therapy-springfield-mo" },
  { icon: "ri-eye-line", label: "EMDR Therapy", href: "/emdr-therapy-springfield-mo" },
  { icon: "ri-parent-line", label: "Family Systems Therapy", href: "/family-therapy-springfield-mo" },
  { icon: "ri-shield-check-line", label: "Trauma-Informed Care", href: "#" },
  { icon: "ri-discuss-line", label: "Motivational Interviewing", href: "#" },
  { icon: "ri-heart-3-line", label: "Grief Counseling", href: "#" },
  { icon: "ri-mental-health-line", label: "Dual Diagnosis Treatment", href: "#" },
];

const MATCH_STEPS = [
  {
    num: "01",
    label: "Clinical assessment",
    desc: "During intake, your admissions coordinator and clinical team gather detailed information about your diagnosis, treatment history, modality preferences, cultural considerations, and therapeutic goals.",
  },
  {
    num: "02",
    label: "Therapist profile matching",
    desc: "Based on your assessment, the clinical director matches you with a therapist whose specializations, style, and availability align with your specific clinical needs and stated preferences.",
  },
  {
    num: "03",
    label: "Initial session",
    desc: "Your first session is both a therapeutic beginning and a fit evaluation — you and your therapist both assess whether the match feels right. You have the ability to request a change if the fit isn't working.",
  },
  {
    num: "04",
    label: "Ongoing fit evaluation",
    desc: "At regular intervals, your clinical team checks in on your therapeutic relationship. If you are not making expected progress, or if you or your therapist identifies a mismatch, a transfer is arranged without disruption to your care.",
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
    q: "How are therapists assigned at MBH?",
    a: "Therapist assignment at Missouri Behavioral Health is based on a structured matching process that considers your clinical diagnosis, primary treatment goals, preferred therapy modalities, any cultural or demographic preferences you express, and therapist availability. The clinical director oversees all therapist assignments. You are not simply assigned to whoever has an opening — matching is taken seriously because the quality of the therapeutic relationship is one of the strongest predictors of treatment outcome.",
  },
  {
    q: "What licenses do MBH therapists hold?",
    a: "Therapists at Missouri Behavioral Health hold active Missouri state licensure — either LPC (Licensed Professional Counselor) or LCSW (Licensed Clinical Social Worker). Both credentials require a master's degree in their respective field, a minimum of 2–3 years of supervised post-graduate clinical experience, and passage of national licensing examinations. Many of our therapists hold additional certifications in specific modalities — including EMDR (EMDRIA-certified), DBT, and trauma-focused CBT.",
  },
  {
    q: "Can I request a specific therapist or change therapists?",
    a: "Yes — you can request a preference during the intake process (for example, a preference for a specific gender, cultural background, or modality specialization), and we accommodate requests whenever possible. If after starting treatment you feel your therapist is not the right fit, you can request a change through your case manager. Therapist changes are handled smoothly and without disruption to your program participation.",
  },
  {
    q: "Do therapists specialize in addiction?",
    a: "Yes — all therapists at MBH have clinical training and experience specifically in addiction and substance use disorders, not just general mental health. This includes understanding of the neuroscience of addiction, motivational interviewing, relapse prevention, and the specific dynamics of dual-diagnosis treatment. Addiction specialization is a requirement, not an optional background. Many of our therapists also have personal or family experience with recovery, though this is not a requirement.",
  },
  {
    q: "Is telehealth therapy available with MBH therapists?",
    a: "Yes — telehealth individual therapy sessions are available with MBH therapists for clients throughout Missouri. Telehealth is available for outpatient individual therapy and in some cases for components of IOP. All telehealth sessions use HIPAA-compliant, secure platforms. Clients who began in-person PHP or IOP and transition to outpatient care can continue with the same therapist via telehealth if they are no longer coming to the Springfield facility.",
  },
];

export default function TherapistsPage() {
  return (
    <TherapyPageLayout
      therapyName="Our Therapists"
      abbr="Team"
      currentPath="/therapist-springfield-mo"
      tagline="Licensed, experienced clinicians who build real therapeutic relationships."
      heroBody="Every therapist at Missouri Behavioral Health holds active Missouri state licensure and clinical expertise in addiction, mental health, and evidence-based modalities. We believe the therapeutic relationship is as important as the technique — and we match clients with clinicians who are the right fit for their specific needs and goals."
      heroImage={`${SUPABASE}/mbh_therapy_therapists_hero01.jpg`}
      heroImageAlt="Licensed therapists at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-award-line", label: "Licensure", value: "LPC · LCSW · Licensed MO" },
        { icon: "ri-book-open-line", label: "Specializations", value: "CBT, DBT, EMDR, family systems" },
        { icon: "ri-shield-check-line", label: "Approach", value: "Trauma-informed, individualized" },
        { icon: "ri-video-chat-line", label: "Telehealth", value: "Available statewide" },
      ]}
    >
      {/* ── What makes an MBH therapist different ──────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Our Standard
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What makes an MBH therapist different.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              The research is clear: the quality of the therapeutic relationship is one of the most
              powerful predictors of treatment outcome — more powerful than any specific technique
              or modality. We hire and retain therapists who embody this understanding.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.label}
                className="flex gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-2xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-mbh-forest">{item.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinical specializations ───────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Clinical Depth
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Our clinical specializations.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              MBH therapists hold expertise across a range of evidence-based modalities — ensuring
              that every client is matched with a clinician who has genuine competence in the
              approaches most relevant to their situation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALIZATIONS.map((spec) => (
              <div
                key={spec.label}
                className={`flex items-center gap-4 rounded-2xl border border-mbh-forest/8 bg-white px-5 py-4 shadow-sm ${spec.href !== "#" ? "cursor-pointer transition hover:border-mbh-green/25 hover:shadow-md" : ""}`}
              >
                {spec.href !== "#" ? (
                  <Link href={spec.href} className="flex items-center gap-4 w-full">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                      <i className={`${spec.icon} text-lg text-mbh-green`} aria-hidden />
                    </span>
                    <span className="font-body text-sm font-medium text-mbh-forest">{spec.label}</span>
                  </Link>
                ) : (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                      <i className={`${spec.icon} text-lg text-mbh-green`} aria-hidden />
                    </span>
                    <span className="font-body text-sm font-medium text-mbh-forest">{spec.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Matching process ──────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              How we match you with a therapist.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Therapist matching at MBH is a structured, four-step process — because getting the
              relationship right from the start accelerates everything that follows.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MATCH_STEPS.map((step) => (
              <div
                key={step.num}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
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

          {/* Reassurance strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 rounded-2xl border border-mbh-forest/8 bg-cream px-8 py-6">
            {[
              { icon: "ri-refresh-line", label: "You can change therapists if the fit isn't right" },
              { icon: "ri-user-heart-line", label: "Your preferences are taken seriously at intake" },
              { icon: "ri-lock-2-line", label: "All sessions are HIPAA-compliant and confidential" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mbh-green/10">
                  <i className={`${item.icon} text-sm text-mbh-green`} aria-hidden />
                </span>
                <span className="font-body text-sm font-medium text-mbh-forest">{item.label}</span>
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
                Insurance covers therapy at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Individual therapy at Missouri Behavioral Health is covered by most major insurance
                plans under mental health and substance use disorder benefits. We verify your specific
                benefits before treatment begins — at no cost to you — so you know what to expect
                before your first session.
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
