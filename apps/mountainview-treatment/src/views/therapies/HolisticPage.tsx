import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";
import TherapyApproach from "./TherapyApproach";
import TherapyConditions from "./TherapyConditions";
import TherapyHero from "./TherapyHero";
import TherapyUnderstanding from "./TherapyUnderstanding";
import TherapyWhoBenefits from "./TherapyWhoBenefits";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-3.png";

const FAQS = [
  { q: "How is holistic integration different from traditional talk therapy?", a: "Traditional talk therapy primarily engages the cognitive layer \u2014 exploring thoughts, beliefs, and narratives. Holistic integration weaves talk therapy together with somatic, mindfulness, nutritional, and movement-based modalities to address the full person: mind, body, and spirit." },
  { q: "Is holistic integration actually evidence-based?", a: "Yes. The core modalities we draw from \u2014 including mindfulness-based stress reduction (MBSR), somatic experiencing, trauma-focused therapies, and nutritional psychiatry \u2014 are supported by decades of peer-reviewed research." },
  { q: "What modalities are part of your integrative model?", a: "Our integrative toolkit includes individual and group therapy, mindfulness and meditation, somatic and body-based work, breathwork, gentle movement and yoga, nutritional guidance, and meaning-centered practices." },
  { q: "What does a typical week of treatment look like?", a: "A typical week may include individual therapy sessions, group process work, somatic or mindfulness-based skills training, movement or yoga, nutritional support, and dedicated time for reflection and integration." },
  { q: "Will I still have access to medication management and psychiatric care?", a: "Absolutely. Holistic integration complements \u2014 it does not replace \u2014 medical and psychiatric care. Our team works closely with prescribing providers to ensure you receive comprehensive, coordinated treatment." },
  { q: "Does insurance cover holistic integration treatment?", a: "In most cases, yes. We accept most major insurance plans, and our admissions team will verify your benefits before treatment begins. We\u2019ll walk you through coverage, out-of-pocket costs, and financial options." },
  { q: "How long does treatment typically last?", a: "Treatment length varies based on your goals, clinical needs, and chosen level of care. Outpatient therapy may continue for several months, while structured programs (IOP/PHP) typically range from 6 to 12 weeks." },
  { q: "Do I need prior experience with mindfulness, yoga, or somatic practices?", a: "Not at all. Our therapists meet you exactly where you are. Whether you\u2019ve never meditated before or have years of practice, we\u2019ll introduce each modality at a pace that feels safe, accessible, and aligned with your recovery." },
];

export default function HolisticPage() {
  return (
    <>
      <TherapyHero
        image={IMG}
        eyebrow="Holistic Integration"
        headline="Whole-Person Healing"
        headlineItalic="in Seattle"
        body="Mind, body, and spirit \u2014 unified in your recovery. Expert holistic integration therapy in Seattle for addiction, anxiety, depression, trauma, and co-occurring conditions \u2014 delivered by licensed integrative therapists."
        credentials={[
          { icon: "ri-award-line", label: "Licensed Integrative Therapists" },
          { icon: "ri-shield-check-line", label: "Insurance Accepted" },
          { icon: "ri-map-pin-2-line", label: "Seattle, WA" },
        ]}
      />

      <TherapyUnderstanding
        eyebrow="Understanding Holistic Integration"
        headline={<>What is <span className="italic">Holistic Integration Therapy?</span></>}
        intro="Holistic integration brings together evidence-based clinical care and time-tested complementary practices to heal the whole person. Rather than treating symptoms in isolation, this approach addresses the mind, body, and spirit together \u2014 creating deeper, more lasting change than any single modality can achieve alone."
        leftCard={{
          title: "Mind-Body Integration",
          body: "Holistic integration is built on the understanding that mental health, physical health, and spiritual wellbeing are inseparable. Trauma, stress, and addiction leave their imprints on all three layers \u2014 and lasting recovery requires tending to all three.\n\nOur integrative model weaves evidence-based clinical therapy with mindfulness practice, somatic awareness, nutritional support, and movement. Each element reinforces the others, creating a foundation of regulation, resilience, and renewed purpose.",
        }}
        rightCard={{
          title: "Integrative Wellness Practices",
          intro: "Our integrative toolkit draws from practices carefully selected for their clinical effectiveness and their capacity to address the full spectrum of human experience:",
          bullets: [
            "Mindfulness & Meditation \u2014 cultivating presence and self-awareness",
            "Somatic Practices \u2014 releasing stored tension and reconnecting with the body",
            "Nutrition & Movement \u2014 nourishing brain chemistry and physical vitality",
            "Meaning & Connection \u2014 building purpose, community, and inner resilience",
          ],
        }}
      />

      <TherapyApproach
        headline={<>Rooted In <span className="italic text-[var(--mvt-teal-light)]">Whole-Person Healing</span></>}
        body="Our clinical model honors the truth that lasting recovery requires more than addressing symptoms \u2014 it requires healing the whole person. We integrate evidence-based clinical care with time-tested complementary practices, drawing from mindfulness, somatic therapy, nutrition, movement, and meaning-centered work to give clients the tools to quiet a racing mind, settle a dysregulated nervous system, and reconnect with purpose."
        features={[
          { icon: "ri-leaf-line", title: "Clinical Therapy", body: "Evidence-based individual and group therapy forms the clinical foundation, ensuring every integrative practice is anchored in proven clinical science." },
          { icon: "ri-heart-pulse-line", title: "Mindfulness & Somatic Work", body: "Body-based and mindfulness modalities for deep nervous system regulation \u2014 addressing trauma and stress at the physiological root." },
          { icon: "ri-user-heart-line", title: "Personalized Plans", body: "Every integrative treatment plan is tailored to each client\u2019s history, preferences, and goals. No two recovery journeys are the same." },
        ]}
      />

      <TherapyConditions
        headline={<>Conditions Treated Through <span className="italic">Holistic Integration</span></>}
        intro="Our integrative approach addresses a wide range of mental health, substance use, and stress-related conditions by targeting root causes rather than symptoms alone."
        col1={{
          title: "Mind-Body Conditions Addressed",
          icon: "ri-mental-health-line",
          items: ["Major Depressive Disorder", "Generalized Anxiety Disorder", "Panic Disorder & Phobias", "Burnout & Chronic Stress", "Insomnia & Sleep Disturbances", "Adjustment Disorders"],
        }}
        col2={{
          title: "Integrative & Somatic Conditions",
          icon: "ri-body-scan-line",
          items: ["Substance Use Disorders", "PTSD & Complex Trauma", "Eating Disorders", "Chronic Pain & Somatic Symptoms", "Co-Occurring Mental Health & Addiction", "Emotion Dysregulation"],
        }}
      />

      <TherapyWhoBenefits
        headline={<>Who Benefits From <span className="italic">Holistic Integration</span></>}
        intro="Holistic integration is especially valuable for those seeking healing that goes beyond symptom management to address the root causes of suffering."
        cards={[
          { n: "01", icon: "ri-cloud-line", title: "Anxiety & Depression", body: "Ideal for individuals navigating persistent worry, low mood, or disconnection from themselves. Integrative care addresses the cognitive, somatic, and relational dimensions of these conditions." },
          { n: "02", icon: "ri-link-m", title: "Co-Occurring Disorders", body: "Comprehensive support for clients managing both a mental health condition and substance use, addressing the full person rather than each condition in isolation." },
          { n: "03", icon: "ri-shield-cross-line", title: "Trauma & PTSD", body: "Trauma-informed care for individuals working through past trauma, incorporating somatic and mindfulness-based approaches alongside evidence-based therapy." },
          { n: "04", icon: "ri-pulse-line", title: "Nervous System Dysregulation", body: "For those who experience overwhelming emotions, chronic stress responses, or a body that feels locked in fight-or-flight. Somatic and mindfulness practices restore regulation at a physiological level." },
          { n: "05", icon: "ri-team-line", title: "Relationship & Connection", body: "Individuals who struggle with conflict, boundaries, or feeling disconnected from themselves and others benefit from the relational and meaning-centered dimensions of integrative care." },
          { n: "06", icon: "ri-seedling-line", title: "Addiction Recovery", body: "Clients in early or ongoing recovery who need more than symptom management. Holistic integration addresses the physical, emotional, and spiritual dimensions that sustain long-term sobriety." },
        ]}
      />

      <FaqAccordion
        eyebrow="Common Questions"
        headline={<>Frequently Asked <span className="italic">Questions</span></>}
        faqs={FAQS}
      />

      <FinancialConcierge />
    </>
  );
}
