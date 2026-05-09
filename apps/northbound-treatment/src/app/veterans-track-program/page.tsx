import type { Metadata } from "next";
import VeteransPage from "@/views/signature/veterans/VeteransPage";

export const metadata: Metadata = {
  title: "VA Mental Health & Veterans Track Program | Northbound Treatment",
  description:
    "Northbound's Veterans Track program provides specialized addiction and mental health treatment for veterans and active military personnel — PTSD, combat trauma, readjustment, and more. Tricare accepted.",
  alternates: { canonical: '/veterans-track-program' },
};

export default function VeteransTrackPage() {
  return <VeteransPage />;
}
