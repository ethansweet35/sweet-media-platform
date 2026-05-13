import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { RetatrutidePage } from "@/views/retatrutide/page";

const fallback: Metadata = {
  title: "Retatrutide — Next-Generation Weight Loss | Get Simple Health",
  description:
    "Retatrutide — the world's first triple incretin agonist (GLP-1 + GIP + Glucagon). Phase 2 data: 24.2% average weight loss, approaching bariatric surgery outcomes. Starting at $300/month.",
  alternates: { canonical: "/retatrutide" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/retatrutide", fallback);
}

export default function Page() {
  return <RetatrutidePage />;
}
