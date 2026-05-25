import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/stimulants/page";

const fallbackMetadata: Metadata = {
  title: "Stimulant Detox in Orange County | Sullivan Recovery",
  description:
    "Medical oversight for stimulant withdrawal — mood monitoring and residential care in Mission Viejo.",
  alternates: { canonical: "/programs/detox/stimulants/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/stimulants/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
