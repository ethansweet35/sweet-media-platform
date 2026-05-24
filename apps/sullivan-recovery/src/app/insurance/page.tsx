import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsurancePage from "@/views/insurance/page";

const fallbackMetadata: Metadata = {
  title: "Insurance | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance", fallbackMetadata);
}

export default function Page() {
  return <InsurancePage />;
}
