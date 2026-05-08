import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DrugAbuseInterventionsPage from "@/views/drug-abuse-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Drug Abuse Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/substance-abuse-interventions/drug", fallbackMetadata);
}

export default function Page() {
  return <DrugAbuseInterventionsPage />;
}
