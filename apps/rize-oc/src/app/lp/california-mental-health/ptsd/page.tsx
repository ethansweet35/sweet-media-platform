import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Inpatient PTSD & Trauma Treatment | Rize OC",
  description:
    "Expert inpatient and residential PTSD treatment for California residents. EMDR, trauma-informed care, and evidence-based therapy. In-person and virtual. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Inpatient PTSD & Trauma Treatment Center"
      subheadline="Rize OC provides specialized residential and inpatient PTSD and trauma care for California residents. Our trauma-informed team uses EMDR, somatic experiencing, and evidence-based therapies — in Orange County and virtually statewide."
      eyebrow="California PTSD & Trauma Specialists"
      stat="24/7"
      statLabel="Trauma-Informed Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding PTSD & Trauma"
          headline="What Is PTSD & Why Does It Often Require Inpatient Treatment?"
          paragraphs={[
            "Post-traumatic stress disorder (PTSD) develops after experiencing or witnessing traumatic events — combat, assault, accidents, childhood abuse, or other life-threatening experiences. PTSD keeps the nervous system in chronic hyperarousal even when danger has passed.",
            "Effective PTSD treatment requires specialized, trauma-informed care. At Rize OC, our California trauma program combines EMDR, somatic experiencing, and trauma-focused CBT — in a safe residential environment or through intensive virtual programming for clients statewide.",
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
          callout="EMDR can significantly reduce PTSD symptoms in many single-trauma cases. Rize OC's California program provides the safety, time, and expert support needed for deep therapeutic work — in-person or virtually."
        />
      }
    />
  );
}
