import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Inpatient Mental Health Treatment | Rize OC",
  description:
    "Top-rated inpatient mental health treatment in California. Private facility, 24/7 clinical support, expert psychiatrists. Most insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Inpatient Mental Health Treatment Centers"
      subheadline="When symptoms are severe or safety is a concern, Rize OC provides the highest level of mental health care for California residents — 24/7 inpatient treatment in a private, compassionate Orange County setting with virtual step-down options statewide."
      eyebrow="California Inpatient Mental Health Specialists"
      stat="24/7"
      statLabel="Psychiatric Oversight"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Inpatient Mental Health in California"
          headline="When Inpatient Care Is Needed — and What It Provides"
          paragraphs={[
            "Inpatient mental health treatment provides the highest level of structured care with 24/7 clinical oversight. It is indicated when symptoms are severe, safety is a concern, or intensive psychiatric intervention cannot be adequately provided in an outpatient setting.",
            "At Rize OC, our California inpatient program is delivered in a premium private facility staffed around the clock by licensed clinicians and psychiatric nurses. We treat mood disorders, psychotic disorders, trauma, and dual diagnosis — with personalized plans for California residents and coordinated virtual aftercare.",
          ]}
          listHeading="Clinical Indicators for Inpatient Treatment"
          listItems={[
            "Severe depressive episode with inability to function",
            "Active suicidal ideation, self-harm, or safety concerns",
            "Manic episode requiring stabilization and monitoring",
            "Psychotic symptoms requiring immediate psychiatric intervention",
            "Severe anxiety or panic preventing any daily functioning",
            "Acute trauma response or dissociative crisis",
            "Medication changes requiring close medical monitoring",
            "Failure of outpatient treatment to produce meaningful improvement",
          ]}
          callout="Inpatient care provides the intensive environment needed for serious symptom stabilization. Rize OC combines clinical excellence with a premium private setting for California clients — with same-day assessments and insurance verification."
        />
      }
    />
  );
}
