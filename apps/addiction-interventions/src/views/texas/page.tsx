import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function TexasPage() {
  const config = LOCATION_BY_SLUG.get("texas")!;
  return <LocationLanding config={config} />;
}
