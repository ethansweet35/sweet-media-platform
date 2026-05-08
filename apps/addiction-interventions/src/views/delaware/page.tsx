import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function DelawarePage() {
  const config = LOCATION_BY_SLUG.get("delaware")!;
  return <LocationLanding config={config} />;
}
