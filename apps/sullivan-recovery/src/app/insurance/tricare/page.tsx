import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/tricare/page";

const fallbackMetadata: Metadata = {
  title: "Tricare Rehab Coverage | Sullivan Recovery",
  description: "TRICARE substance use benefits verification for military families at Sullivan Recovery.",
  alternates: { canonical: "/insurance/tricare/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/tricare/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
