import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AriseInterventionPage from "@/views/arise-intervention/page";

const fallbackMetadata: Metadata = {
  title: "ARISE® Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/intervention-types/arise", fallbackMetadata);
}

export default function Page() {
  return <AriseInterventionPage />;
}
