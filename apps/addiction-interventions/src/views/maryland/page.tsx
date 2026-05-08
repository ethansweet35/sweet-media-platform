import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function MarylandPage() {
  const config = LOCATION_BY_SLUG.get("maryland")!;
  return <LocationLanding config={config} />;
}
