import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function InterventionsForTeensPage() {
  const config = SERVICE_BY_SLUG.get("interventions-for-teens")!;
  return <ServiceLanding config={config} />;
}
