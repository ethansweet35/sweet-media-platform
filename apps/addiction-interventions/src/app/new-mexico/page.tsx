import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewMexicoPage from "@/views/new-mexico/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions New Mexico | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/new-mexico", fallbackMetadata);
}

export default function Page() {
  return <NewMexicoPage />;
}
