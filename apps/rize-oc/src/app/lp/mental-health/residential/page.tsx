import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Residential Mental Health Treatment Centers | Rize OC",
  description: "Top-rated residential mental health treatment in Orange County. Private facility, expert clinical team, 24/7 support. Insurance accepted. Call for same-day assessment.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Residential Mental Health Treatment Centers"
      subheadline="Rize OC provides premium residential mental health treatment in a private, home-like coastal setting. Our multidisciplinary clinical team delivers intensive, individualized care 24/7 — addressing the root causes of mental health conditions and creating lasting healing."
      eyebrow="Residential Mental Health Treatment"
      stat="24/7"
      statLabel="Clinical Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="What Is Residential Mental Health Treatment?"
          headline="How Residential Care Differs from Outpatient — and When It's the Right Choice"
          paragraphs={[
            "Residential mental health treatment provides 24/7 structured care in a non-hospital, home-like environment. Unlike inpatient psychiatric hospitalization — which is typically short-term and crisis-focused — residential treatment is designed for longer-term, sustained therapeutic work that addresses the root causes of mental health conditions rather than just stabilizing acute symptoms.",
            "At Rize OC, our residential program provides a premium, private setting where clients engage in intensive individual therapy, group therapy, and holistic wellness practices in an immersive, supported environment. Removing clients from daily stressors and environmental triggers creates the optimal conditions for meaningful, lasting change.",
          ]}
          listHeading="What Our Residential Program Includes"
          listItems={[
            "24/7 clinical staff — licensed therapists, psychiatrists, and support personnel",
            "Private, home-like facility (not a hospital environment)",
            "Intensive individual therapy — 5+ sessions per week",
            "Group therapy, skills training, and psychoeducation",
            "Medication management and psychiatric oversight",
            "Holistic wellness programming — yoga, mindfulness, and nutrition",
            "Family therapy and family involvement throughout treatment",
            "Individualized discharge planning and aftercare coordination",
          ]}
          callout="Residential mental health treatment is clinically indicated when outpatient therapy has been insufficient, when safety is a concern, or when the intensity of symptoms requires a structured, immersive environment for true stabilization and healing."
        />
      }
    />
  );
}
