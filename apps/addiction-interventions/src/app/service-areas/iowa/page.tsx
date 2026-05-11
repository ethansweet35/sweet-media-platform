import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IowaPage from "@/views/iowa/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Iowa | Addiction Interventions",
  description:
    "Certified interventionists serving Iowa. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/iowa" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/iowa", fallbackMetadata);
}

export default function Page() {
  return <IowaPage />;
}
