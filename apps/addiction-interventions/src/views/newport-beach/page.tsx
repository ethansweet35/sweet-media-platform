import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NewportBeachPage() {
  const config = LOCATION_BY_SLUG.get("ca-newport-beach")!;
  return <LocationLanding config={config} />;
}
