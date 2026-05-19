import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MusicPage from "@/views/signature/music/MusicPage";

const fallback: Metadata = {
  title: "Music Therapy for Addiction Recovery",
  description:
    "Northbound's Music Recovery Program empowers clients to express, compose, and record their stories in recovery — with monthly professional studio sessions and real-world music outings. Available in Orange County, CA.",
  alternates: { canonical: '/treatment/music-program' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/music-program", fallback);
}

export default function MusicProgramPage() {
  return <MusicPage />;
}
