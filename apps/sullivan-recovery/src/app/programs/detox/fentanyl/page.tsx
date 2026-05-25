import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/fentanyl/page";

const fallbackMetadata: Metadata = {
  title: "Fentanyl Detox in Orange County | Sullivan Recovery",
  description:
    "Physician-led fentanyl detox with close nursing oversight and medication-assisted treatment in Mission Viejo.",
  alternates: { canonical: "/programs/detox/fentanyl/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/fentanyl/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
