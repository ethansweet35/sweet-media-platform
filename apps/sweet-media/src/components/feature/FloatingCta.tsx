"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function FloatingCta() {
  const pathname = usePathname();
  return <FloatingCtaInteractive key={pathname ?? ""} />;
}

function FloatingCtaInteractive() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  // Show after scrolling 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCall = () => {
    window.location.href = "tel:+17143005115";
  };

  const handleContact = () => {
    setExpanded(false);
    router.push("/contact");
  };

  return (
    <>
      {/* Backdrop — closes menu on tap */}
      {expanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Floating container */}
      <div
        className={`fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {/* Action options — slide up when expanded */}
        <div
          className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
            expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Call option */}
          <button
            onClick={handleCall}
            className="flex items-center gap-3 bg-white border border-black/10 rounded-full pl-4 pr-5 py-3 cursor-pointer whitespace-nowrap group"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 flex-shrink-0">
              <i className="ri-phone-line text-white text-sm"></i>
            </div>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/40">Call Us Now</div>
              <div className="text-sm font-bold text-black leading-tight">(714) 300-5115</div>
            </div>
          </button>

          {/* Strategy call option */}
          <button
            onClick={handleContact}
            className="flex items-center gap-3 bg-white border border-black/10 rounded-full pl-4 pr-5 py-3 cursor-pointer whitespace-nowrap"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#0A1F44] flex-shrink-0">
              <i className="ri-calendar-check-line text-white text-sm"></i>
            </div>
            <div className="text-left">
              <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-black/40">Free Strategy Call</div>
              <div className="text-sm font-bold text-black leading-tight">Book a 30-Min Call</div>
            </div>
          </button>
        </div>

        {/* Main FAB button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label="Get in touch"
          className={`w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
            expanded
              ? "bg-black/80 rotate-45"
              : "bg-[#0A1F44] hover:bg-[#0d2a5e] hover:scale-105"
          }`}
          style={{ boxShadow: expanded ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 24px rgba(10,31,68,0.45)" }}
        >
          <i className={`text-white text-xl transition-all duration-300 ${expanded ? "ri-close-line" : "ri-phone-line"}`}></i>
        </button>
      </div>
    </>
  );
}
