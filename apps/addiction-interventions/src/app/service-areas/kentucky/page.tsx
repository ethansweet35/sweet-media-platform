import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import KentuckyPage from "@/views/kentucky/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Kentucky | Addiction Interventions",
  description:
    "Certified interventionists serving Kentucky. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/kentucky" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/kentucky", fallbackMetadata);
}

export default function Page() {
  return <KentuckyPage />;
}
