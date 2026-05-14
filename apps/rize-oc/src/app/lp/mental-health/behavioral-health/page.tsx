import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Behavioral Health Treatment Centers | Rize OC",
  description: "Top-rated behavioral health treatment in Orange County. Residential and inpatient programs for mental health and co-occurring disorders. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Behavioral Health Treatment Centers"
      subheadline="Rize OC provides comprehensive behavioral health treatment — addressing mental health conditions, co-occurring substance use, and the underlying patterns driving problematic behaviors. Residential and inpatient programs with full insurance coverage."
      eyebrow="Behavioral Health Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Behavioral Health"
          headline="What Is Behavioral Health & What Does Treatment Address?"
          paragraphs={[
            "Behavioral health is a broad field encompassing mental health conditions, substance use disorders, and the behaviors that affect overall wellbeing and daily functioning. Behavioral health treatment centers like Rize OC provide integrated care that addresses this full spectrum — recognizing that mental health, substance use, and physical health are deeply interconnected.",
            "Our behavioral health programs are designed to treat the root causes of problematic behaviors and mental health symptoms — not just the surface presentation. Through individualized assessment, evidence-based therapies, and a multidisciplinary clinical team, we create personalized treatment plans that address the complete picture of each client's health.",
          ]}
          listHeading="Behavioral Health Conditions We Treat"
          listItems={[
            "Co-occurring mental health and substance use disorders",
            "Trauma-related behavioral patterns and avoidance",
            "Emotional dysregulation and impulsive behaviors",
            "Mood disorders affecting daily functioning",
            "Anxiety-driven avoidance and compulsive behaviors",
            "Stress-related physical health impacts and burnout",
            "Executive dysfunction affecting work and relationships",
            "Self-destructive patterns related to unprocessed trauma",
          ]}
          callout="Effective behavioral health treatment goes beyond symptom management. At Rize OC, we focus on identifying and resolving the underlying patterns — biological, psychological, and social — that drive behavioral health challenges, creating the foundation for sustained recovery."
        />
      }
    />
  );
}
