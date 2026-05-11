import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LosAngelesPage from "@/views/los-angeles/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Los Angeles | Addiction Interventions",
  description: "",
  alternates: { canonical: "/service-areas/los-angeles" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/los-angeles", fallbackMetadata);
}

export default function Page() {
  return <LosAngelesPage />;
}
