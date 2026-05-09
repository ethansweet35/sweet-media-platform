import { type Metadata } from "next";
import OpioidPage from "@/views/substance/opioid/OpioidPage";

export const metadata: Metadata = {
  title: "Complete Opioid Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound provides expert opioid and fentanyl addiction treatment in Orange County — medically supervised detox, MAT, residential, PHP, and IOP. 38+ years of experience. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/opioid' },
};

export default function Page() {
  return <OpioidPage />;
}
