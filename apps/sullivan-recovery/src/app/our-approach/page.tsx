import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurApproachPage from "@/views/our-approach/page";

const fallbackMetadata: Metadata = {
  title: "About Us | Sullivan Recovery",
  description:
    "Learn about Sullivan Recovery in Mission Viejo — founded by Cory and Tyson Sullivan, our medical detox approach, holistic therapies, and commitment to personalized addiction treatment in Orange County.",
  alternates: { canonical: "/our-approach/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-approach", fallbackMetadata);
}

export default function Page() {
  return <OurApproachPage />;
}
