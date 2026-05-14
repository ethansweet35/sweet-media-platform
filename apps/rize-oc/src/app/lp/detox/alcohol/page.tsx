import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Safe, Medical Alcohol Detox & Rehab | Rize OC",
  description: "Medically-supervised alcohol detox and rehab in Orange County. Insurance accepted. Private rooms, luxury accommodations, 24/7 admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Safe, Medical Alcohol Rehab Available Today"
      subheadline="Looking for an alcohol rehab program near you? Rize offers safe, medical detox and executive privacy in a premium coastal sanctuary. We accept most major insurances. Call 24/7 for a confidential assessment."
      eyebrow="5-Star Rated Alcohol Rehab · 140+ Reviews"
      stat="24/7"
      statLabel="Admissions Available"
    />
  );
}
