import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ProfessionalInterventionistArizonaPage from "@/views/professional-interventionist-arizona/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Arizona | Addiction Interventions",
  description: "Certified interventionists serving Arizona. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/professional-interventionist-arizona", fallbackMetadata);
}

export default function Page() {
  return <ProfessionalInterventionistArizonaPage />;
}
