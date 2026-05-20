import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LifelineProps {
  path: string;
  color?: string;
  className?: string;
  strokeWidth?: number;
  showNodes?: boolean;
  nodePositions?: number[];
}

export default function Lifeline({
  path,
  color = "#1E4A6B",
  className,
  strokeWidth = 2,
  showNodes = false,
  nodePositions = [],
}: LifelineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!pathRef.current) return;
      const rect = pathRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const start = windowHeight;
      const end = -elementHeight;
      const progress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pathLength = pathRef.current?.getTotalLength() || 1000;
  const dashOffset = prefersReducedMotion
    ? 0
    : pathLength * (1 - scrollProgress);

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      viewBox="0 0 1440 2000"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        style={{
          transition: prefersReducedMotion ? "none" : "stroke-dashoffset 0.3s ease-out",
        }}
      />
      {showNodes &&
        nodePositions.map((pos, i) => {
          const point = pathRef.current?.getPointAtLength(pos * pathLength);
          if (!point) return null;
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={color}
              opacity={scrollProgress > pos ? 1 : 0}
              style={{
                transition: prefersReducedMotion
                  ? "none"
                  : "opacity 0.4s ease-out",
              }}
            />
          );
        })}
    </svg>
  );
}