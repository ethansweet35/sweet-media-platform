import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/orange-county/page";

const fallbackMetadata: Metadata = {
  title: "Orange County Detox Center | Sullivan Recovery",
  description:
    "Physician-led drug and alcohol detox in Mission Viejo — serving all of Orange County with 24/7 medical care.",
  alternates: { canonical: "/programs/detox/orange-county/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/orange-county/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
