import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OklahomaPage from "@/views/oklahoma/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Oklahoma | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/oklahoma", fallbackMetadata);
}

export default function Page() {
  return <OklahomaPage />;
}
