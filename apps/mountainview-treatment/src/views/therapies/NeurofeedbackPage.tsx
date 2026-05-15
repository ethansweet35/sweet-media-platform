import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";
import TherapyApproach from "./TherapyApproach";
import TherapyConditions from "./TherapyConditions";
import TherapyHero from "./TherapyHero";
import TherapyUnderstanding from "./TherapyUnderstanding";
import TherapyWhoBenefits from "./TherapyWhoBenefits";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-4.png";

const FAQS = [
  { q: "Is neurofeedback actually backed by science?", a: "Yes. Neurofeedback has been studied for more than fifty years, with thousands of peer-reviewed clinical studies supporting its use for ADHD, anxiety, PTSD, depression, substance use, and traumatic brain injury. It is endorsed by leading neuroscience and mental health organizations worldwide." },
  { q: "What does a neurofeedback session actually feel like?", a: "Sessions are calm, comfortable, and entirely non-invasive. Painless sensors are placed on your scalp \u2014 no needles, no electrical current sent into the brain \u2014 and you simply sit in a comfortable chair watching a screen or listening to audio while your brain receives real-time feedback about its own activity patterns." },
  { q: "Is neurofeedback safe? Are there any side effects?", a: "Neurofeedback is widely considered one of the safest mental health interventions available. Because the equipment only reads brain activity \u2014 it does not stimulate it \u2014 there is no risk of physical harm. Some clients report mild, temporary fatigue after early sessions as the brain adjusts to new patterns." },
  { q: "How is neurofeedback different from brain-training apps like Lumosity?", a: "Brain-training apps work at the cognitive layer \u2014 practicing memory or pattern recognition tasks. Clinical neurofeedback works at the neurological layer, directly training brainwave patterns using real-time EEG feedback. The two are fundamentally different interventions." },
  { q: "How many sessions will I need?", a: "Most clients complete 20 to 40 sessions over several months, with measurable changes often appearing within the first 10 to 15. The exact number depends on your condition, goals, and how your brain responds to training." },
  { q: "Will neurofeedback replace my medication or therapy?", a: "Not necessarily. Neurofeedback is designed to work alongside other forms of care, not in place of them. Many clients use neurofeedback as a complement to therapy and medication, and some find that their need for medication gradually decreases as brain regulation improves." },
  { q: "Can children and teenagers do neurofeedback?", a: "Yes, and they often do exceptionally well. Children\u2019s brains are highly neuroplastic, which means they often respond to neurofeedback faster than adult brains. Neurofeedback is widely used for childhood ADHD, anxiety, and learning differences." },
  { q: "Does insurance cover neurofeedback?", a: "Coverage varies by plan and provider. Some insurance plans cover neurofeedback under behavioral health benefits \u2014 particularly when used to treat diagnosable conditions like ADHD, PTSD, or anxiety. Our admissions team will verify your benefits before treatment begins." },
];

export default function NeurofeedbackPage() {
  return (
    <>
      <TherapyHero
        image={IMG}
        eyebrow="Neurofeedback"
        headline="Neurofeedback Therapy"
        headlineItalic="in Seattle"
        body="Drug-free, non-invasive brain training backed by decades of research. Expert neurofeedback therapy in Seattle for trauma, anxiety, ADHD, depression, addiction, and co-occurring conditions \u2014 delivered by board-certified neurofeedback clinicians."
        credentials={[
          { icon: "ri-award-line", label: "Board-Certified Clinicians" },
          { icon: "ri-leaf-line", label: "Drug-Free & Non-Invasive" },
          { icon: "ri-shield-check-line", label: "Insurance Accepted" },
        ]}
      />

      <TherapyUnderstanding
        eyebrow="Understanding Neurofeedback"
        headline={<>What is <span className="italic">Neurofeedback?</span></>}
        intro="Neurofeedback is a form of biofeedback that trains the brain to regulate itself more effectively by providing real-time information about its own electrical activity. Using EEG sensors placed on the scalp, clients receive moment-to-moment feedback about their brainwave patterns, allowing the brain to learn healthier, more flexible states of function."
        leftCard={{
          title: "How Neurofeedback Works",
          body: "During a neurofeedback session, EEG sensors measure electrical activity across different regions of the brain. This data is processed in real time and converted into audio or visual feedback \u2014 typically a movie, game, or tones that respond to your brainwave patterns.\n\nWhen the brain produces healthier patterns, the feedback is positive (the movie plays clearly, the tones are pleasant). When patterns drift toward dysregulation, the feedback changes subtly. Over dozens of sessions, the brain learns to prefer and sustain healthier states of activation \u2014 a process called operant conditioning at the neurological level.",
        }}
        rightCard={{
          title: "A Personalized Brain Training Protocol",
          intro: "Every neurofeedback protocol at Mountain View begins with a comprehensive QEEG brain map \u2014 a detailed assessment of your unique brainwave patterns that guides every session:",
          bullets: [
            "QEEG Brain Mapping \u2014 comprehensive assessment of your unique brainwave patterns",
            "Personalized Protocols \u2014 targeted training designed for your neurological profile",
            "Neurofeedback Sessions \u2014 regular, guided training that reshapes brain activity",
            "Clinical Integration \u2014 coordinated care alongside therapy and recovery support",
          ],
        }}
      />

      <TherapyApproach
        headline={<>Powered By <span className="italic text-[var(--mvt-teal-light)]">Modern Neuroscience</span></>}
        body="Our clinical model is built on the recognition that mental health conditions and addiction are, at their core, conditions of brain regulation \u2014 patterns of neural activity that have become stuck, dysregulated, or out of sync. Neurofeedback works directly at this neurological level, training the brain itself to develop healthier, more flexible patterns. We combine comprehensive QEEG brain mapping with individually designed training protocols and full clinical integration."
        features={[
          { icon: "ri-brain-line", title: "QEEG Brain Mapping", body: "Comprehensive assessment of your unique brainwave patterns by board-certified clinicians \u2014 the foundation of every personalized neurofeedback protocol." },
          { icon: "ri-pulse-line", title: "Integrated Clinical Care", body: "Neurofeedback is coordinated with therapy, medication management, and recovery support for a comprehensive, whole-person treatment experience." },
          { icon: "ri-user-heart-line", title: "Personalized Protocols", body: "Every training protocol is designed specifically for your brain\u2019s profile and your clinical goals \u2014 never a one-size-fits-all approach." },
        ]}
      />

      <TherapyConditions
        headline={<>Conditions Treated Through <span className="italic">Neurofeedback</span></>}
        intro="Neurofeedback addresses conditions rooted in brain dysregulation \u2014 patterns of neural activity that have become stuck or imbalanced. It is especially powerful when combined with other evidence-based clinical approaches."
        col1={{
          title: "Primary Conditions Treated",
          icon: "ri-brain-line",
          items: ["ADHD & Attention Disorders", "Anxiety Disorders", "PTSD & Complex Trauma", "Major Depressive Disorder", "Substance Use Disorders", "Insomnia & Sleep Disorders"],
        }}
        col2={{
          title: "Symptoms & Concerns Supported",
          icon: "ri-pulse-line",
          items: ["Chronic Stress & Burnout", "Emotional Dysregulation", "Cognitive Fog & Memory Difficulties", "Migraines & Tension Headaches", "Post-Concussion Symptoms", "Autism Spectrum Support"],
        }}
      />

      <TherapyWhoBenefits
        headline={<>Who Benefits From <span className="italic">Neurofeedback</span></>}
        intro="Neurofeedback is especially effective for those whose symptoms are rooted in brain dysregulation and who haven\u2019t fully responded to traditional approaches."
        cards={[
          { n: "01", icon: "ri-focus-3-line", title: "ADHD & Attention Challenges", body: "For individuals struggling with focus, impulsivity, or executive function difficulties. Neurofeedback trains the brain to sustain attention and reduce distractibility at a neurological level." },
          { n: "02", icon: "ri-cloud-line", title: "Depression & Mood Disorders", body: "For clients experiencing low mood, lack of motivation, or persistent depressive symptoms. Neurofeedback can restore the brainwave patterns associated with emotional regulation and motivation." },
          { n: "03", icon: "ri-pulse-line", title: "Concussion & TBI Recovery", body: "Specialized care for individuals recovering from traumatic brain injury, concussion, or post-concussion syndrome. Neurofeedback directly supports the neurological recovery process." },
          { n: "04", icon: "ri-emotion-line", title: "Anxiety & Chronic Stress", body: "For those navigating persistent worry, racing thoughts, or a nervous system stuck in overdrive. Neurofeedback helps quiet overactive brain patterns associated with anxiety." },
          { n: "05", icon: "ri-shield-cross-line", title: "Trauma & PTSD", body: "Targeted care for individuals working through past trauma, hyperarousal, intrusive thoughts, or emotional numbness. Neurofeedback addresses the neurological signature of PTSD." },
          { n: "06", icon: "ri-medal-line", title: "Addiction Recovery", body: "For clients in early or ongoing recovery from substance use. Neurofeedback supports craving reduction, emotional regulation, and the neurological repair process of early recovery." },
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
