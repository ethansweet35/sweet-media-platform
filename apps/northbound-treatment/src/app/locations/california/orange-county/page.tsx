import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OrangeCountyPage from "@/views/locations/OrangeCountyPage";

const fallback: Metadata = {
  title: "Drug Rehab in Orange County, CA | Northbound Treatment",
  description:
    "Northbound is a trusted drug rehab Orange County families rely on — medically supervised detox, residential treatment, PHP & outpatient care. In-network. Call (866) 311-0003.",
  alternates: { canonical: "/locations/california/orange-county" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations/california/orange-county", fallback);
}

export default function Page() {
  return <OrangeCountyPage />;
}
