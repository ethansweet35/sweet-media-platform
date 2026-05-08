import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TheJohnsonModelInterventionPage from "@/views/the-johnson-model-intervention/page";

const fallbackMetadata: Metadata = {
  title: "The Johnson Model Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/intervention-types/johnson-model", fallbackMetadata);
}

export default function Page() {
  return <TheJohnsonModelInterventionPage />;
}
