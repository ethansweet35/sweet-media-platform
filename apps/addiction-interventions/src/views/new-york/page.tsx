import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NewYorkPage() {
  const config = LOCATION_BY_SLUG.get("new-york")!;
  return <LocationLanding config={config} />;
}
