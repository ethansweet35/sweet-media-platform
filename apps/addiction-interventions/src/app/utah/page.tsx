import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import UtahPage from "@/views/utah/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Utah | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/utah", fallbackMetadata);
}

export default function Page() {
  return <UtahPage />;
}
