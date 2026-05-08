import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function MontanaPage() {
  const config = LOCATION_BY_SLUG.get("montana")!;
  return <LocationLanding config={config} />;
}
