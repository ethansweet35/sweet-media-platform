import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/suboxone/page";

const fallbackMetadata: Metadata = {
  title: "Suboxone Detox & Taper | Sullivan Recovery",
  description:
    "Physician-guided Suboxone taper with support for underlying opioid dependence in Mission Viejo.",
  alternates: { canonical: "/programs/detox/suboxone/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/suboxone/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
