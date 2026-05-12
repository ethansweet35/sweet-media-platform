import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionPage from "@/views/what-we-treat/AddictionPage";

const fallback: Metadata = {
  title: "Addiction Treatment in Orange County | Rize OC",
  description:
    "Evidence-based addiction treatment for alcohol, opioids, benzodiazepines, stimulants, and polysubstance use. Medically supervised detox, MAT, and integrated dual-diagnosis care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/addiction" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction", fallback);
}

export default function Page() {
  return <AddictionPage />;
}
