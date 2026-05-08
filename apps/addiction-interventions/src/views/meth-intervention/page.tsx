import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function MethInterventionPage() {
  const config = SERVICE_BY_SLUG.get("meth-intervention")!;
  return <ServiceLanding config={config} />;
}
