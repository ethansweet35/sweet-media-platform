import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NorthDakotaPage from "@/views/north-dakota/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions North Dakota | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/north-dakota", fallbackMetadata);
}

export default function Page() {
  return <NorthDakotaPage />;
}
