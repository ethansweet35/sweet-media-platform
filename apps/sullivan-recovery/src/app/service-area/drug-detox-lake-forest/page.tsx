import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DrugDetoxLakeForestPage from "@/views/drug-detox-lake-forest/page";

const fallbackMetadata: Metadata = {
  title: "Drug Detox Lake Forest | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-detox-lake-forest", fallbackMetadata);
}

export default function Page() {
  return <DrugDetoxLakeForestPage />;
}
