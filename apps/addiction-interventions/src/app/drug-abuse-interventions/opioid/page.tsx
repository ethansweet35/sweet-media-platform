import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpioidInterventionPage from "@/views/opioid-intervention/page";

const fallbackMetadata: Metadata = {
  title: "Opioid Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-abuse-interventions/opioid", fallbackMetadata);
}

export default function Page() {
  return <OpioidInterventionPage />;
}
