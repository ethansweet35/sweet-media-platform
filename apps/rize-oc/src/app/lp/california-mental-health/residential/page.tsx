import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Residential Mental Health Treatment | Rize OC",
  description:
    "Top-rated residential mental health treatment in California. Private facility in Orange County, expert clinical team, 24/7 support. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Residential Mental Health Treatment Centers"
      subheadline="Rize OC provides premium residential mental health treatment for California residents in a private, home-like coastal Orange County setting. Multidisciplinary 24/7 care addressing root causes and lasting healing — with virtual step-down statewide."
      eyebrow="California Residential Mental Health Treatment"
      stat="24/7"
      statLabel="Clinical Support"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Residential Mental Health in California"
          headline="How Residential Care Differs from Outpatient — and When It's the Right Choice"
          paragraphs={[
            "Residential mental health treatment provides 24/7 structured care in a non-hospital, home-like environment. Unlike short-term crisis hospitalization, residential treatment supports longer-term therapeutic work addressing root causes — not just acute stabilization.",
            "At Rize OC, our California residential program offers a premium private setting with intensive individual therapy, group therapy, and holistic wellness. Removing clients from daily stressors creates optimal conditions for change — with coordinated virtual aftercare for clients returning home anywhere in California.",
          ]}
          listHeading="What Our California Residential Program Includes"
          listItems={[
            "24/7 clinical staff — licensed therapists, psychiatrists, and support personnel",
            "Private, home-like facility (not a hospital environment)",
            "Intensive individual therapy — 5+ sessions per week",
            "Group therapy, skills training, and psychoeducation",
            "Medication management and psychiatric oversight",
            "Holistic wellness programming — yoga, mindfulness, and nutrition",
            "Family therapy and family involvement throughout treatment",
            "Individualized discharge planning and aftercare coordination statewide",
          ]}
          callout="Residential treatment is indicated when outpatient therapy has been insufficient, safety is a concern, or symptoms require a structured immersive environment. California residents can start with a same-day assessment at Rize OC."
        />
      }
    />
  );
}
