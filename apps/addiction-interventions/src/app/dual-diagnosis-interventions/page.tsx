import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DualDiagnosisInterventionsPage from "@/views/dual-diagnosis-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Dual Diagnosis Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/dual-diagnosis-interventions", fallbackMetadata);
}

export default function Page() {
  return <DualDiagnosisInterventionsPage />;
}
