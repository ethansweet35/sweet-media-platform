"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CtmLeadFormCardProps } from "@/components/feature/CtmLeadFormCard";

const CtmLeadFormCard = dynamic(() => import("@/components/feature/CtmLeadFormCard"), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full max-w-[400px] border border-white/10 bg-navy-light/40 p-6 shadow-2xl backdrop-blur-md lg:p-8"
      style={{ minHeight: 290 }}
      aria-hidden
    />
  ),
});

/** Defers CTM iframe + form.js until the hero form enters view (or idle). */
export default function DeferredHeroLeadForm(props: CtmLeadFormCardProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const activate = () => setReady(true);
    let io: IntersectionObserver | null = null;

    if (typeof IntersectionObserver === "function") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            activate();
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px 80px 0px" },
      );
      io.observe(host);
    } else {
      activate();
    }

    return () => {
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className="w-full max-w-[400px]">
      {ready ? <CtmLeadFormCard {...props} /> : null}
    </div>
  );
}
