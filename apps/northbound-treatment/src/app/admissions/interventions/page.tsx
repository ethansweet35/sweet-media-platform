import type { Metadata } from "next";
import InterventionsPage from "@/views/admissions/interventions/InterventionsPage";

export const metadata: Metadata = {
  title: "Addiction Intervention Services in Orange County | Northbound Treatment",
  description:
    "Northbound helps families plan and stage compassionate, professional addiction interventions in Orange County and throughout California — with a treatment bed ready when your loved one says yes.",
  alternates: { canonical: '/admissions/interventions' },
};

export default function Page() {
  return <InterventionsPage />;
}
