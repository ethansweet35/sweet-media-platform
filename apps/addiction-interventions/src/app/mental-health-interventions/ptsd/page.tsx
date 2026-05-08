import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PtsdPage from "@/views/mental-health-interventions/ptsd/page";

const fallbackMetadata: Metadata = {
  title: "PTSD Interventions | Addiction Interventions",
  description:
    "PTSD and addiction are deeply intertwined. Our certified interventionists help families navigate both conditions and connect their loved one with trauma-informed, integrated care.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-interventions/ptsd", fallbackMetadata);
}

export default function Page() {
  return <PtsdPage />;
}
