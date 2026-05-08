import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function CrisisInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("crisis-interventions")!;
  return <ServiceLanding config={config} />;
}
