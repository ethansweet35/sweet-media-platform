import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function IdahoPage() {
  const config = LOCATION_BY_SLUG.get("idaho")!;
  return <LocationLanding config={config} />;
}
