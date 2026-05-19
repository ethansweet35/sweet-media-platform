import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VeteransPage from "@/views/signature/veterans/VeteransPage";

const fallback: Metadata = {
  title: "VA Mental Health & Veterans Track Program",
  description:
    "Northbound's Veterans Track program provides specialized addiction and mental health treatment for veterans and active military personnel — PTSD, combat trauma, readjustment, and more. Tricare accepted.",
  alternates: { canonical: '/veterans-track-program' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/veterans-track-program", fallback);
}

export default function VeteransTrackPage() {
  return <VeteransPage />;
}
