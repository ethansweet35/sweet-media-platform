import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function LongBeachPage() {
  const config = LOCATION_BY_SLUG.get("ca-long-beach")!;
  return <LocationLanding config={config} />;
}
