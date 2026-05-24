import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurTeamPage from "@/views/our-team/page";

const fallbackMetadata: Metadata = {
  title: "Our Team | Sullivan Recovery",
  description:
    "Meet the Sullivan Recovery team in Mission Viejo — compassionate leaders, clinicians, and support staff dedicated to medical detox and addiction treatment in Orange County.",
  alternates: { canonical: "/our-approach/our-team/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-approach/our-team", fallbackMetadata);
}

export default function Page() {
  return <OurTeamPage />;
}
