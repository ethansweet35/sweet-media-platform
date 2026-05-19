import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import EatingDisordersPage from "@/views/dualdiagnosis/eating/EatingDisordersPage";

const fallback: Metadata = {
  title: "Eating Disorder & Addiction Treatment",
  description:
    "Northbound Treatment offers integrated eating disorder and addiction treatment — anorexia, bulimia, binge eating, dual diagnosis, and nutritional recovery support. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/mental-health-disorders/eating-disorders" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/eating-disorders", fallback);
}

export default function Page() {
  return <EatingDisordersPage />;
}
