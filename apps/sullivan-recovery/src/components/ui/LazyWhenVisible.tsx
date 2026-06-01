"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyWhenVisibleProps = {
  children: (visible: boolean) => ReactNode;
  className?: string;
  /** Load slightly before the element enters the viewport. */
  rootMargin?: string;
};

/** Renders children with `visible=true` once the wrapper intersects the viewport. */
export default function LazyWhenVisible({
  children,
  className,
  rootMargin = "250px",
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children(visible)}
    </div>
  );
}
