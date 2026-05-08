import ConditionLanding from "@/components/templates/ConditionLanding";
import { CONDITION_BY_SLUG } from "@/data/conditions";

const config = CONDITION_BY_SLUG.get("self-medicating")!;

export default function SelfMedicatingPage() {
  return <ConditionLanding config={config} />;
}
