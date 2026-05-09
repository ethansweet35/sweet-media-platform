import { type Metadata } from "next";
import CocainePage from "@/views/substance/cocaine/CocainePage";

export const metadata: Metadata = {
  title: "Cocaine & Crack Addiction Treatment | Northbound Treatment Services",
  description:
    "Expert cocaine and crack cocaine addiction treatment in Orange County. Northbound provides medically supervised detox, residential, PHP, and IOP. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/crack-cocaine' },
};

export default function Page() {
  return <CocainePage />;
}
