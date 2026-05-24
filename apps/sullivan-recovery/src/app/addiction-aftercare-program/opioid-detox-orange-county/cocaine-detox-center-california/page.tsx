import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CocaineDetoxCenterCaliforniaPage from "@/views/cocaine-detox-center-california/page";

const fallbackMetadata: Metadata = {
  title: "Cocaine Detox Center California | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/cocaine-detox-center-california", fallbackMetadata);
}

export default function Page() {
  return <CocaineDetoxCenterCaliforniaPage />;
}
