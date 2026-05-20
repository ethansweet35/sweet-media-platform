import type { Metadata } from "next";
import LpTemplatePage from "@/views/lp/LpTemplatePage";

export const metadata: Metadata = {
  title: "Mental Health Treatment Center in California | Rize OC",
  description:
    "Evidence-based mental health treatment throughout California. Individual, group, and family therapy. In-person in Orange County, virtual statewide. Licensed, accredited, insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpTemplatePage
      headline="Mental Health Treatment Center in California"
      subheadline="Evidence-based mental health treatment through individual, group, and family therapy — serving California residents with in-person care in Orange County and flexible virtual programs designed to fit your lifestyle statewide."
      eyebrow="California Mental Health Treatment"
      stat="100%"
      statLabel="Virtual Options Across CA"
    />
  );
}
