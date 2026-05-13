import { cn } from "@/lib/cn";

type Variant = "accent-subtle" | "muted-subtle" | "ink" | "accent";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type SizeProp = Size | (string & {});

interface IconCircleProps {
  icon: string;
  variant?: Variant;
  size?: SizeProp;
  /** Override the icon font-size class (e.g. "text-base", "text-lg", "text-xl"). */
  iconSize?: string;
  /** Legacy API: combined background + text color classes. */
  colorClass?: string;
  className?: string;
}

const sizeMap: Record<Size, string> = {
  xs: "w-7 h-7",
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const defaultIconSizeMap: Record<Size, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const variantMap: Record<Variant, { bg: string; icon: string }> = {
  "accent-subtle": { bg: "bg-accent/15", icon: "text-accent" },
  "muted-subtle":  { bg: "bg-muted/15",  icon: "text-muted" },
  ink:             { bg: "bg-ink",        icon: "text-white" },
  accent:          { bg: "bg-accent",     icon: "text-white" },
};

/**
 * Circular icon container used throughout the homepage for feature lists,
 * card headers, and callout blocks.
 */
export default function IconCircle({
  icon,
  variant = "accent-subtle",
  size = "md",
  iconSize,
  colorClass,
  className,
}: IconCircleProps) {
  const { bg, icon: iconColor } = variantMap[variant];
  const isPresetSize = (value: SizeProp): value is Size =>
    value === "xs" || value === "sm" || value === "md" || value === "lg" || value === "xl";

  const resolvedSizeClass = isPresetSize(size) ? sizeMap[size] : size;
  const resolvedIconSize = iconSize ?? (isPresetSize(size) ? defaultIconSizeMap[size] : undefined);
  const resolvedContainerColor = colorClass ?? bg;
  const resolvedIconColor = colorClass ? "text-current" : iconColor;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center shrink-0",
        resolvedSizeClass,
        resolvedContainerColor,
        className
      )}
    >
      <i className={cn(icon, resolvedIconSize, resolvedIconColor)} />
    </div>
  );
}
