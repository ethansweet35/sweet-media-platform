import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpiritualTrackPage from "@/views/signature/spiritual/SpiritualTrackPage";

const fallback: Metadata = {
  title: "Spiritual Track | Sound Therapy, Breathwork, Meditation & Yoga",
  description:
    "Northbound's Spiritual Track at The Grove in Garden Grove integrates sound therapy, breathwork, meditation, and somatic yoga into residential and PHP care — supporting nervous-system regulation and lasting recovery.",
  alternates: { canonical: "/spiritual-track" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/spiritual-track", fallback);
}

export default function Page() {
  return <SpiritualTrackPage />;
}
