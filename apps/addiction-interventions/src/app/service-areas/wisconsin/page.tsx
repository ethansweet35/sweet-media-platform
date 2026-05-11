import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WisconsinPage from "@/views/wisconsin/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Wisconsin | Addiction Interventions",
  description:
    "Certified interventionists serving Wisconsin. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/wisconsin" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/wisconsin", fallbackMetadata);
}

export default function Page() {
  return <WisconsinPage />;
}
