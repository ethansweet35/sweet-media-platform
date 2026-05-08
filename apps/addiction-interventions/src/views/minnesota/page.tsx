import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function MinnesotaPage() {
  const config = LOCATION_BY_SLUG.get("minnesota")!;
  return <LocationLanding config={config} />;
}
