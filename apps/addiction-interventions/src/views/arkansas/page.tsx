import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function ArkansasPage() {
  const config = LOCATION_BY_SLUG.get("arkansas")!;
  return <LocationLanding config={config} />;
}
