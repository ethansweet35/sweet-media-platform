import type { Metadata } from "next";
import ContactPage from "@/pages/contact/page";

export const metadata: Metadata = {
  title: "Contact Sweet Media | Free Strategy Call for Treatment Centers",
  description:
    "Get in touch with Sweet Media for a free strategy call. We help behavioral health treatment centers grow through SEO, paid media, and web development. Costa Mesa, CA.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
