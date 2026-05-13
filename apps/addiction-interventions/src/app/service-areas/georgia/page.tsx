import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GeorgiaPage from "@/views/georgia/page";

const fallbackMetadata: Metadata = {
  title: "Georgia Addiction Intervention Services | Addiction Interventions",
  description:
    "Need addiction intervention services in Georgia? Addiction Interventions provides expert support and guidance. Find help for your loved one today. Learn more.",
  alternates: { canonical: "/service-areas/georgia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/georgia", fallbackMetadata);
}

export default function Page() {
  return <GeorgiaPage />;
}
