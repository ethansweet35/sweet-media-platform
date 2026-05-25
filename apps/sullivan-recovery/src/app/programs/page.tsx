import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ProgramsPage from "@/views/programs/page";

const fallbackMetadata: Metadata = {
  title: "Treatment Programs | Detox & Residential | Sullivan Recovery",
  description:
    "Explore Sullivan Recovery programs in Mission Viejo: medical detox, residential treatment, therapies, aftercare, Wellbriety, and personalized care.",
  alternates: { canonical: "/programs/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/", fallbackMetadata);
}

export default function Page() {
  return <ProgramsPage />;
}
