import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Inpatient Mental Health Treatment Centers | Rize OC",
  description: "Top-rated inpatient mental health treatment in Orange County. Private facility, 24/7 clinical support, expert psychiatrists. Most insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Inpatient Mental Health Treatment Centers"
      subheadline="When symptoms are severe or safety is a concern, Rize OC provides the highest level of mental health care — 24/7 inpatient treatment in a private, compassionate setting. Expert psychiatric care, evidence-based therapy, and full insurance verification."
      eyebrow="Inpatient Mental Health Specialists"
      stat="24/7"
      statLabel="Psychiatric Oversight"
      conditionOverview={
        <LpConditionOverview
          eyebrow="What Is Inpatient Mental Health Treatment?"
          headline="When Inpatient Care Is Needed — and What It Provides"
          paragraphs={[
            "Inpatient mental health treatment provides the highest level of structured care — with 24/7 clinical oversight in a dedicated treatment facility. It is clinically indicated when mental health symptoms are severe enough to require continuous monitoring, when safety is a primary concern, or when intensive medical and psychiatric intervention cannot be adequately provided in an outpatient setting.",
            "At Rize OC, our inpatient program is delivered in a premium, private facility staffed around the clock by licensed clinicians, psychiatric nurses, and support staff. We treat a wide range of serious mental health conditions — including mood disorders, psychotic disorders, trauma, and dual diagnosis — with personalized, evidence-based treatment plans tailored to each individual.",
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
          callout="Inpatient mental health care provides the intensive, structured environment needed for serious symptom stabilization. At Rize OC, we combine clinical excellence with a premium, private setting — ensuring both your safety and your comfort throughout your treatment."
        />
      }
    />
  );
}
