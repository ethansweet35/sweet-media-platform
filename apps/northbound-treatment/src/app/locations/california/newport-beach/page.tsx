import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewportBeachPage from "@/views/locations/NewportBeachPage";

const fallback: Metadata = {
  title: "Drug & Alcohol Rehab in Newport Beach, CA",
  description:
    "Northbound's Newport Beach campus — 7 integrated buildings on the Southern California coast, 42 miles from pristine Pacific beaches. Co-ed residential treatment, medical detox, PHP, and virtual IOP. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/newport-beach' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations/california/newport-beach", fallback);
}

export default function Page() {
  return <NewportBeachPage />;
}
