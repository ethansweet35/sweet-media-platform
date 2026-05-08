import ConditionLanding from "@/components/templates/ConditionLanding";
import { CONDITION_BY_SLUG } from "@/data/conditions";

const config = CONDITION_BY_SLUG.get("anxiety")!;

export default function AnxietyPage() {
  return <ConditionLanding config={config} />;
}
