import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionGuidePage from "@/views/guide/InterventionGuidePage";

const fallback: Metadata = {
  title: "How to Stage an Intervention in Seattle | Mountain View Treatment",
  description:
    "Evidence-based intervention approaches, step-by-step preparation, what to say, how to respond to refusal, and professional interventionist resources in the Seattle area.",
  alternates: { canonical: "/guide/how-to-stage-an-intervention-in-seattle/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/how-to-stage-an-intervention-in-seattle/",
    fallback,
  );
}

export default function Page() {
  return <InterventionGuidePage />;
}
