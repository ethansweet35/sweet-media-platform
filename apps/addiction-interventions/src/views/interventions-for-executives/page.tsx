import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function InterventionsForExecutivesPage() {
  const config = SERVICE_BY_SLUG.get("interventions-for-executives")!;
  return <ServiceLanding config={config} />;
}
