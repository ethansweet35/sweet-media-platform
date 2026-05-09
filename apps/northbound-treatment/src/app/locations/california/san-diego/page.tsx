import type { Metadata } from "next";
import SanDiegoPage from "@/views/locations/SanDiegoPage";

export const metadata: Metadata = {
  title: "Drug Rehab in San Diego (La Jolla) | Northbound Treatment",
  description:
    "Northbound's La Jolla outpatient center offers PHP, IOP, and standard outpatient treatment in San Diego County — set among 7 miles of California coastline. Careerbound® career reintegration program. Telehealth available. Call (866) 311-0003.",
  alternates: { canonical: '/locations/california/san-diego' },
};

export default function Page() {
  return <SanDiegoPage />;
}
