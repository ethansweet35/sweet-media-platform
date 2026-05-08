import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NevadaPage from "@/views/nevada/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Nevada | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/nevada", fallbackMetadata);
}

export default function Page() {
  return <NevadaPage />;
}
