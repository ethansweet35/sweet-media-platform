import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlaskaPage from "@/views/alaska/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Alaska | Addiction Interventions",
  description:
    "Certified interventionists serving Alaska. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/alaska" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/alaska", fallbackMetadata);
}

export default function Page() {
  return <AlaskaPage />;
}
