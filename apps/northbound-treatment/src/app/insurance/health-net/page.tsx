import { type Metadata } from "next";
import HealthNetPage from "@/views/insurance/healthnet/HealthNetPage";

export const metadata: Metadata = {
  title: "Health Net Insurance Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an in-network preferred provider with Health Net and MHN. Verify your Health Net coverage for detox, residential, PHP, and IOP addiction treatment in California.",
  alternates: { canonical: '/insurance/health-net' },
};

export default function Page() {
  return <HealthNetPage />;
}
