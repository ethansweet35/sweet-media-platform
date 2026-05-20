import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Outpatient Mental Health Treatment | Rize OC",
  description:
    "Flexible outpatient mental health treatment in California. PHP, IOP, and standard outpatient with insurance coverage. In-person in Orange County, virtual statewide.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Outpatient Mental Health Treatment Centers"
      subheadline="Rize OC's outpatient mental health programs — PHP, IOP, and standard outpatient — provide structured, evidence-based care for California residents while you live at home. In-person in Orange County or fully virtual across California."
      eyebrow="California Outpatient Mental Health Programs"
      stat="PHP · IOP · OP"
      statLabel="Levels of Care"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Outpatient Mental Health in California"
          headline="What Outpatient Mental Health Treatment Provides — and Who It's Right For"
          paragraphs={[
            "Outpatient mental health treatment provides structured therapeutic support while you continue living at home — from standard weekly therapy to intensive PHP (5–6 hours/day) and IOP (9–15 hours/week). It is one of the most flexible levels of care for California clients.",
            "Rize OC's California outpatient continuum meets you wherever you are in recovery — stepping down from residential care, managing a new diagnosis, or seeking more support than weekly therapy. Programs are available in-person in Orange County and virtually statewide.",
          ]}
          listHeading="What Our California Outpatient Programs Include"
          listItems={[
            "Individual, group, and family therapy sessions",
            "Flexible scheduling available for working adults",
            "In-person in Orange County or fully virtual across California",
            "Step-down care from residential or inpatient programs",
            "Most major insurance plans accepted and verified",
            "Evidence-based modalities — CBT, DBT, EMDR, and more",
            "Medication management and psychiatric oversight",
            "Aftercare planning and alumni support",
          ]}
          callout="Outpatient treatment works best when matched to the right level of care. Our California clinical team recommends PHP, IOP, or standard outpatient based on your clinical needs — with free insurance verification and same-day assessments."
        />
      }
    />
  );
}
