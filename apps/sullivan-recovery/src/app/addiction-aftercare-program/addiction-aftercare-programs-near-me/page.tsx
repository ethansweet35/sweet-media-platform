import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionAftercareProgramsNearMePage from "@/views/addiction-aftercare-programs-near-me/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Aftercare Programs Near Me | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction-aftercare-programs-near-me", fallbackMetadata);
}

export default function Page() {
  return <AddictionAftercareProgramsNearMePage />;
}
