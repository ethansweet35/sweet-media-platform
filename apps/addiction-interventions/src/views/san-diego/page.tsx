import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SanDiegoPage() {
  const config = LOCATION_BY_SLUG.get("san-diego")!;
  return <LocationLanding config={config} />;
}
