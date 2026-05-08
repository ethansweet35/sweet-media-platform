import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function OcdInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("ocd-interventions")!;
  return <ServiceLanding config={config} />;
}
