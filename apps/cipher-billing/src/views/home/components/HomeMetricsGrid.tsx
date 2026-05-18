"use client";

import { useEffect, useRef, useState } from "react";
import { AutoLinkedText } from "@sweetmedia/blog-core";

export type HomeMetricSpec = {
  /** Numeric value to count up to */
  end: number;
  prefix?: string;
  suffix?: string;
  /** Use thousands separators for the animated number */
  useGrouping?: boolean;
  label: string;
};

function formatCount(n: number, useGrouping: boolean): string {
  if (!useGrouping) return String(Math.round(n));
  return Math.round(n).toLocaleString("en-US");
}

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4;
}

export default function HomeMetricsGrid({ metrics }: { metrics: readonly HomeMetricSpec[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(() => metrics.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCounts(metrics.map((m) => m.end));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setStarted(true);
        io.disconnect();
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [metrics]);

  useEffect(() => {
    if (!started) return;

    const durationMs = 2000;
    const ends = metrics.map((m) => m.end);
    const startAt = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / durationMs);
      const eased = easeOutQuart(t);
      setCounts(ends.map((end) => end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setCounts(ends);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, metrics]);

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-4">
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className="flex flex-col items-center justify-center border border-white/15 bg-white/5 px-4 py-8 text-center backdrop-blur-sm"
          aria-label={`${metric.prefix}${formatCount(metric.end, metric.useGrouping ?? false)}${metric.suffix}, ${metric.label}`}
        >
          <p className="font-marcellus text-3xl font-medium tracking-[-0.02em] text-white tabular-nums md:text-4xl md:leading-[1.1]" aria-hidden="true">
            {metric.prefix}
            {formatCount(counts[i] ?? 0, metric.useGrouping ?? false)}
            {metric.suffix}
          </p>
          <p className="mt-3 max-w-[11rem] text-center font-[var(--font-body)] text-[11px] font-normal uppercase leading-snug tracking-[0.12em] text-white/95" aria-hidden="true">
            <AutoLinkedText>{metric.label}</AutoLinkedText>
          </p>
        </div>
      ))}
    </div>
  );
}
