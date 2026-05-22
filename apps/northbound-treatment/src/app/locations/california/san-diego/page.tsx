import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SanDiegoPage from "@/views/locations/SanDiegoPage";

const fallback: Metadata = {
  title: "Drug Rehab in San Diego (La Jolla)",
  description:
    "Northbound's La Jolla office supports virtual IOP and regional outreach in San Diego County — set among 7 miles of California coastline. Detox and residential care are at Garden Grove; PHP is at Newport Beach. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/san-diego' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations/california/san-diego", fallback);
}

export default function Page() {
  return <SanDiegoPage />;
}
