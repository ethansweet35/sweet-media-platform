import type { Metadata } from "next";
import AdderallPage from "@/views/substance/adderall/AdderallPage";

export const metadata: Metadata = {
  title: "Adderall Addiction Treatment & Rehab Center | Northbound Treatment",
  description:
    "Northbound's Adderall addiction treatment program provides medically supervised detox, dual-diagnosis care, and the full continuum of recovery — from residential through aftercare. Orange County, CA. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/adderall' },
};

export default function AdderallTreatmentPage() {
  return <AdderallPage />;
}
