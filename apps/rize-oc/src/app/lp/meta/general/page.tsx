import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Mental Health & Addiction Treatment | Rize OC",
  description: "Heal the root cause. Expert, compassionate treatment for addiction and mental health at Rize OC. Insurance accepted. 24/7 admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Heal The Root Cause. Reclaim Your Life Today."
      subheadline="At Rize, we provide expert, compassionate treatment for addiction, mental health, and co-occurring disorders. Discover a personalized path to lasting recovery."
      eyebrow="1,000+ Successful Recoveries"
      stat="1,000+"
      statLabel="Patients Helped"
    />
  );
}
