import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function NewMexicoPage() {
  const config = LOCATION_BY_SLUG.get("new-mexico")!;
  return <LocationLanding config={config} />;
}
