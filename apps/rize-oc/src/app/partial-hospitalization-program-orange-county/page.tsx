import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PhpPage from "@/views/levels-of-care/php/page";

const fallback: Metadata = {
  title: "Partial Hospitalization Program (PHP) in Orange County | Rize OC",
  description:
    "PHP treatment in Orange County, CA. Six hours of intensive daily programming, evidence-based therapy, and psychiatric oversight at Rize OC's coastal sanctuary.",
  alternates: { canonical: "/partial-hospitalization-program-orange-county" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/partial-hospitalization-program-orange-county", fallback);
}

export default function Page() {
  return <PhpPage />;
}
