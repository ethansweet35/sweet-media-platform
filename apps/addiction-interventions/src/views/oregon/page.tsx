import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function OregonPage() {
  const config = LOCATION_BY_SLUG.get("oregon")!;
  return <LocationLanding config={config} />;
}
