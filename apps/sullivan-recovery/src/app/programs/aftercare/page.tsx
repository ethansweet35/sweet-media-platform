import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/aftercare/page";

const fallbackMetadata: Metadata = {
  title: "Aftercare Programs | Sullivan Recovery",
  description:
    "Discharge planning, alumni support, and aftercare resources so recovery continues after detox and residential treatment in Mission Viejo.",
  alternates: { canonical: "/programs/aftercare/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/aftercare/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
