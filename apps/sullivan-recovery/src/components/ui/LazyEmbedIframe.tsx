"use client";

import { useEffect, useRef, useState } from "react";

type LazyEmbedIframeProps = {
  src: string;
  title: string;
  className?: string;
  wrapperClassName?: string;
  height?: number;
  rootMargin?: string;
  allow?: string;
  allowFullScreen?: boolean;
  fallbackClassName?: string;
};

export default function LazyEmbedIframe({
  src,
  title,
  className,
  wrapperClassName,
  height = 120,
  rootMargin = "0px",
  allow,
  allowFullScreen,
  fallbackClassName,
}: LazyEmbedIframeProps) {
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
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height}
          scrolling="no"
          allow={allow}
          allowFullScreen={allowFullScreen}
          className={className}
          style={{ border: "none" }}
        />
      ) : (
        <div
          className={fallbackClassName ?? "w-full bg-[var(--sr-sand)]/40"}
          style={{ height }}
          aria-hidden
        />
      )}
    </div>
  );
}
