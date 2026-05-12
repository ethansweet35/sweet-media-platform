import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InPersonSchedulePage from "@/views/in-person-schedule/InPersonSchedulePage";

const fallback: Metadata = {
  title: "In-Person Group Schedule | Mental Health Program | Rize OC",
  description:
    "Daily in-person group therapy sessions at Rize OC — four concurrent group tracks covering stress, relationships, recovery skills, emotional regulation, and more. View the full weekly schedule.",
  alternates: { canonical: "/in-person-schedule" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/in-person-schedule", fallback);
}

export default InPersonSchedulePage;
