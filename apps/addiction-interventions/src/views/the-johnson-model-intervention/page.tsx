import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function TheJohnsonModelInterventionPage() {
  const config = SERVICE_BY_SLUG.get("the-johnson-model-intervention")!;
  return <ServiceLanding config={config} />;
}
