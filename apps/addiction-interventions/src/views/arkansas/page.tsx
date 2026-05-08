import StatePageTemplate from "@/components/templates/StatePageTemplate";
import { STATE_PAGES } from "@/data/state-pages";

export default function ArkansasPage() {
  return <StatePageTemplate config={STATE_PAGES["arkansas"]} />;
}
