import ConditionLanding from "@/components/templates/ConditionLanding";
import { CONDITION_BY_SLUG } from "@/data/conditions";

const config = CONDITION_BY_SLUG.get("depression")!;

export default function DepressionPage() {
  return <ConditionLanding config={config} />;
}
