import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Detox Treatment in California | Rize OC",
  description: "Safe, medical drug and alcohol detox in California. Insurance accepted. Private rooms, luxury accommodations, same-day admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Drug & Alcohol Detox Treatment In California"
      subheadline="Rize OC offers safe, medically-supervised drug and alcohol detox in California with private rooms, expert clinical care, and insurance verification in minutes. Call 24/7 for a confidential assessment."
      stat="Same Day"
      statLabel="Admissions Available"
    />
  );
}
