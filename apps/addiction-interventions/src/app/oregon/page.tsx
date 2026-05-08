import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OregonPage from "@/views/oregon/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Oregon | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/oregon", fallbackMetadata);
}

export default function Page() {
  return <OregonPage />;
}
