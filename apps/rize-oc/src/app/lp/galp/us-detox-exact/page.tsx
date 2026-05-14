import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Detox | Rize OC",
  description: "Safe, medically-supervised drug and alcohol detox available now. Insurance accepted. Call 24/7 for a confidential assessment.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Safe, Medical Drug & Alcohol Detox Available Today"
      subheadline="Rize OC offers safe, medically-supervised detox and executive privacy in a premium coastal sanctuary. We accept most major insurances. Call 24/7 for a confidential assessment."
      eyebrow="1,000+ Patients Treated"
      stat="Same Day"
      statLabel="Admissions Available"
      showLocationOptions={false}
    />
  );
}
