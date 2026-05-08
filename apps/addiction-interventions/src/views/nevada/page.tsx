import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NevadaPage() {
  const config = LOCATION_BY_SLUG.get("nevada")!;
  return <LocationLanding config={config} />;
}
