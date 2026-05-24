import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LagunaBeachDetoxPage from "@/views/laguna-beach-detox/page";

const fallbackMetadata: Metadata = {
  title: "Laguna Beach Detox | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/laguna-beach-detox", fallbackMetadata);
}

export default function Page() {
  return <LagunaBeachDetoxPage />;
}
