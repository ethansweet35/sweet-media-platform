import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsurancePage from "@/views/insurance/page";

const fallbackMetadata: Metadata = {
  title: "Verify Insurance | Drug & Alcohol Rehab Coverage | Sullivan Recovery",
  description:
    "Free, confidential insurance verification for detox and residential treatment in Mission Viejo. We accept Aetna, Anthem, Cigna, Beacon, and PPO out-of-network plans.",
  alternates: { canonical: "/insurance/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/", fallbackMetadata);
}

export default function Page() {
  return <InsurancePage />;
}
