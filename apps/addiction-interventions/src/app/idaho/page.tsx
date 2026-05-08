import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IdahoPage from "@/views/idaho/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention Idaho | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/idaho", fallbackMetadata);
}

export default function Page() {
  return <IdahoPage />;
}
