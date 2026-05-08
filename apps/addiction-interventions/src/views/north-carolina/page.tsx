import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NorthCarolinaPage() {
  const config = LOCATION_BY_SLUG.get("north-carolina")!;
  return <LocationLanding config={config} />;
}
