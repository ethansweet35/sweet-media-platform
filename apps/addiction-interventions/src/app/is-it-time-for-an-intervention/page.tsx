import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IsItTimeForAnInterventionPage from "@/views/is-it-time-for-an-intervention/page";

const fallbackMetadata: Metadata = {
  title: "Is It Time For An Intervention? | Addiction Interventions",
  description:
    "Most families wait too long. Use this guide to honestly assess whether your loved one's situation has reached the point where a structured intervention is the right next step.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/is-it-time-for-an-intervention", fallbackMetadata);
}

export default function Page() {
  return <IsItTimeForAnInterventionPage />;
}
