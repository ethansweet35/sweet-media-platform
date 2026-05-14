import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Mental Health Treatment Center in California | Rize OC",
  description: "Evidence-based mental health treatment throughout California. In-person and virtual options. Insurance accepted, same-day assessments available.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Mental Health Treatment Center In California"
      subheadline="At Rize, we understand that seeking mental health treatment can be a significant step. We've created a welcoming environment where you can feel comfortable on your journey to healing. Outpatient and virtual services designed to fit your lifestyle."
      eyebrow="California Mental Health Center"
      stat="Same Day"
      statLabel="Assessments Available"
    />
  );
}
