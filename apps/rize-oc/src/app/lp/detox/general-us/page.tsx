import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Detox Centers | Rize OC",
  description: "Find safe, medical drug and alcohol detox near you. Insurance accepted. Luxury accommodations, 24/7 clinical care, same-day admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Find Safe Drug & Alcohol Detox Care Near You"
      subheadline="Rize OC offers medically-supervised detox with private rooms, luxury accommodations, and 24/7 clinical staff. We accept most major insurances and offer same-day admissions."
      eyebrow="1,000+ Successful Recoveries"
      stat="24/7"
      statLabel="Clinical Care Available"
    />
  );
}
