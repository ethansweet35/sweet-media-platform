import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MethPage from "@/views/substance/meth/MethPage";

const fallback: Metadata = {
  title: "Meth Addiction Treatment in Orange County | Northbound Treatment Services",
  description:
    "Northbound provides expert methamphetamine addiction treatment — from medically supervised detox through residential, PHP, and IOP. Orange County meth rehab. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/meth' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/meth", fallback);
}

export default function Page() {
  return <MethPage />;
}
