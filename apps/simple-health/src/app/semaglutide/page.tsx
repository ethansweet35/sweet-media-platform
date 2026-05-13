import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { SemaglutidePage } from "@/views/semaglutide/page";

const fallback: Metadata = {
  title: "Semaglutide for Weight Loss | Get Simple Health",
  description:
    "Semaglutide — the most studied GLP-1 medication for weight loss. ~15% average weight loss, proven cardiovascular protection. Starting at $270/month.",
  alternates: { canonical: "/semaglutide" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/semaglutide", fallback);
}

export default function Page() {
  return <SemaglutidePage />;
}
