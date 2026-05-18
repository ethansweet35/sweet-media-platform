import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxGuidePage from "@/views/guide/DetoxGuidePage";

const fallback: Metadata = {
  title: "The Complete Guide to Drug and Alcohol Detox | Mountain View Treatment",
  description:
    "Everything you need to know about medically supervised detox — what it involves, why it's essential, how long it takes, and how to access safe detox in Seattle.",
  alternates: { canonical: "/guide/the-complete-guide-to-drug-and-alcohol-detox/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
    fallback,
  );
}

export default function Page() {
  return <DetoxGuidePage />;
}
