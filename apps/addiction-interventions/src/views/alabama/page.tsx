import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function AlabamaPage() {
  const config = LOCATION_BY_SLUG.get("alabama")!;
  return <LocationLanding config={config} />;
}
