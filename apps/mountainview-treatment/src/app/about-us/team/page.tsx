import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TeamPage from "@/views/team/TeamPage";

const fallbackMetadata: Metadata = {
  title:
    "Meet Our Team | Mountain View Treatment — Seattle Addiction & Mental Health",
  description:
    "Mountain View Treatment's clinicians, support specialists, and leadership team — multidisciplinary expertise in addiction, mental health, and dual diagnosis care in Seattle, WA.",
  alternates: { canonical: "/about-us/team/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about-us/team/", fallbackMetadata);
}

export default function Page() {
  return <TeamPage />;
}
