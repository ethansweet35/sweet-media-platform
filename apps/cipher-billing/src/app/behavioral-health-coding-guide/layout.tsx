import "@/styles/elementor-coding-guide-bundle.css";
import "@/styles/elementor-kit-fallback.css";

/** Elementor CSS is bundled via `@/styles/elementor-coding-guide-bundle.css` (loads in `<head>`). */
export default function BehavioralHealthCodingGuideLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
