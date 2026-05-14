import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SanFranciscoPage() {
  const config = LOCATION_BY_SLUG.get("ca-san-francisco")!;
  return <LocationLanding config={config} />;
}
