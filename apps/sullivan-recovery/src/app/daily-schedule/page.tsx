import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DailySchedulePage from "@/views/daily-schedule/page";

const fallbackMetadata: Metadata = {
  title: "Daily Schedule | Sullivan Recovery",
  description:
    "See a typical day in medical detox and residential treatment at Sullivan Recovery — therapy, holistic programming, meals, and personal time in Mission Viejo.",
  alternates: { canonical: "/daily-schedule/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/daily-schedule/", fallbackMetadata);
}

export default function Page() {
  return <DailySchedulePage />;
}
