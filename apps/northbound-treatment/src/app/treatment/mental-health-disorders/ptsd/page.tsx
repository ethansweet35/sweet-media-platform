import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PtsdPage from "@/views/dualdiagnosis/ptsd/PtsdPage";

const fallback: Metadata = {
  title: "PTSD & Addiction Treatment | Northbound Treatment",
  description:
    "Northbound Treatment offers integrated PTSD and addiction treatment — EMDR, trauma-focused CBT, residential care, and a dedicated Veterans Track. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/mental-health-disorders/ptsd" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/ptsd", fallback);
}

export default function Page() {
  return <PtsdPage />;
}
