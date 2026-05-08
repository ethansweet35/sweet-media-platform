import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function DualDiagnosisInterventionsPage() {
  const config = SERVICE_BY_SLUG.get("dual-diagnosis-interventions")!;
  return <ServiceLanding config={config} />;
}
