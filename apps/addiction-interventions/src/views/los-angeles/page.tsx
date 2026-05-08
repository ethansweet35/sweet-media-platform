import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function LosAngelesPage() {
  const config = LOCATION_BY_SLUG.get("los-angeles")!;
  return <LocationLanding config={config} />;
}
