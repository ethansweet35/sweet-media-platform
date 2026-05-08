import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function FloridaPage() {
  const config = LOCATION_BY_SLUG.get("florida")!;
  return <LocationLanding config={config} />;
}
