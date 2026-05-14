import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function IrvinePage() {
  const config = LOCATION_BY_SLUG.get("ca-irvine")!;
  return <LocationLanding config={config} />;
}
