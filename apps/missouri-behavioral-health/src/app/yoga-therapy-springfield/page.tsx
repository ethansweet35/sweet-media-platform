import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Yoga Therapy for Addiction in Springfield, MO | Missouri Behavioral Health",
  description:
    "Yoga therapy at Missouri Behavioral Health — trauma-informed, clinically directed yoga practice that rebuilds the mind-body connection disrupted by addiction. Springfield, MO.",
  alternates: { canonical: "/yoga-therapy-springfield" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/yoga-therapy-springfield", fallback);
}

const SESSION_STEPS = [
  {
    icon: "ri-anchor-line",
    label: "Grounding check-in",
    desc: "Each session begins with a brief body-based check-in — attending to breath, physical sensations, and emotional state — establishing presence and safety before any movement begins.",
  },
  {
    icon: "ri-lungs-line",
    label: "Breathwork",
    desc: "Structured pranayama (breath regulation) practices that directly activate the parasympathetic nervous system, shift autonomic state, and prepare the nervous system for movement without triggering hyperarousal.",
  },
  {
    icon: "ri-walk-line",
    label: "Gentle movement sequence",
    desc: "Accessible, trauma-informed postures adapted to each client's physical and emotional capacity. Movement focuses on building body awareness, releasing tension, and rebuilding a sense of agency over physical experience.",
  },
  {
    icon: "ri-body-scan-line",
    label: "Body scan",
    desc: "A structured somatic awareness practice guiding attention systematically through the body — rebuilding interoception and the capacity to notice and tolerate internal physical sensations.",
  },
  {
    icon: "ri-chat-1-line",
    label: "Integration discussion",
    desc: "Brief facilitated discussion connecting the somatic experience of the session to recovery goals — what was noticed, what was difficult, and how the experiences relate to the client's larger treatment work.",
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
    q: "Do I need to be flexible or fit for yoga therapy?",
    a: "No — flexibility, fitness, and prior yoga experience are completely irrelevant to yoga therapy. Yoga therapy sessions at MBH are clinically adapted to each individual's physical abilities and limitations, including injuries, chronic pain, and mobility restrictions. The focus is on breath, body awareness, and nervous system regulation — not posture attainment or physical performance. Many clients who initially say 'I can't do yoga' find that yoga therapy is the most accessible and comfortable somatic practice in their treatment experience.",
  },
  {
    q: "How is yoga therapy different from a regular yoga class?",
    a: "A regular yoga class is designed for a general population with general wellness goals — it is not clinically directed, individually adapted, or integrated with a treatment plan. Yoga therapy at MBH is delivered by a certified yoga therapist who is a member of your clinical team, with specific therapeutic goals coordinated with your therapist and psychiatrist. Every element of the session — including posture selection, breathing techniques, and verbal guidance — is adapted to your specific needs, trauma history, and recovery goals. It is clinical treatment delivered in the language of embodied practice.",
  },
  {
    q: "Is yoga therapy trauma-informed?",
    a: "Yes — trauma-informed practice is a non-negotiable foundation of yoga therapy at Missouri Behavioral Health. This means: all language is invitational rather than directive ('you might notice' rather than 'feel this'); all postures and practices are offered as options with explicit permission to modify or skip; the environment is designed for safety and predictability; the therapist maintains appropriate distance and never assists with hands-on adjustments without explicit consent; and the pacing always follows the client's window of tolerance rather than a preset curriculum.",
  },
  {
    q: "What does a yoga therapy session look like?",
    a: "Each session follows a consistent structure: grounding check-in (breath and body awareness), pranayama (breath regulation), gentle trauma-informed movement, body scan, and brief integration discussion. Sessions are typically 45–60 minutes and held in a dedicated, private space at the MBH facility. Group sessions follow the same structure with a small number of clients (usually 4–8) and the same climate of safety and non-judgment. Individual sessions are also available for clients who prefer a more private experience.",
  },
  {
    q: "Does insurance cover yoga therapy?",
    a: "Yoga therapy at MBH is integrated into the PHP and IOP programs and covered as part of your level-of-care benefits — not billed as a separate alternative medicine service. This means your insurance coverage for PHP or IOP includes yoga therapy sessions as part of the overall program. Missouri Behavioral Health verifies your specific benefits before treatment begins at no cost to you.",
  },
];

export default function YogaTherapyPage() {
  return (
    <TherapyPageLayout
      therapyName="Yoga Therapy"
      abbr="Yoga"
      currentPath="/yoga-therapy-springfield"
      tagline="Rebuild the mind-body connection that addiction disrupts."
      heroBody="Yoga therapy at Missouri Behavioral Health is not a fitness class — it is a clinically informed somatic practice designed to address the physiological and psychological dimensions of addiction and trauma. Sessions focus on nervous system regulation, body awareness, breathwork, and gentle movement to restore the body-mind connection."
      heroImage={`${SUPABASE}/mbh_therapy_yoga_hero01.jpg`}
      heroImageAlt="Trauma-informed yoga therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-group-line", label: "Format", value: "Group + individual sessions" },
        { icon: "ri-heart-pulse-line", label: "Style", value: "Trauma-informed, restorative" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP" },
        { icon: "ri-user-star-line", label: "Led by", value: "Certified yoga therapist" },
      ]}
    >
      {/* ── Yoga therapy vs yoga class ─────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Distinction
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Yoga therapy is not yoga class.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The distinction matters — because for many people, particularly those with trauma
                histories or body image challenges, a regular yoga class can feel intimidating,
                inaccessible, or even retraumatizing. Yoga therapy at MBH is a fundamentally
                different experience.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Yoga therapy is clinically directed, individually adapted, trauma-informed, and
                integrated with your full treatment plan. It is not about how you look in a pose,
                how flexible you are, or achieving any particular physical outcome. It is about
                using breath, gentle movement, and embodied awareness as clinical tools for
                nervous system regulation and recovery.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    label: "Always clinically directed",
                    desc: "Session content is guided by your specific clinical goals — coordinated with your therapist and treatment plan, not by a general wellness curriculum.",
                  },
                  {
                    label: "Trauma-informed at every level",
                    desc: "Language is invitational, postures are always optional, hands-on assists never happen without explicit consent, and the pace always follows your window of tolerance.",
                  },
                  {
                    label: "Adapted to your capacity",
                    desc: "Every practice is modified for your physical abilities, injuries, medical conditions, and emotional state on that particular day.",
                  },
                  {
                    label: "Integrated with the clinical team",
                    desc: "The yoga therapist communicates with your therapist and treatment team — your somatic experiences in yoga sessions inform and are informed by your broader clinical work.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/10">
                      <i className="ri-check-line text-xs text-mbh-green" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-body text-sm leading-relaxed text-mbh-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-mbh-forest/8 bg-cream p-8">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-forest/40 mb-6">
                  Yoga class vs. yoga therapy
                </p>
                <div className="space-y-4">
                  {[
                    { aspect: "Goal", class: "Physical fitness, flexibility", therapy: "Nervous system regulation, recovery" },
                    { aspect: "Direction", class: "Instructor-led curriculum", therapy: "Clinically directed, individualized" },
                    { aspect: "Trauma awareness", class: "Varies widely", therapy: "Trauma-informed at every level" },
                    { aspect: "Adaptation", class: "Modifications offered", therapy: "Fully individualized to your state" },
                    { aspect: "Clinical integration", class: "None", therapy: "Integrated with treatment plan" },
                    { aspect: "Outcome measure", class: "Pose attainment, flexibility", therapy: "Regulated nervous system, embodied presence" },
                  ].map((row) => (
                    <div key={row.aspect} className="grid grid-cols-[80px_1fr_1fr] gap-3 text-xs">
                      <span className="font-body font-bold text-mbh-forest/50">{row.aspect}</span>
                      <span className="rounded-xl bg-white px-3 py-2 font-body text-mbh-body/60">{row.class}</span>
                      <span className="rounded-xl bg-mbh-green/8 px-3 py-2 font-body font-medium text-mbh-forest">{row.therapy}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-body text-[10px] text-mbh-body/40">
                  <span className="mr-2 inline-block rounded bg-mbh-green/8 px-2 py-0.5 text-mbh-forest font-semibold">Yoga therapy</span>
                  <span className="mr-2 inline-block rounded bg-white px-2 py-0.5 text-mbh-body/60 border border-mbh-forest/8">Yoga class</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neuroscience of yoga in recovery ──────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Science
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                The neuroscience of yoga in recovery.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Yoga therapy's effectiveness in addiction recovery is increasingly well-supported
                by neurobiological research. The mechanisms are specific and measurable — not
                vague wellness claims.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;The body keeps the score. Recovery from addiction requires healing not
                  just the mind, but the nervous system and the body that carry the burden of
                  the past.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Adapted from Dr. Bessel van der Kolk, trauma and somatic researcher
                </cite>
              </blockquote>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "ri-wifi-line",
                  label: "Vagus nerve activation",
                  desc: "Yoga's combination of controlled breathing, gentle inversion, and humming activates the vagus nerve — the primary pathway of the parasympathetic nervous system — directly shifting the body out of chronic threat-activation.",
                },
                {
                  icon: "ri-heart-2-line",
                  label: "Heart rate variability improvement",
                  desc: "Regular yoga therapy practice measurably improves HRV — the key biomarker of autonomic nervous system flexibility and stress resilience. Higher HRV is associated with better emotional regulation and lower relapse risk.",
                },
                {
                  icon: "ri-arrow-down-line",
                  label: "Cortisol reduction",
                  desc: "Yoga consistently produces significant reductions in salivary cortisol — lowering the chronic stress load that drives both craving and relapse. The effect is detectable after a single session and cumulative with regular practice.",
                },
                {
                  icon: "ri-focus-3-line",
                  label: "Interoception building",
                  desc: "Yoga therapy systematically rebuilds interoception — the capacity to notice and accurately interpret internal body signals. Improved interoception enables earlier recognition of craving onset, emotional flooding, and physical distress before they reach crisis level.",
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

      {/* ── Session walk-through ───────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What to Expect
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What to expect in a yoga therapy session.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Every yoga therapy session at MBH follows a consistent, predictable structure —
              because predictability is itself therapeutic for nervous systems shaped by chronic
              uncertainty and trauma.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SESSION_STEPS.map((step, i) => (
              <div
                key={step.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mbh-green/10">
                    <i className={`${step.icon} text-base text-mbh-green`} aria-hidden />
                  </span>
                  <span className="font-display text-3xl font-bold text-mbh-green/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                  {step.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{step.desc}</p>
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
                Insurance covers yoga therapy at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Yoga therapy at MBH is integrated into PHP and IOP and covered as part of your
                level-of-care benefits — not billed separately as a complementary service. We
                verify your coverage before treatment begins at no cost to you.
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
