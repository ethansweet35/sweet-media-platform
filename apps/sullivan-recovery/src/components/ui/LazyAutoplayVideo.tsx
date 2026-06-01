"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = {
  src: string;
  className?: string;
  wrapperClassName?: string;
  rootMargin?: string;
};

export default function LazyAutoplayVideo({
  src,
  className = "h-full w-full object-cover object-center",
  wrapperClassName,
  rootMargin = "0px",
}: LazyAutoplayVideoProps) {
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
    <div ref={ref} className={wrapperClassName}>
      {visible ? (
        <video autoPlay loop muted playsInline preload="none" className={className}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="h-full w-full bg-[var(--sr-charcoal)]" aria-hidden />
      )}
    </div>
  );
}
