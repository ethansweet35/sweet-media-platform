import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FentanylDetoxNearMePage from "@/views/fentanyl-detox-near-me/page";

const fallbackMetadata: Metadata = {
  title: "Fentanyl Detox Near Me | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/fentanyl-detox-near-me", fallbackMetadata);
}

export default function Page() {
  return <FentanylDetoxNearMePage />;
}
