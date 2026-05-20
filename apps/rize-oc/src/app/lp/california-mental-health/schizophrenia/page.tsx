import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Schizophrenia Residential Treatment | Rize OC",
  description:
    "Expert schizophrenia and schizoaffective disorder residential treatment for California residents. Inpatient care, personalized plans, insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Schizophrenia Residential Treatment Facilities"
      subheadline="Rize OC provides specialized residential and inpatient treatment for schizophrenia and schizoaffective disorder for California residents — evidence-based care in a private supportive environment with same-day assessments."
      eyebrow="California Schizophrenia Treatment Specialists"
      stat="24/7"
      statLabel="Clinical Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Schizophrenia"
          headline="What Is Schizophrenia & Why Does It Require Residential Care?"
          paragraphs={[
            "Schizophrenia is a chronic, serious mental disorder affecting how a person thinks, feels, and behaves. Hallucinations, delusions, and disorganized thinking can be profoundly disabling without the right level of care — care California residents can access at Rize OC.",
            "Residential treatment is often necessary for medication stabilization, 24/7 monitoring, and intensive therapeutic intervention. Our California clinical team includes specialists in psychotic disorders who provide comprehensive evaluation and individualized treatment plans.",
          ]}
          listHeading="Key Symptoms We Treat"
          listItems={[
            "Positive symptoms — hallucinations, delusions, and disorganized speech",
            "Negative symptoms — reduced emotional expression, avolition, and social withdrawal",
            "Cognitive symptoms — impaired memory, attention difficulties, and executive function problems",
            "Schizoaffective features — mood episodes combined with psychotic symptoms",
            "Disorganized behavior affecting daily functioning and self-care",
            "Medication non-adherence requiring clinical monitoring and support",
          ]}
          callout="With the right residential care, medication management, and therapeutic support, individuals with schizophrenia can achieve significant symptom reduction and improved quality of life. California residents can begin with a same-day assessment at Rize OC."
        />
      }
    />
  );
}
