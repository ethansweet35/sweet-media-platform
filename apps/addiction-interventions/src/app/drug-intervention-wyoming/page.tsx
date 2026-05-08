import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DrugInterventionWyomingPage from "@/views/drug-intervention-wyoming/page";

const fallbackMetadata: Metadata = {
  title: "Drug Intervention Wyoming | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-intervention-wyoming", fallbackMetadata);
}

export default function Page() {
  return <DrugInterventionWyomingPage />;
}
