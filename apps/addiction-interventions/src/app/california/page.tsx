import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CaliforniaPage from "@/views/california/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions California | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/california", fallbackMetadata);
}

export default function Page() {
  return <CaliforniaPage />;
}
