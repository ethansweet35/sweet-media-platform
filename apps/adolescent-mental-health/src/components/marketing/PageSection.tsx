import { CONTAINER } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SECTION_PY } from "./tokens";

type SectionBg = "white" | "surface" | "dark";

type PageSectionProps = {
  children: React.ReactNode;
  bg?: SectionBg;
  className?: string;
  containerClassName?: string;
  /** When false, children render without the max-width container wrapper */
  contained?: boolean;
  id?: string;
};

const bgClasses: Record<SectionBg, string> = {
  white: "bg-white",
  surface: "bg-surface",
  dark: "bg-dark",
};

export default function PageSection({
  children,
  bg = "white",
  className,
  containerClassName,
  contained = true,
  id,
}: PageSectionProps) {
  return (
    <section id={id} className={cn("px-6 lg:px-10", SECTION_PY, bgClasses[bg], className)}>
      {contained ? (
        <div className={cn(CONTAINER, containerClassName)}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
