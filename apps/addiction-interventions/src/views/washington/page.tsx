import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function WashingtonPage() {
  const config = LOCATION_BY_SLUG.get("washington")!;
  return <LocationLanding config={config} />;
}
