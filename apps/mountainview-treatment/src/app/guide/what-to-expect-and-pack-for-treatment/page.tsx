import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PackingGuidePage from "@/views/guide/PackingGuidePage";

const fallback: Metadata = {
  title: "What to Expect and Pack for Treatment | Mountain View Treatment",
  description:
    "A practical checklist covering everything to bring, what not to bring, your daily schedule, phone policies, and how to prepare your family and employer before starting treatment.",
  alternates: { canonical: "/guide/what-to-expect-and-pack-for-treatment/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/guide/what-to-expect-and-pack-for-treatment/", fallback);
}

export default function Page() {
  return <PackingGuidePage />;
}
