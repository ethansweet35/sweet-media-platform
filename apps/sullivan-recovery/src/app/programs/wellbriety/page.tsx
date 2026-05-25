import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/wellbriety/page";

const fallbackMetadata: Metadata = {
  title: "Wellbriety Program | Sullivan Recovery",
  description:
    "Culturally grounded Wellbriety recovery integrated with medical detox, residential treatment, and clinical therapies in Mission Viejo.",
  alternates: { canonical: "/programs/wellbriety/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/wellbriety/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
