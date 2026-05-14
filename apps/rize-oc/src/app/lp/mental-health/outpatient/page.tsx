import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Outpatient Mental Health Treatment Centers | Rize OC",
  description: "Flexible outpatient mental health treatment in Orange County. PHP, IOP, and standard outpatient programs with insurance coverage. In-person and virtual.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Outpatient Mental Health Treatment Centers"
      subheadline="Rize OC's outpatient mental health programs — including PHP, IOP, and standard outpatient — provide structured, evidence-based care while you continue living at home. In-person in Orange County or fully virtual across California."
      eyebrow="Outpatient Mental Health Programs"
      stat="PHP · IOP · OP"
      statLabel="Levels of Care"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Outpatient Mental Health Care"
          headline="What Outpatient Mental Health Treatment Provides — and Who It's Right For"
          paragraphs={[
            "Outpatient mental health treatment provides structured therapeutic support while allowing you to continue living at home and maintaining your daily responsibilities. It represents one of the most flexible and accessible levels of care — ranging from standard weekly therapy to intensive programs like PHP (5–6 hours/day) and IOP (9–15 hours/week).",
            "At Rize OC, our continuum of outpatient programs is designed to meet you wherever you are in your recovery journey. Whether you're stepping down from residential care, managing a new diagnosis, or seeking more intensive support than individual therapy provides, we have an evidence-based program matched to your clinical needs.",
          ]}
          listHeading="What Our Outpatient Programs Include"
          listItems={[
            "Individual, group, and family therapy sessions",
            "Flexible scheduling available for working adults",
            "In-person in Orange County or fully virtual (California-wide)",
            "Step-down care from residential or inpatient programs",
            "Most major insurance plans accepted and verified",
            "Evidence-based modalities — CBT, DBT, EMDR, and more",
            "Medication management and psychiatric oversight",
            "Aftercare planning and alumni support",
          ]}
          callout="Outpatient mental health treatment is most effective when matched to the right level of care. Our clinical team conducts a comprehensive assessment to recommend the exact program — PHP, IOP, or standard outpatient — that best aligns with your clinical needs and life circumstances."
        />
      }
    />
  );
}
