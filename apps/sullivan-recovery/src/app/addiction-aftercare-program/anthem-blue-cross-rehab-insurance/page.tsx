import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnthemBlueCrossRehabInsurancePage from "@/views/anthem-blue-cross-rehab-insurance/page";

const fallbackMetadata: Metadata = {
  title: "Anthem Blue Cross Rehab Insurance | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/anthem-blue-cross-rehab-insurance", fallbackMetadata);
}

export default function Page() {
  return <AnthemBlueCrossRehabInsurancePage />;
}
