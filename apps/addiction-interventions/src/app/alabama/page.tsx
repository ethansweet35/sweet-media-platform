import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlabamaPage from "@/views/alabama/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Alabama | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/alabama", fallbackMetadata);
}

export default function Page() {
  return <AlabamaPage />;
}
