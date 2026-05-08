import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OcdInterventionsPage from "@/views/ocd-interventions/page";

const fallbackMetadata: Metadata = {
  title: "OCD Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ocd-interventions", fallbackMetadata);
}

export default function Page() {
  return <OcdInterventionsPage />;
}
