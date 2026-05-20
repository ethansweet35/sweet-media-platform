import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "donate";
}

export default function PrimaryButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
}: PrimaryButtonProps) {
  const baseClasses = cn(
    "relative inline-block px-8 py-[18px] text-[15px] font-semibold uppercase tracking-[0.05em] transition-colors duration-200 whitespace-nowrap cursor-pointer",
    variant === "primary"
      ? "bg-tfrf-blue text-soft-white hover:bg-deep-navy"
      : "bg-deep-navy text-soft-white hover:bg-tfrf-blue",
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-300 w-0 group-hover:w-[calc(100%+16px)]",
          variant === "donate" ? "bg-sky-blue h-[2px]" : "bg-tfrf-blue"
        )}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClasses, "group")} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cn(baseClasses, "group")} onClick={onClick}>
      {inner}
    </button>
  );
}