import ServiceLanding from "@/components/templates/ServiceLanding";
import { SERVICE_BY_SLUG } from "@/data/services";

export default function KetamineAddictionPage() {
  const config = SERVICE_BY_SLUG.get("ketamine-addiction")!;
  return <ServiceLanding config={config} />;
}
