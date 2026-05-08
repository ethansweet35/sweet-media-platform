import StatePageTemplate from "@/components/templates/StatePageTemplate";
import { STATE_PAGES } from "@/data/state-pages";

export default function ColoradoPage() {
  return <StatePageTemplate config={STATE_PAGES["colorado"]} />;
}
