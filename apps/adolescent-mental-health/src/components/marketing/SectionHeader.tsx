import Eyebrow from "./Eyebrow";
import Heading from "./Heading";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={2} light={light} className={eyebrow ? "mt-3" : undefined}>
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-sm leading-8", light ? "text-white/55" : "text-body")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
