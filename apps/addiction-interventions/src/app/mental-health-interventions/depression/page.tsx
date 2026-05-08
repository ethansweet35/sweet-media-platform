import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DepressionPage from "@/views/depression/page";

const fallbackMetadata: Metadata = {
  title: "Depression Interventions for Families | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-interventions/depression", fallbackMetadata);
}

export default function Page() {
  return <DepressionPage />;
}
