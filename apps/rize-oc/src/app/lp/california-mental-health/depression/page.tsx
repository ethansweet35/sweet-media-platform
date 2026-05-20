import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Residential Treatment for Depression | Rize OC",
  description:
    "Best inpatient and residential depression treatment in California. Evidence-based care, personalized plans, in-person and virtual options. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Residential Treatment Centers for Depression"
      subheadline="When outpatient therapy isn't enough, Rize OC provides the structure and intensive care California residents need for major depressive disorder. Residential and inpatient programs with 24/7 clinical support — in Orange County and virtually statewide."
      eyebrow="California Depression Treatment Specialists"
      stat="1,000+"
      statLabel="Successful Recoveries"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Depression"
          headline="What Is Major Depressive Disorder & When Does It Require Residential Care?"
          paragraphs={[
            "Major depressive disorder affects mood, sleep, appetite, energy, concentration, and motivation across every aspect of daily life. When depression is severe, treatment-resistant, or accompanied by co-occurring conditions, outpatient therapy alone is often insufficient for California clients who need intensive support.",
            "At Rize OC, we treat depression with a comprehensive approach addressing biological, psychological, and social factors. Our California clinical team combines CBT, EMDR, and somatic experiencing with medication management — in-person in Orange County or through virtual intensive programs.",
          ]}
          listHeading="Common Depression Symptoms"
          listItems={[
            "Persistent sadness, emptiness, or hopelessness",
            "Loss of interest in activities once enjoyed (anhedonia)",
            "Significant changes in appetite or weight",
            "Sleep disturbances — insomnia or sleeping too much",
            "Fatigue and loss of energy nearly every day",
            "Feelings of worthlessness or excessive guilt",
            "Difficulty thinking, concentrating, or making decisions",
            "Recurrent thoughts of death or suicide",
          ]}
          callout="Treatment-resistant depression affects up to 30% of people with major depression. Residential care provides the intensive, closely monitored environment needed to try new approaches — available to California residents with same-day assessment."
        />
      }
    />
  );
}
