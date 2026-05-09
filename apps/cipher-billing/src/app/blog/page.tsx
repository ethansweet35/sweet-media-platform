import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BlogPage from "@/views/blog/page";

export const revalidate = 3600;

const fallbackMetadata: Metadata = {
  title: "Blog | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/blog", fallbackMetadata);
}

export default function Page() {
  return <BlogPage />;
}
