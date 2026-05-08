import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CocaineInterventionPage from "@/views/cocaine-intervention/page";

const fallbackMetadata: Metadata = {
  title: "Cocaine Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-abuse-interventions/cocaine", fallbackMetadata);
}

export default function Page() {
  return <CocaineInterventionPage />;
}
