import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Holistic Therapy for Addiction in Springfield, MO | Missouri Behavioral Health",
  description:
    "Holistic therapy at Missouri Behavioral Health — mindfulness, breathwork, meditation, and somatic practices that restore nervous system balance and support lasting addiction recovery. Springfield, MO.",
  alternates: { canonical: "/holistic-therapy-springfield" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/holistic-therapy-springfield", fallback);
}

const PRACTICES = [
  {
    icon: "ri-focus-3-line",
    label: "Guided Meditation",
    desc: "Structured meditation sessions that train attention, reduce chronic stress activation, and develop the capacity for present-moment awareness — one of the most protective factors against relapse.",
  },
  {
    icon: "ri-eye-line",
    label: "Mindfulness Training",
    desc: "Evidence-based mindfulness practices drawn from MBSR and mindfulness-based relapse prevention (MBRP) — teaching clients to observe cravings and emotional states without being controlled by them.",
  },
  {
    icon: "ri-lungs-line",
    label: "Breathwork",
    desc: "Structured breathing techniques — including diaphragmatic breathing, box breathing, and physiological sighing — that directly regulate the autonomic nervous system and reduce acute anxiety and craving intensity.",
  },
  {
    icon: "ri-body-scan-line",
    label: "Somatic Awareness",
    desc: "Practices that rebuild awareness of physical sensations and body signals — particularly important for clients whose addiction has involved years of numbing or disconnecting from somatic experience.",
  },
  {
    icon: "ri-leaf-line",
    label: "Stress Reduction Techniques",
    desc: "Progressive muscle relaxation, guided imagery, and other evidence-based stress reduction methods that lower baseline physiological arousal — directly reducing the chronic stress-driven craving cycle.",
  },
  {
    icon: "ri-tree-line",
    label: "Nature-Based Activities",
    desc: "Structured outdoor experiences that leverage the research-supported restorative effects of natural environments — including mindful walking, environmental awareness practices, and outdoor group sessions when available.",
  },
];

const INTEGRATION = [
  {
    label: "With CBT",
    desc: "Mindfulness practice enhances CBT by increasing awareness of automatic thoughts before they trigger emotional and behavioral responses — giving the cognitive restructuring work more raw material to work with.",
    icon: "ri-brain-line",
  },
  {
    label: "With DBT",
    desc: "Mindfulness is the foundational module of DBT — holistic sessions reinforce and deepen the core mindfulness skills taught in DBT groups, accelerating skill acquisition and real-world application.",
    icon: "ri-heart-pulse-line",
  },
  {
    label: "With individual therapy",
    desc: "Somatic awareness practices developed in holistic sessions give individual therapy access to body-held emotions and trauma that purely verbal processing cannot reach — expanding the therapeutic window.",
    icon: "ri-user-heart-line",
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
    q: "What is holistic therapy in addiction treatment?",
    a: "Holistic therapy refers to practices that address the whole person — mind, body, and spirit — rather than focusing exclusively on cognitive and behavioral symptoms. In addiction treatment, holistic approaches recognize that addiction disrupts physiological regulation, embodied self-awareness, and the sense of meaning and connection that sustains recovery. Holistic practices at MBH include mindfulness training, breathwork, guided meditation, somatic awareness, and stress reduction techniques — all integrated with the core clinical program rather than offered as optional extras.",
  },
  {
    q: "Is holistic therapy evidence-based?",
    a: "Yes — the holistic modalities used at Missouri Behavioral Health are drawn from robust evidence bases. Mindfulness-based relapse prevention (MBRP) has been shown to reduce relapse rates compared to standard care. Breathwork and somatic practices have documented effects on autonomic nervous system regulation, cortisol levels, and HRV. The research on mindfulness in addiction treatment is particularly strong, with multiple randomized controlled trials showing reduced craving intensity and improved emotional regulation outcomes.",
  },
  {
    q: "Do I have to participate in holistic activities?",
    a: "Holistic sessions at MBH are structured clinical components — not optional wellness add-ons — and are included as part of the PHP and IOP schedules. However, participation is always adapted to the individual. Some practices may be modified for clients with trauma, physical limitations, or strong cultural or religious preferences. Your clinical team works with you to ensure that holistic programming is relevant, comfortable, and aligned with your values.",
  },
  {
    q: "What does a typical holistic session look like?",
    a: "Sessions vary by format, but a typical holistic group session at MBH might include a brief grounding exercise, a 15–20 minute guided mindfulness or breathwork practice, a period of structured somatic awareness or body scan, and a closing integration discussion connecting the practice to recovery goals. Sessions are designed to be accessible to complete beginners — no prior meditation or wellness experience is required.",
  },
  {
    q: "Does insurance cover holistic therapy?",
    a: "Holistic therapy at MBH is integrated into the overall PHP and IOP program rather than billed as a separate service — so it is covered as part of your level-of-care benefits. Missouri Behavioral Health verifies your specific coverage before treatment begins at no cost to you. If you have questions about what is covered under your specific plan, our admissions team will walk you through the details.",
  },
];

export default function HolisticTherapyPage() {
  return (
    <TherapyPageLayout
      therapyName="Holistic Therapy"
      abbr="Holistic"
      currentPath="/holistic-therapy-springfield"
      tagline="Address the mind, body, and spirit dimensions of addiction recovery."
      heroBody="Addiction is not purely a cognitive or behavioral condition — it is a whole-person experience that disrupts the nervous system, the body, and a person's sense of meaning. Holistic therapy at MBH complements evidence-based clinical work with practices that restore balance, reduce physiological cravings, and develop long-term self-regulation capacity."
      heroImage={`${SUPABASE}/mbh_therapy_holistic_hero01.jpg`}
      heroImageAlt="Holistic therapy and meditation session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-leaf-line", label: "Modalities", value: "Mindfulness, breathwork, meditation" },
        { icon: "ri-group-line", label: "Format", value: "Individual + group" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP · Outpatient" },
        { icon: "ri-focus-3-line", label: "Focus", value: "Nervous system regulation + somatic awareness" },
      ]}
    >
      {/* ── Holistic practices at MBH ──────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Practices
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Holistic practices at MBH.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Every holistic practice at Missouri Behavioral Health is selected based on its
              evidence base for addiction and trauma — and integrated clinically with the core
              treatment program, not offered as a separate wellness side-track.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p) => (
              <div
                key={p.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${p.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                    {p.label}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The science behind holistic therapy ───────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Neuroscience
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                The science behind holistic therapy.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The neuroscience of mindfulness in addiction recovery has advanced significantly over
                the past two decades. Regular mindfulness practice produces measurable neurobiological
                changes — including increased prefrontal cortex activation (the brain region
                responsible for impulse control and decision-making) and reduced amygdala reactivity
                (the alarm system that generates craving-related emotional responses).
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Breathwork directly engages the parasympathetic nervous system through the vagus
                nerve — producing measurable reductions in cortisol, improved heart rate variability
                (HRV), and a shift from sympathetic threat-activation toward the calm, regulated
                state that supports recovery-oriented behavior. For clients whose nervous systems
                have been dysregulated for years by chronic stress, trauma, or substance use, these
                physiological effects are clinically significant.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Somatic awareness practices work at an even more fundamental level — rebuilding the
                capacity for interoception (awareness of internal body states) that addiction
                systematically destroys. Clients who have spent years numbing or disconnecting from
                their bodies often find that rebuilding this connection is one of the most
                transformative aspects of their treatment experience.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;The opposite of addiction is not sobriety — it is connection. Holistic
                  practices rebuild the connection to self that makes everything else possible.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Adapted from Johann Hari, addiction researcher and author
                </cite>
              </blockquote>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "ri-brain-line",
                  label: "Prefrontal cortex activation",
                  desc: "Regular mindfulness practice strengthens the prefrontal cortex — the brain's executive control center — improving impulse regulation and the ability to pause between craving and action.",
                },
                {
                  icon: "ri-heart-pulse-line",
                  label: "Improved heart rate variability",
                  desc: "Breathwork and meditation improve HRV — a key biomarker of nervous system flexibility and stress resilience. Higher HRV is associated with better emotional regulation and lower relapse risk.",
                },
                {
                  icon: "ri-arrow-down-line",
                  label: "Cortisol reduction",
                  desc: "Chronic stress is a major driver of craving and relapse. Mindfulness practices produce consistent reductions in baseline cortisol levels — directly lowering the physiological stress that fuels addiction.",
                },
                {
                  icon: "ri-body-scan-line",
                  label: "Craving surfing",
                  desc: "Mindfulness enables 'urge surfing' — observing a craving as a wave that rises and falls without acting on it. Research shows this technique reduces craving-induced use by changing the relationship to craving itself.",
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

      {/* ── Integration with clinical treatment ───────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Integration
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              How holistic therapy integrates with clinical treatment.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Holistic practices at MBH are not separate from clinical treatment — they are woven
              into and reinforce it, creating a more complete and effective recovery experience.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {INTEGRATION.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-2xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green">
                    Holistic +
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-mbh-forest">
                    {item.label}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
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
                Insurance covers holistic therapy at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Holistic therapy is integrated into MBH's PHP and IOP programs and covered as part
                of your overall level-of-care benefits — not billed separately. We verify your
                coverage before treatment begins at no cost to you.
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
