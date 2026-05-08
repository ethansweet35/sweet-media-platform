import StatePageTemplate from "@/components/templates/StatePageTemplate";
import { STATE_PAGES } from "@/data/state-pages";

export default function DelawarePage() {
  return <StatePageTemplate config={STATE_PAGES["delaware"]} />;
}
