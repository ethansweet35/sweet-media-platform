import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LouisianaPage from "@/views/louisiana/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Louisiana | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/louisiana", fallbackMetadata);
}

export default function Page() {
  return <LouisianaPage />;
}
