import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Mental Health IOP | Rize OC",
  description:
    "Structured mental health IOP for California residents. In-person in Orange County or virtual statewide, 3–5 days per week. Insurance accepted for anxiety, depression, trauma, and dual diagnosis.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Mental Health Intensive Outpatient Program (IOP)"
      subheadline="Rize OC's mental health IOP provides structured, evidence-based treatment 3 to 5 days per week for California residents — in-person in Orange County or fully virtual across California. Most insurance accepted."
      eyebrow="California Mental Health IOP Specialists"
      stat="In-Person + Virtual"
      statLabel="Across California"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Mental Health IOP in California"
          headline="How Intensive Outpatient Programs Work — and Who They're Right For"
          paragraphs={[
            "An Intensive Outpatient Program (IOP) meets 3 to 5 times per week for several hours per session — significantly more support than weekly therapy while allowing you to live at home. IOP is one of the most effective and accessible levels of mental health care for California clients.",
            "Rize OC's California mental health IOP includes individual therapy, group therapy, psychoeducation, and skills training — in-person in Orange County or virtually statewide. We help you manage symptoms, build coping strategies, and prevent crisis.",
          ]}
          listHeading="Who Our California Mental Health IOP Is Designed For"
          listItems={[
            "Individuals stepping down from residential or PHP care",
            "Those with significant mental health symptoms who can safely live at home",
            "Working adults who need intensive support without a full-day commitment",
            "People who have not achieved results with standard weekly therapy",
            "Those managing co-occurring disorders in early recovery",
            "California residents seeking virtual care without compromising quality",
            "Anyone needing structured accountability and clinical oversight",
          ]}
          callout="IOP is often the most clinically appropriate level of care for California clients. Rize OC delivers therapeutic intensity while preserving your independence — with same-day assessments and insurance verification."
        />
      }
    />
  );
}
