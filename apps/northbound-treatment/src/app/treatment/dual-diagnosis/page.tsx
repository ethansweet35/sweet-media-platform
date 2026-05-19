import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DualDiagnosisPage from "@/views/signature/dual-diagnosis/DualDiagnosisPage";

const fallback: Metadata = {
  title: "Dual Diagnosis Treatment Centers",
  description:
    "Northbound's integrated dual diagnosis treatment program addresses substance use and co-occurring mental health disorders simultaneously — because treating one without the other isn't enough. Orange County, CA.",
  alternates: { canonical: '/treatment/dual-diagnosis' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/dual-diagnosis", fallback);
}

export default function DualDiagnosisRoute() {
  return <DualDiagnosisPage />;
}
