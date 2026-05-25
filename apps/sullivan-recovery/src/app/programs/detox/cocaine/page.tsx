import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/cocaine/page";

const fallbackMetadata: Metadata = {
  title: "Cocaine Detox in Orange County | Sullivan Recovery",
  description:
    "Medical stabilization for cocaine withdrawal — cravings, mood support, and residential treatment in Mission Viejo.",
  alternates: { canonical: "/programs/detox/cocaine/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/cocaine/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
