import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SouthDakotaPage from "@/views/south-dakota/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions South Dakota | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/south-dakota", fallbackMetadata);
}

export default function Page() {
  return <SouthDakotaPage />;
}
