import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsPage from "@/views/admissions/page";

const fallbackMetadata: Metadata = {
  title: "Get Started | Addiction Interventions",
  description:
    "You don't need to have everything figured out. One call to a certified interventionist is all it takes to start. Free, confidential, no obligation.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions", fallbackMetadata);
}

export default function Page() {
  return <AdmissionsPage />;
}
