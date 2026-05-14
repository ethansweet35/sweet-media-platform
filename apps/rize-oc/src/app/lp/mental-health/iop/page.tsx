import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Mental Health Intensive Outpatient Program (IOP) | Rize OC",
  description: "Structured mental health IOP in Orange County. In-person or virtual, 3–5 days per week. Insurance accepted for anxiety, depression, trauma, and co-occurring disorders.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Mental Health Intensive Outpatient Program (IOP)"
      subheadline="Rize OC's mental health IOP provides structured, evidence-based treatment — 3 to 5 days per week — while you continue living at home. In-person in Orange County or fully virtual across California. Most insurance accepted."
      eyebrow="Mental Health IOP Specialists"
      stat="In-Person + Virtual"
      statLabel="Across California"
      conditionOverview={
        <LpConditionOverview
          eyebrow="What Is a Mental Health IOP?"
          headline="How Intensive Outpatient Programs Work — and Who They're Right For"
          paragraphs={[
            "An Intensive Outpatient Program (IOP) is a structured mental health treatment program that meets 3 to 5 times per week for several hours per session — providing significantly more therapeutic support than standard weekly therapy while allowing you to continue living at home and maintaining your daily responsibilities. IOP is one of the most clinically effective and accessible levels of mental health care available.",
            "Rize OC's mental health IOP includes individual therapy, group therapy, psychoeducation, and skills training — all designed to help you manage symptoms, build durable coping strategies, and prevent relapse or crisis. Our program is available both in-person in Orange County and virtually across California.",
          ]}
          listHeading="Who Our Mental Health IOP Is Designed For"
          listItems={[
            "Individuals stepping down from residential or PHP care",
            "Those with significant mental health symptoms who can safely live at home",
            "Working adults who need intensive support without a full-day commitment",
            "People who have not achieved results with standard weekly therapy",
            "Those managing co-occurring disorders in early recovery",
            "Individuals seeking virtual care without compromising on quality",
            "Anyone needing structured accountability and clinical oversight",
          ]}
          callout="IOP is not a compromise — it is often the most clinically appropriate and effective level of care for many individuals. Our program provides the therapeutic intensity of a residential experience while preserving your independence and connection to your daily life."
        />
      }
    />
  );
}
