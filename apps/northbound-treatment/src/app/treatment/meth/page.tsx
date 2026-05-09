import { type Metadata } from "next";
import MethPage from "@/views/substance/meth/MethPage";

export const metadata: Metadata = {
  title: "Meth Addiction Treatment in Orange County | Northbound Treatment Services",
  description:
    "Northbound provides expert methamphetamine addiction treatment — from medically supervised detox through residential, PHP, and IOP. Orange County meth rehab. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/meth' },
};

export default function Page() {
  return <MethPage />;
}
