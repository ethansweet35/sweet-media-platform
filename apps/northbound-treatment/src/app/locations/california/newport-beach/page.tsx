import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewportBeachPage from "@/views/locations/NewportBeachPage";

const fallback: Metadata = {
  title: "Drug & Alcohol Rehab in Newport Beach, CA",
  description:
    "Northbound's Newport Beach campus — home to our partial hospitalization (PHP) program — on the Southern California coast, 42 miles from pristine Pacific beaches. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/newport-beach' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations/california/newport-beach", fallback);
}

export default function Page() {
  return <NewportBeachPage />;
}
