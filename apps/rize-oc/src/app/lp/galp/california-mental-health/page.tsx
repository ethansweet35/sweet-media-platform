import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";

export const metadata: Metadata = {
  title: "Top-Rated Mental Health Treatment in California | Rize OC",
  description: "In-person and virtual mental health treatment throughout California. PHP, IOP, outpatient — all covered by insurance. Same-day assessments available.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Top-Rated Mental Health Treatment In California"
      subheadline="We provide compassionate, evidence-based mental health care in California — serving both in-person and virtual clients with same-day assessments and insurance verification."
      eyebrow="California Mental Health Specialists"
      stat="24/7"
      statLabel="Admissions & Support"
    />
  );
}
