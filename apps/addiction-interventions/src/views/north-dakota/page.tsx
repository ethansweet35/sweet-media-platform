import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NorthDakotaPage() {
  const config = LOCATION_BY_SLUG.get("north-dakota")!;
  return <LocationLanding config={config} />;
}
