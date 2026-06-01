import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3;

type HeadingProps = {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  /** White text for dark sections */
  light?: boolean;
};

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-3xl font-bold leading-[1.06] tracking-tight sm:text-[2.75rem] sm:leading-[1.02] lg:text-[4rem]",
  2: "text-3xl font-bold sm:text-4xl lg:text-5xl",
  3: "text-lg font-bold md:text-xl",
};

const TagMap = { 1: "h1", 2: "h2", 3: "h3" } as const;

export default function Heading({ as = 2, children, className, light }: HeadingProps) {
  const Tag = TagMap[as];

  return (
    <Tag
      className={cn(levelClasses[as], light ? "text-white" : "text-ink", className)}
      style={{ fontFamily: "var(--font-heebo)" }}
    >
      {children}
    </Tag>
  );
}

/** Wrap matching words in the brand accent color */
export function AccentText({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
