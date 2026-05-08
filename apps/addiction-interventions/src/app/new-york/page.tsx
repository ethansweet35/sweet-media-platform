import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewYorkPage from "@/views/new-york/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions New York | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/new-york", fallbackMetadata);
}

export default function Page() {
  return <NewYorkPage />;
}
