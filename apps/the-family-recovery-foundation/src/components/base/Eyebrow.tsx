import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function Eyebrow({ children, className, light = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-eyebrow font-body font-semibold uppercase tracking-[0.15em] mb-4",
        light ? "text-sky-blue" : "text-tfrf-blue",
        className
      )}
    >
      {children}
    </span>
  );
}