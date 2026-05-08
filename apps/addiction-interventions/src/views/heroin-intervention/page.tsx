import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function HeroinInterventionPage() {
  const config = SERVICE_BY_SLUG.get("heroin-intervention")!;
  return <ServiceLanding config={config} />;
}
