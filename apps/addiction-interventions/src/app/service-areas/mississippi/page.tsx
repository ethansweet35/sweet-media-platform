import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MississippiPage from "@/views/mississippi/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Mississippi | Addiction Interventions",
  description:
    "Certified interventionists serving Mississippi. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/mississippi" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/mississippi", fallbackMetadata);
}

export default function Page() {
  return <MississippiPage />;
}
