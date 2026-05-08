import ResourceArticle from "@/components/templates/ResourceArticle";
import { RESOURCE_BY_SLUG } from "@/data/resources";

const config = RESOURCE_BY_SLUG.get("find-your-missing-loved-one")!;

export default function FindYourMissingLovedOnePage() {
  return <ResourceArticle config={config} />;
}
