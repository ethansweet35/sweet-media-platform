import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GeneralDetoxPage from "@/views/general-detox/page";

const fallbackMetadata: Metadata = {
  title: "General Detox Landing Page | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/general-detox", fallbackMetadata);
}

export default function Page() {
  return <GeneralDetoxPage />;
}
