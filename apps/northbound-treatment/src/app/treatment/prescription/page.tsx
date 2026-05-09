import { type Metadata } from "next";
import PrescriptionPage from "@/views/substance/prescription/PrescriptionPage";

export const metadata: Metadata = {
  title: "Prescription Drug Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound provides expert prescription drug addiction treatment — opioids, benzodiazepines, stimulants. Medically supervised detox, residential, PHP, and IOP. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/prescription' },
};

export default function Page() {
  return <PrescriptionPage />;
}
