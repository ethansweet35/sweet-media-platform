import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Inpatient PTSD Treatment Center | Rize OC",
  description: "Expert inpatient and residential PTSD and trauma treatment in Orange County. EMDR, trauma-informed care, and evidence-based therapy. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Expert Inpatient PTSD & Trauma Treatment Center"
      subheadline="Rize OC provides specialized residential and inpatient care for PTSD and complex trauma. Our trauma-informed clinical team uses EMDR, somatic experiencing, and evidence-based therapies to help you safely process trauma and rebuild your life."
      eyebrow="PTSD & Trauma Specialists"
      stat="24/7"
      statLabel="Trauma-Informed Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding PTSD & Trauma"
          headline="What Is PTSD & Why Does It Often Require Inpatient Treatment?"
          paragraphs={[
            "Post-traumatic stress disorder (PTSD) develops in some people after experiencing or witnessing a traumatic event — such as combat, sexual assault, serious accidents, childhood abuse, or other life-threatening experiences. PTSD affects the way the brain processes memory and threat, keeping the nervous system in a chronic state of hyperarousal even when the danger has long passed.",
            "Effective PTSD treatment requires specialized, trauma-informed care delivered by clinicians who understand the neurobiological underpinnings of trauma. At Rize OC, our trauma program combines EMDR (Eye Movement Desensitization and Reprocessing), somatic experiencing, and trauma-focused CBT within a safe, residential environment that provides the time and stability needed for deep therapeutic work.",
          ]}
          listHeading="Common PTSD Symptoms"
          listItems={[
            "Intrusive memories, flashbacks, and distressing nightmares",
            "Avoidance of trauma-related thoughts, people, places, or situations",
            "Negative changes in thinking, mood, and beliefs about the world",
            "Hyperarousal — being easily startled, constantly on edge",
            "Sleep disturbances and chronic insomnia",
            "Emotional numbness, detachment, or feeling cut off from others",
            "Irritability and angry outbursts disproportionate to the situation",
            "Difficulty concentrating or completing everyday tasks",
          ]}
          callout="EMDR therapy has been shown to significantly reduce PTSD symptoms in 77–100% of single-trauma cases. Our residential program provides the time, safety, and expert clinical support needed to engage in this powerful treatment effectively — often achieving results that years of outpatient therapy cannot."
        />
      }
    />
  );
}
