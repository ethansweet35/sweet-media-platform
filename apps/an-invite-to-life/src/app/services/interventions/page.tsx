import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionsPage from "@/views/InterventionsPage";

const fallback: Metadata = {
  title: "Intervention Services",
  description: "Expert-led intervention services to help families begin the recovery journey.",
  alternates: { canonical: "/services/interventions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services/interventions", fallback);
}

export default function Page() {
  return <InterventionsPage />;
}
