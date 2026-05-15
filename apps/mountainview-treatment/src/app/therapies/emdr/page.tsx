import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import EmdrPage from "@/views/emdr/EmdrPage";

const fallbackMetadata: Metadata = {
  title: "EMDR Therapy in Seattle, WA | Mountain View Treatment",
  description:
    "Evidence-based EMDR therapy in Seattle for PTSD, complex trauma, anxiety, depression, and co-occurring substance use \u2014 delivered by EMDRIA-trained therapists at Mountain View Treatment.",
  alternates: { canonical: "/therapies/emdr/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/emdr/", fallbackMetadata);
}

export default function Page() {
  return <EmdrPage />;
}
