import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HowToPlanAnInterventionForSuccessPage from "@/views/how-to-plan-an-intervention-for-success/page";

const fallbackMetadata: Metadata = {
  title: "How to Plan an Intervention for Success | Addiction Interventions",
  description:
    "A practical, step-by-step guide for families preparing to confront a loved one's addiction or mental health crisis. Built on more than two decades of front-line intervention experience.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/how-to-plan-an-intervention-for-success", fallbackMetadata);
}

export default function Page() {
  return <HowToPlanAnInterventionForSuccessPage />;
}
