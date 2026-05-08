import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HeroinInterventionPage from "@/views/heroin-intervention/page";

const fallbackMetadata: Metadata = {
  title: "Heroin Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-abuse-interventions/heroin", fallbackMetadata);
}

export default function Page() {
  return <HeroinInterventionPage />;
}
