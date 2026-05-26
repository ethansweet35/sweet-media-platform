type MarketingPageProps = {
  children: React.ReactNode;
};

export default function MarketingPage({ children }: MarketingPageProps) {
  return <main style={{ fontFamily: "var(--font-montserrat)" }}>{children}</main>;
}
