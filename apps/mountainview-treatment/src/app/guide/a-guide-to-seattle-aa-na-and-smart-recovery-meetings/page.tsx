import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MeetingsGuidePage from "@/views/guide/MeetingsGuidePage";

const fallback: Metadata = {
  title: "A Guide to Seattle AA, NA, and SMART Recovery Meetings | Mountain View Treatment",
  description:
    "Where to find peer support meetings across King County and greater Seattle — Alcoholics Anonymous, Narcotics Anonymous, SMART Recovery, and how to choose the right meeting format.",
  alternates: { canonical: "/guide/a-guide-to-seattle-aa-na-and-smart-recovery-meetings/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/a-guide-to-seattle-aa-na-and-smart-recovery-meetings/",
    fallback,
  );
}

export default function Page() {
  return <MeetingsGuidePage />;
}
