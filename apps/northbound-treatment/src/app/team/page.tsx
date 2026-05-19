import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TeamPage from "@/views/team/TeamPage";

const fallbackMetadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the executive, medical, and leadership team behind Northbound Treatment. Our doctors, therapists, and clinical staff are passionately committed to lasting recovery.",
  alternates: { canonical: "/team" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/team", fallbackMetadata);
}

export default function Page() {
  return <TeamPage />;
}
