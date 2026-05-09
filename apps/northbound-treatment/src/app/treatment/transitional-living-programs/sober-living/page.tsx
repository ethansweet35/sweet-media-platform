import type { Metadata } from "next";
import SoberLivingPage from "@/views/programs/sober-living/SoberLivingPage";

export const metadata: Metadata = {
  title: "Sober Living Homes in Orange County | Northbound Treatment Services",
  description:
    "Northbound helps place clients in vetted sober living homes across California and the country — bridging the gap between treatment and independent living with peer accountability and structure.",
  alternates: { canonical: '/treatment/transitional-living-programs/sober-living' },
};

export default function Page() {
  return <SoberLivingPage />;
}
