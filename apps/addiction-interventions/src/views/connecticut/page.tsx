import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function ConnecticutPage() {
  const config = LOCATION_BY_SLUG.get("connecticut")!;
  return <LocationLanding config={config} />;
}
