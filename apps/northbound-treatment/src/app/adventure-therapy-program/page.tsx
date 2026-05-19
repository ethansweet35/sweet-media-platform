import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdventurePage from "@/views/signature/adventure/AdventurePage";

const fallback: Metadata = {
  title: "Adventure Therapy Program Services",
  description:
    "Northbound's Adventure Therapy Program takes healing into the world — building resilience, mindfulness, and purpose through nature, art, and experiential learning across Southern California.",
  alternates: { canonical: '/adventure-therapy-program' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adventure-therapy-program", fallback);
}

export default function Page() {
  return <AdventurePage />;
}
