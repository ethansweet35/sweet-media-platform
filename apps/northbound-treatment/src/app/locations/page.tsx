import { type Metadata } from "next";
import LocationsPage from "@/views/locations/LocationsPage";

export const metadata: Metadata = {
  title: "Northbound Treatment Locations | Southern California & Seattle Rehab Centers",
  description:
    "Northbound Treatment operates rehab centers in Newport Beach, Garden Grove, San Diego, and Seattle. Evidence-based addiction treatment in mindfully chosen environments across California and Washington.",
  alternates: { canonical: '/locations' },
};

export default function Page() {
  return <LocationsPage />;
}
