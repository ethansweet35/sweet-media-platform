import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FloridaPage from "@/views/florida/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Florida | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/florida", fallbackMetadata);
}

export default function Page() {
  return <FloridaPage />;
}
