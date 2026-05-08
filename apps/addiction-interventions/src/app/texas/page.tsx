import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TexasPage from "@/views/texas/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Texas | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/texas", fallbackMetadata);
}

export default function Page() {
  return <TexasPage />;
}
