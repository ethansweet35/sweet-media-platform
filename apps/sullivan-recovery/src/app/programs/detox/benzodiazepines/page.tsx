import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/benzodiazepines/page";

const fallbackMetadata: Metadata = {
  title: "Benzodiazepine Detox in Orange County | Sullivan Recovery",
  description:
    "Supervised benzodiazepine taper with 24/7 medical care to reduce seizure and rebound anxiety risk.",
  alternates: { canonical: "/programs/detox/benzodiazepines/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/benzodiazepines/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
