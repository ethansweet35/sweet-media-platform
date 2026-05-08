import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WashingtonPage from "@/views/washington/page";

const fallbackMetadata: Metadata = {
  title: "Washington | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/washington", fallbackMetadata);
}

export default function Page() {
  return <WashingtonPage />;
}
