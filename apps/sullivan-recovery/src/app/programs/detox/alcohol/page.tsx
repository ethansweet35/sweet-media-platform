import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/alcohol/page";

const fallbackMetadata: Metadata = {
  title: "Alcohol Detox in Orange County | Sullivan Recovery",
  description:
    "Medically supervised alcohol detox in Mission Viejo — 24/7 monitoring, CIWA-guided care, and transition to residential treatment.",
  alternates: { canonical: "/programs/detox/alcohol/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/alcohol/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
