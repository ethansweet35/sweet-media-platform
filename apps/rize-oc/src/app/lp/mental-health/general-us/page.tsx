import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Mental Health Treatment Center | Rize OC",
  description: "Evidence-based mental health treatment through individual, group, and family therapy. Licensed & accredited, insurance accepted, 24/7 admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Mental Health Treatment Center"
      subheadline="Utilizing evidence-based treatment methods through individual, group, and family therapy settings. We are proud to offer these services throughout the United States with both outpatient and virtual services designed to fit your lifestyle."
      eyebrow="1,000+ Successful Recoveries"
      stat="100%"
      statLabel="Virtual Options Available"
    />
  );
}
