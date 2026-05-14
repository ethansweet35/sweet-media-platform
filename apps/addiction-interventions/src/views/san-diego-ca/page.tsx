import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SanDiegoCaliforniaPage() {
  const config = LOCATION_BY_SLUG.get("ca-san-diego")!;
  return <LocationLanding config={config} />;
}
