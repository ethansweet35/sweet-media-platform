import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  /** Passed to next/image when using fill layout */
  sizes?: string;
}

/**
 * Lazy-loaded image that only fetches once it enters the viewport.
 * Uses native loading="lazy" + IntersectionObserver as a belt-and-suspenders approach.
 * Shows a lightweight static skeleton placeholder until the image loads.
 */
export default function LazyImage({ src, alt, className = "", style, sizes = "(max-width: 768px) 100vw, 45vw" }: LazyImageProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className="block w-full h-full relative">
      {/* Static skeleton — no animation to avoid continuous repaints */}
      {!loaded && (
        <span className="absolute inset-0 bg-[#0A1F44]/8" />
      )}
      {inView && (
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={style}
        />
      )}
    </span>
  );
}