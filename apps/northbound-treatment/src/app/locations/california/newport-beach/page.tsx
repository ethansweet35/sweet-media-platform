import type { Metadata } from "next";
import NewportBeachPage from "@/views/locations/NewportBeachPage";

export const metadata: Metadata = {
  title: "Drug & Alcohol Rehab in Newport Beach, CA | Northbound Treatment",
  description:
    "Northbound's Newport Beach campus — 7 integrated buildings on the Southern California coast, 42 miles from pristine Pacific beaches. Gender-specific residential treatment, medical detox, PHP, IOP & sober living. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/newport-beach' },
};

export default function Page() {
  return <NewportBeachPage />;
}
