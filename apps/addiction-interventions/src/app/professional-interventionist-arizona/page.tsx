import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ProfessionalInterventionistArizonaPage from "@/views/professional-interventionist-arizona/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Arizona | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/professional-interventionist-arizona", fallbackMetadata);
}

export default function Page() {
  return <ProfessionalInterventionistArizonaPage />;
}
