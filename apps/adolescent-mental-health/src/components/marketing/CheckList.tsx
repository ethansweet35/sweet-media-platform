import { cn } from "@/lib/cn";

type CheckListProps = {
  items: string[];
  className?: string;
  /** Dark checkmarks on light bg (default) */
  light?: boolean;
};

export default function CheckList({ items, className, light }: CheckListProps) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-body">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white",
              light ? "bg-white/20" : "bg-accent",
            )}
          >
            <i className="ri-check-line text-xs" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
