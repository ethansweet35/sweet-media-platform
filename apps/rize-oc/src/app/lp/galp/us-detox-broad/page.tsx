import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Detox Centers | Rize OC",
  description: "Evidence-based drug and alcohol detox at a 5-star rated facility. Insurance accepted. Same-day admissions available.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Heal The Root Cause. Reclaim Your Life Today."
      subheadline="At Rize, we provide expert, compassionate treatment for addiction, mental health, and co-occurring disorders. Discover a personalized path to lasting recovery."
      eyebrow="5-Star Rated Detox & Rehab"
      stat="1,000+"
      statLabel="Successful Recoveries"
      showLocationOptions
    />
  );
}
