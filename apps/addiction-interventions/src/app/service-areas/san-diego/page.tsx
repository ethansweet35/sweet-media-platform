import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SanDiegoPage from "@/views/san-diego/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention San Diego | Addiction Interventions",
  description: "",
  alternates: { canonical: "/service-areas/san-diego" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/san-diego", fallbackMetadata);
}

export default function Page() {
  return <SanDiegoPage />;
}
