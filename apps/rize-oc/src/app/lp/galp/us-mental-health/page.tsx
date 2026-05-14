import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";

export const metadata: Metadata = {
  title: "In-Person & Virtual Mental Health Treatment | Rize OC",
  description: "Inpatient and outpatient mental health treatment programs covered by your insurance when once-a-week therapy isn't enough. PHP, IOP, and virtual options.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="In-Person & Virtual Mental Health Treatment Services"
      subheadline="Inpatient and outpatient mental health treatment programs are covered by your insurance when once-a-week therapy isn't enough. Co-occurring disorders, personalized treatment plans, and comprehensive aftercare."
      eyebrow="5-Star Rated Facility · 1,000+ Treated"
      stat="100%"
      statLabel="Insurance Covered"
    />
  );
}
