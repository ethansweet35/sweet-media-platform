import { initPageAutoLinks } from "@sweetmedia/blog-core";

type MarketingPageProps = {
  children: React.ReactNode;
  /** Suppress self-links for AutoLinkedText on this route. */
  currentPath?: string;
};

export default function MarketingPage({ children, currentPath }: MarketingPageProps) {
  if (currentPath) {
    initPageAutoLinks(currentPath);
  }

  return <main style={{ fontFamily: "var(--font-montserrat)" }}>{children}</main>;
}
