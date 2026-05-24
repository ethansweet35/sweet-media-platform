import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OrangeCountyMedicalDetoxPage from "@/views/orange-county-medical-detox/page";

const fallbackMetadata: Metadata = {
  title: "Orange County Medical Detox | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/orange-county-medical-detox", fallbackMetadata);
}

export default function Page() {
  return <OrangeCountyMedicalDetoxPage />;
}
