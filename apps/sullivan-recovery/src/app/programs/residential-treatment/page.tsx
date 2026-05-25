import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/residential-treatment/page";

const fallbackMetadata: Metadata = {
  title: "Residential Treatment in Orange County | Sullivan Recovery",
  description:
    "Structured residential addiction treatment in Mission Viejo — daily therapy, private rooms, holistic programming, and detox-to-residential care on one campus.",
  alternates: { canonical: "/programs/residential-treatment/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/residential-treatment/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
