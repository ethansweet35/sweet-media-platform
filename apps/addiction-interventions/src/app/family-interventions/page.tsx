import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FamilyInterventionsPage from "@/views/family-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Family Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/family-interventions", fallbackMetadata);
}

export default function Page() {
  return <FamilyInterventionsPage />;
}
