import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GardenGrovePage from "@/views/locations/GardenGrovePage";

const fallback: Metadata = {
  title: "Drug & Alcohol Rehab in Garden Grove, CA | Northbound Treatment – The Grove",
  description:
    "Northbound's Garden Grove campus — known as The Grove — is our flagship residential and medical detox facility in Orange County. 38+ years of care, 24/7 support, 15+ insurance carriers accepted. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/garden-grove' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations/california/garden-grove", fallback);
}

export default function Page() {
  return <GardenGrovePage />;
}
