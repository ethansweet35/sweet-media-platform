import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MontanaPage from "@/views/montana/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Montana | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/montana", fallbackMetadata);
}

export default function Page() {
  return <MontanaPage />;
}
