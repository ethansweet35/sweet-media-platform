import { type Metadata } from "next";
import BeaconPage from "@/views/insurance/beacon/BeaconPage";

export const metadata: Metadata = {
  title: "Beacon Health Options Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an accepted provider with Beacon Health Options (Carelon Behavioral Health). Verify your Beacon benefits for detox, residential, PHP, and IOP addiction treatment.",
};

export default function Page() {
  return <BeaconPage />;
}
