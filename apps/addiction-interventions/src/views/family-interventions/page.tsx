import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function FamilyInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("family-interventions")!;
  return <ServiceLanding config={config} />;
}
