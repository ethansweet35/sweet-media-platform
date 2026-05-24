import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TraumaPage from "@/views/TraumaPage";

const fallback: Metadata = {
  title: "Trauma-Informed Care",
  description: "Trauma-informed intervention approaches for lasting healing.",
  alternates: { canonical: "/services/trauma" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services/trauma", fallback);
}

export default function Page() {
  return <TraumaPage />;
}
