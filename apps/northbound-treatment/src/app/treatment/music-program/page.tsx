import type { Metadata } from "next";
import MusicPage from "@/views/signature/music/MusicPage";

export const metadata: Metadata = {
  title: "Music Therapy for Addiction Recovery | Northbound Treatment",
  description:
    "Northbound's Music Recovery Program empowers clients to express, compose, and record their stories in recovery — with monthly professional studio sessions and real-world music outings. Available in Orange County, CA.",
  alternates: { canonical: '/treatment/music-program' },
};

export default function MusicProgramPage() {
  return <MusicPage />;
}
