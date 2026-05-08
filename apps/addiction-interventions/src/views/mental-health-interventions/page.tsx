import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function MentalHealthInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("mental-health-interventions")!;
  return <ServiceLanding config={config} />;
}
