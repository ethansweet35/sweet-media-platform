import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/meth/page";

const fallbackMetadata: Metadata = {
  title: "Meth Detox in Mission Viejo | Sullivan Recovery",
  description:
    "Medical support for methamphetamine withdrawal — monitoring, therapy, and residential transition in Orange County.",
  alternates: { canonical: "/programs/detox/meth/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/meth/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
