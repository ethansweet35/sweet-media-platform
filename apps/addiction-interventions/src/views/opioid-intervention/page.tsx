import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function OpioidInterventionPage() {
  const config = SERVICE_BY_SLUG.get("opioid-intervention")!;
  return <ServiceLanding config={config} />;
}
