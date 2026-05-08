import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DepressionInterventionsPage from "@/views/depression-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Depression Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/depression-interventions", fallbackMetadata);
}

export default function Page() {
  return <DepressionInterventionsPage />;
}
