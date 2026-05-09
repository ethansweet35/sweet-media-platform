import type { Metadata } from "next";
import DualDiagnosisPage from "@/views/signature/dual-diagnosis/DualDiagnosisPage";

export const metadata: Metadata = {
  title: "Dual Diagnosis Treatment Centers | Northbound Treatment",
  description:
    "Northbound's integrated dual diagnosis treatment program addresses substance use and co-occurring mental health disorders simultaneously — because treating one without the other isn't enough. Orange County, CA.",
  alternates: { canonical: '/treatment/dual-diagnosis' },
};

export default function DualDiagnosisRoute() {
  return <DualDiagnosisPage />;
}
