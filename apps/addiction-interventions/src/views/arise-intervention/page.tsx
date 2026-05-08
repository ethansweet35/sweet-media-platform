import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function AriseInterventionPage() {
  const config = SERVICE_BY_SLUG.get("arise-intervention")!;
  return <ServiceLanding config={config} />;
}
