import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { TirzepatidePage } from "@/views/tirzepatide/page";

const fallback: Metadata = {
  title: "Tirzepatide for Weight Loss | Get Simple Health",
  description:
    "Tirzepatide — dual GLP-1 + GIP receptor activation. ~21% average weight loss, 57% of patients achieve 20%+ loss. Starting at $340/month.",
  alternates: { canonical: "/tirzepatide" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/tirzepatide", fallback);
}

export default function Page() {
  return <TirzepatidePage />;
}
