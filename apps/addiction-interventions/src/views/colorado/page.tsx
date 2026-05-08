import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function ColoradoPage() {
  const config = LOCATION_BY_SLUG.get("colorado")!;
  return <LocationLanding config={config} />;
}
