import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/page";

const fallbackMetadata: Metadata = {
  title: "Medical Detox in Orange County | Sullivan Recovery",
  description:
    "Physician-led drug and alcohol detox in Mission Viejo — 24/7 monitoring, private rooms, same-day admission when appropriate, and a clear path into residential care.",
  alternates: { canonical: "/programs/detox/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
