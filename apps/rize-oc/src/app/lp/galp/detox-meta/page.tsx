import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Compassionate, Insurance-Covered Treatment | Rize OC",
  description: "Private, dignified environment where expert clinical care meets comprehensive insurance coverage. Call to confirm your benefits and start today.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Compassionate, Insurance-Covered Treatment for Substance Use & Mental Health"
      subheadline="Finding the right help shouldn't be complicated or unaffordable. We offer a private, dignified environment where expert clinical care meets comprehensive insurance coverage. Reach out today to confirm your benefits."
      eyebrow="Top-Rated Private Detox & Rehab"
      stat="100%"
      statLabel="Confidential Assessment"
      showLocationOptions
    />
  );
}
