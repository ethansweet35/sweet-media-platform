import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function OklahomaPage() {
  const config = LOCATION_BY_SLUG.get("oklahoma")!;
  return <LocationLanding config={config} />;
}
