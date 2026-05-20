import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}

export default function SecondaryButton({
  children,
  href,
  onClick,
  className,
  light = false,
}: SecondaryButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center gap-2 text-[15px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer group",
    light ? "text-soft-white" : "text-deep-navy",
    className
  );

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[1px] w-full transition-colors duration-300",
            light ? "bg-soft-white/40" : "bg-slate"
          )}
        />
        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-tfrf-blue transition-all duration-300 group-hover:w-full" />
      </span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        &rarr;
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {inner}
    </button>
  );
}