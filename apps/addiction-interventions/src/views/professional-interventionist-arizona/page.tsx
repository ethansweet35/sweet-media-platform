import LocationLanding from "@/components/templates/LocationLanding";
import { LOCATION_BY_SLUG } from "@/data/locations";

export default function ProfessionalInterventionistArizonaPage() {
  const config = LOCATION_BY_SLUG.get("professional-interventionist-arizona")!;
  return <LocationLanding config={config} />;
}
