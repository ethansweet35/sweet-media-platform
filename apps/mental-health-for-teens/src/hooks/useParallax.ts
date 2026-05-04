'use client';

import { useEffect, useRef } from 'react';

interface UseParallaxOptions {
  /**
   * How many px the image shifts per 1px of scroll.
   * 0.3 = gentle drift, 0.5 = stronger.
   * Default: 0.3
   */
  speed?: number;
  /**
   * Clamp the maximum translateY offset in px.
   * Default: 120
   */
  maxOffset?: number;
}

/**
 * Attaches a smooth parallax scroll effect to an element.
 * Uses rAF + direct style mutation — zero re-renders, zero jank.
 *
 * Usage:
 *   const imgRef = useParallax<HTMLImageElement>();
 *   <img ref={imgRef} ... />
 */
export function useParallax<T extends HTMLElement = HTMLImageElement>(
  options: UseParallaxOptions = {},
): React.RefObject<T | null> {
  const { speed = 0.3, maxOffset = 120 } = options;
  const ref = useRef<T>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const update = () => {
      if (!el) return;
      const rect = el.closest('section')?.getBoundingClientRect()
        ?? el.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Progress: -1 (section fully below fold) → 0 (centered) → 1 (fully above fold)
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / (viewH / 2 + rect.height / 2);
      const offset = Math.max(-maxOffset, Math.min(maxOffset, progress * maxOffset * 2 * speed));

      el.style.transform = `translateY(${offset}px) scale(1.08)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    // Set initial scale so there's room to drift without showing edges
    el.style.transform = 'translateY(0px) scale(1.08)';
    el.style.willChange = 'transform';

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed, maxOffset]);

  return ref;
}
