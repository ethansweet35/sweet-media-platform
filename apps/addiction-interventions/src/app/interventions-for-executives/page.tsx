import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionsForExecutivesPage from "@/views/interventions-for-executives/page";

const fallbackMetadata: Metadata = {
  title: "Interventions For Executives | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/interventions-for-executives", fallbackMetadata);
}

export default function Page() {
  return <InterventionsForExecutivesPage />;
}
