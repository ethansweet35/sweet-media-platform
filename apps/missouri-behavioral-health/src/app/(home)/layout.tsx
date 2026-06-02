import Footer from "@/components/feature/Footer";
import HomeSiteChrome from "@/components/feature/HomeSiteChrome";
import MarketingScrollCta from "@/components/feature/MarketingScrollCta";

const SYSTEM_FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

/** Homepage shell — server chrome, system fonts, no client Navbar bundle. */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col bg-cream antialiased"
      style={{ fontFamily: SYSTEM_FONT }}
    >
      <HomeSiteChrome />
      <div className="flex-1">{children}</div>
      <Footer />
      <MarketingScrollCta />
    </div>
  );
}
