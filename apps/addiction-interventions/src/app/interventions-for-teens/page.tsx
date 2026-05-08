import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionsForTeensPage from "@/views/interventions-for-teens/page";

const fallbackMetadata: Metadata = {
  title: "Interventions for Teens | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/interventions-for-teens", fallbackMetadata);
}

export default function Page() {
  return <InterventionsForTeensPage />;
}
