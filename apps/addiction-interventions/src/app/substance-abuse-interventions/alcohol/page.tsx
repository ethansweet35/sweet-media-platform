import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlcoholAbuseInterventionsPage from "@/views/alcohol-abuse-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Alcohol Abuse Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/substance-abuse-interventions/alcohol", fallbackMetadata);
}

export default function Page() {
  return <AlcoholAbuseInterventionsPage />;
}
