import ResourceArticle from "@/components/templates/ResourceArticle";
import { RESOURCE_BY_SLUG } from "@/data/resources";

const config = RESOURCE_BY_SLUG.get("is-it-time-for-an-intervention")!;

export default function IsItTimeForAnInterventionPage() {
  return <ResourceArticle config={config} />;
}
