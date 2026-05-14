import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function SacramentoPage() {
  const config = LOCATION_BY_SLUG.get("ca-sacramento")!;
  return <LocationLanding config={config} />;
}
