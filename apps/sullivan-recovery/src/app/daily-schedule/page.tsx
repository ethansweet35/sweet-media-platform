import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DailySchedulePage from "@/views/daily-schedule/page";

const fallbackMetadata: Metadata = {
  title: "Daily Schedule | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/daily-schedule", fallbackMetadata);
}

export default function Page() {
  return <DailySchedulePage />;
}
