import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/therapies/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Therapies | Sullivan Recovery",
  description:
    "CBT, DBT, motivational interviewing, group and family therapy with licensed clinicians — integrated through detox and residential care.",
  alternates: { canonical: "/programs/therapies/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/therapies/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
