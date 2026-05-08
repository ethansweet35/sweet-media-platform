import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ConnecticutPage from "@/views/connecticut/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention Connecticut | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/connecticut", fallbackMetadata);
}

export default function Page() {
  return <ConnecticutPage />;
}
