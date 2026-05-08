import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function AlcoholAbuseInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("alcohol-abuse-interventions")!;
  return <ServiceLanding config={config} />;
}
