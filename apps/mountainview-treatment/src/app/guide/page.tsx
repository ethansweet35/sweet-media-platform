import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GuideIndexPage from "@/views/guide/GuideIndexPage";

const fallback: Metadata = {
  title: "Recovery Resource Library | Mountain View Treatment",
  description:
    "Clinician-reviewed guides covering detox, treatment preparation, sober living, insurance, dual diagnosis, family support, and more.",
  alternates: { canonical: "/guide/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/guide/", fallback);
}

export default function Page() {
  return <GuideIndexPage />;
}
