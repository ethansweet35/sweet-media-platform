import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function LouisianaPage() {
  const config = LOCATION_BY_SLUG.get("louisiana")!;
  return <LocationLanding config={config} />;
}
