import { useEffect, useRef, useState } from "react";
import { galleryImages } from "@/mocks/impact-report";

export default function ImpactGallerySection() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-pure-white py-10 md:py-14 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-lg overflow-hidden group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.95)",
                transition: `all 600ms ease ${i * 100 + 200}ms`,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}