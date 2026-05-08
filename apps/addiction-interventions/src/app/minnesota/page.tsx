import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MinnesotaPage from "@/views/minnesota/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Minnesota | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/minnesota", fallbackMetadata);
}

export default function Page() {
  return <MinnesotaPage />;
}
