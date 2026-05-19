import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrescriptionPage from "@/views/substance/prescription/PrescriptionPage";

const fallback: Metadata = {
  title: "Prescription Drug Addiction Treatment Services",
  description:
    "Northbound provides expert prescription drug addiction treatment — opioids, benzodiazepines, stimulants. Medically supervised detox, residential, PHP, and IOP. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/prescription' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/prescription", fallback);
}

export default function Page() {
  return <PrescriptionPage />;
}
