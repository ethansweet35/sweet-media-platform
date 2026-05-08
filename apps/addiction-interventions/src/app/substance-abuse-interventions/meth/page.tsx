import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MethInterventionPage from "@/views/meth-intervention/page";

const fallbackMetadata: Metadata = {
  title: "Meth Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/substance-abuse-interventions/meth", fallbackMetadata);
}

export default function Page() {
  return <MethInterventionPage />;
}
