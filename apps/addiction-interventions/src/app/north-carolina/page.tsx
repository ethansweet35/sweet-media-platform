import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NorthCarolinaPage from "@/views/north-carolina/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions North Carolina | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/north-carolina", fallbackMetadata);
}

export default function Page() {
  return <NorthCarolinaPage />;
}
