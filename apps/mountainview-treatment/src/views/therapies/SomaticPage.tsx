import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";
import TherapyApproach from "./TherapyApproach";
import TherapyConditions from "./TherapyConditions";
import TherapyHero from "./TherapyHero";
import TherapyUnderstanding from "./TherapyUnderstanding";
import TherapyWhoBenefits from "./TherapyWhoBenefits";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-5.png";

const FAQS = [
  { q: "What does a Somatic Experiencing session actually look like?", a: "Sessions look quite different from traditional talk therapy. You sit comfortably, fully clothed, and your practitioner gently guides you to notice what\u2019s happening in your body \u2014 sensations, breath, subtle movements, areas of tension or ease. Rather than discussing the narrative of your trauma, the work follows the body\u2019s own intelligence." },
  { q: "Do I have to talk about my trauma in detail?", a: "No \u2014 and this is one of the most important distinctions of Somatic Experiencing. Unlike approaches that ask you to recount or revisit traumatic events in detail, SE works primarily with the body\u2019s present-moment experience. You don\u2019t need to tell your story to heal." },
  { q: "Is SE safe? Could it retraumatize me?", a: "Somatic Experiencing was specifically designed to avoid retraumatization. The entire method is built on principles of titration (working with very small amounts of activation at a time) and pendulation (moving gently between activation and settling), ensuring the nervous system is never overwhelmed." },
  { q: "How is Somatic Experiencing different from massage or other body work?", a: "Somatic Experiencing is a psychotherapeutic modality, not body work. While SE may occasionally include light, consensual touch \u2014 always over clothing and with explicit agreement \u2014 the core work is mental and nervous system oriented, not physical manipulation." },
  { q: "What if I don\u2019t remember specific trauma events?", a: "You don\u2019t need to. Many people, especially those with developmental or childhood trauma, don\u2019t have clear memories of what happened. SE doesn\u2019t require memory \u2014 it works with the body\u2019s present-moment experience of activation and dysregulation." },
  { q: "Is Somatic Experiencing backed by research?", a: "Yes, with a growing evidence base. Somatic Experiencing has been studied in randomized controlled trials for PTSD, chronic pain, and natural disaster survivors, with results showing meaningful symptom reduction and improved quality of life." },
  { q: "How many sessions will I need?", a: "This varies significantly based on the type and depth of trauma. Some clients see meaningful shifts in 6 to 10 sessions; others, particularly those with complex or developmental trauma, benefit from longer-term engagement. Your SE practitioner will discuss realistic expectations during the assessment phase." },
  { q: "Does insurance cover Somatic Experiencing?", a: "Coverage varies by plan and provider. Many insurance plans cover SE under behavioral health benefits when used to treat diagnosable conditions like PTSD, anxiety, or trauma-related disorders. Our admissions team will verify your benefits before treatment begins." },
];

export default function SomaticPage() {
  return (
    <>
      <TherapyHero
        image={IMG}
        eyebrow="Somatic Experiencing"
        headline="Somatic Experiencing"
        headlineItalic="Therapy in Seattle"
        body="Body-based, evidence-informed trauma therapy that honors the wisdom of your nervous system. Expert Somatic Experiencing therapy in Seattle for trauma, PTSD, anxiety, addiction, and the deep nervous system dysregulation that so often accompanies them."
        credentials={[
          { icon: "ri-award-line", label: "Certified SE Practitioners" },
          { icon: "ri-shield-check-line", label: "Insurance Accepted" },
          { icon: "ri-map-pin-2-line", label: "Seattle, WA" },
        ]}
      />

      <TherapyUnderstanding
        eyebrow="Understanding Somatic Experiencing"
        headline={<>What is <span className="italic">Somatic Experiencing?</span></>}
        intro="Somatic Experiencing (SE) is one of the most carefully developed approaches in modern trauma therapy. Grounded in neuroscience and the body\u2019s innate wisdom, SE is an evidence-informed method that helps individuals release the trauma held in the nervous system, restore regulation, and reconnect with the body\u2019s natural capacity for healing \u2014 without requiring detailed verbal processing of traumatic events."
        leftCard={{
          title: "How Trauma Lives in the Body",
          body: "When the nervous system encounters an overwhelming experience, it mobilizes survival responses \u2014 fight, flight, or freeze. If these responses are unable to complete, the survival energy becomes trapped in the body, keeping the nervous system in a state of chronic activation or shutdown long after the danger has passed.\n\nThis stored activation is what produces the symptoms of trauma: hypervigilance, intrusive thoughts, numbness, chronic tension, sleep disturbances, and the physical sensations of fear even in safe environments. SE works by helping the nervous system complete these interrupted survival responses, gently releasing the trapped energy and restoring a natural state of regulation.",
        }}
        rightCard={{
          title: "The Somatic Experiencing Method",
          intro: "SE follows a careful, titrated process that works with the body\u2019s own intelligence rather than against it. The core elements of the method include:",
          bullets: [
            "Tracking \u2014 developing awareness of body sensations and nervous system states",
            "Resourcing \u2014 strengthening inner and outer sources of safety and calm",
            "Pendulation \u2014 moving gently between activation and settling",
            "Completion \u2014 allowing the body to release trapped survival energy",
          ],
        }}
      />

      <TherapyApproach
        headline={<>Attuned To <span className="italic text-[var(--mvt-teal-light)]">The Body\u2019s Wisdom</span></>}
        body="Our clinical model is built on the recognition that trauma is not stored in the events themselves \u2014 it lives in the body, and the body is also where it most fully heals. Somatic Experiencing works with the natural intelligence of the nervous system, gently guiding clients through the gradual release of what trauma left behind: incomplete survival responses, chronic activation, and disconnection from the body\u2019s own capacity for regulation and resilience."
        features={[
          { icon: "ri-body-scan-line", title: "Certified SE Practitioners", body: "Somatic Experiencing delivered by certified practitioners (SEPs) trained in Dr. Peter Levine\u2019s full SE methodology \u2014 the gold standard in somatic trauma therapy." },
          { icon: "ri-heart-pulse-line", title: "Integrated Somatic Care", body: "SE is woven into a broader trauma-informed clinical framework, coordinated with therapy, EMDR, and other evidence-based modalities for comprehensive healing." },
          { icon: "ri-user-heart-line", title: "Gentle, Attuned Protocols", body: "Every session is carefully tailored to each client\u2019s nervous system \u2014 paced to avoid overwhelm and designed to build capacity for regulation over time." },
        ]}
      />

      <TherapyConditions
        headline={<>Conditions Treated Through <span className="italic">Somatic Experiencing</span></>}
        intro="Somatic Experiencing is especially effective for conditions where trauma and nervous system dysregulation are at the root, including many that don\u2019t respond fully to cognitive approaches alone."
        col1={{
          title: "Trauma-Related Conditions",
          icon: "ri-shield-cross-line",
          items: ["Post-Traumatic Stress Disorder (PTSD)", "Complex PTSD (C-PTSD)", "Childhood & Developmental Trauma", "Single-Incident Trauma (Accidents, Assault, Medical)", "Vicarious & Secondary Trauma", "Birth & Perinatal Trauma"],
        }}
        col2={{
          title: "Somatic & Stress-Related Symptoms",
          icon: "ri-body-scan-line",
          items: ["Anxiety & Panic Disorders", "Chronic Pain & Tension", "Migraines & Tension Headaches", "Insomnia & Sleep Disturbances", "Hyperarousal & Hypervigilance", "Dissociation & Emotional Numbing"],
        }}
      />

      <TherapyWhoBenefits
        headline={<>Who Benefits From <span className="italic">Somatic Experiencing</span></>}
        intro="SE is especially valuable for those whose trauma symptoms live more in the body than in memory \u2014 or who haven\u2019t found full relief through cognitive or talk-based approaches alone."
        cards={[
          { n: "01", icon: "ri-shield-cross-line", title: "Trauma & PTSD", body: "For individuals working through past trauma \u2014 whether single-incident, prolonged, or complex. SE addresses trauma at the nervous system level, where it is most effectively healed." },
          { n: "02", icon: "ri-pulse-line", title: "Anxiety & Hypervigilance", body: "For individuals whose nervous systems live in a state of constant activation \u2014 racing thoughts, physical tension, startle responses, or a persistent sense of danger even in safe environments." },
          { n: "03", icon: "ri-medal-line", title: "Addiction Recovery", body: "For clients in recovery who recognize that their substance use was, at least in part, an attempt to regulate an overwhelmed nervous system. SE addresses the somatic roots of self-medication." },
          { n: "04", icon: "ri-heart-3-line", title: "Complex & Developmental Trauma", body: "For those carrying the long-term effects of childhood trauma, relational wounds, or adverse early experiences. SE works gently with what the body holds, regardless of what the mind remembers." },
          { n: "05", icon: "ri-body-scan-line", title: "Chronic Pain & Somatic Symptoms", body: "Targeted care for those whose trauma or stress lives in the body as chronic pain, tension, or unexplained physical symptoms. SE helps release the stored activation contributing to these experiences." },
          { n: "06", icon: "ri-team-line", title: "First Responders & Frontline Professionals", body: "Specialized care for paramedics, firefighters, healthcare workers, military, law enforcement, and others who carry the cumulative weight of vicarious and direct trauma exposure." },
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
