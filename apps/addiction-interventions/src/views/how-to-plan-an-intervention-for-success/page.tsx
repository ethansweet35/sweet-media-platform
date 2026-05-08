import ResourceArticle from "@/components/templates/ResourceArticle";
import { RESOURCE_BY_SLUG } from "@/data/resources";

const config = RESOURCE_BY_SLUG.get("how-to-plan-an-intervention-for-success")!;

export default function HowToPlanAnInterventionForSuccessPage() {
  return <ResourceArticle config={config} />;
}
