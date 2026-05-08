import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function DrugInterventionWyomingPage() {
  const config = LOCATION_BY_SLUG.get("drug-intervention-wyoming")!;
  return <LocationLanding config={config} />;
}
