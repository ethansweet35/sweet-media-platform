import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function CocaineInterventionPage() {
  const config = SERVICE_BY_SLUG.get("cocaine-intervention")!;
  return <ServiceLanding config={config} />;
}
