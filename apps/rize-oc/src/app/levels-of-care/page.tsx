import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelsOfCarePage from "@/views/levels-of-care/index/page";

const fallback: Metadata = {
  title: "Levels of Care | Rize OC",
  description:
    "Explore every level of addiction and mental health treatment at Rize OC — from medical detox and residential to IOP, outpatient, and virtual programs.",
  alternates: { canonical: "/levels-of-care" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/levels-of-care", fallback);
}

export default function Page() {
  return <LevelsOfCarePage />;
}
