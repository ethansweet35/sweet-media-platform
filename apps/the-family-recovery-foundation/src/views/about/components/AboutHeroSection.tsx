'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

export default function AboutHeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24 overflow-hidden`}>
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
          {/* Left: Text */}
          <div
            className="w-full lg:w-[52%] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
              Your Stories Are Our Stories
            </p>
            <h1 className="text-[clamp(32px,4vw,52px)] font-display text-deep-navy leading-[1.1] mb-6 md:mb-8">
              About The Family Recovery Foundation
            </h1>
            <p className="text-body-m font-body text-slate leading-relaxed max-w-lg">
              If you&apos;re dealing with addiction and its wreckage, or if you
              have a loved one who is, you don&apos;t have to recover alone. Your
              stories are our stories. At The Family Recovery Foundation we all
              have our personal stories and first-hand experience with addiction
              and mental health issues.
            </p>
          </div>

          {/* Right: Image with decorative shape */}
          <div
            className="w-full lg:w-[48%] shrink-0 relative transition-all duration-700 delay-200"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="absolute -top-6 -right-6 w-[85%] h-[85%] rounded-[32px] bg-powder-blue/40 -z-10" />
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-deep-navy/5">
              <Image
                src="https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_71278bf2_AboutLifeLines-Image.jpg"
                alt="Hands joined together in a circle symbolizing unity and recovery support"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}