import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdderallPage from "@/views/substance/adderall/AdderallPage";

const fallback: Metadata = {
  title: "Adderall Addiction Treatment & Rehab Center",
  description:
    "Northbound's Adderall addiction treatment program provides medically supervised detox, dual-diagnosis care, and the full continuum of recovery — from residential through aftercare. Orange County, CA. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/adderall' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/adderall", fallback);
}

export default function AdderallTreatmentPage() {
  return <AdderallPage />;
}
