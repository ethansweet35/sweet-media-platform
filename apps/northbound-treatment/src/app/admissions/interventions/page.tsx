import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionsPage from "@/views/admissions/interventions/InterventionsPage";

const fallback: Metadata = {
  title: "Addiction Intervention Services in Orange County | Northbound Treatment",
  description:
    "Northbound helps families plan and stage compassionate, professional addiction interventions in Orange County and throughout California — with a treatment bed ready when your loved one says yes.",
  alternates: { canonical: '/admissions/interventions' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/interventions", fallback);
}

export default function Page() {
  return <InterventionsPage />;
}
