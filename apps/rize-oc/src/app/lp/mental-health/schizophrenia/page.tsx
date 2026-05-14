import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Schizophrenia Residential Treatment Facilities | Rize OC",
  description: "Expert schizophrenia and schizoaffective disorder residential treatment in Orange County. Inpatient care, personalized treatment plans, insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Expert Schizophrenia Residential Treatment Facilities"
      subheadline="At Rize OC, we provide specialized residential and inpatient treatment for schizophrenia and schizoaffective disorder. Our clinical team delivers evidence-based care in a private, supportive environment with same-day assessments available."
      eyebrow="Schizophrenia Treatment Specialists"
      stat="24/7"
      statLabel="Clinical Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Schizophrenia"
          headline="What Is Schizophrenia & Why Does It Require Residential Care?"
          paragraphs={[
            "Schizophrenia is a chronic, serious mental disorder that affects how a person thinks, feels, and behaves. People with schizophrenia may seem like they have lost touch with reality — experiencing hallucinations, delusions, and disorganized thinking that can be profoundly disabling without the right level of care.",
            "Residential treatment is often necessary for schizophrenia because of the condition's complexity and the need for medication stabilization, 24/7 monitoring, and intensive therapeutic intervention. At Rize OC, our clinical team includes specialists in psychotic disorders who provide comprehensive evaluation and highly individualized treatment plans.",
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
          callout="Schizophrenia affects approximately 1% of the world's population. With the right residential care, medication management, and therapeutic support, individuals can achieve significant symptom reduction and a meaningfully improved quality of life."
        />
      }
    />
  );
}
