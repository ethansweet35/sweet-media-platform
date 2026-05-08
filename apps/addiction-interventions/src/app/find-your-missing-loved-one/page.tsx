import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FindYourMissingLovedOnePage from "@/views/find-your-missing-loved-one/page";

const fallbackMetadata: Metadata = {
  title: "How to Find a Missing Loved One Struggling With Addiction",
  description:
    "When a family member disappears in the middle of an addiction or mental health crisis, every minute matters. Here is what to do — in order — to bring them home safely.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/find-your-missing-loved-one", fallbackMetadata);
}

export default function Page() {
  return <FindYourMissingLovedOnePage />;
}
