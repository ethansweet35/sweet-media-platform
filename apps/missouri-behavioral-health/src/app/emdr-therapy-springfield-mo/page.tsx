import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "EMDR Therapy in Springfield, MO | Missouri Behavioral Health",
  description:
    "EMDR therapy at Missouri Behavioral Health — EMDR International Association certified therapists treating trauma, PTSD, and addiction in Springfield, MO and statewide via telehealth.",
  alternates: { canonical: "/emdr-therapy-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/emdr-therapy-springfield-mo", fallback);
}

const PHASES = [
  {
    num: "01",
    label: "History taking",
    desc: "Your therapist gathers a detailed trauma and treatment history to identify the specific memories and experiences that will be targeted in processing.",
  },
  {
    num: "02",
    label: "Preparation",
    desc: "You learn stabilization techniques and what to expect from bilateral stimulation — building the safety and trust needed for reprocessing work.",
  },
  {
    num: "03",
    label: "Assessment",
    desc: "The target memory is activated — identifying the negative cognition, associated emotions, body sensations, and current distress level before processing begins.",
  },
  {
    num: "04",
    label: "Desensitization",
    desc: "Bilateral stimulation (guided eye movements, tapping, or audio tones) is applied while you hold the target memory — allowing the brain to reprocess it toward adaptive resolution.",
  },
  {
    num: "05",
    label: "Installation",
    desc: "A positive belief replaces the negative cognition associated with the target memory, and bilateral stimulation strengthens the new neural association.",
  },
  {
    num: "06",
    label: "Body scan",
    desc: "You scan your body for any residual tension or distress linked to the processed memory — addressing somatic components of the trauma response.",
  },
  {
    num: "07",
    label: "Closure",
    desc: "Each session ends with stabilization techniques to ensure you leave in a grounded, functional state — regardless of whether full reprocessing was completed.",
  },
  {
    num: "08",
    label: "Reevaluation",
    desc: "At the start of the next session, the therapist checks in on the processed memory and the new positive belief to assess whether further processing is needed.",
  },
];

const CONDITIONS = [
  "PTSD & post-traumatic stress symptoms",
  "Complex developmental trauma",
  "Addiction with trauma roots",
  "Anxiety disorders",
  "Depression linked to past events",
  "Grief and complicated loss",
  "Phobias and specific fears",
  "Childhood trauma & adverse experiences",
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
    q: "What is EMDR therapy?",
    a: "Eye Movement Desensitization and Reprocessing (EMDR) is an evidence-based psychotherapy that uses bilateral stimulation — typically guided eye movements — to help the brain reprocess traumatic memories stored in a way that causes ongoing distress. When a traumatic event is not fully processed, the memory remains fragmented and hyperactivated — easily triggered by present-day stimuli. EMDR interrupts this pattern, allowing the memory to be integrated into normal autobiographical memory without losing its emotional charge to the nervous system.",
  },
  {
    q: "How is EMDR different from talk therapy?",
    a: "Traditional talk therapy processes trauma through verbal narrative and cognitive reframing — which works well for many clients. EMDR works at a different level: the bilateral stimulation appears to mimic the brain's natural overnight memory consolidation process (similar to REM sleep), allowing traumatic memories to be reprocessed neurologically rather than purely cognitively. Clients frequently report that memories that caused intense distress for years lose their emotional charge after EMDR — without having to talk through them in great detail.",
  },
  {
    q: "Is EMDR safe?",
    a: "Yes — EMDR has been extensively researched and is endorsed by the World Health Organization, the American Psychological Association, and the Department of Veterans Affairs as an evidence-based treatment for PTSD. At Missouri Behavioral Health, EMDR is delivered only by certified therapists and is integrated carefully within a full treatment plan. The eight-phase protocol includes specific preparation and closure phases to ensure clients are stabilized before, during, and after each session.",
  },
  {
    q: "How many EMDR sessions will I need?",
    a: "This varies significantly by individual, the nature of the trauma, and the complexity of the trauma history. Single-incident traumas often respond in 3–6 sessions. Complex developmental trauma or a long history of repeated adverse experiences may require significantly more. Within an intensive treatment setting like PHP or IOP at MBH, EMDR can be delivered more frequently, which often accelerates the process. Your therapist will work with you to develop a realistic timeline based on your specific history and goals.",
  },
  {
    q: "Does insurance cover EMDR?",
    a: "Yes. EMDR is recognized as an evidence-based treatment and is covered by most major insurance plans under mental health and substance use disorder benefits. Missouri Behavioral Health verifies your specific benefits before treatment begins at no cost to you.",
  },
];

export default function EMDRPage() {
  return (
    <TherapyPageLayout
      therapyName="EMDR Therapy"
      abbr="EMDR"
      currentPath="/emdr-therapy-springfield-mo"
      tagline="Reprocess traumatic memories at the neurological level."
      heroBody="Eye Movement Desensitization and Reprocessing (EMDR) uses bilateral stimulation — typically guided eye movements — to help the brain reprocess traumatic memories that are stored in a way that causes ongoing distress. At MBH, EMDR is delivered by certified therapists and integrated with addiction and mental health treatment."
      heroImage={`${SUPABASE}/mbh_therapy_emdr_hero01.jpg`}
      heroImageAlt="EMDR therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-user-line", label: "Format", value: "Individual sessions" },
        { icon: "ri-award-line", label: "Certified by", value: "EMDR International Association" },
        { icon: "ri-mental-health-line", label: "Used for", value: "Trauma, PTSD, addiction" },
        { icon: "ri-time-line", label: "Session length", value: "60–90 minutes" },
      ]}
    >
      {/* ── 8-Phase Protocol ───────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Protocol
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              How EMDR works — the eight-phase protocol.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              EMDR follows a structured eight-phase protocol that moves from preparation and
              stabilization through active trauma reprocessing and integration. Every phase serves a
              specific clinical purpose.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase) => (
              <div
                key={phase.num}
                className="flex flex-col gap-3 rounded-2xl border border-mbh-forest/8 bg-cream p-6"
              >
                <span className="font-display text-3xl font-bold text-mbh-green/25">
                  {phase.num}
                </span>
                <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                  {phase.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trauma-addiction connection ────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Root Connection
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                The trauma-addiction connection.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Research consistently shows that a majority of people seeking addiction treatment
                have a history of significant trauma — and for many, substance use began as a
                functional attempt to regulate the emotional pain of unprocessed traumatic
                experiences. Trauma and addiction are not separate problems that happen to co-occur:
                they are deeply intertwined in the same neurological systems.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Unprocessed trauma memories are stored in fragmented, hyperactivated form — easily
                triggered by present-day sensory cues (sounds, smells, situations) that resemble the
                original event. These triggers produce immediate, overwhelming emotional and somatic
                responses. For many clients, substance use is the fastest available way to dampen
                that response.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                EMDR addresses this cycle at the source — reprocessing the traumatic memories
                themselves, so they no longer function as live triggers. When the trauma loses its
                neurological charge, the compulsive drive to self-medicate diminishes significantly.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;Trauma is not what happens to you — it is what happens inside you as a
                  result of what happened to you. EMDR works precisely at that inside level.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Adapted from Dr. Gabor Maté, trauma and addiction researcher
                </cite>
              </blockquote>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "ri-brain-line",
                  label: "Trauma hijacks the stress response",
                  desc: "Unprocessed trauma keeps the nervous system in a state of chronic threat activation — and substances are one of the most reliably effective ways to temporarily lower that activation.",
                },
                {
                  icon: "ri-refresh-line",
                  label: "Self-medication perpetuates both disorders",
                  desc: "Using substances to manage trauma symptoms relieves distress in the short term but prevents natural processing, entrenches avoidance, and adds the additional burden of addiction.",
                },
                {
                  icon: "ri-scissors-cut-line",
                  label: "EMDR breaks the cycle at the source",
                  desc: "By reprocessing the traumatic memories driving the need to self-medicate, EMDR addresses a root cause of relapse that purely behavioral approaches often miss.",
                },
                {
                  icon: "ri-shield-check-line",
                  label: "Integrated treatment is more effective",
                  desc: "Treating trauma and addiction simultaneously — as Missouri Behavioral Health does — produces significantly better long-term outcomes than treating them sequentially.",
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

      {/* ── What EMDR treats ───────────────────────────────────────────────── */}
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
              What EMDR treats at MBH.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              EMDR is effective across a wide range of trauma-related and anxiety-based conditions,
              with particularly strong evidence for PTSD and trauma-driven addiction.
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
                Insurance typically covers EMDR.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                EMDR is covered by most major insurance plans as an evidence-based treatment for
                PTSD and trauma-related conditions. Missouri Behavioral Health verifies your benefits
                before treatment begins — at no cost to you.
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
