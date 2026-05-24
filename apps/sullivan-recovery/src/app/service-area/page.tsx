import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServiceAreaPage from "@/views/service-area/page";

const fallbackMetadata: Metadata = {
  title: "Service Areas | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-area", fallbackMetadata);
}

export default function Page() {
  return <ServiceAreaPage />;
}
