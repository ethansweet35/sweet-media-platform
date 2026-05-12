import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IopPage from "@/views/levels-of-care/iop/page";

const fallback: Metadata = {
  title: "Intensive Outpatient Program (IOP) in Orange County | Rize OC",
  description:
    "Flexible IOP treatment in Orange County, CA. Structured group and individual therapy woven into your daily life — morning and evening schedule options at Rize OC.",
  alternates: { canonical: "/iop-program-orange-county" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/iop-program-orange-county", fallback);
}

export default function Page() {
  return <IopPage />;
}
