import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ReviewsPage from "@/views/about/ReviewsPage";

const fallback: Metadata = {
  title: "Reviews & Testimonials | Northbound Treatment",
  description: "Read real client and family testimonials about Northbound Treatment. Rated 4.6/5 stars on Google. Hear firsthand accounts of recovery from detox through residential and sober living.",
  alternates: { canonical: "/impact-reach/reviews-testimonials" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/impact-reach/reviews-testimonials", fallback);
}

export default function Page() {
  return <ReviewsPage />;
}
