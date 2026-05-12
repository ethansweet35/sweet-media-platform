import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TelehealthSchedulePage from "@/views/telehealth-schedule/TelehealthSchedulePage";

const fallback: Metadata = {
  title: "Telehealth Schedule | Online Group Therapy Sessions | Rize OC",
  description:
    "Live clinician-led telehealth group sessions every weekday — 9AM, 10AM, and 6PM. Topics include stress, self-sabotage, work-life balance, nutrition, and relationships. Enroll with Rize OC today.",
  alternates: { canonical: "/telehealth-schedule" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/telehealth-schedule", fallback);
}

export default TelehealthSchedulePage;
