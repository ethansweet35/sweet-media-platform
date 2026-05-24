import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InternationalPage from "@/views/InternationalPage";

const fallback: Metadata = {
  title: "International Services",
  description: "International intervention and sober transport coordination.",
  alternates: { canonical: "/service-areas/international" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/international", fallback);
}

export default function Page() {
  return <InternationalPage />;
}
