import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CocainePage from "@/views/substance/cocaine/CocainePage";

const fallback: Metadata = {
  title: "Cocaine & Crack Addiction Treatment Services",
  description:
    "Expert cocaine and crack cocaine addiction treatment in Orange County. Northbound provides medically supervised detox, residential, PHP, and IOP. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/crack-cocaine' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/crack-cocaine", fallback);
}

export default function Page() {
  return <CocainePage />;
}
