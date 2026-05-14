import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Rehab Accepting Cigna Insurance | Rize OC",
  description: "Utilizing evidence-based treatment methods through individual, group, and family therapy settings. Verify your Cigna benefits now — 100% confidential.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Drug & Alcohol Rehab Accepting Cigna Insurance"
      subheadline="Utilizing evidence-based treatment methods through individual, group, and family therapy settings. We work directly with Cigna to verify your benefits and maximize your coverage."
      eyebrow="1,000+ Successful Recoveries"
      stat="100%"
      statLabel="Confidential Verification"
    />
  );
}
