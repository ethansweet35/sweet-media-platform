import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import StimulantsDetoxPage from "@/views/stimulants-detox/page";

const fallbackMetadata: Metadata = {
  title: "Stimulants Detox | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/stimulants-detox", fallbackMetadata);
}

export default function Page() {
  return <StimulantsDetoxPage />;
}
