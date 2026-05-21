'use client';

import { useState, useEffect, useRef } from "react";
import NewsletterSignupSection from "@/components/marketing/NewsletterSignupSection";

export default function NewsletterSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <NewsletterSignupSection
        instanceKey="about"
        sectionClassName="bg-soft-white py-16 md:py-20 overflow-hidden"
        contentClassName={`max-w-2xl mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      />
    </div>
  );
}
