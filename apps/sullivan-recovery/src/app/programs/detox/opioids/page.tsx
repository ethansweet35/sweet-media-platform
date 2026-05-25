import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/opioids/page";

const fallbackMetadata: Metadata = {
  title: "Opioid Detox in Orange County | Sullivan Recovery",
  description:
    "Medical opioid detox with MAT options, 24/7 nursing, and residential care on one Mission Viejo campus.",
  alternates: { canonical: "/programs/detox/opioids/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/opioids/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
