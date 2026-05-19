import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpioidPage from "@/views/substance/opioid/OpioidPage";

const fallback: Metadata = {
  title: "Complete Opioid Addiction Treatment Services",
  description:
    "Northbound provides expert opioid and fentanyl addiction treatment in Orange County — medically supervised detox, MAT, residential, PHP, and IOP. 38+ years of experience. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/opioid' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/opioid", fallback);
}

export default function Page() {
  return <OpioidPage />;
}
