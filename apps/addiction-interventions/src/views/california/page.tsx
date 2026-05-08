import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function CaliforniaPage() {
  const config = LOCATION_BY_SLUG.get("california")!;
  return <LocationLanding config={config} />;
}
