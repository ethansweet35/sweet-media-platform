import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrescriptionPage from "@/views/what-we-treat/PrescriptionPage";

const fallback: Metadata = {
  title: "Prescription Drug Addiction Treatment Seattle | Mountain View Treatment",
  description: "Outpatient treatment for prescription drug use disorder in Seattle, WA — opioid pain relievers, benzodiazepines, stimulants, and sleep medications. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/addiction/prescription/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/prescription/", fallback);
}

export default function Page() {
  return <PrescriptionPage />;
}
