import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SouthDakotaPage() {
  const config = LOCATION_BY_SLUG.get("south-dakota")!;
  return <LocationLanding config={config} />;
}
