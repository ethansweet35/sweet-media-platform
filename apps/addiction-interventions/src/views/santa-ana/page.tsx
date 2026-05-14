import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SantaAnaPage() {
  const config = LOCATION_BY_SLUG.get("ca-santa-ana")!;
  return <LocationLanding config={config} />;
}
