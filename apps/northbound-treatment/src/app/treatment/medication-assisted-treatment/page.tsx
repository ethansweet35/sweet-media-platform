import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MATPage from "@/views/substance/mat/MATPage";

const fallback: Metadata = {
  title: "Medication-Assisted Treatment (MAT) | Northbound Treatment",
  description:
    "Northbound Treatment integrates FDA-approved MAT — Suboxone, Vivitrol, methadone — with behavioral therapy for opioid and alcohol use disorder. Evidence-based, physician-supervised. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/medication-assisted-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/medication-assisted-treatment", fallback);
}

export default function Page() {
  return <MATPage />;
}
