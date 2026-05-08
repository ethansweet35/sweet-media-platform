import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MarylandPage from "@/views/maryland/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Maryland | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/maryland", fallbackMetadata);
}

export default function Page() {
  return <MarylandPage />;
}
