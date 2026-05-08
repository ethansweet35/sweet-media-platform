import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function UtahPage() {
  const config = LOCATION_BY_SLUG.get("utah")!;
  return <LocationLanding config={config} />;
}
