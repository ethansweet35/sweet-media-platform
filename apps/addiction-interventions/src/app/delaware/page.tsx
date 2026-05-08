import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DelawarePage from "@/views/delaware/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Interventions Delaware | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/delaware", fallbackMetadata);
}

export default function Page() {
  return <DelawarePage />;
}
