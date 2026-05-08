import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CrisisInterventionsPage from "@/views/crisis-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Crisis Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/crisis-interventions", fallbackMetadata);
}

export default function Page() {
  return <CrisisInterventionsPage />;
}
