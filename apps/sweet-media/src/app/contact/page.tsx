import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ContactPage from "@/pages/contact/page";

const fallbackMetadata: Metadata = {
  title: "Contact Sweet Media | Free Strategy Call for Treatment Centers",
  description:
    "Get in touch with Sweet Media for a free strategy call. We help behavioral health treatment centers grow through SEO, paid media, and web development. Costa Mesa, CA.",
  alternates: { canonical: "/contact" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallbackMetadata);
}

export default function Page() {
  return <ContactPage />;
}
