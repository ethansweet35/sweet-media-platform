import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BipolarPage from "@/views/mental-health-interventions/bipolar/page";

const fallbackMetadata: Metadata = {
  title: "Bipolar Disorder Interventions | Addiction Interventions",
  description:
    "Bipolar disorder's highs make the need for help nearly impossible to see — until the crash. Our certified interventionists help families act during the right window and connect their loved one with integrated psychiatric care.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-interventions/bipolar", fallbackMetadata);
}

export default function Page() {
  return <BipolarPage />;
}
