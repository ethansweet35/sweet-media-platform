import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ArkansasPage from "@/views/arkansas/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Arkansas | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/arkansas", fallbackMetadata);
}

export default function Page() {
  return <ArkansasPage />;
}
