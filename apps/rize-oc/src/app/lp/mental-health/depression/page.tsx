import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Residential Treatment Centers for Depression | Rize OC",
  description: "Best inpatient and residential treatment centers for depression. Evidence-based care, personalized treatment plans, and insurance accepted at Rize OC.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Residential Treatment Centers for Depression"
      subheadline="When outpatient therapy isn't enough, Rize OC provides the structure and intensive care needed to overcome major depressive disorder. Our residential and inpatient programs offer evidence-based treatment, 24/7 clinical support, and a compassionate path toward lasting recovery."
      eyebrow="Depression Treatment Specialists"
      stat="1,000+"
      statLabel="Successful Recoveries"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Depression"
          headline="What Is Major Depressive Disorder & When Does It Require Residential Care?"
          paragraphs={[
            "Major depressive disorder is one of the most common yet debilitating mental health conditions — affecting not just mood but every aspect of daily functioning, including sleep, appetite, energy, concentration, and motivation. When depression is severe, treatment-resistant, or accompanied by co-occurring conditions, outpatient therapy alone is often insufficient.",
            "At Rize OC, we treat depression with a comprehensive approach that addresses biological, psychological, and social factors simultaneously. Our clinical team combines evidence-based therapies — including CBT, EMDR, and somatic experiencing — with medication management and holistic wellness practices to create a personalized path toward lasting recovery.",
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
          callout="Treatment-resistant depression — where two or more antidepressant trials have failed — affects up to 30% of people with major depression. Residential care provides the intensive, closely monitored environment needed to try new approaches and achieve breakthrough results."
        />
      }
    />
  );
}
