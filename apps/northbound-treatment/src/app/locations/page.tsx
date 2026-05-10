import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LocationsPage from "@/views/locations/LocationsPage";

const fallback: Metadata = {
  title: "Northbound Treatment Locations | Southern California & Seattle Rehab Centers",
  description:
    "Northbound Treatment operates rehab centers in Newport Beach, Garden Grove, San Diego, and Seattle. Evidence-based addiction treatment in mindfully chosen environments across California and Washington.",
  alternates: { canonical: '/locations' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/locations", fallback);
}

export default function Page() {
  return <LocationsPage />;
}
