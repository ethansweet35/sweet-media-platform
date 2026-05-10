import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BeaconPage from "@/views/insurance/beacon/BeaconPage";

const fallback: Metadata = {
  title: "Beacon Health Options Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an accepted provider with Beacon Health Options (Carelon Behavioral Health). Verify your Beacon benefits for detox, residential, PHP, and IOP addiction treatment.",
  alternates: { canonical: '/insurance/beacon' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/beacon", fallback);
}

export default function Page() {
  return <BeaconPage />;
}
