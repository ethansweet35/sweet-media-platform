import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpPage from "@/views/levels-of-care/op/page";

const fallback: Metadata = {
  title: "Outpatient Program (OP) in Orange County | Rize OC",
  description:
    "Ongoing outpatient therapy and relapse prevention support in Orange County, CA. One to two sessions per week for individuals committed to sustained recovery at Rize OC.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/outpatient-program", fallback);
}

export default function Page() {
  return <OpPage />;
}
