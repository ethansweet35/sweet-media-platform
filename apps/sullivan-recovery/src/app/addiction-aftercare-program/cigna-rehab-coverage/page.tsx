import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CignaRehabCoveragePage from "@/views/cigna-rehab-coverage/page";

const fallbackMetadata: Metadata = {
  title: "Cigna Rehab Coverage | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/cigna-rehab-coverage", fallbackMetadata);
}

export default function Page() {
  return <CignaRehabCoveragePage />;
}
