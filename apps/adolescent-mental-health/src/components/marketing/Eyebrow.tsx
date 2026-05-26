import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Slightly tighter tracking for dark sections */
  dark?: boolean;
};

export default function Eyebrow({ children, className, dark }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.3em] text-accent",
        dark && "mb-4",
        className,
      )}
    >
      {children}
    </p>
  );
}
