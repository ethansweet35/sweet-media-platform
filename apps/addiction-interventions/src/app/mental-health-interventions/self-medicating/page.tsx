import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SelfMedicatingPage from "@/views/self-medicating/page";

const fallbackMetadata: Metadata = {
  title: "Self-Medicating Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-interventions/self-medicating", fallbackMetadata);
}

export default function Page() {
  return <SelfMedicatingPage />;
}
