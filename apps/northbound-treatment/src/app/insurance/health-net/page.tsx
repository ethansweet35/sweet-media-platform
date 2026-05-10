import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HealthNetPage from "@/views/insurance/healthnet/HealthNetPage";

const fallback: Metadata = {
  title: "Health Net Insurance Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an in-network preferred provider with Health Net and MHN. Verify your Health Net coverage for detox, residential, PHP, and IOP addiction treatment in California.",
  alternates: { canonical: '/insurance/health-net' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/health-net", fallback);
}

export default function Page() {
  return <HealthNetPage />;
}
