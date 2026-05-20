import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Behavioral Health Treatment Centers | Rize OC",
  description:
    "Top-rated behavioral health treatment for California residents. Residential and inpatient programs for mental health and co-occurring disorders. In-person and virtual. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Behavioral Health Treatment Centers"
      subheadline="Rize OC provides comprehensive behavioral health treatment for California residents — addressing mental health conditions, co-occurring substance use, and the underlying patterns driving problematic behaviors. In-person in Orange County, virtual statewide."
      eyebrow="California Behavioral Health Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Behavioral Health in California"
          headline="What Is Behavioral Health & What Does Treatment Address?"
          paragraphs={[
            "Behavioral health encompasses mental health conditions, substance use disorders, and the behaviors that affect overall wellbeing and daily functioning. Treatment centers like Rize OC provide integrated care across California — recognizing that mental health, substance use, and physical health are deeply interconnected.",
            "Our California behavioral health programs treat root causes of problematic behaviors and mental health symptoms — not just surface presentation. Through individualized assessment, evidence-based therapies, and a multidisciplinary team, we build personalized plans for clients in Orange County and statewide via virtual care.",
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
          callout="Effective behavioral health treatment goes beyond symptom management. At Rize OC, we help California clients resolve the biological, psychological, and social patterns driving behavioral health challenges — in-person or virtually."
        />
      }
    />
  );
}
