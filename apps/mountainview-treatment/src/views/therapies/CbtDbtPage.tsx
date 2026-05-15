import FinancialConcierge from "@/components/feature/FinancialConcierge";
import FaqAccordion from "@/views/levels-of-care/FaqAccordion";
import TherapyApproach from "./TherapyApproach";
import TherapyConditions from "./TherapyConditions";
import TherapyHero from "./TherapyHero";
import TherapyUnderstanding from "./TherapyUnderstanding";
import TherapyWhoBenefits from "./TherapyWhoBenefits";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-hero.png";

const FAQS = [
  { q: "What is the difference between CBT and DBT?", a: "Cognitive Behavioral Therapy (CBT) focuses on identifying and changing unhelpful thought patterns that drive anxiety, depression, and substance use. Dialectical Behavior Therapy (DBT) builds on CBT by adding skills in mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. CBT is typically best for clients dealing with distorted thinking and avoidance, while DBT is especially effective when intense emotion dysregulation is part of the picture." },
  { q: "How long does CBT or DBT therapy take to work?", a: "Most clients begin noticing changes within 6 to 12 sessions of CBT, with a typical course lasting 12 to 20 weeks. DBT is usually a longer commitment \u2014 comprehensive DBT programs run 6 months to a year because skill-building takes consistent practice. Timelines vary based on conditions treated, session frequency, and how actively clients apply skills between sessions." },
  { q: "Does insurance cover CBT and DBT therapy?", a: "Yes. Because CBT and DBT are evidence-based therapies recognized by major medical and mental health organizations, they are covered by most insurance plans, including PPO, HMO, Medicaid, and Medicare in many cases. Mountain View Treatment accepts a wide range of insurance providers and offers a free benefits verification before you start." },
  { q: "Is CBT or DBT better for addiction recovery?", a: "Both are effective, and the right choice depends on what\u2019s driving the substance use. CBT helps clients identify the thoughts and triggers that lead to drinking or drug use, then build healthier coping strategies \u2014 making it a strong fit for relapse prevention. DBT is often recommended when addiction is paired with intense emotional dysregulation, trauma, or self-destructive behaviors." },
  { q: "Can CBT and DBT be done through telehealth?", a: "Yes. Both therapies translate well to virtual sessions, and research shows online CBT and DBT produce outcomes comparable to in-person care for most conditions. Mountain View offers HIPAA-compliant telehealth across Washington State, though some clients prefer in-person work." },
  { q: "What conditions do CBT and DBT treat?", a: "CBT and DBT treat a wide range of mental health and substance use conditions, including depression, anxiety disorders, PTSD, OCD, panic disorder, bipolar disorder, borderline personality disorder, eating disorders, alcohol and drug addiction, self-harm, and co-occurring disorders." },
  { q: "What happens in a typical CBT or DBT session?", a: "A CBT session starts with a check-in and agenda-setting, followed by reviewing homework, working through a specific thought pattern, and assigning new exercises. DBT sessions often include a diary card review, targeted skills work, and rehearsal of strategies for upcoming challenges." },
  { q: "How do I know if CBT or DBT is right for me?", a: "The best way to know is a clinical assessment. During your consultation at Mountain View, a licensed therapist will discuss your symptoms, history, and goals, then recommend the approach most likely to help. Generally, CBT may be a strong starting point for worry or negative thinking; DBT may be a better fit if you experience overwhelming emotions or impulsive behaviors." },
];

export default function CbtDbtPage() {
  return (
    <>
      <TherapyHero
        image={IMG}
        eyebrow="CBT & DBT Therapy"
        headline="Cognitive & Dialectical"
        headlineItalic="Therapies in Seattle"
        body="Evidence-based Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT) tailored to your recovery. Expert care for addiction, anxiety, depression, PTSD, and co-occurring disorders \u2014 delivered by licensed CBT and DBT therapists."
        credentials={[
          { icon: "ri-award-line", label: "Licensed CBT & DBT Therapists" },
          { icon: "ri-shield-check-line", label: "Insurance Accepted" },
          { icon: "ri-map-pin-2-line", label: "Seattle, WA" },
        ]}
      />

      <TherapyUnderstanding
        eyebrow="Understanding CBT & DBT"
        headline={<>What is <span className="italic">Cognitive & Dialectical Therapy?</span></>}
        intro="Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT) are two of the most extensively researched and effective approaches in modern mental health and addiction treatment. Both are evidence-based talk therapies that help individuals identify and change the patterns of thought, emotion, and behavior driving their struggles."
        leftCard={{
          title: "Cognitive Behavioral Therapy",
          body: "CBT is a structured, goal-oriented therapy based on the connection between thoughts, feelings, and behaviors. It helps clients recognize the distorted thinking patterns that fuel anxiety, depression, and substance use, and replace them with more accurate, balanced perspectives.\n\nIn practice, CBT sessions focus on identifying specific triggers, challenging automatic negative thoughts, and building healthier coping strategies. Clients develop concrete skills they can apply immediately between sessions, making CBT one of the most practical and efficient therapies available.",
        }}
        rightCard={{
          title: "Dialectical Behavior Therapy",
          intro: "DBT was originally developed by Dr. Marsha Linehan and combines the change-focused tools of CBT with acceptance-based strategies drawn from mindfulness practice. The word \u201Cdialectical\u201D refers to the balance between accepting yourself as you are and actively working toward change. DBT teaches four core skill sets:",
          bullets: [
            "Mindfulness \u2014 staying present and aware",
            "Distress tolerance \u2014 surviving crisis moments without making them worse",
            "Emotion regulation \u2014 understanding and managing intense feelings",
            "Interpersonal effectiveness \u2014 communicating needs and setting boundaries",
          ],
        }}
      />

      <TherapyApproach
        headline={<>Grounded In <span className="italic text-[var(--mvt-teal-light)]">Evidence-Based Therapy</span></>}
        body="Our clinical model centers on two of the most rigorously studied therapies in modern mental health care. Together, CBT and DBT give clients the tools to recognize the thought patterns driving their struggles, regulate intense emotions, and build healthier responses to life\u2019s challenges. Our Seattle therapists tailor every course of treatment to each client\u2019s history, pace, and goals."
        features={[
          { icon: "ri-mind-map", title: "CBT Techniques", body: "Reshape unhelpful thought patterns that fuel anxiety, depression, and substance use with structured, skills-based Cognitive Behavioral Therapy." },
          { icon: "ri-emotion-line", title: "DBT Skills Training", body: "Build mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness \u2014 the four core DBT skill sets." },
          { icon: "ri-user-heart-line", title: "Integrated Approach", body: "Every treatment plan is tailored to each client\u2019s needs, combining CBT and DBT in the proportion that best fits their history and goals." },
        ]}
      />

      <TherapyConditions
        headline={<>Conditions Treated By <span className="italic">CBT & DBT</span></>}
        intro="Cognitive Behavioral Therapy and Dialectical Behavior Therapy are backed by decades of clinical research and address a wide range of mental health and substance use conditions. Our therapists draw on both modalities to match each client\u2019s needs."
        col1={{
          title: "Conditions Often Treated With CBT",
          icon: "ri-brain-line",
          items: ["Major Depressive Disorder", "Generalized Anxiety Disorder", "Panic Disorder & Phobias", "Obsessive-Compulsive Disorder (OCD)", "Post-Traumatic Stress Disorder (PTSD)", "Social Anxiety Disorder"],
        }}
        col2={{
          title: "Conditions Often Treated With DBT",
          icon: "ri-mental-health-line",
          items: ["Borderline Personality Disorder", "Chronic Suicidal Ideation & Self-Harm", "Emotion Dysregulation", "Substance Use Disorders", "Eating Disorders", "Bipolar Disorder"],
        }}
      />

      <TherapyWhoBenefits
        headline={<>Who Benefits From <span className="italic">CBT & DBT</span></>}
        intro="CBT and DBT are especially effective for conditions rooted in distorted thinking, emotional dysregulation, and harmful behavioral patterns."
        cards={[
          { n: "01", icon: "ri-cloud-line", title: "Anxiety & Depression", body: "Ideal for individuals struggling with persistent worry, low mood, or negative thought patterns. CBT helps identify and reshape the thinking that fuels these conditions." },
          { n: "02", icon: "ri-link-m", title: "Co-Occurring Disorders", body: "Comprehensive support for clients managing both a mental health condition and substance use. CBT and DBT address the underlying patterns driving both at once." },
          { n: "03", icon: "ri-shield-cross-line", title: "Trauma & PTSD", body: "Targeted care for individuals working through past trauma, intrusive memories, or hypervigilance. Both CBT and DBT are evidence-based treatments for PTSD." },
          { n: "04", icon: "ri-pulse-line", title: "Emotion Dysregulation", body: "For those who experience overwhelming emotions, mood swings, or impulsive reactions. DBT\u2019s skill-building framework provides concrete tools for daily emotional management." },
          { n: "05", icon: "ri-team-line", title: "Relationship Challenges", body: "Individuals who struggle with conflict, boundaries, or communication benefit from DBT\u2019s interpersonal effectiveness skills and CBT\u2019s relational insight work." },
          { n: "06", icon: "ri-medal-line", title: "Addiction Recovery", body: "Clients in early or ongoing recovery who need cognitive tools to manage cravings, reframe high-risk thinking, and build a sustainable sober life." },
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
