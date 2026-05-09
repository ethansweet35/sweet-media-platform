import type { Metadata } from "next";
import GardenGrovePage from "@/views/locations/GardenGrovePage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Rehab in Garden Grove, CA | Northbound Treatment – The Grove",
  description:
    "Northbound's Garden Grove campus — known as The Grove — is our flagship residential and medical detox facility in Orange County. 38+ years of care, 24/7 support, 15+ insurance carriers accepted. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/garden-grove' },
};

export default function Page() {
  return <GardenGrovePage />;
}
